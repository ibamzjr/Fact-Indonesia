import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { createProgramCatalogue, filterPrograms, findProgram, validateProgramCatalogue } from "../../resources/js/fact/programs.js";

const records = JSON.parse(await readFile(new URL("../../resources/js/Data/factPrograms.json", import.meta.url)));

test("the catalogue contains five separate, immutable FACT service records", () => {
    const catalogue = createProgramCatalogue(records);
    assert.equal(catalogue.length, 5);
    assert.equal(new Set(catalogue.map(({ id }) => id)).size, 5);
    assert.ok(Object.isFrozen(catalogue) && catalogue.every(Object.isFrozen));
    assert.notEqual(catalogue[0], records[0]);
    assert.equal(findProgram(catalogue, "missing"), null);
    assert.equal(findProgram(catalogue, "pre-retirement").title, "Pre Retirement Training");
});

test("discovery combines case-insensitive search and category without mutating data", () => {
    assert.equal(filterPrograms(records, { query: "  PENSIUN  " }).length, 1);
    assert.equal(filterPrograms(records, { category: "Pelatihan" }).length, 3);
    assert.equal(filterPrograms(records, { category: "Kegiatan", query: "pensiun" }).length, 0);
    assert.deepEqual(filterPrograms(records), records);
    assert.deepEqual(filterPrograms([]), []);
});

test("invalid data, duplicate slugs and inherited property fields are rejected", () => {
    for (const bad of [null, {}, [null], [records[0], records[0]], [{ ...records[0], title: " " }],
        [{ ...records[0], id: "Bad ID" }], [{ ...records[0], price: 1000 }],
        [{ ...records[0], category: "Property" }], [{ ...records[0], availability: "enroll-now" }]]) {
        assert.throws(() => validateProgramCatalogue(bad), TypeError);
    }
});

test("references reject unsafe or unofficial destinations", () => {
    for (const sourceUrl of ["javascript:alert(1)", "http://fact-indonesia.com/", "https://example.com/", "https://user@fact-indonesia.com/"]) {
        assert.throws(() => createProgramCatalogue([{ ...records[0], sourceUrl }]), TypeError);
    }
});
