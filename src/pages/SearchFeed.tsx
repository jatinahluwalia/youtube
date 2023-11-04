import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import Videos from "../components/Videos";
import { fetchFromAPI } from "../utils/fetchFromAPI";
import { useParams } from "react-router-dom";
const Feed = () => {
  const { searchTerm } = useParams();
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchFromAPI(`search?part=snippet&q=${searchTerm}`);
      setVideos(data.items);
    };
    fetchData();
  }, [searchTerm]);
  return (
    <Box p={2} sx={{ overflowY: "auto", height: "90vh", flex: 2 }}>
      <Typography
        variant="h4"
        fontWeight={"bold"}
        mb={2}
        sx={{
          color: "white",
        }}
      >
        Search results for:{" "}
        <span style={{ color: "#fc1503" }}>{searchTerm}</span>
      </Typography>
      <Videos videos={videos} />
    </Box>
  );
};

export default Feed;
