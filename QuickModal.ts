import { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } from "discord.js";

export interface TextInputOptions {
  id: string;
  label: string;
  placeholder?: string;
  value?: string;       // 미리 채워진 값
  required?: boolean;
  minLength?: number;
  maxLength?: number;
}

export class QuickModal {
  private _modal: ModalBuilder;

  constructor() {
    this._modal = new ModalBuilder();
  }

  id(customId: string): this {
    this._modal.setCustomId(customId);
    return this;
  }

  title(text: string): this {
    this._modal.setTitle(text);
    return this;
  }

  /** 한 줄 입력 */
  short(opts: TextInputOptions): this {
    return this._addInput(opts, TextInputStyle.Short);
  }

  /** 여러 줄 입력 */
  paragraph(opts: TextInputOptions): this {
    return this._addInput(opts, TextInputStyle.Paragraph);
  }

  private _addInput(opts: TextInputOptions, style: TextInputStyle): this {
    const input = new TextInputBuilder()
      .setCustomId(opts.id)
      .setLabel(opts.label)
      .setStyle(style)
      .setRequired(opts.required ?? true);

    if (opts.placeholder) input.setPlaceholder(opts.placeholder);
    if (opts.value) input.setValue(opts.value);
    if (opts.minLength !== undefined) input.setMinLength(opts.minLength);
    if (opts.maxLength !== undefined) input.setMaxLength(opts.maxLength);

    const row = new ActionRowBuilder<TextInputBuilder>().addComponents(input);
    this._modal.addComponents(row);
    return this;
  }

  build(): ModalBuilder {
    return this._modal;
  }
}

// ─── 빠른 생성 헬퍼 ────────────────────────────────────────────

export const Modal = {
  /**
   * @example
   * Modal.create('feedback', '피드백')
   *   .short({ id: 'title', label: '제목' })
   *   .paragraph({ id: 'content', label: '내용' })
   *   .build()
   */
  create(id: string, title: string): QuickModal {
    return new QuickModal().id(id).title(title);
  },
};
