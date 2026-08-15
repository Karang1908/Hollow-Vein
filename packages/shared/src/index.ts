/**
 * @hollow-vein/shared — types, constants and protocol shared by client and server.
 *
 * Anything both sides need to agree on lives here and nowhere else. Duplicating
 * movement speeds, damage tables or economy constants across two packages is a
 * guaranteed desync-bug generator; this package exists to make that impossible.
 */

export * from './constants/palette.js';
