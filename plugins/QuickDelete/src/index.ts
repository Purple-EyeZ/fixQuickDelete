import { findByProps } from "@vendetta/metro";

export default {
    onLoad: () => {
        const intl = findByProps("intl");
        const runtimeHashMessageKey = findByProps("runtimeHashMessageKey");

        console.log("[Plugin] intl :", intl);
        console.log("[Plugin] runtimeHashMessageKey :", runtimeHashMessageKey);

        if (!intl || !runtimeHashMessageKey) {
            console.error("[Plugin] Les modules nécessaires (intl ou runtimeHashMessageKey) sont introuvables !");
        } else {
            console.log("[Plugin] Les modules nécessaires sont disponibles.");
        }
    },
    onUnload: () => {},
};