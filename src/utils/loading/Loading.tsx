import { Box } from "@mui/material";
import loadingStyles from "./loading.styles";
import CircularProgress from "@mui/material/CircularProgress";
const Loading = () => {
  return (
    <Box sx={loadingStyles.main}>
      <CircularProgress />
    </Box>
  );
};

export default Loading;
