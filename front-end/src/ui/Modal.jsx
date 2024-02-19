import { createContext, useState, useContext, cloneElement } from "react";
import { createPortal } from "react-dom";
import useDetectClick from "../hooks/useDetectClick";
import { GrClose } from "react-icons/gr";
const ModalContext = createContext();
function Modal({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }
  return (
    <ModalContext.Provider value={{ isOpen, openModal, closeModal, setIsOpen }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ children }) {
  const { openModal } = useContext(ModalContext);
  return cloneElement(children, { onClick: openModal });
}
function Window({ children }) {
  const { isOpen, closeModal } = useContext(ModalContext);

  const ref = useDetectClick(closeModal);

  return (
    isOpen &&
    createPortal(
      <div className="absolute right-0 top-0 z-50 h-dvh w-dvw justify-center bg-gray-800/90">
        <div
          ref={ref}
          className="relative mx-auto mt-20 w-3/4 md:w-2/4 lg:w-5/12"
        >
          {children}
          <button
            className="absolute right-2 top-2 rounded-full p-0.5 text-sm text-zinc-500 hover:bg-zinc-700 hover:text-zinc-800 "
            onClick={closeModal}
          >
            <GrClose />
          </button>
        </div>
      </div>,
      document.getElementById("main"),
    )
  );
}

Modal.Open = Open;
Modal.Window = Window;

export function useModalContext() {
  const context = useContext(ModalContext);
  if (!context)
    throw Error("Cannot access ModalContext outside of ModalContext.Provider");
  return context;
}

export default Modal;
