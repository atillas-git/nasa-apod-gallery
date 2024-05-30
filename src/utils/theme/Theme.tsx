import { createTheme, ThemeProvider } from "@mui/material";

interface IProps {
  children: React.ReactNode;
}

const theme = createTheme({
  palette: {
    primary: {
      main: "#31363F",
      dark: "#222831",
      contrastText: "#76ABAE",
      light: "#EEEEEE",
    },
    secondary: {
      main: "#5C8374",
      contrastText: "#183D3D",
      dark: "#040D12",
      light: "#93B1A6",
    },
  },
});

const Theme = ({ children }: IProps) => {
  return (
    <div>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </div>
  );
};

export default Theme;
