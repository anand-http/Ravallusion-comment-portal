import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

function CustomDialog({
  open,
  close,
  children,
}) {
  return (
    <Dialog open={open} onOpenChange={close}>
      <DialogTitle className="hidden"></DialogTitle>
      <DialogDescription className="hidden"></DialogDescription>
      <DialogContent className="h-screen overflow-y-auto border-none w-full outline-none">
        {children}
      </DialogContent>
    </Dialog>
  );
}

export default CustomDialog;