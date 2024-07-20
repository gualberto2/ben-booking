import HamburgerMenu from "./hamburger-menu";

const MobileNav = () => {
  return (
    <nav className="flex h-16 w-full items-center justify-between px-4 md:hidden">
      <div>
        <a href="/">
          <img alt="The project logo" src="" className="h-10 w-10" />
        </a>
      </div>
      <div>
        <HamburgerMenu />
      </div>
    </nav>
  );
};
export default MobileNav;
