import CustomerProfileForm from "@/components/Delivery/CustomerProfile/Forms/CustomerProfileForm";

export default async function Page() {
  return (
    <div className="m-6">
      <div className="w-full bg-white border border-gray-200 rounded-md shadow md:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto my-3">
        <h1 className="pb-2 text-2xl font-bold text-gray-800">
          Create Customer Profile
        </h1>
        <CustomerProfileForm />
      </div>
    </div>
  );
}
