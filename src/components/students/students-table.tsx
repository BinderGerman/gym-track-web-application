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
  id: string; // Asumimos un ID para cada estudiante
  firstName: string;
  lastName: string;
  startDate: string; // Podríamos formatear la fecha aquí o en la celda
  // ... otros campos si es necesario para mostrar en la tabla
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
            <TableCell>{student.firstName}</TableCell>
            <TableCell>{student.lastName}</TableCell>
            <TableCell>{student.startDate}</TableCell>
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
