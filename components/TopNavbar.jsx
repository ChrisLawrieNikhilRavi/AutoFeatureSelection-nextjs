/* Importing Modules */
import { useEffect, useState, useRef, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import {
  FadeContainer,
  hamFastFadeContainer,
  mobileNavItemSideways,
  opacityVariant,
  popUp,
} from "@/content/FramerMotionVariants";
import { useDarkMode } from "@/context/darkModeContext";
import { navigationRoutes } from "@/utils/utils";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { IoIosSettings } from "react-icons/io";
import { RiSettings6Fill } from "react-icons/ri";
import { Menu } from "@headlessui/react";
/* TopNavbar Component */
export default function TopNavbar() {
  const supabase = useSupabaseClient();
  const session = useSession();
  const navRef = useRef(null);
  const router = useRouter();

  /*  Using to control animation as I'll show the name to the mobile navbar when you scroll a bit
   * demo: https://i.imgur.com/5LKI5DY.gif
   */
  const control = useAnimation();
  const [navOpen, setNavOpen] = useState(false);
  const { isDarkMode, changeDarkMode } = useDarkMode();

  const logOutUser = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error(error);
    }
    router.push("/");
  };
  // Adding Shadow, backdrop to the navbar as user scroll the screen
  const addShadowToNavbar = useCallback(() => {
    if (window.pageYOffset > 10) {
      navRef.current.classList.add(
        ...[
          "shadow",
          "backdrop-blur-xl",
          "bg-white/70",
          "dark:bg-darkSecondary",
        ]
      );

      control.start("visible");
    } else {
      navRef.current.classList.remove(
        ...[
          "shadow",
          "backdrop-blur-xl",
          "bg-white/70",
          "dark:bg-darkSecondary",
        ]
      );
      control.start("hidden");
    }
  }, [control]);

  useEffect(() => {
    window.addEventListener("scroll", addShadowToNavbar);
    return () => {
      window.removeEventListener("scroll", addShadowToNavbar);
    };
  }, [addShadowToNavbar]);

  // to lock the scroll when mobile is open
  function lockScroll() {
    const root = document.getElementsByTagName("html")[0];
    root.classList.toggle("lock-scroll"); // class is define in the global.css
  }

  /* To Lock  the Scroll when user visit the mobile nav page */
  function handleNavClick() {
    lockScroll();
    setNavOpen(!navOpen);
  }

  return (
    <div
      className="fixed w-full dark:text-white top-0 flex items-center justify-between px-4 py-[10px] sm:px-6 z-50 print:hidden"
      ref={navRef}
    >
      {/* Mobile Navigation Hamburger and MobileMenu */}
      <HamBurger
        open={navOpen}
        handleClick={handleNavClick}
        className="sm:hidden"
      />
      <AnimatePresence>
        {navOpen && (
          <MobileMenu
            links={navigationRoutes}
            handleClick={handleNavClick}
            session={session}
            logOutUser={logOutUser}
          />
        )}
      </AnimatePresence>

      <Link href="/" passHref>
        <div className="flex gap-2 items-center cursor-pointer z-50">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={popUp}
            className="relative hidden sm:inline-flex mr-3"
          >
            <h1 className="font-mono text-xl">FS</h1>
            {/* TODO: Change Font */}
          </motion.div>
          <div className="absolute sm:!hidden w-fit left-0 right-0 mx-auto flex justify-center  text-base font-mono">
            Feature Selection
          </div>
        </div>
      </Link>

      {/* Top Nav list */}
      <motion.nav className="hidden sm:flex z-10 md:inset-0 md:justify-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={FadeContainer}
          className="flex items-center md:gap-2"
        >
          {navigationRoutes.slice(0, 7).map((link, index) => {
            return <NavItem key={index} href={`/${link}`} text={link} />;
          })}
        </motion.div>
      </motion.nav>

      {/* Sign Out Container */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={popUp}
        className="cursor-pointer gap-4 flex"
        title="Toggle Theme"
      >
        <Menu as="div" className="relative">
          <Menu.Button className="hidden sm:inline-flex cursor-pointer">
            <IoIosSettings className="h-6 w-6" aria-hidden="true" />
          </Menu.Button>
          <UserManagementMenu
            isDarkMode={isDarkMode}
            changeDarkMode={changeDarkMode}
            session={session}
            logOutUser={logOutUser}
          />
        </Menu>
        {/* DarkMode Container */}
        <DarkModeSwitch
          checked={isDarkMode}
          onChange={changeDarkMode}
          size={24}
        />
      </motion.div>
    </div>
  );
}

// NavItem Container
function NavItem({ href, text }) {
  const router = useRouter();
  const isActive = router.asPath === (href === "/home" ? "/" : href);
  return (
    <Link
      className={`${
        isActive
          ? "font-bold text-gray-800 dark:text-gray-100"
          : " text-gray-600 dark:text-gray-300"
      } sm:inline-block transition-all text-[17px] hidden px-2 md:px-3 py-[3px] hover:bg-gray-100 dark:hover:bg-neutral-700/50 rounded-md`}
      href={href === "/home" ? "/" : href}
    >
      <motion.p className="capitalize" variants={popUp}>
        {text}
      </motion.p>
    </Link>
  );
}

// Hamburger Button
function HamBurger({ open, handleClick, className }) {
  return (
    <motion.div
      style={{ zIndex: 1000 }}
      initial="hidden"
      animate="visible"
      variants={popUp}
      className={className}
    >
      {!open ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 cursor-pointer select-none transform duration-300 rounded-md active:scale-50"
          onClick={handleClick}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 cursor-pointer select-none transform duration-300  rounded-md active:scale-50"
          onClick={handleClick}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      )}
    </motion.div>
  );
}

// Mobile navigation menu
const MobileMenu = ({ links, handleClick, session, logOutUser }) => {
  function handleLogout() {
    logOutUser();
    handleClick();
  }
  return (
    <motion.div
      className="absolute font-normal bg-white dark:bg-darkPrimary w-screen h-screen top-0 left-0 z-10 sm:hidden"
      variants={hamFastFadeContainer}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <motion.nav className="mt-28 mx-8 flex flex-col">
        {session && (
          <p className="border-b border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 font-semibold flex w-auto py-4 text-base cursor-pointer">
            <motion.p variants={mobileNavItemSideways}>
              Logged in as {session.user.email}
            </motion.p>
          </p>
        )}
        {links.slice(0, 7).map((link, index) => {
          const navlink =
            link.toLowerCase() === "home" ? "/" : `/${link.toLowerCase()}`;
          return (
            <Link
              href={navlink}
              key={`mobileNav-${index}`}
              onClick={handleClick}
              className="border-b border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 font-semibold flex w-auto py-4 capitalize text-base cursor-pointer"
            >
              <motion.p variants={mobileNavItemSideways}>
                {link === "rss" ? link.toUpperCase() : link}
              </motion.p>
            </Link>
          );
        })}
        {session ? (
          <Link
            href="/login"
            onClick={handleLogout}
            className="border-b border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 font-semibold flex w-auto py-4 capitalize text-base cursor-pointer"
          >
            <motion.p variants={mobileNavItemSideways}>Logout</motion.p>
          </Link>
        ) : (
          <Link
            href="/login"
            onClick={handleClick}
            className="border-b border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 font-semibold flex w-auto py-4 capitalize text-base cursor-pointer"
          >
            <motion.p variants={mobileNavItemSideways}>Login</motion.p>
          </Link>
        )}
      </motion.nav>
    </motion.div>
  );
};

// User management menu
const UserManagementMenu = ({
  isDarkMode,
  changeDarkMode,
  session,
  logOutUser,
}) => {
  function handleLogout() {
    logOutUser();
  }
  return (
    <Menu.Items className="absolute hidden sm:flex flex-col font-normal bg-white dark:bg-darkPrimary top-14 right-6 w-56 border-2 py-2 px-5 rounded-md">
      {session ? (
        <>
          <Menu.Item>
            <p
              variants={opacityVariant}
              className="border-b border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 font-semibold flex w-auto py-4 text-base cursor-pointer"
            >
              Logged in as {session.user.email}
            </p>
          </Menu.Item>
          <Menu.Item>
            <Link
              href="/"
              onClick={handleLogout}
              className=" border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 font-semibold flex w-auto py-4 capitalize text-base cursor-pointer"
            >
              <motion.p variants={opacityVariant}>Logout</motion.p>
            </Link>
          </Menu.Item>
        </>
      ) : (
        <Menu.Item>
          <Link
            href="/login"
            className="border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 font-semibold flex w-44 py-4 capitalize text-base cursor-pointer"
          >
            <motion.p variants={opacityVariant}>Login</motion.p>
          </Link>
        </Menu.Item>
      )}
    </Menu.Items>
  );
};
