import { findByProps } from "@vendetta/metro";
import intlProxy from "../intlProxy"; // Assurez-vous que l'importation est correcte
import { instead } from "@vendetta/patcher";

let unpatch;

export default {
    onLoad: () => {
        const Popup = findByProps("show", "openLazy"); // Recherche du composant `Popup`
        if (Popup) {
            unpatch = instead("show", Popup, (args, fn) => {
                // Vérification si le titre correspond à la clé DELETE_MESSAGE
                if (args?.[0]?.title === intlProxy.SUPPRESS_EMBED_TITLE) {
                    args[0].onConfirm?.(); // Si c'est le cas, déclenche la confirmation
                } else {
                    fn(...args); // Sinon, laisse le comportement par défaut
                }
            });
        }
    },
    onUnload: () => unpatch?.(),
};