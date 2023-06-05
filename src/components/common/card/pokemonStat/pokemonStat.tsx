import { Typography } from '@mui/material'

export type PokemonStatProps = {
  title: string;
  value: string;
}
const PokemonStat = ({title, value}: PokemonStatProps): JSX.Element => {
  if (!title) return (<></>);
 return (
   <Typography gutterBottom variant="p" component="div">
     {
       `${title} : ${value}`
     }
   </Typography>
 );
}

export default PokemonStat;