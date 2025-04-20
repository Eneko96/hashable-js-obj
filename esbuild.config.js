import { build } from "esbuild";

build({
  entryPoints: ["src/index.ts"],
  bundle: true,
  minify: true,
  platform: "node",
  format: "esm",
  outfile: "dist/index.js",
  sourcemap: true,
})
  .then(() => {
    console.log("✅ Build complete");
  })
  .catch((error) => {
    console.error("❌ Build failed:", error);
    process.exit(1);
  });
