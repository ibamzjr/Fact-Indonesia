import assert from "node:assert/strict";
import { fileURLToPath } from "node:url";
import test from "node:test";
import { build } from "vite";

test("standalone FACT builds without the inherited property, account or tracking runtime", async () => {
    const result = await build({
        configFile: fileURLToPath(new URL("../../vite.fact.config.js", import.meta.url)),
        logLevel: "silent",
        build: { write: false, minify: false, reportCompressedSize: false },
    });
    const root = fileURLToPath(new URL("../../", import.meta.url)).replaceAll("\\", "/");
    const chunks = result.output.filter(({ type }) => type === "chunk");
    const localModules = chunks.flatMap((chunk) => Object.keys(chunk.modules))
        .map((id) => id.replaceAll("\\", "/"))
        .filter((id) => id.startsWith(root) && !id.includes("/node_modules/"))
        .map((id) => id.slice(root.length));
    const allowed = /^(?:fact-preview\.html|resources\/js\/(?:fact-preview\.jsx|fact\/[^/]+\.js|Data\/fact[^/]+\.json|Components\/Fact\/[^/]+\.jsx|Pages\/Fact\/Preview\.jsx|hooks\/useFactProgramSelection\.js)|resources\/css\/fact-preview\.css|assets\/fact-indonesia-hero\.png)$/;
    for (const module of localModules) assert.match(module, allowed, `Unexpected inherited dependency: ${module}`);
    assert.ok(localModules.includes("resources/js/Pages/Fact/Preview.jsx"));
    assert.ok(localModules.includes("resources/js/Components/Fact/ProgramCatalogue.jsx"));
    assert.ok(result.output.some(({ fileName }) => fileName === "fact-preview.html"));
});
