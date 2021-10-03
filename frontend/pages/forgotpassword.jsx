import { useMutation, useQuery } from '@apollo/client';
import React from 'react';
import gql from 'graphql-tag';
import { useRouter } from 'next/dist/client/router';
import Wrapper from '../components/Wrapper';
import useForm from '../utils/useForm';

const RESET_PASSWORD_MUTATION = gql`
  mutation RESET_PASSWORD_MUTATION($email: String!) {
    sendUserPasswordResetLink(email: $email) {
      code
      message
    }
  }
`;

function Forgotpassword() {
  const router = useRouter();
  const { clearForm, inputs, handleChange, resetForm } = useForm({
    email: '',
  });

  const [restPassword, { data, loading, error }] = useMutation(
    RESET_PASSWORD_MUTATION,
    {
      variables: inputs,
    }
  );

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(inputs);
    let res = '';
    try {
      res = await restPassword();
    } catch (err) {
      res = err;
    }
    resetForm();
  }

  return (
    <Wrapper>
      <div className="flex flex-col items-center">
        <div className="w-full max-w-md">
          <form
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            method="POST"
            onSubmit={handleSubmit}
          >
            <fieldset>
              {error ? (
                <p className="text-red-500 text-xs italic">{error.message}</p>
              ) : (
                ''
              )}

              {data?.sendUserPasswordResetLink === null ? (
                <p className="text-green-600 text-lg italic mb-5">
                  If an account exists with this email , you will receive a
                  reset link.
                </p>
              ) : (
                ''
              )}
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Email
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Email"
                    autoComplete="email"
                    value={inputs.name}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <button
                disabled={loading}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Reset Password
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </Wrapper>
  );
}

export default Forgotpassword;
