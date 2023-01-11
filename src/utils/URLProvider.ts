export class URLProvider {
    public static baseUrl = ""
    public static URL_HOME = "/"
    public static URL_TOKEN_CREATOR = "/token-creator"
    public static URL_TOKEN_MINT = "/token-mint"
    public static URL_TOKEN_BURN = "/token-burn"
    public static URL_TOKEN_DETAIL = "/token/:tokenId"
    public static URL_FAQ= "/faq"
    public static URL_NFTs= "/nfts"
    public static URL_CONTACT= "/contact"
    public static URL_TERMS= "/terms"
    public static URL_COLLECTION_CREATOR = "/collection-creator"
    public static URL_NFT_MINT = "/nft-mint"
    public static URL_COLLECTION_DETAIL = "/collection/:collectionId"
    public static URL_VERSION = "/version"
    //TBD
    public static URL_GET_TZEN = "https://horizen.io"
}

function hasNumbers(t: string) {
    const regex = /\d/g
    return regex.test(t)
}

export function detectRoute(url: string) {
    const urlComponents = url.split("/")
    const validComponents = urlComponents
        .filter(
            (component: string) =>
                !component.startsWith(":") && !hasNumbers(component)
        )
        .join("/")

    // eslint-disable-next-line no-restricted-syntax
    for (const urlProvided of Object.values(URLProvider)) {
        const providedComp = urlProvided
            .split("/")
            .filter(
                (component: string) =>
                    !component.startsWith(":") && !hasNumbers(component)
            )
            .join("/")

        if (providedComp === validComponents) {
            return urlProvided
        }
    }
    return undefined
}

// Returns the route provided without the parameter component. Example: '/block/:blockId' -> '/block/'
export function cleanRoute(url: string) {
    const urlComponents = url.split("/")
    return urlComponents
        .filter((component: string) => !component.startsWith(":"))
        .join("/")
}
