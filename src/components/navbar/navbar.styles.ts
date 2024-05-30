import { SxProps } from "@mui/material";

const navbarStyles = {
  toolbar: () => {
    const styles: SxProps = {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    };

    return styles;
  },
};
export default navbarStyles;
