import { z } from 'zod';

export const activitySchema = z.object({
  name: z.string({ required_error: 'Name is required' }),
  organizer: z.object({
    profilePicture: z.string().optional(),
    name: z.string({ required_error: 'Organizer name is required' }),
    contactName: z.string({
      required_error: 'Organizer contactName is required',
    }),
    contactPhone: z.string({
      required_error: 'Organizer contactPhone is required',
    }),
    contactEmail: z.string({
      required_error: 'Organizer contactEmail is required',
    }),
    websiteName: z.string().optional(),
    websiteURL: z.string().optional(),
  }),
  cover: z.array(
    z.string({ required_error: 'Cover is required at least one' })
  ),
  thumbnail: z.string({ required_error: 'Thumbnail is required' }),
  startDateTime: z.string().optional(),
  fromToday: z.boolean({
    required_error: 'FromToday is required',
  }),
  endDateTime: z.string().optional(),
  noEndDate: z.boolean({
    required_error: 'NoEndDate is required',
  }),
  category: z.string({ required_error: 'Category is required' }),
  type: z.string({ required_error: 'Type is required' }),
  link: z.string().optional(),
  location: z.string().optional(),
  address: z.string().optional(),
  summary: z.string({ required_error: 'Summary is required' }),
  details: z.string({ required_error: 'Details is required' }),
  isPrivate: z.boolean({ required_error: 'IsPrivate is required' }),
  displayRemainingTickets: z.boolean({
    required_error: 'DisplayRemainingTickets is required',
  }),
  isRecurring: z.boolean({ required_error: 'IsRecurring is required' }),
  recurring: z
    .object({
      period: z.string(),
      week: z.string(),
      day: z.string(),
    })
    .optional(),
  status: z.string({ required_error: 'Status is required' }).optional(),
  tickets: z.array(
    z.object({
      _id: z.string().optional(), // optional for edit activity
      name: z.string({ required_error: 'Name is required' }),
      price: z.number({ required_error: 'Price is required' }),
      startDateTime: z.string().optional(),
      fromToday: z.boolean({ required_error: 'FromToday is required' }),
      endDateTime: z.string().optional(),
      noEndDate: z.boolean({ required_error: 'NoEndDate is required' }),
      participantCapacity: z.number({
        required_error: 'ParticipantCapacity is required',
      }),
      unlimitedQuantity: z.boolean({
        required_error: 'UnlimitedQuantity is required',
      }),
      purchaseLimit: z.number().optional(),
      description: z.string().optional(),
      purchaseDuplicate: z.boolean().optional(),
      ticketStatus: z.string().optional(),
      serialNumber: z.string().optional(),
    })
  ),
});

export const questionSchema = z.object({
  type: z.string().optional(),
  content: z.string().optional(),
  questionId: z.string().optional(),
});
