import Header from "@/components/header";
import Divider from "@/components/divider";
import Terminal from "@/components/swap/Terminal";
import Carousel from "@/components/carousel";
import RoadMap from "@/components/RoadMap";


export default function Home() {
  return (
    <>
      <Header />
      <Divider />
        <br />
        <Terminal />
        <br />
        <Divider />
        <RoadMap />
    </>
  )
}
