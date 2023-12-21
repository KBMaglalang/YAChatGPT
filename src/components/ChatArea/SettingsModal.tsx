import React from 'react';

// components

// context or store

// constants or functions

type Props = {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  signOut: any;
};

function SettingsModal({ setModalOpen, signOut }: Props) {
  // const handleAccept = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
  //   e.preventDefault();

  //   setModalOpen(false);
  // };

  return (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      {/* handles clicks outside the modal box */}
      <div
        className="fixed inset-0 h-full w-full  opacity-40"
        onClick={(e) => setModalOpen(false)}
      ></div>

      {/* modal box */}
      <div className="flex min-h-screen items-center px-4 py-8">
        <div className="relative mx-auto w-full max-w-lg rounded-md bg-base-200 p-4 shadow-2xl  shadow-gray-700">
          {/* settings input or logout */}
          <div className="mt-3">
            <div className="mt-2 flex flex-col text-center">
              <h4 className="mb-2 font-brand-roboto text-xl font-bold text-base-content">
                Settings
              </h4>

              {/* api input key */}
              {/* <div className="flex flex-row justify-between items-center mt-2 w-full">
                <span className="mr-4 text-xl font-bold ">
                  API Key
                </span>
                <input
                  type="text"
                  className="flex-1 p-2 my-2 text-gray-300 rounded-lg resize-none bg-gray-700/50 focus:outline-none"
                  placeholder="!!! Under Development"
                />
              </div> */}

              {/* logout */}
              <div className="mt-2 flex w-full flex-row items-center justify-between text-base-content">
                <span className="font-brand-roboto text-xl font-bold text-base-content">
                  Logout
                </span>
                <button
                  // className="mt-2 p-2.5   bg-red-600 rounded-md outline-none ring-offset-2 focus:ring-2 hover:bg-red-900 font-brand-roboto"
                  className="btn btn-error font-brand-roboto "
                  onClick={() => signOut()}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>

          {/* user selection */}
          <div className="mt-3 flex w-full flex-col items-center  gap-2">
            {/* <button
              className="w-full mt-2 p-2.5 flex-1  bg-indigo-600 rounded-md outline-none ring-offset-2 ring-indigo-600 focus:ring-2 hover:bg-gray-700"
              onClick={handleAccept}
            >
              Accept
            </button> */}
            <button
              // className="font-brand-roboto w-full mt-2 p-2.5 flex-1  rounded-md outline-none border ring-offset-2 ring-indigo-600 focus:ring-2 hover:bg-gray-700"
              className="btn btn-outline  w-full font-brand-roboto"
              onClick={(e) => setModalOpen(false)}
            >
              Exit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingsModal;
