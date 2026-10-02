import { officialReferenceUrl } from "./sources.js";

export function contactActions(organization) {
    return Object.freeze([
        Object.freeze({ id: "website", label: "Hubungi FACT", href: officialReferenceUrl(organization.website) }),
        Object.freeze({ id: "profile", label: "Profil organisasi", href: officialReferenceUrl(organization.profileUrl) }),
    ]);
}
