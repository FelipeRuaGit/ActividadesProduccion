// React
import { useRef } from 'react';

export const useActivityRef = () => {
  return {
    usuario : useRef<HTMLInputElement | null>(null),
    funciones: useRef<HTMLSelectElement | null>(null),
    hora_inicio: useRef<HTMLInputElement | null>(null),
    hora_final: useRef<HTMLInputElement | null>(null),
    duracion: useRef<HTMLInputElement | null>(null),
    observaciones: useRef<HTMLInputElement | null>(null),
    fecha: useRef<HTMLInputElement | null>(null),

  };
};
