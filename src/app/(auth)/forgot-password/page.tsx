'use client';
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

//components and utils
import { forgotPaswordSchema } from "@/utils/schemas/auth-schemas";
import { sendResetEmail } from "@/services/auth";

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




// Resta la lógica de la página
const ForgotPasswordPage = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

    const form = useForm<z.infer<typeof forgotPaswordSchema>>({
      resolver: zodResolver(forgotPaswordSchema),
      defaultValues: {
        email: "",
      },
    })

    const { handleSubmit, formState: { errors } } = form;



    const onSubmit = async (user: z.infer<typeof forgotPaswordSchema>) => {

      setLoading(true)

      try {
        await sendResetEmail(user.email)
        toast.success('Se ha enviado el email con el link para restablecer la contraseña')
        router.push('/sign-in')
      } catch (error: any) {
        toast.error(error.message)
      }
    }

    return (
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
        <Button
          type="submit"
          disabled={loading}
          className="w-full my-4" 
        >
          {loading && (
            <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
          )}
          Recuperar Contraseña
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
    )
  }
  
  export default ForgotPasswordPage