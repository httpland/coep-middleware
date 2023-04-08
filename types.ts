import { EmbedderPolicyValue } from "./constants.ts";

/** Embedder policy API.
 * @see [HTML living standard, embedder policy](https://html.spec.whatwg.org/multipage/browsers.html#embedder-policy)
 */
export interface EmbedderPolicy {
  /** Embedder policy value. */
  readonly value: `${EmbedderPolicyValue}`;

  /** Reporting endpoint name. */
  readonly reportTo?: string;
}
