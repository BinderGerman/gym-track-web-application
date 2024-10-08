'use client'
import { useEffect } from "react";

//components and utils
import { useUserStore } from "@/store/user-store";
import { MobileSidebar } from "@/components/sidebar/mobile-sidebar";
import { ThemeToggle } from "@/components/theme/theme-toggle";





export const NavbarDashboard =  () => {
    const user = useUserStore((state) => state.user);
    const fetchUser = useUserStore((state) => state.fetchUser);

    console.log('Hola estos son los datos del usuario', user)

    useEffect(() => {
      const localUser = localStorage.getItem('user')
      if(localUser) {
        const parsedUser = JSON.parse(localUser)
        fetchUser(parsedUser.uid)
      }
    }, [fetchUser])
    

    return (
      <div className="flex items-center p-4">
        <MobileSidebar />
        <div className="flex-1 flex justify-end items-center gap-3">
          <ThemeToggle />
          <p>{user?.firstName}</p>
        </div>
      </div>
    );
};
