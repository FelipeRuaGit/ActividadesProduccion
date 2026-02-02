import { IGetActivityDTO } from "../../DTOs/IGetActivitiesDTO";
import { ISendActivityDTO } from "../../DTOs/ISendActivityDTO";
import { IActivityModel } from "../../models/IActividadModel";

export interface IActivitiesStore {
  activitiesList: IGetActivityDTO[];
  activity: IActivityModel | null;
  isLoadingActivities: boolean;
  errorMessageActivities: string | null | boolean;


  getActivities: (search?: string, order_by?: string) => Promise<void>;
  getActivityById: (activityId: string) => Promise<void>;
  addActivity: (activity: ISendActivityDTO) => Promise<void>;
  clearActivity: () => void;
  clearError: () => void;
  clearList: () => void;
}
