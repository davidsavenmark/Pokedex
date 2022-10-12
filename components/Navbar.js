import React, { useEffect, useState } from 'react'
import usePokemonStore from '../store/store';
import Link from 'next/link'



 const Navbar = () => {
  const totalFavoritePokemons = usePokemonStore((state) => state.totalFavoritePokemons);
  const clearStore = usePokemonStore((state) => state.clearStore);
  const [mytotalFavoritePokemons, setTotalFavoritePokemons] = useState();

  useEffect(() => {
    setTotalFavoritePokemons(totalFavoritePokemons);
  }, [totalFavoritePokemons]);

  return (
    <div className='h-20 p-2 flex items-center justify-center bg-poke-red shadow-[0_4px_50px_poke-red]'>
    <Link href="/">
        <a>
            <img src="../images/pokedexlogo.png" alt="" className='h-[54px] w-[200px]'></img>
        </a>
    </Link>

    <div className='flex flex-wrap'>
      
      <img src="../images/pokemonball.png" alt="" className='h-[52px] w-[60px] ml-14 pt-3 hover:scale-x-125 scale-y-140 cursor-pointer'/>
      <div className='pt-8 ml-2'>
          {mytotalFavoritePokemons}
      </div>
    </div>
    </div>
    
  );
};

export default Navbar