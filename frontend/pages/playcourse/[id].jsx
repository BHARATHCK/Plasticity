import { useRouter } from 'next/dist/client/router';
import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player/lazy';
import Wrapper from '../../components/Wrapper';
import { PlayIcon } from '@heroicons/react/outline';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';

const COURSE_DETAILS = gql`
  query COURSE_QUERY($id: ID!) {
    Course(where: { id: $id }) {
      id
      title
      description
      category
      status
      author {
        name
      }
      thumbnail
      Videos {
        video {
          publicUrl
          filename
        }
        description
        thumbnail
      }
    }
  }
`;

function PlayCourse() {
  const [videoUrl, setVideoUrl] = useState('');
  const [playing, setPlaying] = useState(false);
  const router = useRouter();

  console.log(router.query.id);

  if (router.isReady && router.query.id === undefined) {
    router.push('/login');
  }

  const { data, loading, error } = useQuery(COURSE_DETAILS, {
    variables: {
      id: router.query.id,
    },
  });

  useEffect(() => {
    if (data?.Course) {
      console.log('Setting the video URL');
      setVideoUrl(
        process.env.NEXT_PUBLIC_S3_PUBLIC_URL +
          data?.Course?.Videos[0].video.filename
      );
    }
  }, [data]);

  return (
    <Wrapper>
      <div className="relative flex flex-col sm:flex-row">
        <div className="sm:w-2/4 h-80 sm:h-screen sm:flex sm:flex-column sm:flex-row">
          <ReactPlayer
            className="react-player"
            width="100%"
            height="80%"
            url={videoUrl}
            playing={playing}
            controls={true}
            onPlay={() => {
              setPlaying(true);
            }}
            onPause={() => {
              setPlaying(false);
            }}
            onError={(e) => console.log(e)}
          />
        </div>
        <div className="sm:absolute sm:right-0 sm:w-2/4">
          <div>
            <div className="flex flex-col space-y-4 mt-10 w-4/6 ml-20 overflow-y-scroll">
              {data?.Course?.Videos.map((video, index) => (
                <div
                  key={index}
                  onClick={(e) => {
                    setVideoUrl(
                      process.env.NEXT_PUBLIC_S3_PUBLIC_URL +
                        video.video.filename
                    );
                  }}
                >
                  <div className="flex flex-col border-2 shadow-md cursor-pointer">
                    <div className="flex flex-row items-center">
                      <PlayIcon width="70px" height="70px" />
                      <div>{video.description}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

export default PlayCourse;
