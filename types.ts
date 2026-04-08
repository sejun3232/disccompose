import type { APIEmbedField } from "discord.js";
import type { ColorName } from "./colors";

export type ColorInput = ColorName | `#${string}` | number;

export interface FieldInput {
  name: string;
  value: string;
  inline?: boolean;
}

export type FieldsInput = APIEmbedField[];

export interface AuthorInput {
  name: string;
  url?: string;
  iconURL?: string;
}

export interface FooterInput {
  text: string;
  iconURL?: string;
}
