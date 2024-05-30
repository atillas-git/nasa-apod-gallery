import { SxProps } from "@mui/material";

const pictureOfTheDayStyles = {
  main: () => {
    const styles: SxProps = {
      backgroundColor: "primary.dark",
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      p: 2,
      overflowX: "hidden",
    };
    return styles;
  },
  paper: () => {
    const styles: SxProps = {
      p: 4,
      backgroundColor: "primary.main",
      color: "primary.light",
      borderRadius: "2rem",
    };
    return styles;
  },
};
export default pictureOfTheDayStyles;
