export interface PersonalInfo {
    fullNameEnglish: string;
    fullNameNepali: string;
    gender: 'Male' | 'Female' | 'Other';
    dateOfBirth: Date; // This will be the selected date in AD format
    phoneNumber: string;
}

export interface DocumentInfo {
    citizenshipNumber: string;
    issuedDistrict: string;
    issuedDate: Date; // This will be the selected date in AD format
    citizenshipFront: File | null; // File object for the uploaded front image
    citizenshipBack: File | null; // File object for the uploaded back image
}

export interface FormData {
    personalInfo: PersonalInfo;
    documentInfo: DocumentInfo;
}