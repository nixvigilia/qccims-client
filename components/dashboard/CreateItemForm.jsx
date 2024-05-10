"use client";

import ImageInput from "@/components/FormInputs/ImageInput";
import SelectInput from "@/components/FormInputs/SelectInput";
import SelectInputWithSearch from "../FormInputs/SelectInputWithSearch";
import SubmitButton from "@/components/FormInputs/SubmitButton";
import TextInput from "@/components/FormInputs/TextInput";
import TextareaInput from "@/components/FormInputs/TextareaInput";
import FormHeader from "@/components/dashboard/FormHeader";
import {makePostRequest, makePutRequest} from "@/lib/apiRequest";
import {getData} from "@/lib/getData";
import {Pencil} from "lucide-react";

import Image from "next/image";
import Link from "next/link";
import {useRouter} from "next/navigation";
import React, {useState} from "react";
import {useForm} from "react-hook-form";
import {customerList, items, units} from "@/utils/constant";

export default function CreateItemForm({
  categories,
  // units,
  brands,
  warehouses,
  suppliers,
  initialData = {},
  isUpdate = false,
}) {
  const [imageUrl, setImageUrl] = useState(initialData.imageUrl);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm({defaultValues: initialData});
  const [loading, setLoading] = useState(false);
  function redirect() {
    router.push("/dashboard/inventory/items");
  }

  async function onSubmit(data) {
    data.imageUrl = imageUrl;

    if (isUpdate) {
      // Update request
      makePutRequest(
        setLoading,
        `api/items/${initialData.id}`,
        data,
        "Item",
        redirect,
        reset
      );
    } else {
      makePostRequest(setLoading, "api/items", data, "Item", reset);
      setImageUrl("");
    }
  }
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full bg-white border border-gray-200 rounded-md shadow md:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto my-3"
    >
      {/* <div className="grid gap-4 sm:grid-cols-2 sm:gap-6"> */}
      <div className="">
        <TextInput
          label="Rack #"
          name="title"
          register={register}
          errors={errors}
          className="w-full mt-4"
        />

        <SelectInputWithSearch
          name="categoryId"
          label="Customer Name"
          register={register}
          className="w-full mt-4"
          options={customerList}
        />

        <SelectInputWithSearch
          name="categoryId"
          label="Description"
          register={register}
          className="w-full mt-4"
          options={items}
        />

        <TextInput
          label="TPI Number"
          name="TPI Number"
          register={register}
          errors={errors}
          // isRequired='false'
          className="w-full mt-4"
        />

        <TextInput
          label="Item Quantity"
          name="qty"
          register={register}
          errors={errors}
          type="number"
          className="w-full mt-4"
        />

        <SelectInputWithSearch
          name="unitId"
          label="Select the Item Unit"
          register={register}
          className="w-full mt-4"
          options={units}
        />

        <TextInput
          label="Thickness"
          name="thickness"
          register={register}
          errors={errors}
          type="number"
          className="w-full mt-4"
        />

        <TextInput
          label="Width"
          name="width"
          register={register}
          errors={errors}
          type="number"
          className="w-full mt-4"
        />

        <TextInput
          label="Length"
          name="length"
          register={register}
          errors={errors}
          type="number"
          className="w-full mt-4"
        />

        <TextareaInput
          label="Item Notes"
          name="notes"
          register={register}
          errors={errors}
          className="w-full mt-4"
        />
        {/* <ImageInput
          label="Item Image"
          imageUrl={imageUrl}
          setImageUrl={setImageUrl}
          endpoint="imageUploader"
        /> */}
      </div>
      <SubmitButton
        isLoading={loading}
        title={isUpdate ? "Updated Item" : " New Order"}
      />
    </form>
  );
}
