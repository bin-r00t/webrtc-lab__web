import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import { forwardRef, useImperativeHandle, useRef } from "react";

export const Modal = forwardRef(function Modal(
  { show, className, children, onClose },
  ref
) {
  const dialogRef = useRef();

  useImperativeHandle(
    ref,
    () => ({
      open: () => {
        dialogRef.current.showModal();
      },
      close: () => {
        dialogRef.current.close();
      },
    }),
    []
  );

  return createPortal(
    <AnimatePresence>
      {show && (
        <motion.dialog
          ref={dialogRef}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          id="modal"
          className={`rounded-3xl bg-white p-6 ${className}`}
        >
          {children}
        </motion.dialog>
      )}
    </AnimatePresence>,
    document.getElementById("modal-part")
  );
});
