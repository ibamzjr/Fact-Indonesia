import React from "react";
import { createRoot } from "react-dom/client";
import FactPreview from "./Pages/Fact/Preview";
import "../css/fact-preview.css";

createRoot(document.getElementById("fact-preview")).render(
    <React.StrictMode><FactPreview /></React.StrictMode>,
);
