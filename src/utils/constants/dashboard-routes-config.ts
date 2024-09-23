//components and utils
import { DashboardRoutesConfig } from "@/interfaces/dashboard-routes-interface";

//ui
import {
	LayoutDashboard,
	UsersRound,
	TableOfContents,
	Dumbbell,
} from "lucide-react";

export const routes: DashboardRoutesConfig[] = [
	{
		label: "Panel General",
		icon: LayoutDashboard,
		href: "/dashboard",
	},
	{
		label: "Alumnos",
		icon: UsersRound,
		href: "/dashboard/students",
	},
	{
		label: "Rutinas",
		icon: TableOfContents,
		href: "/dashboard/routines",
	},
	{
		label: "Ejercicios",
		icon: Dumbbell,
		href: "/dashboard/exercises",
	},
];