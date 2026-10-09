/** Server-only, short-lived, encrypted intake payload; no personal data in the URL. */
import { createCipheriv, createDecipheriv, createHash, randomBytes, randomUUID } from "node:crypto";
import type { Intake } from "@/lib/restrova-demo";

export const DRAFT_COOKIE = "restrova_demo_draft_v5";
export const DRAFT_TTL_SECONDS = 20 * 60;

export type IntakeDraft = {
  intake: Intake;
  id: string;
  expiresAt: number;
};

function key(): Buffer {
  const secret = process.env.RESTROVA_SHEETS_SHARED_SECRET;
  if (!secret || secret.length < 20) throw new Error("Server demo secret is not configured");
  return createHash("sha256").update("restrova-demo-cookie-v5:").update(secret).digest();
}

export function encryptDraft(intake: Intake): string {
  const draft: IntakeDraft = {
    intake, id: randomUUID(), expiresAt: Date.now() + DRAFT_TTL_SECONDS * 1000,
  };
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", key(), iv);
  const data = Buffer.concat([cipher.update(JSON.stringify(draft), "utf8"), cipher.final()]);
  return [iv, cipher.getAuthTag(), data].map((part) => part.toString("base64url")).join(".");
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
    const draft = JSON.parse(decrypted.toString("utf8")) as IntakeDraft;
    if (!draft || Date.now() > draft.expiresAt || !draft.id) return null;
    return draft;
  } catch {
    return null;
  }
}
