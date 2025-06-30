import { Clapperboard } from "lucide-react";

export default function Header() {
  return (
    <div className="py-4 md:py-10">
      <div className="flex items-center justify-center gap-4">
        <div className="bg-gradient-to-r from-blue-400 to-purple-500 p-2 md:p-3 rounded-xl">
          <Clapperboard color="#ffffff" size={30} />
        </div>
        <h1 className="text-3xl md:text-5xl font-bold">FilmFinder</h1>
      </div>
      <h2 className="flex justify-center text-center mt-5 text-md md:text-lg">Найдите свой следующий любимый фильм или сериал из нашей коллекции</h2>
    </div>
  )
}