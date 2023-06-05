import { AppBar } from '@mui/material'
import PokemonSearch from '../../../common/design/pokemonSearch/PokemonSearch'
import { FilterAlt } from '@mui/icons-material'
import styled from 'styled-components'
import { Div } from '../../../common/design/BlockComponents'


export type HomePageHeaderProps = {
  onClickFilter: () => void;
}

const HomePageHeader = ({ onClickFilter }: HomePageHeaderProps) => {
  return (
    <AppBar>
      <AppBarContent>
        <SearchWrapper>
          <PokemonSearch />
        </SearchWrapper>
        <FilterIconWrapper onClick={onClickFilter}>
          <FilterAlt />
        </FilterIconWrapper>
      </AppBarContent>
    </AppBar>
  )
}

const SearchWrapper = styled(Div)`
  padding: 2px;
`

const FilterIconWrapper = styled(Div)`
  display: inline-block;
`

const AppBarContent = styled(Div)`
  display: flex;
  padding-top: 5px;
  padding-bottom: 5px;
  float: right;
  flex-direction: row-reverse;
`;

export default HomePageHeader;