import { coep } from "./middleware.ts";
import {
  assert,
  COEPDirective,
  describe,
  equalsResponse,
  it,
  PolicyHeader,
} from "./_dev_deps.ts";

describe("coep", () => {
  it("should return response what include coep header and the value is require-corp by default", async () => {
    const middleware = coep();
    const response = await middleware(
      new Request("test:"),
      () => new Response(),
    );

    assert(equalsResponse(
      response,
      new Response(null, {
        headers: {
          [PolicyHeader.CrossOriginEmbeddedPolicy]: COEPDirective.RequireCorp,
        },
      }),
    ));
  });

  it("should change coep header via arg", async () => {
    const middleware = coep({ directive: COEPDirective.UnsafeNone });
    const response = await middleware(
      new Request("test:"),
      () => new Response(),
    );

    assert(equalsResponse(
      response,
      new Response(null, {
        headers: {
          [PolicyHeader.CrossOriginEmbeddedPolicy]: COEPDirective.UnsafeNone,
        },
      }),
    ));
  });

  it("should add report-to param via endpoint", async () => {
    const endpoint = "http://report.test";
    const middleware = coep({ endpoint });
    const response = await middleware(
      new Request("test:"),
      () => new Response(),
    );

    assert(equalsResponse(
      response,
      new Response(null, {
        headers: {
          [PolicyHeader.CrossOriginEmbeddedPolicy]:
            `${COEPDirective.RequireCorp};report-to=${endpoint}`,
        },
      }),
    ));
  });
});
