import { Typography } from '@mui/material'
import styled from 'styled-components'
import { Div } from '../design/BlockComponents'

export type PokemonNameProps = {
  name: string,
  variant?: string,
}

const PokemonName = ({ name, variant = 'p' }: PokemonNameProps): JSX.Element => {
  if (!name) return <></>;
  return (
    <StyledNameContainer>
      <Typography gutterBottom variant={variant} component='div'>
        {name}
      </Typography>
    </StyledNameContainer>
  )
}

const StyledNameContainer = styled(Div)`
  text-transform: capitalize;
  font-weight: 900;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export default PokemonName