import { useEffect } from "react";
import { createPortal } from "react-dom";

import "./modal.css";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
};

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title }) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div id="modal" className={"modal" + (isOpen ? " show" : "")}>
      <div className="modal-content">
        <span onClick={onClose} className="close">
          &times;
        </span>
        {title ? <h2>{title}</h2> : ""}
        <div className="body">{children}</div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
