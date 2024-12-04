import intlProxy from "../intlProxy";

console.log("intlProxy.DELETE_MESSAGE:", intlProxy.DELETE_MESSAGE);

if (intlProxy.DELETE_MESSAGE) {
    console.log("intlProxy fonctionne : DELETE_MESSAGE =", intlProxy.DELETE_MESSAGE);
} else {
    console.warn("intlProxy ne fonctionne pas : DELETE_MESSAGE est undefined ou null");
}