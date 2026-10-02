import React, { useEffect, useRef } from "react";
import { ExternalLinkIcon, XIcon } from "@heroicons/react/outline";

export default function ProgramDetail({ requestedId, program, organization, onClose }) {
    const dialog = useRef(null);

    useEffect(() => {
        if (requestedId === null) return;
        const element = dialog.current;
        const previousOverflow = document.body.style.overflow;
        element.showModal();
        document.body.style.overflow = "hidden";
        return () => {
            element.close();
            document.body.style.overflow = previousOverflow;
        };
    }, [requestedId]);

    return (
        <dialog className="fact-detail" ref={dialog} aria-labelledby="fact-detail-title" aria-describedby={program ? "fact-detail-summary" : undefined} onCancel={(event) => { event.preventDefault(); onClose(); }}>
            <div className="fact-detail-heading">
                <p className="fact-eyebrow">{program?.category ?? "Layanan"}</p>
                <button className="fact-icon-button" type="button" onClick={onClose} aria-label="Tutup detail layanan"><XIcon aria-hidden="true" /></button>
            </div>
            <h2 id="fact-detail-title">{program?.title ?? "Layanan tidak ditemukan"}</h2>
            {program ? (
                <>
                    <p id="fact-detail-summary">{program.summary}</p>
                    <dl className="fact-detail-facts">
                        <div><dt>Ketersediaan</dt><dd>Konfirmasi langsung dengan FACT Indonesia</dd></div>
                        <div><dt>Jadwal & biaya</dt><dd>Informasi terbaru tersedia melalui tim FACT</dd></div>
                    </dl>
                    <a className="fact-action" href={organization.website} target="_blank" rel="noopener noreferrer">Hubungi FACT <ExternalLinkIcon aria-hidden="true" /></a>
                    <a className="fact-text-link fact-detail-source" href={program.sourceUrl} target="_blank" rel="noopener noreferrer">Referensi layanan resmi <ExternalLinkIcon aria-hidden="true" /></a>
                </>
            ) : (
                <>
                    <p>Pilih layanan yang tersedia dari katalog FACT Indonesia.</p>
                    <button className="fact-action" type="button" onClick={onClose}>Kembali ke katalog</button>
                </>
            )}
        </dialog>
    );
}
