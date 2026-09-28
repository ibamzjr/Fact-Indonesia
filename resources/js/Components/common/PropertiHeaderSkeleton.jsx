import React from "react";

const PropertiHeaderSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
        {/* Header skeleton */}
        <div className="h-16 w-48 bg-gray-200 rounded-md mr-4 mt-4"></div>
        
        {/* Filter buttons skeleton */}
        <div className="hidden md:flex flex-wrap gap-2">
          {Array.from({ length: 5 }, (_, index) => (
            <div key={index} className="h-10 w-24 bg-gray-200 rounded-full"></div>
          ))}
        </div>
        
        {/* Mobile filter dropdown skeleton */}
        <div className="w-full md:hidden">
          <div className="w-full h-10 bg-gray-200 rounded-md"></div>
        </div>
      </div>
    </div>
  );
};

export default PropertiHeaderSkeleton;
