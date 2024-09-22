import { z } from 'zod'

export const signInSchema = z
	.object({
		email: z
			.string()
			.email({ message: "El formato del email no es válido" }),
		password: z
			.string()
			.min(8, { message: "La contraseña debe tener al menos 8 caracteres" }),
	})

export const signUpSchema = z
	.object({
		uid: z.string(),
		firstName: z.string().min(3, { message: "El nombre es obligatorio" }),
		lastName: z.string().min(3, { message: "El apellido es obligatorio" }),
		email: z
			.string()
			.email({ message: "El formato del email no es válido" }),
		password: z
			.string()
			.min(8, { message: "La contraseña debe tener al menos 8 caracteres" })
			.regex(/[A-Z]/, {
				message: "La contraseña debe tener al menos una letra mayúscula",
			})
			.regex(/[a-z]/, {
				message: "La contraseña debe tener al menos una letra minúscula",
			})
			.regex(/\d/, { message: "La contraseña debe tener al menos un número" }),
		confirmPassword: z.string().min(1, { message: "Repite la contraseña" }),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Las contraseñas no coinciden",
		path: ["confirmPassword"],
	});

	export const forgotPaswordSchema = z
	.object({
		email: z
			.string()
			.email({ message: "El formato del email no es válido" }),
	})

