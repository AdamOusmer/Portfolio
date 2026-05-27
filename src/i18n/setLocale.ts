import { overwriteGetLocale } from '../paraglide/runtime.js';
import { asLocale, type Locale } from './config';

/**
 * Pins the Paraglide locale for the current page render.
 *
 * Must be called at the top of every entry page's frontmatter, before any
 * `m.X()` call (including those passed as JSX props to layouts). JSX props
 * evaluate before the child component's frontmatter runs, so deferring this
 * to the layout is too late.
 */
export function setPageLocale(astro: { currentLocale: string | undefined }): Locale {
    const locale = asLocale(astro.currentLocale);
    overwriteGetLocale(() => locale);
    return locale;
}
