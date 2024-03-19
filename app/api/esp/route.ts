import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(req: Request) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const ip = process.env.NEXT_PUBLIC_IP;
    const endpoint = `http://${ip}/esp`;

    const response = await axios.get(endpoint);
    const responseData = response.data;
    console.log(responseData);
    return NextResponse.json(responseData);
  } catch (error) {
    console.log("[CODE_ERROR]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export const getData = async () => {
  try {
    const ip = process.env.NEXT_PUBLIC_IP;
    const endpoint = `http://${ip}/esp`;

    const res = await axios.get(endpoint);
    const data = res.data;

    return data;
  } catch (error) {
    console.log("[ESP_ERROR]", error);
    return null;
  }
};
