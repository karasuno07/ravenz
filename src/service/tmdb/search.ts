import { PaginationDiscoverVideos } from '@model/Videos';
import { DiscoverParams, DiscoverType, SearchParams, SearchType, SortParams } from 'tmdb/api';
import BaseService from './base';

export default class SearchService extends BaseService {
  static buildSearchURL(type: SearchType) {
    return `search/${type}`;
  }

  static buildDiscoverURL(type: DiscoverType) {
    return `/discover/${type}`;
  }

  static search(type: SearchType, params: SearchParams & SortParams) {
    return this.http.get<PaginationDiscoverVideos>(this.buildSearchURL(type), { params });
  }
  static discover(type: DiscoverType, params: SearchParams & DiscoverParams & SortParams) {
    return this.http.get<PaginationDiscoverVideos>(this.buildDiscoverURL(type), { params });
  }
}
