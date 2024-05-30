import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useTheme,
  useMediaQuery,
  Theme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";

interface IProps {
  window?: () => Window;
}

interface NavItem {
  title: string;
  path: string;
}

const StyledLink = styled(Link)(({ theme }: { theme: Theme }) => ({
  textDecoration: "none",
  color: "inherit",
  position: "relative",
  display: "flex",
  alignItems: "center",
  overflow: "hidden",
  "&:before": {
    content: '""',
    position: "absolute",
    bottom: 0,
    left: 0,
    width: 0,
    height: "2px",
    backgroundColor: theme.palette.primary.contrastText,
    transition: "width 0.3s ease-out",
  },
  "&:hover:before": {
    width: "100%",
  },
}));

const Navbar = ({ window }: IProps) => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navItems: NavItem[] = [
    { title: "Gallery", path: "/gallery" },
    { title: "Picture Of The Day", path: "/picture-of-the-day" },
  ];

  const drawer = (
    <div>
      <List sx={{ backgroundColor: "primary.dark" }}>
        {navItems.map((item) => (
          <ListItem
            key={item.title}
            component={StyledLink}
            to={item.path}
            sx={{ color: "primary.contrastText" }}
          >
            <ListItemText primary={item.title} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  const container = window ? () => window().document.body : undefined;

  return (
    <div>
      <AppBar position="static">
        <Toolbar sx={{ height: "10vh" }}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/">Nasa Gallery</Link>
          </Typography>
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          {!isMobile && (
            <List sx={{ display: "flex", gap: 3 }}>
              {navItems.map((item) => (
                <ListItem
                  key={item.title}
                  sx={{ whiteSpace: "nowrap", my: 0, py: 0 }}
                >
                  <StyledLink to={item.path}>
                    <ListItemText primary={item.title} />
                  </StyledLink>
                </ListItem>
              ))}
            </List>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        container={container}
        variant="temporary"
        open={mobileOpen}
        anchor="right"
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: 240,
            backgroundColor: "primary.dark",
          },
        }}
      >
        {drawer}
      </Drawer>
    </div>
  );
};

export default Navbar;
