import { NextResponse } from "next/server";
import {
  getCurrentUser,
  getCurrentUserParameters,
} from "@/app/actions/getCurrentUser";

export async function POST(req: Request) {
  try {
    const { address, editAddress } = await req.json();

    const parameters: getCurrentUserParameters = {
      addAddress: true,
      address: address,
      editAddress: editAddress,
    };

    const newAddress = await getCurrentUser(parameters);

    return NextResponse.json(newAddress);
  } catch (e) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
