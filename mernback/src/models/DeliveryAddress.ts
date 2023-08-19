import { Schema } from 'mongoose';

export interface IDeliveryAddress {
  phoneNumber: string;
  postalCode: string;
  streetAddress: string;
}

export const DeliveryAddressSchema = new Schema<IDeliveryAddress>({
  phoneNumber: { type: String, required: true },
  postalCode: { type: String, required: true },
  streetAddress: { type: String, required: true },
});