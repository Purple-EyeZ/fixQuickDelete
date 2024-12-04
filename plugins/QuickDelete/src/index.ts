import { findByProps } from "@vendetta/metro";
import { instead } from "@vendetta/patcher";

let unpatch;

export default {
    onLoad: () => {
        // Trouver l'objet intl
        const intl = findByProps("t");

        if (intl) {
            console.log("[Plugin] Intl trouvé :", intl);

            // Vérifiez que la clé existe
            if (intl.t?.MWMcg4) {
                console.log(`[Plugin] Clé sélectionnée pour 'Delete Message' :`, intl.t.MWMcg4);

                // Patcher le popup
                const Popup = findByProps("show", "openLazy");
                if (Popup) {
                    unpatch = instead("show", Popup, (args, fn) => {
                        // Vérifiez si le popup correspond à "Delete message"
                        if (args?.[0]?.title === intl.t.MWMcg4) {
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
            } else {
                console.warn("[Plugin] La clé 'MWMcg4' n'existe pas dans intl.t !");
            }
        } else {
            console.error("[Plugin] Intl non trouvé !");
        }
    },
    onUnload: () => {
        unpatch?.();
    },
};