export const factNavigation = Object.freeze([
    Object.freeze({ id: "katalog", label: "Layanan", href: "#katalog" }),
    Object.freeze({ id: "tentang", label: "Tentang FACT", href: "#tentang" }),
]);

export function programHref(id) {
    if (!/^[a-z]+(?:-[a-z]+)*$/.test(id)) throw new TypeError("Invalid program slug.");
    return `?layanan=${encodeURIComponent(id)}#katalog`;
}

export function selectedProgramId(search) {
    return new URLSearchParams(search).get("layanan");
}
