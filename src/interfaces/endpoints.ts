/**
    {
        fuelapiRestHost: "https://www-mc-s10.exacttargetapis.com/"
        restHost: "rest.s10.exacttarget.com"
        ssoUrl: "https://mc.s10.exacttarget.com/cloud/tools/SSO.aspx?env=default&legacy=1&sk=S10"
        stackHost: "mc.s10.exacttarget.com"
        stackKey: "S10"
    }
 */

export interface IEndpoints {
    ssoUrl: string;
    stackKey: string;
    restHost: string;
    stackHost: string;
    fuelapiRestHost: string;
}