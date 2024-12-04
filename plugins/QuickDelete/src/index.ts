import { findByProps } from "@vendetta/metro";
import { instead } from "@vendetta/patcher";

let unpatch;

export default {
    onLoad: () => {
        const intl = findByProps("Messages");

        if (intl) {
            console.log("[Plugin] Intl trouvé :", intl);

            // Afficher uniquement les clés contenant "Delete"
            const deleteKeys = Object.entries(intl.Messages)
                .filter(([key, value]) => typeof value === "string" && value.toLowerCase().includes("delete"));

            console.log("[Plugin] Clés contenant 'Delete' :", deleteKeys);

            // Trouver les clés exactes correspondant à "Delete Message"
            const deleteMessageKeys = deleteKeys.filter(
                ([key, value]) => value.toLowerCase() === "delete message"
            );

            console.log("[Plugin] Clés correspondant à 'Delete Message' :", deleteMessageKeys);

            if (deleteMessageKeys.length > 0) {
                // On récupère la première clé correspondant à "Delete Message"
                const [deleteKey] = deleteMessageKeys[0];
                console.log(`[Plugin] Clé sélectionnée pour 'Delete Message' :`, deleteKey);

                // Patcher le popup
                const Popup = findByProps("show", "openLazy");
                if (Popup) {
                    unpatch = instead("show", Popup, (args, fn) => {
                        if (args?.[0]?.title === intl.Messages[deleteKey]) {
                            console.log(`[Plugin] Interception du popup : Suppression automatique.`);
                            args[0].onConfirm?.();
                        } else {
                            console.log("[Plugin] Autre popup détecté. Exécution par défaut.");
                            return fn(...args);
                        }
                    });
                }
            } else {
                console.warn("[Plugin] Aucune clé exacte pour 'Delete Message' trouvée !");
            }
        } else {
            console.error("[Plugin] Intl non trouvé !");
        }
    },
    onUnload: () => {
        unpatch?.();
    },
};
