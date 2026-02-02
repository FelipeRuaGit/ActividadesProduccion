import { ISendCredentialsDTO } from "../../interfaces/DTOs/ISendCredentialsDTO";

export interface IAuthStore {
  token: string | null;
  isLoadingAuth: boolean;
  errorMessageAuth: string | null;

  login: (credentials: ISendCredentialsDTO) => Promise<void>;
  clearError: () => void;
}
