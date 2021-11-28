import React from 'react';
import Checkout from '../components/Checkout';
import { useUser } from '../components/User';
import Wrapper from '../components/Wrapper';

function Payment() {
  const user = useUser();
  return (
    <Wrapper>
      {user?.isSubscribed == 'true' ? (
        <div className="flex flex-col items-center">
          <div className="w-full max-w-sm">
            <p className="font-semibold mb-8">
              We have recieved your payment, you are all set!
            </p>
            <div className="border-2 rounded-lg p-3">
              <p>
                <span className="font-semibold">Charge ID</span> :{' '}
                {user?.subscription?.chargeId}
              </p>
              <p>
                <span className="font-semibold">Plan</span> : Basic
              </p>
              <p>
                <span className="font-semibold">Price</span> : INR{' '}
                {user?.subscription?.price / 100}/-
              </p>
            </div>
          </div>
        </div>
      ) : (
        <Checkout />
      )}
    </Wrapper>
  );
}

export default Payment;
