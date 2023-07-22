import { ItemCategory } from '../../enums/ItemCategory';
import { IItemDetails } from '../../models/ItemDetails';
import { DtoValidator } from '../../utils/general/DtoValidator';

export interface IItemPostDto {
  amount: number;
  category: ItemCategory;
  description: string;
  details?: [IItemDetails];
  name: string;
}

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
      this.name?.trim()?.length > 0 && this.description?.trim()?.length > 0 && this.amount >= 0,
      Object.values(ItemCategory).includes(this.category)
    );
  }
}