//components and utils
import { MobileSidebar } from "@/components/sidebar/mobile-sidebar";
import { ThemeToggle } from "@/components/theme/theme-toggle";

export const NavbarDashboard = () => {
  return (
    <div className="flex items-center p-4">
      <MobileSidebar />
      <div className="flex-1 flex justify-end items-center gap-3">
				<ThemeToggle />
        {/* Falta el componente de usuario */}
        <p>User</p>
      </div>
    </div>
  );
};
