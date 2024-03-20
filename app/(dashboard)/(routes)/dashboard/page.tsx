import { Footer } from "@/components/Footer";
import { NavBar } from "@/components/NavBar";
import { SelectLoc } from "@/components/form/SelectLoc";
import SplineComponent from "@/components/spline/SplineComponent";

const DashboardPage = () => {
  return (
    <div className="h-[900px] md:h-auto">
      <div className="absolute w-full h-full flex flex-col justify-between">
        <div className="flex flex-col">{/* <Header /> */}</div>
        <Footer />
      </div>
      <SplineComponent />
    </div>
  );
};

export default DashboardPage;
