import { 
  AppBar, 
  Toolbar, 
  IconButton, 
  Drawer, 
  List, 
  ListItemButton,
  ListItemText, 
  ListItemIcon, 
  Typography,
  Box
} from '@mui/material';
import { 
  AccountCircle, 
  Home, 
  AddBox, 
  Settings, 
  PriceChange, 
  TrendingUp,
  Menu,
  Logout
} from '@mui/icons-material';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { logout } from "../../api/userService";
import { useAuthContext } from "../../contexts/authContexts";

const StyledListItemButton = styled(ListItemButton)(() => ({
  "&.Mui-selected": {
    backgroundColor:'#3b82f6',
    color: "white",
    "& .MuiListItemIcon-root": {
      color: "white"
    }
  },
  "&.Mui-selected:hover": {
    backgroundColor: "purple",
    color: "white",
    "& .MuiListItemIcon-root": {
      color: "white"
    }
  },
  "&:hover": {
    backgroundColor: "#e0e0e0", 
    color: "black", 
    transition: "background-color 0.3s ease", 
    "& .MuiListItemIcon-root": {
      color: "white"
    }
  }
}));

function Navbar() {
  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const navigate = useNavigate();
  const { setUser } = useAuthContext();

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleNavigation = (index: number, path: string) => {
    setSelectedIndex(index);
    navigate(path);
    setOpen(!open)
  };
  const handleLogout = async() => {
    try {
      const res = await logout();
      setUser(null);
      console.info(res)
      navigate('/')
    }
    catch (err) {
      console.error("Erreur de connexion :", err); 
      
    }

  }
  const getTitleByIndex = (index: number | null): string => {
    switch (index) {
      case 1:
        return "Page admin";
      case 2:
        return "Créer un utilisateur";
      case 3:
        return "Créer un produit";
      case 4:
        return "Modifier les prix";
      case 5:
        return "Suivi des ventes";
      case 6:
        return "Paramètres";
      case 7:
        return "Mon Profil";
      default:
        return "Admin";
    }
  };

  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          <IconButton 
            edge="start" 
            color="inherit" 
            onClick={toggleDrawer} 
            aria-label="menu"
          >
            <Menu />
          </IconButton>
          <Typography variant="h6">Pizza Sorrizo</Typography>
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
            <Typography variant="h5">
              {getTitleByIndex(selectedIndex)}
            </Typography>
          </Box>
          <Box>
            <IconButton
              edge="end"
              color="inherit"
              aria-label="logout"
              onClick={handleLogout}
            >
              <Logout />
            </IconButton>
          </Box>
         
          
        </Toolbar>
      </AppBar>
      <Drawer open={open} onClose={toggleDrawer}>
        <List>
          <StyledListItemButton
            selected={selectedIndex === 0}
            onClick={() => handleNavigation(0, '/')}
          >
            <ListItemIcon>
              <Home style={{ fontSize: 32, color: 'red' }}/>
            </ListItemIcon>
            <ListItemText primary="Retour a l'application" />
          </StyledListItemButton>

          <StyledListItemButton 
            selected={selectedIndex === 1}
            onClick={() => handleNavigation(1, '/admin')}
          >
            <ListItemIcon>
              <Home style={{ fontSize: 32, color: 'blue' }}/>
            </ListItemIcon>
            <ListItemText primary="Page admin" />
          </StyledListItemButton>

          <StyledListItemButton
            selected={selectedIndex === 2}
            onClick={() => handleNavigation(2, '/admin-createuser')}
          >
            <ListItemIcon>
              <AddBox style={{ fontSize: 32, color: 'brown' }} />
            </ListItemIcon>
            <ListItemText primary="Créer un utilisateur" />
          </StyledListItemButton>

          <StyledListItemButton
            selected={selectedIndex === 3}
            onClick={() => handleNavigation(3, '/admin-createproduct')}
          >
            <ListItemIcon>
              <AddBox style={{ fontSize: 32, color: 'brown' }} />
            </ListItemIcon>
            <ListItemText primary="Créer un produit" />
          </StyledListItemButton>

          <StyledListItemButton
            selected={selectedIndex === 4}
            onClick={() => handleNavigation(4, '/admin-updateprice')}
          >
            <ListItemIcon>
              <PriceChange style={{ fontSize: 32, color: 'green' }}/>
            </ListItemIcon>
            <ListItemText primary="Modifier les prix" />
          </StyledListItemButton>

          <StyledListItemButton
            selected={selectedIndex === 5}
            onClick={() => handleNavigation(5, '/admin-orderhistory')}
          >
            <ListItemIcon>
              <TrendingUp style={{ fontSize: 32, color: 'green' }}/>
            </ListItemIcon>
            <ListItemText primary="Suivi des ventes" />
          </StyledListItemButton>

          <StyledListItemButton
            selected={selectedIndex === 6}
            onClick={() => handleNavigation(6, '/admin-settings')}
          >
            <ListItemIcon>
              <Settings />
            </ListItemIcon>
            <ListItemText primary="Paramètres" />
          </StyledListItemButton>

          <StyledListItemButton
            selected={selectedIndex === 7}
            onClick={() => handleNavigation(7, '/admin-profile')}
          >
            <ListItemIcon>
              <AccountCircle />
            </ListItemIcon>
            <ListItemText primary="Mon Profil" />
          </StyledListItemButton>
        </List>
      </Drawer>
    </>
  );
}

export default Navbar;