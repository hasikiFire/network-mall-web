'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { createContext, useContext, useState } from 'react';
import { Button } from '../ui/button';

type DialogOptions = {
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
};

type DialogContextType = {
  openDialog: (options: DialogOptions) => Promise<boolean>;
};

const DialogContext = createContext<DialogContextType | null>(null);

export function DialogProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<DialogOptions>({ title: '' });
  const [resolvePromise, setResolvePromise] =
    useState<(value: boolean) => void>();

  const openDialog = (options: DialogOptions): Promise<boolean> => {
    setOptions(options);
    setOpen(true);

    return new Promise((resolve) => {
      setResolvePromise(() => resolve);
    });
  };

  const handleClose = (confirmed: boolean) => {
    setOpen(false);
    resolvePromise?.(confirmed);
  };

  return (
    <DialogContext.Provider value={{ openDialog }}>
      {children}

      <Dialog open={open} onOpenChange={(open) => !open && handleClose(false)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{options.title}</DialogTitle>
            {options.description && (
              <DialogDescription>{options.description}</DialogDescription>
            )}
          </DialogHeader>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              variant="outline"
              onClick={() => handleClose(false)}
              className="px-4 py-2 text-sm font-medium"
            >
              {options.cancelText || 'Cancel'}
            </Button>
            <Button
              onClick={() => handleClose(true)}
              className="rounded bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
            >
              {options.confirmText || 'Confirm'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DialogContext.Provider>
  );
}

export function useDialog() {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error('useDialog must be used within a DialogProvider');
  }
  return context;
}
