import Header from '../components/Header';
import '../styles/globals.css';
import { ApolloProvider } from '@apollo/client';
import withApollo from '../utils/withApollo';

function MyApp({ Component, pageProps, apollo }) {
  return (
    <ApolloProvider client={apollo}>
      <Header />
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

MyApp.getInitialProps = async function ({ Component, ctx }) {
  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  pageProps.query = ctx.query;
  return { pageProps };
};

export default withApollo(MyApp);
