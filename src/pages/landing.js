import { useEffect, useState } from 'react';

// material-ui
import { alpha, useTheme } from '@mui/material/styles';
import { Box, CardMedia, FormControlLabel, Radio, RadioGroup, Slide, Stack } from '@mui/material';

// third-party
import { presetDarkPalettes, presetPalettes } from '@ant-design/colors';
import IconButton from 'components/@extended/IconButton';

// project import
import MainCard from 'components/MainCard';

// assets
import { CheckOutlined } from '@ant-design/icons';

const dashImage = require.context('assets/images/landing', true);

// ==============================|| LANDING PAGE ||============================== //

const Landing = () => {
  const theme = useTheme();

  const { mode, presetColor, onChangePresetColor } = useConfig();

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const listenToScroll = () => {
      let heightToHideFrom = 250;
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;

      if (winScroll > heightToHideFrom) {
        setVisible(true);
      } else {
        visible && setVisible(false);
      }
    };

    window.addEventListener('scroll', listenToScroll);
    return () => window.removeEventListener('scroll', listenToScroll);
  }, [visible]);

  const colors = mode === 'dark' ? presetDarkPalettes : presetPalettes;
  const { blue } = colors;
  const colorOptions = [
    {
      id: 'theme1',
      primary: mode === 'dark' ? '#305bdd' : '#3366FF'
    },
    {
      id: 'theme2',
      primary: mode === 'dark' ? '#655ac8' : '#7265E6'
    },
    {
      id: 'theme3',
      primary: mode === 'dark' ? '#0a7d3e' : '#068e44'
    },
    {
      id: 'theme4',
      primary: mode === 'dark' ? '#5d7dcb' : '#3c64d0'
    },
    {
      id: 'default',
      primary: blue[5]
    },
    {
      id: 'theme5',
      primary: mode === 'dark' ? '#d26415' : '#f27013'
    },
    {
      id: 'theme6',
      primary: mode === 'dark' ? '#288d99' : '#2aa1af'
    },
    {
      id: 'theme7',
      primary: mode === 'dark' ? '#05934c' : '#00a854'
    },
    {
      id: 'theme8',
      primary: mode === 'dark' ? '#058478' : '#009688'
    }
  ];

  const handlePresetColorChange = (event) => {
    onChangePresetColor(event.target.value);
  };

  return (
    <>
      <Box
        sx={{
          position: 'relative',
          bgcolor: theme.palette.mode === 'dark' ? 'grey.0' : 'grey.800',
          overflow: 'hidden',
          minHeight: '100vh',
          '&>*': {
            position: 'relative',
            zIndex: 5
          },
          '&:before': {
            content: '""',
            position: 'absolute',
            width: '100%',
            height: '100%',
            top: 0,
            left: 0,
            zIndex: 2,
            background: 'linear-gradient(329.36deg, rgb(0, 0, 0) 14.79%, rgba(67, 67, 67, 0.28) 64.86%)'
          }
        }}
      >
        <CardMedia
          component="img"
          image={dashImage(`./bg-mockup-${presetColor}.png`)}
          sx={{
            position: 'absolute',
            width: { md: '78%', lg: '70%', xl: '65%' },
            right: { md: '-14%', lg: '-4%', xl: '-2%' },
            top: { md: '16%', lg: '12%', xl: '8%' },
            zIndex: 1,
            display: { xs: 'none', md: 'block' }
          }}
        />
      </Box>
      <Slide direction={theme.direction === 'rtl' ? 'right' : 'left'} in={visible} mountOnEnter unmountOnExit>
        <MainCard
          sx={{
            width: { xs: '100%', sm: 'auto' },
            position: 'fixed',
            zIndex: 9,
            right: { xs: 0, sm: 16 },
            bottom: { xs: 0, sm: '25%' },
            borderRadius: { xs: 0, sm: 1 }
          }}
          content={false}
          shadow={theme.customShadows.z1}
          boxShadow
          border={false}
        >
          <RadioGroup
            sx={{ alignItems: { xs: 'center', sm: 'flex-end' }, p: 1.25 }}
            aria-label="payment-card"
            name="payment-card"
            value={presetColor}
            onChange={handlePresetColorChange}
          >
            <Stack direction={{ xs: 'row', sm: 'column' }} spacing={1} alignItems="center">
              {colorOptions.map((color, index) => (
                <FormControlLabel
                  key={index}
                  control={<Radio value={color.id} sx={{ opacity: 0, position: 'absolute', zIndex: 9 }} />}
                  sx={{
                    mr: 0,
                    ml: 0,
                    zIndex: 1,
                    '&:hover': {
                      position: 'relative',
                      '& .MuiIconButton-root:after': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        background: '#fff',
                        opacity: 0.3,
                        boxShadow: `0 0 6px 6px ${alpha(color.primary, 0.9)}`
                      }
                    }
                  }}
                  label={
                    <IconButton
                      shape="rounded"
                      variant="contained"
                      sx={{
                        bgcolor: color.primary,
                        width: presetColor === color.id ? 28 : 20,
                        height: presetColor === color.id ? 28 : 20
                      }}
                    >
                      {presetColor === color.id && <CheckOutlined />}
                    </IconButton>
                  }
                />
              ))}
            </Stack>
          </RadioGroup>
        </MainCard>
      </Slide>
    </>
  );
};

export default Landing;
