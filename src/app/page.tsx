import { CardDemo } from "@/components/card-demo";



export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-5xl font-bold">Gym Track</h1>
        <p className="text-2xl">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus.
          Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies
          sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius
          a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy
          molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat.
          Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium
          at, ligula. Suspendisse aliquet, sem ut cursus luctus, ipsum leo
          elementum sem, vitae aliquet metus eros vitae nisl. Sed vitae urna.
        </p>
        <CardDemo />
      </main>
    </div>
  );
}
