import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function CustomPagination({
  totalCount,
  itemsPerPage,
  page,
  onPageChange,
}) {
  const pageCount = Math.ceil(totalCount / itemsPerPage);

  return (
    <Stack spacing={2}>
      <Pagination
        count={pageCount}
        page={page}
        onChange={(_, value) => onPageChange(value)}
        variant="outlined"
        color="primary"
      />
    </Stack>
  );
}
