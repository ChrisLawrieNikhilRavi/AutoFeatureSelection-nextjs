import Metadata from "@/components/MetaData";
import pageMeta from "@/content/meta";
import { useUser } from "@supabase/auth-helpers-react";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import Table from "@/components/Table";
import { motion } from "framer-motion";
import Paginate from "@/components/Paginate";
import Link from "next/link";
import AnimatedDiv from "@/components/AnimatedDiv";
import { CgSearch } from "react-icons/cg";
import { RiCloseCircleLine } from "react-icons/ri";
import {
  fromLeftVariant,
  searchBarSlideAnimation,
  popUp,
} from "@/content/FramerMotionVariants";
import AnimatedHeading from "@/components/AnimatedHeading";

export default function Home() {
  const router = useRouter();
  const { filename } = router.query;
  const user = useUser();
  const [file, setFile] = useState();
  const [data, setData] = useState();
  const [COLUMNS, setCOLUMNS] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(20);
  const searchRef = useRef(null);
  const [searchValue, setSearchValue] = useState("");
  // useEffect(() => {
  //   async function getFiles() {
  //     const { data, error } = await supabase.storage
  //       .from(process.env.NEXT_PUBLIC_SUPABASE_BUCKET)
  //       .download(`${user.id}/${filename}`);
  //     if (error) console.error(error);
  //     var fileData = new File([data], filename);
  //     fileData = await fileData.text();
  //     setFile(parse(fileData, { header: true }));
  //   }
  //   if (user) getFiles();
  //   else if (!user) router.push("/login");
  // }, [supabase, user, router, refresh, filename]);

  useEffect(() => {
    if (user) {
      console.log(
        "Going to fetch url: ",
        `${process.env.NEXT_PUBLIC_API_URL}/file?user_id=${user.id}&file_name=${filename}&page=${currentPage}&records_per_page=${recordsPerPage}`
      );
      fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/file?user_id=${user.id}&file_name=${filename}&page=${currentPage}&records_per_page=${recordsPerPage}`
      )
        .then((res) => res.json())
        .then((data) => {
          console.log("Loading page:", currentPage);
          setFile(data);
          setData(JSON.parse(data.data));
          setCOLUMNS(
            data.columns.map((col) => ({
              Header: col,
              Footer: col,
              accessor: col,
            }))
          );
        });
    } else if (!user) router.push("/login");
  }, [router, user, filename, currentPage, recordsPerPage]);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const handlePageSizeChange = (size) => {
    // const changePageTo = Math.ceil((startIndex + 1) / size);
    setCurrentPage(1);
    setRecordsPerPage(size);
  };
  console.log(data);
  return (
    <>
      <Metadata
        description={pageMeta.dashboard.description}
        previewImage={pageMeta.dashboard.image}
        keywords={pageMeta.dashboard.keywords}
      />

      <section className="pageTop flex flex-col gap-2 min-h-screen">
        <div className="flex items-center">
          <AnimatedHeading
            variants={fromLeftVariant}
            className="text-4xl  md:text-5xl font-bold text-neutral-900 dark:text-neutral-200 flex-grow"
          >
            {filename}
          </AnimatedHeading>
          <AnimatedDiv variants={popUp}>
            <Link className="underline" href="/dashboard">
              Return to Dashboard
            </Link>
          </AnimatedDiv>
        </div>
        <AnimatedDiv
          className="relative group w-0 mx-auto text-slate-400 dark:text-gray-300 bg-white dark:bg-darkSecondary rounded-md mt-10"
          variants={searchBarSlideAnimation}
        >
          <CgSearch className="ml-3 w-5 h-5 absolute top-[50%] -translate-y-1/2 z-10" />
          <input
            ref={searchRef}
            className="px-12  py-3 w-full  outline-none transition duration-200 bg-transparent font-medium font-inter lg:flex items-center text-sm leading-6 text-slate-400 rounded-md ring-1 ring-slate-900/10 shadow-sm hover:ring-slate-400  dark:highlight-white/5 dark:hover:bg-darkSecondary/90 mx-auto flex relative  group focus:ring-slate-400"
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Press (CTRL + /) to search... "
          />
          <button
            type="button"
            onClick={() => setSearchValue("")}
            className="hidden group-focus-within:inline-flex right-3 absolute top-[50%] -translate-y-1/2"
          >
            <RiCloseCircleLine className="w-5 h-5 mr-3" />
          </button>
        </AnimatedDiv>
        {data && COLUMNS ? (
          <AnimatedDiv className="overflow-scroll mt-5">
            <Table DATA={data} COLUMNS={COLUMNS} />
            <Paginate
              totalItems={file.count}
              currentPage={currentPage}
              itemsPerPage={recordsPerPage}
              handlePageChange={handlePageChange}
              handleItemsPerPageChange={handlePageSizeChange}
              itemLabels={"Records"}
            />
          </AnimatedDiv>
        ) : (
          <motion.div
            className="bg-neutral-200 dark:text-neutral-900 my-96"
            animate={{
              scale: [1, 2, 2, 1, 1],
              rotate: [0, 0, 180, 180, 0],
              borderRadius: ["0%", "0%", "50%", "50%", "0%"],
            }}
            transition={{
              duration: 2,
              ease: "easeInOut",
              times: [0, 0.2, 0.5, 0.8, 1],
              repeat: Infinity,
              repeatDelay: 1,
            }}
          />
        )}
      </section>
    </>
  );
}
const loadingContainerVariants = {
  start: {
    transition: {
      staggerChildren: 0.2,
    },
  },
  end: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};
const loadingCircleVariants = {
  start: {
    y: "0%",
  },
  end: {
    y: "100%",
  },
};
const loadingCircleTransition = {
  duration: 0.5,
  yoyo: Infinity,
  ease: "easeInOut",
};
