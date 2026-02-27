import { useState, useEffect } from 'react';

// Local profile stored in localStorage since the new backend has no profile storage
export interface LocalUserProfile {
  name: string;
  email: string;
}

const PROFILE_KEY = 'bluestone_user_profile';

function loadProfile(): LocalUserProfile | null {
  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as LocalUserProfile;
  } catch {
    return null;
  }
}

function saveProfileToStorage(profile: LocalUserProfile): void {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
}

export function useGetCallerUserProfile() {
  const [data, setData] = useState<LocalUserProfile | null | undefined>(undefined);

  useEffect(() => {
    const profile = loadProfile();
    setData(profile);
  }, []);

  return {
    data,
    isLoading: data === undefined,
    isFetched: data !== undefined,
  };
}

export function useSaveCallerUserProfile() {
  const [isPending, setIsPending] = useState(false);

  const mutateAsync = async (profile: LocalUserProfile) => {
    setIsPending(true);
    try {
      saveProfileToStorage(profile);
    } finally {
      setIsPending(false);
    }
  };

  return {
    mutateAsync,
    isPending,
  };
}
