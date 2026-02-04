import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { ItemType, type Pricing } from '@/backend';

export function useGetPricing() {
  const { actor, isFetching } = useActor();

  return useQuery<Pricing>({
    queryKey: ['pricing'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.getPricing();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCalculateRentalCost() {
  const { actor } = useActor();

  return useMutation({
    mutationFn: async ({
      itemType,
      quantity,
      durationDays,
    }: {
      itemType: ItemType;
      quantity: bigint;
      durationDays: bigint;
    }) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.calculateRentalCost(itemType, quantity, durationDays);
    },
  });
}

export function useSubmitContactForm() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ name, email, message }: { name: string; email: string; message: string }) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.submitContactForm(name, email, message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contactSubmissions'] });
    },
  });
}

export function useSubmitRentalInquiry() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      itemType,
      quantity,
      startDate,
      durationDays,
    }: {
      itemType: ItemType;
      quantity: bigint;
      startDate: bigint;
      durationDays: bigint;
    }) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.submitRentalInquiry(itemType, quantity, startDate, durationDays);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rentalInquiries'] });
    },
  });
}
