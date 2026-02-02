import { useActivityRef } from "./useActivity";

export const useEmptyTheCreditsRef = () => {
  const userRef = useActivityRef();

  return () => {
    userRef.usuario.current && (userRef.usuario.current.value = '');
    userRef.funciones.current && (userRef.funciones.current.value = '');
    userRef.hora_inicio.current && (userRef.hora_inicio.current.value = '');
    userRef.hora_final.current && (userRef.hora_final.current.value = '');
    userRef.duracion.current && (userRef.duracion.current.value = '');
    userRef.observaciones.current && (userRef.observaciones.current.value = '');
    userRef.fecha.current && (userRef.fecha.current.value = '');
  };
};