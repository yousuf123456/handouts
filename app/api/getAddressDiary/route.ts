import { NextResponse } from "next/server";
import {
  getCurrentUser,
  getCurrentUserParameters,
} from "@/app/actions/getCurrentUser";
import { AddressType } from "@/app/types";

export async function POST(req: Request) {
  try {
    const parameters: getCurrentUserParameters = {
      getAddressDiary: true,
    };
    const currentUser = await getCurrentUser(parameters);

    if (!currentUser || !currentUser.id) {
      return new NextResponse("Unauthorized User", { status: 401 });
    }

    return NextResponse.json(currentUser);
  } catch (e) {
    console.log(e);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
