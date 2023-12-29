import { FavouritesItems } from "./../../favourites/components/FavouritesItems";
import { getCurrentUser } from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "../../libs/prismadb";

type User = {
  id: string;
  name: string | null;
  image: string | null;
  email: string | null;
  phone: string | null;
  birthDay: Date | null;
  gender: string | null;
  favouriteItemIds: string[];
};

export async function POST(req: Request) {
  try {
    const currentUser = (await getCurrentUser()) as unknown as User;

    if (!currentUser || !currentUser.id) {
      return new NextResponse("Unauthorized User", { status: 401 });
    }

    const { productId } = await req.json();

    const alreadyExists =
      currentUser.favouriteItemIds.filter((id) => id === productId).length > 0;
    if (alreadyExists) {
      return NextResponse.json(alreadyExists);
    }

    const addedFavouriteProduct = await prisma.product.update({
      where: {
        id: productId,
      },

      data: {
        favouritedBy: {
          connect: {
            id: currentUser.id,
          },
        },
      },

      select: {
        id: true,
        price: true,
        image: true,
        name: true,
        promoPrice: true,
        promoPriceEndingDate: true,
        promoPriceStartingDate: true,
      },
    });

    return NextResponse.json(addedFavouriteProduct, { status: 200 });
  } catch (e) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
