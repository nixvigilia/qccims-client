"use client";
import {useForm} from "react-hook-form";

const PrintingCoatingProcessForm = () => {
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full bg-white border border-gray-200 rounded-md shadow p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto my-3"
    >
      <h2 className="text-center mb-4">Printing / Coating Process</h2>
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
        <div className="sm:col-span-2">
          <label>Date</label>
          <input
            {...register("date")}
            type="date"
            className="w-full mt-2 p-2 border rounded-md"
          />
        </div>
        <div className="sm:col-span-2">
          <label>Lacquer and Inks</label>
          <input
            {...register("lacquerAndInks")}
            type="text"
            className="w-full mt-2 p-2 border rounded-md"
          />
        </div>
        <div className="sm:col-span-2">
          <label>No. of Operator</label>
          <input
            {...register("noOfOperator")}
            type="number"
            className="w-full mt-2 p-2 border rounded-md"
          />
        </div>
        <div className="sm:col-span-2">
          <label>Operator</label>
          <input
            {...register("operator")}
            type="text"
            className="w-full mt-2 p-2 border rounded-md"
          />
        </div>
        <div className="sm:col-span-2">
          <label>Batch No.</label>
          <input
            {...register("batchNo")}
            type="text"
            className="w-full mt-2 p-2 border rounded-md"
          />
        </div>
        <div className="sm:col-span-2">
          <label>Used Sheets</label>
          <input
            {...register("usedSheets")}
            type="number"
            className="w-full mt-2 p-2 border rounded-md"
          />
        </div>
        <div className="sm:col-span-2">
          <label>Date of Approved Color Guide</label>
          <input
            {...register("approvedColorGuideDate")}
            type="date"
            className="w-full mt-2 p-2 border rounded-md"
          />
        </div>
        <div className="sm:col-span-2">
          <label>Printing / Coating Defects</label>
          <textarea
            {...register("printingCoatingDefects")}
            className="w-full mt-2 p-2 border rounded-md"
          />
        </div>
        <div className="sm:col-span-2">
          <label>No. of Tinplates Rejects</label>
          <input
            {...register("tinplatesRejects")}
            type="number"
            className="w-full mt-2 p-2 border rounded-md"
          />
        </div>
        <div className="sm:col-span-2">
          <label>Date Finish</label>
          <input
            {...register("dateFinish")}
            type="date"
            className="w-full mt-2 p-2 border rounded-md"
          />
        </div>
        <div className="sm:col-span-2">
          <label>Supervisor</label>
          <input
            {...register("supervisor")}
            type="text"
            className="w-full mt-2 p-2 border rounded-md"
          />
        </div>
        <div className="sm:col-span-2">
          <label>Q.C. Officer</label>
          <input
            {...register("qcOfficer")}
            type="text"
            className="w-full mt-2 p-2 border rounded-md"
          />
        </div>
        <div className="sm:col-span-2">
          <label>Approval Status</label>
          <div className="flex items-center mt-2">
            <input
              {...register("approvalStatus")}
              type="radio"
              value="Approved"
              className="mr-2"
            />
            <label>Approved</label>
            <input
              {...register("approvalStatus")}
              type="radio"
              value="Reject"
              className="ml-4 mr-2"
            />
            <label>Reject</label>
          </div>
        </div>
      </div>
      <button
        type="submit"
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
      >
        Submit
      </button>
    </form>
  );
};

export default PrintingCoatingProcessForm;
