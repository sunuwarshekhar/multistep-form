export function validateFile(file: File): boolean {
  const validTypes = ["image/jpeg", "image/png", "application/pdf"];
  return (
    file instanceof File &&
    validTypes.includes(file.type) &&
    file.size < 5 * 1024 * 1024
  );
}
