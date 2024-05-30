import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  Grid,
  Card,
  CardMedia,
  Typography,
  CircularProgress,
  Pagination,
  styled,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import { APODImage } from "../../types";

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
  const navigate = useNavigate();
  const { page } = useParams();

  useEffect(() => {
    if (!searchDate) {
      const currentPage = page ? parseInt(page) : 1;
      fetchImages(currentPage);
    }
  }, [page, searchDate]);

  const fetchImages = async (pageNum: number, date?: string) => {
    setLoading(true);
    const apiKey = import.meta.env.VITE_NASA_API_KEY;
    let url = "";

    if (date) {
      url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date}`;
    } else {
      const { startDate, endDate } = calculateDateRange(pageNum);
      url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&start_date=${startDate}&end_date=${endDate}`;
    }

    try {
      const response = await fetch(url);
      const data = await response.json();
      setImages(Array.isArray(data) ? data : [data]);
    } catch (err) {
      console.error("Failed to fetch images:", err);
    }
    setLoading(false);
  };

  const calculateDateRange = (pageNum: number) => {
    const endDate = new Date();
    endDate.setDate(endDate.getDate() - (pageNum - 1) * 9);
    const startDate = new Date(endDate);
    startDate.setDate(startDate.getDate() - 8);

    return {
      startDate: startDate.toISOString().split("T")[0],
      endDate: endDate.toISOString().split("T")[0],
    };
  };

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    navigate(`/gallery/${value}`);
  };
  const handleSearch = () => {
    if (searchDate) {
      fetchImages(1, searchDate);
      navigate("/gallery/1");
    }
  };

  return (
    <Box
      padding={4}
      sx={{ backgroundColor: "primary.dark", minHeight: "90vh" }}
    >
      <Box
        paddingBottom={2}
        display="flex"
        justifyContent="space-between"
        maxWidth={"fit-content"}
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
          onClick={() => handleSearch()}
          sx={{ color: "common.white" }}
          startIcon={<SearchIcon />}
        >
          Search
        </SearchButton>
        <SearchButton
          variant="contained"
          color="primary"
          onClick={() => setSearchDate("")}
          sx={{ color: "common.white" }}
        >
          Clear
        </SearchButton>
      </Box>
      {loading ? (
        <Box display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Grid container spacing={2}>
            {images &&
              images.map((image, index) => (
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
          {!searchDate && (
            <Box
              sx={{
                backgroundColor: "primary.light",
                width: "fit-content",
                padding: 1,
                borderRadius: "1rem",
                mt: 2,
              }}
            >
              <Pagination
                count={10}
                page={parseInt(page || "1")}
                onChange={handlePageChange}
                color="primary"
                shape="rounded"
              />
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

export default Gallery;
