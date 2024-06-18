import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

// third-party
import { IntlProvider } from 'react-intl';

// project import
import useConfig from 'hooks/useConfig';

// load locales files
const loadLocaleData = (locale) => {
  switch (locale) {
    case 'en':
      return import('utils/locales/en.json');
    case 'ro':
    default:
      return import('utils/locales/ro.json');
  }
};
// ==============================|| LOCALIZATION ||============================== //

const Locales = ({ children }) => {
  const { i18n } = useConfig();

  const [messages, setMessages] = useState();

  useEffect(() => {
    loadLocaleData(i18n).then((d) => {
      setMessages(d.default);
    });
  }, [i18n]);

  return (
    <>
      {messages && (
        <IntlProvider locale={i18n} messages={messages}>
          {children}
        </IntlProvider>
      )}
    </>
  );
};

Locales.propTypes = {
  children: PropTypes.node
};

export default Locales;
