import { findByProps } from "@vendetta/metro";
import { instead } from "@vendetta/patcher";

let unpatch;
export default {
    onLoad: () => {
        const Alerts = findByProps("openLazy", "close");
        console.log("[Plugin] Alerts trouvé :", Alerts);

        if (Alerts) {
            unpatch = instead("openLazy", Alerts, (args, fn) => {
                console.log("[Plugin] openLazy intercepté avec les arguments :", args);

                const dialog = args?.[0];
                if (!dialog) {
                    console.warn("[Plugin] Aucun dialogue trouvé dans les arguments.");
                    return fn(...args); // Exécute le comportement par défaut
                }

                console.log("[Plugin] Détails du dialogue intercepté :", dialog);

                // Vérifions ce que fait la fonction importer
                if (dialog.importer && typeof dialog.importer === "function") {
                    console.log("[Plugin] Exécution de la fonction importer...");
                    const importerResult = dialog.importer();
                    console.log("[Plugin] Résultat de la fonction importer :", importerResult);
                } else {
                    console.warn("[Plugin] Aucun importer ou ce n'est pas une fonction.");
                }

                console.log("[Plugin] Dialogue non reconnu, exécution par défaut.");
                return fn(...args); // Comportement par défaut
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