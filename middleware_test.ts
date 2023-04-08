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
  it("should return same response if the response include the header", async () => {
    const middleware = coep();
    const initResponse = new Response(null, {
      headers: {
        [PolicyHeader.CrossOriginEmbedderPolicy]: "",
      },
    });
    const response = await middleware(
      new Request("test:"),
      () => initResponse,
    );

    assert(response === initResponse);
  });

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
          [PolicyHeader.CrossOriginEmbedderPolicy]:
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
          [PolicyHeader.CrossOriginEmbedderPolicy]:
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
          [PolicyHeader.CrossOriginEmbedderPolicy]:
            `${EmbedderPolicyValue.RequireCorp};report-to=${reportTo}`,
        },
      }),
    ));
  });

  it("should change to report only header", async () => {
    const middleware = coep({ reportOnly: true });
    const response = await middleware(
      new Request("test:"),
      () => new Response(),
    );

    assert(equalsResponse(
      response,
      new Response(null, {
        headers: {
          [PolicyHeader.CrossOriginEmbedderPolicyReportOnly]:
            EmbedderPolicyValue.RequireCorp,
        },
      }),
    ));
  });
});
