import * as React from "react";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import { Box } from "@mui/material";

export default function Loading() {
  return (
    <>
      <Box sx={{ maxWidth: "32rem", mx: "auto", my: "1rem" }}>
        <Stack spacing={1}>
          {/* For variant="text", adjust the height via font-size */}
          <Skeleton variant="text" sx={{ fontSize: "1rem" }} />

          {/* For other variants, adjust the size with `width` and `height` */}
          <Skeleton variant="circular" width={40} height={40} />
          <Skeleton variant="rectangular" height={60} />
          <Skeleton variant="rounded" height={60} />
        </Stack>
      </Box>
      <Box sx={{ maxWidth: "32rem", mx: "auto", my: "1rem" }}>
        <Stack spacing={1}>
          {/* For variant="text", adjust the height via font-size */}
          <Skeleton variant="text" sx={{ fontSize: "1rem" }} />

          {/* For other variants, adjust the size with `width` and `height` */}
          <Skeleton variant="circular" width={40} height={40} />
          <Skeleton variant="rectangular" height={60} />
          <Skeleton variant="rounded" height={60} />
        </Stack>
      </Box>
      <Box sx={{ maxWidth: "32rem", mx: "auto", my: "1rem" }}>
        <Stack spacing={1}>
          {/* For variant="text", adjust the height via font-size */}
          <Skeleton variant="text" sx={{ fontSize: "1rem" }} />

          {/* For other variants, adjust the size with `width` and `height` */}
          <Skeleton variant="circular" width={40} height={40} />
          <Skeleton variant="rectangular" height={60} />
          <Skeleton variant="rounded" height={60} />
        </Stack>
      </Box>
    </>
  );
}
