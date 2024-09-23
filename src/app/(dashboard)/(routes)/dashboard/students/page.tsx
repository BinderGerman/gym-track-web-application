//components and utils
import { Heading } from "@/components/heading/heading";
//ui	
import { UsersRound } from "lucide-react";

const StudentsPage = () => {
  return (
    <div>
      <Heading
        title="Alumnos"
        description="Crea, busca, modifica o elimina a tus alumnos"
        icon={UsersRound}
      />
      <div></div>
    </div>
  );
};

export default StudentsPage;
