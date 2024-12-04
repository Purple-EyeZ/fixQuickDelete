import { findByProps } from "@vendetta/metro";
import { i18n } from "@metro/common"; // Import des traductions
import { instead } from "@vendetta/patcher";

let unpatch;

export default {
    onLoad: () => {
        const Popup = findByProps("show", "openLazy");
        if (Popup) {
            console.log("[Plugin] Popup trouvé :", Popup);

            const deleteMessageTitle = i18n?.Messages?.DELETE_MESSAGE;
            console.log("[Plugin] Traduction pour 'Delete Message' :", deleteMessageTitle);

            unpatch = instead("show", Popup, (args, fn) => {
                console.log("[Plugin] Popup.show intercepté avec les arguments :", args);

                if (args?.[0]?.title === deleteMessageTitle) {
                    console.log("[Plugin] Suppression de message détectée. Exécution de onConfirm.");
                    args[0].onConfirm?.();
                } else {
                    console.log("[Plugin] Autre popup détecté. Exécution par défaut.");
                    fn(...args);
                }
            });
        } else {
            console.error("[Plugin] Impossible de trouver 'Popup'.");
        }
    },

    onUnload: () => {
        console.log("[Plugin] Déchargement...");
        unpatch?.();
    },
};