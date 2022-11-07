/* eslint-disable */
// https://github.com/eslint/eslint/discussions/15305

import fs from "fs";
import cpy from "cpy";
import { deleteSync } from "del";
import esbuild from "esbuild";

import pkg from "./package.json" assert { type: "json" };
import manifest from "./src/manifest.json" assert { type: "json" };

deleteSync(["build/**"]);

esbuild
  .build({
    entryPoints: [
      "./src/background.js",
      "./src/content.js",
      "./src/Popup/index.jsx",
    ],
    bundle: true,
    minify: true,
    sourcemap: process.env.NODE_ENV !== "production",
    target: ["chrome100"],
    outdir: "./build",
    define: {
      "process.env.NODE_ENV": `"${process.env.NODE_ENV}"`,
    },
  })
  .catch(() => process.exit(1));

// update manifest file version
manifest.version = pkg.version;
fs.writeFile(
  "build/manifest.json",
  JSON.stringify(manifest, null, 2),
  (err) => {
    if (err) throw err;
    console.log("manifest.json updated");
  }
);

await cpy(["src/*.png"], "build", { flat: true });

await cpy(["src/Popup/popup.html"], "build/Popup/", { flat: true });
