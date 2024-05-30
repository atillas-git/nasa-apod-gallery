import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, Container, Paper } from "@mui/material";
import { APODImage } from "../../types";
import Loading from "../../utils/loading/Loading";

const Picture = () => {
  const { date } = useParams<{ date: string }>();
  const [imageDetails, setImageDetails] = useState<APODImage | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchImageDetails = async () => {
      const apiKey = import.meta.env.VITE_NASA_API_KEY;
      const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date}`;
      setLoading(true);
      try {
        const response = await fetch(url);
        const data = await response.json();
        setImageDetails(data);
      } catch (err) {
        console.error("Failed to fetch image details:", err);
      }
      setLoading(false);
    };

    fetchImageDetails();
  }, [date]);

  if (loading) {
    return <Loading />;
  }

  return (
    <Box
      sx={{
        backgroundColor: "primary.dark",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        p: 2,
        overflowX: "hidden",
      }}
    >
      <Container maxWidth="md">
        <Paper
          sx={{
            p: 4,
            backgroundColor: "primary.main",
            color: "primary.light",
            borderRadius: "2rem",
          }}
        >
          {imageDetails && (
            <>
              <Typography variant="h5" gutterBottom>
                {imageDetails.title} - {imageDetails.date}
              </Typography>
              <Box
                component="img"
                src={imageDetails.url}
                alt={imageDetails.title}
                sx={{ width: "100%", height: "auto" }}
              />
              <Typography variant="body1" sx={{ marginTop: "20px" }}>
                {imageDetails.explanation}
              </Typography>
            </>
          )}
        </Paper>
      </Container>
    </Box>
  );
};

export default Picture;
