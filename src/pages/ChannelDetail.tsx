import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";
import Videos from "../components/Videos";
import ChannelCard from "../components/ChannelCard";
import { fetchFromAPI } from "../utils/fetchFromAPI";
import { Item as ChannelItem } from "../utils/types/channel";
import { Item as VideoItem } from "../utils/types/video";

const ChannelDetail = () => {
  const { id } = useParams();
  const [channelDetail, setChannelDetail] = useState<ChannelItem>(
    {} as ChannelItem
  );
  const [videos, setVideos] = useState<VideoItem[]>([]);
  useEffect(() => {
    const fetcher = async () => {
      const data = await Promise.all([
        fetchFromAPI(`channels?part=snippet&id=${id}`),
        fetchFromAPI(`search?channelId=${id}&part=snippet&order=date`),
      ]);
      setChannelDetail(data[0].items[0]);
      setVideos(data[1].items);
    };
    fetcher();
  }, [id]);

  return (
    <Box minHeight={"95vh"}>
      <Box>
        <div
          style={{
            background:
              "linear-gradient(90deg, rgba(0,238,247,1) 0%, rgba(206,3,184,1) 100%)",
            zIndex: 10,
            height: 300,
          }}
        />
        <ChannelCard channelDetail={channelDetail} marginTop="-93px" />
      </Box>
      <Box display={"flex"} p="2" mx={"auto"} width={"fit-content"}>
        <Videos videos={videos} />
      </Box>
    </Box>
  );
};

export default ChannelDetail;
