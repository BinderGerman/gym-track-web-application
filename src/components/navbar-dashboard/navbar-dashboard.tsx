'use client'
import { UserButton } from "@clerk/nextjs";

//components and utils
import { MobileSidebar } from "@/components/sidebar/mobile-sidebar";
import { ThemeToggle } from "@/components/theme/theme-toggle";

export const NavbarDashboard = () => {
    return (
      <div className="flex items-center py-4 px-6">
        <MobileSidebar />
        <div className="flex-1 flex justify-end items-center gap-3">
          <ThemeToggle />
          <UserButton 
            afterSignOutUrl="/"
            appearance={{
              elements: {
                avatarBox: "w-10 h-10",
                userButtonPopoverCard: "bg-background border-border",
                userButtonPopoverActionButton: "text-foreground hover:bg-accent hover:text-accent-foreground",
                userButtonPopoverFooter: "border-border",
                userPreview: "text-foreground",
                userButtonPopoverActionButtonText: "text-foreground",
              }
            }}
          />
        </div>
      </div>
    );
};
