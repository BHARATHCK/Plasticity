import { useMutation } from '@apollo/client';
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import nProgress from 'nprogress';
import { useState } from 'react';
import gql from 'graphql-tag';
import { useUser } from './User';
import { useRouter } from 'next/dist/client/router';

const stripeLib = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PAYMENTS_KEY);

const CHECKOUT_MUTATION = gql`
  mutation CHECKOUT_MUTATION($token: String!) {
    checkout(token: $token)
  }
`;

function CheckoutStripeForm() {
  const user = useUser();
  const router = useRouter();
  const [error, setError] = useState();
  const [loading, setLoading] = useState();
  const stripe = useStripe();
  const elements = useElements();

  const [checkout, { loading: checkoutLoading, error: checkOutError }] =
    useMutation(CHECKOUT_MUTATION, {
      notifyOnNetworkStatusChange: true,
    });

  async function handleSubmit(e) {
    e.preventDefault();

    nProgress.start();

    console.log('Integrate with stripe');
    try {
      const { errorStripe, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardElement),
      });

      if (errorStripe) {
        console.log('FAILED ************');
        setError(errorStripe);
      }

      console.log(paymentMethod);

      const order = await checkout({
        variables: {
          token: paymentMethod.id,
        },
      });
      router.push('/explore');
    } catch (err) {
      console.log('ERR *********** ', err);
    }
  }

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-md">
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit}
        >
          {error && (
            <p className="text-red-500 text-xs italic">{error.message}</p>
          )}
          <CardElement />

          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-6">
            <div className="flex items-center justify-center space-x-6">
              {checkoutLoading ? (
                <div className="w-8 h-8 border-b-2 border-gray-900 rounded-full animate-spin"></div>
              ) : null}
              <div>Check Out</div>
            </div>
          </button>
        </form>
        <p className="text-center text-gray-500 text-xs">
          &copy;2020 Plasticity. All rights reserved.
        </p>
      </div>
    </div>
  );
}

function Checkout() {
  return (
    <Elements stripe={stripeLib}>
      <CheckoutStripeForm />
    </Elements>
  );
}

export default Checkout;
