import axios from 'axios';
import React from 'react';


const URL = 'https://api.pikaserve.xyz/pokemon/all'


export const pokemons = [
    
    {
        fetchPokemons: async () =>{
            const response = await axios(URL);
            set({loading: false, pokemonContent: response.data})
        },
        
        id: pokeman.id
       
    }
];