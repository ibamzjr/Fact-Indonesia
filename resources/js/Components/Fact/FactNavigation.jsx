import React from "react";
import { ExternalLinkIcon } from "@heroicons/react/outline";
import { factNavigation } from "../../fact/navigation";

export default function FactNavigation({ organization }) {
    return (
        <header className="fact-header">
            <div className="fact-container fact-header-inner">
                <a className="fact-brand" href="#katalog" aria-label={`${organization.name}, katalog layanan`}>
                    <span className="fact-brand-mark" aria-hidden="true">F</span>
                    <span>FACT<span className="fact-brand-subtitle">Indonesia</span></span>
                </a>
                <nav aria-label="Navigasi utama FACT">
                    {factNavigation.map((item) => <a key={item.id} href={item.href}>{item.label}</a>)}
                </nav>
                <a className="fact-official-link" href={organization.website} target="_blank" rel="noopener noreferrer">
                    Situs resmi <ExternalLinkIcon aria-hidden="true" />
                </a>
            </div>
        </header>
    );
}
