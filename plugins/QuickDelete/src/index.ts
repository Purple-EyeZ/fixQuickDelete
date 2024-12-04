import intlProxy from "../intlProxy";

console.log("intlProxy.GUILD_INVITE_CTA:", intlProxy.GUILD_INVITE_CTA);

if (intlProxy.GUILD_INVITE_CTA) {
    console.log("intlProxy fonctionne : GUILD_INVITE_CTA =", intlProxy.GUILD_INVITE_CTA);
} else {
    console.warn("intlProxy ne fonctionne pas : GUILD_INVITE_CTA est undefined ou null");
}