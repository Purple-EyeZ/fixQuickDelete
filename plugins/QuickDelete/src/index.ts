import { findByProps, findByName } from "@vendetta/metro";

export default {
    onLoad: () => {
        try {
            const intl = findByProps("intl");
            console.log("[Plugin] intl contenu :", intl);

            const messages = findByProps("Messages");
            console.log("[Plugin] Messages disponibles :", Object.keys(messages || {}));

            const allProps = findByProps("format", "locale");
            console.log("[Plugin] Propriétés générales liées à la langue :", allProps);
        } catch (e) {
            console.error("[Plugin] Une erreur est survenue :", e);
        }
    },
    onUnload: () => {},
};