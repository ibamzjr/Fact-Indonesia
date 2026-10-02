export const factSources = Object.freeze([
    Object.freeze({
        id: "services",
        title: "FACT Indonesia official service overview",
        url: "https://fact-indonesia.com/",
        checkedOn: "2026-10-02",
        retrieval: "search-index",
    }),
    Object.freeze({
        id: "profile",
        title: "About FACT Indonesia",
        url: "https://fact-indonesia.com/profile/",
        checkedOn: "2026-10-02",
        retrieval: "page",
    }),
]);

export function officialReferenceUrl(value) {
    if (typeof value !== "string") throw new TypeError("A reference URL must be a string.");
    const url = new URL(value);
    if (url.username || url.password || !factSources.some((source) => source.url === url.href)) {
        throw new TypeError("The destination must be a verified official FACT reference.");
    }
    return url.href;
}

export function validateContentProvenance(organization, programs, faq) {
    officialReferenceUrl(organization.website);
    officialReferenceUrl(organization.profileUrl);
    if (organization.referenceCheckedOn !== factSources[0].checkedOn) throw new TypeError("Organization review date must match the source registry.");
    const serviceTitles = new Map(organization.services.map(({ id, title }) => [id, title]));
    if (programs.length !== serviceTitles.size || new Set(programs.map(({ id }) => id)).size !== serviceTitles.size) {
        throw new TypeError("Programs must correspond to the published service taxonomy.");
    }
    for (const program of programs) {
        if (serviceTitles.get(program.id) !== program.title) throw new TypeError("Program title differs from its official taxonomy reference.");
        officialReferenceUrl(program.sourceUrl);
    }
    for (const item of faq) {
        officialReferenceUrl(item.sourceUrl);
        if (!["reference-summary", "portfolio-policy"].includes(item.kind)) throw new TypeError("FAQ provenance must be explicit.");
    }
    return true;
}
