
import { AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemText, ListItemIcon, Typography } from '@mui/material';
import { AccountCircle, Home, AddBox, Settings } from '@mui/icons-material';
import { useState } from "react"

function Navbar() {

  const [open, setOpen] = useState(false);

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
          <ListItem button onClick={() => console.log("Accueil")}>
            <ListItemIcon><Home /></ListItemIcon>
            <ListItemText primary="Accueil" />
          </ListItem>

          {/* Page création d'utilisateur */}
          <ListItem button onClick={() => console.log("Création utilisateur")}>
            <ListItemIcon><AddBox /></ListItemIcon>
            <ListItemText primary="Créer un utilisateur" />
          </ListItem>

          {/* Page paramètres */}
          <ListItem button onClick={() => console.log("Paramètres")}>
            <ListItemIcon><Settings /></ListItemIcon>
            <ListItemText primary="Paramètres" />
          </ListItem>

          {/* Profil utilisateur */}
          <ListItem button onClick={() => console.log("Profil")}>
            <ListItemIcon><AccountCircle /></ListItemIcon>
            <ListItemText primary="Mon Profil" />
          </ListItem>
        </List>
      </Drawer>
    </>
  );
}

export default Navbar;
