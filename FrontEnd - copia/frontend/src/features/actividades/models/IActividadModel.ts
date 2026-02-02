export interface IActivityModel {
  id_actividades_varias: string;
  usuario: string;
  funciones: string;
  hora_inicio: string;
  hora_final?: string | null;
  duracion?: string | null;
  observaciones?: string | null;
  fecha?: string | null;
}
