import { Link } from 'react-router-dom';

import { Grid, Stack, Typography } from '@mui/material';

import AuthWrapper from 'sections/auth/AuthWrapper';
import AuthForgotPassword from 'sections/auth/auth-forms/AuthForgotPassword';
import { FormattedMessage } from 'react-intl';

const ForgotPassword = () => {
  return (
    <AuthWrapper>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
            <Typography variant="h3">
              <FormattedMessage id="lbl.forgot_password" />
            </Typography>
            <Typography component={Link} to={'/login'} variant="body1" sx={{ textDecoration: 'none' }} color="primary">
              <FormattedMessage id="lbl.back_to_login" />
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <AuthForgotPassword />
        </Grid>
      </Grid>
    </AuthWrapper>
  );
};

export default ForgotPassword;
