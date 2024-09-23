//components and utils
import { Heading } from "@/components/heading/heading";
//ui
import { Dumbbell } from "lucide-react";

const ExercisesPage = () => {
  return (
    <div>
      <Heading
        title="Ejercicios"
        description="Puedes crear ejercicios personalizados que no envuentres en la lista"
        icon={Dumbbell}
      />
    </div>
  );
};

export default ExercisesPage;
