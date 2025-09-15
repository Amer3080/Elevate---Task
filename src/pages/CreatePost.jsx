import { Box, TextField, Typography, Button } from "@mui/material";
import img from "../assets/image/home.jpg";
import { LuNotebookPen } from "react-icons/lu";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Header from "../components/Header/Header";

const schema = yup.object().shape({
  title: yup
    .string()
    .required("Post Title is required")
    .min(3, "Title must be at least 3 characters"),
  body: yup
    .string()
    .required("Post Body is required")
    .min(10, "Body must be at least 10 characters"),
  author: yup.string().required("Post Author is required"),
});

export default function CreatePost() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "https://jsonplaceholder.typicode.com/posts",
        data
      );
      console.log("Created Post:", response.data);

      toast.success("Post created successfully 🎉");

      reset(); // مسح الفورم بعد الإرسال
      setTimeout(() => navigate("/"), 1500); // بعد ثانية ونص رجّع للهوم
    } catch (error) {
      console.error("Error creating post:", error);

      // 👇 هنا الجزء الجديد الخاص بأخطاء السيرفر
      if (error.response) {
        // السيرفر رد بحاجة زي 400 / 500
        toast.error(
          `Server Error (${error.response.status}): ${
            error.response.data?.message || "Something went wrong"
          }`
        );
      } else if (error.request) {
        // مفيش response (مشكلة نت)
        toast.error("No response from server. Please check your internet.");
      } else {
        // خطأ غير متوقع
        toast.error(`Error: ${error.message}`);
      }
    }
  };

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
          p: 4,
        }}>
        <Header />

        <Box sx={{ mt: 4, borderRadius: 3 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
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
                  bgcolor: "transparent",
                  flexShrink: 0,
                }}
                aria-hidden="true">
                <LuNotebookPen style={{ fontSize: 20 }} />
              </Box>
              <Box component="span">Create Post</Box>
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "start",
              bgcolor: "rgba(188, 184, 184, 0.72)",
              p: 2,
              pb: 6,
            }}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              style={{
                backgroundColor: "white",
                padding: "30px",
                borderRadius: "0.6rem",
                minWidth: "60%",
              }}>
              <Typography
                sx={{ fontSize: 14, fontWeight: 600, mb: 1, color: "black" }}>
                Title
              </Typography>
              <TextField
                fullWidth
                placeholder="Enter post title"
                {...register("title")}
                error={!!errors.title}
                sx={{
                  bgcolor: "rgba(0, 0, 0, 0.1)",
                  borderRadius: 4,
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "none",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    border: "none",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    border: "none",
                  },
                  "& .MuiInputBase-root": {
                    outline: "none",
                  },
                }}
              />{" "}
              {errors.title && (
                <Typography sx={{ color: "red", fontSize: 12, mt: 0.5 }}>
                  {errors.title.message}
                </Typography>
              )}
              <Typography
                sx={{ fontSize: 14, fontWeight: 600, mt: 4, color: "black" }}>
                Body
              </Typography>
              <TextField
                fullWidth
                margin="normal"
                multiline
                rows={6}
                placeholder="Enter post body"
                {...register("body")}
                error={!!errors.body}
                sx={{
                  mt: 1,
                  bgcolor: "rgba(0, 0, 0, 0.1)",
                  borderRadius: 4,
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "none",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    border: "none",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    border: "none",
                  },
                  "& .MuiInputBase-root": {
                    outline: "none",
                  },
                }}
              />
              {errors.body && (
                <Typography sx={{ color: "red", fontSize: 12, mt: 0.5 }}>
                  {errors.body.message}
                </Typography>
              )}
              <Typography
                sx={{ fontSize: 14, fontWeight: 600, mt: 4, color: "black" }}>
                Author
              </Typography>
              <TextField
                fullWidth
                placeholder="Enter Author"
                margin="normal"
                {...register("author")}
                error={!!errors.author}
                sx={{
                  mt: 1,
                  bgcolor: "rgba(0, 0, 0, 0.1)",
                  borderRadius: 4,
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "none",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    border: "none",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    border: "none",
                  },
                  "& .MuiInputBase-root": {
                    outline: "none",
                  },
                }}
              />
              {errors.author && (
                <Typography sx={{ color: "red", fontSize: 12, mt: 0.5 }}>
                  {errors.author.message}
                </Typography>
              )}
              <Box mt={2} display="flex" justifyContent="end">
                <Button
                  type="submit"
                  variant="contained"
                  disabled={isSubmitting}
                  sx={{
                    color: "white",
                    bgcolor: "rgba(51, 51, 51, 1)",
                    px: { xs: 2, sm: 5, md: 10 },
                  }}>
                  {isSubmitting ? "Creating..." : "Create Post"}
                </Button>
              </Box>
            </form>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
