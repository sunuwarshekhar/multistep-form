import z from "zod";
import { calculateAge } from "../utils/dateConversion";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/jpg",
  "application/pdf",
];

const singleFileSchema = z.any().refine(
  (files) => {
    return (
      files instanceof FileList &&
      files.length === 1 &&
      ACCEPTED_TYPES.includes(files[0]?.type) &&
      files[0]?.size <= MAX_FILE_SIZE
    );
  },
  {
    message: "Must be one image or PDF file under 5MB",
  }
);

export const Step1Schema = z.object({
  fullNameEnglish: z
    .string()
    .trim()
    .nonempty("Full name is required")
    .refine(
      (val) => /^[A-Za-z\s]+$/.test(val),
      "Only alphabets and spaces are allowed"
    )
    .refine(
      (val) => val.trim().split(/\s+/).length >= 2,
      "Please enter first and last name"
    ),
  fullNameNepali: z.string().trim().nonempty("Nepali name is required"),
  gender: z.enum(["male", "female", "other"], {
    errorMap: () => ({ message: "Gender is required" }),
  }),
  dateOfBirth: z.string().refine(
    (val) => {
      const date = new Date(val);
      return (
        !isNaN(date.getTime()) &&
        calculateAge(date) >= 16 &&
        calculateAge(date) <= 120
      );
    },
    { message: "Age must be between 16 and 120" }
  ),
  phoneNumber: z
    .string()
    .regex(/^9\d{9}$/, "Must be 10 digits starting with 9"),
});

export const Step2Schema = z.object({
  citizenshipNumber: z.string().min(5, "Must be at least 5 characters"),
  issuedDistrict: z.string().min(1, "Required"),
  issuedDate: z.string().refine((val) => new Date(val) <= new Date(), {
    message: "Issued date cannot be in the future",
  }),
  citizenshipFront: singleFileSchema,
  citizenshipBack: singleFileSchema,
});
