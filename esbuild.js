/* eslint-disable */
// https://github.com/eslint/eslint/discussions/15305

import fs from "fs";
import svg from 'esbuild-plugin-svg';
import cpy from "cpy";
import { deleteSync } from "del";
import esbuild from "esbuild";

import pkg from "./package.json" assert { type: "json" };
import manifest from "./src/manifest.json" assert { type: "json" };

// delete old contents of build/ if exists
deleteSync(["build/**"]);

// create build/ if doesn't exist
if (!fs.existsSync("build")) {
  fs.mkdirSync("build");
}

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
    plugins: [svg()],
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
