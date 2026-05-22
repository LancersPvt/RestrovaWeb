export interface TenantConfig {
    id: string;
    slug: string;
    name: string;
}

import https from "https";
import http from "http";
import urlModule from "url";
import fs from "fs";
import path from "path";

// A simple but robust CSV parser that handles quotes and commas
function parseCSV(content: string): string[][] {
    const lines: string[][] = [];
    const rows = content.split(/\r?\n/);
    for (const row of rows) {
        if (!row.trim()) continue;
        const fields: string[] = [];
        let currentField = "";
        let insideQuotes = false;
        for (let i = 0; i < row.length; i++) {
            const char = row[i];
            if (char === '"') {
                if (insideQuotes && row[i + 1] === '"') {
                    currentField += '"';
                    i++; // skip next quote
                } else {
                    insideQuotes = !insideQuotes;
                }
            } else if (char === ',' && !insideQuotes) {
                fields.push(currentField);
                currentField = "";
            } else {
                currentField += char;
            }
        }
        fields.push(currentField);
        lines.push(fields);
    }
    return lines;
}

const HYPERADMIN_BASE_URL = process.env.HYPERADMIN_BASE_URL || "https://dev.restrova.com/api/v1";

let platformAdminToken: string | null = null;
let tokenExpiryTime = 0;

function httpRequest(
    url: string,
    options: {
        method?: string;
        headers?: Record<string, string>;
        body?: string;
    } = {}
): Promise<{ status: number; body: string }> {
    return new Promise((resolve, reject) => {
        const parsedUrl = urlModule.parse(url);
        const isHttps = parsedUrl.protocol === "https:";
        const client = isHttps ? https : http;
        
        const reqOptions = {
            hostname: parsedUrl.hostname,
            port: parsedUrl.port || (isHttps ? 443 : 80),
            path: parsedUrl.path,
            method: options.method || "GET",
            headers: options.headers || {},
        };

        const req = client.request(reqOptions, (res) => {
            let data = "";
            res.on("data", (chunk) => {
                data += chunk;
            });
            res.on("end", () => {
                resolve({
                    status: res.statusCode || 0,
                    body: data,
                });
            });
        });

        req.on("error", (err) => {
            reject(err);
        });

        if (options.body) {
            req.write(options.body);
        }
        req.end();
    });
}

async function getPlatformAdminToken(): Promise<string | null> {
    const email = process.env.HYPERADMIN_EMAIL;
    const password = process.env.HYPERADMIN_PASSWORD;

    if (!email || !password) {
        return null;
    }

    if (platformAdminToken && Date.now() < tokenExpiryTime) {
        return platformAdminToken;
    }

    try {
        const loginUrl = `${HYPERADMIN_BASE_URL}/platform-admin/auth/login`;
        
        const res = await httpRequest(loginUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        if (res.status < 200 || res.status >= 300) {
            console.error(`[SEO Engine] Platform Admin Login failed with status: ${res.status}`);
            return null;
        }

        const data = JSON.parse(res.body);
        const token = data.accessToken || data.token;
        if (token) {
            platformAdminToken = token;
            // Token is typically valid for 1 hour, cache for 50 minutes
            tokenExpiryTime = Date.now() + 50 * 60 * 1000;
            return token;
        }
        return null;
    } catch (err) {
        console.error("[SEO Engine] Error logging in to platform admin:", err);
        return null;
    }
}

export async function fetchActiveTenants(): Promise<TenantConfig[]> {
    try {
        const csvPath = path.join(process.cwd(), "src/data/tenants.csv");
        if (fs.existsSync(csvPath)) {
            const content = fs.readFileSync(csvPath, "utf-8");
            const parsed = parseCSV(content);
            if (parsed.length > 1) {
                const tenants: TenantConfig[] = [];
                // Skip header: ["id", "slug", "name", "lastUpdated"]
                for (let i = 1; i < parsed.length; i++) {
                    const row = parsed[i];
                    if (row.length >= 3) {
                        tenants.push({
                            id: row[0],
                            slug: row[1],
                            name: row[2]
                        });
                    }
                }
                console.log(`[SEO Engine] Successfully loaded ${tenants.length} tenants from CSV cache.`);
                return tenants;
            }
        }
        console.warn("[SEO Engine] CSV file not found or empty at src/data/tenants.csv. Falling back to Live API.");
    } catch (csvErr) {
        console.error("[SEO Engine] Error reading/parsing tenants CSV, falling back to Live API:", csvErr);
    }

    const token = await getPlatformAdminToken();
    if (!token) {
        console.warn("[SEO Engine] No hyperadmin credentials or auth failed. Returning empty list.");
        return [];
    }

    try {
        const tenantsUrl = `${HYPERADMIN_BASE_URL}/platform-admin/tenants?page=0&size=100`;

        const res = await httpRequest(tenantsUrl, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

        if (res.status < 200 || res.status >= 300) {
            console.error(`[SEO Engine] Failed to fetch tenants from Platform Admin API. Status: ${res.status}`);
            return [];
        }

        const data = JSON.parse(res.body);
        const content = Array.isArray(data) ? data : data.content || [];
        
        return content
            .filter((t: any) => t.isActive ?? t.active ?? true)
            .map((t: any) => ({
                id: t.id,
                slug: t.slug,
                name: t.displayName || t.name || t.legalName || t.slug,
            }));
    } catch (err) {
        console.error("[SEO Engine] Error fetching active tenants from Platform Admin API:", err);
        return [];
    }
}

export async function getTenantBySlug(slug: string): Promise<TenantConfig | undefined> {
    const tenants = await fetchActiveTenants();
    return tenants.find((t) => t.slug === slug);
}

export async function getTenantById(id: string): Promise<TenantConfig | undefined> {
    const tenants = await fetchActiveTenants();
    return tenants.find((t) => t.id === id);
}
