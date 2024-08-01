import HamburgerMenu from "./hamburger-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import Link from "next/link";

const MobileNav = () => {
  return (
    <nav className="flex h-16 w-full items-center justify-between px-4 md:hidden">
      <div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Link
                className="flex font-bold tracking-tighter uppercase h-16 items-center justify-center "
                href="/"
              >
                Magnet
              </Link>
            </TooltipTrigger>

            <TooltipContent side="right">Back to home</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div>
        <HamburgerMenu />
      </div>
    </nav>
  );
};
export default MobileNav;
