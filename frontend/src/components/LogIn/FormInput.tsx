import { Button, Grid, TextField } from "@mui/material";
import axios from "axios";
import { useRef, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useAuth from "../Auth/hookAuth";
import styles from './forminput.module.css';

interface Inputs { 
  username: string;
  password: string;
}

const FormInput: React.FC = () => {
  const { control, handleSubmit, formState:{ errors } } = useForm<Inputs>({
    defaultValues: {
      username: '',
      password: ''
    }
  })
  console.log(errors);

  const ref = useRef();
  const { logIn } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<Inputs> = async(data) => {
    setIsLoading(true);

    axios.post('http://localhost:5000/api/u/login', data)
      .then((response) => {
        console.log(response);
        if (logIn) {
          logIn(response.data.user);
          navigate('/');
        }
      }).catch((error) => {
        throw new Error(error);
      }).finally(() => {
        setIsLoading(false);
      });
  }


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
          render={({field}) => <TextField autoComplete="off" inputRef={ref} required id="outlined-required" label="Username" {...field} className={styles.input} />}
        />
        <Controller
          name="password"
          control={control}
          render={({field}) => <TextField autoComplete="off" inputRef={ref} required id="outlined-password-input" type="password" label="Password" {...field} className={styles.input} />}
        />
        <Button variant="outlined" disabled={isLoading} className="field" type="submit" style={{ width: 210, paddingBlock: 20, borderRadius: 40, marginTop: 20, height: 40 }}>Submit</Button>
      </Grid>
    </form>
  )
};

export default FormInput;