// Copyright 2023-latest the httpland authors. All rights reserved. MIT license.
// This module is browser compatible.

import { isString, Middleware, withHeader } from "./deps.ts";
import { COEPDirective, PolicyHeader } from "./constants.ts";
import { COEP } from "./types.ts";
import { stringifyCOEP } from "./stringify.ts";

const DEFAULT_POLICY: COEP = {
  directive: COEPDirective.RequireCorp,
};

const DEFAULT_OPTIONS: Options = {
  reportOnly: false,
};

/** Middleware options. */
export interface Options {
  /** Whether header is report-only or not.
   * Depending on the value, the header will be:
   * - `true`: `Cross-Origin-Embedded-Policy-Report-Only`
   * - `false`: `Cross-Origin-Embedded-Policy`
   * @default false
   */
  readonly reportOnly?: boolean;
}

/** Create `Cross-Origin-Embedded-Policy` middleware. */
export function coep(
  policy: Partial<COEP> = DEFAULT_POLICY,
  options: Options = DEFAULT_OPTIONS,
): Middleware {
  const { directive = DEFAULT_POLICY.directive, endpoint } = policy;

  const fieldValue = isString(policy)
    ? policy
    : stringifyCOEP({ directive, endpoint });
  const fieldName = options.reportOnly
    ? PolicyHeader.CrossOriginEmbeddedPolicyReportOnly
    : PolicyHeader.CrossOriginEmbeddedPolicy;

  return async (request, next) => {
    const response = await next(request);

    if (response.headers.has(fieldName)) {
      return response;
    }

    return withHeader(response, fieldName, fieldValue);
  };
}
