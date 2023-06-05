import Fuse from 'fuse.js'

export const formatPokemonListFromType = (pokemonByTypeList = []) => {
  return pokemonByTypeList.map(({ pokemon }) => pokemon);
}

export const getFilterPokemonByStat = (pokemonList, offset, pageLimit) => {
  return {
    status: 200,
    data: {
      results: pokemonList.slice((offset), (offset + pageLimit)),
    }
  }
};

export const searchByPokemon = (pokemonList, searchText) => {
   const options = {
     keys: ['name'],
     includeScore: 1,
     threshold: 0.0,
   }
   const fuse = new Fuse(pokemonList, options);
   return fuse.search(searchText).map(({item}) => item);
};

export const normalise = (value, min, max) => ((value - min) * 100) / (max - min);

export const getPokemonIdByUrl = (url) => {
  if (!url.length) return;
  const arr = url.split('/');
  return arr[(arr.length - 2)];
}

export const getPokemonImageUrl = id => {
  return `https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${id}.svg`
}

export const getFormattedStatList = (stats  = []) => {
  return stats.map(({base_stat, stat: { name }}) => ({name, value: base_stat}));
}

export const formatPokemonSearchData = (response) => {
  const { data: { name, id } } = response;
  return [{ name, url: `https://pokeapi.co/api/v2/pokemon/${id}/` }]
}

export const calculatePaginationPageCount = (count, pageLimit) => {
  return count % pageLimit
    ? (Math.trunc(count / pageLimit) + 1)
    : Math.trunc(count / pageLimit);
}