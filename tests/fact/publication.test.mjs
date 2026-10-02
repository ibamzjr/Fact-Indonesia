import assert from "node:assert/strict";
import test from "node:test";
import { checkPublication, forbiddenPublicationPaths } from "../../scripts/check-publication.mjs";

test("publication excludes secrets, generated output and private runtime directories", () => {
    const forbidden = [".env", "backend/.env.production", "auth.json", "private.sql", "database.sqlite3", "secret.pem", "secret.key", "node_modules/example/index.js", "vendor/autoload.php", "storage/logs/example.log", ".vercel/project.json", ".cache/test.js", "dist-fact/fact-preview.html", "public/build/manifest.json", "public/hot", "public/storage/upload.png"];
    assert.deepEqual(forbiddenPublicationPaths(forbidden), forbidden);
    assert.deepEqual(forbiddenPublicationPaths(["resources/js/Data/factIndonesia.json", "backend/Models/PropertyListing.php", "docs/sources.md"]), []);
});

test("tracked documentation links and all three owner assets remain valid", async () => {
    const report = await checkPublication();
    assert.equal(report.originalAssets, 3);
    assert.ok(report.documents > 10 && report.localLinks > 30);
});
