import { useEffect, useState } from "react";
import { Container, Paper, Typography, Box } from "@mui/material";
import Loading from "../../utils/loading/Loading";
import pictureOfTheDayStyles from "./pictureOfTheyDay.styles";
import { APODImage } from "../../types";

const PictureOfTheDay = () => {
  const [apodData, setApodData] = useState<APODImage | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchApodData();
  }, []);

  const fetchApodData = async () => {
    const apiKey = import.meta.env.VITE_NASA_API_KEY;
    const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      if (response.ok) {
        setApodData(data);
      } else {
        setError(data.error.message);
      }
    } catch (err) {
      setError("Failed to fetch data");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <Loading />;
  if (error) return <Typography>Error: {error}</Typography>;

  return (
    <Box sx={pictureOfTheDayStyles.main}>
      <Container maxWidth="md">
        <Paper sx={pictureOfTheDayStyles.paper}>
          {apodData && (
            <>
              <Typography variant="h5" gutterBottom>
                {apodData.title} - {apodData.date}
              </Typography>
              <Box
                component="img"
                src={apodData.url}
                alt={apodData.title}
                sx={{ width: "100%", height: "auto" }}
              />
              <Typography variant="body1" sx={{ marginTop: "20px" }}>
                {apodData.explanation}
              </Typography>
            </>
          )}
        </Paper>
      </Container>
    </Box>
  );
};

export default PictureOfTheDay;
