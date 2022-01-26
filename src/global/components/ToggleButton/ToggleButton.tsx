import { Menu as MenuIcon } from '@mui/icons-material';
import { IconButton } from '@mui/material';

interface ToggleButtonProps {
    onClick: any;
}
export const ToggleButton: React.FC<ToggleButtonProps> = (props: ToggleButtonProps) => {
    const { onClick } = props;
    return (
        <IconButton
            onClick={onClick}
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
        >
            <MenuIcon />
        </IconButton>
    );
};
