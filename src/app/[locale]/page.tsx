import HomeLayout from '@features/home/layout';
import { SearchParams } from 'api';

type Props = {
  searchParams: SearchParams;
};

export default async function Index({ searchParams }: Props) {
  return <HomeLayout fullSize searchParams={searchParams} />;
}
