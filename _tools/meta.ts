import { BuildOptions } from "https://deno.land/x/dnt@0.33.1/mod.ts";

export const makeOptions = (version: string): BuildOptions => ({
  test: false,
  shims: {},
  compilerOptions: {
    lib: ["dom", "esnext"],
  },
  typeCheck: true,
  entryPoints: ["./mod.ts"],
  outDir: "./npm",
  package: {
    name: "@httpland/coep-middleware",
    version,
    description: "HTTP cross-origin embedded policy(COEP) middleware",
    keywords: [
      "http",
      "middleware",
      "header",
      "coep",
      "cross-origin",
      "cross-origin-embedded-policy",
      "cross-origin-embedded-policy-report-only",
      "policy",
      "security",
      "fetch-api",
    ],
    license: "MIT",
    homepage: "https://github.com/httpland/coep-middleware",
    repository: {
      type: "git",
      url: "git+https://github.com/httpland/coep-middleware.git",
    },
    bugs: {
      url: "https://github.com/httpland/coep-middleware/issues",
    },
    sideEffects: false,
    type: "module",
    publishConfig: {
      access: "public",
    },
  },
  packageManager: "pnpm",
  mappings: {
    "https://deno.land/x/http_middleware@1.0.0/mod.ts": {
      name: "@httpland/http-middleware",
      version: "1.0.0",
    },
    "https://deno.land/x/http_utils@1.0.0/message.ts": {
      name: "@httpland/http-utils",
      version: "1.0.0",
      subPath: "message.js",
    },
    "https://deno.land/x/isx@1.1.1/is_string.ts": {
      name: "@miyauci/isx",
      version: "1.1.1",
      subPath: "is_string",
    },
    "https://deno.land/x/sfv_parser@1.0.0-beta.2/mod.ts": {
      name: "@httpland/sfv-parser",
      version: "1.0.0-beta.2",
    },
  },
});
