import React from "react";

export default function Circles() {
  return (
    <div className="min-h-[80vh] min-w-[70%] absolute z-10 hidden lg:block">
      <div className="bg-gradient-to-br from-circle-1 to-circle-2 h-[40vh] w-[40vh] rounded-full absolute -top-8 -right-36"></div>
      <div className="bg-gradient-to-br from-circle-1 to-circle-2 h-[38vh] w-[38vh] rounded-full absolute -bottom-7 -left-32"></div>
    </div>
  );
}
