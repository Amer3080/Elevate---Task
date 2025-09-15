import { Box, Typography } from "@mui/material";
import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
function Header() {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          bgcolor: "rgba(255, 255, 255, 0.5)",
          p: 2,
          borderRadius: 5,
        }}>
        <Typography variant="h2" sx={{ fontSize: "20px", fontWeight: "600" }}>
          Elevate
        </Typography>

        <Typography
          variant="h5"
          sx={{
            fontSize: "24px",
            fontWeight: "semibold",
            textAlign: "center",
            width: "100%",
            display: { xs: "none", md: "block" },
          }}>
          Frontend Advanced Bootcamp Task
        </Typography>
        <MenuIcon sx={{ display: { xs: "block", md: "none", mx: 6 } }} />
      </Box>
    </>
  );
}

export default Header;
