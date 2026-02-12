import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Brand {
    id: bigint;
    name: string;
}
export interface Product {
    id: bigint;
    name: string;
    brandId: bigint;
    price: number;
    applianceId: bigint;
}
export interface Appliance {
    id: bigint;
    name: string;
    brandIds: Array<bigint>;
}
export interface backendInterface {
    /**
     * / Retrieve all appliances static data
     */
    getAllAppliances(): Promise<Array<Appliance>>;
    /**
     * / Retrieve all brands static data
     */
    getAllBrands(): Promise<Array<Brand>>;
    /**
     * / Retrieve all brands for a specific appliance by brandIds
     */
    getBrandsForAppliance(applianceId: bigint): Promise<Array<Brand> | null>;
    /**
     * / Bulk fetch specific products by IDs (if not implemented client-side)
     */
    getProductsByIds(_productIds: Array<bigint>): Promise<Array<Product>>;
    /**
     * / Search for products not explicitly needed due to static data
     */
    searchProducts(_applianceIds: Array<bigint>, _brandIds: Array<bigint>, _maxPrice: number | null): Promise<[Array<Product>, bigint]>;
}
