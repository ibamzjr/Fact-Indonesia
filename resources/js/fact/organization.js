export function createOrganizationProfile(reference) {
    const profile = {};
    for (const field of ["name", "fullName", "motto", "description", "website", "profileUrl"]) {
        if (typeof reference?.[field] !== "string" || !reference[field].trim()) {
            throw new TypeError(`Missing organization field: ${field}.`);
        }
        profile[field] = reference[field].trim();
    }
    for (const field of ["website", "profileUrl"]) {
        const url = new URL(profile[field]);
        if (url.origin !== "https://fact-indonesia.com" || url.username || url.password) {
            throw new TypeError("Organization links must use the official HTTPS website.");
        }
    }
    return Object.freeze(profile);
}
