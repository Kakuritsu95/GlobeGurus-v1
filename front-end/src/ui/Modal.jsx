import { createContext, useState, useContext, cloneElement } from "react";
import { createPortal } from "react-dom";
import useDetectClick from "../hooks/useDetectClick";
import { GrClose } from "react-icons/gr";
const ModalContext = createContext();
function Modal({ children }) {
  const [openName, setOpenName] = useState("");

  function openModal(openName) {
    setOpenName(openName);
  }
  function closeModal() {
    setOpenName("");
  }
  return (
    <ModalContext.Provider
      value={{ openName, setOpenName, openModal, closeModal }}
    >
      {children}
    </ModalContext.Provider>
  );
}

function Open({ children, opens: opensWindowName }) {
  const { openModal } = useContext(ModalContext);
  return cloneElement(children, { onClick: () => openModal(opensWindowName) });
}
function Close({ children }) {
  const { closeModal } = useContext(ModalContext);
  return cloneElement(children, { onClick: closeModal });
}
function Window({ children, name, adjustPosition = "" }) {
  const { openName, closeModal } = useContext(ModalContext);

  const ref = useDetectClick(closeModal);
  if (openName !== name) return null;
  return createPortal(
    <div className="absolute right-0 top-0 z-40 flex h-dvh w-full items-center justify-center bg-gray-800/90 text-center">
      <div
        ref={ref}
        className={`relative ${adjustPosition} w-11/12  sm:w-auto`}
      >
        {children}

        <button
          className="absolute right-2 top-3 rounded-full p-0.5 text-sm text-zinc-500 hover:bg-zinc-300 hover:text-zinc-800 active:bg-zinc-400 md:p-1 "
          onClick={closeModal}
        >
          <GrClose />
        </button>
      </div>
    </div>,
    document.getElementById("main"),
  );
}

Modal.Open = Open;
Modal.Close = Close;
Modal.Window = Window;

export function useModalContext() {
  const context = useContext(ModalContext);
  if (!context)
    throw Error("Cannot access ModalContext outside of ModalContext.Provider");
  return context;
}

export default Modal;
