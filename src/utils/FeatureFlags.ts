export type FeatureFlag = {
    flag: FeatureFlagType,
    enabled: boolean
}

export enum FeatureFlagType {
    TOKENS_BUTTON_MINT = "TOKENS_BUTTON_MINT",
    TOKENS_BUTTON_AIRDROP = "TOKENS_BUTTON_AIRDROP",
    TOKENS_BUTTON_BURN = "TOKENS_BUTTON_BURN",
    TAB_FAQ = "TAB_FAQ",
    TOKEN_CREATOR_COMMUNITY_INFO_TAB = "TOKEN_CREATOR_COMMUNITY_INFO_TAB",
    FOOTER_SIDECHAIN_ID = "FOOTER_SIDECHAIN_ID",
    NFT_TAB = "NFT_TAB",
    TZEN_FAUCET = "TZEN_FAUCET",
}

export const featureFlags = (): FeatureFlag[] => {
    const featureFlagsEnv = JSON.parse(process.env.REACT_APP_FEATURE_FLAGS!)
    return featureFlagsEnv as FeatureFlag[]
}