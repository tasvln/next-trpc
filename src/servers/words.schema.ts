import { z } from "zod";

export const createWordSchema = z.object({
  word: z.string({
    required_error: "A word is required",
  }),
  meaning: z.string({
    required_error: "A meaning of the word is required",
  }),
  nfsw: z.boolean().optional(),
});

export const params = z.object({
  wordId: z.string(),
});

export const updateWordSchema = z.object({
  params,
  body: z
    .object({
      word: z.string(),
      meaning: z.string(),
      nfsw: z.boolean(),
    })
    .partial(),
});

export const filterQuery = z.object({
  limit: z.number().default(1),
  page: z.number().default(10),
});

export type ParamsInput = z.TypeOf<typeof params>;
export type FilterQueryInput = z.TypeOf<typeof filterQuery>;
export type CreateWordInput = z.TypeOf<typeof createWordSchema>;
export type UpdateWordInput = z.TypeOf<typeof updateWordSchema>;