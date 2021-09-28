import {
  HeartIcon,
  UserGroupIcon,
  CalendarIcon,
  LibraryIcon,
} from '@heroicons/react/outline';

function StatsAndReviews() {
  return (
    <div className="bg-custom-white">
      <div>
        <h2 className="flex space-x-2 items-center justify-center sm:text-2xl m-10">
          Why our members <HeartIcon fill="red" width="30px" height="30px" /> us
        </h2>
        <div className="flex flex-col sm:flex-row items-center justify-center text-lg sm:text-2xl sm:space-x-20">
          <div className="m-5 flex flex-col items-center space-x-0">
            <UserGroupIcon className="w-5 sm:w-12" />
            <p className="">50,000 +</p>
            <p className="">Members</p>
          </div>
          <div className="m-5 flex flex-col sm:flex-col items-center space-x-0">
            <LibraryIcon className="w-5 sm:w-12" />
            <p className="">2,500 +</p>
            <p className="">Schools and colleges accross india</p>
          </div>
          <div className="m-5 flex flex-col sm:flex-col items-center space-x-0">
            <CalendarIcon className="w-5 sm:w-12" />
            <p className="">200 +</p>
            <p className="">Free events</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StatsAndReviews;
