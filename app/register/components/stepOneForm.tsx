import { Alert, AlertDescription } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Controller, useFormContext } from "react-hook-form";
import { NepaliUnicodeInput } from "../../_components/NepaliUnicodeInput";
import CustomDatePicker from "../../_components/CustomDatePicker";

export const StepOneForm = ({ dateType, setDateType }) => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();
  return (
    <>
      <div>
        <Label>Full Name (English)</Label>
        <Input
          {...register("fullNameEnglish")}
          placeholder="Enter full name in English"
          type="text"
        />
        {errors.fullNameEnglish && (
          <Alert>
            <AlertDescription>
              {errors.fullNameEnglish.message}
            </AlertDescription>
          </Alert>
        )}
      </div>

      <div>
        {/* <Label>Full Name (Nepali)</Label>
        <Input
          {...register("fullNameNepali")}
          placeholder="Type in English - converts to Nepali"
        />
        {errors.fullNameNepali && (
          <Alert>
            <AlertDescription>{errors.fullNameNepali.message}</AlertDescription>
          </Alert>
        )} */}
        <label className="text-sm">Full Name (Nepali)</label>
        <Controller
          name="fullNameNepali"
          control={control}
          rules={{ required: "Nepali name is required" }}
          render={({ field }) => (
            <NepaliUnicodeInput
              value={field.value || ""}
              onChange={field.onChange}
              placeholder="Type in English - converts to Nepali"
            />
          )}
        />
        {errors.fullNameNepali && (
          <p className="text-red-600">{errors.fullNameNepali.message}</p>
        )}
      </div>

      <div>
        <Label>Gender</Label>
        <select {...register("gender")} className="w-full border rounded p-2">
          <option value="">Select gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        {errors.gender && (
          <Alert>
            <AlertDescription>{errors.gender.message}</AlertDescription>
          </Alert>
        )}
      </div>

      <div className=" ">
        <div className="grid grid-cols-2 gap-12">
          <Controller
            name="dateOfBirth"
            control={control}
            render={({ field }) => (
              <CustomDatePicker
                label="Date of Birth"
                value={field.value}
                onValueChange={(val) => field.onChange(val)}
                errorMsg={errors.dateOfBirth?.message as string}
                required
                type="BS"
                dateType={dateType}
              />
            )}
          />
          <div className="flex gap-4 items-center">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="dateType"
                value="BS"
                className="cursor-pointer"
                checked={dateType === "BS"}
                onChange={(e) => setDateType(e.target.value)}
              />
              BS
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="dateType"
                value="AD"
                className="cursor-pointer"
                checked={dateType === "AD"}
                onChange={(e) => setDateType(e.target.value)}
              />
              AD
            </label>
          </div>
        </div>
        {errors.dateOfBirth && (
          <Alert>
            <AlertDescription>{errors.dateOfBirth.message}</AlertDescription>
          </Alert>
        )}
      </div>

      <div>
        <Label>Phone Number</Label>
        <Input
          {...register("phoneNumber")}
          placeholder="9XXXXXXXXX"
          type="number"
        />
        {errors.phoneNumber && (
          <Alert>
            <AlertDescription>{errors.phoneNumber.message}</AlertDescription>
          </Alert>
        )}
      </div>
    </>
  );
};
