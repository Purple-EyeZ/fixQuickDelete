import intlProxy from "../intlProxy";

// Liste de mots courants utilisés dans les clés (complète cette liste au besoin).
const dictionary = [
    "DELETE", "MESSAGE", "EMBED", "REMOVE", "ADD", "EDIT", "USER", 
    "ROLE", "ALL", "CONTENT", "TITLE", "NAME", "CHANNEL", "ALL", "ARE", "YOU", "SURE", "THIS", "WILL", "EMBEDS", "ON", "THIS", "FOR", "EVERYONE"
];

// Fonction pour générer des combinaisons.
function generateCombinations(words, maxLength = 4) {
    const combinations = [];

    // Fonction récursive pour créer les combinaisons
    function combine(current, depth) {
        if (depth > maxLength) return;
        for (const word of words) {
            const newCombo = current ? `${current}_${word}` : word;
            combinations.push(newCombo);
            combine(newCombo, depth + 1);
        }
    }

    combine("", 1); // Commence à créer les combinaisons
    return combinations;
}

// Génère toutes les combinaisons jusqu'à 3 mots.
const keysToTest = generateCombinations(dictionary, 3);

// Vérifie les clés dynamiquement.
const foundKeys = [];

keysToTest.forEach(key => {
    const value = intlProxy[key];
    if (value && value !== "") {
        console.log(`Found: ${key} = ${value}`);
        foundKeys.push(key);
    }
});

console.log("Discovered keys:", foundKeys);
