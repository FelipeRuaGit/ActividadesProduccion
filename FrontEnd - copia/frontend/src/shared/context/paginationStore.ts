// Zustand
import { create } from 'zustand';
// Shared
import { IPagination } from '../interfaces/context/IPagination';
import { IPaginationStore } from '../interfaces/context/IPaginationStore';


export const paginationStore = create<IPaginationStore>(set => ({
  pagination: { pageIndex: 1, pageSize: 10 },

  setPagination: async (pagination: IPagination) => {
    set({ pagination: pagination });
  },
}));
