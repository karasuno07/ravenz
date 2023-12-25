import useDebounce from '@hooks/useDebounce';
import { useRouter } from '@lib/navigation';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function useDebouncedSearch(
  queryKey: string,
  queryValue: string | undefined,
  delay: number = 300
) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const debouncedQueryValue = useDebounce(queryValue, delay);

  useEffect(() => {
    const newSearchParams = new URLSearchParams(searchParams);
    if (debouncedQueryValue) {
      newSearchParams.set(queryKey, debouncedQueryValue);
    } else {
      newSearchParams.delete(queryKey);
    }
    newSearchParams.delete('page');
    router.push('?' + newSearchParams);
  }, [debouncedQueryValue]);
}
