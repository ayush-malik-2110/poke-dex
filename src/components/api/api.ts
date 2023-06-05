import { AXIOS_METHODS } from '../../vendors/axios'
import axios from 'axios'

export const fetchPokemon = (pageLimit: number) => ({
  url: `https://pokeapi.co/api/v2/pokemon/?limit=${pageLimit}&offset=0`,
  method: AXIOS_METHODS.GET,
})

export type fetchPokemonData = {
  url: String,
}
export const fetchPokemonData = (url: string) => ({
  url,
  method: AXIOS_METHODS.GET,
})

export type fetchPokemonListAPIProps = {
  limit: number,
  offset: number,
}
export const fetchPokemonList = ({ limit, offset }: fetchPokemonListAPIProps) => {
  const url = `https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`
  const headers = {
    'Content-type': 'application/json',
    'Accept': 'application/json',
  }

  return axios.get(url, { headers })
}

export type searchPokemonAPIProps = {
  pokemon: string,
  limit: number,
}
export const searchPokemon = ({ pokemon, limit }: searchPokemonAPIProps) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase()}?limit=${limit}&offset=0`
  const headers = {
    'Content-type': 'application/json',
    'Accept': 'application/json',
  }

  return axios.get(url, { headers })
}

export const fetchPokemonTypes = () => ({
  url: `https://pokeapi.co/api/v2/type`,
  method: AXIOS_METHODS.GET,
})

export const fetchPokemonByTypes = (type: string) => {
  const url = `https://pokeapi.co/api/v2/type/${type}`
  const headers = {
    'Content-type': 'application/json',
    'Accept': 'application/json',
  }

  return axios.get(url, { headers })
}