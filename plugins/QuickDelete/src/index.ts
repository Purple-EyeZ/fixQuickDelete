import { findByProps } from "@vendetta/metro";
import { instead } from "@vendetta/patcher";

let unpatch;

export default {
    onLoad: () => {
        const Popup = findByProps("show", "openLazy");
        const Intl = findByProps("intl");

        if (!Popup || !Intl?.t) {
            console.error("[Plugin] Impossible de trouver Popup ou Intl.");
            return;
        }

        console.log("[Plugin] Popup et Intl trouvés :", Popup, Intl);

        // Clé trouvée pour "Delete Message"
        const deleteMessageKey = "xwMqDw";
        const deleteMessageTitle = Intl.t?.[deleteMessageKey]?.()?.ast;

        console.log(`[Plugin] Traduction associée à la clé "${deleteMessageKey}" :`, deleteMessageTitle);

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
    },
    onUnload: () => {
        console.log("[Plugin] Déchargement...");
        unpatch?.();
    },
};
