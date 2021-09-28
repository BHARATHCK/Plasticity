import { ChatIcon } from '@heroicons/react/outline';

function ProductPlacement() {
  return (
    <div className="m-14 flex flex-col flex-initial items-center justify-around lg:flex-row">
      <div className="flex-none sm:w-1/2">
        <h1 className="text-black-500 font-semibold text-2xl sm:text-5xl mb-10">
          Don’t miss out on the action.
          <br />
          <span className="text-blue-800">Join</span> our community now!
        </h1>
        <div>
          <ul className="list-disc space-y-10 mb-28 hidden lg:block">
            <li className="text-blue-800">
              <span className="text-black text-2xl">
                Meet thousands of people from diverse fields and connect with
                them
              </span>
            </li>
            <li className="text-blue-800">
              <span className="text-black text-2xl">
                No matter where you’re from, get equal and free opportunities
              </span>
            </li>
            <li className="text-blue-800">
              <span className="text-black text-2xl">
                Exclusive exposure to industry experts and get a chance to learn
                from them
              </span>
            </li>
            <li className="text-blue-800">
              <span className="text-black text-2xl">
                Participate in high quality engaging events and learn skills
              </span>
            </li>
            <li className="text-blue-800">
              <span className="text-black text-2xl">
                And all of this for FREE!
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="flex flex-col mb-10">
        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          <span className="flex flex-row items-center">
            <ChatIcon className="w-20" />
            <p>
              Join Us on <br /> Whatsapp
            </p>
          </span>
        </button>
        <br />
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          <span className="flex flex-row items-center">
            <ChatIcon className="w-20" />
            <p>
              Join Us on <br /> Discord
            </p>
          </span>
        </button>
      </div>
    </div>
  );
}

export default ProductPlacement;
