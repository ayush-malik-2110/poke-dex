import styled from 'styled-components'
import { Div } from '../../../common/design/BlockComponents'
import Grid from '../../../common/grid/Grid'
import { useContext } from 'react'
import { AppContext } from '../../../providers/appProvider/AppContext'
import PokemonGridPagination from '../../../common/design/pokemonGridPagination/PokemonGridPagination'


const PokemonGrid = () => {
  const {appData} = useContext(AppContext);
  const { pokemonList = [] } = appData
  return (
    <StyledPokemonGridContainer>
      <Grid list={pokemonList} />
      <StyledPaginationContainer>
        <PokemonGridPagination />
      </StyledPaginationContainer>
    </StyledPokemonGridContainer>
  )
};

const StyledPaginationContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 20px   ;
`;

const StyledPokemonGridContainer = styled(Div)`
  width: 100%;
  padding-bottom: 20px;
  padding-top: 65px;
`;

export default PokemonGrid;