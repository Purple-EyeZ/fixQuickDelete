import { findByProps } from "@vendetta/metro";
import { instead } from "@vendetta/patcher";

let unpatch;
export default {
    onLoad: () => {
        const Popup = findByProps("show", "openLazy");
        if (Popup) {
            unpatch = instead("show", Popup, (args, fn) => {
                args?.[0]?.title === "Delete Message" 
                    ? args[0].onConfirm?.() 
                    : fn(...args);
            });
        }
    },
    onUnload: () => unpatch?.(),
};
