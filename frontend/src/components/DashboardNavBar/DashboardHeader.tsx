import * as React from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import LogoutIcon from '@mui/icons-material/Logout';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
// import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import DiamondIcon from '@mui/icons-material/Diamond';
import RedeemIcon from '@mui/icons-material/Redeem';
import { signOut } from 'firebase/auth';
import { useHistory } from 'react-router-dom';
import { auth } from '../../config/firebase';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks/hooks';

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

export default function MiniDrawer() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const history = useHistory();
  const walletAddress = useAppSelector((state) => state.nft.walletAddress);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const logOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        history.push('/login');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" open={open} sx={{ backgroundColor: '#17171b' }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: '36px',
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <span
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            <h3>Dashboard &#x1F440;</h3>
            {walletAddress && (
              <h4>
                &#x1F47B; {walletAddress.slice(0, 4)}...
                {walletAddress.slice(-4)}
              </h4>
            )}
          </span>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        open={open}
        hideBackdrop={true}
        PaperProps={{
          sx: {
            backgroundColor: '#17171b',
            color: 'white',
          },
        }}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? (
              <ChevronRightIcon sx={{ color: 'white' }} />
            ) : (
              <ChevronLeftIcon sx={{ color: 'white' }} />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            flex: 1,
          }}
        >
          <List>
            <Link to="/cryptocurrencies" className="link elem">
              <ListItem>
                <ListItemIcon>
                  <AttachMoneyIcon sx={{ color: 'white' }} />
                </ListItemIcon>

                <h4>Cryptocurrencies</h4>
              </ListItem>
            </Link>
            <Link to="/watchlist" className="link elem">
              <ListItem>
                <ListItemIcon>
                  <DiamondIcon sx={{ color: 'white' }} />
                </ListItemIcon>

                <h4>My Watchlist</h4>
              </ListItem>
            </Link>
            {/* <Link to="/trade" className="link elem">
              <ListItem>
                <ListItemIcon>
                  <CurrencyExchangeIcon sx={{ color: 'white' }} />
                </ListItemIcon>

                <h4>Trade</h4>
              </ListItem>
            </Link> */}
            <Link to="/nft" className="link elem">
              <ListItem>
                <ListItemIcon>
                  <RedeemIcon sx={{ color: 'white' }} />
                </ListItemIcon>

                <h4>Mint NFTs!</h4>
              </ListItem>
            </Link>
          </List>
          <List style={{ bottom: 0, position: 'absolute' }}>
            <Link to="/" className="link elem">
              <ListItem>
                <ListItemIcon>
                  <LogoutIcon sx={{ color: 'white' }} onClick={logOut} />
                </ListItemIcon>
                <h4>Logout</h4>
              </ListItem>
            </Link>
          </List>
        </div>
        <Divider />
      </Drawer>
    </Box>
  );
}
