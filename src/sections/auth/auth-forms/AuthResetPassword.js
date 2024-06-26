import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// material-ui
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useIntl } from 'react-intl';
import { useLocation } from 'react-router-dom';
import useAuth from 'hooks/useAuth';

// project import
import useScriptRef from 'hooks/useScriptRef';
import IconButton from 'components/@extended/IconButton';
import AnimateButton from 'components/@extended/AnimateButton';
import { strengthColor, strengthIndicator } from 'utils/password-strength';
import { openSnackbar } from 'store/reducers/snackbar';

// assets
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { getResetPasswordErrorDescription } from 'utils/errorDescription';

// ============================|| STATIC - RESET PASSWORD ||============================ //

const AuthResetPassword = () => {
  const location = useLocation();
  const intl = useIntl();
  const scriptedRef = useScriptRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [level, setLevel] = useState();
  const { confirmResetPassword } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const changePassword = (value) => {
    const temp = strengthIndicator(value);
    setLevel(strengthColor(temp));
  };

  useEffect(() => {
    changePassword('');
  }, []);

  Yup.addMethod(Yup.string, 'passwordLevel', function (errorMessage) {
    return this.test(`password-level`, errorMessage, function () {
      const { path, createError } = this;

      return level.id > 2 || createError({ path, message: errorMessage });
    });
  });

  return (
    <>
      <Formik
        initialValues={{
          password: '',
          confirmPassword: '',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          password: Yup.string()
            .max(255)
            .required(intl.formatMessage({ id: 'lbl.password_required' }))
            .passwordLevel(intl.formatMessage({ id: 'lbl.password_requirements' })),
          confirmPassword: Yup.string()
            .required(intl.formatMessage({ id: 'lbl.confirm_password_required' }))
            .when('password', {
              is: (val) => !!(val && val.length > 0),
              then: Yup.string().oneOf([Yup.ref('password')], intl.formatMessage({ id: 'lbl.password_match' }))
            })
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            // password reset
            if (scriptedRef.current) {
              const searchParams = new URLSearchParams(location.search);
              const oobCode = searchParams.get('oobCode');
              await confirmResetPassword(oobCode, values.password);
              setStatus({ success: true });
              setSubmitting(false);

              dispatch(
                openSnackbar({
                  open: true,
                  message: intl.formatMessage({ id: 'lbl.successfuly_reset_password' }),
                  variant: 'alert',
                  alert: {
                    color: 'success'
                  },
                  close: false
                })
              );

              setTimeout(() => {
                navigate('/login', { replace: true });
              }, 1500);
            }
          } catch (err) {
            console.error(err);
            if (scriptedRef.current) {
              setStatus({ success: false });
              setErrors({ submit: getResetPasswordErrorDescription(err) });
              setSubmitting(false);
            }
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="password-reset">{intl.formatMessage({ id: 'lbl.password' })}</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.password && errors.password)}
                    id="password-reset"
                    type={showPassword ? 'text' : 'password'}
                    value={values.password}
                    name="password"
                    onBlur={handleBlur}
                    onChange={(e) => {
                      handleChange(e);
                      changePassword(e.target.value);
                    }}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                          color="secondary"
                        >
                          {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                        </IconButton>
                      </InputAdornment>
                    }
                    placeholder={intl.formatMessage({ id: 'ph.enter_password' })}
                  />
                  {touched.password && errors.password && (
                    <FormHelperText error id="helper-text-password-reset">
                      {errors.password}
                    </FormHelperText>
                  )}
                </Stack>
                <FormControl fullWidth sx={{ mt: 2 }}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item>
                      <Box sx={{ bgcolor: level?.color, width: 85, height: 8, borderRadius: '7px' }} />
                    </Grid>
                    <Grid item>
                      <Typography variant="subtitle1" fontSize="0.75rem">
                        {level && intl.formatMessage({ id: level.label })}
                      </Typography>
                    </Grid>
                  </Grid>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="confirm-password-reset">{intl.formatMessage({ id: 'lbl.confirm_password' })}</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.confirmPassword && errors.confirmPassword)}
                    id="confirm-password-reset"
                    type="password"
                    value={values.confirmPassword}
                    name="confirmPassword"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder={intl.formatMessage({ id: 'ph.enter_confirm_password' })}
                  />
                  {touched.confirmPassword && errors.confirmPassword && (
                    <FormHelperText error id="helper-text-confirm-password-reset">
                      {errors.confirmPassword}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>

              {errors.submit && (
                <Grid item xs={12}>
                  <FormHelperText error>{errors.submit}</FormHelperText>
                </Grid>
              )}
              <Grid item xs={12}>
                <AnimateButton>
                  <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="primary">
                    {intl.formatMessage({ id: 'lbl.reset_password' })}
                  </Button>
                </AnimateButton>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </>
  );
};

export default AuthResetPassword;
