import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { createFaq } from "../../resources/js/fact/faq.js";

const records = JSON.parse(await readFile(new URL("../../resources/js/Data/factFaq.json", import.meta.url)));

test("FACT FAQ separates business references from portfolio policy", () => {
    const faq = createFaq(records);
    assert.equal(faq.length, 4);
    assert.equal(faq.filter(({ kind }) => kind === "portfolio-policy").length, 2);
    assert.ok(Object.isFrozen(faq) && faq.every(Object.isFrozen));
    assert.ok(faq.find(({ id }) => id === "registration").answer.includes("tidak menerima"));
});

test("FAQ rejects missing content, duplicate IDs, unsafe links and invented source types", () => {
    for (const invalid of [null, [null], [records[0], records[0]], [{ ...records[0], answer: " " }],
        [{ ...records[0], sourceUrl: "https://example.com/" }], [{ ...records[0], kind: "official-quote" }]]) {
        assert.throws(() => createFaq(invalid), TypeError);
    }
});
