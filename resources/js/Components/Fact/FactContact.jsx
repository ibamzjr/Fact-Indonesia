import React from "react";
import { contactActions } from "../../fact/contact";
import OfficialLink from "./OfficialLink";

export default function FactContact({ organization }) {
    const actions = contactActions(organization);
    return (
        <section id="kontak" className="fact-contact" aria-labelledby="fact-contact-title">
            <div className="fact-container fact-contact-inner">
                <div>
                    <p className="fact-eyebrow">Langkah selanjutnya</p>
                    <h2 id="fact-contact-title">Diskusikan kebutuhan Anda</h2>
                    <p>Konfirmasikan jadwal, biaya, dan ketersediaan layanan langsung dengan FACT Indonesia.</p>
                </div>
                <div className="fact-contact-actions">
                    <OfficialLink action={actions[0]} className="fact-action" />
                    <OfficialLink action={actions[1]} />
                </div>
            </div>
        </section>
    );
}
