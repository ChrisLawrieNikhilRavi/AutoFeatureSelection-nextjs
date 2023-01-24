import Link from "next/link";
import Image from "next/image";
import socialMedia from "@/content/socialMedia";
import {
  FadeContainer,
  opacityVariant,
  popUp,
} from "@/content/FramerMotionVariants";
import { navigationRoutes } from "@/utils/utils";
import { motion } from "framer-motion";
import { HiOutlineQrcode } from "react-icons/hi";
import { BsDot } from "react-icons/bs";
import NextLogo from "./SVG/NextLogo";
import VercelLogo from "./SVG/VercelLogo";
import fetcher from "@/lib/fetcher";
import useSWR from "swr";

export default function Footer({ setShowQR, showQR }) {
  // const { data: visitors } = useSWR("/api/ga", fetcher); TODO: Add this back

  return (
    <footer className=" text-gray-600 dark:text-gray-400/50 w-screen font-inter mb-14 print:hidden">
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={FadeContainer}
        viewport={{ once: true }}
        className="max-w-4xl 2xl:max-w-5xl 3xl:max-w-7xl p-5 border-t-2 border-gray-200  dark:border-gray-400/10 mx-auto text-sm sm:text-base flex flex-col gap-5"
      >
        <section className="grid grid-cols-3 gap-10">
          <div className="flex flex-col gap-4 capitalize">
            {navigationRoutes.slice(0, 5).map((text, index) => {
              return <FooterLink key={index} route={text} text={text} />;
            })}
          </div>
          <div className="flex flex-col gap-4 capitalize">
            {navigationRoutes
              .slice(5, navigationRoutes.length)
              .map((route, index) => {
                let text = route;
                if (route === "rss") text = "RSS";
                return <FooterLink key={index} route={route} text={text} />;
              })}
          </div>
          <div className="flex flex-col gap-4 capitalize">
            {socialMedia.slice(0, 5).map((platform, index) => {
              return (
                <Link
                  key={index}
                  href={platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <motion.p
                    className="hover:text-black dark:hover:text-white w-fit"
                    variants={popUp}
                  >
                    {platform.title}
                  </motion.p>
                </Link>
              );
            })}
          </div>
        </section>
        <motion.div
          variants={opacityVariant}
          className="w-full flex justify-between items-center gap-4 mt-5"
        >
          <div className="flex items-center relative bg-white dark:bg-darkSecondary rounded-full px-4 py-1 text-xs sm:text-sm">
            <BsDot className="w-7 h-7 -ml-2 text-green-500 animate-ping" />
            <p>
              {/* {visitors?.totalVisitors} visitors in last {visitors?.days} days */}
              {/* TODO: Add this back for GA Tag visitors  */}
            </p>
          </div>
          <div
            onClick={() => setShowQR(!showQR)}
            className="bg-gray-700 text-white p-3 rounded-full cursor-pointer transition-all active:scale-90 hover:scale-105"
          >
            <HiOutlineQrcode className="w-5 h-5 " />
          </div>
        </motion.div>

        <motion.div
          variants={opacityVariant}
          className="flex items-center gap-2 justify-center text-black dark:text-white mt-5"
        >
          <span>Powered by</span>

          <Link
            target="_blank"
            aria-label="Next.js"
            rel="noreferrer"
            href="https://nextjs.org"
          >
            <NextLogo />
          </Link>
          <span>and</span>
          <Link
            target="_blank"
            aria-label="Vercel"
            rel="noreferrer"
            href="https://vercel.com"
          >
            <VercelLogo />
          </Link>
        </motion.div>
      </motion.div>
    </footer>
  );
}

function FooterLink({ route, text }) {
  return (
    <Link href={`/${route}`}>
      <motion.p
        className="hover:text-black dark:hover:text-white w-fit"
        variants={popUp}
      >
        {text}
      </motion.p>
    </Link>
  );
}
