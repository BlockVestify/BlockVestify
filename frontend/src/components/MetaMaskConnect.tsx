import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

interface MetaMaskConnectProps {
  onConnect: (address: string) => void;
}

const MetaMaskConnect: React.FC<MetaMaskConnectProps> = ({ onConnect }) => {
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState<boolean>(false);
  const [isConnecting, setIsConnecting] = useState<boolean>(false);

  useEffect(() => {
    checkMetaMaskInstallation();
  }, []);

  const checkMetaMaskInstallation = () => {
    const isInstalled = typeof window.ethereum !== 'undefined';
    setIsMetaMaskInstalled(isInstalled);
  };

  const handleConnect = async () => {
    if (!isMetaMaskInstalled) {
      window.open('https://metamask.io/download/', '_blank');
      return;
    }

    setIsConnecting(true);
    try {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      });
      
      if (accounts && accounts.length > 0) {
        onConnect(accounts[0]);
        toast.success('Successfully connected to MetaMask!');
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to connect to MetaMask');
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <div className="metamask-connect">
      {!isMetaMaskInstalled ? (
        <div className="metamask-prompt">
          <img 
            src="https://raw.githubusercontent.com/MetaMask/brand-resources/master/SVG/metamask-fox.svg"
            alt="MetaMask"
            className="metamask-logo"
          />
          <h3>MetaMask Required</h3>
          <p>To purchase bonds, you need to install MetaMask first.</p>
          <button 
            onClick={handleConnect}
            className="btn-primary"
          >
            Install MetaMask
          </button>
        </div>
      ) : (
        <button 
          onClick={handleConnect}
          className="btn-primary"
          disabled={isConnecting}
        >
          {isConnecting ? 'Connecting...' : 'Connect MetaMask'}
        </button>
      )}
    </div>
  );
};

export default MetaMaskConnect;
