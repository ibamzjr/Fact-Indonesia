import assert from "node:assert/strict";
import test from "node:test";
import { contactActions } from "../../resources/js/fact/contact.js";

const organization = { website: "https://fact-indonesia.com/", profileUrl: "https://fact-indonesia.com/profile/" };

test("contact only exposes immutable official informational destinations", () => {
    const actions = contactActions(organization);
    assert.equal(actions.length, 2);
    assert.equal(actions[0].href, organization.website);
    assert.equal(actions[1].href, organization.profileUrl);
    assert.ok(Object.isFrozen(actions) && actions.every(Object.isFrozen));
});

test("contact rejects tracking queries, unsafe URLs and personal-data payloads", () => {
    for (const website of ["http://fact-indonesia.com/", "https://user@fact-indonesia.com/", "https://example.com/",
        "https://fact-indonesia.com/?email=participant@example.com", "https://fact-indonesia.com/#tracked", "mailto:person@example.com"]) {
        assert.throws(() => contactActions({ ...organization, website }), TypeError);
    }
});
