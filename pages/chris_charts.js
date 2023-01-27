import { FadeContainer } from "@/content/FramerMotionVariants";
import { motion } from "framer-motion";
import Metadata from "@/components/MetaData";
import pageMeta from "@/content/meta";
import { useRouter } from "next/router";
import { ResponsiveBar } from "@nivo/bar";

const Bar = (data) => {
  return (
    <ResponsiveBar
      data={data}
      keys={["degress"]}
      indexBy="day"
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.4}
      valueScale={{ type: "linear" }}
      colors="#3182CE"
      animate={true}
      enableLabel={false}
      axisTop={null}
      axisRight={null}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "degrees",
        legendPosition: "middle",
        legendOffset: -40,
      }}
    />
  );
};

export default function Home() {
  const data = [
    { day: "Monday", degress: 59 },
    { day: "Tuesday", degress: 61 },
    { day: "Wednesday", degress: 55 },
    { day: "Thursday", degress: 78 },
    { day: "Friday", degress: 71 },
    { day: "Saturday", degress: 56 },
    { day: "Sunday", degress: 67 },
  ];
  return (
    <>
      <Metadata
        description={pageMeta.about.description}
        previewImage={pageMeta.about.image}
        keywords={pageMeta.about.keywords}
      />

      <div className="h-screen m-4">
        <ResponsiveBar
          data={data}
          keys={["degress"]}
          indexBy="day"
          margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
          padding={0.4}
          valueScale={{ type: "linear" }}
          colors="#3182CE"
          animate={true}
          enableLabel={false}
          axisTop={null}
          axisRight={null}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "degrees",
            legendPosition: "middle",
            legendOffset: -40,
          }}
        />
      </div>
    </>
  );
}
