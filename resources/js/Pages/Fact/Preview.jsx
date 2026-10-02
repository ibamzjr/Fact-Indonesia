import React from "react";
import reference from "../../Data/factIndonesia.json";
import records from "../../Data/factPrograms.json";
import { createOrganizationProfile } from "../../fact/organization";
import { createProgramCatalogue } from "../../fact/programs";
import FactNavigation from "../../Components/Fact/FactNavigation";
import OrganizationProfile from "../../Components/Fact/OrganizationProfile";
import portfolioImage from "../../../../assets/fact-indonesia-hero.png";

const organization = createOrganizationProfile(reference);
const catalogue = createProgramCatalogue(records);

export default function FactPreview() {
    return (
        <div className="fact-preview">
            <a className="fact-skip-link" href="#fact-main">Ke konten utama</a>
            <FactNavigation organization={organization} />
            <main id="fact-main" tabIndex={-1}>
                <section id="katalog" className="fact-catalogue fact-container" aria-labelledby="fact-catalogue-title">
                    <div className="fact-section-heading">
                        <div>
                            <p className="fact-eyebrow">Pelatihan & konsultansi</p>
                            <h1 id="fact-catalogue-title">Layanan FACT Indonesia</h1>
                        </div>
                        <span className="fact-status">Portfolio</span>
                    </div>
                    <p className="fact-intro">Temukan layanan untuk pengembangan diri, usaha, dan organisasi.</p>
                    <ul className="fact-service-list">
                        {catalogue.map((program) => <li key={program.id}><h2>{program.title}</h2><p>{program.summary}</p></li>)}
                    </ul>
                </section>
                <OrganizationProfile organization={organization} image={portfolioImage} />
            </main>
            <footer className="fact-footer"><div className="fact-container"><span>{organization.name}</span><span>{organization.motto}</span></div></footer>
        </div>
    );
}
