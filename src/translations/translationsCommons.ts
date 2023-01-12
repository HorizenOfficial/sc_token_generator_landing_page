import i18next from "i18next"
import detector from "i18next-browser-languagedetector"
import commonEn from "./en/common_en.json"
import commonCn from "./cn/common_cn.json"
// import Cache from 'i18next-localstorage-cache'

export const supportedLanguages = [
    { id: "en", lang: "En" },
    { id: "zh-Hant", lang: "中文" },
]

export const filteredLanguage = (currentLang: string) => {
    const lang = currentLang.split("-")
    if (lang.length > 0) {
        if (lang[0] === "zh") {
            return currentLang
        }
        return lang[0]
    }
    return currentLang
}

export const filteredLanguageShortVersion = (currentLang: string) => {
    const lang = currentLang.split("-")
    if (lang.length > 0) {
        return lang[0]
    }
    return currentLang
}

// Translations
// eslint-disable-next-line no-void
void i18next
    .use(detector)
    // .use(Cache)
    .init({
        interpolation: { escapeValue: false }, // React already does escaping
        supportedLngs: supportedLanguages.map((lang) => {
            return lang.id
        }),
        fallbackLng: "en",
        resources: {
            en: {
                common: commonEn,
            },
            "zh-Hant": {
                common: commonCn,
            },
        },
    })

export default i18next
