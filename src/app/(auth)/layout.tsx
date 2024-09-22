'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { usePathname } from "next/navigation";
import { authLayoutConfig } from "@/utils/constants/auth-layout-config";

export default function AuthLayout() {
  const pathName = usePathname()

  const layoutData = authLayoutConfig.find(config => config.path === pathName)

  if (!layoutData) {
    return <div>Ruta no encontrada</div>;
  }

  const { component: Component } = layoutData; 


  return (
    <div className="flex justify-center items-center md:h-[100vh] md:px-10 lg:px-26">
      <div className="container h-[85vh] flex-col justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        {/* ===== Image ===== */}
        <div className="relative hidden h-full flex-col p-10 text-white lg:flex">
          {/* ===== Div with background Image ===== */}
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `url(${layoutData?.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              
            }}
          ></div>
	

          <div className="relative z-20 mt-auto">
            <p className="text-lg">
              &ldquo;Una App pensada para Personal Trainers&ldquo;
            </p>
            <footer className="text-sm">Jhon Doe</footer>
          </div>
        </div>
				{/* ===== Form ===== */}
				<div className="pt-10 lg:p-8 flex items-center md:h-[85vh] bg-secondary">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[450px]">
						<Card className="border-none bg-secondary">
              <CardHeader className="text-white text-center">
                <CardTitle>{layoutData?.title}</CardTitle>
                <CardDescription>{layoutData?.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Component />
              </CardContent>
            </Card>
          </div>
        </div>
			</div>
		</div>
  );
}
