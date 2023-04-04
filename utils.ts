import { Item, Key, Parameters, Token } from "./structured/types.ts";
import { isString } from "./deps.ts";
import { stringifyItem } from "./structured/stringify.ts";
import type { COEP } from "./types.ts";

const enum Param {
  ReportTo = "report-to",
}

/** Serialize {@link COEP} into string. */
export function stringifyCOEP(coep: COEP): string {
  const item = coep2Item(coep);

  try {
    const string = stringifyItem(item);

    return string;
  } catch (cause) {
    throw TypeError(`invalid ${displayCOEP(coep)}.`, { cause });
  }
}

function displayCOEP(coep: COEP): string {
  return `COEP ${JSON.stringify(coep, null, 2)}`;
}

export function coep2Item(coep: COEP): Item {
  const { directive, endpoint } = coep;
  const parameters = isString(endpoint)
    ? [[new Key(Param.ReportTo), new Token(endpoint)] as const]
    : [];
  const item = new Item([new Token(directive), new Parameters(parameters)]);

  return item;
}
