import img from "../assets/image/home.jpg";
import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Pagination,
  Card,
  CardContent,
  InputAdornment,
} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { styled } from "@mui/system";
import { FaSearch } from "react-icons/fa";
import { LuScrollText } from "react-icons/lu";
import { Link } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header/Header";

const StyledCard = styled(Card)(() => ({
  borderRadius: 0,
  background: "rgba(248, 248, 248, 0.85)",
}));

export default function Home() {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAuthor, setSelectedAuthor] = useState("0");
  const [allPosts, setAllPosts] = useState([]);

  const getAllPosts = async () => {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );
    setAllPosts(response?.data);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(1);
  };

  const handleAuthorChange = (event) => {
    setSelectedAuthor(event.target.value);
    setPage(1);
  };

  const filteredPosts = allPosts.filter((post) => {
    const matchesSearch = post.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesAuthor =
      selectedAuthor === "0" || post.userId?.toString() === selectedAuthor;
    return matchesSearch && matchesAuthor;
  });

  const postsPerPage = 10;
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const currentPosts = filteredPosts.slice(
    (page - 1) * postsPerPage,
    page * postsPerPage
  );

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "100vh",
        maxHeight: "fit-content",
        backgroundImage: `url(${img})`,
        backgroundSize: "cover",
        backgroundPosition: "top",
        backgroundRepeat: "no-repeat",
      }}>
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      />

      <Box sx={{ position: "relative", zIndex: 1, color: "#fff", p: 4 }}>
        <Header />
        <Box sx={{ mt: 4, borderRadius: 3 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              p: 2,
              background: "rgba(255, 255, 255, 1)",
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            }}>
            <Typography
              component="div"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                fontSize: "20px",
                fontWeight: 600,
                color: "rgba(0,0,0,1)",
              }}>
              <Box
                sx={{
                  width: 36,
                  height: 36,
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "50%",
                  flexShrink: 0,
                }}
                aria-hidden="true">
                <LuScrollText style={{ fontSize: 20 }} />
              </Box>
              <Box component="span">Post List</Box>
            </Typography>

            <Typography
              component={Link}
              to="create-post"
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 0.5,
                fontSize: "16px",
                fontWeight: 400,
                color: "rgba(122,117,117,1)",
                textDecoration: "none",
              }}>
              <Box component="span" sx={{ fontSize: 20, lineHeight: 1 }}>
                +
              </Box>
              <Box component="span">Create a new post</Box>
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 2,
              bgcolor: "rgba(188, 184, 184, 0.72)",
              p: 2,
            }}>
            <TextField
              variant="outlined"
              size="small"
              placeholder="Search posts..."
              value={searchTerm}
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FaSearch />
                  </InputAdornment>
                ),
              }}
              sx={{
                bgcolor: "white",
                borderRadius: 4,
                minWidth: { xs: "200px", md: "509px", lg: "909px" },
                "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                "&:hover .MuiOutlinedInput-notchedOutline": { border: "none" },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
                "& .MuiInputBase-root": { outline: "none" },
              }}
            />

            <Box sx={{ minWidth: 170, display: "flex", alignItems: "center" }}>
              <Typography
                variant="subtitle2"
                sx={{ mr: 2, color: "rgba(26, 26, 26, 1)" }}>
                Author:
              </Typography>
              <FormControl
                fullWidth
                size="small"
                variant="outlined"
                sx={{
                  bgcolor: "white",
                  borderRadius: 4,
                  "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    border: "none",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    border: "none",
                  },
                }}>
                <Select
                  labelId="author-select-label"
                  id="author-select"
                  value={selectedAuthor}
                  onChange={handleAuthorChange}
                  sx={{
                    "& .MuiSelect-outlined": {
                      outline: "none",
                    },
                  }}>
                  <MenuItem value="0">All</MenuItem>
                  <MenuItem value="1">One</MenuItem>
                  <MenuItem value="2">Two</MenuItem>
                  <MenuItem value="3">Three</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>

          {currentPosts.map((post, id) => (
            <StyledCard key={id}>
              <CardContent>
                <Typography
                  sx={{ textDecoration: "none", color: "black" }}
                  component={Link}
                  to={`post-details/${id + 1}`}
                  variant="h6"
                  gutterBottom>
                  {post.title}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {post.body}
                </Typography>
              </CardContent>
            </StyledCard>
          ))}

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              py: 2,
              bgcolor: "white",
            }}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              color="success"
              size="large"
              showFirstButton
              showLastButton
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
