import { findByProps } from "@vendetta/metro";

export default {
    onLoad: () => {
        const i18n = findByProps("Messages");

        if (i18n) {
            console.log("[Plugin] i18n.Messages détectés :", Object.keys(i18n.Messages));
        } else {
            console.error("[Plugin] i18n.Messages est introuvable !");
        }
    },
    onUnload: () => {},
};