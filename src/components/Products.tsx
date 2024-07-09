import {
  Container,
  Toolbar,
  Typography,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  styled,
  alpha,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import Search from "./Search";
import { Link, useLoaderData } from "react-router-dom";

const Counter = styled(Typography)(({ theme }) => ({
  display: "inline-block",
  float: "right",
  marginRight: theme.spacing(1),
  marginTop: theme.spacing(-1),
  paddingLeft: theme.spacing(0.75),
  paddingRight: theme.spacing(0.75),
  paddingTop: theme.spacing(0.5),
  paddingBottom: theme.spacing(0.5),
  color: theme.palette.common.white,
  borderRadius: theme.shape.borderRadius,
  lineHeight: 1,
  backgroundColor: alpha(theme.palette.common.black, 0.5),
  transform: "translateY(-100%)",
}));

export default function Products() {
  const products = useLoaderData();

  return (
    <Container>
      <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
        <Typography variant="h5">Products</Typography>
        <Search />
      </Toolbar>
      <Grid2 container spacing={1}>
        {products.map((product) => (
          <Grid2 xs={12} sm={6} md={4} key={product.id}>
            <Card elevation={0} sx={{ height: 1 }}>
              <CardActionArea
                component={Link}
                to={`/product/${product.id}`}
                sx={{ height: 1 }}
              >
                <CardMedia
                  component="img"
                  image={product.thumbnail}
                  alt={product.title}
                  loading="lazy"
                />
                {product.images.length > 1 && (
                  <Counter variant="caption">
                    +{product.images.length - 1}
                  </Counter>
                )}
                <CardContent>
                  <Typography variant="h6">{product.title}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {product.price} EUR
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid2>
        ))}
      </Grid2>
    </Container>
  );
}
