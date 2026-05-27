export const LOCALES = ['en', 'fr'] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'en';

export const HREFLANG: Record<Locale, string> = {
    en: 'en-US',
    fr: 'fr-CA',
};

export const OG_LOCALE: Record<Locale, string> = {
    en: 'en_US',
    fr: 'fr_CA',
};

export const HTML_LANG: Record<Locale, string> = {
    en: 'en',
    fr: 'fr-CA',
};

export function asLocale(value: string | undefined): Locale {
    return (LOCALES as readonly string[]).includes(value ?? '')
        ? (value as Locale)
        : DEFAULT_LOCALE;
}
