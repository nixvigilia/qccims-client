import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Loading = () => {
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 ">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="text-center text-4xl font-bold text-gray-900">
          <div>
            <Skeleton width={300} height={40} />
          </div>
          <div className="mt-2 text-center">
            <Skeleton width={200} height={40} />
          </div>
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6">
          <div>
            <Skeleton width={100} height={20} />
            <div className="mt-2">
              <Skeleton height={50} />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <Skeleton width={100} height={20} />
            </div>
            <div className="mt-2">
              <Skeleton height={50} />
            </div>
          </div>

          <div>
            <Skeleton height={50} />
          </div>

          <div className="mt-10 text-center">
            <Skeleton width={200} height={20} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Loading;
