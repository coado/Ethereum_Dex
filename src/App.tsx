import { Route, Switch } from 'react-router-dom';
import { useWeb3Context  } from 'web3-react'

import './App.css';

import { PageHeader } from './components/Header/Header.component';
import SwapPage from './pages/SwapPage/SwapPage';
import LiquidityPage from './pages/LiquidityPage/LiquidityPage';

function App() {

  const context = useWeb3Context()
  context.setConnector('MetaMask')

  return (
    <div>
        <PageHeader />
        <Switch>
          <Route exact path='/' component={SwapPage} />
          <Route exact path='/liquidity' component={LiquidityPage} />
        </Switch>
    </div>
  );
}


export default App;
