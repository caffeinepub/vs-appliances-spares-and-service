import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { ServiceRequestInput } from '../backend';

export function useCreateServiceRequest() {
    const { actor } = useActor();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (request: ServiceRequestInput) => {
            if (!actor) {
                throw new Error('Actor not available');
            }
            return actor.createServiceRequest(request);
        },
        onSuccess: () => {
            // Invalidate service requests query if admin is viewing
            queryClient.invalidateQueries({ queryKey: ['serviceRequests'] });
        }
    });
}
