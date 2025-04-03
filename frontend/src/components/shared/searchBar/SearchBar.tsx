import { SearchOutlined } from "@mui/icons-material";
import ClearIcon from "@mui/icons-material/Clear";
import { IconButton, Input, InputAdornment } from "@mui/material";
import React, { useEffect } from "react";
import { useDebouncedCallback } from "use-debounce";
import classes from "./SearchBar.module.css";
interface SearcheBarProps {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}
const SearchBar = ({ value, setValue }: SearcheBarProps) => {
  const [intputValue, setInputValue] = React.useState(value);

  const debounced = useDebouncedCallback((value) => {
    setValue(value);
  }, 500);

  useEffect(() => {
    if (intputValue !== "") {
      debounced(intputValue);
    }
  }, [intputValue]);

  return (
    <div>
      <Input
        placeholder="search by title ..."
        className={classes.input}
        disableUnderline
        value={intputValue}
        onChange={(e) => {
          setInputValue(e.target.value.trim());
        }}
        endAdornment={
          <InputAdornment position="end">
            <IconButton>
              {value ? (
                <ClearIcon
                  onClick={() => {
                    setInputValue("");
                    setValue("");
                  }}
                />
              ) : (
                <SearchOutlined />
              )}
            </IconButton>
          </InputAdornment>
        }
      ></Input>
    </div>
  );
};

export default SearchBar;
