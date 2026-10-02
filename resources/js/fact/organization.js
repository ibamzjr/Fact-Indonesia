import { officialReferenceUrl } from "./sources.js";

export function createOrganizationProfile(reference) {
    const profile = {};
    for (const field of ["name", "fullName", "motto", "description", "website", "profileUrl"]) {
        if (typeof reference?.[field] !== "string" || !reference[field].trim()) {
            throw new TypeError(`Missing organization field: ${field}.`);
        }
        profile[field] = reference[field].trim();
    }
    for (const field of ["website", "profileUrl"]) {
        officialReferenceUrl(profile[field]);
    }
    return Object.freeze(profile);
}
