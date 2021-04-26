import { cac } from 'https://unpkg.com/cac/mod.ts';

import { validateDeno } from "../utils/mod.ts";
import { Base } from "./base.ts";

if (!validateDeno()) {
  console.warn("Please install deno >= v1.9.x");
  Deno.exit(1);
}

const cli = cac('bglcares');

// const getCommand = async () => {
//   const parsed = parse(Deno.args);
//   const { _: commands, ...rest } = parsed;
//   let module: Base<any>;
//   console.log(commands, rest);
//   switch(commands[0]) {
//     case "create":
//       module = (await import("./create.ts")).default;
//       break;
//     case "post-build":
//       module = (await import("./post-build.ts")).default;
//       break;
//     default:
//       console.error("No Command found");
//       Deno.exit(1);
//   }
//   await module.run(rest);
// };

cli
  .command("create [options]", "[TODO] Incomplete (Do not run this command)");

cli
  .command("post-build [options] [glob]", "Push Data to static output, once build is finished")
  .option("--help", "get help for this command")
  .action(async (...args) => {
    const module: Base<any> = (await import("./post-build.ts")).default;
    console.log(args);
  })

cli.help();

cli.parse();

// await getCommand();


