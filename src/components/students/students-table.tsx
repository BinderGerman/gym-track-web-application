"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react"; // Usando iconos de lucide-react
import React from "react"; // Importar React

interface Student {
    id: string,
    nombre: string,
    apellido: string,
    fechaNacimiento: Date,
    fechaInicio: Date,
    peso: number,
    objetivo: string,
    lesionesEnfermedades: string,
    observaciones: string,
}

interface StudentsTableProps {
  students: Student[];
  onEdit: (studentId: string) => void;
  onDelete: (studentId: string) => void;
}

const StudentsTable: React.FC<StudentsTableProps> = ({
  students,
  onEdit,
  onDelete,
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nombre</TableHead>
          <TableHead>Apellido</TableHead>
          <TableHead>Fecha de Inicio</TableHead>
          <TableHead className="text-right">Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {students.map((student) => (
          <TableRow key={student.id}>
            <TableCell>{student.nombre}</TableCell>
            <TableCell>{student.apellido}</TableCell>
            <TableCell>{student.fechaInicio.toLocaleDateString()}</TableCell>
            <TableCell >
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEdit(student.id)}
                className="mr-2"
              >
                <Pencil className="h-4 w-4" /> {/* Icono de editar de lucide-react */}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDelete(student.id)}
              >
                <Trash2 className="h-4 w-4" /> {/* Icono de eliminar de lucide-react */}
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default StudentsTable;
