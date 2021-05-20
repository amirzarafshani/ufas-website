import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import withAuth from '../../components/redux/providers/withAuth';
import history from '../../utils/history';
import { FiCheckCircle } from 'react-icons/fi';
import { BiBlock } from 'react-icons/bi';
import accountsService from '../../services/accountsService';
import hourglass from '../../assets/images/hourglass.gif';
import { QRCode } from 'react-qr-svg';

const Accounts = (props) => {
  let [account, setAccount] = useState([]);
  let [loading, setLoading] = useState(false);

  useEffect(() => {
    getAccounts();
  }, []);

  const getAccounts = () => {
    setLoading(true);
    accountsService
      .getByid(props.match.params.id)
      .then((res) => {
        console.log(res.data);
        setAccount(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };
  return (
    <React.Fragment>
      <Helmet>
        <title>ACCOUNTS</title>
        <meta name="description" content="Ufas vpn" />
      </Helmet>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-12">
        <div className="flex divide-x divide-gray-800">
          <div className="w-1/2 flex flex-col pr-1 border-r border-gray-100">
            <div className="flex items-start md:items-center md:justify-between border-gray-100 border-b pb-4">
              <div className="font-bold mb-2 md:mb-0">Account Info</div>
            </div>
            <div className="flex flex-col justify-center py-4">
              <span className="mb-1 text-justify">
                Scan QR in your mobile app to automatically log you into your
                account.
              </span>
              <span className="mb-4 text-justify">
                Or you may copy and paste the activation code into the box in
                your application to log you in.
              </span>
              <div className=" flex flex-col justify-center items-center">
                <QRCode value={account.uuid} className="mb-8 w-1/2" />
                <a
                  className="bg-gray-100 hover:bg-gray-300 text-indigo-600 cursor-pointer rounded-2xl px-4 py-1"
                  onClick={() => {
                    navigator.clipboard.writeText(account.uuid);
                  }}
                >
                  {account.uuid}
                </a>
              </div>
            </div>
            <div className="flex py-4">
              <span className="mr-2">Plan: </span>
              <span className="font-bold">
                {account.plan && account.plan.name}
              </span>
            </div>
            <div className="flex py-4">
              <span className="mr-2">Purchased at: </span>
              <span className="font-bold">{account.created_at}</span>
            </div>
            <div className="flex py-4">
              <span className="mr-2">Valid to: </span>
              <span className="font-bold">{account.valid_to}</span>
            </div>
            <div className="flex items-center py-4">
              <span className="mr-2">Days left: </span>
              <span className="font-bold">{account.remaining_days}</span>
              <img src={hourglass} className="w-8 ml-2" />
            </div>
          </div>
          <div className="w-1/2 flex flex-col pl-1">
            <div className="flex items-start md:items-center md:justify-between border-gray-100 border-b pb-4">
              <div className="font-bold mb-2 md:mb-0">Connection History</div>
            </div>
            <div className="flex flex-col justify-center py-4"></div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default withAuth(Accounts);
