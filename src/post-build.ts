import { expandGlob, ensureDir } from "https://deno.land/std/fs/mod.ts";
import { SEP, resolve } from "https://deno.land/std/path/mod.ts";
import { yellow, bold } from "https://deno.land/std/fmt/colors.ts";

import { Base } from "./base.ts";

export interface PostBuildArguments {
  compress?: boolean;
  dist?: string;
  glob: string;
}

const command: Base<PostBuildArguments> = {
  run: async (args) => {
    const root = await Deno.realPath(".");
    let _dist = args.dist || "./dist";
    _dist = _dist.startsWith(".") ? _dist : `.${SEP}${_dist}`;
    await ensureDir(_dist);
    const dist = resolve(root, _dist);
    for await (const file of expandGlob(args.glob)) {
      if (!file.path.endsWith(".json")) {
        break;
      }
      const newPath = file.path.replace(root, dist);
      const newDir = newPath.replace(/(.*)(\/.*\.json)/, "$1");
      await ensureDir(newDir);
      try {
        const data = JSON.parse(await Deno.readTextFile(file.path));
        await Deno.writeTextFile(newPath, JSON.stringify(data, null, args.compress ? 0 : 2))
      } catch (e) {
        console.warn(yellow(bold("Invalid JSON: ")), file.path);
        await Deno.writeTextFile(newPath, JSON.stringify({}, null, args.compress ? 0 : 2))
      }
    }
  },
};

export default command;
