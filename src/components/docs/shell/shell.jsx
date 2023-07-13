import { twMerge } from "tailwind-merge";
import { Terminal } from "@/components/common";

const Shell = ({ styles = {}, code }) => {
  return (
    <Terminal
      code={typeof code === "string" ? [code] : code}
      styles={{
        root: twMerge("w-full 2xl:w-3/4 border border-solid border-gray-borders rounded-secondary my-7", styles.root),
        header: twMerge("h-6 rounded-t-secondary", styles.header),
        body: twMerge("text-[18px] whitespace-pre-wrap pt-0 pb-2 rounded-b-secondary text-md font-inter", styles.body)
      }}
    />
  );
};

export default Shell;
