"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

//components and utils
import { signUpSchema } from "@/utils/schemas/auth-schemas";
import { createUser, setDocument, updateUser } from "@/services/auth";
import { IUser } from "@/interfaces/user-interface";


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


// Resta la lógica de la página
const SignUpPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter()

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      uid: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const {
    handleSubmit,
    formState: { errors },
  } = form;

  // ===== Sign Up =====
  const onSubmit = async (user: z.infer<typeof signUpSchema>) => {
    
    setLoading(true)

  

    try {
      const res = await createUser(user)
      await updateUser({ displayName: user.firstName + " " + user.lastName })
      user.uid = res.user.uid
      await createUserInDB(user as IUser)

      toast.success('Usuario creado exitosamente')

      router.push('/dashboard')

    } catch (error: any) {
      // Completar con la lógica de error

      toast.error(error.message)
      console.log('Este es el error ', error);
      
    } finally {
      setLoading(false)
    }
    
  };

  const createUserInDB = async (user: IUser) => {
    const path = `users/${user.uid}`

    
    setLoading(true)

    try {
      delete user.password
      delete user.confirmPassword
      await setDocument(path, user)

    } catch (error) {

      console.log(error);
      
    } finally {
      setLoading(false)
    }     
  }  

  return (
    <>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full md:flex md:justify-between">
          <FormField
            control={form.control}
            name='firstName'
            render={({ field }) => (
              <FormItem className="mb-3">
                <FormLabel className="text-white">Nombre</FormLabel>
                <FormControl>
                  <Input 
                    className="text-[#212427] bg-white"
                    placeholder="Nombre" 
                    {...field} />
                </FormControl>
                {errors.firstName && (
                  <FormMessage className="text-sm text-red-500">
                    {errors.firstName.message}
                  </FormMessage>
                )}
              </FormItem>
            )}
          ></FormField>
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem className="mb-3">
                <FormLabel className="text-white">Apellido</FormLabel>
                <FormControl>
                  <Input 
                    className="text-[#212427] bg-white"
                    placeholder="Apellido" 
                    {...field} />
                </FormControl>
                {errors.lastName && (
                  <FormMessage className="text-sm text-red-500">
                    {errors.lastName.message}
                  </FormMessage>
                )}
              </FormItem>
            )}
          ></FormField>
          </div>
          
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
          <div className="w-full md:flex md:justify-between">
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
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem className="mb-3">
                <FormLabel className="text-white">Confirmar Contraseña</FormLabel>
                <FormControl>
                  <Input
                    className="text-[#212427] bg-white"
                    type="password"
                    placeholder="********"
                    {...field}
                  />
                </FormControl>
                {errors.confirmPassword && (
                  <FormMessage className="text-sm text-red-500">
                    {errors.confirmPassword.message}
                  </FormMessage>
                )}
              </FormItem>
            )}
            
          ></FormField>
          </div>
          
          <Button
            type="submit"
            disabled={loading}
            className="w-full my-4"
          >
            {loading && (
              <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
            )}
            Crear Cuenta
          </Button>
          {/* <Toaster position="top-right" richColors /> */}
        </form>
        {/* ===== Sign Up ===== */}
        <p className="text-cente text-sm text-muted-foreground">
          ¿Ya tienes cuenta?{" "}
          <Link
            href="/sign-in"
            className="underline  underline-offset-4 hover:text-white"
          >
            Inicia S|esión
          </Link>
        </p>
      </Form>
    </>
  )
}

export default SignUpPage