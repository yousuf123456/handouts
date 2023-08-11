import { find } from "lodash";
import { OrderedProductType, PackageType, StatusType } from "../types";
import { Prisma } from "@prisma/client";

const getUpdatedPackagesWithUpdatedStatus = (updatedPackages: PackageType[], type : "Cancellation" | "Return"): PackageType[]=> {
    const updatedPackagesWithUpdatedStatus = updatedPackages.map((Package)=> {
        let cancelled = true;
        let returnInProcess = true;
        let cancellationInProcess = true;

        //@ts-ignore
        const orderedProducts = Package.orderedProducts as OrderedProductType[];
        orderedProducts.map((orderedProduct)=> {
            if(orderedProduct.status !== "Cancelled") cancelled = false
            if(orderedProduct.status !== "Return in Process") returnInProcess = false
            if(orderedProduct.status !== "Cancellation in Process") cancellationInProcess = false
        });

        const getNewPackagesStatus = ()=> {
            if(cancelled && !cancellationInProcess && !returnInProcess) return "Cancelled"
            if(returnInProcess && !cancelled && !cancellationInProcess) return "Return in Process"
            if(cancellationInProcess && !cancelled && !returnInProcess) return "Cancellation in Process"
        }

        const newPackagesStatus = getNewPackagesStatus();

        return {
            ...Package,
            status : newPackagesStatus ? newPackagesStatus : Package.status
        }
    });

    return updatedPackagesWithUpdatedStatus
}

type selectedOrderedProductsType = {
    orderedProductId : string;
    packageId : string;
    reason : string;
}[]

type ReturnType = {
    updatedOrderedProducts : OrderedProductType[];
    updatedPackagesWithUpdatedStatus : PackageType[];
}

// Returns the new updated packages when user selects any item to cancel in order
export const getUpdatedPackages = (packages : PackageType[], selectedOrderedProducts : selectedOrderedProductsType, type : "Cancellation" | "Return"): ReturnType=> {
    let updatedOrderedProducts: OrderedProductType[] = []
    //@ts-ignore
    const updatedPackages: PackageType[] = packages.map((Package)=> {
        //@ts-ignore
        const orderedProducts = Package.orderedProducts as OrderedProductType[]

        // Adding the updated ordered products to the updatedOrderedProducts array
        const thisPackageUpdatedOrderedProducts = orderedProducts.map((orderedProduct)=> {
            const selectedOrderedProduct = selectedOrderedProducts.filter((selectedOrderedProduct)=> selectedOrderedProduct.orderedProductId === orderedProduct.id && selectedOrderedProduct.packageId === Package.id)[0]

            const currentStatus = orderedProduct.status;
            const putItOnPending = currentStatus !== "Processing" && currentStatus !== "Payment Pending";

            if(selectedOrderedProduct){
                const updatedOrderedProduct = {
                    ...orderedProduct,
                    status : type === "Cancellation" ? putItOnPending ? "Cancellation in Process" : "Cancelled" : "Return in Process",
                    ...( type === "Cancellation" ? {cancellationReason : selectedOrderedProduct.reason} : {returnReason : selectedOrderedProduct.reason})
                }

                updatedOrderedProducts.push(updatedOrderedProduct);
                return updatedOrderedProduct
            }

            return orderedProduct
        });

        return {
            ...Package,
            orderedProducts : thisPackageUpdatedOrderedProducts
        }
    });

    const updatedPackagesWithUpdatedStatus = getUpdatedPackagesWithUpdatedStatus(updatedPackages, type);

    return {
        updatedPackagesWithUpdatedStatus,
        updatedOrderedProducts
    }
}