"use client";
import { Dialog, DialogPanel, DialogTitle, Transition } from '@headlessui/react';

export function Modal({ open, onClose, title, children, footer }: { open: boolean; onClose: (v: boolean) => void; title: string; children: React.ReactNode; footer?: React.ReactNode }) {
  return (
    <Transition show={open}>
      <Dialog onClose={onClose} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="card-surface w-full max-w-lg">
            <DialogTitle className="text-base font-semibold mb-2">{title}</DialogTitle>
            <div>{children}</div>
            {footer && <div className="mt-4 flex justify-end gap-2">{footer}</div>}
          </DialogPanel>
        </div>
      </Dialog>
    </Transition>
  );
}
