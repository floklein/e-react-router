import { TextField } from "@mui/material";
import { ChangeEvent, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchValue, setSearchValue] = useState(
    searchParams.get("search") ?? "",
  );
  const navigateDebounce = useRef<ReturnType<typeof setTimeout>>();

  async function onSearchChange(event: ChangeEvent<HTMLInputElement>) {
    setSearchValue(event.target.value);
    clearTimeout(navigateDebounce.current);
    navigateDebounce.current = setTimeout(() => {
      setSearchParams(
        event.target.value.length ? { search: event.target.value } : {},
      );
    }, 200);
  }

  return (
    <TextField
      label="Search"
      size="small"
      type="search"
      variant="filled"
      value={searchValue}
      onChange={onSearchChange}
    />
  );
}
