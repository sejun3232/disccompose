import { EmbedBuilder } from "discord.js";
import { resolveColor } from "./colors";
import type { ColorInput, FieldInput, AuthorInput, FooterInput } from "./types";

export class QuickEmbed {
  private _embed: EmbedBuilder;

  constructor() {
    this._embed = new EmbedBuilder();
  }

  // ─── 기본 설정 ────────────────────────────────────────────────

  title(text: string): this {
    this._embed.setTitle(text);
    return this;
  }

  description(text: string): this {
    this._embed.setDescription(text);
    return this;
  }

  color(value: ColorInput): this {
    this._embed.setColor(resolveColor(value));
    return this;
  }

  url(link: string): this {
    this._embed.setURL(link);
    return this;
  }

  timestamp(date?: Date | number): this {
    this._embed.setTimestamp(date ?? new Date());
    return this;
  }

  // ─── 이미지 ───────────────────────────────────────────────────

  thumbnail(url: string): this {
    this._embed.setThumbnail(url);
    return this;
  }

  image(url: string): this {
    this._embed.setImage(url);
    return this;
  }

  // ─── 작성자 / 푸터 ────────────────────────────────────────────

  author(input: AuthorInput | string): this {
    if (typeof input === "string") {
      this._embed.setAuthor({ name: input });
    } else {
      this._embed.setAuthor(input);
    }
    return this;
  }

  footer(input: FooterInput | string): this {
    if (typeof input === "string") {
      this._embed.setFooter({ text: input });
    } else {
      this._embed.setFooter(input);
    }
    return this;
  }

  // ─── 필드 ─────────────────────────────────────────────────────

  field(name: string, value: string, inline = false): this {
    this._embed.addFields({ name, value, inline });
    return this;
  }

  fields(...items: FieldInput[]): this {
    this._embed.addFields(items);
    return this;
  }

  inlineFields(...items: Omit<FieldInput, "inline">[]): this {
    this._embed.addFields(items.map((f) => ({ ...f, inline: true })));
    return this;
  }

  // ─── 출력 ─────────────────────────────────────────────────────

  /** discord.js EmbedBuilder 반환 */
  build(): EmbedBuilder {
    return this._embed;
  }

  /** toJSON() — discord.js가 내부적으로 사용하는 인터페이스 */
  toJSON() {
    return this._embed.toJSON();
  }
}
