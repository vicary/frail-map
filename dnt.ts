// Bundle src/FrailMap.ts into both ESM and CJS format.
import { build, emptyDir } from "https://deno.land/x/dnt/mod.ts";
import pkg from "./deno.json" with { type: "json" };

await emptyDir("./dnt");

await build({
  entryPoints: ["./src/FrailMap.ts"],
  outDir: "./dnt",
  shims: {
    // see JS docs for overview and more options
    deno: true,
  },
  package: {
    // package.json properties
    name: "frail-map",
    version: pkg.version,
    description:
      "FrailMap is an extension of WeakMap that supports primitive values using WeakRef.",
    license: "MIT",
    repository: {
      type: "git",
      url: "git+https://github.com/vicary/frail-map.git",
    },
    bugs: {
      url: "https://github.com/vicary/frail-map/issues",
    },
    keywords: [
      "garbage collection",
      "key-value",
      "map",
      "memory management",
      "primitive values",
      "WeakMap",
    ],
    funding: {
      type: "github",
      url: "https://github.com/sponsors/vicary",
    },
  },
  postBuild() {
    // steps to run after building and before running the tests
    Deno.copyFileSync("LICENSE", "dnt/LICENSE");
    Deno.copyFileSync("README.md", "dnt/README.md");
  },
});
