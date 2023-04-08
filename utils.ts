// Copyright 2023-latest the httpland authors. All rights reserved. MIT license.
// This module is browser compatible.

import { isString, Item, Parameters, stringifySfv, Token } from "./deps.ts";
import type { EmbedderPolicy } from "./types.ts";

const enum Param {
  ReportTo = "report-to",
}

/** Serialize {@link EmbedderPolicy} into string.
 * @param Any {@link COEP}.
 *
 * @throws {TypeError} If the {@link EmbedderPolicy} is invalid.
 */
export function stringifyEmbedderPolicy(policy: EmbedderPolicy): string {
  const item = policy2Item(policy);

  try {
    const string = stringifySfv(item);

    return string;
  } catch (cause) {
    throw TypeError(`invalid ${displayEmbedderPolicy(policy)}.`, { cause });
  }
}

function displayEmbedderPolicy(policy: EmbedderPolicy): string {
  return `EmbedderPolicy ${JSON.stringify(policy, null, 2)}`;
}

export function policy2Item(policy: EmbedderPolicy): Item {
  const { value, reportTo } = policy;

  const parameters = isString(reportTo)
    ? new Parameters({
      [Param.ReportTo]: new Token(reportTo),
    })
    : new Parameters();
  const item = new Item([new Token(value), parameters]);

  return item;
}
