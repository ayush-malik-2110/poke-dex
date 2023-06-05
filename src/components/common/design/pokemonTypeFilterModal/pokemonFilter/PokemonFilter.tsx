import { Checkbox } from '@mui/material'
import { ChangeEvent } from 'react'
import { Div } from '../../BlockComponents'
import styled from 'styled-components'

export type PokemonFilterProps = {
  name: string;
  appliedFilter: Array<string>;
  onChangeFilter: (e: ChangeEvent, name: string) => void;
}

const PokemonFilter = ({
                         appliedFilter, onChangeFilter, name,
                       }: PokemonFilterProps) => {
  return (
    <PokemonFilterContainer>
      <StyledPokemonFilter>
        <Checkbox
          size={'small'}
          checked={appliedFilter.includes(name)}
          onChange={(e: ChangeEvent) => onChangeFilter(e, name)}
        />
        {name}
      </StyledPokemonFilter>
    </PokemonFilterContainer>
  )
}

const StyledPokemonFilter = styled(Div)`
  padding: 3px;
`

const PokemonFilterContainer = styled(Div)`
  font-size: 16px;
  text-transform: capitalize;
  width: 100%;
  display: flex;
  .MuiCheckbox-root {
    padding: 0 2px 0 0; 
  }
`

export default PokemonFilter