import gql from "graphql-tag";

export const registerMutation = gql`
    mutation Register($first_name: String!, $last_name: String!, $email: String!, $phone_number: String!, $password: String!) {
        Register(first_name: $first_name, last_name: $last_name, email: $email, phone_number: $phone_number, password: $password) {
  	    token
        }
    }
`;

export const loginMutation = gql`
    mutation Login($loginText: String!, $password: String!) {
        Login (input: { login_text: $loginText, password: $password }) {
            id
            first_name
            last_name
            token
        }
    }
`;