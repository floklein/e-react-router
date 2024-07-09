import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  accordionSummaryClasses,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Divider,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import { ExpandMore } from "@mui/icons-material";
import { Link, useLoaderData } from "react-router-dom";

export default function Cart() {
  const carts = useLoaderData();

  return (
    <Container>
      <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
        <Typography variant="h5">{carts.length} carts</Typography>
      </Toolbar>
      <div>
        {carts.map((cart) => (
          <Accordion key={cart.id} defaultExpanded>
            <AccordionSummary
              expandIcon={<ExpandMore />}
              sx={{
                [`& .${accordionSummaryClasses.content}`]: {
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  pr: 2,
                },
              }}
            >
              <Typography variant="h6">{cart.totalQuantity} items</Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {cart.total} EUR
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid2 container spacing={1}>
                {cart.products.map((product) => (
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
                        <CardContent>
                          <Typography variant="h6" noWrap>
                            {product.title}
                          </Typography>
                          <Stack direction="row" justifyContent="space-between">
                            <Typography variant="body2" color="textSecondary">
                              {product.price} EUR
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                              × {product.quantity}
                            </Typography>
                          </Stack>
                          <Divider />
                          <Typography variant="body2" color="textSecondary">
                            {product.total} EUR
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Grid2>
                ))}
              </Grid2>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </Container>
  );
}
