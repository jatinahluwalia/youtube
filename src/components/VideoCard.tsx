import { Link } from "react-router-dom";
import { Typography, Card, CardContent, CardMedia, Box } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";

import {
  // demoThumbnailUrl,
  demoVideoUrl,
  demoVideoTitle,
  demoChannelUrl,
  demoChannelTitle,
} from "../utils/constants";
import { Item } from "../utils/types/video";

interface Props {
  video: Item;
}

const VideoCard = ({
  video: {
    id: { videoId },
    snippet,
  },
  video: item,
}: Props) => {
  if (item.id.kind === "youtube#channel")
    return (
      <Box
        sx={{
          boxShadow: "none",
          borderRadius: "20px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: { sm: "356px", md: "320px" },
          height: "326px",
          margin: "auto",
        }}
      >
        <Link to={`/channel/${item?.id?.channelId}`}>
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              textAlign: "center",
              color: "#fff",
            }}
          >
            <CardMedia
              image={item?.snippet?.thumbnails?.high?.url}
              sx={{
                borderRadius: "50%",
                height: "180px",
                width: "180px",
                mb: 2,
                border: "1px solid #e3e3e3",
              }}
            />
            <Typography variant="h6">
              {item?.snippet?.title}
              <CheckCircle sx={{ fontSize: 14, color: "gray", ml: "5px" }} />
            </Typography>
          </CardContent>
        </Link>
      </Box>
    );
  return (
    <Card
      sx={{
        width: { xs: "100%", sm: 358, md: "320px" },
        boxShadow: "none",
        borderRadius: 0,
      }}
    >
      <Link to={videoId ? `/video/${videoId}` : demoVideoUrl}>
        <CardMedia
          image={snippet?.thumbnails?.high?.url}
          sx={{ width: { xs: "100%", sm: 358, md: 320 }, height: 180 }}
        />
        <CardContent sx={{ backgroundColor: "#1e1e1e", height: "106px" }}>
          <Link to={videoId ? `/video/${videoId}` : demoVideoUrl}>
            <Typography variant="subtitle1" fontWeight={"bold"} color={"#fff"}>
              {snippet?.title.slice(0, 60)} || {demoVideoTitle.slice(0.6)}
            </Typography>
          </Link>
          <Link
            to={
              snippet?.channelId
                ? `/channel/${snippet?.channelId}`
                : demoChannelUrl
            }
          >
            <Typography variant="subtitle2" fontWeight={"bold"} color={"gray"}>
              {snippet?.channelTitle || demoChannelTitle}
              <CheckCircle sx={{ fontSize: 12, color: "gray", ml: "5px" }} />
            </Typography>
          </Link>
        </CardContent>
      </Link>
    </Card>
  );
};

export default VideoCard;
