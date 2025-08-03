"use client";
import React, { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { Step1Schema, Step2Schema } from "../../validation/dateValidate";
import { StepOneForm } from "./components/stepOneForm";
import { StepTwoForm } from "./components/stepTwoForm";

export default function RegisterForm() {
  const [step, setStep] = useState(1);
  const [fullData, setFullData] = useState({});
  const [dateType, setDateType] = useState("BS");

  const schema = step === 1 ? Step1Schema : Step2Schema;

  const methods = useForm({ resolver: zodResolver(schema), mode: "onBlur" });
  const { watch, trigger } = methods;

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      console.log("Field change:", name, value);
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const onSubmit = async (data) => {
    const isStepValid = await trigger();
    if (!isStepValid) return;

    if (step === 1) {
      setFullData(data);
      setStep(2);
    } else {
      const combined = { ...fullData, ...data };
      console.log("Final Form Data:", combined);
      alert("Form submitted. Check console.");
    }
  };

  const handleSetDateType = (type: string) => {
    setDateType(type);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Card className="max-w-2xl mx-auto mt-10">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Registration Form</CardTitle>
            <CardDescription>Step {step} of 2</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {step === 1 ? (
              <StepOneForm
                dateType={dateType}
                setDateType={handleSetDateType}
              />
            ) : (
              <StepTwoForm />
            )}

            <div className="flex justify-between pt-4">
              {step > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep(step - 1)}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back
                </Button>
              )}
              <Button type="submit">
                {step === 1 ? (
                  <>
                    Continue <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                ) : (
                  "Submit"
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </FormProvider>
  );
}
