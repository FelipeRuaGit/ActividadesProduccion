import { create } from 'zustand';
import { paginationStore } from '../../../shared/context/paginationStore';
import { IGetActivityDTO } from '../DTOs/IGetActivitiesDTO';
import { IActivityModel } from '../models/IActividadModel';
import { ISendActivityDTO } from '../DTOs/ISendActivityDTO';
import { sendDataService } from '../../../shared/service/sendDataService';
import { getDataService } from '../../../shared/service/getDataService';
import { IActivitiesStore } from '../interfaces/context/IActividadStore';

const BASEURL = 'http://127.0.0.1:8000/api/v1/actividades';



export const activitiesStore = create<IActivitiesStore>(set => ({
  activitiesList: [],
  activity: null,
  isLoadingActivities: false,
  errorMessageActivities: null,

  getActivities: async (search?: string, order_by?: string) => {
    const pagination = paginationStore.getState().pagination;

    const paginationFilter = `page_index=${
      pagination.pageIndex === 0 ? 1 : pagination.pageIndex
    }&page_size=${pagination.pageSize === 0 ? 10 : pagination.pageSize}`;

    set({ isLoadingActivities: true });

    try {
      console.log('FETCH ACTIVITIES CALLED');
      console.log('SEARCH PARAM:', search);
      console.log('ORDER BY PARAM:', order_by);
      console.log('PAGINATION FILTER:', paginationFilter);
      console.log('FETCHING ACTIVITIES WITH:', { search, order_by, paginationFilter });
      const data = await getDataService<IGetActivityDTO[]>(
        `${BASEURL}/GetAllActividades?${paginationFilter}${search ? '&search=' + search : ''}${order_by ? '&order_by=' + order_by : ''}`
      );

      console.log('DATA FETCHED:', data);
      set({ activitiesList: data });
    } catch (error: any) {
      set({ errorMessageActivities: error.message });
    } finally {
      set({ isLoadingActivities: false });
    }
  },

  getActivityById: async (activityId: string) => {
    set({ isLoadingActivities: true });

    try {
      const data = await getDataService<IActivityModel>(
        `${BASEURL}/GetActividadById/${activityId}`
      );
      set({ activity: data });
    } catch (error: any) {
      set({ errorMessageActivities: error.message });
    } finally {
      set({ isLoadingActivities: false });
    }
  },

  addActivity: async (activity: ISendActivityDTO) => {
    try {
      await sendDataService<IActivityModel>(
        `${BASEURL}/AddActividad`,
        activity
      );
      set({ errorMessageActivities: null });
    } catch (error: any) {
      set({ errorMessageActivities: error.message });
    }
  },

  clearActivity: () => set({ activity: null }),
  clearError: () => set({ errorMessageActivities: null }),
  clearList: () => set({ activitiesList: [] }),
}));
