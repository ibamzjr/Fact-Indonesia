import { useEffect, useRef, useState } from "react";
import { selectedProgramId } from "../fact/navigation";
import { selectionUrl } from "../fact/programSelection";

export default function useFactProgramSelection() {
    const [selectedId, setSelectedId] = useState(() => selectedProgramId(window.location.search));
    const ownsEntry = useRef(false);

    useEffect(() => {
        function restoreSelection(event) {
            ownsEntry.current = Boolean(event.state?.factSelection);
            setSelectedId(selectedProgramId(window.location.search));
        }
        window.addEventListener("popstate", restoreSelection);
        return () => window.removeEventListener("popstate", restoreSelection);
    }, []);

    function selectProgram(program, event) {
        if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        event.preventDefault();
        window.history.pushState({ ...window.history.state, factSelection: true }, "", selectionUrl(window.location.href, program.id));
        ownsEntry.current = true;
        setSelectedId(program.id);
    }

    function closeProgram() {
        if (ownsEntry.current) window.history.back();
        else {
            window.history.replaceState(window.history.state, "", selectionUrl(window.location.href, null));
            setSelectedId(null);
        }
    }

    return { selectedId, selectProgram, closeProgram };
}
