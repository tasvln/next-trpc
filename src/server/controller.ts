import { Prisma, PrismaClient } from "@prisma/client";
import { CreateWordInput, ParamsInput, UpdateWordInput } from "./schema";


const prisma = new PrismaClient();

export const createWord = async (input: CreateWordInput) => {
  const word = await prisma.word.create({
    data: {
      word: input.word,
      meaning: input.meaning,
      nfsw: input.nfsw,
    },
  });
  return {
    status: 200,
    message: "Word created",
    data: word,
  }
}; 

export const getWords = async () => {
  const words = await prisma.word.findMany();
  return {
    status: 200,
    data: words,
  };
};

export const getWord = async (id: ParamsInput) => {
  const word = await prisma.word.findUnique({
    where: {
      id: id.wordId,
    },
  });
  return {
    status: 200,
    data: word,
  };
};

export const updateWord = async (id: ParamsInput, input: UpdateWordInput["body"]) => {
  const word = await prisma.word.update({
    where: {
      id: id.wordId,
    },
    data: {
      ...input,
    },
  });
  return {
    status: 200,
    message: "Word updated",
    data: word,
  };
};

export const deleteWord = async (id: ParamsInput) => {
  const word = await prisma.word.delete({
    where: {
      id: id.wordId,
    },
  });
  return {
    status: 200,
    message: "Word deleted",
    data: word,
  };
};