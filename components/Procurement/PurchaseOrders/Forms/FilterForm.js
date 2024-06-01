import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";

const FilterForm = () => {
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
          placeholder="Search customers"
          fullWidth
        />
      </FormControl>
      <FormControl variant="outlined" size="small" sx={{flex: 1}}>
        <FormLabel>Status</FormLabel>
        <Select
          defaultValue=""
          displayEmpty
          size="small"
          placeholder="Filter by status"
          fullWidth
        >
          <MenuItem value="paid">Active</MenuItem>
          <MenuItem value="pending">Deactivated</MenuItem>
        </Select>
      </FormControl>
      {/* <FormControl variant="outlined" size="small" sx={{flex: 1}}>
        <FormLabel>Category</FormLabel>
        <Select defaultValue="all" displayEmpty size="small" fullWidth>
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="refund">Refund</MenuItem>
          <MenuItem value="purchase">Purchase</MenuItem>
          <MenuItem value="debit">Debit</MenuItem>
        </Select>
      </FormControl> */}
      {/* <FormControl variant="outlined" size="small" sx={{flex: 1}}>
        <FormLabel>Customer</FormLabel>
        <Select defaultValue="all" displayEmpty size="small" fullWidth>
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="olivia">Olivia Rhye</MenuItem>
          <MenuItem value="steve">Steve Hampton</MenuItem>
          <MenuItem value="ciaran">Ciaran Murray</MenuItem>
          <MenuItem value="marina">Marina Macdonald</MenuItem>
          <MenuItem value="charles">Charles Fulton</MenuItem>
          <MenuItem value="jay">Jay Hoper</MenuItem>
        </Select>
      </FormControl> */}
    </div>
  );
};

export default FilterForm;
