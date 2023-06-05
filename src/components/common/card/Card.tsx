import { useEffect, useState } from 'react'
import styled from 'styled-components'
import {
  Card as MaterialCard,
  CardContent,
} from '@mui/material'


import { useAPI } from '../../hooks/useAPI'
import { fetchPokemonData } from '../../api/api'
import PokemonStat from './pokemonStat/pokemonStat'
import PokemonName from '../pokemonName/PokemonName'
import { Div } from '../design/BlockComponents'
import { getPokemonIdByUrl, getPokemonImageUrl } from '../../../util/utils'
import PokemonDetailsModal from '../design/pokemonDetailsModal/PokemonDetailsModal'

export type CardProps = {
  cardData: { name: string; url?: string; };
}

const Card = ({ cardData }: CardProps) => {
  const { name = '', url = '' } = cardData
  const [pokeData, setPokeData] = useState<any>({ stats: [], types: [] })
  const [showPokeDetailsModal, setShowPokeDetailsModal] = useState(false);
  const id = getPokemonIdByUrl(url)

  const { response, loading } = useAPI(fetchPokemonData(url))

  useEffect(() => {
    if (response?.id) {
      const { types, stats } = response
      setPokeData({
        stats,
        types,
      })
    }
  }, [response]);

  if (loading) {
    return <StyledCard>
      loading...
    </StyledCard>
  }

  return (
    <StyledCard onClick={() => setShowPokeDetailsModal(true)}>
      <PokemonImageContainer>
        <PokemonImage src={getPokemonImageUrl(id)} />
      </PokemonImageContainer>
      <CardContent>
        <PokemonName name={name} />
        <PokemonStat
          title={'Type'}
          value={pokeData?.types[0]?.type?.name || 'NA'}
        />
        <PokemonStat
          title={pokeData?.stats[0]?.stat?.name.toUpperCase() || ''}
          value={pokeData?.stats[0]?.base_stat || 'NA'}
        />
      </CardContent>
      <PokemonDetailsModal
        details={response}
        showPokeDetailsModal={showPokeDetailsModal}
        onClosePokemonDetailsModal={(e: MouseEvent) => {
          setShowPokeDetailsModal(false)
          e.stopPropagation();
        }}
      />
    </StyledCard>
  )
}

const StyledCard = styled(MaterialCard)`
  &:hover {
    transform: scale(1.1);
  }
`

const PokemonImageContainer = styled(Div)`
  height: 180px;
  width: 180px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  @media (max-width: 724px) {
    width: 110px;
    height: 110px;
    padding-top: 8px;
  }
`
const PokemonImage = styled.img`
  height: 100%;
  width: 100%;
  object-fit: contain;
`
export default Card