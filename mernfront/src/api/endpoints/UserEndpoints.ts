import { EntitiesEndpoints } from "./EntitiesEndpoints";

export enum UserEndpoints {
  Register = `${EntitiesEndpoints.Users}/register`,
  Login = `${EntitiesEndpoints.Users}/login`,
}