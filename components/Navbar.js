import React, { useEffect, useState, useContext } from 'react'
import Link from 'next/link'
import FavoriteContext from '../contexts/favoritesContext';

 const Navbar = () => {
 const { favoritePokemons } = useContext(FavoriteContext);
  return (
    <div className='h-20 p-2 flex items-center justify-center bg-poke-red shadow-[0_4px_50px_poke-red]'>
    <Link href="/">
        <a>
            <img src="../images/pokedexlogo.png" alt="" className='h-[54px] w-[200px]'></img>
        </a>
    </Link>

    
    <div className='flex flex-wrap'>
    <Link href="/favoritePokemons">
      <img src="../images/pokemonball.png" alt="" className='h-[52px] w-[60px] ml-14 pt-3 hover:scale-x-125 scale-y-140 cursor-pointer'/>
      </Link>
      <div className='pt-8 ml-2'>
          {favoritePokemons.length}
      </div>
    </div>
    </div>
    
    
   
    
  );
};

export default Navbar