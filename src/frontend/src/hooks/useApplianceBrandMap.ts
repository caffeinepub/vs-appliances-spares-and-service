import { useMemo } from 'react';
import { useGetAllAppliances, useGetAllBrands } from './useQueries';
import type { Brand } from '../backend';

export interface ApplianceBrandMap {
    [applianceName: string]: Brand[];
}

export function useApplianceBrandMap() {
    const { data: appliances = [], isLoading: isLoadingAppliances } = useGetAllAppliances();
    const { data: brands = [], isLoading: isLoadingBrands } = useGetAllBrands();

    const brandMap = useMemo(() => {
        const map: ApplianceBrandMap = {};
        
        appliances.forEach(appliance => {
            const applianceBrands = appliance.brandIds
                .map(brandId => brands.find(b => b.id === brandId))
                .filter((brand): brand is Brand => brand !== undefined);
            
            map[appliance.name] = applianceBrands;
        });

        return map;
    }, [appliances, brands]);

    const getBrandsForAppliance = (applianceName: string): Brand[] => {
        return brandMap[applianceName] || [];
    };

    return {
        brandMap,
        getBrandsForAppliance,
        isLoading: isLoadingAppliances || isLoadingBrands,
        appliances,
        brands,
    };
}
