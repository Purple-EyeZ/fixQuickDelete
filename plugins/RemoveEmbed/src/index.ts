import { findByProps } from "@vendetta/metro";
import { instead } from "@vendetta/patcher";

let unpatch;
export default {
    onLoad: () => {
        const Alerts = findByProps("openLazy", "close"); // Identifie le gestionnaire de dialogues
        if (Alerts) {
            unpatch = instead("openLazy", Alerts, (args, fn) => {
                const dialog = args?.[0];
                
                // Vérifie si c'est le dialogue "Remove All Embed"
                if (dialog?.dialogKey === "alert-store-4") {
                    // Ajoutez ici votre logique (par exemple, exécuter automatiquement `onPress`)
                    dialog.onDismiss?.(); // Exemple : fermer automatiquement
                } else {
                    // Exécute le comportement par défaut pour d'autres dialogues
                    fn(...args);
                }
            });
        }
    },
    onUnload: () => unpatch?.(),
};
