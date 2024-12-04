import { findByProps } from "@vendetta/metro";
import intlProxy from "./intlProxy"; // Chemin vers le fichier avec le code ci-dessus
import { instead } from "@vendetta/patcher";

let unpatch;

export default {
    onLoad: () => {
        // Vérifiez si intlProxy est fonctionnel
        const deleteMessageText = intlProxy["Delete Message"];
        if (!deleteMessageText) {
            console.error("[Plugin] Texte 'Delete Message' introuvable !");
            return;
        }

        console.log(`[Plugin] Texte détecté pour 'Delete Message' : ${deleteMessageText}`);

        // Patcher le popup
        const Popup = findByProps("show", "openLazy");
        if (Popup) {
            unpatch = instead("show", Popup, (args, fn) => {
                if (args?.[0]?.title === deleteMessageText) {
                    console.log(`[Plugin] Interception du popup : Suppression automatique.`);
                    args[0].onConfirm?.();
                } else {
                    console.log("[Plugin] Autre popup détecté. Exécution par défaut.");
                    return fn(...args);
                }
            });
        } else {
            console.error("[Plugin] Module Popup non trouvé !");
        }
    },
    onUnload: () => {
        unpatch?.();
    },
};
