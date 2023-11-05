import React from "react";
import { Button } from "../Button/Button";
import { Cancel } from "../../assets/Icons/Cancel/Cancel";
import { Confirm } from "../../assets/Icons/Confirm/Confirm";
import ButtonIcon from "../IconButton/IconButton";

interface ModalContentProps {
  text: string;
  confirmText?: string;
  cancelText?: string;
  ModalIcon?: React.ElementType;
  closeModal: (value: any) => void;
  confirmModal: (value: any) => void;
}

export default ({
  text,
  closeModal,
  confirmModal,
  confirmText,
  cancelText,
  ModalIcon,
}: ModalContentProps) => {
  return (
    <div
      className={`flex flex-col ${
        ModalIcon ? `justify-between` : `gap-10 justify-center`
      } items-center flex-1`}
    >
      {ModalIcon && <ModalIcon />}
      <div>
        <p className="text-gray-200 text-center">{text}</p>
      </div>
      <div className="flex justify-between w-full">
        <ButtonIcon
          IconElement={Confirm}
          text={confirmText || "Confirmar"}
          action={confirmModal}
        />
        <ButtonIcon
          IconElement={Cancel}
          text={cancelText || "Cancelar"}
          action={closeModal}
        />
      </div>
    </div>
  );
};
