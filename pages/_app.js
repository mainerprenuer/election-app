import Layout from "../comps/global/Layout";
import "../styles/index.scss";
import { ApolloProvider } from "@apollo/client";
import graphqlClient from "../utils/apollo";

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={graphqlClient}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
  );
}

export default MyApp;
