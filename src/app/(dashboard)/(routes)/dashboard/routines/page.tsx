//components and utils
import { Heading } from "@/components/heading/heading";
//ui
import { TableOfContents } from "lucide-react";

const RoutinesPage = () => {
  return (
    <div>
      <Heading
        title="Rutinas"
        description="Crea, busca, modifica o elimina las rutinas que ya no uses"
        icon={TableOfContents}
      />
    </div>
  );
};

export default RoutinesPage;
