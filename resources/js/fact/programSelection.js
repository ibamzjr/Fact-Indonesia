export function selectionUrl(location, id) {
    const url = new URL(location);
    if (id === null) url.searchParams.delete("layanan");
    else {
        if (!/^[a-z]+(?:-[a-z]+)*$/.test(id)) throw new TypeError("Invalid service selection.");
        url.searchParams.set("layanan", id);
        url.hash = "katalog";
    }
    return `${url.pathname}${url.search}${url.hash}`;
}
