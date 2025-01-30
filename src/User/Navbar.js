import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../User/nav.css";
import { MdKeyboardArrowDown } from "react-icons/md";
import { IoSearchCircleSharp } from "react-icons/io5";
import { IoReorderThreeSharp } from "react-icons/io5";
import { fetchPlace } from "../redux/slice/PlaceSlice";
import { fetchLocation } from "../redux/slice/locationSlice";
import { fetchCategories } from "../redux/slice/categorySlice";

import {
  Stack,
  Link,
  Toolbar,
  Typography,
  Container,
  AppBar,
  useMediaQuery,
  Drawer,
  IconButton,
  List,
  ListItem,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

export const Navbar = () => {
  const dispatch = useDispatch();
  const [isScrolled, setIsScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [dropdownData, setDropdownData] = useState([]); 
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); 
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  // redux
  const { places, loading: placesLoading } = useSelector((state) => state.places);
  const { locations, loading: locationsLoading } = useSelector((state) => state.locations);
  const { categories, loading: categoriesLoading } = useSelector((state) => state.categories);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleMouseEnter = (type) => {
    setIsDropdownOpen(true);

    switch (type) {
      case "places":
        dispatch(fetchPlace());
        setDropdownData(places);
        break;
      case "locations":
        dispatch(fetchLocation());
        setDropdownData(locations);
        break;
      case "categories":
        dispatch(fetchCategories());
        setDropdownData(categories);
        break;
      default:
        setDropdownData([]);
    }
  };

  const handleMouseLeave = () => {
    setIsDropdownOpen(false);
  };

  const isLoading = placesLoading || locationsLoading || categoriesLoading;





  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);


  return (

<AppBar
  sx={{
    background: isScrolled ? "white" : "transparent",
    color: isScrolled ? "black" : "white",
    boxShadow: isScrolled ? "0 4px 6px rgba(0, 0, 0, 0.1)" : "none",
    transition: "background-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease",
  }}
>
  <Container>
    <Toolbar>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        width="100%"
      >
        {/* Logo Section */}
        <Box>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6v8qfD5ErzCuzyLh9LKXMeTvuZtxvAkepnADXoKFJZqqvRbdH6JN45v0wrxTva5DeNDU&usqp=CAU"
            alt="Logo"
            style={{ width: "100px", height: "70px" }}
          />
        </Box>

        {/* Navigation Links */}
        {isMobile ? (
          <>
            <IconButton
              edge="end"
              color="inherit"
              onClick={handleDrawerToggle}
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>

            <Drawer
              anchor="right"
              open={drawerOpen}
              onClose={handleDrawerToggle}
            >
              <List>
                <ListItem>
                  <Link sx={{ color: "primary", textDecoration: "none" }}>
                    Locations
                  </Link>
                </ListItem>
                <ListItem>
                  <Link sx={{ color: "primary", textDecoration: "none" }}>
                    Places
                  </Link>
                </ListItem>
                <ListItem>
                  <Link sx={{ color: "primary", textDecoration: "none" }}>
                    Categories
                  </Link>
                </ListItem>
              </List>
            </Drawer>
          </>
        ) : (
          <Stack direction="row" gap={40}>
            <Box className="navCenter">
              <Stack direction="row" gap={8}>
                <Link
                  onMouseEnter={() => handleMouseEnter("locations")}
                  onMouseLeave={handleMouseLeave}
                  sx={{
                    color: isScrolled ? "black" : "white",
                    textDecoration: "none",
                  }}
                  className="nav-link"
                >
                  Locations
                  <MdKeyboardArrowDown size={25} />
                </Link>

                <Link
                  onMouseEnter={() => handleMouseEnter("places")}
                  onMouseLeave={handleMouseLeave}
                  sx={{
                    color: isScrolled ? "black" : "white",
                    textDecoration: "none",
                  }}
                  className="nav-link"
                >
                  Places
                  <MdKeyboardArrowDown size={25} />
                </Link>

                <Link
                  onMouseEnter={() => handleMouseEnter("categories")}
                  onMouseLeave={handleMouseLeave}
                  sx={{
                    color: isScrolled ? "black" : "white",
                    textDecoration: "none",
                  }}
                  className="nav-link"
                >
                  Categories
                  <MdKeyboardArrowDown size={25} />
                </Link>

                {isDropdownOpen && (
                  <Box
                    onMouseEnter={() => setIsDropdownOpen(true)}
                    onMouseLeave={handleMouseLeave}
                    className="hoverDiv"
                  >
                    {isLoading ? (
                      <Typography>Loading...</Typography>
                    ) : dropdownData.length > 0 ? (
                      dropdownData.map((item) => (
                        <Link
                          key={item.id}
                          sx={{
                            display: "block",
                            padding: 1,
                            color: "black",
                            textDecoration: "none",
                          }}
                        >
                          {item.name}
                        </Link>
                      ))
                    ) : (
                      <Typography>No data found.</Typography>
                    )}
                  </Box>
                )}
              </Stack>
            </Box>
            <Box>
              <Stack direction="row" gap={5}>
                <IoSearchCircleSharp
                  size={32}
                  style={{ color: isScrolled ? "black" : "white" }}
                />
                <IoReorderThreeSharp
                  size={32}
                  style={{ color: isScrolled ? "black" : "white" }}
                />
              </Stack>
            </Box>
          </Stack>
        )}
      </Stack>
    </Toolbar>
  </Container>
</AppBar>
  )
}