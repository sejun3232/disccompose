import {
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
  UserSelectMenuBuilder,
  RoleSelectMenuBuilder,
  ChannelSelectMenuBuilder,
  MentionableSelectMenuBuilder,
  ChannelType,
} from "discord.js";

export interface SelectOption {
  label: string;
  value: string;
  description?: string;
  emoji?: string;
  default?: boolean;
}

// ─── 문자열 셀렉트 ─────────────────────────────────────────────

export class QuickStringSelect {
  private _menu: StringSelectMenuBuilder;

  constructor() {
    this._menu = new StringSelectMenuBuilder();
  }

  id(customId: string): this {
    this._menu.setCustomId(customId);
    return this;
  }

  placeholder(text: string): this {
    this._menu.setPlaceholder(text);
    return this;
  }

  option(label: string, value: string, description?: string, emoji?: string): this {
    const opt = new StringSelectMenuOptionBuilder().setLabel(label).setValue(value);
    if (description) opt.setDescription(description);
    if (emoji) opt.setEmoji(emoji);
    return this.options({ label, value, description, emoji });
  }

  options(...items: SelectOption[]): this {
    const built = items.map((o) => {
      const opt = new StringSelectMenuOptionBuilder()
        .setLabel(o.label)
        .setValue(o.value);
      if (o.description) opt.setDescription(o.description);
      if (o.emoji) opt.setEmoji(o.emoji);
      if (o.default) opt.setDefault(o.default);
      return opt;
    });
    this._menu.addOptions(built);
    return this;
  }

  min(value: number): this {
    this._menu.setMinValues(value);
    return this;
  }

  max(value: number): this {
    this._menu.setMaxValues(value);
    return this;
  }

  range(min: number, max: number): this {
    return this.min(min).max(max);
  }

  disabled(value = true): this {
    this._menu.setDisabled(value);
    return this;
  }

  build(): StringSelectMenuBuilder {
    return this._menu;
  }
}

// ─── 유저 셀렉트 ───────────────────────────────────────────────

export class QuickUserSelect {
  private _menu: UserSelectMenuBuilder;

  constructor(customId: string) {
    this._menu = new UserSelectMenuBuilder().setCustomId(customId);
  }

  placeholder(text: string): this {
    this._menu.setPlaceholder(text);
    return this;
  }

  max(value: number): this {
    this._menu.setMaxValues(value);
    return this;
  }

  disabled(value = true): this {
    this._menu.setDisabled(value);
    return this;
  }

  build(): UserSelectMenuBuilder {
    return this._menu;
  }
}

// ─── 역할 셀렉트 ───────────────────────────────────────────────

export class QuickRoleSelect {
  private _menu: RoleSelectMenuBuilder;

  constructor(customId: string) {
    this._menu = new RoleSelectMenuBuilder().setCustomId(customId);
  }

  placeholder(text: string): this {
    this._menu.setPlaceholder(text);
    return this;
  }

  max(value: number): this {
    this._menu.setMaxValues(value);
    return this;
  }

  disabled(value = true): this {
    this._menu.setDisabled(value);
    return this;
  }

  build(): RoleSelectMenuBuilder {
    return this._menu;
  }
}

// ─── 채널 셀렉트 ───────────────────────────────────────────────

export class QuickChannelSelect {
  private _menu: ChannelSelectMenuBuilder;

  constructor(customId: string) {
    this._menu = new ChannelSelectMenuBuilder().setCustomId(customId);
  }

  placeholder(text: string): this {
    this._menu.setPlaceholder(text);
    return this;
  }

  channelTypes(...types: ChannelType[]): this {
    this._menu.addChannelTypes(...types);
    return this;
  }

  max(value: number): this {
    this._menu.setMaxValues(value);
    return this;
  }

  disabled(value = true): this {
    this._menu.setDisabled(value);
    return this;
  }

  build(): ChannelSelectMenuBuilder {
    return this._menu;
  }
}

// ─── 멘션 셀렉트 ───────────────────────────────────────────────

export class QuickMentionableSelect {
  private _menu: MentionableSelectMenuBuilder;

  constructor(customId: string) {
    this._menu = new MentionableSelectMenuBuilder().setCustomId(customId);
  }

  placeholder(text: string): this {
    this._menu.setPlaceholder(text);
    return this;
  }

  max(value: number): this {
    this._menu.setMaxValues(value);
    return this;
  }

  build(): MentionableSelectMenuBuilder {
    return this._menu;
  }
}

// ─── 빠른 생성 헬퍼 ────────────────────────────────────────────

export const Select = {
  string(id: string): QuickStringSelect {
    return new QuickStringSelect().id(id);
  },
  user(id: string): QuickUserSelect {
    return new QuickUserSelect(id);
  },
  role(id: string): QuickRoleSelect {
    return new QuickRoleSelect(id);
  },
  channel(id: string): QuickChannelSelect {
    return new QuickChannelSelect(id);
  },
  mentionable(id: string): QuickMentionableSelect {
    return new QuickMentionableSelect(id);
  },
};
