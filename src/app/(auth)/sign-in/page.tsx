"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

//components and utils
import { signInSchema } from "@/utils/schemas/auth-schemas";
import { signIn } from "@/services/auth";

//ui
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import { toast } from "sonner";


const SignInPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter()

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    handleSubmit,
    formState: { errors },
  } = form;

  // ===== Sign In =====
  const onSubmit = async (user: z.infer<typeof signInSchema>) => {
    
    setLoading(true)

    try {
      const res = await signIn(user)

      if (res.user) {
        toast.success('Sesión iniciada exitosamente')
        router.push('/dashboard')
      }
      
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  } 

  return (
    <>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="mb-3">
                <FormLabel className="text-white">Email</FormLabel>
                <FormControl>
                  <Input 
                    className="text-[#212427] bg-white"
                    placeholder="example@email.com" 
                    {...field} />
                </FormControl>
                {errors.email && (
                  <FormMessage className="text-sm text-red-500">
                    {errors.email.message}
                  </FormMessage>
                )}
              </FormItem>
            )}
          ></FormField>
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="mb-3">
                <FormLabel className="text-white">Contraseña</FormLabel>
                <FormControl>
                  <Input
                    className="text-[#212427] bg-white"
                    type="password"
                    placeholder="********"
                    {...field}
                  />
                </FormControl>
                {errors.password && (
                  <FormMessage className="text-sm text-red-500">
                    {errors.password.message}
                  </FormMessage>
                )}
              </FormItem>
            )}
          ></FormField>
          <Link
            href="/forgot-password"
            className="underline text-muted-foreground underline-offset-4 hover:text-white text-sm text-end block"
          >
            ¿Olvidaste la contraseña?
          </Link>
          <Button
            type="submit"
            disabled={loading}
            className="w-full my-4"
          >
            {loading && (
              <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
            )}
            Iniciar Sesión
          </Button>
        </form>
        {/* ===== Sign Up ===== */}
        <p className="text-cente text-sm text-muted-foreground">
          ¿No tienes cuenta?{" "}
          <Link
            href="/sign-up"
            className="underline  underline-offset-4 hover:text-white"
          >
            Registrate
          </Link>
        </p>
      </Form>
    </>
  );
};

export default SignInPage;
