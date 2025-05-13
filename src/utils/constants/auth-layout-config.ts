//components and utils
import SignInPage from "@/app/(auth)/sign-in/[[...rest]]/page";
import SignUpPage from "@/app/(auth)/sign-up/[[...rest]]/page";
import { IAuthLayout } from "@/interfaces/auth-layout-interface";

export const authLayoutConfig: IAuthLayout[] = [
    {
        path: "/sign-in",
        title: "Iniciar Sesión",
        description: "Inicia sesión con tu cuenta",
        image: "/dumbbells.jpg",
        component: SignInPage
    },
    {
        path: "/sign-up",
        title: "Registrarse",
        description: "Crea una cuenta para comenzar",
        image: "/weight-discs.jpg",
        component: SignUpPage
    }
]
