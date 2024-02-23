import React from "react";
import { useDialogContext } from "./Provider";
import { Presence } from "@radix-ui/react-presence";
import { cn } from "@/lib/utils";

export const Content: React.FC<
  React.PropsWithChildren<{ className?: string }>
> = ({ children, className }) => {
  const { open, modal } = useDialogContext();
  return (
    <Presence present={open}>
      <div
        data-state={open ? "open" : "closed"}
        className={cn(
          modal ? "fixed" : "absolute",
          "left-[50%] top-[50%] z-20 w-full max-w-lg translate-x-[-50%] translate-y-[-50%] border duration-1000 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] md:w-full",
          className
        )}
      >
        {children}
      </div>
    </Presence>
  );
};
