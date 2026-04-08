import {
  ActionRowBuilder,
  ButtonBuilder,
  StringSelectMenuBuilder,
  UserSelectMenuBuilder,
  RoleSelectMenuBuilder,
  ChannelSelectMenuBuilder,
  MentionableSelectMenuBuilder,
  type MessageActionRowComponentBuilder,
} from "discord.js";
import type { QuickButton } from "./QuickButton";
import type {
  QuickStringSelect,
  QuickUserSelect,
  QuickRoleSelect,
  QuickChannelSelect,
  QuickMentionableSelect,
} from "./QuickSelect";

type RowComponent =
  | QuickButton
  | QuickStringSelect
  | QuickUserSelect
  | QuickRoleSelect
  | QuickChannelSelect
  | QuickMentionableSelect
  | MessageActionRowComponentBuilder;

function isBuilder(c: RowComponent): c is MessageActionRowComponentBuilder {
  return (
    c instanceof ButtonBuilder ||
    c instanceof StringSelectMenuBuilder ||
    c instanceof UserSelectMenuBuilder ||
    c instanceof RoleSelectMenuBuilder ||
    c instanceof ChannelSelectMenuBuilder ||
    c instanceof MentionableSelectMenuBuilder
  );
}

function resolveComponent(c: RowComponent): MessageActionRowComponentBuilder {
  if (isBuilder(c)) return c;
  return (c as { build(): MessageActionRowComponentBuilder }).build();
}

/**
 * 버튼 / 셀렉트 메뉴를 ActionRow로 묶어줍니다.
 *
 * @example
 * row(Button.primary('ok', '확인'), Button.danger('cancel', '취소'))
 * row(Select.string('menu').placeholder('선택하세요').options(...))
 */
export function row(
  ...components: RowComponent[]
): ActionRowBuilder<MessageActionRowComponentBuilder> {
  return new ActionRowBuilder<MessageActionRowComponentBuilder>().addComponents(
    components.map(resolveComponent)
  );
}
