import intlProxy from "../intlProxy";

const prefixes = ["DELETE", "EDIT", "ADD", "MESSAGE", "USER", "ROLE"];
const suffixes = ["MESSAGE", "EMBED", "ROLE", "NAME", "CONTENT", "TITLE"];

const foundKeys = [];

prefixes.forEach(prefix => {
    suffixes.forEach(suffix => {
        const key = `${prefix}_${suffix}`;
        const value = intlProxy[key];
        if (value && value !== "") {
            console.log(`Found: ${key} = ${value}`);
            foundKeys.push(key);
        }
    });
});

console.log("Discovered keys:", foundKeys);