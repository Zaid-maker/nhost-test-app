import { useUserId } from "@nhost/react";
import React, { useContext } from "react";

/* Importing the `gql` and `useQuery` functions from the `@apollo/client` package. */
import { gql, useQuery } from "@apollo/client";

/* A GraphQL query that is used to fetch the user data from the database. */
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
`;

/* Creating a context object that can be used to pass data down the component tree. */
const UserContext = React.createContext(null);

/**
 * It returns the currently logged in user
 * @returns The `UserProvider` component is being returned.
 */
export function UserProvider({ children = null }) {
  /* The `useUserId` hook is a custom hook that is provided by the `@nhost/react` package. It returns
  the id of the currently logged in user. */
  const id = useUserId();

  /* Destructuring the `useQuery` hook. */
  const { loading, error, data } = useQuery(GET_USER_QUERY, {
    variables: { id },
    skip: !id,
  });

  /* The `?` is a new operator in JavaScript that is called the optional chaining operator. It allows
  you to access a property of an object without having to check if the object is null or undefined. */
  const user = data?.user;

  /* Returning an error message if there is an error. */
  if (error) {
    return <p>Something went wrong. Try to refresh the page.</p>;
  }

  /* Returning null if the data is still loading. */
  if (loading) {
    return null;
  }

  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
}

/**
 * It returns the value of the UserContext object
 * @returns The useContext hook is being used to return the UserContext.
 */
export function useUserContext() {
  return useContext(UserContext);
}
