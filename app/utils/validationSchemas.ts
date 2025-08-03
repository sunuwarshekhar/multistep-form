import { z } from 'zod';

export const personalInfoSchema = z.object({
  fullNameEnglish: z.string().min(1, 'Full Name (English) is required').regex(/^[a-zA-Z\s]+$/, 'Only alphabetic characters are allowed'),
  fullNameNepali: z.string().min(1, 'Full Name (Nepali) is required'),
  gender: z.enum(['Male', 'Female', 'Other'], { errorMap: () => ({ message: 'Gender is required' }) }),
  dateOfBirth: z.date().refine(date => !isNaN(date.getTime()), {
    message: 'Date of Birth is required',
  }),
  phoneNumber: z.string()
    .length(10, 'Phone Number must be 10 digits')
    .regex(/^9\d{9}$/, 'Phone Number must start with 9'),
});

export const documentInfoSchema = z.object({
  citizenshipNumber: z.string().min(1, 'Citizenship Number is required'),
  issuedDistrict: z.string().min(1, 'Issued District is required'),
  issuedDate: z.date().refine(date => !isNaN(date.getTime()), {
    message: 'Issued Date is required',
  }),
  citizenshipFront: z.instanceof(File).refine(file => file.size < 5 * 1024 * 1024 && ['image/jpeg', 'image/png', 'application/pdf'].includes(file.type), {
    message: 'Upload Citizenship Front File (Image/PDF, max 5MB)',
  }),
  citizenshipBack: z.instanceof(File).refine(file => file.size < 5 * 1024 * 1024 && ['image/jpeg', 'image/png', 'application/pdf'].includes(file.type), {
    message: 'Upload Citizenship Back File (Image/PDF, max 5MB)',
  }),
});