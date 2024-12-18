import React from "react";
import { 
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Typography,
    Paper
 } from "@mui/material";
import { typeList, colors} from "../resources";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../redux";
import { pokemon } from "../interfaces";


const mapStateToProps = (state: RootState) => {
    return {
        pokemonTeam: state.PokemonTeam.team
    }
} 

const isEmpty = (pokemon: pokemon) => { 
    return pokemon.dex_num == -1
  }

const connector = connect(mapStateToProps);

type Props = ConnectedProps<typeof connector>;



const ResistanceTable = ({pokemonTeam}:Props) => {
    return (
        <TableContainer component={Paper}>
            <Table aria-label="resistance table">
                <TableHead>
                    <TableRow>
                        <TableCell colSpan={4}>Defensive Coverage</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {typeList.map((val: string) => 
                        <TableRow key={val}>
                            <TableCell align='left'>
                                <Typography
                                    variant="body2"
                                    color={colors[val]}
                                    fontWeight= 'medium'>
                                        {val}
                                </Typography>
                            </TableCell>
                            {
                                pokemonTeam.map((pokemon, index) => 
                                <TableCell align='left' >
                                <Typography
                                    variant="body2"
                                    color={colors[val]}
                                    fontWeight="bold">
                                        {pokemon && pokemon.resistances != null && !isEmpty(pokemon)
                                        ? pokemon.resistances[val] : ""}
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