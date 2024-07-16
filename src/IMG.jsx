import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { IoMdRocket } from "react-icons/io";
import { FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { FaGithubAlt } from "react-icons/fa";
import { BsSendFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import Pokemon from "./pokemon";

const IMG = () => {
  const [Pkemons, setPkemons] = useState({
    Result: [],
    isLoading: true,
    PreUrl: "",
    Next: "",
    API: "https://pokeapi.co/api/v2/pokemon",
  });

  const GotoTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  const fetchAPI = useCallback(async () => {
    try {
      const res = await axios.get(Pkemons.API);
      const PokemonResults = res.data.results;

      const PokemonResultsPromise = PokemonResults.map((pokemon) =>
        axios.get(pokemon.url)
      );
      const pokemonData = await axios.all(PokemonResultsPromise);

      const PokeListResult = pokemonData.map((PokeData) => {
        const pokemon = PokeData.data;
        return {
          id: pokemon.id,
          name: pokemon.name,
          image: pokemon.sprites.other
            ? pokemon.sprites.other.dream_world.front_default
            : pokemon.sprites.front_shiny,
          types: pokemon.types,
        };
      });

      setPkemons((prevPkemons) => ({
        ...prevPkemons,
        Result: PokeListResult,
        isLoading: false,
        PreUrl: res.data.previous,
        Next: res.data.next,
      }));
    } catch (error) {
      setPkemons((prevPkemons) => ({
        ...prevPkemons,
        isLoading: false,
      }));
      console.error(error);
    }
  }, [Pkemons.API]);

  useEffect(() => {
    fetchAPI();
  }, [fetchAPI]);

  const handlePrevClick = () => {
    if (Pkemons.PreUrl) {
      setPkemons((prevPkemons) => ({
        ...prevPkemons,
        API: Pkemons.PreUrl,
      }));
    }
  };

  const handleNextClick = () => {
    if (Pkemons.Next) {
      setPkemons((prevPkemons) => ({
        ...prevPkemons,
        API: Pkemons.Next,
      }));
    }
  };

  const { isLoading, Result, PreUrl, Next } = Pkemons;

  return (
    <div className="">
      {isLoading ? (
        <p className="text-center text-3xl font-semibold mt-96">Loading...</p>
      ) : (
        <div>
          <nav className="z-10 w-[100%] fixed top-0 h-16 bg-red-950 flex items-center justify-between pl-10 pr-10">
            <p className="text-3xl font-semibold text-sky-100 cursor-pointer font-Protest">
              Pokemons
            </p>
          </nav>
          <div>
            <div className="text-center">
              <p className="text-[40px] text-red-950 font-bold mb-8 mt-24 -tracking-tighter">
                Choose Your Favorite Pokemon
              </p>
              <div className="flex flex-wrap justify-around mt-6">
                {Result.map((p) => (
                  <Pokemon name={p.name} image={p.image} key={p.id} id={p.id} />
                ))}
              </div>
              <div className="mt-20 mb-20">
                <button
                  disabled={!PreUrl}
                  onClick={handlePrevClick}
                  className="bg-red-950 pl-6 pr-6 pt-4 pb-4 mr-10 rounded text-white font-semibold cursor-pointer"
                >
                  Previous
                </button>
                <button
                  disabled={!Next}
                  onClick={handleNextClick}
                  className="bg-red-950 pl-6 pr-6 pt-4 pb-4 ml-10 rounded text-white font-semibold cursor-pointer"
                >
                  Next
                </button>
              </div>
            </div>
            <button
              className="bg-red-950 text-white w-14 h-14 pl-2 rounded-full border-2 border-sky-100 mr-10 font-semibold sm:mb-4 mb-10 fixed bottom-4 left-2"
              onClick={GotoTop}
            >
              <IoMdRocket className="text-4xl" />
            </button>
            <footer className="bg-red-950 box-border mt-10 pt-8 pb-8 flex-wrap flex justify-between pl-5 pr-5 items-center">
        <div className="text-slate-300 font-semibold text-3xl">Pokemons</div>
        <div className=" text-sky-100 font-semibold text-lg mr-10 sm:ml-4 max-[640px]:ml-4">
                Pokemons Provides You Different Pokemons Which Can Help You{" "}
                <br /> To Do Your Work Professionally.
              </div>
        <div>
          <div className="flex gap-5 mb-2 max-[445px]:mt-3">
            <Link to="https://www.linkedin.com/in/kashish-prajapati-ab5064236/"><FaLinkedinIn className="p-2 bg-slate-300 text-4xl rounded" /></Link>
            <Link to="https://x.com/Kashish90927918"><FaTwitter className="p-2 bg-slate-300 text-4xl rounded" /></Link>
            <Link to="https://github.com/kashishprajapati123"><FaGithubAlt className="p-2 bg-slate-300 text-4xl rounded" /></Link>
          </div>
          <form className="flex justify-center items-center" action="https://formspree.io/f/xdoqzglg" method="POST">
            <input
              name="email"
              type="email"
              placeholder="Enter Your Email..."
              className="bg-slate-300 pt-2 pb-2 rounded-l pl-3 w-80 max-[445px]:w-64 pr-3 outline-none placeholder:text-slate-800 font-semibold"
            />
            <button className="pt-3 pb-3 pl-2 pr-2 rounded-r border-l-2 border-l-slate-800 bg-slate-300 text-slate-800 font-semibold">
              <BsSendFill className="object-cover" />
            </button>
          </form>
        </div>
      </footer>
          </div>
        </div>
      )}
    </div>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export default IMG;
