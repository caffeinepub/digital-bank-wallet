import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';

// Mock balance: $182,679.00 represented in cents (smallest unit)
const MOCK_BALANCE = BigInt(18267900);

export function useGetBalance() {
  const { actor, isFetching } = useActor();

  return useQuery<bigint>({
    queryKey: ['balance'],
    queryFn: async () => {
      if (!actor) return MOCK_BALANCE;
      try {
        return await actor.getBalance();
      } catch {
        return MOCK_BALANCE;
      }
    },
    enabled: !isFetching,
    retry: false,
  });
}
