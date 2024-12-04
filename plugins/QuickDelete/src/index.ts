import { findByProps } from "@vendetta/metro";

export default {
    onLoad: () => {
        const Intl = findByProps("intl");
        console.log("[Plugin] Objet Intl :", Intl);
    },
    onUnload: () => {
        console.log("[Plugin] Déchargé.");
    },
};
