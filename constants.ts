// Copyright 2023-latest the httpland authors. All rights reserved. MIT license.
// This module is browser compatible.

/** Cross-origin embedded policy directive. */
export enum COEPDirective {
  UnsafeNone = "unsafe-none",
  RequireCorp = "require-corp",
  Credentialless = "credentialless",
}

export const enum PolicyHeader {
  CrossOriginEmbeddedPolicy = "cross-origin-embedded-policy",
  CrossOriginEmbeddedPolicyReportOnly =
    `${PolicyHeader.CrossOriginEmbeddedPolicy}-report-only`,
}
