import { Embed, Button, Select, Modal, QuickMessage } from "./index";

// ─── 1. 임베드 ─────────────────────────────────────────────────
const infoEmbed = Embed.info("공지사항", "서버 점검이 예정되어 있습니다.").timestamp().build();
console.log("1. 임베드:", infoEmbed.toJSON().title);

// ─── 2. 버튼 ──────────────────────────────────────────────────
const confirmBtn = Button.success("confirm", "확인", "✅");
const cancelBtn = Button.danger("cancel", "취소", "❌");
console.log("\n2. 버튼: 확인 | 취소");

// ─── 3. 셀렉트 메뉴 ───────────────────────────────────────────
const roleSelect = Select.string("role_select")
  .placeholder("역할을 선택하세요")
  .options(
    { label: "개발자", value: "dev", emoji: "💻", description: "개발 채널 접근" },
    { label: "디자이너", value: "design", emoji: "🎨", description: "디자인 채널 접근" },
    { label: "기획자", value: "pm", emoji: "📋", description: "기획 채널 접근" }
  );
console.log("\n3. 셀렉트 옵션 수:", roleSelect.build().toJSON().options?.length);

// ─── 4. 유저/역할 셀렉트 ─────────────────────────────────────
const userSelect = Select.user("target_user").placeholder("유저를 선택하세요").max(3);
const roleMenuSelect = Select.role("target_role").placeholder("역할을 선택하세요");
console.log("\n4. 유저 셀렉트 type:", userSelect.build().toJSON().type);
console.log("   역할 셀렉트 type:", roleMenuSelect.build().toJSON().type);

// ─── 5. 모달 ──────────────────────────────────────────────────
const feedbackModal = Modal.create("feedback_modal", "피드백 보내기")
  .short({ id: "title", label: "제목", placeholder: "피드백 제목을 입력하세요", maxLength: 100 })
  .paragraph({
    id: "content",
    label: "내용",
    placeholder: "자세한 내용을 입력해주세요...",
    minLength: 10,
    maxLength: 1000,
  })
  .short({ id: "contact", label: "연락처 (선택)", required: false, placeholder: "이메일 또는 디스코드 태그" })
  .build();
console.log("\n5. 모달:", feedbackModal.toJSON().title, "- 컴포넌트 수:", feedbackModal.toJSON().components.length);

// ─── 6. QuickMessage — 전부 합치기 ────────────────────────────
const message = new QuickMessage()
  .embed(Embed.warn("역할 선택", "원하는 역할을 선택해주세요."))
  .row(confirmBtn, cancelBtn)   // Quick* 빌더 그대로 전달
  .row(roleSelect)              // Quick* 빌더 그대로 전달 (단독 row)
  .ephemeral()
  .build();

console.log(
  "\n6. QuickMessage:",
  "임베드 수:", message.embeds?.length,
  "| row 수:", message.components?.length,
  "| ephemeral:", message.ephemeral
);

// ─── 실제 봇 사용 예 (주석) ───────────────────────────────────
/*
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
        .embed(Embed.success("신고 완료").description(`사유: ${reason}`))
        .ephemeral()
        .build()
    );
  }
});
*/
