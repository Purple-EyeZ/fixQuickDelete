import intlProxy from "../intlProxy";
import { findByName } from "@vendetta/metro";
import { after } from "@vendetta/patcher";
import { findInReactTree } from "@vendetta/utils";
import { Forms } from "@vendetta/ui/components";
import SettingsSection from "../components/SettingsSection";

const settingsModule = findByName("UserSettingsOverviewWrapper", false);

export default function patchSettings() {
    if (!settingsModule) {
        console.error("[PinSettings] Failed to find UserSettingsOverviewWrapper");
        return () => {};
    }

    const patches: (() => void)[] = [];

    const unpatch = after("default", settingsModule, (_, ret) => {
        const Overview = findInReactTree(ret.props.children, (i) => i.type?.name === "UserSettingsOverview");
        if (!Overview) {
            console.error("[PinSettings] Failed to find UserSettingsOverview");
            return;
        }

        console.log("[PinSettings] Found UserSettingsOverview:", Overview);

        patches.push(
            after("render", Overview.type.prototype, (_, renderRet) => {
                // Trouver les enfants de settings
                const settingsChildren = findInReactTree(
                    renderRet.props.children,
                    (tree) => tree?.children?.[1]?.type === Forms.FormSection
                )?.children;

                if (!settingsChildren) {
                    console.error("[PinSettings] Failed to find settings children");
                    return;
                }

                console.log("[PinSettings] Found settings children:", settingsChildren);

                // Trouver l'index où injecter la nouvelle section
                const titles = [
                    intlProxy.BILLING_SETTINGS,
                    intlProxy.PREMIUM_SETTINGS,
                ];

                const index = settingsChildren.findIndex((c: any) => titles.includes(c?.props?.label));
                console.log("[PinSettings] Injecting at index:", index);

                // Injecter la section custom
                settingsChildren.splice(index === -1 ? 4 : index, 0, <SettingsSection />);
            })
        );

        // Unpatch après la première exécution
        unpatch();
    });

    return () => patches.forEach((p) => p());
}
