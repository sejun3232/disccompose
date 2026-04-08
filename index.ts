// ─── 임베드 ───────────────────────────────────────────────────
import { QuickEmbed } from "./QuickEmbed";
import * as Embed from "./templates";
export { QuickEmbed, Embed };
export { Colors, resolveColor } from "./colors";
export type { ColorInput, FieldInput, AuthorInput, FooterInput } from "./types";

// ─── 버튼 ─────────────────────────────────────────────────────
export { QuickButton, Button } from "./QuickButton";

// ─── 셀렉트 메뉴 ──────────────────────────────────────────────
export {
  QuickStringSelect,
  QuickUserSelect,
  QuickRoleSelect,
  QuickChannelSelect,
  QuickMentionableSelect,
  Select,
} from "./QuickSelect";
export type { SelectOption } from "./QuickSelect";

// ─── 모달 ─────────────────────────────────────────────────────
export { QuickModal, Modal } from "./QuickModal";
export type { TextInputOptions } from "./QuickModal";

// ─── 액션 로우 ────────────────────────────────────────────────
export { row } from "./QuickRow";

// ─── 메시지 빌더 ──────────────────────────────────────────────
export { QuickMessage } from "./QuickMessage";

// ─── 팩토리 헬퍼 ──────────────────────────────────────────────

/** 임베드 빠른 생성 */
export function embed(title?: string, description?: string): QuickEmbed {
  const e = new QuickEmbed();
  if (title) e.title(title);
  if (description) e.description(description);
  return e;
}
