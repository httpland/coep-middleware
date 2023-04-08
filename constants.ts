// Copyright 2023-latest the httpland authors. All rights reserved. MIT license.
// This module is browser compatible.

/** Cross-origin embedded policy value.
 * @see [embedder policy value](https://html.spec.whatwg.org/multipage/browsers.html#embedder-policy-value)
 */
export enum EmbedderPolicyValue {
  /** Cross-origin resources can be fetched without giving explicit permission through the [CORS protocol](https://fetch.spec.whatwg.org/#http-cors-protocol) or the [`Cross-Origin-Resource-Policy`](https://fetch.spec.whatwg.org/#http-cross-origin-resource-policy) header.
   * @see ["unsafe-none"](https://html.spec.whatwg.org/multipage/browsers.html#coep-unsafe-none)
   */
  UnsafeNone = "unsafe-none",

  /** Fetching cross-origin resources requires the server's explicit permission through the [CORS protocol](https://fetch.spec.whatwg.org/#http-cors-protocol) or the [`Cross-Origin-Resource-Policy`](https://fetch.spec.whatwg.org/#http-cross-origin-resource-policy) header.
   * @see ["require-corp"](https://html.spec.whatwg.org/multipage/browsers.html#coep-require-corp)
   */
  RequireCorp = "require-corp",

  /** Fetching cross-origin no-CORS resources omits credentials.
   * @see ["credentialless"](https://html.spec.whatwg.org/multipage/browsers.html#coep-credentialless)
   */
  Credentialless = "credentialless",
}

export const enum PolicyHeader {
  CrossOriginEmbeddedPolicy = "cross-origin-embedded-policy",
  CrossOriginEmbeddedPolicyReportOnly =
    `${PolicyHeader.CrossOriginEmbeddedPolicy}-report-only`,
}
