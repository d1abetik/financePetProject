import { Button, Grid, TextField } from "@mui/material";
import axios from "axios";
import { useRef } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import useAuth from "../Auth/hookAuth";

interface CheckValues {
  username: string;
  password: string;
  email: string;
  confirmpass: string;
}

const SignForm: React.FC = () => {
  const { handleSubmit, control, formState: {errors} } = useForm<CheckValues>();

  const ref = useRef();
  const { logIn } = useAuth();

  const onSubmit: SubmitHandler<CheckValues> = async (values) => {
    const {username, password, email} = values;
    axios.post('http://localhost:5000/api/u/reg',{ username, password, email })
      .then((response) => {
        if (logIn) {
          logIn(response.data);
        }
      }).catch((error) => {
        throw new Error(error);
      });
  };

  console.log(errors)


  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid 
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      className="gr-form">
        <Controller
          name="username"
          control={control}
          render={({field}) => <TextField autoComplete="off" inputRef={ref} id="outlined-required" label="Username" {...field} />}
        />
        <Controller
          name="email"
          control={control}
          render={({field}) => <TextField autoComplete="off" inputRef={ref} id="outlined-required" style={{ marginTop: 20 }} type="email" label="Email" {...field} />}
        />
        <Controller
          name="password"
          control={control}
          render={({field}) => <TextField autoComplete="off" inputRef={ref} id="outlined-password-input" style={{ marginTop: 20 }} type="password" label="Password" {...field} />}
        />
        <Controller
          name="confirmpass"
          control={control}
          render={({field}) => <TextField autoComplete="off" inputRef={ref} id="outlined-password-input" style={{ marginTop: 20 }} type="password" label="Confirm Password" {...field} />}
        />
        <Button variant="outlined" type="submit" style={{ width: 210, borderRadius: 40, paddingBlock: 20, marginTop: 20, height: 40 }}>Register</Button>
      </Grid>
    </form>
  )
};

export default SignForm;