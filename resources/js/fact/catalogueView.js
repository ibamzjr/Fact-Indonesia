import { filterPrograms } from "./programs.js";

export function catalogueView({ records = [], status = "ready", query = "", category = "" }) {
    if (!["ready", "loading", "error"].includes(status)) throw new TypeError("Unknown catalogue state.");
    if (status === "loading") return { kind: "loading", programs: [], message: "Memuat layanan..." };
    if (status === "error") return { kind: "error", programs: [], message: "Layanan belum dapat ditampilkan." };
    const programs = filterPrograms(records, { query, category });
    return {
        kind: programs.length ? "ready" : "empty",
        programs,
        message: `${programs.length} layanan ditemukan`,
    };
}
