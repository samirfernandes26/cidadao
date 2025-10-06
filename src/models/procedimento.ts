import type { RiscoLevel } from "./risco.enum";

export interface Procedimento {
  id: string;
  titulo: string;
  risco: RiscoLevel;
  statusLinha1: string; // "Em fila", "Agendado", etc.
  posicao?: number | null;
  hospital: string;
  profissional?: string;
}
