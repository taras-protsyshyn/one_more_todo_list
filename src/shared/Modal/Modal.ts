import { UIComponent } from "../UIComponent/UIComponent";

export class Modal extends UIComponent {
  private static instance: Modal;
  private modalEl: HTMLElement = null!;
  private closeModalEl: HTMLElement = null!;
  private isOpen: boolean = false;

  private constructor() {
    super();
  }

  private initModalEl(title?: string) {
    this.modalEl = this.parseTemplate(`
    <div id="modal" class="modal">
      <div class="modal-content">
        <span class="close">&times;</span>
        ${title ? `<h2>${title}</h2>` : ""}
        <div class="body"></div>
      </div>
    </div>
    `)!;

    this.closeModalEl = this.modalEl.querySelector(".close") as HTMLElement;
    this.closeModalEl.addEventListener("click", () => this.close());

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.isOpen) {
        this.close();
      }
    });

    document.body.appendChild(this.modalEl);
  }

  open(content: HTMLElement) {
    const bodyEl = this.modalEl.querySelector(".body") as HTMLElement;
    bodyEl.innerHTML = "";
    bodyEl.appendChild(content);

    this.modalEl.style.display = "block";
    this.isOpen = true;
  }

  close() {
    this.modalEl.style.display = "none";
    this.isOpen = false;
  }

  static init(title?: string) {
    if (!Modal.instance) {
      Modal.instance = new Modal();
      Modal.instance.initModalEl(title);
    }
    return Modal.instance;
  }
}
