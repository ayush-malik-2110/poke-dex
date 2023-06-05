import { Unstable_Grid2 as MaterialGrid } from '@mui/material'
import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'

import Card from '../card/Card'

export type GridProps = {
  list: Array<any>;
}

const Grid = ({ list = [] }: GridProps) => {
  return (
    <StyledBox>
      <MaterialGrid container rowSpacing={{ md:2, sm: 3, xs: 3 }} columnSpacing={{md: 2, sm: 2, xs: 1}}>
        {list.map(data => (
          <MaterialGrid xs={6} md={3} sm={4} key={data.name}>
            <Card cardData={data} />
          </MaterialGrid>
        ))}
      </MaterialGrid>
    </StyledBox>
  )
}


const StyledBox = styled(Box)`
  width: 80%;
  margin: auto;
`

export default Grid