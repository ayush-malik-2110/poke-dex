import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { MouseEventHandler } from 'react';
import styled from 'styled-components';
import Box from '@mui/material/Box';


import { Div } from '../BlockComponents';
import ProgressBar from '../../progresBar/ProgressBar';
import { getFormattedStatList, getPokemonImageUrl } from '../../../../util/utils';
import Modal from '../../modal/Modal';
import PokemonName from '../../pokemonName/PokemonName';

export type PokemonDetailsModelProps = {
  showPokeDetailsModal: boolean;
  onClosePokemonDetailsModal: MouseEventHandler<HTMLDivElement>;
  details: { [key: string]: any },
};

const PokemonDetailsModal = ({
                               showPokeDetailsModal,
                               onClosePokemonDetailsModal,
                               details = {},
                             }: PokemonDetailsModelProps) => {
  const { stats, name, id } = details || {}
  const formattedStat = getFormattedStatList(stats)
  const imageUrl = getPokemonImageUrl(id)
  return (
    <Modal
      onCloseModal={onClosePokemonDetailsModal}
      showModal={showPokeDetailsModal}
    >
      <StyledCardDetailsContainer>
        <CrossIconWrapper onClick={onClosePokemonDetailsModal}>
          <HighlightOffIcon />
        </CrossIconWrapper>
        <StyledPokemonImageContainer>
          <StyledPokemonImage src={imageUrl} />
          <PokemonName name={name} variant={'h5'} />
        </StyledPokemonImageContainer>
        <StyledPokemonDetailsContainer>
          {
            formattedStat.map(({ name: statName, value }) => (
              <StyledPokemonDetails key={`stat-${id}-${statName}`}>
                {statName}
                <ProgressBar min={0} max={100} value={value} />
              </StyledPokemonDetails>))
          }
        </StyledPokemonDetailsContainer>
      </StyledCardDetailsContainer>
    </Modal>
  )
}

const CrossIconWrapper = styled.div`
  height: 22px;
  padding: 2px;
  float: right;
`

const StyledPokemonDetailsContainer = styled(Div)``

const StyledPokemonDetails = styled(Div)`
  text-transform: capitalize;
`

const StyledPokemonImageContainer = styled(Div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const StyledPokemonImage = styled.img`
  height: 300px;
  width: 300px;
  @media (max-width: 724px) {
    height: 250px;
    width: 250px;
  }
`

const StyledCardDetailsContainer = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  height: 600px;
  background-color: white;
  border: 2px solid #000;
  padding: 4px;

  @media (max-width: 724px) {
    width: 80%;
  }
`

export default PokemonDetailsModal;