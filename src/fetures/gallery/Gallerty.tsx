import { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Button,
  Grid,
  Card,
  CardMedia,
  Typography,
  CircularProgress,
  styled,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import { APODImage } from "../../types";

// Enhancing styles for TextField and Button
const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-root": {
    paddingRight: theme.spacing(7),
    color: theme.palette.common.white,
    backgroundColor: theme.palette.primary.main,
    '& input[type="date"]': {
      color: theme.palette.common.white,
      backgroundColor: theme.palette.primary.main,
      borderColor: theme.palette.secondary.main,
    },
    '& input[type="date"]::-webkit-calendar-picker-indicator': {
      filter: "invert(1)",
    },
  },
}));

const SearchButton = styled(Button)(() => ({
  padding: 15,
}));

const Gallery = () => {
  const [images, setImages] = useState<APODImage[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchDate, setSearchDate] = useState<string>("");

  const fetchImages = async (date: string = "") => {
    setLoading(true);
    const apiKey = import.meta.env.VITE_NASA_API_KEY;
    let url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=9`;
    if (date) {
      url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date}`;
    }
    try {
      const response = await fetch(url);
      const data = await response.json();
      setImages(date ? [data] : data);
    } catch (err) {
      console.error("Failed to fetch images:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleSearch = () => {
    if (searchDate) {
      fetchImages(searchDate);
    }
  };

  return (
    <Box
      padding={4}
      sx={{ backgroundColor: "primary.dark", minHeight: "100vh" }}
    >
      <Box
        paddingBottom={2}
        display="flex"
        justifyContent="left"
        width={"20rem"}
        position="relative"
        alignItems={"center"}
        gap={1}
      >
        <StyledTextField
          type="date"
          value={searchDate}
          onChange={(e) => setSearchDate(e.target.value)}
          sx={{ flexGrow: 1 }}
        />
        <SearchButton
          variant="contained"
          color="primary"
          onClick={handleSearch}
          sx={{ color: "common.white" }}
          startIcon={<SearchIcon />}
        >
          Search
        </SearchButton>
      </Box>
      {loading ? (
        <Box display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={2}>
          {images.map((image, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card>
                <Link
                  to={`/picture/${image.date}`}
                  style={{ textDecoration: "none" }}
                >
                  <CardMedia
                    component="img"
                    height="194"
                    image={image.url}
                    alt={image.title}
                  />
                  <Typography
                    variant="h6"
                    gutterBottom
                    component="div"
                    padding={2}
                  >
                    {image.title}
                  </Typography>
                </Link>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Gallery;
