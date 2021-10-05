import React from 'react';
import Image from 'next/image';
import { AnnotationIcon } from '@heroicons/react/outline';

function CommentComponent({ comment }) {
  console.log('Comment : ', comment);
  return (
    <div>
      <div className="relative max-w-md w-80 sm:w-96 border-2">
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
            <h1>{comment?.user[0]?.name}</h1>
          </div>
          <div>
            <h1 className="text-center">{comment?.comment}</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommentComponent;
