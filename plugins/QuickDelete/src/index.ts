import { findByProps } from "@vendetta/metro";
import { instead } from "@vendetta/patcher";

let unpatch;

export default {
    onLoad: () => {
        console.log("[Plugin] Chargement...");

        const Popup = findByProps("show", "openLazy");
        console.log("[Plugin] Popup trouvé :", Popup);

        if (!Popup) {
            console.error("[Plugin] Impossible de trouver 'Popup'.");
            return;
        }

        // Patch de la méthode 'show'
        unpatch = instead("show", Popup, (args, fn) => {
            console.log("[Plugin] Popup.show appelé avec les arguments :", args);

            // Vérifie directement le titre
            if (args?.[0]?.title === "Delete Message") {
                console.log("[Plugin] Suppression de message détectée. Exécution de onConfirm.");
                args[0].onConfirm?.();
            } else {
                console.log("[Plugin] Autre popup détectée. Exécution par défaut.");
                fn(...args);
            }
        });
    },

    onUnload: () => {
        console.log("[Plugin] Déchargement...");
        unpatch?.();
    },
};
