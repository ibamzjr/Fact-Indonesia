import React from "react";
import reference from "../../Data/factIndonesia.json";
import records from "../../Data/factPrograms.json";
import faqRecords from "../../Data/factFaq.json";
import { createFaq } from "../../fact/faq";
import { validateContentProvenance } from "../../fact/sources";
import { createOrganizationProfile } from "../../fact/organization";
import { createProgramCatalogue, findProgram } from "../../fact/programs";
import { programHref } from "../../fact/navigation";
import useFactProgramSelection from "../../hooks/useFactProgramSelection";
import FactNavigation from "../../Components/Fact/FactNavigation";
import OrganizationProfile from "../../Components/Fact/OrganizationProfile";
import ProgramCatalogue from "../../Components/Fact/ProgramCatalogue";
import ProgramDetail from "../../Components/Fact/ProgramDetail";
import FactFaq from "../../Components/Fact/FactFaq";
import FactContact from "../../Components/Fact/FactContact";
import portfolioImage from "../../../../assets/fact-indonesia-hero.png";

const organization = createOrganizationProfile(reference);
const catalogue = createProgramCatalogue(records);
const faq = createFaq(faqRecords);
validateContentProvenance(reference, catalogue, faq);

export default function FactPreview() {
    const { selectedId, selectProgram, closeProgram } = useFactProgramSelection();
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
                    <ProgramCatalogue records={catalogue} onSelect={selectProgram} getProgramHref={(program) => programHref(program.id)} />
                </section>
                <OrganizationProfile organization={organization} image={portfolioImage} />
                <FactFaq items={faq} />
                <FactContact organization={organization} />
            </main>
            <footer className="fact-footer"><div className="fact-container"><span>{organization.name}</span><span>{organization.motto}</span></div></footer>
            <ProgramDetail requestedId={selectedId} program={findProgram(catalogue, selectedId)} organization={organization} onClose={closeProgram} />
        </div>
    );
}
