import { Box, Typography, Button, Container } from "@mui/material";
import { Link } from "react-router-dom";
import backgroundImage from "../../assets/image.jpg";

const Application = () => {
  return (
    <Box
      sx={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        color: "#FFFFFF",
      }}
    >
      <Container
        maxWidth="sm"
        style={{
          textAlign: "center",
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          padding: "20px",
          borderRadius: "10px",
        }}
      >
        <Typography
          variant="h2"
          gutterBottom
          sx={{ color: "primary.contrastText" }}
        >
          Welcome to NASA APOD
        </Typography>
        <Typography
          variant="h5"
          gutterBottom
          sx={{ color: "primary.contrastText" }}
        >
          Explore the Astronomy Picture of the Day
        </Typography>
        <Box marginTop={4}>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/gallery"
            sx={{ marginRight: "20px" }}
          >
            Go to Gallery
          </Button>
          <Button
            variant="contained"
            color="secondary"
            component={Link}
            to="/picture-of-the-day"
          >
            Picture of the Day
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Application;
