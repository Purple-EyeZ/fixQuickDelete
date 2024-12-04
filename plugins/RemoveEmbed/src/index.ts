import intlProxy from "../intlProxy";

console.log("intlProxy.DELETE_EMBED:", intlProxy.DELETE_EMBED);

if (intlProxy.DELETE_EMBED) {
    console.log("intlProxy fonctionne : DELETE_EMBED =", intlProxy.DELETE_EMBED);
} else {
    console.warn("intlProxy ne fonctionne pas : DELETE_EMBED est undefined ou null");
}