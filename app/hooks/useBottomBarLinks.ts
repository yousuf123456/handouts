import { HiHome } from "react-icons/hi"
import { RiShoppingCart2Fill, RiUser5Fill } from "react-icons/ri"
import { HiHeart } from "react-icons/hi2"


export const useBottomBarLinks = ()=> {
    const bottomBarLinks = [
        {
            name : "Home",
            href : "/",
            icon : HiHome
        },
        {
            name : "favourites",
            href : "/favourites",
            icon : HiHeart
        },
        {
            name : "cart",
            href : "/cart",
            icon : RiShoppingCart2Fill
        },
        {
            name : "account",
            href : "/user/account",
            icon : RiUser5Fill
        }
    ]

    return bottomBarLinks
}