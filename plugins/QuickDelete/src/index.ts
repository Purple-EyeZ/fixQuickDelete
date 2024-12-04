import intlProxy from "../intlProxy"; // Assurez-vous que le chemin est correct

export default {
    onLoad: () => {
        console.log("[Plugin] Début du test général de intlProxy...");

        // Tester une clé arbitraire
        const testKey = "hello";
        const testValue = intlProxy[testKey];

        if (testValue) {
            console.log(`[Plugin] Valeur pour la clé '${testKey}' :`, testValue);
        } else {
            console.error(`[Plugin] Aucune valeur trouvée pour la clé '${testKey}' dans intlProxy !`);
        }
    },
    onUnload: () => {},
};