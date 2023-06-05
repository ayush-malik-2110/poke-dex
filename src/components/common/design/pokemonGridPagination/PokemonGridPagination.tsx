import { ChangeEvent, useContext } from 'react'
import { Pagination } from '@mui/material'

import { AppContext } from '../../../providers/appProvider/AppContext'

import { fetchPokemonList } from '../../../api/api'
import { getFilterPokemonByStat, searchByPokemon } from '../../../../util/utils'

const PokemonGridPagination = () => {
  const {appData, setAppData} = useContext(AppContext);
  const {
    pageLimit,
    paginationData = {},
    filteredPokemonList,
    isTypeFilterApplied,
    searchText,
    pokemonList,
  } = appData;


  if (!pokemonList?.length || ((pokemonList?.length) < pageLimit)) return null;

  const { paginationPageCount = 0 } = paginationData;

  const onChangePagination = async (e: ChangeEvent<unknown>, page: number) => {
    const offset = (page - 1) * pageLimit;
    let response;
    if (isTypeFilterApplied) {
      const updatedFilteredPokemonList = searchText
        ? searchByPokemon(filteredPokemonList, searchText)
        : filteredPokemonList;
      response = getFilterPokemonByStat(updatedFilteredPokemonList, offset, pageLimit);
    } else  {
      response = await fetchPokemonList({
        limit: pageLimit,
        offset,
      })
    }
    if (response.status === 200) {
      const { data: { results } } = response;
      setAppData({
        ...appData,
        pokemonList: results,
        currentPage: page,
      })
    }
  }
  return (
    <Pagination
      count={paginationPageCount}
      variant="outlined"
      shape="rounded"
      onChange={onChangePagination}
    />
  )
}

export default PokemonGridPagination;