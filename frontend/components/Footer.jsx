import React from 'react';
import NextLink from 'next/link';

function Footer() {
  return (
    <div className="bg-custom-blue text-gray-50">
      <div className="">
        <div className="grid grid-cols-1 sm:grid-cols-4 space-y-12 space-x-12 sm:space-y-0 justify-between m-10">
          <div className="flex flex-col space-y-6">
            <div>About us</div>
            <div>
              Plasticity is one of India&apos;s largest communities that
              provides a one-stop platform for anyone to learn new skills,
              network with peers and grow as an individual.
            </div>
          </div>
          <div className="flex flex-col space-y-6">
            <div>Quick Links</div>
            <div className="flex flex-col space-y-2">
              <NextLink href="/">
                <a>Community</a>
              </NextLink>
              <NextLink href="/">
                <a>Clubs</a>
              </NextLink>
              <NextLink href="/">
                <a>Events</a>
              </NextLink>
              <NextLink href="/">
                <a>Courses</a>
              </NextLink>
            </div>
          </div>
          <div className="flex flex-col space-y-6">
            <p>Legal</p>
            <div className="flex flex-col space-y-2">
              <NextLink href="/">
                <a>Terms and Conditions</a>
              </NextLink>
              <NextLink href="/">
                <a>Privacy Policy</a>
              </NextLink>
              <NextLink href="/">
                <a>Return &amp; Refund</a>
              </NextLink>
            </div>
          </div>
          <div className="flex flex-col space-y-6">
            <p>Contact Us</p>
            <div className="flex flex-col space-y-2">
              <NextLink href="/">
                <a>Plasticity</a>
              </NextLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
