import { findByProps } from "@vendetta/metro";
import { instead } from "@vendetta/patcher";

let unpatch;

export default {
    onLoad: () => {
        const Popup = findByProps("show", "openLazy");

        if (!Popup) return;

        unpatch = instead("show", Popup, (args, fn) => {
            if (args?.[0]?.title === "Delete Message") {
                args[0].onConfirm?.();
            } else {
                fn(...args);
            }
        });
    },

    onUnload: () => {
        unpatch?.();
    },
};
