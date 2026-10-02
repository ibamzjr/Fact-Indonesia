import { officialReferenceUrl } from "./sources.js";

export const programCategories = Object.freeze(["Pelatihan", "Konsultansi", "Kegiatan"]);

const fields = ["id", "title", "category", "summary", "availability", "sourceUrl"];

export function validateProgramCatalogue(records) {
    if (!Array.isArray(records)) throw new TypeError("A program catalogue must be an array.");
    const ids = new Set();

    records.forEach((record) => {
        if (!record || typeof record !== "object" || Array.isArray(record)) {
            throw new TypeError("Each program must be a record.");
        }
        if (Object.keys(record).some((field) => !fields.includes(field))) {
            throw new TypeError("Unsupported program field.");
        }
        for (const field of fields) {
            if (typeof record[field] !== "string" || !record[field].trim()) {
                throw new TypeError(`Missing program field: ${field}.`);
            }
        }
        if (!/^[a-z]+(?:-[a-z]+)*$/.test(record.id) || ids.has(record.id)) {
            throw new TypeError("Program IDs must be unique URL-safe slugs.");
        }
        if (!programCategories.includes(record.category) || record.availability !== "contact-required") {
            throw new TypeError("Unsupported category or availability.");
        }
        officialReferenceUrl(record.sourceUrl);
        ids.add(record.id);
    });

    return records;
}

export function createProgramCatalogue(records) {
    validateProgramCatalogue(records);
    return Object.freeze(records.map((record) => Object.freeze({ ...record })));
}

export function findProgram(records, id) {
    return records.find((record) => record.id === id) ?? null;
}

export function filterPrograms(records, { query = "", category = "" } = {}) {
    const search = query.trim().normalize("NFKC").toLocaleLowerCase("id-ID");
    return records.filter((record) => {
        const text = `${record.title} ${record.summary}`.normalize("NFKC").toLocaleLowerCase("id-ID");
        return (!category || record.category === category) && (!search || text.includes(search));
    });
}
