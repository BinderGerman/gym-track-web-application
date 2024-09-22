import SignInPage from "@/app/(auth)/sign-in/page";
import SignUpPage from "@/app/(auth)/sign-up/page";
import ForgotPasswordPage from "@/app/(auth)/forgot-password/page";
import { AuthLayoutConfig } from "@/interfaces/auth-layout-interface";

export const authLayoutConfig: AuthLayoutConfig[] = [
    {
        path: "/sign-in",
        title: "Iniciar Sesión",
        description: "Iniciar sesión en tu cuenta",
        image: "/dumbbells.jpg",
        component: SignInPage
    },
    {
        path: "/sign-up",
        title: "Registrarse",
        description: "Crea una cuenta para comenzar",
        image: "/weight-discs.jpg",
        component: SignUpPage
    },
    {
        path: "/forgot-password",
        title: "Recuperar Contraseña",
        description: "Recupera tu contraseña",
        image: "/kettlebells.jpg",
        component: ForgotPasswordPage
    }
]
