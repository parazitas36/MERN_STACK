export interface Action<Type> {
  type: string;
  payload?: Type;
}