/** Server-only, short-lived, encrypted intake payload; no personal data in the URL. */
import { createCipheriv, createDecipheriv, createHash, randomBytes, randomUUID } from "node:crypto";
import { deflateRawSync, inflateRawSync } from "node:zlib";
import { parseIntake, type Intake } from "@/lib/restrova-demo";

export const DRAFT_COOKIE = "restrova_demo_draft_v6";
export const DRAFT_TTL_SECONDS = 20 * 60;

export type IntakeDraft = {
  intake: Intake;
  id: string;
  expiresAt: number;
};

function key(): Buffer {
  const secret = process.env.RESTROVA_DEMO_SESSION_SECRET || process.env.RESTROVA_SHEETS_SHARED_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error("Set RESTROVA_DEMO_SESSION_SECRET (at least 32 characters); run npm run setup:demo locally");
  }
  return createHash("sha256").update("restrova-demo-cookie-v6:").update(secret).digest();
}

export function encryptDraft(intake: Intake): string {
  const draft: IntakeDraft = {
    intake, id: randomUUID(), expiresAt: Date.now() + DRAFT_TTL_SECONDS * 1000,
  };
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", key(), iv);
  const data = Buffer.concat([cipher.update(deflateRawSync(Buffer.from(JSON.stringify(draft)))), cipher.final()]);
  const token = [iv, cipher.getAuthTag(), data].map((part) => part.toString("base64url")).join(".");
  // Leave room for the cookie name and attributes under the browser's 4 KB limit.
  if (token.length > 3800) throw new Error("Demo draft exceeds cookie size limit");
  return token;
}

export function decryptDraft(token: string | undefined): IntakeDraft | null {
  if (!token || token.length > 8000) return null;
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    const [iv, tag, encrypted] = parts.map((part) => Buffer.from(part, "base64url"));
    if (iv.length !== 12 || tag.length !== 16) return null;
    const decipher = createDecipheriv("aes-256-gcm", key(), iv);
    decipher.setAuthTag(tag);
    const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]);
    const draft = JSON.parse(inflateRawSync(decrypted, { maxOutputLength: 16384 }).toString("utf8")) as IntakeDraft;
    if (!draft || !Number.isFinite(draft.expiresAt) || Date.now() >= draft.expiresAt ||
        typeof draft.id !== "string" || !/^[0-9a-f-]{36}$/i.test(draft.id)) return null;
    const intake = parseIntake(draft.intake);
    return intake ? { ...draft, intake } : null;
  } catch {
    return null;
  }
}
