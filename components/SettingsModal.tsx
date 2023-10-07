import React from "react";

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
    <div className="overflow-y-auto fixed inset-0 z-10">
      {/* handles clicks outside the modal box */}
      <div
        className="fixed inset-0 w-full h-full bg-black opacity-40"
        onClick={(e) => setModalOpen(false)}
      ></div>

      {/* modal box */}
      <div className="flex items-center px-4 py-8 min-h-screen">
        <div className="relative w-full max-w-lg p-4 mx-auto rounded-md shadow-2xl bg-[#121212] shadow-gray-700">
          {/* settings input or logout */}
          <div className="mt-3">
            <div className="flex flex-col mt-2 text-center">
              <h4 className="mb-2 text-xl font-bold text-white font-brand-roboto">
                Settings
              </h4>

              {/* api input key */}
              {/* <div className="flex flex-row justify-between items-center mt-2 w-full">
                <span className="mr-4 text-xl font-bold text-white">
                  API Key
                </span>
                <input
                  type="text"
                  className="flex-1 p-2 my-2 text-gray-300 rounded-lg resize-none bg-gray-700/50 focus:outline-none"
                  placeholder="!!! Under Development"
                />
              </div> */}

              {/* logout */}
              <div className="flex flex-row justify-between items-center mt-2 w-full">
                <span className="text-xl font-bold text-white font-brand-roboto">
                  Logout
                </span>
                <button
                  className="mt-2 p-2.5  text-white bg-red-600 rounded-md outline-none ring-offset-2 focus:ring-2 hover:bg-red-900 font-brand-roboto"
                  onClick={() => signOut()}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>

          {/* user selection */}
          <div className="gap-2 items-center mt-3 sm:flex">
            {/* <button
              className="w-full mt-2 p-2.5 flex-1 text-white bg-indigo-600 rounded-md outline-none ring-offset-2 ring-indigo-600 focus:ring-2 hover:bg-gray-700"
              onClick={handleAccept}
            >
              Accept
            </button> */}
            <button
              className="font-brand-roboto w-full mt-2 p-2.5 flex-1 text-white rounded-md outline-none border ring-offset-2 ring-indigo-600 focus:ring-2 hover:bg-gray-700"
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
