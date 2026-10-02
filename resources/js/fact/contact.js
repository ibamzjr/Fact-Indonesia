export function contactActions(organization) {
    function officialDestination(value) {
        const url = new URL(value);
        if (url.origin !== "https://fact-indonesia.com" || url.username || url.password || url.search || url.hash) {
            throw new TypeError("Contact actions must use clean official website links.");
        }
        return url.href;
    }
    return Object.freeze([
        Object.freeze({ id: "website", label: "Hubungi FACT", href: officialDestination(organization.website) }),
        Object.freeze({ id: "profile", label: "Profil organisasi", href: officialDestination(organization.profileUrl) }),
    ]);
}
