const fs = require("fs");
const path = require("path");
const https = require("https");
const http = require("http");
const urlModule = require("url");
const { loadEnvConfig } = require("@next/env");

// Load Next.js environment variables (from .env.local, etc.)
loadEnvConfig(process.cwd());

const HYPERADMIN_BASE_URL = process.env.HYPERADMIN_BASE_URL || "https://api.restrova.com/api/v1";
const email = process.env.HYPERADMIN_EMAIL;
const password = process.env.HYPERADMIN_PASSWORD;

function httpRequest(url, options = {}) {
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

async function run() {
    console.log("[SEO Sync] Starting tenant synchronization...");

    if (!email || !password) {
        console.error("[SEO Sync] Error: HYPERADMIN_EMAIL or HYPERADMIN_PASSWORD not set in environment.");
        process.exit(1);
    }

    try {
        // 1. Login
        console.log(`[SEO Sync] Logging in to Platform Admin API: ${HYPERADMIN_BASE_URL}`);
        const loginUrl = `${HYPERADMIN_BASE_URL}/platform-admin/auth/login`;
        const loginRes = await httpRequest(loginUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        if (loginRes.status < 200 || loginRes.status >= 300) {
            console.error(`[SEO Sync] Login failed with status: ${loginRes.status}`);
            console.error(loginRes.body);
            process.exit(1);
        }

        const loginData = JSON.parse(loginRes.body);
        const token = loginData.accessToken || loginData.token;
        if (!token) {
            console.error("[SEO Sync] Login succeeded but no token returned.");
            process.exit(1);
        }

        // 2. Fetch active tenants
        console.log("[SEO Sync] Fetching active tenants...");
        const tenantsUrl = `${HYPERADMIN_BASE_URL}/platform-admin/tenants?page=0&size=100`;
        const tenantsRes = await httpRequest(tenantsUrl, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

        if (tenantsRes.status < 200 || tenantsRes.status >= 300) {
            console.error(`[SEO Sync] Failed to fetch tenants. Status: ${tenantsRes.status}`);
            process.exit(1);
        }

        const data = JSON.parse(tenantsRes.body);
        const content = Array.isArray(data) ? data : data.content || [];
        const activeTenants = content
            .filter((t) => t.isActive ?? t.active ?? true)
            .map((t) => ({
                id: t.id,
                slug: t.slug,
                name: t.displayName || t.name || t.legalName || t.slug,
                lastUpdated: new Date().toISOString()
            }));

        console.log(`[SEO Sync] Found ${activeTenants.length} active tenants.`);

        // 3. Write to CSV
        const CSV_PATH = path.join(process.cwd(), "src/data/tenants.csv");
        const header = "id,slug,name,lastUpdated\n";
        const rows = activeTenants.map((t) => {
            const nameEscaped = t.name.includes(",") ? `"${t.name.replace(/"/g, '""')}"` : t.name;
            return `${t.id},${t.slug},${nameEscaped},${t.lastUpdated}`;
        });

        const dir = path.dirname(CSV_PATH);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        fs.writeFileSync(CSV_PATH, header + rows.join("\n"), "utf-8");
        console.log(`[SEO Sync] Successfully synchronized and wrote ${activeTenants.length} tenants to ${CSV_PATH}`);
    } catch (err) {
        console.error("[SEO Sync] Error during synchronization:", err);
        process.exit(1);
    }
}

run();
