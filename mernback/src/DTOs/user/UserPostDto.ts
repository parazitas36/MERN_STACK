import { Role } from '../../enums/Role';
import { UserBase } from '../../models/bases/UserBase';
import { DtoValidator } from '../../utils/general/DtoValidator';

export interface IUserPostDto extends UserBase {
  repeatPassword: string;
}

export interface UserPostDto extends IUserPostDto { }

export class UserPostDto extends DtoValidator {
  constructor(dto: IUserPostDto) {
    super();
    Object.assign(this, dto, {});
    this.validate();
  }

  protected override isValid(): boolean {
    return (
      this.name?.trim()?.length > 0
      && this.email?.trim()?.length > 0
      && (this.password ?? '').trim()?.length > 0
      && this.repeatPassword === this.password
      && this.surname?.trim()?.length > 0
      && Object.values(Role).includes(this.role)
    );
  }
}