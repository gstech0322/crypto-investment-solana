import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';

interface Props {}
interface MenuProps {
  title: string;
  to: string;
}

const menuItems = [
  {
    id: 1,
    title: 'Home',
    link: '/',
  },
  {
    id: 2,
    title: 'Login',
    link: '/login',
  },
  {
    id: 3,
    title: 'Register',
    link: '/register',
  },
];

const RenderDesktopLinks: React.FC<MenuProps> = (props) => {
  return (
    <Link to={props.to} className="header-link link">
      <h3>{props.title}</h3>
    </Link>
  );
};

const RenderMobileLinks: React.FC<MenuProps> = (props) => {
  return (
    <MenuItem sx={{ backgroundColor: '#17171b' }}>
      <Link to={props.to} className="header-link link">
        <h3>{props.title}</h3>
      </Link>
    </MenuItem>
  );
};

const Header: React.FC<Props> = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{ backgroundColor: 'transparent', boxShadow: 'none' }}
      >
        <Toolbar>
          <div style={{ display: 'flex', flex: 1 }}>
            <h1>Crypto Trading 📈</h1>
          </div>
          <div>
            {isMobile ? (
              <>
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  sx={{ mr: 2 }}
                  onClick={handleMenu}
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorEl)}
                  onClose={() => setAnchorEl(null)}
                >
                  {menuItems.map((item) => (
                    <RenderMobileLinks title={item.title} to={item.link} />
                  ))}
                </Menu>
              </>
            ) : (
              <div style={{ display: 'flex' }}>
                {menuItems.map((item) => (
                  <RenderDesktopLinks
                    key={item.id}
                    title={item.title}
                    to={item.link}
                  />
                ))}
              </div>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
