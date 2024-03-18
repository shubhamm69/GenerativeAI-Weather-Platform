import { ModeToggle } from "@/components/ui/ModeToggle";
import { NavBar } from "@/components/NavBar";
import { SelectLoc } from "@/components/form/SelectLoc";

export default function Home() {
  return (
    <div>
      <NavBar />
      <div className="flex items-center justify-center h-screen">
        <SelectLoc />
      </div>
    </div>
  );
}
