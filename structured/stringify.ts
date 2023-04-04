import { numberOfDigits, sliceOf } from "./utils.ts";
import {
  BareItem,
  type Boolean,
  ByteSequence,
  Decimal,
  InnerList,
  Integer,
  Item,
  Key,
  Parameters,
  String,
  Token,
  Type,
} from "./types.ts";

const enum Char {
  Question = "?",
  Dot = ".",
  SemiColon = ";",
  Eq = "=",
  Space = " ",
}

const enum Bool {
  True = "1",
  False = "0",
}

/** Serialize {@link Boolean} into string. */
export function stringifyBoolean(input: Boolean): string {
  return Char.Question + (input.value ? Bool.True : Bool.False);
}

export function stringifyString(input: String): string {
  return input.value;
}

const ReTchar = /^[!#$%&'*+.^_`|~\dA-Za-z-]$/;

/** Serialize {@link Token} into string.
 * @param input Any {@link Token}.
 *
 * @throws {TypeError}
 */
export function stringifyToken(input: Token): string {
  const [head, tail] = sliceOf(1, input.value);

  if (!head || !/^[A-Za-z*]$/.test(head)) {
    throw TypeError(`invalid ${displayToken(input)} format.`);
  }

  for (const str of tail) {
    if (str !== ":" && str !== "/" && !ReTchar.test(str)) {
      throw TypeError(`invalid ${displayToken(input)} format.`);
    }
  }

  return input.value;
}

function displayToken(input: Token): string {
  return `Token("${input.value}")`;
}

/** Serialize {@link Decimal} into string.
 * @param input Any {@link Decimal}.
 *
 * @throws {RangeError}
 */
export function stringifyDecimal(input: Decimal): string {
  if (!Number.isFinite(input.value)) {
    throw RangeError(`${displayDecimal(input)} must be finite.`);
  }

  const value = Number(input.value.toFixed(3));
  const digitNumber = numberOfDigits(value);

  if (12 < digitNumber) {
    throw RangeError(
      `${
        displayDecimal(input)
      } integer component must be less than or equal to 12 digits.`,
    );
  }

  const parts = value.toString().split(Char.Dot);
  const integerPart = parts[0];
  const fractionalPart = parts[1] || "0";

  return integerPart + Char.Dot + fractionalPart;
}

function displayDecimal(input: Decimal): string {
  return `Decimal(${input.value})`;
}

/** Serialize {@link BareItem} into string.
 *
 * @throws {TypeError}
 * @throws {RangeError}
 */
export function stringifyBareItem(input: BareItem): string {
  switch (input.type) {
    case Type.Boolean: {
      return stringifyBoolean(input);
    }
    case Type.String: {
      return stringifyString(input);
    }
    case Type.Token: {
      return stringifyToken(input);
    }
    case Type.Decimal: {
      return stringifyDecimal(input);
    }
    case Type.Integer: {
      return stringifyInteger(input);
    }
    case Type.ByteSequence: {
      return stringifyByteSequence(input);
    }

    default: {
      throw Error("unreachable");
    }
  }
}

const enum Range {
  Minimum = -999999999999999,
  Maximum = 999999999999999,
}

/** Serialize {@link Integer} into string.
 * @param input Any {@link Integer}.
 *
 * @throws {RangeError}
 */
export function stringifyInteger(input: Integer): string {
  if (!Number.isInteger(input.value)) {
    throw RangeError(`${displayInteger(input)} must be integer.`);
  }

  if (Range.Minimum > input.value) {
    throw RangeError(
      `${
        displayInteger(input)
      } must be greater than or equal to ${Range.Minimum}.`,
    );
  }

  if (input.value > Range.Maximum) {
    throw RangeError(
      `${
        displayInteger(input)
      } must be less than or equal to ${Range.Maximum}.`,
    );
  }

  return input.value.toString();
}

function displayInteger(input: Integer): string {
  return `Integer(${input.value})`;
}

/** Serialize {@link Item} into string.
 * @param input Any {@link Item}.
 *
 * @throws {TypeError}
 * @throws {RangeError}
 */
export function stringifyItem(input: Item): string {
  const [bareItem, parameters] = input.value;

  return stringifyBareItem(bareItem) + stringifyParameters(parameters);
}

/** Serialize {@link Parameters} into string.
 * @param input Any {@link Parameters}.
 *
 * @throws {TypeError}
 * @throws {RangeError}
 */
export function stringifyParameters(input: Parameters): string {
  let output = "";

  for (const [key, param] of input.value) {
    output += Char.SemiColon;
    output += stringifyKey(key);

    if (param.type === Type.Boolean && param.value) continue;

    output += Char.Eq;
    output += stringifyBareItem(param);
  }

  return output;
}

const ReParamKey = /^[a-z*][a-z\d_.*-]*$/;

/** Serialize {@link Key} into string.
 * @param input Any {@link Key}.
 *
 * @throws {TypeError}
 */
export function stringifyKey(input: Key): string {
  if (!ReParamKey.test(input.value)) {
    throw TypeError(`${displayKey(input)} is invalid format.`);
  }

  return input.value;
}

function displayKey(input: Key): string {
  return `Key("${input.value}")`;
}

/** Serialize {@link InnerList} into string.
 * @param input Any {@link InnerList}.
 *
 * @throws {TypeError}
 * @throws {RangeError}
 */
export function stringifyInnerList(input: InnerList): string {
  const { list, parameters } = input.value;

  const output = "(" + list.map(stringifyItem).join(Char.Space) + ")" +
    stringifyParameters(parameters);

  return output;
}

export function stringifyByteSequence(input: ByteSequence): string {
  return ":" + btoa(input.value) + ":";
}
