/**
 * Global declaration of theme color in HEX format.
 * @constant
 * @type {string}
 */
export const THEME_COLOR: string = '#ffffff';

/**
 * Global declaration of background color in HEX format.
 * @constant
 * @type {string}
 */
export const BACKGROUND_COLOR: string = '#ffffff';

/**
 * Global declaration of the locale (language) for the application.
 * @constant
 * @type {string}
 */
export const LOCALE: string = 'pl';

/**
 * Global declaration of the domain for the application.
 * @constant
 * @type {string}
 */
export const DOMAIN: string = 'http://localhost:4321';

/**
 * Global declaration of the default title for the application.
 * @constant
 * @type {string}
 */
export const DEFAULT_TITLE: string = 'Astro Sanity Multi Page Starter';

/**
 * Global declaration of the default description for the application.
 * @constant
 * @type {string}
 */
export const DEFAULT_DESCRIPTION: string = 'Description';

/**
 * Object containing regular expressions for validation purposes.
 * @constant
 * @type {Object}
 * @property {RegExp} email - Regular expression for validating email addresses.
 * @property {RegExp} phone - Regular expression for validating phone numbers.
 * @property {RegExp} string - Regular expression for trimming and validating strings.
 */
export const REGEX: { email: RegExp; phone: RegExp; string: RegExp } = {
  email: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
  phone: /^(?:\+(?:\d{1,3}))?(?:[ -]?\(?\d{1,4}\)?[ -]?\d{1,5}[ -]?\d{1,5}[ -]?\d{1,6})$/,
  string: /^(?!\s+$)(.*?)\s*$/,
};

/**
 * Global declaration of the Sanity dataset.
 * @constant
 * @type {string}
 */
export const DATASET: string = 'production';

/**
 * Global declaration of the Sanity API version.
 * @constant
 * @type {string}
 */
export const API_VERSION: string = '2025-06-03';

/**
 * The initial number of posts displayed on the page.
 * @constant
 * @type {number}
 */
export const POSTS_PER_PAGE: number = 3;
