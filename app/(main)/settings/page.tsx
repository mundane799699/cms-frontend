"use client";

import { NavigationHeader } from "@/components/NavigationHeader";
import { useRouter } from "next/navigation";
import { logout } from "@/services/login";
import { removeToken } from "@/utils/user-token";
import { useUserInfo } from "@/hooks/useUserInfo";

const SettingsPage = () => {
  const router = useRouter();
  const { userInfo, setUserInfo } = useUserInfo();
  const handleLogout = () => {
    logout().then((res: any) => {
      const { code } = res;
      if (code === 200) {
        removeToken();
        setUserInfo(null);
        router.push("/login");
      }
    });
  };

  return (
    <div className="h-full bg-white overflow-y-auto">
      <NavigationHeader />
      <div className="pt-16 px-4 pb-4 h-full flex flex-col justify-end">
        <button
          onClick={handleLogout}
          className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors"
        >
          退出登录
        </button>
      </div>
    </div>
  );
};

export default SettingsPage;
