import { ItemCategory } from '../../enums/ItemCategory';
import { ItemBase } from '../../models/bases/ItemBase';
import { DtoValidator } from '../../utils/general/DtoValidator';

export interface IItemPostDto extends ItemBase {}

export interface ItemPostDto extends IItemPostDto {}

export class ItemPostDto extends DtoValidator {
  constructor(dto: IItemPostDto) {
    super();
    Object.assign(this, dto, {});
    this.amount = dto.amount | 0;
    this.validate();
  }

  protected isValid(): boolean {
    return (
      this.name?.trim()?.length > 0 &&
      this.description?.trim()?.length > 0 &&
      this.amount >= 0 &&
      this.price > 0 &&
      Object.values(ItemCategory).includes(this.category)
    );
  }
}
