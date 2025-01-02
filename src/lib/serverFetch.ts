import { IResponse } from '@/types';

export async function serverFetch<T>(
  path: string,
  init?: RequestInit
): Promise<IResponse<T>> {
  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}${path}`;
  const response = await fetch(url, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...init?.headers
    }
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data;
}
