import { enumActivityState } from "../../../shared/enums/enumActivityState";

export interface IGetActivityDTO {
  id_actividades_varias: string;
  usuario: string;
  funciones: string;
  hora_inicio: string;
  hora_final: string;
  duracion: string;
  observaciones: string;
  fecha: string;
  estado: enumActivityState;
}
