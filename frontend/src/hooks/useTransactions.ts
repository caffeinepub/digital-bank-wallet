import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import { Transaction } from '../backend';

export function useGetTransactions() {
  const { actor, isFetching } = useActor();

  return useQuery<Transaction[]>({
    queryKey: ['transactions'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getTransactions();
    },
    enabled: !!actor && !isFetching,
  });
}
