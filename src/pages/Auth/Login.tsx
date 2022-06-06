import { Box, TextField, Stack, Button } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useEffect } from "react";
import { useFormik } from "formik";
import useLocalStorage from "hooks/useLocalStorage";
import { useAppDispatch } from "hooks/useAppDispatch";
import {
  loginRequestAsync,
  loginSuccess,
  userState,
} from "store/user/UserSlice";
import { useAppSelector } from "hooks/useAppSelector";
import { useNavigate } from "react-router";
import { store } from "store/Store";
import Auth from "components/Auth";
import IUser from "interface/IUser";
import { Link } from "react-router-dom";

interface Values {
  email: string;
  password: string;
}

const Login = () => {
  const [token, setToken] = useLocalStorage<string>("token", "");
  const [userData, setUserData] = useLocalStorage<IUser>("user", {} as IUser);
  const dispatch = useAppDispatch();
  const user = useAppSelector(userState);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values: Values) => {
      dispatch(
        loginRequestAsync({ email: values.email, password: values.password })
      ).then((res) => {
        setToken(store.getState().user.token); // TODO: improve code
        setUserData(store.getState().user.user as IUser); // TODO: improve code
        return (
          !!store.getState().user.token && navigate("/panel", { replace: true })
        );
      });

      // TODO: show error message
    },
  });

  useEffect(() => {
    if (token && userData) {
      dispatch(
        loginSuccess({
          user: userData as IUser,
          token: token,
          loading: false,
          errors: [],
        })
      );

      navigate("/panel", { replace: true });
    }
  }, [dispatch, navigate, token, userData]);

  return (
    <>
      <Auth
        title="ورود به حساب کاربری"
        action={
          <Link to="/register">
            <Button variant="outlined" >
              ثبت نام
            </Button>
          </Link>
        }
      >
        <Box component="form" onSubmit={formik.handleSubmit}>
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={2}
            px={5}
          >
            <TextField
              id="email"
              label="ایمیل"
              variant="outlined"
              required
              name="email"
              type="email"
              fullWidth
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />

            <TextField
              id="password"
              label="گذرواژه"
              variant="outlined"
              required
              name="password"
              type="password"
              fullWidth
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <LoadingButton
              loading={user.loading}
              loadingPosition="start"
              variant="contained"
              type="submit"
              fullWidth
            >
              ورود
            </LoadingButton>
          </Stack>
        </Box>
      </Auth>
    </>
  );
};

export default Login;
