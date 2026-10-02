import React from "react";
import { ExternalLinkIcon } from "@heroicons/react/outline";

export default function OfficialLink({ action, className = "fact-text-link" }) {
    return <a className={className} href={action.href} target="_blank" rel="noopener noreferrer">{action.label}<ExternalLinkIcon aria-hidden="true" /></a>;
}
