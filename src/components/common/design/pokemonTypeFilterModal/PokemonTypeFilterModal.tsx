import { ChangeEvent, useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Button } from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

import Modal from '../../modal/Modal';
import { useAPI } from '../../../hooks/useAPI';
import {
  fetchPokemonByTypes,
  fetchPokemonList,
  fetchPokemonTypes,
  searchPokemon
} from '../../../api/api';
import Loader from '../../loader/loader';
import { AppContext } from '../../../providers/appProvider/AppContext';
import { Div } from '../BlockComponents';
import { calculatePaginationPageCount, formatPokemonListFromType, searchByPokemon } from '../../../../util/utils'
import PokemonFilter from './pokemonFilter/PokemonFilter';
import { BUTTON_CONSTANTS } from '../../../../constants/ButtonConstants';
import { ERROR_MESSAGES } from '../../../../constants/ErrorMessages'


const PokemonTypeFilterModal = () => {
  const { appData, setAppData } = useContext(AppContext)
  const {
    showPokemonTypeFilterModal,
    pageLimit,
    searchText,
  } = appData
  const [pokemonTypeList, setPokemonTypeList] = useState([])
  const [appliedFilter, setAppliedFilter] = useState<Array<string>>([])

  const { response, loading, } = useAPI(fetchPokemonTypes())

  useEffect(() => {
    if (response?.results.length) {
      const { results } = response
      setPokemonTypeList(results)
      setAppData({
        ...appData,
        pokemonTypeList: results,
      })
    }
  }, [response])

  const onCloseModal = () => {
    setAppData({
      ...appData,
      showPokemonTypeFilterModal: false,
    })
  }

  const callFetchPokemonByTypes = async () => {
    return await fetchPokemonByTypes(appliedFilter[0])
  }

  const callFetchPokemon = async () => {
    return await fetchPokemonList({ limit: pageLimit, offset: 0 });
  }

  const callSearchPokemon = async () => {
    return await searchPokemon({
      limit: pageLimit,
      pokemon: searchText,
    })
  }

  const onApplyFilter = () => {
    if (!appliedFilter.length) {
      if(searchText) {
        callSearchPokemon().then(response => {
          if (response.status === 200) {
            const { data: { name, id } } = response
            setAppData({
              ...appData,
              searchText,
              currentPage: 1,
              pokemonList: [{ name, url: `https://pokeapi.co/api/v2/pokemon/${id}/` }],
              appliedTypeFilter: appliedFilter,
              isTypeFilterApplied: !!appliedFilter.length,
              showPokemonTypeFilterModal: false,
              paginationData: {
                totalCount: 1,
                paginationPageCount: calculatePaginationPageCount(1, pageLimit)
              },
            })
          }
        }).catch(error => {
          console.error('Error occurred while searching pokemon', error);
        });
        return;
      }
      callFetchPokemon()
        .then((response) => {
          const { data: { results }} = response;
          const searchedPokemonList = searchText
            ? searchByPokemon(results, searchText)
            : results;

          const count = searchedPokemonList.length;
          setAppData({
            ...appData,
            paginationData: {
              totalCount: count,
              paginationPageCount: calculatePaginationPageCount(count, pageLimit),
            },
            pokemonList: searchedPokemonList,
            filteredPokemonList: [],
            showPokemonTypeFilterModal: false,
            appliedTypeFilter: appliedFilter,
            isTypeFilterApplied: !!appliedFilter.length,
            currentPage: 1,
          })
        })
        .catch((error)=> {
          console.error(ERROR_MESSAGES.FETCH_POKEMON, error);
        });
      return;
    }

    // onCloseModal();
    callFetchPokemonByTypes()
      .then((response) => {
        const { data: { pokemon = [] } = {} } = response

        const formattedPokemon = formatPokemonListFromType(pokemon);
        const searchedPokemonList = searchText
          ? searchByPokemon(formattedPokemon, searchText)
          : formattedPokemon;

        const count = searchedPokemonList.length;

        setAppData({
          ...appData,
          paginationData: {
            totalCount: count,
            paginationPageCount: calculatePaginationPageCount(count, pageLimit)
          },
          pokemonList: searchedPokemonList.slice(0, pageLimit),
          filteredPokemonList: formattedPokemon,
          showPokemonTypeFilterModal: false,
          appliedTypeFilter: appliedFilter,
          isTypeFilterApplied: !!appliedFilter.length,
          currentPage: 1,
        })
      }).catch((error => {
      console.error(ERROR_MESSAGES.FILTER_POKEMON, error)
    }))
  }


  const onChangeFilter = (event: ChangeEvent, name: string) => {

    if ((event.target as HTMLInputElement).checked) {
      setAppliedFilter([...appliedFilter, name])
    } else {
      setAppliedFilter(appliedFilter.filter(typeName => typeName !== name))
    }
  }

  if (loading) {
    return <Loader />
  }

  return (
    <Modal
      showModal={showPokemonTypeFilterModal}
      onCloseModal={onCloseModal}
    >
      <FilterContentWrapper>
        <CrossIconWrapper onClick={onCloseModal}>
          <HighlightOffIcon />
        </CrossIconWrapper>
        {
          pokemonTypeList.map(({ name }) => (
            <PokemonFilter
              key={`type-${name}`}
              name={name}
              appliedFilter={appliedFilter}
              onChangeFilter={onChangeFilter}
            />
          ))
        }
        <ApplyButtonContainer>
          <Button variant='outlined' onClick={onApplyFilter}>
            {BUTTON_CONSTANTS.APPLY}
          </Button>
        </ApplyButtonContainer>
      </FilterContentWrapper>
    </Modal>
  )
}

const CrossIconWrapper = styled.div`
  height: 22px;
  padding: 2px;
  position: fixed;
  right: 0;
  top: 0;
`;


const FilterContentWrapper = styled(Div)`
  background-color: white;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 200px;
  padding: 20px 4px 20px 4px;
`

const ApplyButtonContainer = styled(Div)`
  text-align: center;
`;

export default PokemonTypeFilterModal