import { engineFactory } from "https://deno.land/x/view_engine/mod.ts";

export const handlebarsEngine = await engineFactory.getHandlebarsEngine();