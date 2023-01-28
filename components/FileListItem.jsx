import { popUpFromBottomForText } from "@/content/FramerMotionVariants";
import Link from "next/link";
import React from "react";
import format from "date-fns/format";
import AnimatedDiv from "./AnimatedDiv";
import { FiDelete } from "react-icons/fi";

const FileListItem = ({
  userId,
  file,
  supabaseClient,
  refresh,
  setRefresh,
}) => {
  async function handleDelete() {
    const { error } = await supabaseClient.storage
      .from("users")
      .remove([`${userId}/${file.name}`]);
    if (error) console.error(error);
    setRefresh(!refresh);
  }
  return (
    <AnimatedDiv
      className="flex flex-col p-3 rounded-lg bg-white shadow dark:bg-darkSecondary/50"
      variants={popUpFromBottomForText}
    >
      <div className="flex items-center gap-3">
        <div className="flex-grow flex-col">
          <Link
            href="/"
            className="font-semibold hover:underline text-sm sm:text-base md:text-lg text-neutral-900 dark:text-neutral-200"
          >
            {file.name}
          </Link>
          <p className="text-xs text-gray-500">
            Updated at &#x2022;{" "}
            {format(new Date(file.updated_at), "yyyy-MM-dd HH:mm:ss")}
          </p>
        </div>
        <div className="p-3" onClick={handleDelete}>
          <FiDelete className="w-6 h-6" />
        </div>
      </div>
      <p className="text-gray-500 text-sm"></p>
    </AnimatedDiv>
  );
};

export default FileListItem;
