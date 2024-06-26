// material-ui
import { Grid, Typography, Button, Stack, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// project import
import MainCard from 'components/MainCard';

//asset
import WelcomeImage from 'assets/images/analytics/welcome-banner.png';
import WelcomeImageArrow from 'assets/images/analytics/welcome-arrow.png';
import { FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router';

// ==============================|| ANALYTICS - WELCOME ||============================== //

const WelcomeBanner = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <MainCard
      border={false}
      sx={{
        background:
          theme.direction === 'rtl'
            ? `linear-gradient(60.38deg, ${theme.palette.primary.lighter} 114%, ${theme.palette.primary.light} 34.42%, ${theme.palette.primary.main} 60.95%, ${theme.palette.primary.dark} 84.83%, ${theme.palette.primary.darker} 104.37%)`
            : `linear-gradient(250.38deg, ${theme.palette.primary.lighter} 2.39%, ${theme.palette.primary.light} 34.42%, ${theme.palette.primary.main} 60.95%, ${theme.palette.primary.dark} 84.83%, ${theme.palette.primary.darker} 104.37%)`
      }}
    >
      <Grid container>
        <Grid item md={6} sm={6} xs={12}>
          <Stack spacing={2} sx={{ padding: 3.4 }}>
            <Typography variant="h2" color={theme.palette.background.paper}>
              <FormattedMessage id="lbl.dashboard_welcome_header" />,
            </Typography>
            <Typography variant="h6" color={theme.palette.background.paper}>
              <FormattedMessage id="lbl.dashboard_welcome_message" />
            </Typography>
            <Typography variant="h6" color={theme.palette.background.paper}>
              <FormattedMessage id="lbl.dashboard_welcome_second_message" />
            </Typography>
            <Box>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => navigate('/configuration')}
                sx={{ color: theme.palette.background.paper, borderColor: theme.palette.background.paper }}
              >
                <FormattedMessage id="lbl.dashboard_welcome_button" />
              </Button>
            </Box>
          </Stack>
        </Grid>
        <Grid item sm={6} xs={12} sx={{ display: { xs: 'none', sm: 'initial' } }}>
          <Stack sx={{ position: 'relative', pr: { sm: 3, md: 8 } }} justifyContent="center" alignItems="flex-end">
            <img src={WelcomeImage} alt="Welcome" />
            <Box sx={{ position: 'absolute', bottom: 0, right: '10%' }}>
              <img src={WelcomeImageArrow} alt="Welcome Arrow" />
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </MainCard>
  );
};

export default WelcomeBanner;
