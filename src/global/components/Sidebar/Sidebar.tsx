import { Avatar, Box, Divider, List, ListItem, ListItemText, Typography } from '@mui/material';

export const Sidebar: React.FC = () => {

    return (
        <Box sx={{ margin: "1em" }}>

            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Avatar />
                <Typography>
                    Young Flemmosian
                </Typography>
            </Box>

            <Divider />

            <List>
                {["Home", "Challenges", "Notifications", "Profile"].map((title, index) => {
                    return (<ListItem button key={index}>
                        <ListItemText>
                            {title}
                        </ListItemText>
                    </ListItem>);
                })}
            </List>

        </Box>
    );
}
