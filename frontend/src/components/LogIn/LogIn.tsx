import { Card, CardContent, CardHeader, Container, Grid } from "@mui/material";
import FormInput from "./FormInput";

const LoginIn: React.FC = () => {
  return (
    <div className="center-cont">
      <Container maxWidth="sm">
        <Card sx={{ width: 400, height: 400, display: "flex", alignItems: "center" }}>
          <Grid 
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center">
            <CardHeader title="Sign In" />
            <CardContent>
              <FormInput />
            </CardContent>
          </Grid>
        </Card>
      </Container>
    </div>
  )
}

export default LoginIn;