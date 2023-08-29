import { getSession } from "./getSession";
import prisma from "../libs/prismadb";
import { AddressType } from "../types";
import { ObjectId } from "mongodb";

export type getCurrentUserParameters = {
  updateCartItemCount?: boolean;
  getAddressDiary?: boolean;
  getBehaviourDoc?: boolean;
  removeAddress?: boolean;
  editAddress?: boolean;
  addAddress?: boolean;
  flushCart?: boolean;
  byValue?: number;
  getCart?: boolean;
  address?: any;
  query?: any;
};

export const getCurrentUser = async (
  parameters: getCurrentUserParameters = {},
) => {
  const {
    updateCartItemCount,
    getBehaviourDoc,
    getAddressDiary,
    removeAddress,
    editAddress,
    addAddress,
    flushCart,
    address,
    getCart,
    byValue,
    query,
  } = parameters;

  const session = await getSession();

  if (!session?.user?.id || !session.user?.email) {
    return null;
  }

  if (getBehaviourDoc) {
    const currentUser = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },

      select: {
        id: true,
        behaviour: true,
      },
    });

    return currentUser;
  }

  if (flushCart) {
    await prisma.cartItem.deleteMany({
      where: {
        userId: session.user.id,
      },
    });

    const user = await prisma.user.update({
      where: {
        id: session.user.id,
      },

      data: {
        cartItemsCount: 0,
      },

      select: {
        id: true,
      },
    });

    return user;
  }

  if (addAddress || removeAddress) {
    const userAddresses = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },

      select: {
        addressDiary: true,
      },
    });

    const oldAddressesArray = userAddresses?.addressDiary as AddressType[];
    let updatedAddressesArray: AddressType[] = [];

    if (removeAddress) {
      updatedAddressesArray = oldAddressesArray.filter(
        (oldAddress) => oldAddress.address !== address.address,
      );
    }

    if (addAddress) {
      const changeDefaultBillingAddress = address.isDefaultBillingAddress;
      const changeDefaultShippingAddress = address.isDefaultShippingAddress;
      updatedAddressesArray = oldAddressesArray?.map((oldAddress) => {
        const newIsDefaultBillingAddress = changeDefaultBillingAddress
          ? false
          : oldAddress.isDefaultBillingAddress;
        const newIsDefaultShippingAddress = changeDefaultShippingAddress
          ? false
          : oldAddress.isDefaultShippingAddress;

        if (editAddress) {
          if (oldAddress.address === address.address) return address;
        }

        return {
          ...oldAddress,
          isDefaultBillingAddress: newIsDefaultBillingAddress,
          isDefaultShippingAddress: newIsDefaultShippingAddress,
        };
      });
      !editAddress &&
        (updatedAddressesArray.length > 0
          ? updatedAddressesArray.push({ ...address, _id: new ObjectId() })
          : updatedAddressesArray.push({
              ...address,
              _id: new ObjectId(),
              isDefaultBillingAddress: true,
              isDefaultShippingAddress: true,
            }));
    }

    const user = await prisma.user.update({
      where: {
        id: session.user.id,
      },

      data: {
        addressDiary: updatedAddressesArray,
      },

      select: {
        addressDiary: true,
        id: true,
        name: true,
        image: true,
        email: true,
        phone: true,
        birthDay: true,
        gender: true,
      },
    });

    return user;
  }

  if (updateCartItemCount) {
    let user;
    if (session.user.cartItemsCount) {
      user = await prisma?.user.update({
        where: {
          id: session.user.id,
        },

        data: {
          cartItemsCount: query,
        },
      });
    } else {
      user = await prisma?.user.update({
        where: {
          id: session.user.id,
        },

        data: {
          cartItemsCount: byValue,
        },
      });
    }

    if (!user) return null;

    return user;
  }

  const user = await prisma?.user.findUnique({
    where: {
      id: session.user.id,
    },

    select: {
      cartItems: getCart
        ? {
            include: {
              product: {
                select: {
                  id: true,
                  name: true,
                  image: true,
                  price: true,
                  storeName: true,
                  storeId: true,
                  discount: true,
                },
              },
            },
          }
        : false,

      addressDiary: getAddressDiary ? true : false,
      favouriteItemIds: true,
      id: true,
      name: true,
      image: true,
      email: true,
      phone: true,
      birthDay: true,
      gender: true,
    },
  });

  if (!user) return null;

  return user;
};
