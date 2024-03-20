import { NavBar } from "@/components/NavBar";
import { SelectLoc } from "@/components/form/SelectLoc";

const DashboardPage = () => {
    return (
        <div>
            <div className="flex items-center justify-center h-screen">
                <SelectLoc />
            </div>
        </div>
    );
}

export default DashboardPage;