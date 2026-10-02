import { officialReferenceUrl } from "./sources.js";

export function createFaq(records) {
    if (!Array.isArray(records)) throw new TypeError("FAQ must be an array.");
    const ids = new Set();
    return Object.freeze(records.map((record) => {
        if (!record || !/^[a-z]+(?:-[a-z]+)*$/.test(record.id) || ids.has(record.id)) {
            throw new TypeError("FAQ IDs must be unique slugs.");
        }
        if (![record.question, record.answer].every((value) => typeof value === "string" && value.trim())) {
            throw new TypeError("FAQ questions and answers are required.");
        }
        if (!["reference-summary", "portfolio-policy"].includes(record.kind)) throw new TypeError("Unknown FAQ source kind.");
        officialReferenceUrl(record.sourceUrl);
        ids.add(record.id);
        return Object.freeze({ ...record });
    }));
}
