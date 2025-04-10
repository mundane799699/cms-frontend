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
    paths: ["/home", "/history"],
    icon: <PiButterfly className="w-6 h-6 mb-1" />,
  },
  {
    name: "思考",
    paths: ["/think"],
    icon: <PiLightbulb className="w-6 h-6 mb-1" />,
  },
  {
    name: "陪跑",
    paths: ["/run"],
    icon: <PiLightningBold className="w-6 h-6 mb-1" />,
  },
  {
    name: "我的",
    paths: ["/profile", "/login", "/settings"],
    icon: <PiUserCircle className="w-6 h-6 mb-1" />,
  },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="w-full bg-white border-t h-16 fixed bottom-0">
      <div className="flex justify-between h-full">
        {navItems.map((item) => (
          <div key={item.paths[0]} className="flex flex-1">
            <Link
              href={item.paths[0]}
              className={`flex-1 py-2 flex flex-col items-center justify-center ${
                item.paths.includes(pathname)
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
