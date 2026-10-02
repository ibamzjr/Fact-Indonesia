import assert from "node:assert/strict";
import test from "node:test";
import { selectionUrl } from "../../resources/js/fact/programSelection.js";

test("program selection preserves the current path and unrelated query data", () => {
    assert.equal(selectionUrl("https://example.com/fact-preview.html?view=compact#tentang", "outplacement"), "/fact-preview.html?view=compact&layanan=outplacement#katalog");
    assert.equal(selectionUrl("https://example.com/fact-preview.html?view=compact&layanan=outplacement#katalog", null), "/fact-preview.html?view=compact#katalog");
    assert.equal(selectionUrl("https://example.com/fact-preview.html", null), "/fact-preview.html");
});

test("unsafe detail destinations cannot be created", () => {
    for (const id of ["../../payments", "javascript:alert(1)", "CSR", ""]) assert.throws(() => selectionUrl("https://example.com/", id), TypeError);
});
