import { findByProps } from "@vendetta/metro";
import intlProxy from "../intlProxy"; // Assurez-vous que l'importation est correcte
import { instead } from "@vendetta/patcher";

let unpatch;

export default {
    onLoad: () => {
        const Popup = findByProps("show", "openLazy"); // Recherche du composant `Popup`
        if (Popup) {
            unpatch = instead("show", Popup, (args, fn) => {
                const titleKey = args?.[0]?.title;

                // Vérifie si le titre correspond à l'une des clés
                if (titleKey === intlProxy.DELETE_MESSAGE || titleKey === intlProxy.SUPPRESS_EMBED_TITLE) {
                    args[0].onConfirm?.(); // Déclenche toujours la confirmation
                } else {
                    fn(...args); // Sinon, comportement par défaut
                }
            });
        }
    },
    onUnload: () => unpatch?.(),
};