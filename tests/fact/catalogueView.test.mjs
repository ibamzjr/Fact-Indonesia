import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { catalogueView } from "../../resources/js/fact/catalogueView.js";

const records = JSON.parse(await readFile(new URL("../../resources/js/Data/factPrograms.json", import.meta.url)));

test("catalogue status determines loading, error and ready presentation explicitly", () => {
    assert.equal(catalogueView({ records }).kind, "ready");
    assert.deepEqual(catalogueView({ records, status: "loading" }).programs, []);
    assert.equal(catalogueView({ records, status: "error" }).kind, "error");
    assert.throws(() => catalogueView({ status: "unknown" }), TypeError);
});

test("empty inventory and no matching search have an empty, announced result", () => {
    assert.equal(catalogueView({}).kind, "empty");
    const view = catalogueView({ records, query: "unmatched" });
    assert.equal(view.kind, "empty");
    assert.equal(view.message, "0 layanan ditemukan");
    assert.equal(catalogueView({ records, category: "Konsultansi" }).programs.length, 1);
});
