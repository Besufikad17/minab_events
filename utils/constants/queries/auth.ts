import gql from "graphql-tag";

export const registerMutation = gql`
    mutation RegisterAction($first_name: String!, $last_name: String!, $email: String!, $phone_number: String!, $password: String!, $remember_me: Boolean!) {
        Register(first_name: $first_name, last_name: $last_name, email: $email, phone_number: $phone_number, password: $password, remember_me: $remember_me) {
  	    token
        }
    }
`;

export const loginMutation = gql`
    mutation Login($login_text: String!, $password: String!, $remember_me: Boolean!) {
        Login (login_text: $login_text, password: $password, remember_me: $remember_me) {
            token
        }
    }
`;
