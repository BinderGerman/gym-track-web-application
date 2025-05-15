"use client";
import { Heading } from "@/components/heading/heading";
import StudentsTable from "@/components/students/students-table";
import React from "react"; // Importar React
import { User } from "lucide-react";
const StudentsPage = () => {
  // Datos de ejemplo para la tabla
  const sampleStudents = [
    { id: "1", firstName: "Juan", lastName: "Perez", startDate: "2023-01-15" },
    { id: "2", firstName: "Maria", lastName: "Gomez", startDate: "2023-02-20" },
    { id: "3", firstName: "Carlos", lastName: "Lopez", startDate: "2023-03-10" },
  ];

  // Funciones placeholder para editar y eliminar (las implementaremos más adelante)
  const handleEditStudent = (studentId: string) => {
    console.log("Editar estudiante:", studentId);
    // Lógica para editar estudiante
  };

  const handleDeleteStudent = (studentId: string) => {
    console.log("Eliminar estudiante:", studentId);
    // Lógica para eliminar estudiante
  };

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Heading
          title="Estudiantes"
          description="Gestiona tus estudiantes"
          icon={User}
        />
        {/* Aquí integramos la tabla de estudiantes */}
        <StudentsTable
          students={sampleStudents}
          onEdit={handleEditStudent}
          onDelete={handleDeleteStudent}
        />
      </div>
    </div>
  );
};

export default StudentsPage;
