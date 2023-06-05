import { ChangeEvent, useContext, useState } from 'react'
import { Search as SearchIcon } from '@mui/icons-material'
import styled, { css } from 'styled-components'
import { InputBase } from '@mui/material'


import { AppContext } from '../../../providers/appProvider/AppContext'
import { fetchPokemonList, searchPokemon } from '../../../api/api'
import {
  calculatePaginationPageCount,
  formatPokemonSearchData,
  searchByPokemon
} from '../../../../util/utils';
import { ERROR_MESSAGES } from '../../../../constants/ErrorMessages';

const PokemonSearch = () => {
  const { appData, setAppData } = useContext(AppContext)
  const { pageLimit, isTypeFilterApplied, filteredPokemonList } = appData
  const [searchText, setSearchText] = useState('')


  const callSearchPokemon = async () => {
    return await searchPokemon({
      limit: pageLimit,
      pokemon: searchText,
    })
  }

  const onSearch = async () => {
    if (searchText) {

      if (isTypeFilterApplied) {
        const result = searchByPokemon(filteredPokemonList, searchText);
        const count = result.length;
        setAppData({
          ...appData,
          pokemonList: result,
          currentPage: 1,
          searchText,
          paginationData: {
            totalCount: count,
            paginationPageCount: calculatePaginationPageCount(count, pageLimit),
          },
        });
        return;
      }

      callSearchPokemon().then(response => {
        if (response.status === 200) {
          setAppData({
            ...appData,
            searchText,
            currentPage: 1,
            pokemonList: formatPokemonSearchData(response),
            paginationData: {
              totalCount: 1,
              paginationPageCount: calculatePaginationPageCount(1, pageLimit),
            },
          })
        }
      }).catch(error => {
        console.error(ERROR_MESSAGES.SEARCH_FAILED, error);
      });

    }
  }

  const callFetchPokemonList = async () => {
    return await fetchPokemonList({
      limit: pageLimit,
      offset: 0,
    })
  }
  const onChangeSearchText = (event: ChangeEvent) => {
    const target = event.target as HTMLInputElement
    if (searchText.length && !target.value.length) {
      if (isTypeFilterApplied) {
        const count = filteredPokemonList.length;
        setAppData({
          ...appData,
          pokemonList: filteredPokemonList.slice(0, pageLimit),
          currentPage: 1,
          searchText: '',
          paginationData: {
            totalCount: count,
            paginationPageCount: calculatePaginationPageCount(count, pageLimit),
          },
        });
      } else {
        callFetchPokemonList().then((response) => {
          if (response?.data?.results) {
            const { data: { count, results } = {} } = response
            setAppData({
              ...appData,
              searchText: '',
              pokemonList: results,
              currentPage: 1,
              paginationData: {
                totalCount: count,
                paginationPageCount: calculatePaginationPageCount(count, pageLimit),
              },
            })
          }
        })
      }
    }
    setSearchText(target.value)
  }

  return (
    <SearchContainer>
      <StyledInputBase
        onChange={onChangeSearchText}
        placeholder='Search'
        inputProps={{ 'aria-label': 'search' }}
      />
      <SearchIconWrapper onClick={onSearch}>
        <SearchIcon />
      </SearchIconWrapper>
    </SearchContainer>
  )
}

const StyledInputBase = styled(InputBase)(() => css`
  color: inherit;

  .MuiInputBase-input {
    padding: 1px 1px 1px 4px;
    width: 100%;
    background-color: white;
    height: 26px;
  }
`)

const SearchIconWrapper = styled.div`
  align-items: center;
  justify-content: center;
  background-color: #1976d2;
  display: flex;
`


const SearchContainer = styled('div')(() => css`
  position: relative;
  display: flex;
  background-color: alpha(theme.palette.common.white, 0.15);

  &:hover {
    background-color: alpha(theme.palette.common.white, 0.25);
  }

  margin-right: 2px;
  margin-left: 0;
  width: 100%;
  border: 1px solid white;
`)

export default PokemonSearch