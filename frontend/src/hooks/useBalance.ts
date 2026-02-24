import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';

export function useGetBalance() {
  const { actor, isFetching } = useActor();

  return useQuery<bigint>({
    queryKey: ['balance'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getBalance();
    },
    enabled: !!actor && !isFetching,
  });
}
