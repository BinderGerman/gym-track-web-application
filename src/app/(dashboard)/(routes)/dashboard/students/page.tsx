// src/app/(dashboard)/(routes)/dashboard/students/page.tsx
'use client'; // Asegúrate de que sea un Client Component

import { useState } from 'react';
import { Heading } from '@/components/heading/heading';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator'; // Asegúrate de tener el componente Separator
import StudentsTable from '@/components/students/students-table'; // Tu componente de tabla de estudiantes
import { StudentForm } from '@/components/students/student-form'; // El formulario que acabamos de crear
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetDescription } from '@/components/ui/sheet'; // Componentes de Sheet
import { UsersRound } from 'lucide-react';

// Datos mockeados (los reemplazaremos por datos de Firebase después)
const mockStudents = [
  {
    id: '1',
    nombre: 'Juan',
    apellido: 'Perez',
    fechaNacimiento: new Date('1990-05-15'),
    fechaInicio: new Date('2023-01-10'),
    peso: 75.5,
    objetivo: 'Perder peso',
    lesionesEnfermedades: 'Ninguna',
    observaciones: 'Estudiante motivado.',
  },
  {
    id: '2',
    nombre: 'Maria',
    apellido: 'Gomez',
    fechaNacimiento: new Date('1995-11-20'),
    fechaInicio: new Date('2022-08-01'),
    peso: 60.0,
    objetivo: 'Ganar masa muscular',
    lesionesEnfermedades: 'Lesión de rodilla leve',
    observaciones: '',
  },
  // Agrega más datos mockeados si lo necesitas
];

const StudentsPage = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <Heading
          title="Alumnos"
          description="Gestiona a tus estudiantes."
          icon={UsersRound}
        />
        <div className="flex items-center space-x-2">
          {/* Botón para añadir estudiante que activa el Sheet */}
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button>Añadir Alumno</Button>
            </SheetTrigger>
            <SheetContent className="w-[400px] sm:w-[600px] overflow-y-auto">
              <SheetHeader>
                <SheetTitle>Nuevo Alumno</SheetTitle>
                <SheetDescription>
                  Completa los datos del nuevo alumno aquí.
                </SheetDescription>
              </SheetHeader>
              <div className="pt-4">
                <StudentForm />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      <Separator /> {/* Línea separadora */}
      {/* Aquí mostrarás tu tabla de estudiantes con datos (por ahora mockeados) */}
      <StudentsTable 
        students={mockStudents}
        onEdit={() => {}}
        onDelete={() => {}}
      /> {/* Pasa tus datos mockeados a la tabla */}
    </div>
  );
};

export default StudentsPage;

