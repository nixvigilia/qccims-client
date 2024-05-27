"use client";

import SubmitButton from "@/components/FormInputs/SubmitButton";
import TextInput from "@/components/FormInputs/TextInput";
import TextareaInput from "@/components/FormInputs/TextareaInput";
import FormHeader from "@/components/dashboard/FormHeader";
import {createCustomer, updateCustomer} from "@/lib/apiRequest";
import {useRouter} from "next/navigation";
import React, {useState} from "react";
import {useForm, useFieldArray} from "react-hook-form";
import Swal from "sweetalert2";

export default function DeliveryForm({initialData = {}, isUpdate = false}) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: {errors},
  } = useForm({defaultValues: initialData});
  const {fields, append, remove} = useFieldArray({
    control,
    name: "contactInfos",
  });
  const [loading, setLoading] = useState(false);

  function redirect() {
    router.push("/dashboard/customers");
  }

  async function onSubmit(data) {
    if (isUpdate) {
      // Update request
      updateCustomer(
        setLoading,
        `api/customer/${initialData.id}`,
        data,
        "Customer",
        redirect,
        reset
      );
    } else {
      createCustomer(setLoading, "api/customer/new", data, "Customer", reset);
    }
  }

  const handleRemove = async (index) => {
    const contact = fields[index];
    if (
      contact.contactPerson ||
      contact.contactPosition ||
      contact.contactTel
    ) {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, remove it!",
      });

      if (result.isConfirmed) {
        remove(index);
        Swal.fire("Removed!", "The contact info has been removed.", "success");
      }
    } else {
      remove(index);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="">
      {/* <FormHeader title={isUpdate ? "Update Customer" : "Create New Customer"} /> */}
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
        <TextInput
          label="Company Name"
          name="companyName"
          register={register}
          errors={errors}
          className="w-full mt-4"
          isRequired="true"
        />
        <TextInput
          label="Address"
          name="address"
          register={register}
          errors={errors}
          className="w-full mt-4"
          isRequired="true"
        />
        <TextInput
          label="Contact"
          name="contact"
          register={register}
          errors={errors}
          className="w-full mt-4"
        />
        <TextInput
          label="TIN Number"
          name="tinNumber"
          register={register}
          errors={errors}
          className="w-full mt-4"
        />
        <TextInput
          label="Delivery Recipient"
          name="deliveryRecipient"
          register={register}
          errors={errors}
          className="w-full mt-4"
        />
        <TextInput
          label="Delivery Address"
          name="deliveryAddress"
          register={register}
          errors={errors}
          className="w-full mt-4"
        />
        <TextareaInput
          label="Notes"
          name="notes"
          register={register}
          errors={errors}
          className="w-full mt-4"
        />
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold">Contact Information</h3>
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="flex flex-col sm:flex-row sm:items-end gap-4 mt-4"
          >
            <TextInput
              label="Contact Person"
              name={`contactInfos[${index}].contactPerson`}
              register={register}
              errors={errors}
              className="w-full"
            />
            <TextInput
              label="Contact Position"
              name={`contactInfos[${index}].contactPosition`}
              register={register}
              errors={errors}
              className="w-full"
            />
            <TextInput
              label="Contact Tel"
              name={`contactInfos[${index}].contactTel`}
              register={register}
              errors={errors}
              className="w-full"
            />
            <button
              type="button"
              onClick={() => handleRemove(index)}
              className="self-end px-4 py-2 text-red-600 bg-red-100 rounded hover:bg-red-200"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() =>
            append({contactPerson: "", contactPosition: "", contactTel: ""})
          }
          className="mt-4 px-4 py-2 text-blue-600 bg-blue-100 rounded hover:bg-blue-200"
        >
          Add Contact Info
        </button>
      </div>

      <SubmitButton
        isLoading={loading}
        title={isUpdate ? "Update Customer" : "Create Customer"}
        className="mt-6"
      />
    </form>
  );
}
