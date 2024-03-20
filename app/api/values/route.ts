import axios from "axios";

import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { getData } from "@/lib/getData";

export async function GET(req: Request) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    
    const data = await getData();

    console.log(data);
    return NextResponse.json(data);
  } catch (error) {
    console.log("[CODE_ERROR]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
