import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';

const DEFAULT_BALANCE = BigInt(211239); // $2,112.39 default for new users

export function useBalance() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<bigint>({
    queryKey: ['balance'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getBalance();
    },
    enabled: !!actor && !actorFetching,
    staleTime: 10_000,
  });

  return {
    checkingBalance: query.data ?? DEFAULT_BALANCE,
    savingsBalance: BigInt(0),
    isLoading: actorFetching || query.isLoading,
    refetch: query.refetch,
  };
}
