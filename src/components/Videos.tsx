import { Stack, Box } from "@mui/material";
import { Item as VideoItem } from "../utils/types/video";
import VideoCard from "./VideoCard";

type Props = {
  videos: VideoItem[];
  direction?: "column" | "row";
};

const Videos = ({ videos, direction = "row" }: Props) => {
  return (
    <Stack
      direction={direction}
      flexWrap={"wrap"}
      justifyContent={"center"}
      gap={2}
    >
      {videos.map((item, index) => (
        <Box key={index}>
          <VideoCard video={item} />
        </Box>
      ))}
    </Stack>
  );
};

export default Videos;
