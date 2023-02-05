import React, { useEffect } from "react";
import { IModalOverlayProps } from "../../types/types";
import styles from "./ModalOverlay.module.css";

const ModalOverlay: React.FC<IModalOverlayProps> = ({ children, isOpen, onClose }) => {
  const closeByEsc = (evt: KeyboardEvent | React.KeyboardEvent) => {
    if (evt.key === "Escape") {
      onClose();
    }
  };

  const closeByOverlay = (evt: React.MouseEvent) => {
    const target = evt.target as HTMLDivElement;
    if (target.classList.contains(styles.overlay)) {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", closeByEsc);
    }
    return () => {
      document.removeEventListener("keydown", closeByEsc);
    };
  }, [isOpen]);

  return (
    <div onClick={closeByOverlay} className={styles.overlay}>
      {children}
    </div>
  );
};

export default ModalOverlay;
