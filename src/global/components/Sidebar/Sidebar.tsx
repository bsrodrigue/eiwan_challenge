import { Avatar, Box, Divider, List, ListItem, ListItemText, Typography } from '@mui/material';
import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom';


const sidebarLinks = [
    {
        title: "Home",
        to: "/home",
        auth: true,
    },
    {
        title: "Challenges",
        to: "/challenges/new",
        auth: true,
    },
    {
        title: "Notifications",
        to: "/user/notifications",
        auth: true,
    },
    {
        title: "Profile",
        to: "/user/profile",
        auth: true,
    },
]

export const Sidebar: React.FC = () => {
    // Hooks
    const [cookies, setCookie, removeCookie] = useCookies(['auth']);

    // Values
    const token = cookies?.auth?.session?.access_token;
    const user = cookies?.auth?.user;
    const profile = cookies?.auth?.profile;

    const isAuthenticated = token;

    return (
        <Box sx={{ margin: "1em" }}>

            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Avatar />
                <Typography>{profile?.username || "Anonymous"}</Typography>
            </Box>

            <Divider />

            <List>
                {sidebarLinks.map((link, index) => {
                    const { title, to, auth } = link;
                    return (<ListItem button key={index}>
                        {
                            auth ? (
                                <>
                                    {isAuthenticated && (
                                        <ListItemText>
                                            <Link to={to}>
                                                {title}
                                            </Link>
                                        </ListItemText>
                                    )}
                                </>
                            ) : (
                                <ListItemText>
                                    <Link to={to}>
                                        {title}
                                    </Link>
                                </ListItemText>
                            )
                        }
                    </ListItem>);
                })}
            </List >

        </Box >
    );
}
