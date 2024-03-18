import { ModeToggle } from "@/components/ui/ModeToggle";
import { NavBar } from "@/components/NavBar";
import { SelectLoc } from "@/components/form/SelectLoc";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {/* <NavBar />
      <div className="flex items-center justify-center h-screen">
        <SelectLoc />
      </div> */}

      <div className="text-center">
        Landing Page (Unprotected)
      </div>
      <div className="mt-4 space-x-4">
        <Link href="/sign-in">
          <Button>Login</Button>
        </Link>
        <Link href="/sign-up">
          <Button>Register</Button>
        </Link>
      </div>

    </div>
  );
}
