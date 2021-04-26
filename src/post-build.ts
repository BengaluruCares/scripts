import { renderMarkdown } from 'https://deno.land/x/charmd/mod.ts';

import { Base } from "./base.ts";

interface Arguments {
  data: boolean;
  section: string;
}

const doc = await Deno.readTextFile("resources/post-build.md");
const help = renderMarkdown(doc);

const command: Base<Arguments> = {
  run: async (args) => {
    console.log(">>>>> ", args);
    console.log(help);
  },
};

export default command;
