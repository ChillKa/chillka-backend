import { Schema } from 'mongoose';

export interface OrganizerSchemaModel {
  userId: Schema.Types.ObjectId;
  profilePicture: string;
  name: string;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  websiteName: string;
  websiteURL: string;
}
