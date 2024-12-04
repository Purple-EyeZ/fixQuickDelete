import intlProxy from "./intlProxy"; // Assurez-vous que le chemin est correct

export default {
    onLoad: () => {
        console.log("[Plugin] Chargement du plugin...");

        // Liste toutes les clés disponibles dans intlProxy
        console.log("[Plugin] Messages disponibles :", Object.keys(intlProxy));

        // Test pour accéder à 'Delete Message'
        const deleteMessageText = intlProxy["Delete Message"];
        if (!deleteMessageText) {
            console.error("[Plugin] Texte 'Delete Message' introuvable !");
        } else {
            console.log(`[Plugin] Texte détecté pour 'Delete Message' : ${deleteMessageText}`);
        }
    },
    onUnload: () => {
        console.log("[Plugin] Déchargement du plugin...");
    },
};
