import { useState } from 'react';
import { Spinner } from 'flowbite-react';
import { Link } from 'react-router-dom';

export default function UserPosts({ userPosts }) {
  const categoryImages = {
    event: '/images/eventImage.jpg',
    help: '/images/helpImage.jpg',
    'real estate': '/images/realEstateImage.jpg',
    trade: '/images/tradeImage.jpg',
    transportation: '/images/transportImage.jpg',
  };

  if (!userPosts) {
    return (
      <div className="text-center mt-32">
        <Spinner aria-label="Large spinner example" size="xl" />
      </div>
    );
  }

  return (
    <>
      <h2 className="mb-4">Your Posts</h2>
      <div className="flex flex-col gap-4">
        {userPosts
          .map((userPost) => {
            return (
              <div className="w-full sm:w-11/12 sm:mx-auto rounded-lg" key={userPost._id}>
                <Link to={`/events/${userPost._id}`}>
                  <div className="flex">
                    {userPost.typeOfEvent === 'request' && (
                      <div className="absolute w-15 triangle bg-yellow-700 text-white font-bold text-sm rounded-tl-lg">
                        <p className="absolute top-3 -left-1 -rotate-45">request</p>
                      </div>
                    )}

                    {userPost.typeOfEvent === 'offer' && (
                      <div className="absolute w-15 triangle bg-teal-600 text-white font-bold text-sm rounded-tl-lg">
                        <p className="absolute top-3 left-1 -rotate-45">offer</p>
                      </div>
                    )}

                    <div className="flex flex-col gap-2 sm:flex-row w-full rounded-lg">
                      {userPost.image ? (
                        <img src={userPost.image} alt="event image" className="" />
                      ) : (
                        <img
                          src={categoryImages[userPost.category]}
                          alt="event image"
                          className="h-36 w-full sm:w-48 md:w-60 object-cover object-center rounded-t-lg sm:rounded-tl-lg sm:rounded-bl-lg"
                        />
                      )}
                      <div className="flex flex-col gap-2">
                        {userPost.title.length > 60 ? (
                          <h2 className="">{userPost.title.substring(0, 60)}...</h2>
                        ) : (
                          <h2 className="">{userPost.title}</h2>
                        )}
                        {userPost.description.length > 130 ? (
                          <p>{userPost.description.substring(0, 130)}...</p>
                        ) : (
                          <p>{userPost.description}</p>
                        )}
                        <div className="text-sm text-gray-600">
                          <p>
                            posted on: {userPost.createdAt.substring(0, 10)}
                            {userPost.updatedAt && (
                              <span> | last edited: {userPost.updatedAt.substring(0, 10)}</span>
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })
          .reverse()}
      </div>
    </>
  );
}
