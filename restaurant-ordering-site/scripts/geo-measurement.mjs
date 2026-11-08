import assert from "node:assert/strict";
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

export function summarizeObservations(protocol, observations) {
  const prompts = new Map(protocol.groups.flatMap(group => group.prompts.map(prompt => [prompt.id, { ...prompt, intent: group.id }])));
  const rounds = new Map();
  const seen = new Set();
  for (const observation of observations) {
    const prompt = prompts.get(observation.promptId);
    assert.ok(prompt, "Every observation must reference a frozen prompt ID");
    assert.equal(observation.prompt, prompt.text, "Use the exact recorded prompt, without seeding a brand");
    assert.equal(observation.searchEnabled, true, "Only Search-enabled observations are comparable");
    assert.equal(observation.freshConversation, true, "Use a fresh conversation for each observation");
    for (const key of ["roundId", "engine", "locale", "observedAt", "answerText", "evidence"]) assert.ok(typeof observation[key] === "string" && observation[key].trim(), `Missing ${key}`);
    assert.ok(!Number.isNaN(Date.parse(observation.observedAt)), "Use an ISO observation date/time");
    assert.ok(["baseline", "post-deployment"].includes(observation.phase));
    assert.ok(Number.isInteger(observation.repeat) && observation.repeat > 0);
    assert.ok(Array.isArray(observation.citations));
    if (observation.phase === "post-deployment") {
      assert.ok(observation.releaseId && observation.crawlEvidence && observation.indexingEvidence, "Post-deployment observations need release, crawl and indexing-check evidence");
    }
    const roundKey = JSON.stringify([observation.roundId, observation.phase, observation.engine, observation.model ?? null, observation.locale, observation.releaseId ?? null]);
    const observationKey = JSON.stringify([roundKey, observation.promptId, observation.repeat]);
    assert.ok(!seen.has(observationKey), "Duplicate observations must not inflate rates"); seen.add(observationKey);
    if (!rounds.has(roundKey)) rounds.set(roundKey, { roundId: observation.roundId, phase: observation.phase, engine: observation.engine, model: observation.model ?? null, locale: observation.locale, releaseId: observation.releaseId ?? null, observations: [] });
    const ownCitations = observation.citations.filter(citation => {
      const url = new URL(citation.url);
      assert.ok(["http:", "https:"].includes(url.protocol), "Citations must be web URLs");
      assert.ok(["relevant", "not-relevant", "unreviewed"].includes(citation.relevance));
      assert.ok(["supported", "unsupported", "unreviewed"].includes(citation.claimSupport));
      return ["restrova.com", "www.restrova.com"].includes(url.hostname.toLowerCase());
    });
    const answerWithoutUrls = observation.answerText.replace(/https?:\/\/\S+/g, "");
    rounds.get(roundKey).observations.push({ intent: prompt.intent, promptId: prompt.id, mentioned: /\brestrova\b/i.test(answerWithoutUrls), cited: ownCitations.length > 0, supportedCitation: ownCitations.some(citation => citation.relevance === "relevant" && citation.claimSupport === "supported"), unreviewedCitations: ownCitations.filter(citation => citation.relevance === "unreviewed" || citation.claimSupport === "unreviewed").length });
  }
  const metrics = (rows, expected) => ({ completedObservations: rows.length, distinctPrompts: new Set(rows.map(row => row.promptId)).size, expectedPrompts: expected, mentionRate: rows.length ? rows.filter(row => row.mentioned).length / rows.length : null, citationRate: rows.length ? rows.filter(row => row.cited).length / rows.length : null, supportedRelevantCitationRate: rows.length ? rows.filter(row => row.supportedCitation).length / rows.length : null, unreviewedCitations: rows.reduce((sum, row) => sum + row.unreviewedCitations, 0) });
  return {
    protocolVersion: protocol.version,
    note: "Rates describe recorded observations, not guaranteed inclusion or a causal lift. Missing observations yield null rates. Engines, models, locales, phases and releases are not pooled.",
    expectedPrompts: prompts.size,
    completedObservations: observations.length,
    unmeasured: observations.length === 0 ? protocol.groups.map(group => ({ intent: group.id, ...metrics([], group.prompts.length) })) : [],
    rounds: [...rounds.values()].map(({ observations: rows, ...round }) => ({ ...round, ...metrics(rows, prompts.size), groups: protocol.groups.map(group => ({ intent: group.id, ...metrics(rows.filter(row => row.intent === group.id), group.prompts.length) })) })),
  };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const protocol = JSON.parse(fs.readFileSync(new URL("../docs/geo/topic-discovery-prompts.json", import.meta.url), "utf8"));
  const source = process.argv[2] || fileURLToPath(new URL("../docs/geo/topic-discovery-observations.json", import.meta.url));
  const log = JSON.parse(fs.readFileSync(source, "utf8"));
  console.log(JSON.stringify(summarizeObservations(protocol, log.observations), null, 2));
}
