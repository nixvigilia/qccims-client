"use client";
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import { useDebounce } from "use-debounce";
import { getData } from "@/lib/actions/data/getData";
import useSWR from "swr";

const fetcher = (url) => getData(url);

const AutoCompleteForm = ({ selectedSupplier, setSelectedSupplier }) => {
  const [inputValue, setInputValue] = useState("");
  const [debouncedInputValue] = useDebounce(inputValue, 300);

  const { data, error } = useSWR(
    `/api/procurement/suppliers/list?search=${debouncedInputValue}`,
    fetcher
  );

  if (error) return <div>Failed to load</div>;

  const handleSupplierChange = (event, newValue) => {
    if (newValue) {
      setSelectedSupplier({ id: newValue.id, name: newValue.supplierName });
    } else {
      setSelectedSupplier(null);
    }
  };

  return (
    <Autocomplete
      id="async-autocomplete"
      openOnFocus
      options={data || []}
      loading={!data}
      value={
        selectedSupplier
          ? { supplierName: selectedSupplier.name, id: selectedSupplier.id }
          : null
      }
      onChange={handleSupplierChange}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => setInputValue(newInputValue)}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      getOptionLabel={(option) => option.supplierName || ""}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Type of Material"
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
          {option.supplierName}
        </li>
      )}
    />
  );
};

export default AutoCompleteForm;
