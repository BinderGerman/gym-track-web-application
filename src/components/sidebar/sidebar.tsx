"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

//components and utils
import { routes } from "@/utils/constants/dashboard-routes-config";

export const Sidebar = () => {
  const pathname = usePathname();
  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-secondary text-secondary-foreground">
      <div className="px-3 py-2 flex-1">
        <Link href="/dashboard" className="flex items-center pl-3 mb-14">
          <div className="relative w-8 h-8 mr-4">
            <Image fill alt="Logo" src="/gym-track-logo.png" />
          </div>
          <h1 className="text-2xl font-bold">Gym Track</h1>
        </Link>
        <div className="space-y-2">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-sm group flex p-3 w-full justify-start font-medium, cursor-pointer hover:bg-primary/10 rounded-lg transition",
                pathname === route.href
                  ? "text-secondary bg-primary"
                  : "text-secondary-foreground"
              )}
            >
              <div className="flex items-center flex-1">
                <route.icon className="h-5 w-5 mr-3" />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
