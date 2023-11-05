import Modal from 'react-modal';
import ModalContent from '../ModalContent/ModalContent';

interface IModalProps {
  open: boolean;
  confirmAction: (value?: any) => void;
  cancelAction: (value?: any) => void;
  modalText: string;
  confirmText?: string;
  cancelText?: string;
  Icon?: React.ElementType;
}

export default 
(
  {
    open,
    cancelAction,
    confirmAction,
    cancelText,
    confirmText,
    modalText,
    Icon

  }: IModalProps) => {
  return (
    <Modal
      isOpen={open}

      style={{
        overlay: {
          background: "rgba(0,0,0, 0.8)"
        },
        content: {
          background: "#1C1C1C",
          border: "none",
          width: "20%",
          height: "20%",
          position: "absolute",
          display: "flex",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)"
        }
      }}
      ariaHideApp={false}
    >
      <ModalContent
        text={modalText}
        ModalIcon={Icon}
        confirmModal={confirmAction}
        closeModal={cancelAction}
      />
    </Modal>

  );
}