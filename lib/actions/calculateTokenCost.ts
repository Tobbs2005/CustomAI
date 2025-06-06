import { encode } from 'gpt-tokenizer';

export const calculateTokenCost = (text: string) => {
  return encode(text).length;
};