import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface ServiceRequest {
    id: bigint;
    status: string;
    city: string;
    postalCode: string;
    name: string;
    email: string;
    creationTime: bigint;
    message: string;
    preferredTime: string;
    applianceType: string;
    brand: string;
    phone: string;
    applianceAge: string;
}
export interface Appliance {
    id: bigint;
    name: string;
    brandIds: Array<bigint>;
}
export interface ServiceRequestInput {
    city: string;
    postalCode: string;
    name: string;
    email: string;
    message: string;
    preferredTime: string;
    applianceType: string;
    brand: string;
    phone: string;
    applianceAge: string;
}
export interface Brand {
    id: bigint;
    name: string;
}
export interface UserProfile {
    name: string;
    email: string;
    phone: string;
}
export interface Product {
    id: bigint;
    name: string;
    brandId: bigint;
    price: number;
    applianceId: bigint;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    /**
     * / COMPONENT: Service Request - Create Request
     */
    createServiceRequest(request: ServiceRequestInput): Promise<{
        requestId: bigint;
        confirmationMessage: string;
    }>;
    /**
     * / COMPONENT: Service Request - Admin Bulk Delete
     */
    deleteAllServiceRequests(): Promise<{
        deletedRequestIds: Array<bigint>;
        message: string;
    }>;
    /**
     * / COMPONENT: Service Request - Admin Delete
     */
    deleteServiceRequest(id: bigint): Promise<{
        message: string;
        deletedRequestId: bigint;
    }>;
    getAllAppliances(): Promise<Array<Appliance>>;
    getAllBrands(): Promise<Array<Brand>>;
    /**
     * / COMPONENT: Service Request - Admin Get All
     */
    getAllServiceRequests(): Promise<Array<ServiceRequest>>;
    getBrandsForAppliance(applianceId: bigint): Promise<Array<Brand> | null>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getProductsByIds(_productIds: Array<bigint>): Promise<Array<Product>>;
    /**
     * / COMPONENT: Service Request - Admin Get Single
     */
    getServiceRequest(id: bigint): Promise<ServiceRequest>;
    /**
     * / COMPONENT: Service Request Count - Admin
     */
    getServiceRequestCount(): Promise<bigint>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    searchProducts(_applianceIds: Array<bigint>, _brandIds: Array<bigint>, _maxPrice: number | null): Promise<[Array<Product>, bigint]>;
    /**
     * / COMPONENT: Service Request - Admin Update
     */
    updateServiceRequest(id: bigint, updates: ServiceRequestInput): Promise<ServiceRequest>;
    /**
     * / COMPONENT: Service Request - Admin Update Status
     */
    updateServiceRequestStatus(id: bigint, status: string): Promise<{
        id: bigint;
        newStatus: string;
    }>;
}
