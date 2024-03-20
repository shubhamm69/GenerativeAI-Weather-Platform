import { NavBar } from "@/components/NavBar";


const Dashboardlayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <main>
                <NavBar />
                {children}
            </main>
        </div>
    )
}

export default Dashboardlayout;