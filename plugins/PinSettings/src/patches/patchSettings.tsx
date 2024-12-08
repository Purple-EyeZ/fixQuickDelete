import intlProxy from "../intlProxy";
import { findByName } from "@vendetta/metro";
import { after } from "@vendetta/patcher";
import { findInReactTree } from "@vendetta/utils";
import { Forms } from "@vendetta/ui/components";
import SettingsSection from "../components/SettingsSection";

const settingsModule = findByName("UserSettingsOverviewWrapper", false);
console.log("[PinSettings] Found settingsModule:", settingsModule);

export default function patchSettings() {
    if (!settingsModule) {
        console.error("[PinSettings] Failed to find UserSettingsOverviewWrapper");
        return () => {};
    }

    const patches: (() => void)[] = [];
    console.log("[PinSettings] Patching UserSettingsOverviewWrapper...");

    const unpatch = after("default", settingsModule, (_, ret) => {
        console.log("[PinSettings] Inside after hook for UserSettingsOverviewWrapper. Result:", ret);

        if (!ret || !ret.props || !ret.props.children) {
            console.error("[PinSettings] Unexpected structure in settingsModule render:", ret);
            return;
        }

        // Cherche l'objet UserSettingsOverview
        const Overview = findInReactTree(ret.props.children, (i) => i.type?.name === "UserSettingsOverview");
        if (!Overview) {
            console.error("[PinSettings] Failed to find UserSettingsOverview in settingsModule:");
            console.log("[PinSettings] settingsModule render tree:", ret.props.children);
            return;
        }

        console.log("[PinSettings] Found UserSettingsOverview:", Overview);

        // Ajout du patch de rendu
        patches.push(
            after("render", Overview.type.prototype, (_, renderRet) => {
                console.log("[PinSettings] Inside render hook for UserSettingsOverview, result:", renderRet);

                if (!renderRet?.props?.children) {
                    console.error("[PinSettings] Unexpected structure in render result:", renderRet);
                    return;
                }

                // Trouver les enfants des paramètres
                const settingsChildren = findInReactTree(
                    renderRet.props.children,
                    (tree) => tree?.children?.[1]?.type === Forms.FormSection
                )?.children;

                if (!settingsChildren) {
                    console.error("[PinSettings] Failed to find settings children");
                    return;
                }

                console.log("[PinSettings] Found settings children:", settingsChildren);

                // Trouver l'index où injecter
                const titles = [
                    intlProxy.BILLING_SETTINGS,
                    intlProxy.PREMIUM_SETTINGS,
                ];
                console.log("[PinSettings] Settings titles for injection:", titles);

                const index = settingsChildren.findIndex((c: any) => titles.includes(c?.props?.label));
                console.log("[PinSettings] Injecting at index:", index);

                // Injecter la section custom
                settingsChildren.splice(index === -1 ? 4 : index, 0, <SettingsSection />);
                console.log("[PinSettings] SettingsSection successfully injected.");
            })
        );

        console.log("[PinSettings] Unpatching UserSettingsOverviewWrapper...");
        unpatch();
    });

    console.log("[PinSettings] Patch applied to UserSettingsOverviewWrapper.");

    return () => {
        console.log("[PinSettings] Cleaning up patches...");
        patches.forEach((p) => p());
    };
}