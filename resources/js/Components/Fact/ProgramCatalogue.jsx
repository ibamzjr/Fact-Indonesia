import React, { useState } from "react";
import { ArrowRightIcon, SearchIcon } from "@heroicons/react/outline";
import { programCategories } from "../../fact/programs";
import { catalogueView } from "../../fact/catalogueView";

export default function ProgramCatalogue({ records, status = "ready", onRetry, onSelect, getProgramHref = (program) => program.sourceUrl }) {
    const [query, setQuery] = useState("");
    const [category, setCategory] = useState("");
    const view = catalogueView({ records, status, query, category });

    function resetFilters() {
        setQuery("");
        setCategory("");
    }

    return (
        <div aria-busy={status === "loading"}>
            <div className="fact-filters" role="search" aria-label="Pencarian layanan">
                <div className="fact-search-field">
                    <label htmlFor="fact-program-search">Cari layanan</label>
                    <div><SearchIcon aria-hidden="true" /><input id="fact-program-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Nama atau topik layanan" /></div>
                </div>
                <div className="fact-category-field">
                    <label htmlFor="fact-program-category">Kategori</label>
                    <select id="fact-program-category" value={category} onChange={(event) => setCategory(event.target.value)}>
                        <option value="">Semua kategori</option>
                        {programCategories.map((item) => <option key={item}>{item}</option>)}
                    </select>
                </div>
            </div>
            <p className="fact-results-count" role="status">{view.message}</p>
            {view.kind === "ready" && (
                <div className="fact-program-grid">
                    {view.programs.map((program, index) => (
                        <article className="fact-program" key={program.id}>
                            <div className="fact-program-meta"><span>{program.category}</span><span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span></div>
                            <h2>{program.title}</h2>
                            <p>{program.summary}</p>
                            <a className="fact-text-link" href={getProgramHref(program)} onClick={onSelect ? (event) => onSelect(program, event) : undefined} aria-label={`Detail layanan ${program.title}`}>
                                Detail layanan <ArrowRightIcon aria-hidden="true" />
                            </a>
                        </article>
                    ))}
                </div>
            )}
            {view.kind === "loading" && <div className="fact-catalogue-state" aria-hidden="true"><span className="fact-static-placeholder" /><span className="fact-static-placeholder" /></div>}
            {view.kind === "empty" && (
                <div className="fact-catalogue-state">
                    <h2>{records?.length ? "Belum ada layanan yang cocok" : "Katalog belum tersedia"}</h2>
                    {(query || category) && <button className="fact-action" type="button" onClick={resetFilters}>Reset filter</button>}
                </div>
            )}
            {view.kind === "error" && onRetry && <button className="fact-action" type="button" onClick={onRetry}>Coba lagi</button>}
        </div>
    );
}
