import * as React from "react";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import { Box } from "@mui/material";

export default function Loading() {
  return (
    <>
      {[1, 2, 3].map((section) => (
        <Box key={section} sx={{ maxWidth: "32rem", mx: "auto", my: "1rem" }}>
          <Stack spacing={1}>
            <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
            <Skeleton variant="circular" width={40} height={40} />
            <Skeleton variant="rectangular" height={60} />
            <Skeleton variant="rounded" height={60} />
          </Stack>
        </Box>
      ))}
    </>
  );
}
