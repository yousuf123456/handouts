import { PaymentMethods } from "../types";

export const paymentOptions: { label: PaymentMethods; image: string }[] = [
  {
    label: "EasyPaisa",
    image: "/logos/EasyPaisaLogo.png",
  },
  {
    label: "Jazzcash",
    image: "/logos/JazzcashLogo.png",
  },
  {
    label: "Credit/Debit Card",
    image: "/logos/CreditCardLogo.png",
  },
  {
    label: "Cash on Delievery",
    image: "/logos/CashOnDelieveryLogo.png",
  },
];
