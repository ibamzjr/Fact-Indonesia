import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { factSources, officialReferenceUrl, validateContentProvenance } from "../../resources/js/fact/sources.js";

async function data(name) {
    return JSON.parse(await readFile(new URL(`../../resources/js/Data/${name}.json`, import.meta.url)));
}
const organization = await data("factIndonesia");
const programs = await data("factPrograms");
const faq = await data("factFaq");

test("every displayed business reference is reviewed and matches the service taxonomy", () => {
    assert.equal(validateContentProvenance(organization, programs, faq), true);
    assert.equal(new Set(factSources.map(({ url }) => url)).size, factSources.length);
    for (const source of factSources) {
        assert.match(source.checkedOn, /^\d{4}-\d{2}-\d{2}$/);
        assert.ok(["page", "search-index"].includes(source.retrieval));
        assert.ok(Object.isFrozen(source));
    }
});

test("unreviewed URLs, hidden queries and credentials cannot become reference links", () => {
    for (const value of [null, "https://fact-indonesia.com/not-reviewed/", "https://fact-indonesia.com/?tracking=1",
        "https://fact-indonesia.com/#contact", "https://user:password@fact-indonesia.com/profile/", "https://fact-indonesia.com.evil.test/"]) {
        assert.throws(() => officialReferenceUrl(value), TypeError);
    }
});

test("taxonomy drift and unlabelled editorial policy fail provenance validation", () => {
    assert.throws(() => validateContentProvenance(organization, programs.slice(1), faq), TypeError);
    assert.throws(() => validateContentProvenance(organization, programs.map((item) => ({ ...item, title: "Invented course" })), faq), TypeError);
    assert.throws(() => validateContentProvenance({ ...organization, referenceCheckedOn: "2000-01-01" }, programs, faq), TypeError);
    assert.throws(() => validateContentProvenance(organization, programs, [{ ...faq[0], kind: "invented" }]), TypeError);
});
