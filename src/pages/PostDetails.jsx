import { Box, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import WestIcon from "@mui/icons-material/West";
import { IoPerson } from "react-icons/io5";
import { BsCalendarDate } from "react-icons/bs";
import img from "../assets/image/home.jpg";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header/Header";

export default function PostDetails() {
  const { id } = useParams();
  const [singlePost, setsinglePost] = useState([]);

  const getData = async () => {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/posts/${id}`
    );

    setsinglePost(response.data);
  };

  useEffect(() => {
    getData();
  });

  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "100vh",
        backgroundImage: `url(${img})`,
        backgroundSize: "cover",
        backgroundPosition: "top",
        backgroundRepeat: "no-repeat",
      }}>
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          bgcolor: "rgba(0, 0, 0, 0.5)",
        }}
      />

      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          color: "#fff",
          pt: 2,
          px: 4,
        }}>
        <Header />
        <Box
          sx={{
            mt: 4,
            minHeight: "70vh",
            pb: { xs: 3, md: 0 },
          }}>
          <Box
            sx={{
              background:
                "linear-gradient(0deg, rgba(33, 96, 154, 0.75) 0%, rgba(0, 37, 74, 0.75) 100%);",
              minHeight: "50%",
              maxHeight: "fit-content",
              p: 6,
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
            }}>
            <Button
              size="small"
              sx={{ borderRadius: 4, bgcolor: "#e0e0e0", mt: 2, py: 1 }}
              variant="outlined"
              startIcon={<WestIcon sx={{ color: "rgba(26, 26, 26, 1)" }} />}>
              <Link
                style={{ textDecoration: "none", color: "rgba(26, 26, 26, 1)" }}
                to={"/"}>
                Back To Posts
              </Link>
            </Button>
            <Typography
              sx={{
                color: "rgba(255, 255, 255, 1)",
                fontSize: "3vw",
                fontWeight: "700",
                my: 2,
              }}>
              {singlePost.title}
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                flexWrap: "wrap",
                width: { xs: "90%", md: "50%", lg: "30%" },
                pt: 2,
              }}>
              <Typography>
                {" "}
                <IoPerson style={{ marginRight: "6px" }} />
                Leanne Graham
              </Typography>
              <Typography sx={{ mt: { xs: 2, sm: 0 } }}>
                {" "}
                <BsCalendarDate style={{ marginRight: "6px" }} /> Sun, August
                24th, 2025
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              bgcolor: "rgba(255, 255, 255, 0.75)",
              p: 6,
              borderBottomLeftRadius: 10,
              borderBottomRightRadius: 10,
            }}>
            <Typography width={"40%"} color="black" sx={{ pb: 5 }}>
              {singlePost.body}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
