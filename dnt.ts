// Bundle mod.ts into both ESM and CJS format.
import { build, emptyDir } from "@deno/dnt";
import pkg from "./deno.json" with { type: "json" };

await emptyDir("./dnt");

await build({
  entryPoints: ["./mod.ts"],
  outDir: "./dnt",
  shims: {
    deno: "dev",
  },
  importMap: "./deno.json",
  package: {
    // package.json properties
    name: "frail-map",
    version: pkg.version,
    description: pkg.description,
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
