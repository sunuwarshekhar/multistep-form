import { Alert, AlertDescription } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { useFormContext } from "react-hook-form";
import { districts } from "../../../constants/location";

export const StepTwoForm = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <div>
        <Label>Citizenship Number</Label>
        <Input {...register("citizenshipNumber")} type="number" />
        {errors.citizenshipNumber && (
          <Alert>
            <AlertDescription>
              {errors.citizenshipNumber.message}
            </AlertDescription>
          </Alert>
        )}
      </div>

      <div>
        <Label>Issued District</Label>
        <select
          {...register("issuedDistrict")}
          className="w-full border rounded p-2"
        >
          <option value="">Select district</option>
          {districts.map((district) => (
            <option key={district} value={district}>
              {district}
            </option>
          ))}
        </select>
        {errors.issuedDistrict && (
          <Alert>
            <AlertDescription>{errors.issuedDistrict.message}</AlertDescription>
          </Alert>
        )}
      </div>

      <div>
        <Label>Issued Date</Label>
        <Input type="date" {...register("issuedDate")} />
        {errors.issuedDate && (
          <Alert>
            <AlertDescription>{errors.issuedDate.message}</AlertDescription>
          </Alert>
        )}
      </div>

      <div>
        <Label>Upload Citizenship Front</Label>
        <Input type="file" {...register("citizenshipFront")} />
        {errors.citizenshipFront && (
          <Alert>
            <AlertDescription>
              {errors.citizenshipFront.message}
            </AlertDescription>
          </Alert>
        )}
      </div>

      <div>
        <Label>Upload Citizenship Back</Label>
        <Input type="file" {...register("citizenshipBack")} />
        {errors.citizenshipBack && (
          <Alert>
            <AlertDescription>
              {errors.citizenshipBack.message}
            </AlertDescription>
          </Alert>
        )}
      </div>
    </>
  );
};
