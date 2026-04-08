import {
  ActionRowBuilder,
  ButtonBuilder,
  StringSelectMenuBuilder,
  UserSelectMenuBuilder,
  RoleSelectMenuBuilder,
  ChannelSelectMenuBuilder,
  MentionableSelectMenuBuilder,
  type MessageActionRowComponentBuilder,
  type BaseMessageOptions,
} from "discord.js";
import type { QuickEmbed } from "./QuickEmbed";
import type { QuickButton } from "./QuickButton";
import type {
  QuickStringSelect,
  QuickUserSelect,
  QuickRoleSelect,
  QuickChannelSelect,
  QuickMentionableSelect,
} from "./QuickSelect";

type QuickComponent =
  | QuickButton
  | QuickStringSelect
  | QuickUserSelect
  | QuickRoleSelect
  | QuickChannelSelect
  | QuickMentionableSelect;

type RowInput =
  | ActionRowBuilder<MessageActionRowComponentBuilder>
  | QuickComponent
  | MessageActionRowComponentBuilder;

function isDiscordComponent(i: RowInput): i is MessageActionRowComponentBuilder {
  return (
    i instanceof ButtonBuilder ||
    i instanceof StringSelectMenuBuilder ||
    i instanceof UserSelectMenuBuilder ||
    i instanceof RoleSelectMenuBuilder ||
    i instanceof ChannelSelectMenuBuilder ||
    i instanceof MentionableSelectMenuBuilder
  );
}

/**
 * 임베드 + 컴포넌트를 하나의 메시지로 합쳐줍니다.
 *
 * @example
 * new QuickMessage()
 *   .embed(Embed.success('완료', '저장되었습니다.'))
 *   .row(Button.primary('ok', '확인'), Button.secondary('cancel', '취소'))
 *   .ephemeral()
 *   .build()
 */
export class QuickMessage {
  private _embeds: QuickEmbed[] = [];
  private _rows: ActionRowBuilder<MessageActionRowComponentBuilder>[] = [];
  private _content?: string;
  private _ephemeral = false;

  content(text: string): this {
    this._content = text;
    return this;
  }

  embed(...embeds: QuickEmbed[]): this {
    this._embeds.push(...embeds);
    return this;
  }

  /**
   * 버튼/셀렉트를 하나의 ActionRow로 묶어 추가합니다.
   * - Quick* 빌더 또는 이미 .build()한 discord.js 빌더 모두 사용 가능
   * - ActionRowBuilder를 단독으로 넘기면 그대로 추가
   */
  row(...inputs: RowInput[]): this {
    if (inputs.length === 1 && inputs[0] instanceof ActionRowBuilder) {
      this._rows.push(inputs[0] as ActionRowBuilder<MessageActionRowComponentBuilder>);
      return this;
    }

    const components = inputs.map((i) => {
      if (i instanceof ActionRowBuilder) {
        throw new Error("ActionRowBuilder는 다른 컴포넌트와 함께 row()에 넣을 수 없습니다.");
      }
      if (isDiscordComponent(i)) return i;
      return (i as QuickComponent).build() as MessageActionRowComponentBuilder;
    });

    this._rows.push(
      new ActionRowBuilder<MessageActionRowComponentBuilder>().addComponents(components)
    );
    return this;
  }

  /** 이미 만들어진 ActionRow를 직접 추가 */
  addRow(actionRow: ActionRowBuilder<MessageActionRowComponentBuilder>): this {
    this._rows.push(actionRow);
    return this;
  }

  /** 나에게만 보이기 (슬래시 커맨드 응답 시) */
  ephemeral(value = true): this {
    this._ephemeral = value;
    return this;
  }

  build(): BaseMessageOptions & { ephemeral?: boolean } {
    const result: BaseMessageOptions & { ephemeral?: boolean } = {};
    if (this._content) result.content = this._content;
    if (this._embeds.length) result.embeds = this._embeds.map((e) => e.build());
    if (this._rows.length) result.components = this._rows;
    if (this._ephemeral) result.ephemeral = true;
    return result;
  }
}
