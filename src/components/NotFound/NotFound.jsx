import { Box, Container, Grid, Typography, Button } from "@mui/material";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <Box
      component="section"
      sx={{
        display: "flex",
        alignItems: "center",
        minHeight: "100vh",
        py: 5,
      }}>
      <Container sx={{ py: 5 }}>
        <Grid container alignItems="center" spacing={4}>
          <Grid item xs={12} md={6} order={{ xs: 2, md: 1 }}>
            <Typography
              variant="h1"
              color="text.secondary"
              fontWeight="bold"
              gutterBottom>
              Error 404
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              fontWeight="light"
              mb={4}>
              The page you are looking for was moved, removed or might never
              existed.
            </Typography>
            <Button variant="contained" color="primary" size="large">
              <Link
                to={"/"}
                style={{
                  textDecoration: "none",
                  color: "white",
                }}>
                Back to homepage
              </Link>
            </Button>
          </Grid>

          <Grid item xs={12} md={6} order={{ xs: 1, md: 2 }}>
            <Box
              sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
              <Box
                component="lottie-player"
                src="https://assets9.lottiefiles.com/packages/lf20_kcsr6fcp.json"
                background="transparent"
                speed="1"
                loop
                autoplay
                sx={{ width: "100%", maxWidth: 400 }}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
