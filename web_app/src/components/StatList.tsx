import { List, ListItem, ListItemText } from "@mui/material";
import { stats } from "../interfaces";


interface Props {
    stats: stats
}


const StatList = ({stats}: Props) => {

    const convertToWidth = (value: number) => ((value/255)*100+30).toFixed(0);

    return (
        <List sx={{
            width: '100%',
            height: '100%',
            border: '1px solid #d8dee9',
            position: 'relative',
            padding: 0
            }}>
                <ListItem sx= {{bgcolor:'#f6685e', width: `${convertToWidth(stats.hp)}%`}} component="div"  divider>
                <ListItemText
                    primary={`HP: ${stats.hp.toFixed(0)}`}
                    primaryTypographyProps={{
                        color: '#2e3440',
                        fontWeight: 'bold',
                        variant: "body2",
                    }}/>
            </ListItem>
            <ListItem sx= {{bgcolor:'#ffac33', width: `${convertToWidth(stats.attack)}%`}} component="div"  divider>
                <ListItemText
                    primary={`ATTACK: ${stats.attack.toFixed(0)}`}
                    primaryTypographyProps={{
                        color: '#2e3440',
                        fontWeight: 'bold',
                        variant: "body2",
                    }}/>
            </ListItem>
            <ListItem sx= {{bgcolor:'#ffef62', width: `${convertToWidth(stats.defense)}%`}} component="div"  divider>
                <ListItemText
                    primary={`DEFENSE: ${stats.defense.toFixed(0)}`}
                    primaryTypographyProps={{
                        color: '#2e3440',
                        fontWeight: 'bold',
                        variant: "body2",
                    }}/>
            </ListItem>
            <ListItem sx= {{bgcolor:'#33c9dc', width: `${convertToWidth(stats.special_attack)}%`}} component="div"  divider>
                <ListItemText
                    primary={`SP. ATTACK: ${stats.special_attack.toFixed(0)}`}
                    primaryTypographyProps={{
                        color: '#2e3440',
                        fontWeight: 'bold',
                        variant: "body2",
                    }}/>
            </ListItem>
            <ListItem sx= {{bgcolor:'#6fbf73', width: `${convertToWidth(stats.special_defense)}%`}} component="div"  divider>
                <ListItemText
                    primary={`SP. DEFENSE: ${stats.special_defense.toFixed(0)}`}
                    primaryTypographyProps={{
                        color: '#2e3440',
                        fontWeight: 'bold',
                        variant: "body2",
                    }}/>
            </ListItem>
            <ListItem sx= {{bgcolor:'#ed4b82', width: `${convertToWidth(stats.speed)}%`}} component="div"  divider>
                <ListItemText
                    primary={`SPEED: ${stats.speed.toFixed(0)}`}
                    primaryTypographyProps={{
                        color: '#2e3440',
                        fontWeight: 'bold',
                        variant: "body2",
                }}/>
            </ListItem>
            <ListItem component="div" >
                <ListItemText
                    primary={`TOTAL: ${stats.base_stat_total.toFixed(0)}`}
                    primaryTypographyProps={{
                        color: '#434c5e',
                        fontWeight: 'bold',
                        variant: "body2",
                }}/>
            </ListItem>

        </List>
    );
}

export default StatList;