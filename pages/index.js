import Layout from "../components/Layout";
import  React, {useState, useEffect, useContext} from "react";
import { FavoriteProvider } from "../contexts/favoritesContext";
import FavoriteContext from "../contexts/favoritesContext";
import Link from 'next/link'

const favoritesKey = "f"
export default function Home({styles, pokeData}) {
  const [searchResults, setSearchResults] = useState(pokeData)
  const [pokeArray, setPokeArray] = useState(searchResults.slice(0,20))
  const [pageNumber, setPageNumber] = useState(0)
  const [input, setInput] = useState("")
  const [filter, setFilter] = useState("All")
  const [favorites, setFavorites] = useState(pokeArray);
  const {favoritePokemons, updateFavoritePokemons} = useContext(FavoriteContext)



  useEffect(() => {
    setPokeArray(searchResults.slice(pageNumber * 20, (pageNumber*20)+20))
  }, [pageNumber])


  useEffect(() => {
    setPokeArray(searchResults.slice(0,20))
  }, [searchResults])
  

  useEffect(() => {
  if(input.length ===0 && filter === "All"){
    setSearchResults(pokeData)
    return 
  }
  if(input.length !== 0 && filter && filter === "All"){
    setSearchResults(c=>(pokeData.filter((pokeman)=>{
      return pokeman.name.english.toLowerCase().includes(input.toLowerCase())
    })))
    return
  }
  if(input.length === 0 && filter && filter !== "All"){
    setSearchResults(c=>(pokeData.filter((pokeman)=>{
      return pokeman.type.includes(filter)
    })))
    return
  }
  if(input.length !== 0 && filter && filter !== "All"){
    setSearchResults(c=>(pokeData.filter((pokeman)=>{
      return pokeman.type.includes(filter)
      && pokeman.name.english.toLowerCase().includes(input.toLowerCase())
    })))
    return 
  }
  }, [input,filter])
 
  const handlePrev=()=>{
    setPageNumber(c=> {return c-1})
  }

  const handleNext=()=>{
    setPageNumber(c=> {return c+1})
  }
  const handleInputChange = (e) =>{
    setInput(e.target.value)
  }

  const handleFilterChange = (e) =>{
    setFilter(e.target.value)
  }

  const loadFavoritePokemons = () => {
    const pokemons = JSON.parse(window.localStorage.getItem(favoritesKey)) || []
    setFavorites(pokemons)
  }

  useEffect(() => {
    loadFavoritePokemons()
  }, []);

  const updateFavoritePokemans = (name) =>{
    const updatedFavorites = [...favorites]
    const favoriteIndex = favorites.indexOf(name)
    if(favoriteIndex >= 0){
      updatedFavorites.slice(favoriteIndex, 1);
      
    }else{
      updatedFavorites.push(name);
    }
    setFavorites(updatedFavorites);
  }
  
 
  const onPokeballClick = () => {
   
    console.log("add to favorites")
    updateFavoritePokemons(pokeman.name)
  }
  
  
  return (
    <FavoriteProvider value={{
      favoritePokemons: favorites,
      updateFavoritePokemons: updateFavoritePokemans,
    }}>
  <Layout title={"PokeDéx"}>
   
    <div className="flex justify-center pt-12">
      <input type="text" placeholder="Search" className="mx-8 w-full sm:w-3/4 bg-gray-100 px-6 py-2 rounded border border-poke-yellow outline-none"
      onChange={handleInputChange} value={input}/>
    </div>
    <div className="flex px-8 sm:px-16 py-4 items-center text-md">
      <label htmlFor="types" className="block mr-6 font-medium text-gray-900 text-lg sm:text-2xl">Type</label>
      <select name="types" id="types" defaultValue={"All"} className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full"
      onChange={handleFilterChange} value={filter}>
        
        <option value="All"  >
          All
        </option>
        <option value="Normal" aria-setsize={50}>Normal</option>
        <option value="Fire">Fire</option>
        <option value="Water">Water</option>
        <option value="Electric">Electric</option>
        <option value="Grass">Grass</option>
        <option value="Ice">Ice</option>
        <option value="Fighting">Fighting</option>
        <option value="Poison">Poison</option>
        <option value="Ground">Ground</option>
        <option value="Flying">Flying</option>
        <option value="Psychic">Psychic</option>
        <option value="Bug">Bug</option>
        <option value="Rock">Rock</option>
        <option value="Ghost">Ghost</option>
        <option value="Dragon">Dragon</option>
        <option value="Dark">Dark</option>
        <option value="Steel">Steel</option>
        <option value="Fairy">Fairy</option>
      </select>
    </div>
    <div className="flex flex-wrap justify-center mx-auto my-20 ">
      
      {
        pokeArray.map((pokeman,i) =>{
          return(
            <div key={pokeman.name.english} className="p-4">

              <button onClick={()=>{
                  onPokeballClick({
                  })
                }}>

              <img src="../images/pokemonball.png" 
                   alt="" 
                   className='mr-5 h-[32px] w-[32px]  pt-3 hover:scale-x-125 scale-y-140 cursor-pointer'
             />
             
              </button>
             
              <Link href={`/pokemons/${pokeman.id}`}><a>
                
              <div className="bg-slate-300 py-4 px-6 rounded-lg  ">
                
             
                <img 
                src={pokeman.image.hires} 
                alt="" 
                className=" h-[150px] w-[150px] sm:h-[200px] sm:w-[200px] my-6"
                />
                <div className="text-center">
                  { pokeman.type.map((type, j)=>{
                    return(
                      <span key={type} className=" text-white text-xs font-semibold mr-2 px-2.5 py-0.5 rounded" style={{backgroundColor:styles[type.toLowerCase()]}}>
                        {type}
                      </span>
                    )
                  })}

                </div>
                <p className="text-center">
                  <span className="font-poppins text-3xl mr-2">
                  {`${pokeman.id}.`}
                  </span>
                  <span className="text-3xl">
                    {pokeman.name.english}
                  </span>
                </p>
              </div>
              </a>
              </Link>
              
            </div>
            
          )
          
        })
        
      }
        
    </div>
   
    <div className="container mx-auto flex flex-wrap justify-center pb-8">

    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded mr-2 disabled:bg-gray-700 " 
    onClick={handlePrev} disabled={pageNumber ===0?true:false}>Prev
    </button>
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded ml-2 left-3  disabled:bg-gray-700 " 
    onClick={handleNext} disabled={searchResults.length/20-pageNumber<1?true:false}>Next
    </button>

    </div>
  </Layout>
  </FavoriteProvider>

  );
}
export async function getStaticProps(){
  try{
    const res = await fetch('https://api.pikaserve.xyz/pokemon/all')
    const data = await res.json()
    return{
      props:{
        pokeData:data,
        styles:{
          normal:"#A8A77A" ,
          fire:"#EE8130" ,
          water:"#6390F0",
          electric:"#F7D02C" ,
          grass:"#7AC74C" ,
          ice:"#96D9D6" ,
          fighting:"#C22E28" ,
          poison:"#A33EA1" ,
          ground:"#E2BF65" ,
          flying:"#A98FF3" ,
          psychic:"#F95587" ,
          bug:"#A6B91A" ,
          rock:"#B6A136" ,
          ghost:"#735797" ,
          dragon:"#6F35FC" ,
          dark:"#705746" ,
          steel:"#B7B7CE" ,
          fairy:"#D685AD" ,
        }
      }
    }
  }catch(error){
    console.log(error)
  }

}