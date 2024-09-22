import { NavbarHome } from "@/components/navbar-home/navbar-home";

export default function Home() {
  return (
    <div className="w-full h-dvh">
      <NavbarHome />
      <div className="flex items-center p-4 justify-center">
        <h1 className="text-5xl font-bold">Gym Track</h1>
      </div>
    </div>
  );
}
