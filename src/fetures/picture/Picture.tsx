import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Card, CardMedia, CardContent, Typography } from "@mui/material";
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
      }}
    >
      <Card raised sx={{ maxWidth: 600, mx: "auto" }}>
        <CardMedia
          component="img"
          height="400"
          image={imageDetails?.url}
          alt={imageDetails?.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {imageDetails?.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {imageDetails?.explanation}
          </Typography>
          <Typography variant="body1" color="text.primary" marginTop={2}>
            Date: {imageDetails?.date}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Picture;
