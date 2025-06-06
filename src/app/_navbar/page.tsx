"use client";

import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../_redux/store";
import { useRouter } from "next/navigation";
import { removeToken } from "../_redux/authSlice";
import { usePathname } from "next/navigation";

function Navbar() {
  const token = useSelector((store: State) => store.authReducer.token);
  const router = useRouter();
  const dispatch = useDispatch();
  const pathname = usePathname();

  function logout() {
    router.push("/login");
    dispatch(removeToken());
  }

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar
      position="static"
      elevation={2}
      sx={{
        boxShadow: 2,
        background: "linear-gradient(90deg, #1976d2 0%, #9c27b0 100%)",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Logo/Brand Avatar */}
          <AdbIcon
            sx={{
              display: { xs: "none", md: "flex" },
              mr: 1,
              color: "white",
            }}
          />
          <Typography
            variant="h6"
            noWrap
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".1rem",
              color: "white",
              textDecoration: "none",
            }}
          >
            <Link href="/">VIBA</Link>
          </Typography>

          {token && (
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{ display: { xs: "block", md: "none" } }}
              >
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography sx={{ textAlign: "center" }}>
                    <Link href={"/create-post"}>Add Post</Link>
                  </Typography>
                </MenuItem>
              </Menu>
            </Box>
          )}

          {/* Mobile Screen */}

          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".1rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <Link href={"/"}>VIBA</Link>
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {token && (
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                <Link href={"/create-post"}>Add Post</Link>
              </Button>
            )}
          </Box>

          {/* Settings */}

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {token
                ? [
                    <MenuItem key="Profile" onClick={handleCloseUserMenu}>
                      <Typography sx={{ textAlign: "center" }}>
                        <Link href={"/profile"}>Profile</Link>
                      </Typography>
                    </MenuItem>,
                    <MenuItem key="logout" onClick={handleCloseUserMenu}>
                      <Typography
                        sx={{ textAlign: "center", cursor: "pointer" }}
                        onClick={logout}
                      >
                        Logout
                      </Typography>
                    </MenuItem>,
                  ]
                : [
                    <MenuItem key="login" onClick={handleCloseUserMenu}>
                      <Typography sx={{ textAlign: "center" }}>
                        <Link href={"/login"}>Login</Link>
                      </Typography>
                    </MenuItem>,

                    <MenuItem key="register" onClick={handleCloseUserMenu}>
                      <Typography sx={{ textAlign: "center" }}>
                        <Link href={"/register"}>Register</Link>
                      </Typography>
                    </MenuItem>,
                  ]}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
