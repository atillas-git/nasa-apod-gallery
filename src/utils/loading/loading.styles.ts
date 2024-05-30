import { SxProps } from "@mui/material";

const loadingStyles = {
  main: () => {
    const styles: SxProps = {
      height: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "primary.dark",
    };
    return styles;
  },
};

export default loadingStyles;
