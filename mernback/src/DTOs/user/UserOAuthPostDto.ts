import { Role } from '../../enums/Role';
import { UserBase } from '../../models/bases/UserBase';
import { DtoValidator } from '../../utils/general/DtoValidator';

export interface IUserOAuthPostDto extends Omit<UserBase, 'password'> { }

export interface UserOAuthPostDto extends IUserOAuthPostDto { }

export class UserOAuthPostDto extends DtoValidator {
  constructor(dto: IUserOAuthPostDto) {
    super();
    dto.isOAuth = true;
    Object.assign(this, dto, {});
    this.validate();
  }

  protected override isValid(): boolean {
    return (
      this.name?.trim()?.length > 0 
      && this.email?.trim()?.length > 0
      && this.surname?.trim()?.length > 0 
      && !!this.OAuthId && this.OAuthId?.trim()?.length > 0 
      && !!this.OAuthProvider 
      && this.OAuthProvider?.trim()?.length > 0
      && Object.values(Role).includes(this.role)
    );
  }
}