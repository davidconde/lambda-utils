const mockedResponses = {
    "https://cognito-idp.eu-west-1.amazonaws.com/eu-west-1_A12qwe1b/.well-known/jwks.json": 
    {"keys":[{"alg":"RS256","e":"AQAB","kid":"ltxPjDF4Jb49XFgA46MKDnuDIM7Zv3JkQRBan4XUQOI=","kty":"RSA","n":"l2YMkoeHkFvQhNKsCVC6BoGapJbulKIQHIRZZ5RIvgakAP70E0O0YM9ueFHHKAWNf9TSBHE6wgGJ9WQ8bScuNutIl2EI4fIMpnuxu6yAjXODX-WTtWJ9IpU3DekB78SG2qqjINprC5l3qTDckdR7Cndy_by660R0NpNZN5Wb4sj_yTnG_U5ucLd0q9mFcTaN13rI3QFXe2pb1Cf8dBRnbJbAAalUDXE5mh_XxCt1_OptOJeJZpnpYivWNFnftb7-3vNdl_oa63htX3yUv5yc0l5Bq_aLHkd_Lm7h4PREOalhqr4eG8PvmsQ-Cqi3vASh5669ksf08Xh6tbEdxBv_ww","use":"sig"},{"alg":"RS256","e":"AQAB","kid":"0Jf8eg+7cmyKSjBta+2lXzdrsEASZUQGz4OcrlztzuY=","kty":"RSA","n":"x0yhJpU_IGk-HMmYUgBqtHiCZ4t7XRB_v_7SwA79dwscFBoRmrj6IS6yqGsdBsFlzpLVVIH6UKUPqI6U4KeTpe9Civ3tMdX2raYiUB_S2v39nCLFngrH4Z99jKHwjE-r6PN0FWlawrRRTfzmWZ5Gd1xJ-mQTahk2PD0aNSlgp7uvZaEsjncRoRAW1rQnP079bkBV0Pfw47bx23FFbJ2p2-ywf--BEj-kGu8O9tO_1-Atndr8kzb0PFQRlghvcA5FBx31QdyCHGjAaPh9j7C2-vclZNcsK9iUglAkSI-d2mlQ_V1OxyAh3EbS4-pEUbeRekMXII8m8pMRCt1wK4R17Q","use":"sig"}]}
}

const httpsRequest = (url) => {
    return new Promise( (resolve, reject) => {
        if (mockedResponses[url]) {
            resolve(mockedResponses[url]);
        } else {
            reject('Error');
        }
    })
}; 

module.exports = {
    httpsRequest
};