import { gql, useApolloClient } from '@apollo/client';
import { useEffect } from 'react';
import graphQLClient from '../components/ApolloClient';

function Me() {
  const client = useApolloClient();

  useEffect(() => {
    client.query({
      query: gql`query Query {
        allUsers {
          username
          img_url
        }
      }`,
    })
      .then((results) => { console.log(results); })
      .catch((err) => {console.log(err);});
  }, [client]);

  return (<h1>This is my personal space!</h1>);
}

export async function getServerSideProps() {
  const client = graphQLClient;
  const { data } = await client.query({
    query: gql`query Query {
      allUsers {
        username
        img_url
      }
    }`,
  });
  return { props: { users: data.allUsers } };
}

export default Me;
