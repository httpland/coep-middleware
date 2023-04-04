// Copyright 2023-latest the httpland authors. All rights reserved. MIT license.
// This module is browser compatible.

import { Middleware, withHeader } from "./deps.ts";
import { EmbedderPolicyValue, PolicyHeader } from "./constants.ts";
import { EmbedderPolicy } from "./types.ts";
import { stringifyEmbedderPolicy } from "./utils.ts";

const DEFAULT_OPTIONS = {
  reportOnly: false,
  value: EmbedderPolicyValue.RequireCorp,
};

/** Middleware options. */
export interface Options extends Partial<EmbedderPolicy> {
  /** @default "required-corp" */
  readonly value?: `${EmbedderPolicyValue}`;

  /** Whether header is report-only or not.
   * Depending on the value, the header will be:
   * - `true`: `Cross-Origin-Embedded-Policy-Report-Only`
   * - `false`: `Cross-Origin-Embedded-Policy`
   * @default false
   */
  readonly reportOnly?: boolean;
}

/** Create cross-origin embedded policy middleware.
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
 * assert(response.headers.has("cross-origin-embedded-policy"));
 * ```
 *
 * @throws {TypeError} If the {@link EmbedderPolicy} is invalid.
 */
export function coep(options: Options = DEFAULT_OPTIONS): Middleware {
  const {
    value = DEFAULT_OPTIONS.value,
    reportTo,
    reportOnly = DEFAULT_OPTIONS.reportOnly,
  } = options;
  const fieldValue = stringifyEmbedderPolicy({ value, reportTo });
  const fieldName = reportOnly
    ? PolicyHeader.CrossOriginEmbeddedPolicyReportOnly
    : PolicyHeader.CrossOriginEmbeddedPolicy;

  return async (request, next) => {
    const response = await next(request);

    if (response.headers.has(fieldName)) return response;

    return withHeader(response, fieldName, fieldValue);
  };
}
