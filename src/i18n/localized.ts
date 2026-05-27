import type { Locale } from './config';
import { DEFAULT_LOCALE } from './config';

type Translations = Partial<Record<Locale, Record<string, string | undefined>>>;

/**
 * Returns the localized value of `field` from `data.translations[locale]`,
 * falling back to `data[field]` when no translation exists.
 *
 * Lets content collections keep one source-of-truth file per project/course
 * with optional per-locale overrides — instead of duplicating the entire
 * entry (year, tags, URLs) for every language.
 */
export function localized<T extends { translations?: Translations }, K extends keyof T>(
    data: T,
    locale: Locale,
    field: K,
): T[K] {
    if (locale === DEFAULT_LOCALE) return data[field];
    const override = data.translations?.[locale]?.[field as string];
    return (override ?? data[field]) as T[K];
}
