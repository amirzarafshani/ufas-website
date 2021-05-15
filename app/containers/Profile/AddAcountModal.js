import React, { useEffect } from 'react';
import addIcon from '../../assets/svg/addIcon.svg';
import { GrFormClose } from 'react-icons/gr';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import planService from '../../services/planService';
import cartService from '../../services/cartService';
import history from '../../utils/history';

const AddAccount = (props) => {
  let [showModal, setShowModal] = useState(false);
  let [loading, setLoading] = useState(false);
  let [submitting, setSubmitting] = useState(false);
  let [plans, setPlans] = useState([]);
  let [selectedPlan, setSelectedPlan] = useState(undefined);

  const handleOpenModal = () => {
    setShowModal(true);
    getPlans();
  };

  const getPlans = () => {
    setLoading(true);
    planService
      .getAll()
      .then((res) => {
        console.log(res.data);
        setPlans(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  const handleSubmit = (planId) => {
    setSubmitting(true);
    let obj = {};
    obj['plan_id'] = planId;

    cartService
      .addToCart(JSON.stringify(obj))
      .then((res) => {
        console.log(res.data);
        history.push('/cart');
        setSubmitting(false);
      })
      .catch((err) => {
        setSubmitting(false);
      });
  };

  return (
    <React.Fragment>
      <a
        onClick={() => handleOpenModal(true)}
        className="flex items-center bg-indigo-600 py-2 px-6 rounded-lg justify-between shadow-md
           hover:bg-indigo-800 cursor-pointer hover:shadow-lg"
      >
        <img src={addIcon} className="w-6 h-6" />
        <span className="text-white ml-4">Add Acconut</span>
      </a>

      <Transition
        show={showModal}
        as={Fragment}
        // afterLeave={() => console.log('done')}
      >
        <Dialog onClose={setShowModal}>
          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <Transition.Child
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Overlay className="fixed inset-0 transition-opacity">
                  <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </Dialog.Overlay>
              </Transition.Child>

              <Transition.Child
                enter="ease-out transform duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in transform duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                {/* This element is to trick the browser into centering the modal contents. */}
                <span
                  className="hidden sm:inline-block sm:align-middle sm:h-screen"
                  aria-hidden="true"
                >
                  &#8203;
                </span>
                <div
                  className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle 
                 sm:w-full relative w-auto mx-auto max-w-5xl"
                >
                  <Dialog.Title className="flex items-start justify-between p-3 border-b border-solid border-blueGray-200 rounded-t">
                    <div className="text-xl font-semibold">
                      Select a plan and add to cart
                    </div>
                    <button
                      className="p-1 ml-auto bg-transparent border-0 text-black opacity-50 hover:opacity-100 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={() => setShowModal(false)}
                    >
                      <GrFormClose className="content-fill bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none" />
                    </button>
                  </Dialog.Title>
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="flex flex-wrap py-2 items-center justify-center">
                      {loading ? (
                        <div className="dot-pulse"></div>
                      ) : (
                        plans &&
                        plans.length > 0 &&
                        plans.map((item, index) => (
                          <div
                            className=" flex overflow-hidden w-1/2 md:w-1/4 p-1"
                            key={index}
                            onClick={() => setSelectedPlan(item.id)}
                          >
                            <div
                              className={`cursor-pointer border border-2 overflow-hidden
                              rounded-lg text-black w-full flex flex-col items-center justify-between 
                             ${
                               selectedPlan === item.id
                                 ? 'border-green-600'
                                 : 'border-indigo-600'
                             }`}
                            >
                              <span className="py-2">
                                <span className=" my-2 font-bold text-md">
                                  {item.days} days
                                </span>
                              </span>

                              <span
                                className={`text-md font-bold bg-indigo-600 w-full text-center text-white py-2
                                ${
                                  selectedPlan === item.id
                                    ? 'bg-green-600'
                                    : 'bg-indigo-600'
                                }
                              `}
                              >
                                {item.price}$
                              </span>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <a
                      disabled={!selectedPlan}
                      type="button"
                      onClick={() => selectedPlan && handleSubmit(selectedPlan)}
                      className="w-40 py-2 shadow-sm text-sm font-medium rounded-md 
                      text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 
                      focus:ring-green-500 overflow-hidden h-12 flex items-center justify-center cursor-pointer"
                    >
                      {submitting ? (
                        <div className="dot-pulse"></div>
                      ) : (
                        <span className="px-4">Add to cart</span>
                      )}
                    </a>
                    <a
                      type="button"
                      onClick={() => setShowModal(false)}
                      className="mr-3 px-6 py-2 shadow-sm text-sm font-medium rounded-md 
                      text-black bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 
                      focus:ring-white-500 overflow-hidden h-12 flex items-center justify-center cursor-pointer"
                    >
                      Cancel
                    </a>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </React.Fragment>
  );
};

export default AddAccount;
