import Link from "next/link";

//ui
import { buttonVariants } from "@/components/ui/button";

export const NavbarHome = () => {
  return (
    <div className="flex items-center p-4 justify-between">
      <h1>Gym Track</h1>
			<div className="flex justify-end gap-3">
				<Link href='/sign-in' className={`${buttonVariants({ variant: "outline" })} border border-primary`}>Iniciar Sesión</Link>
				<Link href='/sig-up' className={buttonVariants({ variant: "default" })}>Registrarse</Link>
			</div>
    </div>
  );
};
