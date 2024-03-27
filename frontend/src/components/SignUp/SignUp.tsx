import { Card, CardContent, CardHeader, Container, Grid } from "@mui/material";
import SignForm from "./SignForm";

const SignUp: React.FC = () => {
  return (
    <div className="center-cont">
      <Container>
        <Card sx={{ width: 400, height: 560, padding: "40px", display: "flex ", alignContent: "center" }}>
          <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center">
            <CardHeader title="Sign Up" />
            <CardContent>
              <SignForm/>
            </CardContent>
          </Grid>
        </Card>
      </Container>
    </div>
  )
}

export default SignUp;