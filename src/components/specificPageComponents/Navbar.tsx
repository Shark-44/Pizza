import { AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemText, ListItemIcon, Typography } from '@mui/material';
import { AccountCircle, Home, AddBox, Settings } from '@mui/icons-material';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={toggleDrawer} aria-label="menu">
            <Home />
          </IconButton>
          <Typography variant="h6">Pizza Sorrizo</Typography>
        </Toolbar>
      </AppBar>

      {/* Drawer (menu mobile latéral) */}
      <Drawer open={open} onClose={toggleDrawer}>
        <List>
          {/* Page d'accueil */}
          <ListItem component="a" onClick={() => navigate('/')}>
            <ListItemIcon><Home /></ListItemIcon>
            <ListItemText primary="Retour a l'application" />
          </ListItem>
          <ListItem component="a" onClick={() => navigate('/admin')}>
            <ListItemIcon><Home /></ListItemIcon>
            <ListItemText primary="Page admin" />
          </ListItem>

          {/* Page création d'utilisateur */}
          <ListItem component="a" onClick={() => navigate('/admin-createuser')}>
            <ListItemIcon><AddBox /></ListItemIcon>
            <ListItemText primary="Créer un utilisateur" />
          </ListItem>

          <ListItem component="a" onClick={() => navigate('/admin-createproduct')}>
            <ListItemIcon><AddBox /></ListItemIcon>
            <ListItemText primary="Créer un produit" />
          </ListItem>
          {/* Page paramètres */}
          <ListItem component="a" onClick={() => navigate('/admin-settings')}>
            <ListItemIcon><Settings /></ListItemIcon>
            <ListItemText primary="Paramètres" />
          </ListItem>

          {/* Profil utilisateur */}
          <ListItem component="a" onClick={() => navigate('/admin-profile')}>
            <ListItemIcon><AccountCircle /></ListItemIcon>
            <ListItemText primary="Mon Profil" />
          </ListItem>
        </List>
      </Drawer>
    </>
  );
}

export default Navbar;
