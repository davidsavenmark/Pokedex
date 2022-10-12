import create from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';

const URL = 'https://api.pikaserve.xyz/pokemon/all'

const usePokemonStore = create(
    persist(
      (set, get) => ({
        totalFavoritePokemons: 0,
        pokemonContent: [],
        fetchPokemons: async () =>{
            const response = await axios(URL);
            set({loading: false, pokemonContent: response.data})
        },
        addToStore: (params) => {
          set((state) => ({
            totalFavoritePokemons: state.totalFavoritePokemons + 1,
            pokemonContent: [...state.pokemonContent, params],
          }));
        },
        updateStore: ({ params, myPokemons }) => {
          set((state) => ({
            totalFavoritePokemons: state.totalFavoritePokemons + 1,
            pokemonContent: myPokemons,
          }));
        },
        clearStore: () => set({ totalFavoritePokemons:0, pokemonContent: [] }),
        removeFromStore: (params) =>
          set((state) => ({
            totalFavoritePokemons: state.totalFavoritePokemons - params.quantity,
            pokemonContent: state.pokemonContent.filter(
              (item) => item.id !== params.id
            ),
          })),
      }),
      { name: 'pokemonstore' }
    )
  );
  export default usePokemonStore;