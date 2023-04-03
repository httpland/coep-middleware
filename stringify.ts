import { isString } from "./deps.ts";
import type { COEP } from "./types.ts";

export function stringifyCOEP(coep: COEP): string {
  const { endpoint, directive } = coep;

  const param = isString(endpoint) ? stringifyEndpoint(endpoint) : "";

  return [directive, param].filter(Boolean).map((f) => f + ";").join(" ");
}

export function stringifyEndpoint(input: string): string {
  return "report-to=" + input;
}
