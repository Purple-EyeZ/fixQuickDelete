import { findByProps } from "@vendetta/metro";
import { instead } from "@vendetta/patcher";

let unpatch;
export default {
    onLoad: () => {
        const Alerts = findByProps("openLazy", "close"); // Recherche le gestionnaire de dialogues
        console.log("[Plugin] Alerts trouvé :", Alerts);

        if (Alerts) {
            unpatch = instead("openLazy", Alerts, (args, fn) => {
                console.log("[Plugin] openLazy intercepté avec les arguments :", args);

                const dialog = args?.[0];
                if (!dialog) {
                    console.warn("[Plugin] Aucun dialogue trouvé dans les arguments.");
                    return fn(...args); // Exécute le comportement par défaut si aucun dialogue
                }

                console.log("[Plugin] Détails du dialogue intercepté :", dialog);

                // Vérifie si c'est le dialogue "Remove All Embed"
                if (dialog.dialogKey === "alert-store-4") {
                    console.log("[Plugin] Dialogue 'Remove All Embed' détecté. Ajout de logique.");
                    
                    // Exemple de logique : fermer le dialogue ou appeler onDismiss
                    dialog.onDismiss?.(); // Automatiquement fermer le dialogue
                } else {
                    console.log("[Plugin] Dialogue non reconnu, exécution par défaut.");
                    fn(...args); // Comportement par défaut pour les autres dialogues
                }
            });
        } else {
            console.error("[Plugin] Impossible de trouver le gestionnaire de dialogues (Alerts).");
        }
    },

    onUnload: () => {
        console.log("[Plugin] Déchargement du plugin...");
        unpatch?.();
    },
};
