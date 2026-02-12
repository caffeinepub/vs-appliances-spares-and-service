import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Appliance, Brand } from '../backend';

// Fetch all appliances
export function useGetAllAppliances() {
    const { actor, isFetching } = useActor();

    return useQuery<Appliance[]>({
        queryKey: ['appliances'],
        queryFn: async () => {
            if (!actor) return [];
            return actor.getAllAppliances();
        },
        enabled: !!actor && !isFetching,
    });
}

// Fetch all brands
export function useGetAllBrands() {
    const { actor, isFetching } = useActor();

    return useQuery<Brand[]>({
        queryKey: ['brands'],
        queryFn: async () => {
            if (!actor) return [];
            return actor.getAllBrands();
        },
        enabled: !!actor && !isFetching,
    });
}

// Fetch brands for a specific appliance
export function useGetBrandsForAppliance(applianceId: bigint | null) {
    const { actor, isFetching } = useActor();

    return useQuery<Brand[] | null>({
        queryKey: ['brands', 'appliance', applianceId?.toString()],
        queryFn: async () => {
            if (!actor || !applianceId) return null;
            return actor.getBrandsForAppliance(applianceId);
        },
        enabled: !!actor && !isFetching && applianceId !== null,
    });
}
