
// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Grid from "@mui/material/Grid";

// Argon Dashboard 2 MUI components
import {Box} from "@mui/material";
import React from "react";

function BackgroundLayout({ bgImage, children }) {

  return (
      <Box
          sx={{
            height: '100%',
            width: '100%',
            bgcolor: 'rgba(0, 0, 0, 0.64)',
            color: 'white',
            padding: '10px',
          }}
      >
        <Grid
            container
            //sx={{height: '100%'}}
            //alignItems="flex-start"
        >
          <Grid
              container
              item
              spacing={3}
              xs={12}
              m={2}
          >
            {children}
          </Grid>
        </Grid>
      </Box>
  );
}

// Setting default values for the props of IllustrationLayout
BackgroundLayout.defaultProps = {
  color: "info",
  header: "",
  title: "",
  description: "",
  button: { color: "info" },
  illustration: {},
};

// Typechecking props for the IllustrationLayout
BackgroundLayout.propTypes = {
  color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
  header: PropTypes.node,
  title: PropTypes.string,
  description: PropTypes.string,
  button: PropTypes.object,
  children: PropTypes.node.isRequired,
  illustration: PropTypes.shape({
    image: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
  }),
};

export default BackgroundLayout;
