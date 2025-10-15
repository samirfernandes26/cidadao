export * from "./risco.enum";
export * from "./procedimento";

export interface IError {
  message: string;
  status?: number;
  code?: string;
}
