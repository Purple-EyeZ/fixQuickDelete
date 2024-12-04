import { i18n } from "@vendetta/metro/common";

export default {
    onLoad: () => {
        console.log("[Plugin] i18n.Messages :", i18n.Messages);
    },
    onUnload: () => {
        console.log("[Plugin] Déchargé.");
    },
};
