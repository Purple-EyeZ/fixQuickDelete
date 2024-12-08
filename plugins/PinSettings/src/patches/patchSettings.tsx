import intlProxy from "../intlProxy";
import { findByName } from "@vendetta/metro";
import { after } from "@vendetta/patcher";
import { findInReactTree } from "@vendetta/utils";
import { Forms } from "@vendetta/ui/components";
import SettingsSection from "../components/SettingsSection";

const settingsModule = findByName("UserSettingsOverviewWrapper", false);
console.log("[PinSettings] UserSettingsOverviewWrapper:", settingsModule);

export default function patchSettings() {
    if (!settingsModule) {
        console.error("[PinSettings] Failed to find UserSettingsOverviewWrapper");
        return () => {};
    }

    const patches = new Array<Function>;

    const unpatch = after("default", settingsModule, (_, ret) => {
        const Overview = findInReactTree(ret.props.children, i => i.type && i.type.name === "UserSettingsOverview");
        if (!Overview) {
            console.error("[PinSettings] Failed to find UserSettingsOverview");
            return;
        }

        console.log("[PinSettings] Found UserSettingsOverview:", Overview);

        patches.push(after("render", Overview.type.prototype, (_, { props: { children } }) => {
            const titles = [
                intlProxy.BILLING_SETTINGS,
                intlProxy.PREMIUM_SETTINGS,
            ];

            console.log("[PinSettings] Settings titles for injection:", titles);

            children = findInReactTree(children, (tree) => tree.children[1].type === Forms.FormSection)?.children;

            if (!children) {
                console.error("[PinSettings] Failed to find settings children");
                return;
            }

            console.log("[PinSettings] Found settings children:", children);

            const index = children.findIndex((c: any) => titles.includes(c?.props.label));
            console.log("[PinSettings] Injecting at index:", index);

            children.splice(index === -1 ? 4 : index, 0, <SettingsSection />);
        }));

        unpatch();
    });

    return () => patches.forEach(p => p());
}
