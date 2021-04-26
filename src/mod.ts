import { cac } from "https://unpkg.com/cac/mod.ts";

import { validateDeno } from "../utils/mod.ts";
import postBuild, { PostBuildArguments } from "./post-build.ts";

if (!validateDeno()) {
  console.warn("Please install deno >= v1.9.x");
  Deno.exit(1);
}

const cli = cac("bglcares");

cli.command("create [options]", "[TODO] Incomplete (Do not run this command)");

cli
  .command(
    "post-build [glob]",
    "Push Data to static output, once build is finished"
  )
  .option("-c, --compress", "Compress all JSON data")
  .option("-d, --dist <dir>", "Path to distribution folder, where JSON files will be moved")
  .action((glob: string, args) => {
    postBuild.run({
      glob,
      compress: args.compress || args.c,
      dist: args.dist || args.d,
    });
  });

cli.help();

cli.parse();
