"use client";
import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { ChevronRightIcon, Home } from "lucide-react";
import { Button } from "../ui/button";

import Link from "next/link";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  let toggleSidebar = () => {
    setIsCollapsed((value) => !value);
  };
  return (
    <aside
      className={`sticky inset-y-0 z-50 hidden flex-col border-r-2 transition-all duration-300 md:flex md:translate-x-0 ${
        isCollapsed ? " w-20 overflow-x-hidden" : " w-52"
      }`}
    >
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Link
              className="flex font-bold tracking-tighter uppercase h-16 items-center justify-center border-b"
              href="/"
            >
              Magnet
            </Link>
          </TooltipTrigger>

          <TooltipContent side="right">Back to home</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <nav className="flex flex-1 flex-col justify-between">
        <div className="flex flex-col items-center justify-between">
          <div className="flex flex-col gap-3 py-5">
            <Button variant="ghost" className="flex flex-row gap-2">
              <Home />
              <span
                className={`text-sm font-semibold ${
                  isCollapsed ? "hidden" : "block"
                }`}
              >
                Home
              </span>
            </Button>
          </div>
          <div className="px-3">{/* <Prompts /> */}</div>
        </div>

        <div className="">
          <div
            className={`flex flex-col items-center justify-center border-t ${
              isCollapsed ? "" : ""
            }`}
          >
            <div className="flex items-center justify-center py-4 text-center">
              <Button
                variant="ghost"
                onClick={toggleSidebar}
                className={`transition-transform ${
                  isCollapsed ? "rotate-180" : ""
                }`}
              >
                <ChevronRightIcon className="h-5 w-5" />
                <span className="sr-only">Toggle sidebar</span>
              </Button>
            </div>
          </div>
        </div>
      </nav>
    </aside>
  );
};
export default Sidebar;

// https://jotai.org/docs/recipes/atom-with-toggle-and-storage
// will use jotai to manage collapsed state, toggle sidebar state
