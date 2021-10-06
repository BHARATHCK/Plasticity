import React, { useEffect, useRef, useState } from 'react';
import { CURRENT_USER_QUERY } from '../components/User';
import Wrapper from '../components/Wrapper';
import useForm from '../utils/useForm';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/dist/client/router';

const REGISTER_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $email: String!
    $name: String!
    $password: String!
  ) {
    createUser(
      data: {
        email: $email
        name: $name
        password: $password
        isEducator: false
      }
    ) {
      id
      email
      name
    }
  }
`;

function Register() {
  let mutationVariables = '';
  const router = useRouter();
  const inputRef = useRef();
  const { clearForm, inputs, handleChange, resetForm } = useForm({
    name: '',
    email: '',
    password: '',
    educator: '',
  });

  useEffect(() => {
    console.log('Use Effect : ', inputs);
    inputRef.current = inputs;
  }, [inputs]);

  const [signup, { data, error, loading }] = useMutation(REGISTER_MUTATION, {
    notifyOnNetworkStatusChange: true,
  });

  if (data) {
    router.push('/login');
  }

  async function handleSubmit(e) {
    e.preventDefault();
    let res = '';
    try {
      console.log('FINAL VALUES :::: ', inputRef.current);
      console.log(
        'Educaor calc',
        inputRef?.current?.educator === 'educator' ? true : false
      );
      res = await signup({
        variables: {
          name: inputRef?.current?.name,
          email: inputRef?.current?.email,
          password: inputRef?.current?.password,
          educator: inputRef?.current?.educator === 'educator' ? true : false,
        },
      });
    } catch (err) {
      res = err;
    }
    resetForm();
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
              {error ? (
                <p className="text-red-500 text-xs italic">{error.message}</p>
              ) : (
                ''
              )}
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="username"
                >
                  Username
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="name"
                    name="name"
                    type="username"
                    placeholder="Username"
                    autoComplete="name"
                    value={inputs.name}
                    onChange={handleChange}
                  />
                </label>
              </div>
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
              <div className="mb-4">
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
              <label className="block mt-4">
                <span className="text-gray-700">Account Type</span>
                <select
                  className="form-select mt-1 block w-full"
                  name="educator"
                  id="educator"
                  value={inputs.educator}
                  onChange={handleChange}
                >
                  <option value="educator">Educator</option>
                  <option value="subscriber">Subscriber</option>
                </select>
              </label>
              <div className="flex items-center justify-between">
                <button
                  disabled={loading}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Register
                </button>
              </div>
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

export default Register;
