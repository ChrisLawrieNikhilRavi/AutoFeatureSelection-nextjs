import { motion } from "framer-motion";
import Metadata from "@/components/MetaData";
import pageMeta from "@/content/meta";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useEffect, useRef, useState } from "react";
import Ripples from "react-ripples";
import { FiUpload } from "react-icons/fi";
import FileListItem from "@/components/FileListItem";

export default function Home() {
  const supabase = useSupabaseClient();
  const user = useUser();
  const inputRef = useRef(null);
  const [userFiles, setUserFiles] = useState();
  const [refresh, setRefresh] = useState(true);

  useEffect(() => {
    async function getFiles() {
      const { data, error } = await supabase.storage
        .from("users")
        .list(`${user.id}`, {
          limit: 100,
          offset: 0,
          sortBy: { column: "updated_at", order: "desc" },
        });
      if (error) console.error(error);
      setUserFiles(data);
    }
    if (user) getFiles();
  }, [supabase, user, refresh]);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    const { data, error } = await supabase.storage
      .from("users")
      .upload(`${user.id}/${file.name}`, file, {
        cacheControl: "3600",
        upsert: true,
      });
    if (data) console.log(data);
    else if (error) console.error(error);
    setRefresh(!refresh);
  };
  const handleClick = () => {
    inputRef.current.click();
  };
  return (
    <>
      <Metadata
        description={pageMeta.dashboard.description}
        previewImage={pageMeta.dashboard.image}
        keywords={pageMeta.dashboard.keywords}
      />

      <section className="pageTop">
        {/* Following is the new Code */}
        <div className="flex flex-col gap-3 font-inter min-h-screen">
          <motion.div className="rounded-md overflow-hidden">
            <Ripples color="rgba(0, 0, 0, 0.5)">
              <input
                type="file"
                ref={inputRef}
                accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                onChange={(e) => {
                  handleFileChange(e);
                }}
                className="hidden"
              />
              <button
                className="flex items-center gap-2 px-5 py-2 border rounded-md border-gray-500 dark:border-gray-400 select-none  hover:bg-gray-100 dark:hover:bg-neutral-800 outline-none my-5"
                onClick={handleClick}
              >
                <FiUpload />
                <p>Upload</p>
              </button>
            </Ripples>
          </motion.div>
          <div className="flex flex-col gap-3 font-inter">
            {userFiles &&
              userFiles.map((file) => {
                if (file.name === ".emptyFolderPlaceholder") return;
                return (
                  <FileListItem
                    key={file.id}
                    file={file}
                    supabaseClient={supabase}
                    userId={user.id}
                    refresh={refresh}
                    setRefresh={setRefresh}
                  />
                );
              })}
          </div>
        </div>
      </section>
    </>
  );
}
