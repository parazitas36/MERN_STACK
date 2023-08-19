import { EntitiesEndpoints } from "./EntitiesEndpoints"

export enum ItemEndpoints {
  Base = `${EntitiesEndpoints.Items}/`,
  Category = `${EntitiesEndpoints.Items}/category/:category`,
  ById = `${EntitiesEndpoints.Items}/:id`,
}