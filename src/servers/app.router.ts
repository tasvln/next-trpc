import { initTRPC } from "@trpc/server";
import superjson from "superjson";
import { CreateWordInput, ParamsInput, UpdateWordInput, createWordSchema, filterQuery, params, updateWordSchema } from "./words.schema";
import { createWord, getWord, getWords, updateWord, deleteWord } from "./words.controller";

const t = initTRPC.create({
  transformer: superjson,
})

const appRouter = t.router({
  create: t.procedure
    .input(createWordSchema)
    .mutation(({ input }) => createWord(input)),
  getWords: t.procedure
    .query(() => getWords()),
  getWord: t.procedure
    .input(params)
    .query(({ input }) => getWord(input)),
  delete: t.procedure
    .input(params)
    .mutation(({ input }) => deleteWord(input)),
  update: t.procedure
    .input(updateWordSchema)
    .mutation(({ input }) =>
      updateWord(input.params, input.body)
    ),
})

export default appRouter;