// src/components/students/student-form.tsx
"use client";
import { parse, isValid } from "date-fns";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { differenceInYears } from "date-fns"; // Importar función para calcular la diferencia de años
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { es } from "date-fns/locale"; // Importa el locale español
import { useEffect } from "react"; // Importar useEffect
import { CalendarIcon } from "lucide-react";

// Función para calcular la edad a partir de la fecha de nacimiento
const calculateAge = (birthDate: Date | undefined): number | undefined => {
  if (!birthDate) return undefined;
  return differenceInYears(new Date(), birthDate);
};

// 1. Definir el esquema del formulario con Zod en español
const formSchema = z.object({
  nombre: z.string().min(2, {
    message: "El nombre debe tener al menos 2 caracteres.",
  }),
  apellido: z.string().min(2, {
    message: "El apellido debe tener al menos 2 caracteres.",
  }),
  fechaNacimiento: z.date({
    required_error: "La fecha de nacimiento es requerida.",
  }),
  fechaInicio: z.date({
    required_error: "La fecha de inicio es requerida.",
  }),
  peso: z.number({
    required_error: "El peso es requerido.",
  }).positive({
    message: "El peso debe ser un número positivo.",
  }),
  altura: z.number({
    required_error: "La altura es requerida.",
  }).min(100, {
    message: "La altura debe ser al menos 100 cm.",
  }).max(250, {
    message: "La altura no puede ser mayor a 250 cm.",
  }),
  objetivo: z.string().optional(),
  lesionesEnfermedades: z.string().optional(),
  observaciones: z.string().optional(),
});

interface StudentFormProps {
  onSuccess: () => void; // se ejecuta al guardar exitosamente
}

export function StudentForm({ onSuccess }: StudentFormProps) {
  const [edad, setEdad] = useState<number | undefined>(undefined);
  const [fechaInput, setFechaInput] = useState("");

  // 2. Definir el formulario con React Hook Form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nombre: "",
      apellido: "",
      fechaNacimiento: undefined,
      fechaInicio: undefined,
      peso: undefined,
      altura: undefined,
      objetivo: "",
      lesionesEnfermedades: "",
      observaciones: "",
    },
  });

  const fechaNacimiento = form.watch("fechaNacimiento");

  // Calcular y actualizar la edad cuando cambia la fecha de nacimiento
  useEffect(() => {
    if (fechaNacimiento && isValid(fechaNacimiento)) {
      setEdad(calculateAge(fechaNacimiento));
      setFechaInput(format(fechaNacimiento, "dd/MM/yyyy"));
    } else {
      setEdad(undefined);
    }
  }, [fechaNacimiento]);

  // Función para manejar el cambio de fecha en el input
  const handleFechaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setFechaInput(inputValue);

    // Si el input está vacío, limpiamos el valor
    if (!inputValue.trim()) {
      form.setValue("fechaNacimiento", undefined, { shouldValidate: true });
      setEdad(undefined);
      return;
    }

    // Intentamos parsear la fecha en diferentes formatos
    const formats = ["dd/MM/yyyy", "dd-MM-yyyy", "dd.MM.yyyy"];
    let parsedDate: Date | undefined;

    for (const format of formats) {
      const date = parse(inputValue, format, new Date());
      if (isValid(date)) {
        parsedDate = date;
        break;
      }
    }

    if (parsedDate && isValid(parsedDate)) {
      // Validamos que la fecha no sea futura y no sea anterior a 1900
      const minDate = new Date("1900-01-01");
      if (parsedDate > new Date() || parsedDate < minDate) {
        form.setError("fechaNacimiento", {
          type: "manual",
          message: "La fecha debe estar entre 1900 y hoy",
        });
        return;
      }

      form.setValue("fechaNacimiento", parsedDate, { shouldValidate: true });
      setEdad(calculateAge(parsedDate));
      form.clearErrors("fechaNacimiento");
    } else {
      form.setError("fechaNacimiento", {
        type: "manual",
        message: "Formato de fecha inválido. Use dd/mm/yyyy",
      });
    }
  };

  // 3. Definir la función que se ejecuta al enviar el formulario
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Aquí manejarás la lógica para guardar el estudiante en Firebase
    // Puedes calcular la edad aquí antes de enviar los datos a Firebase
    const edadCalculada = calculateAge(values.fechaNacimiento);
    console.log({ ...values, edad: edadCalculada });

    // Aquí puedes agregar la lógica para guardar el estudiante en Firebase
    // Por ejemplo:
    // await saveStudent(values);

    // Llamar a onSuccess para notificar que el formulario se ha guardado
    onSuccess();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        
        <FormField
          control={form.control}
          name="nombre"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input placeholder="Nombre" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="apellido"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Apellido</FormLabel>
              <FormControl>
                <Input placeholder="Apellido" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormItem>
          <FormLabel>Sexo</FormLabel>
          <FormControl>
            <RadioGroup defaultValue="hombre" className="flex space-x-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="hombre" id="r1" />
                <label htmlFor="r1">Hombre</label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="mujer" id="r2" />
                <label htmlFor="r2">Mujer</label>
              </div>
            </RadioGroup>
          </FormControl>
        </FormItem>
        {/* Fecha de nacimiento solo con input */}
        <FormField
          control={form.control}
          name="fechaNacimiento"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fecha de Nacimiento</FormLabel>
              <FormControl>
                <Input
                  placeholder="dd/mm/yyyy"
                  value={fechaInput}
                  onChange={handleFechaChange}
                  className="w-[240px]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Edad calculada */}
        <FormItem>
          <FormLabel>Edad</FormLabel>
          <FormControl>
            <Input
              value={edad !== undefined ? `${edad} años` : ""}
              readOnly
              disabled
              className="w-[240px]"
            />
          </FormControl>
        </FormItem>

        <FormField
          control={form.control}
          name="peso"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Peso (kg)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="0.1"
                  placeholder="Peso"
                  {...field}
                  onChange={(e) => {
                    const value = parseFloat(e.target.value);
                    field.onChange(isNaN(value) ? undefined : value);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="altura"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Altura (cm)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="1"
                  placeholder="Altura en centímetros"
                  {...field}
                  onChange={(e) => {
                    const value = parseInt(e.target.value);
                    field.onChange(isNaN(value) ? undefined : value);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="fechaInicio"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Fecha de Inicio</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={`w-[240px] pl-3 text-left font-normal ${
                        !field.value ? "text-muted-foreground" : ""
                      }`}
                    >
                      {field.value ? (
                        format(field.value, "PPP", { locale: es })
                      ) : (
                        <span>Selecciona una fecha</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto p-0 pointer-events-auto"
                  align="start"
                >
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={(date) => field.onChange(date)}
                    disabled={(date) => date < new Date("1900-01-01")}
                    initialFocus
                    locale={es}
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="objetivo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Objetivo del entrenamiento</FormLabel>
              <FormControl>
                <Textarea placeholder="Objetivo" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lesionesEnfermedades"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Lesiones o enfermedades preexistentes</FormLabel>
              <FormControl>
                <Textarea placeholder="Lesiones/Enfermedades" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="observaciones"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Observaciones generales</FormLabel>
              <FormControl>
                <Textarea placeholder="Observaciones" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Guardar Alumno</Button>
      </form>
    </Form>
  );
}
