import { 
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Typography,
    Paper,
    Avatar
 } from "@mui/material";
import { pokemonTypeList, asTitle, emptySprite, PokemonType} from "../resources";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../redux";
import { pokemon } from "../interfaces";

const mapStateToProps = (state: RootState) => {
    return {
        pokemonTeam: state.PokemonTeam.team
    }
} 

const isEmpty = (pokemon: pokemon) => { 
    return pokemon.id == -1
  }

const connector = connect(mapStateToProps);

type Props = ConnectedProps<typeof connector>;



const ResistanceTable = ({pokemonTeam}:Props) => {
    return (
        <TableContainer component={Paper}>
            <Table aria-label="resistance table" sx={{backgroundColor: '#eceff4', border: '1px solid #d8dee9'}}>
                <TableHead>
                    <TableRow>
                        <TableCell >Defensive Coverage</TableCell>
                        {
                            pokemonTeam.map((pokemon, index) => 
                                pokemon && pokemon.sprite != null && pokemon.sprite != 'None' && !isEmpty(pokemon) ?
                                <TableCell align='left'>
                                    <Avatar alt={pokemon.name} src={ pokemon.sprite} />
                                </TableCell>
                                :
                                <TableCell align='left'><Avatar alt="" src={emptySprite} /></TableCell>
                            
                            )
                        }
                    </TableRow>
                </TableHead>
                <TableBody>
                    {pokemonTypeList.map((pokemonType: PokemonType) => 
                        <TableRow key={pokemonType.text}>
                            <TableCell align='left'>
                                <Typography
                                    variant="body2"
                                    color={pokemonType.color}
                                    fontWeight= 'medium'>
                                        {asTitle(pokemonType.text)}
                                </Typography>
                            </TableCell>
                            {
                                pokemonTeam.map((pokemon, index) => 
                                <TableCell align='left' >
                                <Typography
                                    variant="body2"
                                    color={pokemonType.color}
                                    fontWeight="bold">
                                        {pokemon && pokemon.resistances != null && !isEmpty(pokemon)
                                        ? pokemon.resistances[pokemonType.text] : ""}
                                </Typography>
                            </TableCell>)
                            }
                            
                        </TableRow>
                    )
            
                    }
                </TableBody>

            </Table>
        </TableContainer>
    )
 }

export default connector(ResistanceTable);