export class UIComponent {
  protected parseTemplate(str: string): HTMLElement {
    const template = document.createElement("template");
    template.innerHTML = str;
    const el = template.content.firstElementChild as HTMLElement | null;

    if (!el) {
      throw new Error(`${str} is invalid template string`);
    }

    return el;
  }
}
