"use client";
import { useCallback, useMemo } from 'react';
import * as api from '@/services/api';
import { useRouter } from 'next/navigation';

export function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('accessToken');
}

export function useAuthActions() {
  const router = useRouter();
  const logout = useCallback(() => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userEmail');
    router.replace('/login');
  }, [router]);

  const userEmail = useMemo(() => (typeof window !== 'undefined' ? localStorage.getItem('userEmail') || '' : ''), []);

  const login = useCallback(async (email: string, password: string) => {
    const res = await api.auth.login({ email, password });
    localStorage.setItem('accessToken', res.accessToken);
    localStorage.setItem('userEmail', email);
    router.replace('/');
  }, [router]);

  const signup = useCallback(async (email: string, password: string, orgName: string) => {
    const res = await api.auth.signup({ email, password, orgName });
    localStorage.setItem('accessToken', res.accessToken);
    localStorage.setItem('userEmail', email);
    router.replace('/');
  }, [router]);

  return { logout, login, signup, userEmail };
}
