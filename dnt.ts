// Bundle mod.ts into both ESM and CJS format.
import { build } from "@deno/dnt";
import pkg from "./deno.json" with { type: "json" };

await Deno.remove("./dnt", { recursive: true });

await build({
  entryPoints: ["./mod.ts"],
  outDir: "./dnt",
  shims: {
    deno: "dev",
  },
  importMap: "./deno.json",
  package: {
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
  async postBuild() {
    await Deno.copyFile("LICENSE", "dnt/LICENSE");
    await Deno.copyFile("README.md", "dnt/README.md");
  },
  typeCheck: "both",
});
