"use client";
import { cn } from "@/lib/utils";
import NepaliDatePicker, { NepaliDate } from "@zener/nepali-datepicker-react";
import "@zener/nepali-datepicker-react/index.css";
import { Calendar } from "lucide-react";
import React, { useEffect, useMemo, useRef, useState } from "react";
type IManipulateDate =
  | "day"
  | "week"
  | "month"
  | "year"
  | "d"
  | "w"
  | "m"
  | "y";

interface CustomDatePickerProps {
  value?: string;
  dateType?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
  // disabled?: boolean
  // minTimeFromToday?: { value: number; type: IManipulateDate }
  // maxTimeFromToday?: { value: number; type: IManipulateDate }
  type?: "AD" | "BS";
  boundingDivClassName?: string;
  inputClassName?: string;
  menuContainerClassNameExtra?: string;
  portalClassName?: string;
  errorMsg?: string;
  dateMin?: Date;
  dateMax?: Date;
  optionalDate?: boolean;
  iconClassName?: string;
  required?: boolean;
}

const fixedInputClass =
  "rounded-md appearance-none relative block w-full px-4 h-9 border border-input dark:border-neutral-600 bg-transparent text-sm focus:border-white-60 focus:outline-none placeholder:text-gray-400 min-w-[160px]";

const getMinMaxDate = (
  today: Date,
  minMaxTime: { value: number; type: IManipulateDate },
  type: "min" | "max"
) => {
  return type === "min"
    ? new Date(
        today.getTime() -
          minMaxTime.value *
            (minMaxTime.type === "day" || minMaxTime.type === "d"
              ? 86400000
              : minMaxTime.type === "week" || minMaxTime.type === "w"
              ? 604800000
              : minMaxTime.type === "month" || minMaxTime.type === "m"
              ? 2629800000
              : minMaxTime.type === "year" || minMaxTime.type === "y"
              ? 31557600000
              : 0)
      )
    : new Date(
        today.getTime() +
          minMaxTime.value *
            (minMaxTime.type === "day" || minMaxTime.type === "d"
              ? 86400000
              : minMaxTime.type === "week" || minMaxTime.type === "w"
              ? 604800000
              : minMaxTime.type === "month" || minMaxTime.type === "m"
              ? 2629800000
              : minMaxTime.type === "year" || minMaxTime.type === "y"
              ? 31557600000
              : 0)
      );
};

const CustomDatePicker = ({
  value,
  dateType,
  onValueChange,
  placeholder = "Select Date",
  label,
  // disabled,
  // minTimeFromToday,
  // maxTimeFromToday,
  boundingDivClassName = "",
  inputClassName = "",
  portalClassName = "",
  errorMsg,
  dateMin,
  dateMax,
  menuContainerClassNameExtra = "",
  optionalDate = false,
  iconClassName = "",
  required = false,
}: CustomDatePickerProps) => {
  const today = useMemo(() => new Date(), []);
  const initialNonOptionalDate = useMemo(
    () => (value ? new Date(value) : null),
    [value]
  );

  const initialDate =
    !optionalDate || initialNonOptionalDate ? initialNonOptionalDate : null;

  const type = dateType || "AD";

  const [selectedDate, setSelectedDate] = useState<NepaliDate | Date | null>(
    type === "AD"
      ? initialDate
      : initialDate
      ? new NepaliDate(initialDate)
      : null
  );
  const [open, setOpen] = useState(false);

  const datePickerWrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setSelectedDate(
      type === "AD"
        ? initialDate
        : initialDate
        ? new NepaliDate(initialDate)
        : null
    );
  }, [value, today, type, initialDate]);

  const handleDateChange = (date: NepaliDate | Date | null) => {
    setSelectedDate(date);
    if (type === "AD") {
      const formattedDate = new Date(date as Date).toISOString().split("T")[0];
      onValueChange?.(formattedDate);
    } else {
      const convertedAdDate = (date as NepaliDate).toADasDate();
      onValueChange?.(convertedAdDate.toISOString().split("T")[0]);
    }
    setTimeout(() => setOpen(false), 100);
  };

  // const minDate = minTimeFromToday
  //   ? type === "AD"
  //     ? getMinMaxDate(today, minTimeFromToday, "min")
  //     : new NepaliDate().subtract(
  //         minTimeFromToday?.value,
  //         minTimeFromToday?.type
  //       )
  //   : dateMin
  //   ? type === "AD"
  //     ? dateMin
  //     : new NepaliDate(dateMin)
  //   : undefined;

  // const maxDate = maxTimeFromToday
  //   ? type === "AD"
  //     ? getMinMaxDate(today, maxTimeFromToday, "max")
  //     : new NepaliDate().subtract(
  //         maxTimeFromToday?.value,
  //         maxTimeFromToday?.type
  //       )
  //   : dateMax
  //   ? type === "AD"
  //     ? dateMax
  //     : new NepaliDate(dateMax)
  //   : undefined;

  const handleContainerClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setOpen(true);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        datePickerWrapperRef.current &&
        !datePickerWrapperRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div
      className={cn("flex flex-col gap-3 w-full", boundingDivClassName)}
      ref={datePickerWrapperRef}
    >
      <label>
        {label} {required && <span className="text-destructive">*</span>}
      </label>

      <div
        className="relative cursor-pointer"
        onClick={(e) => {
          e.preventDefault();
          handleContainerClick(e);
        }}
      >
        <NepaliDatePicker
          value={selectedDate}
          placeholder={placeholder}
          className={cn(fixedInputClass, inputClassName)}
          type={dateType}
          lang="en"
          onChange={(date: NepaliDate | Date | null) => handleDateChange(date)}
          showclear={false}
          // min={minDate}
          // max={maxDate}
          open={open}
          // disabled={disabled}
          // suffix={() => <Calendar className="size-4" />}
          calendarClassName="bg-white dark:bg-neutral-600"
          menuContainerClassName={cn(
            "bg-white border shadow-md dark:bg-neutral-600 rounded-lg",
            menuContainerClassNameExtra
          )}
          portalClassName={cn(portalClassName)}
        />

        <button
          // disabled={disabled}
          className={cn(
            "absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer",
            iconClassName
          )}
        >
          <Calendar className="size-4" />
        </button>
      </div>

      {errorMsg && <p className="text-xs text-destructive">{errorMsg}</p>}
    </div>
  );
};

export default CustomDatePicker;
