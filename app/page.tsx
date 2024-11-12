'use client';
import { DepartureBoard } from '@/components/DepartureBoard';
import { SearchBar } from '@/components/SearchBar';
// import Departures from "@/components/Departures";
import { useNotification } from '@/notifications/useNotification';
import Image from 'next/image';
import React, { useState } from 'react';

const Home = () => {
  const { isSupported, isSubscribed, handleSubscribe, subscription } =
    useNotification();

  const [message, setMessage] = useState('');
  const [title, setTitle] = useState('');

  const sendNotification = async () => {
    await fetch('/api/web-push/send', {
      method: 'POST',
      body: JSON.stringify({ title, message, subscription }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    setMessage('');
    setTitle('');
  };

  return (
    <>
      {/* 
      <div className="flex flex-col justify-center items-center bg-gray-100 p-4 min-h-[calc(100dvh)]">
        {!isSupported && (
          <div className="p-6 w-full max-w-md">
            <p className="mb-6 text-center text-red-500">
              Push notifications are not supported in this browser. Consider
              adding to the home screen (PWA) if on iOS.
            </p>
            <Image
              src="/ios-pwa/pwa_ios.jpg"
              width={10000}
              height={10000}
              alt="Push Notification"
              className="w-auto h-auto"
            />
          </div>
        )}
        {isSupported && (
          <div className="bg-white shadow-md p-6 rounded-lg w-full max-w-md">
            <h1 className="mb-4 font-bold text-2xl text-center">
              Push Notification Subscription
            </h1>

            <div>
              {!isSubscribed ? (
                <button
                  onClick={handleSubscribe}
                  className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg w-full text-white transition"
                >
                  Subscribe to Push Notifications
                </button>
              ) : (
                <div className="text-center">
                  <p className="font-semibold text-green-600">
                    You are subscribed!
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
        {isSubscribed && (
          <div className="bg-white shadow-md mt-6 p-6 rounded-lg w-full max-w-md">
            <h2 className="mb-4 font-bold text-xl">Send a Notification</h2>
            <input
              type="text"
              placeholder="Notification Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border-gray-300 mb-4 p-2 border rounded-lg w-full"
            />
            <textarea
              placeholder="Notification Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="border-gray-300 mb-4 p-2 border rounded-lg w-full"
            />

            <button
              onClick={() => sendNotification()}
              className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg w-full text-white transition"
            >
              Send Notification
            </button>
          </div>
        )}
      </div> */}

      <div className="h-full">
        <main className="flex flex-col justify-center items-center h-full max-h-screen">
          <SearchBar />
          <DepartureBoard />
        </main>
      </div>
    </>
  );
};

export default Home;
