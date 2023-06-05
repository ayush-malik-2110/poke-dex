import { useContext, useEffect, } from 'react'
import styled, { css } from 'styled-components'

import { useAPI } from '../../hooks/useAPI'
import { fetchPokemon } from '../../api/api'
import { AppContext } from '../../providers/appProvider/AppContext'
import { Div } from '../../common/design/BlockComponents'
import PokemonGrid from './pokemonGrid/PokemonGrid'
import PokemonTypeFilterModal from '../../common/design/pokemonTypeFilterModal/PokemonTypeFilterModal'
import HomePageHeader from './homePageHeader/HomePageHeader'
import { calculatePaginationPageCount } from '../../../util/utils'

const HomePage = () => {
  const { appData, setAppData } = useContext(AppContext);

  const { pageLimit } = appData;
  const { response,  loading } = useAPI(fetchPokemon(pageLimit));



  useEffect(() => {
    if (response?.results) {
      const { count } = response
      setAppData({
        ...appData,
        pokemonList: response.results,
        paginationData: {
          totalCount: count,
          paginationPageCount: calculatePaginationPageCount(count, pageLimit),
        },
      });
    }
  }, [response])


  if (loading) {
    return <StyledHomePage>
      loading...
    </StyledHomePage>
  }

  if (response?.results && !response.results.length) {
    return <StyledHomePage>No pokemon</StyledHomePage>
  }

  const onClickFilter = () => {
    setAppData({
      ...appData,
      showPokemonTypeFilterModal: true,
    })
  }

  return (
    <StyledHomePage>
      <HomePageHeader onClickFilter={onClickFilter} />
      <PokemonGrid />
      <PokemonTypeFilterModal />
    </StyledHomePage>
  )
}

const StyledHomePage = styled(Div)(() => css`
  min-width: 100%;
  min-height: 100%;
  padding: 20px 0 20px 0;
`)


export default HomePage