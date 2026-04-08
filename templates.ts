import { QuickEmbed } from "./QuickEmbed";

/**
 * 성공 임베드 — 초록색
 * @example Embed.success('완료', '작업이 완료되었습니다.')
 */
export function success(title: string, description?: string): QuickEmbed {
  const e = new QuickEmbed().color("success").title(`✅ ${title}`);
  if (description) e.description(description);
  return e;
}

/**
 * 오류 임베드 — 빨간색
 * @example Embed.error('오류', '알 수 없는 오류가 발생했습니다.')
 */
export function error(title: string, description?: string): QuickEmbed {
  const e = new QuickEmbed().color("error").title(`❌ ${title}`);
  if (description) e.description(description);
  return e;
}

/**
 * 경고 임베드 — 노란색
 * @example Embed.warn('경고', '이 작업은 되돌릴 수 없습니다.')
 */
export function warn(title: string, description?: string): QuickEmbed {
  const e = new QuickEmbed().color("warning").title(`⚠️ ${title}`);
  if (description) e.description(description);
  return e;
}

/**
 * 정보 임베드 — 파란색
 * @example Embed.info('안내', '명령어 목록입니다.')
 */
export function info(title: string, description?: string): QuickEmbed {
  const e = new QuickEmbed().color("info").title(`ℹ️ ${title}`);
  if (description) e.description(description);
  return e;
}

/**
 * 로딩 임베드
 * @example Embed.loading('처리 중', '잠시만 기다려주세요...')
 */
export function loading(title = "처리 중", description = "잠시만 기다려주세요..."): QuickEmbed {
  return new QuickEmbed().color("secondary").title(`⏳ ${title}`).description(description);
}

/**
 * 사용자 프로필 임베드
 * @example Embed.profile(user.username, user.displayAvatarURL(), '역할: 관리자')
 */
export function profile(name: string, avatarURL: string, description?: string): QuickEmbed {
  const e = new QuickEmbed()
    .color("blurple")
    .author({ name, iconURL: avatarURL })
    .thumbnail(avatarURL);
  if (description) e.description(description);
  return e;
}
