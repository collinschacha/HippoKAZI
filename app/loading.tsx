import LoadingAnime from "@/components/LoadingAnime";
import React from "react";

const loading = () => {
  return (
    <div className="min-h-[100vh]">
      <div className="flex justify-center items-center">
        <LoadingAnime />
      </div>
    </div>
  );
};

export default loading;
