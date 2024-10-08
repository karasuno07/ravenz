import { LocaleType } from 'types/locale';

export type DiscoverType = 'movie' | 'tv';
export type SearchType = DiscoverType | 'collection' | 'person' | 'company' | 'keyword' | 'multi';

export type LanguageParams = {
  language?: LocaleType;
};

export type QueryParams = {
  page?: number;
} & LanguageParams;

export type SortParams = {
  sort_by?:
    | 'popularity.asc'
    | 'popularity.desc'
    | 'revenue.asc'
    | 'revenue.desc'
    | 'primary_release_date.asc'
    | 'primary_release_date.desc'
    | 'vote_average.asc'
    | 'vote_average.desc'
    | 'vote_count.asc'
    | 'vote_count.desc';
};

export type SearchParams = {
  query?: string;
  include_adult?: boolean;
  primary_release_year?: number;
  first_air_date_year?: number;
  region?: string;
  year?: number;
} & QueryParams;

export type DiscoverParams = {
  with_genres?: string;
  with_original_language?: string;
};

export type PaginationResponse<T = any> = {
  page: number;
  total_pages: number;
  total_results: number;
  results: T[];
};
