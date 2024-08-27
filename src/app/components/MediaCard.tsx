import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { Grid, Box } from "@mui/material";

export default function MediaCard({
  title,
  description,
  media,
  mediaTitle,
  _href,
}) {
  return (
    <Link href={_href}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          height: "100%",
        }}
      >
        <Card
          sx={{
            width: 325,
            minWidth: 325,
            display: "flex",
            flexDirection: "column",
            cursor: "pointer", // Change cursor to pointer to indicate it's clickable
            transition: "transform 0.2s ease, box-shadow 0.2s ease", // Smooth transition for hover effects
            "&:hover": {
              transform: "scale(1.05)", // Slightly scale up the card on hover
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Add shadow to create depth
            },
            "&:focus": {
              outline: "2px solid #003366", // Add a border on focus for accessibility
            },
            height: "100%", // Ensure card takes full height of container
          }}
        >
          <CardMedia sx={{ height: 180 }} image={media} title={mediaTitle} />
          <CardContent sx={{ flexGrow: 1 }}>
            <Typography gutterBottom variant="h5" component="div">
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Link>
  );
}
