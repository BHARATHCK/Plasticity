import React, { useState } from 'react';
import { CURRENT_USER_QUERY } from '../components/User';
import Wrapper from '../components/Wrapper';
import useForm from '../utils/useForm';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/dist/client/router';
import NextLink from 'next/link';

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    authenticateUserWithPassword(email: $email, password: $password) {
      ... on UserAuthenticationWithPasswordSuccess {
        item {
          id
          email
          name
        }
      }
      ... on UserAuthenticationWithPasswordFailure {
        code
        message
      }
    }
  }
`;

function Login() {
  const router = useRouter();
  let guestStudent = false;
  let guestEducator = false;

  const { clearForm, inputs, handleChange, resetForm } = useForm({
    username: '',
    email: '',
    password: '',
  });

  const [signin, { data, error, loading }] = useMutation(SIGNIN_MUTATION, {
    variables: inputs,
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  const customError =
    data?.authenticateUserWithPassword.__typename ===
    'UserAuthenticationWithPasswordFailure'
      ? data?.authenticateUserWithPassword
      : undefined;

  async function handleSubmit(e) {
    e.preventDefault(); // stop the form from submitting
    console.log(inputs);

    if (guestStudent) {
      inputs.email = process.env.NEXT_PUBLIC_GUEST_STUDENT_USER;
      inputs.username = process.env.NEXT_PUBLIC_GUEST_STUDENT_USER;
      inputs.password = process.env.NEXT_PUBLIC_GUEST_STUDENT_PASS;
    } else if (guestEducator) {
      inputs.email = process.env.NEXT_PUBLIC_GUEST_EDUCATOR_USER;
      inputs.username = process.env.NEXT_PUBLIC_GUEST_EDUCATOR_USER;
      inputs.password = process.env.NEXT_PUBLIC_GUEST_EDUCATOR_PASS;
    }

    let res = '';
    try {
      res = await signin();
    } catch (err) {
      res = err;
    }
    resetForm();
  }

  if (data?.authenticateUserWithPassword?.item?.id) {
    router.back();
  }

  return (
    <Wrapper>
      <div className="flex flex-col items-center">
        <div className="w-full max-w-xs">
          <form
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            method="POST"
            onSubmit={handleSubmit}
          >
            <fieldset>
              {customError ? (
                <>
                  <p className="text-red-500 text-xs italic">
                    {customError.message}
                  </p>
                </>
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
                    value={inputs.email}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="password"
                >
                  Password
                  {/* border-red-500 */}
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="password"
                    name="password"
                    type="password"
                    placeholder="******************"
                    value={inputs.password}
                    onChange={handleChange}
                  />
                  {/*  */}
                </label>
              </div>
              <div className="flex items-center justify-between">
                <button
                  disabled={loading}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Sign In
                </button>
                <NextLink href="/forgotpassword">
                  <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
                    Forgot Password?
                  </a>
                </NextLink>
              </div>

              <button
                disabled={loading}
                onClick={() => (guestStudent = true)}
                className="mt-4 w-full bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                type="submit"
              >
                Guest Login as Student
              </button>
              <button
                onClick={() => (guestEducator = true)}
                disabled={loading}
                className="mt-4 w-full bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                type="submit"
              >
                <p>Guest Login as Educator</p>
              </button>
              <NextLink href="/register">
                <button className="mt-4 w-full bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                  Register
                </button>
              </NextLink>
            </fieldset>
          </form>
          <p className="text-center text-gray-500 text-xs">
            &copy;2020 Plasticity. All rights reserved.
          </p>
        </div>
      </div>
    </Wrapper>
  );
}

export default Login;
