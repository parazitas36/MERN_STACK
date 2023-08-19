import { EntitiesEndpoints } from "./EntitiesEndpoints"

export enum CartEndpoints {
  Base = `${EntitiesEndpoints.Carts}/`,
  ById = `${EntitiesEndpoints.Carts}/:id`,
}