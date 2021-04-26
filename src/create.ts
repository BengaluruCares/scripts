import { prompt } from "https://deno.land/x/cliffy@v0.18.2/prompt/mod.ts";
import { Base } from "./base.ts";

interface Arguments {
  data: boolean;
  section: string;
}

/**
 * This Command will help us to create Data Sections for
 * Bengaluru.in Repo. Add predefined metadata JSON template
 * with user values.
 * For now this is undone, and is not that important, thus
 * leaving this for later.
 */
const command: Base<Arguments> = {
  run: async (args) => {
    // TODO
    if (args.data) {
      const metadataFile = await Deno.create(`${args.section || "ward"}/metadata.json`);
    }
  },
}

export default command;
