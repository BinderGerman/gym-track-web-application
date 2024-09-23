//components and utils
import { NavbarDashboard } from "@/components/navbar-dashboard/navbar-dashboard";
import { Sidebar } from "@/components/sidebar/sidebar";
import { ThemeProvider } from "@/components/theme/theme-providers";

const DashboardLayout = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <div className="h-full relative bg-muted">
        <div className="hidden h-full md:flex md:flex-col md:fixed md:w-72 md:inset-y-0 z-[80] text-white">
          <Sidebar />
        </div>
        <main className="md:pl-72 h-dvh">
          <NavbarDashboard />
          {children}
        </main>
      </div>
    </ThemeProvider>
  );
};

export default DashboardLayout;
