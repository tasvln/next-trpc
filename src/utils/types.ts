export type IWord = {
  id: string;
  word: string;
  meaning: string;
  nfsw: boolean | null;
  createdAt: Date;
  updatedAt: Date;
};