import { Box, TextField, Stack, Button } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useEffect } from "react";
import { useFormik } from "formik";
import useLocalStorage from "hooks/useLocalStorage";
import { useAppDispatch } from "hooks/useAppDispatch";
import {
  loginSuccess,
  registerRequestAsync,
  userState,
} from "store/user/UserSlice";
import { useAppSelector } from "hooks/useAppSelector";
import { useNavigate } from "react-router";
import { store } from "store/Store";
import Auth from "components/Auth";
import IUser from "interface/IUser";
import { Link } from "react-router-dom";

interface IRegister extends IUser {
  password_confirmation: string;
}

const Register = () => {
  const [token, setToken] = useLocalStorage<string>("token", "");
  const [userData, setUserData] = useLocalStorage<IUser>("user", {} as IUser);
  const dispatch = useAppDispatch();
  const user = useAppSelector(userState);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      password_confirmation: "",
      firstName: "",
      lastName: "",
    },
    onSubmit: (values: IRegister): any => {
      if (values.password !== values.password_confirmation) return false; // TODO: show error message

      dispatch(
        registerRequestAsync({
          email: values.email,
          password: values.password,
          firstName: values.firstName,
          lastName: values.lastName,
        })
      ).then((res) => {
        setToken(store.getState().user.token); // TODO: improve code
        setUserData(store.getState().user.user as IUser); // TODO: improve code
        // TODO: show message to user
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
  }, [dispatch, token, userData, navigate]);

  return (
    <>
      <Auth
        title="ایجاد حساب کاربری جدید"
        action={
          <Link to="/login">
            <Button variant="outlined" href="/login">
              ورود به حساب کاربری
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
              id="firstName"
              label="نام"
              variant="outlined"
              name="firstName"
              required
              type="text"
              fullWidth
              value={formik.values.firstName}
              onChange={formik.handleChange}
              error={
                formik.touched.firstName && Boolean(formik.errors.firstName)
              }
              helperText={formik.touched.firstName && formik.errors.firstName}
            />
            <TextField
              id="lastName"
              label="نام خانوادگی"
              variant="outlined"
              required
              name="lastName"
              type="text"
              fullWidth
              value={formik.values.lastName}
              onChange={formik.handleChange}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={formik.touched.lastName && formik.errors.lastName}
            />

            <TextField
              id="password"
              label="گذرواژه"
              required
              variant="outlined"
              name="password"
              type="password"
              fullWidth
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <TextField
              id="password-confirm"
              label="تکرار گذرواژه"
              required
              variant="outlined"
              name="password_confirmation"
              type="password"
              fullWidth
              value={formik.values.password_confirmation}
              onChange={formik.handleChange}
              error={
                formik.touched.password_confirmation &&
                Boolean(formik.errors.password_confirmation)
              }
              helperText={
                formik.touched.password_confirmation &&
                formik.errors.password_confirmation
              }
            />
            <LoadingButton
              loading={user.loading}
              loadingPosition="start"
              variant="contained"
              type="submit"
              fullWidth
            >
              ثبت نام
            </LoadingButton>
          </Stack>
        </Box>
      </Auth>
    </>
  );
};

export default Register;
