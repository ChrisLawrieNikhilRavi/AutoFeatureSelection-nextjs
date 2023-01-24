import Image from "next/image";
import {
  FadeContainer,
  headingFromLeft,
  opacityVariant,
  popUp,
} from "@/content/FramerMotionVariants";
import { homeProfileImage } from "@/utils/utils"; // not created yet
import { motion } from "framer-motion";
import { FiUpload } from "react-icons/fi";
import Ripples from "react-ripples";
import Metadata from "@/components/MetaData";
import pageMeta from "@/content/meta";

export default function Home() {
  return (
    <>
      <Metadata
        description={pageMeta.home.description}
        previewImage={pageMeta.home.image}
        keywords={pageMeta.home.keywords}
      />

      {/* Following is the new Code */}
      <div className="relative dark:bg-darkPrimary dark:text-gray-100 max-w-4xl 2xl:max-w-5xl 3xl:max-w-7xl mx-auto">
        <motion.section
          initial="hidden"
          whileInView="visible"
          variants={FadeContainer}
          viewport={{ once: true }}
          className="grid place-content-center py-20  min-h-screen"
        >
          <div className="w-full relative mx-auto flex flex-col items-center gap-10">
            <motion.div
              variants={popUp}
              className="relative flex w-96 h-24 justify-center items-center rounded-xl p-3 before:absolute before:inset-0 before:rounded-xl  "
            >
              <Image
                src={homeProfileImage}
                className="rounded-xl shadow filter saturate-0 sm:scale-150"
                width={1400}
                height={1400}
                alt="cover Profile Image"
                quality={100}
                priority={true}
              />
            </motion.div>

            <div className="w-full flex flex-col p-5 gap-3 select-none text-center ">
              <div className="flex flex-col gap-1">
                <motion.h1
                  variants={opacityVariant}
                  className="text-5xl lg:text-6xl font-bold font-mono"
                >
                  Feature Selection
                </motion.h1>
                <motion.p
                  variants={opacityVariant}
                  className="font-medium text-xs md:text-sm lg:text-lg text-gray-500"
                >
                  Figure out what factors matter the most for your application.
                </motion.p>
              </div>

              <motion.p
                variants={opacityVariant}
                className=" text-slate-500 dark:text-gray-300 font-medium text-sm md:text-base text-center"
              >
                Start by uploading a sample of your dataset and we will do the
                rest!
              </motion.p>
            </div>

            <motion.div className="rounded-md overflow-hidden" variants={popUp}>
              <Ripples className="w-full" color="rgba(0, 0, 0, 0.5)">
                <button
                  className="flex items-center gap-2 px-5 py-2 border rounded-md border-gray-500 dark:border-gray-400 select-none  hover:bg-gray-100 dark:hover:bg-neutral-800 outline-none"
                  onClick={() => window.open("/resume")}
                >
                  <FiUpload />
                  <p>Upload</p>
                </button>
              </Ripples>
            </motion.div>
          </div>
        </motion.section>
      </div>
    </>
  );
}
