import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete, {autocompleteClasses} from "@mui/material/Autocomplete";
import useMediaQuery from "@mui/material/useMediaQuery";
import ListSubheader from "@mui/material/ListSubheader";
import Popper from "@mui/material/Popper";
import {useTheme, styled} from "@mui/material/styles";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";

const LISTBOX_PADDING = 8; // px

const OuterElementContext = React.createContext({});

const OuterElementType = React.forwardRef((props, ref) => {
  const outerProps = React.useContext(OuterElementContext);
  return <div ref={ref} {...props} {...outerProps} />;
});

const ListboxComponent = React.forwardRef(function ListboxComponent(
  props,
  ref
) {
  const {children, ...other} = props;
  const itemData = React.Children.toArray(children).reduce((acc, item) => {
    acc.push(item);
    if (item.children) {
      acc.push(...item.children);
    }
    return acc;
  }, []);

  const theme = useTheme();
  const smUp = useMediaQuery(theme.breakpoints.up("sm"), {
    noSsr: true,
  });
  const itemCount = itemData.length;
  const itemSize = smUp ? 36 : 48;

  return (
    <div ref={ref} {...other}>
      <ul style={{padding: 0, margin: 0}}>
        {itemData.map((item, index) => {
          const style = {
            top: index * itemSize + LISTBOX_PADDING,
            height: itemSize,
          };

          if (item.hasOwnProperty("group")) {
            return (
              <ListSubheader
                key={item.key || index}
                component="div"
                style={style}
              >
                {item.group}
              </ListSubheader>
            );
          }

          return (
            <Typography
              key={item.key || index}
              component="li"
              {...item.props}
              noWrap
              style={style}
            >
              {item.props.children}
            </Typography>
          );
        })}
      </ul>
    </div>
  );
});

const StyledPopper = styled(Popper)({
  [`& .${autocompleteClasses.listbox}`]: {
    boxSizing: "border-box",
    "& ul": {
      padding: 0,
      margin: 0,
    },
  },
});

const SearchAsync = ({
  suppliers,
  inputValue,
  setInputValue,
  selectedSupplier,
  setSelectedSupplier,
}) => {
  const [open, setOpen] = React.useState(false);
  const loading = !suppliers;

  return (
    <Autocomplete
      id="virtualize-demo"
      sx={{width: 300}}
      disableListWrap
      PopperComponent={StyledPopper}
      ListboxComponent={ListboxComponent}
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      options={suppliers || []}
      loading={loading}
      value={selectedSupplier}
      onChange={(event, newValue) => {
        setSelectedSupplier(newValue);
      }}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      getOptionLabel={(option) => option.supplierName}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search Supplier"
          variant="outlined"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
      renderOption={(props, option) => {
        const {key, ...rest} = props;
        return (
          <li {...rest} key={option.id}>
            {option.supplierName}
          </li>
        );
      }}
    />
  );
};

export default SearchAsync;
