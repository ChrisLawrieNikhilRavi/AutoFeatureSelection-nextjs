import { FadeContainer } from "@/content/FramerMotionVariants";
import { motion } from "framer-motion";
import Metadata from "@/components/MetaData";
import pageMeta from "@/content/meta";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  let { url } = router.query;

  return (
    <>
      <Metadata
        description={pageMeta.preprocess.description}
        previewImage={pageMeta.preprocess.image}
        keywords={pageMeta.preprocess.keywords}
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
            The table from the file to be shown here!
          </div>
        </motion.section>
      </div>
    </>
  );
}
