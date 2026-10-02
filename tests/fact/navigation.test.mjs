import assert from "node:assert/strict";
import test from "node:test";
import { factNavigation, programHref, selectedProgramId } from "../../resources/js/fact/navigation.js";

test("FACT navigation uses unique, descriptive same-page destinations", () => {
    assert.equal(new Set(factNavigation.map(({ id }) => id)).size, factNavigation.length);
    for (const item of factNavigation) {
        assert.equal(item.href, `#${item.id}`);
        assert.ok(item.label && Object.isFrozen(item));
    }
});

test("program links preserve a readable, safe and shareable selection", () => {
    assert.equal(programHref("csr-research"), "?layanan=csr-research#katalog");
    assert.equal(selectedProgramId("?layanan=csr-research&other=value"), "csr-research");
    assert.equal(selectedProgramId(""), null);
    for (const id of [undefined, null, 123, {}, "../foo", "foo bar", "<script>", ""]) assert.throws(() => programHref(id), TypeError);
});
