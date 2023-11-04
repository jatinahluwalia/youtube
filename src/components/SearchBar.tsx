import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Paper, IconButton } from "@mui/material";
import { Search } from "@mui/icons-material";

const SearchBar = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState<string>("");
  return (
    <Paper
      component={"form"}
      onSubmit={() => {}}
      sx={{
        borderRadius: 20,
        border: "1px solid #e3e3e3",
        pl: 2,
        boxShadow: "none",
        mr: { sm: 5 },
      }}
    >
      <input
        className="search-bar"
        placeholder="Search..."
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
      <IconButton
        type="submit"
        sx={{
          p: "10px",
          color: "red",
        }}
        onClick={() => navigate(`/search/${value}`)}
      >
        <Search />
      </IconButton>
    </Paper>
  );
};

export default SearchBar;
