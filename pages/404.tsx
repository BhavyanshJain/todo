import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";

export default function Custom404() {
  return (
    <div className="flex items-center justify-center w-full h-full text-[#3e6397] text-3xl font-bold">
      <ExclamationTriangleIcon className="w-10 h-10 ml-3" /> &nbsp; 404 - Page
      Not Found
    </div>
  );
}
