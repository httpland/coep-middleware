import { isString } from "./deps.ts";
import type { COEP } from "./types.ts";

const enum Char {
  SemiColon = ";",
  Empty = "",
  Space = " ",
  Equal = "=",
}

const enum Param {
  ReportTo = "report-to",
}

export function stringifyCOEP(coep: COEP): string {
  const { endpoint, directive } = coep;

  const param = isString(endpoint) ? stringifyEndpoint(endpoint) : Char.Empty;

  return [directive, param]
    .filter(Boolean)
    .map(appendString.bind(null, Char.SemiColon))
    .join(Char.Space);
}

export function stringifyEndpoint(input: string): string {
  return [Param.ReportTo, input].join(Char.Equal);
}

function appendString(char: string, input: string): string {
  return input + char;
}
