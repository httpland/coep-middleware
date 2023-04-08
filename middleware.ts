// Copyright 2023-latest the httpland authors. All rights reserved. MIT license.
// This module is browser compatible.

import { Middleware, withHeader } from "./deps.ts";
import { EmbedderPolicyValue, PolicyHeader } from "./constants.ts";
import { EmbedderPolicy } from "./types.ts";
import { stringifyEmbedderPolicy } from "./utils.ts";

const DEFAULT_OPTIONS = {
  reportOnly: false,
  policy: EmbedderPolicyValue.RequireCorp,
};

/** Middleware options. */
export interface Options extends Partial<Pick<EmbedderPolicy, "reportTo">> {
  /** Embedder policy.
   * @default "required-corp" */
  readonly policy?: `${EmbedderPolicyValue}`;

  /** Whether header is report-only or not.
   * Depending on the value, the header will be:
   * - `true`: `Cross-Origin-Embedder-Policy-Report-Only`
   * - `false`: `Cross-Origin-Embedder-Policy`
   * @default false
   */
  readonly reportOnly?: boolean;
}

/** Create cross-origin embedder policy middleware.
 *
 * @example
 * ```ts
 * import {
 *   coep,
 *   type Handler,
 * } from "https://deno.land/x/coep_middleware@$VERSION/mod.ts";
 * import { assert } from "https://deno.land/std/testing/asserts.ts";
 *
 * declare const request: Request;
 * declare const handler: Handler;
 *
 * const middleware = coep();
 * const response = await middleware(request, handler);
 *
 * assert(response.headers.has("cross-origin-embedder-policy"));
 * ```
 *
 * @throws {TypeError} If the {@link Options.reportTo} is invalid.
 */
export function coep(options: Options = DEFAULT_OPTIONS): Middleware {
  const {
    policy: value = DEFAULT_OPTIONS.policy,
    reportTo,
    reportOnly = DEFAULT_OPTIONS.reportOnly,
  } = options;
  const fieldValue = stringifyEmbedderPolicy({ value, reportTo });
  const fieldName = reportOnly
    ? PolicyHeader.CrossOriginEmbedderPolicyReportOnly
    : PolicyHeader.CrossOriginEmbedderPolicy;

  return async (request, next) => {
    const response = await next(request);

    if (response.headers.has(fieldName)) return response;

    return withHeader(response, fieldName, fieldValue);
  };
}
