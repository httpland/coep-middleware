interface Node {
  readonly type: `${Type}`;
  readonly value: unknown;
}

export class Boolean implements Node {
  readonly type: `${Type.Boolean}` = Type.Boolean;

  constructor(public value: boolean) {}
}

export class String implements Node {
  readonly type: `${Type.String}` = Type.String;

  constructor(public value: string) {}
}

export class Token implements Node {
  readonly type: `${Type.Token}` = Type.Token;

  constructor(public value: string) {}
}

export class Integer implements Node {
  readonly type: `${Type.Integer}` = Type.Integer;

  constructor(public value: number) {}
}

export class Decimal implements Node {
  readonly type: `${Type.Decimal}` = Type.Decimal;

  constructor(public value: number) {}
}

export class ByteSequence implements Node {
  readonly type: `${Type.ByteSequence}` = Type.ByteSequence;

  constructor(public value: string) {}
}

export const enum Type {
  String = "string",
  Token = "token",
  Integer = "integer",
  Decimal = "decimal",
  ByteSequence = "byte-sequence",
  Boolean = "boolean",
  BareItem = "bare-item",
  Item = "item",
  List = "list",
  Parameters = "parameters",
  Key = "key",
  InnerList = "inner-list",
}

export class Item implements Node {
  type: `${Type.Item}` = Type.Item;

  constructor(public value: readonly [BareItem, Parameters]) {}
}

export class InnerList implements Node {
  type: `${Type.InnerList}` = Type.InnerList;

  constructor(
    public value: { readonly parameters: Parameters; list: readonly Item[] },
  ) {}
}

export class Parameters implements Node {
  type: `${Type.Parameters}` = Type.Parameters;

  constructor(
    public value: readonly (readonly [key: Key, value: BareItem])[],
  ) {}
}

export class Key implements Node {
  type: `${Type.Key}` = Type.Key;

  constructor(public value: string) {}
}

export type BareItem =
  | Boolean
  | String
  | Token
  | Integer
  | Decimal
  | ByteSequence;
