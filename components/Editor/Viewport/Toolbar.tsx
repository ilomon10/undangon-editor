import React from "react";
import { useViewport } from "@/components/Editor/Viewport/useViewport";
import { useEditor } from "@craftjs/core";
import { Button } from "@/components/ui/button";
import {
  ChevronDownIcon,
  DesktopIcon,
  DotsHorizontalIcon,
  EyeOpenIcon,
  MobileIcon,
  ResetIcon,
  Share2Icon,
} from "@radix-ui/react-icons";
import { State } from "@/components/component/State";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Toolbar = () => {
  const {
    media: { setMedia, currentMedia },
    handler,
  } = useViewport();
  const { canUndo, canRedo, actions, query } = useEditor((state, query) => ({
    enabled: state.options.enabled,
    canUndo: query.history.canUndo(),
    canRedo: query.history.canRedo(),
  }));

  const previewUrl = React.useMemo(() => {
    try {
      return handler.constructPreviewUrl();
    } catch (err) {
      return null;
    }
  }, [handler.constructPreviewUrl]);

  return (
    <div className="px-2 py-2 flex items-center flex-row">
      <div className="mr-2">
        <Button onClick={handler.onClose}>Close</Button>
      </div>
      <div>
        <Button
          disabled={!canUndo}
          onClick={() => actions.history.undo()}
          variant="outline"
          size="icon"
        >
          <ResetIcon />
        </Button>
        <Button
          disabled={!canRedo}
          onClick={() => actions.history.redo()}
          variant="outline"
          size="icon"
        >
          <ResetIcon className="transform -scale-x-100" />
        </Button>
      </div>
      {/* <div ml={2}>
        <KeyCombo combo="shift+/" />
      </div> */}
      <div className="flex grow justify-center">
        <Button
          className={`${currentMedia.name === "mobile" && "active"}`}
          onClick={() => setMedia("mobile")}
          variant="outline"
          size="icon"
        >
          <MobileIcon />
        </Button>
        <Button
          className={`${currentMedia.name === "desktop" && "active"}`}
          onClick={() => setMedia("desktop")}
          variant="outline"
          size="icon"
        >
          <DesktopIcon />
        </Button>
      </div>
      <div className="flex">
        <State defaultValue={false}>
          {({ state: isLoading, setState: setLoading }) => (
            <Button
              onClick={() =>
                handler.onPublish(query, { isLoading, setLoading })
              }
            >
              Publish
            </Button>
          )}
        </State>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="ml-1">
              <DotsHorizontalIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <a href={previewUrl} target="_blank">
                <EyeOpenIcon className="mr-2 h-4 w-4" />
                <span>Preview</span>
              </a>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Share2Icon className="mr-2 h-4 w-4" />
              <span>Export</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};