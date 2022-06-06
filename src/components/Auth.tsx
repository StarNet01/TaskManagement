import {
  Grid,
  Card,
  CardContent,
  Typography,
  CardActions,
} from "@mui/material";
import TopBar from "components/TopBar";

type Props = {
  title: string;
  children: JSX.Element;
  action: JSX.Element;
};

const Auth = ({ title, children, action }: Props) => {
  return (
    <>
      <TopBar />
      <Grid
        container
        spacing={2}
        justifyContent="center"
        alignItems="center"
        mt={3}
      >
        <Grid item xs={12} md={6} lg={4}>
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography
                sx={{ fontSize: 18 }}
                color="primary"
                gutterBottom
                fontWeight="bold"
                textAlign="center"
              >
                {title}
              </Typography>
              <hr />
              {children}
            </CardContent>
            <CardActions>{action}</CardActions>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default Auth;
