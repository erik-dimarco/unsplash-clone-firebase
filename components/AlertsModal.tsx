import { Dispatch, Fragment, SetStateAction, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useRouter } from "next/router";

type AlertsModalProps = {
  show: boolean;
  setAlertsModalOpen: Dispatch<SetStateAction<boolean>>;
};

const AlertsModal = ({ show, setAlertsModalOpen }: AlertsModalProps) => {
  const router = useRouter();

  function closeModal() {
    setAlertsModalOpen(false);
  }

  return (
    <Transition appear show={show} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-75" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-sm transform overflow-hidden rounded-2xl bg-white p-6 text-center align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Please Login
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    You must be logged in to complete this action.
                  </p>
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    className="justify-center items-center rounded-md border border-transparent bg-black px-4 py-2 text-sm font-medium text-white focus:outline-none"
                    onClick={() => {
                      closeModal;
                      router.push("/api/auth/login");
                    }}
                  >
                    Log in / Sign Up
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default AlertsModal;
