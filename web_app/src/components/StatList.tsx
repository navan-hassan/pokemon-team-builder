import { List, ListItem, ListItemText } from "@mui/material";
import { stats } from "../interfaces";


interface Props {
    stats: stats
}


const StatList = ({stats}: Props) => {
    return (
        <List sx={{
            width: '100%',
            height: '100%',
            bgcolor: '#d8dee9',
            position: 'relative',
            overflow: 'auto'}}>
                <ListItem sx= {{bgcolor:'#f6685e', width: `${((stats.hp/255)*100+30).toFixed(0)}%`}} component="div" disablePadding divider>
                <ListItemText
                    primary={`HP: ${stats.hp.toFixed(0)}`}
                    primaryTypographyProps={{
                        color: '#2e3440',
                        fontWeight: 'medium',
                        variant: "body2",
                    }}/>
            </ListItem>
            <ListItem sx= {{bgcolor:'#ffac33', width: `${((stats.attack/255)*100+30).toFixed(0)}%`}} component="div" disablePadding divider>
                <ListItemText
                    primary={`ATTACK: ${stats.attack.toFixed(0)}`}
                    primaryTypographyProps={{
                        color: '#2e3440',
                        fontWeight: 'medium',
                        variant: "body2",
                    }}/>
            </ListItem>
            <ListItem sx= {{bgcolor:'#ffef62', width: `${((stats.defense/255)*100+30).toFixed(0)}%`}} component="div" disablePadding divider>
                <ListItemText
                    primary={`DEFENSE: ${stats.defense.toFixed(0)}`}
                    primaryTypographyProps={{
                        color: '#2e3440',
                        fontWeight: 'medium',
                        variant: "body2",
                    }}/>
            </ListItem>
            <ListItem sx= {{bgcolor:'#33c9dc', width: `${((stats.special_attack/255)*100+30).toFixed(0)}%`}} component="div" disablePadding divider>
                <ListItemText
                    primary={`SP. ATTACK: ${stats.special_attack.toFixed(0)}`}
                    primaryTypographyProps={{
                        color: '#2e3440',
                        fontWeight: 'medium',
                        variant: "body2",
                    }}/>
            </ListItem>
            <ListItem sx= {{bgcolor:'#6fbf73', width: `${((stats.special_defense/255)*100+30).toFixed(0)}%`}} component="div" disablePadding divider>
                <ListItemText
                    primary={`SP. DEFENSE: ${stats.special_defense.toFixed(0)}`}
                    primaryTypographyProps={{
                        color: '#2e3440',
                        fontWeight: 'medium',
                        variant: "body2",
                    }}/>
            </ListItem>
            <ListItem sx= {{bgcolor:'#ed4b82', width: `${((stats.speed/255)*100+30).toFixed(0)}%`}} component="div" disablePadding divider>
                <ListItemText
                    primary={`SPEED: ${stats.speed.toFixed(0)}`}
                    primaryTypographyProps={{
                        color: '#2e3440',
                        fontWeight: 'medium',
                        variant: "body2",
                }}/>
            </ListItem>
            <ListItem component="div" disablePadding divider>
                <ListItemText
                    primary={`TOTAL: ${stats.base_stat_total.toFixed(0)}`}
                    primaryTypographyProps={{
                        color: '#434c5e',
                        fontWeight: 'medium',
                        variant: "body2",
                }}/>
            </ListItem>

        </List>
    );
}

export default StatList;