import { IPagination } from './IPagination';

export interface IPaginationStore {
  pagination: IPagination;
  setPagination: (pagination: IPagination) => void;
}
