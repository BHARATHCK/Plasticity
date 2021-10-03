import React from 'react';
import gql from 'graphql-tag';
import { useRouter } from 'next/dist/client/router';
import useForm from '../utils/useForm';
import Wrapper from '../components/Wrapper';
import { useMutation } from '@apollo/client';

const REDEEM_USER_PASSWORD = gql`
  mutation REDEEM_USER_PASSWORD(
    $email: String!
    $token: String!
    $password: String!
  ) {
    redeemUserPasswordResetToken(
      email: $email
      token: $token
      password: $password
    ) {
      code
      message
    }
  }
`;

function ResetPassword(props) {
  const router = useRouter();

  console.log(props.query.token);

  const { clearForm, inputs, handleChange, resetForm } = useForm({
    email: '',
    token: props.query.token,
    password: '',
  });

  const [restPassword, { data, loading, error }] = useMutation(
    REDEEM_USER_PASSWORD,
    {
      variables: inputs,
    }
  );

  if (!props?.query?.token) {
    return <p>Sorry! You need token to reset the password.</p>;
  }

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
              {data?.redeemUserPasswordResetToken ? (
                <p className="text-red-500 text-base italic">
                  {data?.redeemUserPasswordResetToken?.code}
                </p>
              ) : (
                ''
              )}

              {data?.redeemUserPasswordResetToken === null ? (
                <p className="text-green-600 text-lg italic mb-5">
                  Password Successfully Changed
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

export default ResetPassword;
