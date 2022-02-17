import { Avatar, Box, Divider, List, ListItem, ListItemText, Typography } from '@mui/material';
import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom';
import { Home as HomeIcon } from 'react-feather';


const sidebarLinks = [
    {
        title: "Home",
        to: "/",
        auth: true,
        icon: <HomeIcon/>,
    },
    {
        title: "Drafts",
        to: "/drafts",
        auth: true,
        icon: <HomeIcon/>,
    },
    {
        title: "Proposals",
        to: "/proposals",
        auth: true,
        icon: <HomeIcon/>,
    },
    {
        title: "My Challenges",
        to: "/user/challenges",
        auth: true,
        icon: <HomeIcon/>,
    },
    {
        title: "Archives",
        to: "/user/archives",
        auth: true,
        icon: <HomeIcon/>,
    },
    {
        title: "Leaderboard",
        to: "/leaderboard",
        auth: true,
        icon: <HomeIcon/>,
    },
    {
        title: "Profile",
        to: "/user/profile",
        auth: true,
        icon: <HomeIcon/>,
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
                    const { title, to, auth, icon } = link;
                    return (

                                            <Link to={to}>
                    <ListItem button key={index}>
                        {
                            auth ? (
                                <>
                                    {isAuthenticated && (
                                    <Box sx={{ display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    width: '100%',}}
              
                                    >
                                    <Box sx={{marginRight: '1em'}}>
                                    {icon}
                                    </Box>
                                                {title}
                                    </Box>
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
                    </ListItem>
                                            </Link>
                    );
                })}
            </List >

        </Box >
    );
}
