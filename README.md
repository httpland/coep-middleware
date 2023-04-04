# coep-middleware

[![deno land](http://img.shields.io/badge/available%20on-deno.land/x-lightgrey.svg?logo=deno)](https://deno.land/x/coep_middleware)
[![deno doc](https://doc.deno.land/badge.svg)](https://doc.deno.land/https/deno.land/x/coep_middleware/mod.ts)
[![GitHub release (latest by date)](https://img.shields.io/github/v/release/httpland/coep-middleware)](https://github.com/httpland/coep-middleware/releases)
[![codecov](https://codecov.io/github/httpland/coep-middleware/branch/main/graph/badge.svg)](https://codecov.io/gh/httpland/coep-middleware)
[![GitHub](https://img.shields.io/github/license/httpland/coep-middleware)](https://github.com/httpland/coep-middleware/blob/main/LICENSE)

[![test](https://github.com/httpland/coep-middleware/actions/workflows/test.yaml/badge.svg)](https://github.com/httpland/coep-middleware/actions/workflows/test.yaml)
[![NPM](https://nodei.co/npm/@httpland/coep-middleware.png?mini=true)](https://nodei.co/npm/@httpland/coep-middleware/)

HTTP cross-origin embedded policy(COEP) middleware.

Compliant with
[HTML living standard, 7.1.4 Cross-origin embedder policies](https://html.spec.whatwg.org/multipage/browsers.html#coep).

## Middleware

For a definition of Universal HTTP middleware, see the
[http-middleware](https://github.com/httpland/http-middleware) project.

## Usage

Middleware adds the `Cross-Origin-Embedded-Policy` header to the response.

```ts
import {
  coep,
  type Handler,
} from "https://deno.land/x/coep_middleware@$VERSION/mod.ts";
import { assert } from "https://deno.land/std/testing/asserts.ts";

declare const request: Request;
declare const handler: Handler;

const middleware = coep();
const response = await middleware(request, handler);

assert(response.headers.has("cross-origin-embedded-policy"));
```

yield:

```http
Cross-Origin-Embedded-Policy: require-corp
```

## Options

The middleware factory accepts the following fields:

| Name       | Type                                                            |     Default      | Description                           |
| ---------- | --------------------------------------------------------------- | :--------------: | ------------------------------------- |
| value      | `"require-corp"` &#124; `"unsafe-none"` &#124; `credentialless` | `"require-corp"` | Embedder policy value.                |
| reportTo   | `string`                                                        |        -         | Reporting endpoint name.              |
| reportOnly | `boolean`                                                       |     `false`      | Whether header is report-only or not. |

### value

If specified, change the
[embedded policy value](https://html.spec.whatwg.org/multipage/browsers.html#embedder-policy).

```ts
import { coep } from "https://deno.land/x/coep_middleware@$VERSION/middleware.ts";

const middleware = coep({ value: "credentialless" });
```

yield:

```http
Cross-Origin-Embedded-Policy: credentialless
```

### reportTo

If specified, adds a `report-to` param to the output.

```ts
import { coep } from "https://deno.land/x/coep_middleware@$VERSION/middleware.ts";

const middleware = coep({ reportTo: "default" });
```

yield:

```http
Cross-Origin-Embedded-Policy: require-corp;report-to=default
```

### reportOnly

Depending on the value, the header will be:

| Value   | Field name                                 |
| ------- | ------------------------------------------ |
| `true`  | `Cross-Origin-Embedded-Policy-Report-Only` |
| `false` | `Cross-Origin-Embedded-Policy`             |

```ts
import { coep } from "https://deno.land/x/coep_middleware@$VERSION/middleware.ts";

const middleware = coep({ reportOnly: true });
```

yield:

```http
Cross-Origin-Embedded-Policy-Report-Only: require-corp
```

### Throwing error

If serialize of embedder policy fails, it may throw `TypeError`.

Serialize fails in the following cases:

- If `reportTo` field is an invalid
  [`<sf-token>`](https://www.rfc-editor.org/rfc/rfc8941.html#section-3.3.4)
  syntax

```ts
import { coep } from "https://deno.land/x/coep_middleware@$VERSION/middleware.ts";
import { assertThrows } from "https://deno.land/std/testing/asserts.ts";

assertThrows(() => coep({ reportTo: "<invalid>" }));
```

## Conditions

Middleware will execute if all of the following conditions are met:

- Response does not include `Cross-Origin-Embedded-Policy` header
- Response does not include `Cross-Origin-Embedded-Policy-Report-Only` header

## Effects

Middleware may make changes to the following elements of the HTTP message.

- HTTP Headers
  - Cross-Origin-Embedded-Policy
  - Cross-Origin-Embedded-Policy-Report-Only

## API

All APIs can be found in the
[deno doc](https://doc.deno.land/https/deno.land/x/coep_middleware/mod.ts).

## License

Copyright © 2023-present [httpland](https://github.com/httpland).

Released under the [MIT](./LICENSE) license
