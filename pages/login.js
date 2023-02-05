import { FadeContainer } from "@/content/FramerMotionVariants";
import { motion } from "framer-motion";
import Metadata from "@/components/MetaData";
import pageMeta from "@/content/meta";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useDarkMode } from "@/context/darkModeContext";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
  const supabase = useSupabaseClient();
  const user = useUser();
  const { isDarkMode } = useDarkMode();
  const router = useRouter();
  useEffect(() => {
    if (user) router.push("/dashboard");
  }, [user, router]);
  return (
    <>
      <Metadata
        description={pageMeta.login.description}
        previewImage={pageMeta.login.image}
        keywords={pageMeta.login.keywords}
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
            <Auth
              // providers={["github", "google", "linkedin", "notion", "apple"]}
              supabaseClient={supabase}
              appearance={{ theme: ThemeSupa }}
              theme={isDarkMode ? "dark" : "default"}
              redirectTo="https://localhost:3000/dashboard"
            />
          </div>
        </motion.section>
      </div>
    </>
  );
}
