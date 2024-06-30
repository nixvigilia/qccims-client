import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";

const FilterForm = ({onSearchChange}) => {
  return (
    <div
      style={{
        display: "flex",
        gap: "16px",
        marginBottom: "16px",
        flexWrap: "wrap",
      }}
    >
      <FormControl variant="outlined" size="small" sx={{flex: 3}}>
        <FormLabel>Search</FormLabel>
        <TextField
          variant="outlined"
          size="small"
          placeholder="Search user"
          fullWidth
          onChange={onSearchChange}
        />
      </FormControl>
      <FormControl variant="outlined" size="small" sx={{flex: 1}}>
        <FormLabel>Option</FormLabel>
        <Select defaultValue="all" displayEmpty size="small" fullWidth>
          <MenuItem value="all">All</MenuItem>
        </Select>
      </FormControl>
      <FormControl variant="outlined" size="small" sx={{flex: 1}}>
        <FormLabel>Option</FormLabel>
        <Select defaultValue="all" displayEmpty size="small" fullWidth>
          <MenuItem value="all">All</MenuItem>
        </Select>
      </FormControl>
      <FormControl variant="outlined" size="small" sx={{flex: 1}}>
        <FormLabel>Option</FormLabel>
        <Select defaultValue="all" displayEmpty size="small" fullWidth>
          <MenuItem value="all">All</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default FilterForm;
