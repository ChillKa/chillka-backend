export interface OrganizerSchemaModel {
  profilePicture: string;
  name: string;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  websiteName: string;
  websiteURL: string;
}

export type OrganizerBase = Omit<OrganizerSchemaModel, 'userId'>;
