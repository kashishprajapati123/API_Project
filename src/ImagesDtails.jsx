/* eslint-disable react-hooks/rules-of-hooks */
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { FaTwitter } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";
import { FaGithubAlt } from "react-icons/fa";
import { BsSendFill } from "react-icons/bs";
import { Link } from "react-router-dom";
function ImagesDtails() {
  const { id } = useParams();
  const [Pokemon, setPokemon] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  async function Download() {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    console.log(response.data);
    const typesArray = response.data.types;
    let type1 = "Not Another type";
    let type2 = "Not Another type";

    if (typesArray && typesArray.length > 0) {
      type1 = typesArray[0].type.name;
      if (typesArray.length > 1) {
        type2 = typesArray[1].type.name;
      }
    }
    setIsLoading(false);
    setPokemon({
      id: response.data.id,
      name: response.data.name,
      image: response.data.sprites.other.dream_world.front_default,
      weight: response.data.weight,
      height: response.data.height,
      type1: type1,
      type2: type2,
    });
  }
  useEffect(() => {
    Download();
  }, [id]);
  return (
    <>
      {isLoading ? (
        <p className="text-center text-3xl font-semibold mt-96">Loading...</p>
      ) : (
        <>
          <div>
            <nav className="z-10 w-[100%] h-20 bg-red-950 flex items-center justify-between pl-10 pr-10">
              <p className="text-3xl font-semibold text-sky-100 cursor-pointer font-Protest">
                Pokemons
              </p>
            </nav>
          </div>
          <div className="text-center mt-10 font-semibold font-Protest text-4xl">
            Details Of {Pokemon.name}
          </div>
          <div className="flex flex-col my-10 text-center">
            <img
              className="h-[400px] w-[400px] m-auto"
              src={Pokemon.image}
              alt=""
            />
            <div className="text-2xl my-2 ">
              <span className="font-semibold font-Protest"> ID : </span>
              {Pokemon.id}
            </div>
            <div className="text-2xl my-2">
              <span className="font-semibold font-Protest"> Name : </span>
              {Pokemon.name}
            </div>
            <div className="text-2xl my-2">
              <span className="font-semibold font-Protest"> Weight : </span>
              {Pokemon.weight}
            </div>
            <div className="text-2xl my-2">
              <span className="font-semibold font-Protest"> Height : </span>
              {Pokemon.height}
            </div>
            <div className="text-2xl my-2">
              <span className="font-semibold font-Protest"> Types : </span>
              {Pokemon.type1} , {Pokemon.type2}
            </div>
          </div>
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
        </>
      )}
    </>
  );
}

export default ImagesDtails;
