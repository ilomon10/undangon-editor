"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { PopoverPortal } from "@radix-ui/react-popover";
import { Paintbrush } from "lucide-react";
import { useMemo } from "react";
import ColorPicker from "react-gcolor-picker";
import Gradient from "./gcolor_picker/Gradient";
import { HexColorPicker } from "react-colorful";
import { Cross1Icon } from "@radix-ui/react-icons";

export function BackgroundPicker({
  value,
  onChange,
  className,
}: {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}) {
  const solids = [
    "#E2E2E2",
    "#ff75c3",
    "#ffa647",
    "#ffe83f",
    "#9fff5b",
    "#70e2ff",
    "#cd93ff",
    "#09203f",
  ];

  const gradients = [
    "linear-gradient(to top left,#accbee,#e7f0fd)",
    "linear-gradient(to top left,#d5d4d0,#d5d4d0,#eeeeec)",
    "linear-gradient(to top left,#000000,#434343)",
    "linear-gradient(to top left,#09203f,#537895)",
    "linear-gradient(to top left,#AC32E4,#7918F2,#4801FF)",
    "linear-gradient(to top left,#f953c6,#b91d73)",
    "linear-gradient(to top left,#ee0979,#ff6a00)",
    "linear-gradient(to top left,#F00000,#DC281E)",
    "linear-gradient(to top left,#00c6ff,#0072ff)",
    "linear-gradient(to top left,#4facfe,#00f2fe)",
    "linear-gradient(to top left,#0ba360,#3cba92)",
    "linear-gradient(to top left,#FDFC47,#24FE41)",
    "linear-gradient(to top left,#8a2be2,#0000cd,#228b22,#ccff00)",
    "linear-gradient(to top left,#40E0D0,#FF8C00,#FF0080)",
    "linear-gradient(to top left,#fcc5e4,#fda34b,#ff7882,#c8699e,#7046aa,#0c1db8,#020f75)",
    "linear-gradient(to top left,#ff75c3,#ffa647,#ffe83f,#9fff5b,#70e2ff,#cd93ff)",
  ];

  const images = [
    "url(https://images.unsplash.com/photo-1691200099282-16fd34790ade?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2532&q=90)",
    "url(https://images.unsplash.com/photo-1691226099773-b13a89a1d167?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2532&q=90",
    "url(https://images.unsplash.com/photo-1688822863426-8c5f9b257090?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2532&q=90)",
    "url(https://images.unsplash.com/photo-1691225850735-6e4e51834cad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2532&q=90)",
  ];

  const defaultTab = useMemo(() => {
    if (value.includes("url")) return "image";
    if (value.includes("gradient")) return "gradient";
    return "solid";
  }, [value]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[220px] justify-start text-left font-normal",
            !value && "text-muted-foreground",
            className
          )}
        >
          <div className="w-full flex items-center gap-2">
            {value ? (
              <div
                className="h-4 w-4 rounded !bg-center !bg-cover transition-all"
                style={{ background: value }}
              ></div>
            ) : (
              <Paintbrush className="h-4 w-4" />
            )}
            <div className="truncate flex-1">
              {value ? value : "Pick a color"}
            </div>
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverPortal>
        <PopoverContent>
          <Tabs defaultValue={defaultTab} className="w-full">
            <TabsList className="w-full mb-4">
              <TabsTrigger className="flex-1" value="solid">
                Solid
              </TabsTrigger>
              <TabsTrigger className="flex-1" value="gradient">
                Gradient
              </TabsTrigger>
              <TabsTrigger className="flex-1" value="image">
                Image
              </TabsTrigger>
            </TabsList>

            <TabsContent value="solid" className="mt-0">
              <div className="mb-2">
                <HexColorPicker
                  className="mb-3"
                  style={{
                    width: "100%",
                  }}
                  color={value}
                  onChange={(color) => {
                    onChange(color);
                  }}
                />
              </div>
            </TabsContent>

            <TabsContent value="gradient" className="mt-0">
              <div className="mb-2">
                <Gradient
                  value={value}
                  onChange={(value: any) => {
                    onChange(value);
                  }}
                />
              </div>
            </TabsContent>

            <TabsContent value="image" className="mt-0">
              <div className="grid grid-cols-2 gap-1 mb-2">
                {images.map((s) => (
                  <div
                    key={s}
                    style={{ backgroundImage: s }}
                    className="rounded-md bg-cover bg-center h-12 w-full cursor-pointer active:scale-105"
                    onClick={() => onChange(s)}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="password">
              Change your password here.
            </TabsContent>
          </Tabs>
          <div className="flex mt-4">
            <Input
              id="custom"
              value={value}
              className="col-span-2 h-8"
              onChange={(e) => onChange(e.currentTarget.value)}
            />
            <Button
              variant={"ghost"}
              size={"icon"}
              className="px-2 h-8"
              onClick={() => {
                onChange("inherit");
              }}
            >
              <Cross1Icon height={16} width={16} />
            </Button>
          </div>
        </PopoverContent>
      </PopoverPortal>
    </Popover>
  );
}
