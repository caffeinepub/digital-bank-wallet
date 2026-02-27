import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { Principal } from '@dfinity/principal';

// Deposit
export function useDeposit() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ amount }: { amount: bigint }) => {
      if (!actor) throw new Error('Actor not available');
      await actor.deposit(amount);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['balance'] });
    },
  });
}

// Withdraw
export function useWithdraw() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ amount }: { amount: bigint }) => {
      if (!actor) throw new Error('Actor not available');
      await actor.withdraw(amount);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['balance'] });
    },
  });
}

// Transfer to another user by Principal ID
export function useExternalTransfer() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ to, amount }: { to: Principal; amount: bigint }) => {
      if (!actor) throw new Error('Actor not available');
      await actor.transfer(to, amount);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['balance'] });
    },
  });
}
