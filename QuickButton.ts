import {
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
  type MessageActionRowComponentBuilder,
} from "discord.js";

export type ButtonStyleName = "primary" | "secondary" | "success" | "danger";

const styleMap: Record<ButtonStyleName, ButtonStyle> = {
  primary: ButtonStyle.Primary,
  secondary: ButtonStyle.Secondary,
  success: ButtonStyle.Success,
  danger: ButtonStyle.Danger,
};

export class QuickButton {
  private _btn: ButtonBuilder;

  constructor() {
    this._btn = new ButtonBuilder();
  }

  id(customId: string): this {
    this._btn.setCustomId(customId);
    return this;
  }

  label(text: string): this {
    this._btn.setLabel(text);
    return this;
  }

  style(name: ButtonStyleName): this {
    this._btn.setStyle(styleMap[name]);
    return this;
  }

  emoji(emoji: string): this {
    this._btn.setEmoji(emoji);
    return this;
  }

  disabled(value = true): this {
    this._btn.setDisabled(value);
    return this;
  }

  /** 링크 버튼 (customId 대신 url 사용) */
  link(url: string): this {
    this._btn.setStyle(ButtonStyle.Link).setURL(url);
    return this;
  }

  build(): ButtonBuilder {
    return this._btn;
  }

  /** 이 버튼 하나로 ActionRow 바로 생성 */
  toRow(): ActionRowBuilder<MessageActionRowComponentBuilder> {
    return new ActionRowBuilder<MessageActionRowComponentBuilder>().addComponents(this._btn);
  }
}

// ─── 빠른 생성 헬퍼 ────────────────────────────────────────────

export const Button = {
  primary(id: string, label: string, emoji?: string): QuickButton {
    const b = new QuickButton().id(id).label(label).style("primary");
    if (emoji) b.emoji(emoji);
    return b;
  },
  secondary(id: string, label: string, emoji?: string): QuickButton {
    const b = new QuickButton().id(id).label(label).style("secondary");
    if (emoji) b.emoji(emoji);
    return b;
  },
  success(id: string, label: string, emoji?: string): QuickButton {
    const b = new QuickButton().id(id).label(label).style("success");
    if (emoji) b.emoji(emoji);
    return b;
  },
  danger(id: string, label: string, emoji?: string): QuickButton {
    const b = new QuickButton().id(id).label(label).style("danger");
    if (emoji) b.emoji(emoji);
    return b;
  },
  link(url: string, label: string, emoji?: string): QuickButton {
    const b = new QuickButton().link(url).label(label);
    if (emoji) b.emoji(emoji);
    return b;
  },
};
