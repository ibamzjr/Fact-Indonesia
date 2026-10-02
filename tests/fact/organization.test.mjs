import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { createOrganizationProfile } from "../../resources/js/fact/organization.js";

const reference = JSON.parse(await readFile(new URL("../../resources/js/Data/factIndonesia.json", import.meta.url)));

test("organization presentation consumes a minimal immutable reference", () => {
    const profile = createOrganizationProfile(reference);
    assert.equal(profile.name, "FACT Indonesia");
    assert.equal(profile.website, "https://fact-indonesia.com/");
    assert.ok(Object.isFrozen(profile));
    assert.ok(!("services" in profile));
    assert.ok(!("referenceCheckedOn" in profile));
    assert.equal(createOrganizationProfile({ ...reference, name: " FACT Indonesia " }).name, "FACT Indonesia");
});

test("organization fields and link destinations are checked before rendering", () => {
    for (const override of [{ motto: "" }, { description: null }, { website: "https://example.com/" },
        { profileUrl: "javascript:alert(1)" }, { website: "https://user@fact-indonesia.com/" }]) {
        assert.throws(() => createOrganizationProfile({ ...reference, ...override }), TypeError);
    }
    assert.throws(() => createOrganizationProfile(null), TypeError);
});
