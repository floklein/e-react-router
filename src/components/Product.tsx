import { getRouteApi, Link } from "@tanstack/react-router";
import {
  Box,
  Button,
  Container,
  Paper,
  styled,
  Toolbar,
  Typography,
} from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { Masonry } from "@mui/lab";

const Image = styled("img")({
  objectFit: "contain",
  display: "block",
});

const productRoute = getRouteApi("/product/$productId");

export default function Product() {
  const product = productRoute.useLoaderData();

  const previous = product.id - 1;
  const next = product.id + 1;

  return (
    <Container>
      <Toolbar disableGutters>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h5">{product.title}</Typography>
          <Typography variant="subtitle2" color="textSecondary">
            {product.price} EUR
          </Typography>
        </Box>
        <Button
          disabled={previous <= 0}
          component={Link}
          to={`/product/${previous}`}
          startIcon={<ArrowBackIos />}
        >
          Previous
        </Button>
        <Button
          component={Link}
          to={`/product/${next}`}
          endIcon={<ArrowForwardIos />}
        >
          Next
        </Button>
      </Toolbar>
      <Masonry
        columns={
          product.images.length === 1
            ? [1]
            : product.images.length === 2
              ? [1, 2]
              : [1, 2, 3]
        }
      >
        {product.images.map((image) => (
          <Paper key={image} elevation={0} sx={{ overflow: "hidden" }}>
            <Image src={image} alt={product.title} width="100%" />
          </Paper>
        ))}
      </Masonry>
    </Container>
  );
}
