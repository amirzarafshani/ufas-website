import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../assets/images/logo.png';
import withCart from '../../redux/providers/withCart';
import withAuth from '../../redux/providers/withAuth';
import history from '../../../utils/history';
import { ReactComponent as Openmenu } from '../../../assets/svg/openmenu.svg';
import { ReactComponent as Closemenu } from '../../../assets/svg/closemenu.svg';
import ClickAwayListener from 'react-click-away-listener';
import { FaUserCircle } from 'react-icons/fa';
import cartService from '../../../services/cartService';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const Header = (props) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [cartMenuOpen, setCartMenuOpen] = React.useState(false);
  const [itemLoading, setItemLoading] = useState(undefined);
  const cart = props.cart;
  const user = props.user;

  console.log(user);

  const handleRemoveItem = (itemId) => {
    setItemLoading(itemId);
    cartService
      .removeItem(itemId)
      .then((res) => {
        props.setCart(res.data);
        setItemLoading(undefined);
      })
      .catch((err) => {
        setItemLoading(undefined);
      });
  };

  const handleLogout = () => {
    props.logout();
    history.push('/');
  };

  return (
    <ClickAwayListener
      onClickAway={() => {
        setMobileMenuOpen(false);
        setCartMenuOpen(false);
      }}
    >
      <div
        x-data={mobileMenuOpen ? 'false' : 'true'}
        className="relative bg-indigo-600 text-white"
      >
        <div class="bg-gradient-to-r from-indigo-600 to-light-blue-500 h-16">
          <div class="relative">
            <div class="overflow-hidden h-16 absolute w-full">
              <svg
                fill="none"
                viewBox="0 0 848 513"
                class="sm:hidden absolute right-1/2 transform translate-x-[235px] translate-y-[-90px] w-[848px] h-[513px]"
              >
                <path
                  fill="#fff"
                  fill-opacity="0.1"
                  d="M424 0C310.94 0 240.26 56.944 212 170.811c42.4-56.944 91.86-78.295 148.4-64.054 32.266 8.114 55.311 31.686 80.836 57.777 41.552 42.489 89.676 91.683 194.764 91.683 113.06 0 183.74-56.944 212-170.811-42.4 56.944-91.86 78.295-148.4 64.054-32.245-8.114-55.311-31.686-80.836-57.777C577.212 49.193 529.088 0 424 0zM212 256.217c-113.06 0-183.74 56.944-212 170.812 42.4-56.945 91.86-78.296 148.4-64.055 32.245 8.114 55.311 31.686 80.836 57.777 41.552 42.49 89.676 91.683 194.764 91.683 113.06 0 183.74-56.944 212-170.811-42.4 56.944-91.86 78.296-148.4 64.054-32.245-8.113-55.311-31.685-80.836-57.777-41.552-42.489-89.676-91.683-194.764-91.683z"
                ></path>
                <path
                  stroke="#fff"
                  stroke-opacity="0.2"
                  d="M360.522 106.272l-.122.485.122-.485zm0 0c32.383 8.143 55.504 31.778 80.966 57.805l.105.107-.318.312.318-.311c20.78 21.248 43.155 44.121 73.45 61.692 30.282 17.564 68.498 29.84 120.957 29.84 56.444 0 102.26-14.213 137.486-42.595 34.73-27.982 59.217-69.776 73.424-125.433-20.822 27.449-43.355 46.428-67.609 56.898-24.842 10.723-51.456 12.503-79.823 5.358-32.389-8.15-55.544-31.819-81.032-57.872l-.039-.04.357-.35-.357.35c-20.78-21.25-43.155-44.122-73.449-61.693C514.675 12.777 476.459.5 424 .5c-56.444 0-102.26 14.213-137.486 42.595-34.73 27.982-59.217 69.776-73.424 125.434 20.822-27.45 43.355-46.429 67.609-56.898 24.842-10.723 51.456-12.504 79.823-5.359zm45.885 241.978l.286-.28-.286.28.039.04c25.488 26.053 48.643 49.722 81.032 57.872 28.367 7.145 54.981 5.365 79.823-5.358 24.254-10.47 46.787-29.449 67.609-56.898-14.207 55.657-38.694 97.452-73.424 125.433-35.226 28.382-81.042 42.595-137.486 42.595-52.459 0-90.675-12.276-120.957-29.84-30.295-17.571-52.67-40.443-73.45-61.692l-.337.329.337-.329-.039-.041c-25.488-26.053-48.643-49.722-81.032-57.872-28.367-7.145-54.98-5.364-79.823 5.359-24.254 10.469-46.787 29.448-67.609 56.898 14.207-55.657 38.694-97.452 73.424-125.434C109.74 270.93 155.556 256.717 212 256.717c52.459 0 90.675 12.277 120.957 29.841 30.295 17.57 52.67 40.443 73.45 61.692z"
                ></path>
                <path
                  stroke="url(#mark-mobile__paint0_linear)"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  d="M647.5 120c-6-4.5-13.5-12.5-13.5-12.5"
                ></path>
                <path
                  stroke="url(#mark-mobile__paint1_linear)"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  d="M212 256c11.118 0 21.598.551 31.5 1.586"
                ></path>
                <path
                  stroke="url(#mark-mobile__paint2_linear)"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  d="M632.5 255.793c-11.118 0-21.598-.551-31.5-1.586"
                ></path>
                <defs>
                  <linearGradient
                    id="mark-mobile__paint0_linear"
                    x1="648.5"
                    x2="636.5"
                    y1="119.803"
                    y2="108"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#fff"></stop>
                    <stop offset="1" stop-color="#fff" stop-opacity="0"></stop>
                  </linearGradient>
                  <linearGradient
                    id="mark-mobile__paint1_linear"
                    x1="220.5"
                    x2="245"
                    y1="256.783"
                    y2="257.783"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#fff"></stop>
                    <stop offset="1" stop-color="#fff" stop-opacity="0"></stop>
                  </linearGradient>
                  <linearGradient
                    id="mark-mobile__paint2_linear"
                    x1="624"
                    x2="599.5"
                    y1="255.01"
                    y2="254.01"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#fff"></stop>
                    <stop offset="1" stop-color="#fff" stop-opacity="0"></stop>
                  </linearGradient>
                </defs>
              </svg>
              <svg
                fill="none"
                viewBox="0 0 848 513"
                class="hidden sm:block absolute right-1/2 transform translate-x-[-150px] translate-y-[-250px] w-[848px] h-[513px]"
              >
                <path
                  fill="#fff"
                  fill-opacity="0.1"
                  d="M424 0C310.94 0 240.26 56.944 212 170.811c42.4-56.944 91.86-78.295 148.4-64.054 32.266 8.114 55.311 31.686 80.836 57.777 41.552 42.489 89.676 91.683 194.764 91.683 113.06 0 183.74-56.944 212-170.811-42.4 56.944-91.86 78.295-148.4 64.054-32.245-8.114-55.311-31.686-80.836-57.777C577.212 49.193 529.088 0 424 0zM212 256.217c-113.06 0-183.74 56.944-212 170.812 42.4-56.945 91.86-78.296 148.4-64.055 32.245 8.114 55.311 31.686 80.836 57.777 41.552 42.49 89.676 91.683 194.764 91.683 113.06 0 183.74-56.944 212-170.811-42.4 56.944-91.86 78.296-148.4 64.054-32.245-8.113-55.311-31.685-80.836-57.777-41.552-42.489-89.676-91.683-194.764-91.683z"
                ></path>
                <path
                  stroke="#fff"
                  stroke-opacity="0.2"
                  d="M360.522 106.272l-.122.485.122-.485zm0 0c32.383 8.143 55.504 31.778 80.966 57.805l.105.107-.318.312.318-.311c20.78 21.248 43.155 44.121 73.45 61.692 30.282 17.564 68.498 29.84 120.957 29.84 56.444 0 102.26-14.213 137.486-42.595 34.73-27.982 59.217-69.776 73.424-125.433-20.822 27.449-43.355 46.428-67.609 56.898-24.842 10.723-51.456 12.503-79.823 5.358-32.389-8.15-55.544-31.819-81.032-57.872l-.039-.04.357-.35-.357.35c-20.78-21.25-43.155-44.122-73.449-61.693C514.675 12.777 476.459.5 424 .5c-56.444 0-102.26 14.213-137.486 42.595-34.73 27.982-59.217 69.776-73.424 125.434 20.822-27.45 43.355-46.429 67.609-56.898 24.842-10.723 51.456-12.504 79.823-5.359zm45.885 241.978l.286-.28-.286.28.039.04c25.488 26.053 48.643 49.722 81.032 57.872 28.367 7.145 54.981 5.365 79.823-5.358 24.254-10.47 46.787-29.449 67.609-56.898-14.207 55.657-38.694 97.452-73.424 125.433-35.226 28.382-81.042 42.595-137.486 42.595-52.459 0-90.675-12.276-120.957-29.84-30.295-17.571-52.67-40.443-73.45-61.692l-.337.329.337-.329-.039-.041c-25.488-26.053-48.643-49.722-81.032-57.872-28.367-7.145-54.98-5.364-79.823 5.359-24.254 10.469-46.787 29.448-67.609 56.898 14.207-55.657 38.694-97.452 73.424-125.434C109.74 270.93 155.556 256.717 212 256.717c52.459 0 90.675 12.277 120.957 29.841 30.295 17.57 52.67 40.443 73.45 61.692z"
                ></path>
                <path
                  stroke="url(#mark-left__paint0_linear)"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  d="M212 256c11.118 0 21.598.551 31.5 1.586"
                ></path>
                <path
                  stroke="url(#mark-left__paint1_linear)"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  d="M632.5 255.793c-11.118 0-21.598-.551-31.5-1.586"
                ></path>
                <defs>
                  <linearGradient
                    id="mark-left__paint0_linear"
                    x1="220.5"
                    x2="245"
                    y1="256.783"
                    y2="257.783"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#fff"></stop>
                    <stop offset="1" stop-color="#fff" stop-opacity="0"></stop>
                  </linearGradient>
                  <linearGradient
                    id="mark-left__paint1_linear"
                    x1="624"
                    x2="599.5"
                    y1="255.01"
                    y2="254.01"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#fff"></stop>
                    <stop offset="1" stop-color="#fff" stop-opacity="0"></stop>
                  </linearGradient>
                </defs>
              </svg>
              <svg
                fill="none"
                viewBox="0 0 848 513"
                class="hidden sm:block absolute left-1/2 transform translate-x-[330px] translate-y-[-357px] w-[848px] h-[513px]"
              >
                <path
                  fill="#fff"
                  fill-opacity="0.1"
                  d="M424 0C310.94 0 240.26 56.944 212 170.811c42.4-56.944 91.86-78.295 148.4-64.054 32.266 8.114 55.311 31.686 80.836 57.777 41.552 42.489 89.676 91.683 194.764 91.683 113.06 0 183.74-56.944 212-170.811-42.4 56.944-91.86 78.295-148.4 64.054-32.245-8.114-55.311-31.686-80.836-57.777C577.212 49.193 529.088 0 424 0zM212 256.217c-113.06 0-183.74 56.944-212 170.812 42.4-56.945 91.86-78.296 148.4-64.055 32.245 8.114 55.311 31.686 80.836 57.777 41.552 42.49 89.676 91.683 194.764 91.683 113.06 0 183.74-56.944 212-170.811-42.4 56.944-91.86 78.296-148.4 64.054-32.245-8.113-55.311-31.685-80.836-57.777-41.552-42.489-89.676-91.683-194.764-91.683z"
                ></path>
                <path
                  stroke="#fff"
                  stroke-opacity="0.2"
                  d="M360.522 106.272l-.122.485.122-.485zm0 0c32.383 8.143 55.504 31.778 80.966 57.805l.105.107-.318.312.318-.311c20.78 21.248 43.155 44.121 73.45 61.692 30.282 17.564 68.498 29.84 120.957 29.84 56.444 0 102.26-14.213 137.486-42.595 34.73-27.982 59.217-69.776 73.424-125.433-20.822 27.449-43.355 46.428-67.609 56.898-24.842 10.723-51.456 12.503-79.823 5.358-32.389-8.15-55.544-31.819-81.032-57.872l-.039-.04.357-.35-.357.35c-20.78-21.25-43.155-44.122-73.449-61.693C514.675 12.777 476.459.5 424 .5c-56.444 0-102.26 14.213-137.486 42.595-34.73 27.982-59.217 69.776-73.424 125.434 20.822-27.45 43.355-46.429 67.609-56.898 24.842-10.723 51.456-12.504 79.823-5.359zm45.885 241.978l.286-.28-.286.28.039.04c25.488 26.053 48.643 49.722 81.032 57.872 28.367 7.145 54.981 5.365 79.823-5.358 24.254-10.47 46.787-29.449 67.609-56.898-14.207 55.657-38.694 97.452-73.424 125.433-35.226 28.382-81.042 42.595-137.486 42.595-52.459 0-90.675-12.276-120.957-29.84-30.295-17.571-52.67-40.443-73.45-61.692l-.337.329.337-.329-.039-.041c-25.488-26.053-48.643-49.722-81.032-57.872-28.367-7.145-54.98-5.364-79.823 5.359-24.254 10.469-46.787 29.448-67.609 56.898 14.207-55.657 38.694-97.452 73.424-125.434C109.74 270.93 155.556 256.717 212 256.717c52.459 0 90.675 12.277 120.957 29.841 30.295 17.57 52.67 40.443 73.45 61.692z"
                ></path>
                <path
                  stroke="url(#mark-right__paint0_linear)"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  d="M148.4 362.974c-20.178-5.082-39.454-5.631-57.83-1.648"
                ></path>
                <defs>
                  <linearGradient
                    id="mark-right__paint0_linear"
                    x1="106.175"
                    x2="151.193"
                    y1="360.811"
                    y2="362.062"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#fff"></stop>
                    <stop offset="1" stop-color="#fff" stop-opacity="0"></stop>
                  </linearGradient>
                </defs>
              </svg>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 flex w-full items-center h-16">
              <div className="flex py-4 sm:py-2 justify-between items-center md:justify-start md:space-x-10 w-full">
                <div className="flex justify-start items-center lg:w-0 lg:flex-1 group">
                  <a href="#">
                    <span className="sr-only">UFAS</span>
                    <img
                      src={logo}
                      className="fill-current text-indigo-600 h-8 w-auto sm:h-10"
                    />
                  </a>
                </div>
                <div className="z-10 -mr-2 -my-2 md:hidden">
                  <button
                    onClick={() => setMobileMenuOpen(true)}
                    type="button"
                    className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                  >
                    <span className="sr-only">Open menu</span>
                    <Openmenu className="h-6 w-6" />
                  </button>
                </div>
                <nav className="hidden md:flex space-x-10">
                  <Link
                    to="/"
                    className="text-base font-medium text-white hover:text-gray-300"
                  >
                    Home
                  </Link>
                </nav>
                <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
                  {user != undefined ? (
                    <div className="flex items-center">
                      {cart && (
                        <div className="flex items-center">
                          <div class="relative text-black">
                            <div class="flex flex-row cursor-pointer truncate p-2 px-4  rounded">
                              <div class="flex flex-row-reverse ml-2 w-full">
                                <a
                                  onClick={() => setCartMenuOpen(!cartMenuOpen)}
                                  slot="icon"
                                  class="relative"
                                >
                                  <div class="absolute text-xs rounded-full -mt-1 -mr-2 px-1 font-bold top-0 right-0 bg-red-700 text-white">
                                    {cart.total_items}
                                  </div>
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="100%"
                                    height="100%"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    class="feather feather-shopping-cart w-6 h-6 text-white content-fill"
                                  >
                                    <circle cx="9" cy="21" r="1"></circle>
                                    <circle cx="20" cy="21" r="1"></circle>
                                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                                  </svg>
                                </a>
                              </div>
                            </div>
                            <div
                              class="absolute w-full top-16 rounded-b border-t-0 z-10"
                              style={{ display: cartMenuOpen ? '' : 'none' }}
                            >
                              {cart &&
                                cart.cart_items &&
                                cart.cart_items.length > 0 && (
                                  <div class="shadow-xl w-64 border border-gray-100 p-4 z-20 bg-white">
                                    {cart.cart_items.map((item, index) => (
                                      <div
                                        class="p-2 flex bg-white border-b border-gray-100 relative"
                                        key={index}
                                      >
                                        {itemLoading === item.id && (
                                          <div className="absolute top-0 left-0 w-full h-full z-50 overflow-hidden bg-gray-100 opacity-75 flex flex-col items-center justify-center">
                                            <div className="dot-pulse"></div>
                                          </div>
                                        )}
                                        <div class="flex-auto text-sm w-32">
                                          <div class="font-bold">
                                            {item.plan ? item.plan.name : ''}
                                          </div>
                                          <div class="truncate">
                                            {item.plan
                                              ? item.plan.days + ' Days'
                                              : ''}
                                          </div>
                                          <div class="text-gray-400">
                                            Qty: {item.qty}
                                          </div>
                                        </div>
                                        <div class="flex flex-col w-18 font-medium items-end">
                                          <a
                                            onClick={() =>
                                              handleRemoveItem(item.id)
                                            }
                                            class="w-4 h-4 mb-6 hover:bg-red-200 rounded-full cursor-pointer text-red-700"
                                          >
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              width="100%"
                                              height="100%"
                                              fill="none"
                                              viewBox="0 0 24 24"
                                              stroke="currentColor"
                                              stroke-width="2"
                                              stroke-linecap="round"
                                              stroke-linejoin="round"
                                              class="feather feather-trash-2 "
                                            >
                                              <polyline points="3 6 5 6 21 6"></polyline>
                                              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                              <line
                                                x1="10"
                                                y1="11"
                                                x2="10"
                                                y2="17"
                                              ></line>
                                              <line
                                                x1="14"
                                                y1="11"
                                                x2="14"
                                                y2="17"
                                              ></line>
                                            </svg>
                                          </a>
                                          ${item.item_price}
                                        </div>
                                      </div>
                                    ))}
                                    <div class="pt-4 justify-center flex bg-white">
                                      <button
                                        class="bg-indigo-500
                                    font-semibold
                                    hover:bg-indigo-700
                                    py-3
                                    text-sm text-white
                                    uppercase
                                    w-full rounded"
                                      >
                                        Checkout ${cart.total_price}
                                      </button>
                                    </div>
                                  </div>
                                )}
                            </div>
                          </div>
                        </div>
                      )}
                      <div className="flex items-center">
                        <Menu as="div" className="ml-3 relative">
                          {({ open }) => (
                            <>
                              <div>
                                <Menu.Button className="bg-gray-100 py-1 pl-1 pr-3 text-black flex items-center text-sm rounded-full focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-offset-gray-800 focus:ring-gray-200">
                                  <FaUserCircle className="mr-2 w-6 h-6 text-indigo-600" />
                                  <span>{user.email}</span>
                                </Menu.Button>
                              </div>
                              <Transition
                                show={open}
                                as={Fragment}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                              >
                                <Menu.Items
                                  static
                                  className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                                >
                                  <Menu.Item>
                                    {({ active }) => (
                                      <a
                                        href="#"
                                        className={classNames(
                                          active ? 'bg-gray-100' : '',
                                          'block px-4 py-2 text-sm text-gray-700',
                                        )}
                                      >
                                        Your Profile
                                      </a>
                                    )}
                                  </Menu.Item>
                                  <Menu.Item>
                                    {({ active }) => (
                                      <a
                                        href="#"
                                        className={classNames(
                                          active ? 'bg-gray-100' : '',
                                          'block px-4 py-2 text-sm text-gray-700',
                                        )}
                                      >
                                        Settings
                                      </a>
                                    )}
                                  </Menu.Item>
                                  <Menu.Item>
                                    {({ active }) => (
                                      <a
                                        onClick={() => handleLogout()}
                                        className={classNames(
                                          active ? 'bg-gray-100' : '',
                                          'block px-4 py-2 text-sm text-gray-700 cursor-pointer',
                                        )}
                                      >
                                        Sign out
                                      </a>
                                    )}
                                  </Menu.Item>
                                </Menu.Items>
                              </Transition>
                            </>
                          )}
                        </Menu>
                      </div>
                    </div>
                  ) : (
                    <React.Component>
                      <Link
                        to="/login"
                        className="ml-8 whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900"
                      >
                        Sign in
                      </Link>
                      <Link
                        to="/register"
                        className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                      >
                        Sign up
                      </Link>
                    </React.Component>
                  )}
                </div>
              </div>
            </div>
            <div
              className="absolute z-10 top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
              style={{ display: mobileMenuOpen ? '' : 'none' }}
            >
              <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
                <div className="pt-5 pb-6 px-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <img
                        src={logo}
                        className="fill-current text-indigo-600 h-8 w-auto"
                      />
                    </div>
                    <div className="-mr-2">
                      <button
                        onClick={() => setMobileMenuOpen(false)}
                        type="button"
                        className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                      >
                        <span className="sr-only">Close menu</span>
                        <Closemenu className="h-6 w-6" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="py-6 px-5 space-y-6">
                  <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                    <Link
                      to="/"
                      className="text-base font-medium text-gray-900 hover:text-gray-700"
                    >
                      Home
                    </Link>
                  </div>
                  <div>
                    <Link
                      onClick={() => setMobileMenuOpen(false)}
                      to="/register"
                      className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                    >
                      Sign up
                    </Link>
                    <p className="mt-6 text-center text-base font-medium text-gray-500">
                      Existing user?{' '}
                      <Link
                        onClick={() => setMobileMenuOpen(false)}
                        to="/login"
                        className="text-indigo-600 hover:text-indigo-500"
                      >
                        Sign in
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ClickAwayListener>
  );
};

export default withCart(withAuth(Header));
