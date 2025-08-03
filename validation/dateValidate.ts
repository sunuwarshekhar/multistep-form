import z from "zod";
import { validateFile } from "../helper/validationImage";
import { calculateAge } from "../utils/dateConversion";

export const Step1Schema = z.object({
  fullNameEnglish: z
    .string()
    .trim()
    .nonempty("Full name is required")
    .regex(/^[A-Za-z\s]+$/, "Only alphabets and spaces allowed"),
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
  citizenshipFront: z
    .any()
    .refine(
      (files) =>
        files instanceof FileList &&
        files.length === 1 &&
        validateFile(files[0]),
      { message: "Invalid front file" }
    ),
  citizenshipBack: z
    .any()
    .refine(
      (files) =>
        files instanceof FileList &&
        files.length === 1 &&
        validateFile(files[0]),
      { message: "Invalid back file" }
    ),
});
