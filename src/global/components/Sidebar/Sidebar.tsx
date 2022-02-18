import { Avatar, Box, Divider, List, ListItem, Typography } from '@mui/material';
import { useCookies } from 'react-cookie';
import {
    Archive as ArchiveIcon, File as ProposalIcon,
    Hexagon as ChallengeIcon, Home as HomeIcon, PenTool as DraftIcon, Star as LeaderboardIcon, User as ProfileIcon
} from 'react-feather';
import { Link } from 'react-router-dom';
import { NavigationLink } from '../../../interfaces/navigation';


const sidebarLinks: Array<NavigationLink> = [
    {
        title: "Home",
        to: "/",
        auth: true,
        icon: <HomeIcon />,
    },
    {
        title: "Drafts",
        to: "/drafts",
        auth: true,
        icon: <DraftIcon />,
    },
    {
        title: "Proposals",
        to: "/proposals",
        auth: true,
        icon: <ProposalIcon />,
    },
    {
        title: "My Challenges",
        to: "/user/challenges",
        auth: true,
        icon: <ChallengeIcon />,
    },
    {
        title: "Archives",
        to: "/user/archives",
        auth: true,
        icon: <ArchiveIcon />,
    },
    {
        title: "Leaderboard",
        to: "/leaderboard",
        auth: true,
        icon: <LeaderboardIcon />,
    },
    {
        title: "Profile",
        to: "/user/profile",
        auth: true,
        icon: <ProfileIcon />,
    },
]

interface SidebarLinkProps {
    title: string;
    to: string;
    icon?: any;
}
const SidebarLink: React.FC<SidebarLinkProps> = (props: SidebarLinkProps) => {
    const { title, to, icon } = props;

    return (
        <Link to={to}>
            <ListItem button>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                }}
                >
                    <Box>
                        {icon}
                    </Box>
                    <Typography>
                        {title}
                    </Typography>
                </Box>
            </ListItem>

        </Link>
    )
}

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
                <Avatar sx={{ height: '4em', width: '4em' }} />
                <Typography>{profile?.username || "Anonymous"}</Typography>
            </Box>

            <Divider />

            <List>
                {sidebarLinks.map((link, index) => {
                    const { title, to, auth, icon } = link;
                    const is_visible = ((auth && isAuthenticated) || (!auth));
                    return (is_visible && <SidebarLink title={title} to={to} icon={icon} key={index} />);
                })}
            </List >

        </Box >
    );
}
