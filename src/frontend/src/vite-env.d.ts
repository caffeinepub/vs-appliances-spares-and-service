/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_II_URL?: string;
    readonly VITE_II_DERIVATION_ORIGIN?: string;
    readonly VITE_BACKEND_CANISTER_ID?: string;
    readonly VITE_GOOGLE_SITE_VERIFICATION?: string;
    readonly VITE_SITE_URL?: string;
    readonly DEV: boolean;
    readonly PROD: boolean;
    readonly MODE: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
