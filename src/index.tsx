import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Web3Provider from 'web3-react'
import { BrowserRouter  } from 'react-router-dom';
import Web3 from 'web3';
import { connectors } from './connectors';

ReactDOM.render(
  <Web3Provider
        connectors={connectors}
        libraryName={'web3.js'}
        web3Api={Web3}> 
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Web3Provider>,
  document.getElementById('root')
);

