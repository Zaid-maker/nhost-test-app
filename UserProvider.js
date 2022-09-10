import { useUserId } from '@nhost/react';
import React, { useContext } from 'react';

import { gql, useQuery } from '@apollo/client'

const GET_USER_QUERY = gql`
  query GetUser($id: uuid!) {
    user(id: $id) {
      id
      email
      displayName
      metadata
      avatarUrl
    }
  }
`

const UserContext = React.createContext(null);

export function UserProvider({ children = null }) {
  const id = useUserId();

  const { loading, error, data } = useQuery(GET_USER_QUERY, {
    variables: { id },
    skip: !id
  })

  const user = data?.user;

  if (error) {
    return <p>Something went wrong. Try to refresh the page.</p>
  }

  if (loading) {
    return null
  }

  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
}

export function useUserContext() {
  return useContext(UserContext);
}
