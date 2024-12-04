import intlProxy from "../intlProxy";

console.log("intlProxy.REMOVE_EMBED:", intlProxy.REMOVE_EMBED);

if (intlProxy.REMOVE_EMBED) {
    console.log("intlProxy fonctionne : REMOVE_EMBED =", intlProxy.REMOVE_EMBED);
} else {
    console.warn("intlProxy ne fonctionne pas : REMOVE_EMBED est undefined ou null");
}