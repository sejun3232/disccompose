# discord-embed

discord.js 임베드, 버튼, 셀렉트 메뉴, 모달을 더 쉽고 빠르게 만들 수 있는 TypeScript 모듈입니다.

## 설치

```bash
npm install discord.js
```

> discord.js가 설치된 프로젝트에서 `src/` 폴더를 직접 가져다 사용합니다.

---

## 모듈 구조

| 클래스 / 함수 | 역할 |
|---|---|
| `embed()` / `QuickEmbed` | 임베드 빌더 |
| `Embed.*` | 임베드 프리셋 템플릿 |
| `Button.*` / `QuickButton` | 버튼 빌더 |
| `Select.*` / `Quick*Select` | 셀렉트 메뉴 빌더 |
| `Modal.*` / `QuickModal` | 모달 빌더 |
| `QuickMessage` | 임베드 + 컴포넌트 조합 |

---

## 임베드

### 팩토리 함수

```ts
import { embed } from "./discord-embed";

embed("제목", "내용").color("blurple").timestamp().build()
```

### 템플릿

```ts
import { Embed } from "./discord-embed";

Embed.success("저장 완료", "데이터가 저장되었습니다.").build()
Embed.error("오류 발생", "데이터베이스 연결 실패").build()
Embed.warn("주의", "이 작업은 되돌릴 수 없습니다.").build()
Embed.info("도움말", "/help 명령어를 사용하세요.").build()
Embed.loading().build()
Embed.profile(user.username, user.displayAvatarURL()).build()
```

### 빌더 체이닝

```ts
import { QuickEmbed } from "./discord-embed";

new QuickEmbed()
  .title("서버 정보")
  .description("현재 서버 상태입니다.")
  .color("#5865f2")
  .thumbnail("https://example.com/icon.png")
  .image("https://example.com/banner.png")
  .author({ name: "관리자", iconURL: "https://example.com/avatar.png" })
  .field("멤버 수", "1,234명", true)
  .field("채널 수", "42개", true)
  .inlineFields(
    { name: "서버 생성일", value: "2020-01-01" },
    { name: "부스트 레벨", value: "레벨 3" }
  )
  .footer({ text: "마지막 업데이트", iconURL: "https://example.com/icon.png" })
  .timestamp()
  .build()
```

#### `QuickEmbed` 메서드

| 메서드 | 설명 |
|---|---|
| `.title(text)` | 제목 |
| `.description(text)` | 본문 |
| `.color(value)` | 색상명 / `#hex` / 숫자 |
| `.url(link)` | 제목 링크 |
| `.timestamp(date?)` | 타임스탬프 (기본: 현재) |
| `.thumbnail(url)` | 썸네일 |
| `.image(url)` | 큰 이미지 |
| `.author(input)` | `string` 또는 `{ name, url?, iconURL? }` |
| `.footer(input)` | `string` 또는 `{ text, iconURL? }` |
| `.field(name, value, inline?)` | 필드 하나 추가 |
| `.fields(...items)` | 필드 여러 개 추가 |
| `.inlineFields(...items)` | 인라인 필드 여러 개 추가 |
| `.build()` | discord.js `EmbedBuilder` 반환 |

---

## 버튼

```ts
import { Button } from "./discord-embed";

Button.primary("btn_id", "클릭", "✅")
Button.secondary("btn_id", "취소")
Button.success("btn_id", "확인", "✅")
Button.danger("btn_id", "삭제", "🗑️")
Button.link("https://discord.js.org", "문서 보기", "📄")
```

### 빌더 체이닝

```ts
import { QuickButton } from "./discord-embed";

new QuickButton()
  .id("my_button")
  .label("클릭하세요")
  .style("primary")
  .emoji("🎉")
  .disabled(false)
  .build()
```

---

## 셀렉트 메뉴

### 문자열 셀렉트

```ts
import { Select } from "./discord-embed";

Select.string("role_select")
  .placeholder("역할을 선택하세요")
  .options(
    { label: "개발자", value: "dev", emoji: "💻", description: "개발 채널 접근" },
    { label: "디자이너", value: "design", emoji: "🎨" },
    { label: "기획자", value: "pm", emoji: "📋", default: true }
  )
  .range(1, 2)  // 최소 1개, 최대 2개 선택
  .build()
```

### 유저 / 역할 / 채널 셀렉트

```ts
Select.user("target_user").placeholder("유저 선택").max(3).build()

Select.role("target_role").placeholder("역할 선택").build()

Select.channel("target_channel")
  .placeholder("채널 선택")
  .channelTypes(ChannelType.GuildText)
  .build()

Select.mentionable("target").placeholder("멤버 또는 역할 선택").build()
```

---

## 모달

```ts
import { Modal } from "./discord-embed";

Modal.create("feedback_modal", "피드백 보내기")
  .short({
    id: "title",
    label: "제목",
    placeholder: "제목을 입력하세요",
    maxLength: 100,
  })
  .paragraph({
    id: "content",
    label: "내용",
    placeholder: "자세한 내용을 입력해주세요...",
    minLength: 10,
    maxLength: 1000,
  })
  .short({
    id: "contact",
    label: "연락처 (선택)",
    required: false,
  })
  .build()
```

#### `TextInputOptions`

| 속성 | 타입 | 설명 |
|---|---|---|
| `id` | `string` | 커스텀 ID |
| `label` | `string` | 입력 필드 레이블 |
| `placeholder?` | `string` | 힌트 텍스트 |
| `value?` | `string` | 미리 채워진 값 |
| `required?` | `boolean` | 필수 여부 (기본: `true`) |
| `minLength?` | `number` | 최소 글자 수 |
| `maxLength?` | `number` | 최대 글자 수 |

---

## QuickMessage — 모두 합치기

임베드와 컴포넌트를 한 번에 조합해 메시지 옵션 객체를 만들어줍니다.

```ts
import { QuickMessage, Embed, Button, Select } from "./discord-embed";

const message = new QuickMessage()
  .embed(Embed.warn("역할 선택", "원하는 역할을 선택해주세요."))
  .row(Button.success("confirm", "확인"), Button.danger("cancel", "취소"))
  .row(Select.string("roles").placeholder("역할 선택").options(...))
  .ephemeral()
  .build();

// 슬래시 커맨드에 바로 전달
await interaction.reply(message);
```

> `.row()`에 `Button.*` / `Select.*` / `Quick*` 빌더, 또는 이미 `.build()`한 discord.js 빌더 모두 전달 가능합니다.

### 실제 봇 예시

```ts
// 슬래시 커맨드 응답
await interaction.reply(
  new QuickMessage()
    .embed(Embed.success("완료", "저장되었습니다."))
    .row(Button.primary("view", "보기"), Button.secondary("close", "닫기"))
    .ephemeral()
    .build()
);

// 모달 띄우기
await interaction.showModal(
  Modal.create("report", "신고하기")
    .short({ id: "reason", label: "신고 사유" })
    .paragraph({ id: "detail", label: "상세 내용", required: false })
    .build()
);

// 모달 제출 처리
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isModalSubmit()) return;
  if (interaction.customId === "report") {
    const reason = interaction.fields.getTextInputValue("reason");
    await interaction.reply(
      new QuickMessage()
        .embed(Embed.success("신고 완료", `사유: ${reason}`))
        .ephemeral()
        .build()
    );
  }
});
```

---

## 색상

```ts
import { Colors } from "./discord-embed";
```

| 이름 | 색상 |
|---|---|
| `success` | `#57f287` 초록 |
| `error` | `#ed4245` 빨강 |
| `warning` | `#fee75c` 노랑 |
| `info` / `blurple` | `#5865f2` 파랑 |
| `secondary` / `greyple` | `#99aab5` 회색 |
| `red`, `green`, `yellow`, `blue`, `purple`, `orange`, `pink` | 기본 색상 |

색상은 이름, `#hex`, 숫자 모두 지원합니다.

```ts
.color("success")   // 이름
.color("#ff0000")   // hex
.color(0xff0000)    // 숫자
```

---

## 빌드

```bash
npm run build   # dist/ 폴더에 컴파일
npm run dev     # 예제 실행 (tsx)
```
