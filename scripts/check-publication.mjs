import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = fileURLToPath(new URL("../", import.meta.url));

export function forbiddenPublicationPaths(files) {
    const forbidden = /(^|\/)(?:\.env[^/]*|auth\.json|node_modules|vendor|storage|\.vercel|\.cache|dist-fact)(\/|$)|\.(?:sql|sqlite3?|pem|key)$/i;
    return files.filter((file) => forbidden.test(file) || /^public\/(?:build|hot|storage)(\/|$)/.test(file));
}

export async function checkPublication(root = projectRoot) {
    const files = execFileSync("git", ["ls-files", "-z"], { cwd: root, encoding: "utf8" }).split("\0").filter(Boolean);
    assert.deepEqual(forbiddenPublicationPaths(files), [], "Private or generated material is tracked.");
    let links = 0;
    let documents = 0;

    for (const file of files) {
        if (!/\.(?:md|js|jsx|mjs|json|php|html|css|ya?ml)$/.test(file)) continue;
        const content = await readFile(path.join(root, file), "utf8");
        const secretPatterns = [/-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/, /\bghp_[A-Za-z0-9]{36}\b/, /\bgithub_pat_[A-Za-z0-9_]{80,}\b/, /\bsk_live_[A-Za-z0-9]{20,}\b/];
        assert.ok(!secretPatterns.some((pattern) => pattern.test(content)), `Possible credential format in ${file}.`);
        if (!file.endsWith(".md")) continue;
        documents += 1;

        // The documentation uses inline Markdown links and HTML image/link tags.
        const targets = [
            ...Array.from(content.matchAll(/\]\((?:<([^>]+)>|([^\s)]+))(?:\s+"[^"]*")?\)/g), (match) => match[1] ?? match[2]),
            ...Array.from(content.matchAll(/\b(?:src|href)="([^"]+)"/g), (match) => match[1]),
        ];
        for (const target of targets) {
            if (/^(?:[a-z][a-z\d+.-]*:|#)/i.test(target)) continue;
            const destination = decodeURIComponent(target.split(/[?#]/)[0]);
            if (!destination) continue;
            const resolved = path.resolve(root, path.dirname(file), destination);
            const relative = path.relative(root, resolved);
            assert.ok(relative !== ".." && !relative.startsWith(`..${path.sep}`) && !path.isAbsolute(relative), `Link escapes the repository in ${file}.`);
            await stat(resolved).catch(() => assert.fail(`Broken local link in ${file}: ${destination}`));
            links += 1;
        }
    }

    const manifest = JSON.parse(await readFile(path.join(root, "assets/manifest.json"), "utf8"));
    assert.equal(manifest.length, 3);
    assert.equal(new Set(manifest.map(({ file }) => file)).size, 3);
    for (const asset of manifest) {
        assert.match(asset.file, /^fact-indonesia-[a-z]+\.png$/);
        const bytes = await readFile(path.join(root, "assets", asset.file));
        assert.equal(bytes.length, asset.bytes, `Asset size changed: ${asset.file}`);
        assert.equal(createHash("sha256").update(bytes).digest("hex"), asset.sha256, `Original asset changed: ${asset.file}`);
    }
    return { files: files.length, documents, localLinks: links, originalAssets: manifest.length };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
    console.log(await checkPublication());
}
