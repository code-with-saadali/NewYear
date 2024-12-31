import React from "react";

const PageNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
      <h1 className="text-9xl font-extrabold text-red-500">404</h1>
      <p className="text-2xl mb-5">Oops! Page Not Found</p>
      <div className="bg-green-500 text-white px-8 py-4 rounded-lg shadow-lg">
        <p className="text-lg">Wishing you a Happy New Year full of new adventures and joy!</p>
      </div>
    </div>
  );
};

export default PageNotFound;
