"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  PiButterfly,
  PiLightbulb,
  PiLightningBold,
  PiUserCircle,
} from "react-icons/pi";

const navItems = [
  {
    name: "破茧",
    path: "/",
    icon: <PiButterfly className="w-6 h-6 mb-1" />,
  },
  {
    name: "思考",
    path: "/think",
    icon: <PiLightbulb className="w-6 h-6 mb-1" />,
  },
  {
    name: "陪跑",
    path: "/run",
    icon: <PiLightningBold className="w-6 h-6 mb-1" />,
  },
  {
    name: "我的",
    path: "/profile",
    icon: <PiUserCircle className="w-6 h-6 mb-1" />,
  },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 w-full bg-white border-t">
      <div className="flex justify-between">
        {navItems.map((item) => (
          <div key={item.path} className="flex flex-1">
            <Link
              href={item.path}
              className={`flex-1 py-2 flex flex-col items-center justify-center ${
                pathname === item.path
                  ? "text-primary bg-gray-100"
                  : "text-gray-600"
              }`}
            >
              {item.icon}
              <span className="text-xs">{item.name}</span>
            </Link>
          </div>
        ))}
      </div>
    </nav>
  );
}
