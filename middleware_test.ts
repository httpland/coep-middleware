import { coep } from "./middleware.ts";
import {
  assert,
  describe,
  EmbedderPolicyValue,
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
          [PolicyHeader.CrossOriginEmbeddedPolicy]:
            EmbedderPolicyValue.RequireCorp,
        },
      }),
    ));
  });

  it("should change coep header via arg", async () => {
    const middleware = coep({ policy: EmbedderPolicyValue.UnsafeNone });
    const response = await middleware(
      new Request("test:"),
      () => new Response(),
    );

    assert(equalsResponse(
      response,
      new Response(null, {
        headers: {
          [PolicyHeader.CrossOriginEmbeddedPolicy]:
            EmbedderPolicyValue.UnsafeNone,
        },
      }),
    ));
  });

  it("should add report-to param via endpoint", async () => {
    const reportTo = "default";
    const middleware = coep({ reportTo });
    const response = await middleware(
      new Request("test:"),
      () => new Response(),
    );

    assert(equalsResponse(
      response,
      new Response(null, {
        headers: {
          [PolicyHeader.CrossOriginEmbeddedPolicy]:
            `${EmbedderPolicyValue.RequireCorp};report-to=${reportTo}`,
        },
      }),
    ));
  });
});
