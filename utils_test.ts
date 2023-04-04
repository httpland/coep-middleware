import { stringifyEmbedderPolicy } from "./utils.ts";
import {
  assertEquals,
  assertThrows,
  describe,
  EmbedderPolicyValue,
  it,
} from "./_dev_deps.ts";
import type { EmbedderPolicy } from "./types.ts";

describe("stringifyEmbedderPolicy", () => {
  it("should return string if the input is valid embedder policy", () => {
    const table: [EmbedderPolicy, string][] = [
      [
        { value: EmbedderPolicyValue.RequireCorp },
        EmbedderPolicyValue.RequireCorp,
      ],
      [
        { value: EmbedderPolicyValue.RequireCorp, reportTo: "default" },
        `${EmbedderPolicyValue.RequireCorp};report-to=default`,
      ],
      [
        { value: EmbedderPolicyValue.UnsafeNone },
        EmbedderPolicyValue.UnsafeNone,
      ],
    ];

    table.forEach(([embedderPolicy, expected]) => {
      assertEquals(
        stringifyEmbedderPolicy(embedderPolicy),
        expected,
      );
    });
  });

  it("should throw error if the iuput is invalid", () => {
    const table: EmbedderPolicy[] = [
      { value: EmbedderPolicyValue.Credentialless, reportTo: "?" },
    ];

    table.forEach((embedderPolicy) => {
      assertThrows(() => stringifyEmbedderPolicy(embedderPolicy));
    });
  });
});
