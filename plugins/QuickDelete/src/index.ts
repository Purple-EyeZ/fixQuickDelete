import { findByProps } from "@vendetta/metro";

export default {
    onLoad: () => {
        const intl = findByProps("intl");
        const runtimeHashMessageKey = findByProps("runtimeHashMessageKey");

        if (!intl || !runtimeHashMessageKey) {
            console.error("[Plugin] Les modules nécessaires sont introuvables !");
            return;
        }

        const testKey = "Delete Message";
        const hash = runtimeHashMessageKey(testKey);

        console.log(`[Plugin] Hash pour '${testKey}' :`, hash);

        try {
            const message = intl.string(intl.t[hash]);
            console.log(`[Plugin] Message récupéré pour '${testKey}' :`, message);
        } catch (e) {
            console.error("[Plugin] Erreur lors de la récupération du message :", e);
        }
    },
    onUnload: () => {},
};