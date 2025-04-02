import { SearchOutlined } from "@mui/icons-material";
import { IconButton, Input, InputAdornment } from "@mui/material";
import React from "react";
import { useDebouncedCallback } from "use-debounce";
import classes from "./SearchBar.module.css";
interface SearcheBarProps {
  setValue: React.Dispatch<React.SetStateAction<string>>;
}
const SearchBar = ({ setValue }: SearcheBarProps) => {
  const debounced = useDebouncedCallback(
    // function
    (value) => {
      setValue(value);
    },
    500
  );
  return (
    <div>
      <Input
        placeholder="search by title ..."
        className={classes.input}
        disableUnderline
        onChange={(e) => debounced(e.target.value.trim())}
        endAdornment={
          <InputAdornment position="end">
            <IconButton>
              <SearchOutlined />
            </IconButton>
          </InputAdornment>
        }
      ></Input>
    </div>
  );
};

export default SearchBar;
