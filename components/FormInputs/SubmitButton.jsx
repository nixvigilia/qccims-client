import {Plus} from "lucide-react";
import React from "react";
import {Button, CircularProgress} from "@mui/material";

export default function SubmitButton({isLoading, title}) {
  return (
    <div>
      {isLoading ? (
        <Button
          variant="contained"
          color="primary"
          disabled
          startIcon={<CircularProgress size={20} />}
        >
          Saving {title} Please wait...
        </Button>
      ) : (
        <Button
          type="submit"
          variant="contained"
          color="primary"
          startIcon={<Plus />}
        >
          {title}
        </Button>
      )}
    </div>
  );
}
