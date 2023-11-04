import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { Typography, Box, Stack } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import { fetchFromAPI } from "../utils/fetchFromAPI";
import { Item as Video } from "../utils/types/videoDetail";
import { Item as VideoItem } from "../utils/types/video";
import Videos from "../components/Videos";

const VideoDetail = () => {
  const { id } = useParams();
  const [videoDetail, setVideoDetail] = useState<Video>({} as Video);
  const [videos, setVideos] = useState<VideoItem[]>([]);

  useEffect(() => {
    fetchFromAPI(`videos?part=snippet,statistics&id=${id}`).then((data) =>
      setVideoDetail(data.items[0])
    );

    fetchFromAPI(`search?part=snippet&relatedToVideoId=${id}&type=video`).then(
      (data) => setVideos(data.items)
    );
  }, [id]);

  if (!videoDetail.snippet) return "Loading";

  const {
    snippet: { title, channelId, channelTitle },
    statistics: { viewCount, likeCount },
  } = videoDetail;

  return (
    <Box minHeight={"95vh"}>
      <Stack direction={{ sx: "column", md: "row" }}>
        <Box flex={1}>
          <Box sx={{ width: "100%", position: "sticky", top: "86px" }}>
            <div className="react-player">
              <ReactPlayer
                url={"https://www.youtube.com/watch?v=" + id}
                width={"100%"}
                height={"100%"}
                controls
              />
            </div>
            <Typography color={"#fff"} variant="h5" fontWeight={"bold"} p="2">
              {title}
            </Typography>
            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              sx={{ color: "#fff" }}
              py={1}
              px={2}
            >
              <Link to={"/channel/" + channelId}>
                <Typography variant="h6" color={"#fff"}>
                  {channelTitle}
                  <CheckCircle
                    sx={{ fontSize: "12px", color: "gray", ml: "5px" }}
                  />
                </Typography>
              </Link>
              <Stack direction={"row"} gap={"20px"} alignItems={"center"}>
                <Typography variant="body1" sx={{ opacity: 0.7 }}>
                  {(+viewCount).toLocaleString()} views
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.7 }}>
                  {(+likeCount).toLocaleString()} likes
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Box>
        <Box px={2} py={1} justifyContent={"center"} alignItems={"center"}>
          <Videos videos={videos} direction="column" />
        </Box>
      </Stack>
    </Box>
  );
};

export default VideoDetail;
