"use client";
import {useState, memo} from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import {useDebounce} from "use-debounce";
import {getData} from "@/lib/actions/data/getData";
import useSWR from "swr";

const fetcher = (url) => getData(url);

const AutoCompleteForm = memo(function AutoCompleteForm({
  selectedDetails,
  setSelectedDetails,
  columnName,
  title,
  variant,
  endpoint,
  size,
  disabled = false,
}) {
  const [inputValue, setInputValue] = useState("");
  const [debouncedInputValue] = useDebounce(inputValue, 300);

  const {data, error} = useSWR(
    `${endpoint}/?search=${debouncedInputValue}`,
    fetcher
  );

  if (error) return <div>Failed to load</div>;

  const handleChange = (event, newValue) => {
    if (newValue) {
      setSelectedDetails({id: newValue.id, name: newValue[columnName]});
    } else {
      setSelectedDetails(null);
    }
  };

  return (
    <Autocomplete
      id="async-autocomplete"
      openOnFocus
      options={data || []}
      loading={!data}
      disabled={disabled}
      value={
        selectedDetails
          ? {[columnName]: selectedDetails.name, id: selectedDetails.id}
          : null
      }
      onChange={handleChange}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => setInputValue(newInputValue)}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      getOptionLabel={(option) => option[columnName] || ""}
      renderInput={(params) => (
        <TextField
          {...params}
          label={title}
          variant={variant}
          size={size}
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {!data ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
      renderOption={(props, option) => (
        <li {...props} key={option.id}>
          {option[columnName]}
        </li>
      )}
    />
  );
});

export default AutoCompleteForm;
