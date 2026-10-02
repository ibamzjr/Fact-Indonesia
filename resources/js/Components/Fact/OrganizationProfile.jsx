import React from "react";
import { ExternalLinkIcon } from "@heroicons/react/outline";

export default function OrganizationProfile({ organization, image }) {
    return (
        <section id="tentang" className="fact-about" aria-labelledby="fact-about-title">
            <div className="fact-container fact-about-grid">
                <div>
                    <p className="fact-eyebrow">Tentang FACT</p>
                    <h2 id="fact-about-title">{organization.motto}</h2>
                    <p>{organization.description}</p>
                    <p className="fact-muted">{organization.fullName}</p>
                    <a className="fact-text-link" href={organization.profileUrl} target="_blank" rel="noopener noreferrer">
                        Profil resmi FACT Indonesia <ExternalLinkIcon aria-hidden="true" />
                    </a>
                </div>
                {image && (
                    <figure>
                        <img src={image} width="3409" height="2556" loading="lazy" decoding="async" alt="Konsep antarmuka FACT Indonesia ditampilkan pada laptop" />
                        <figcaption>Konsep visual portfolio</figcaption>
                    </figure>
                )}
            </div>
        </section>
    );
}
