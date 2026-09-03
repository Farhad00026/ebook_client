import BannerSlider from "@/components/Banner";
import EbookVideoAd from "@/components/EbookVideoAd";
import EbookGenres from "@/components/Genrescomponent";
import HeroSection from "@/components/HeroSection";
import TopWriters from "@/components/Topwriters";

export default function Home() {
  return (
    <div>
      <BannerSlider />
      <EbookVideoAd />
      <div className="m-1">
        <HeroSection />
      </div>

      <TopWriters />
      <EbookGenres />
    </div>
  );
}
