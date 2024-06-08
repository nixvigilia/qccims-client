"use client";
import React, {useState} from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import {useDebounce} from "use-debounce";
import {getData} from "@/lib/actions/data/getData";
import useSWR from "swr";

const fetcher = (url) => getData(url);

const AutoCompleteForm = ({selectedCustomer, setSelectedCustomer}) => {
  const [inputValue, setInputValue] = useState("");
  const [debouncedInputValue] = useDebounce(inputValue, 300);

  const {data, error} = useSWR(
    `/api/customer/list/?search=${debouncedInputValue}`,
    fetcher
  );

  if (error) return <div>Failed to load</div>;

  const handleChange = (event, newValue) => {
    if (newValue) {
      setSelectedCustomer({id: newValue.id, name: newValue.companyName});
    } else {
      setSelectedCustomer(null);
    }
  };

  return (
    <Autocomplete
      id="async-autocomplete"
      openOnFocus
      options={data || []}
      loading={!data}
      value={
        selectedCustomer
          ? {companyName: selectedCustomer.name, id: selectedCustomer.id}
          : null
      }
      onChange={handleChange}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => setInputValue(newInputValue)}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      getOptionLabel={(option) => option.companyName || ""}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search Customer"
          variant="outlined"
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
          {option.companyName}
        </li>
      )}
    />
  );
};

export default AutoCompleteForm;
