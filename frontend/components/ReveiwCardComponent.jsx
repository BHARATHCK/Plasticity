import Image from 'next/image';
import { AnnotationIcon } from '@heroicons/react/outline';

function ReveiwCardComponent() {
  return (
    <div className="bg-custom-white">
      <div className="m-5 grid grid-cols-1 sm:grid-cols-2 gap-4 place-items-center mt-20">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((element) => (
          <>
            <div className="relative max-w-md min-w-min border-2">
              <div className="absolute -left-5 -top-4 z-50">
                <AnnotationIcon className="w-5 sm:w-12 stroke-current text-purple-600" />
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-center space-x-6 m-4">
                <div className="flex flex-col items-center justify-center">
                  <Image
                    width="100px"
                    height="100px"
                    layout="fixed"
                    className="inline object-cover w-16 h-16 mr-2 rounded-full"
                    src="https://images.pexels.com/photos/2589653/pexels-photo-2589653.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
                    alt="Profile image"
                  />
                  <h1>Bharath</h1>
                </div>
                <div>
                  <h1>
                    At Plasticity I learnt how to be consistent and how to
                    interact with others. I also learnt various things related
                    to freelancing.
                  </h1>
                </div>
              </div>
            </div>
          </>
        ))}
      </div>
    </div>
  );
}

export default ReveiwCardComponent;
