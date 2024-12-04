import intlProxy from "../intlProxy";

export default {
    onLoad: () => {
        try {
            console.log("[Plugin] Test dynamique sur intlProxy...");

            // Parcourir dynamiquement les clés pour détecter ce qui est disponible
            for (const key in intlProxy) {
                console.log(`[Plugin] Clé trouvée : ${key}, Valeur :`, intlProxy[key]);
            }
        } catch (e) {
            console.error("[Plugin] Erreur lors du test sur intlProxy :", e);
        }
    },
    onUnload: () => {},
};