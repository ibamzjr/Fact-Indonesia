import React from "react";
import { PlusIcon } from "@heroicons/react/outline";

export default function FactFaq({ items }) {
    return (
        <section id="faq" className="fact-faq fact-container" aria-labelledby="fact-faq-title">
            <div><p className="fact-eyebrow">Informasi</p><h2 id="fact-faq-title">Pertanyaan umum</h2></div>
            <div className="fact-faq-list">
                {items.map((item) => (
                    <details key={item.id}>
                        <summary>{item.question}<PlusIcon aria-hidden="true" /></summary>
                        <p>{item.answer}</p>
                    </details>
                ))}
            </div>
        </section>
    );
}
