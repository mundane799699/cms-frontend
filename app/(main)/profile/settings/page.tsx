"use client";

import { NavigationHeader } from "@/components/NavigationHeader";
import { useRouter } from "next/navigation";

const SettingsPage = () => {
  return (
    <div className="h-full bg-white overflow-y-auto">
      <NavigationHeader />
    </div>
  );
};

export default SettingsPage;
