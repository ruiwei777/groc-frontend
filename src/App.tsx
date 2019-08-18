// React & 3rd party
import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'

// Test Co
import Main from './scenes/Main';


const App: React.FC<{}> = (props) => {

  return (
    <BrowserRouter>
      <Switch>
        <Route component={Main} />
      </Switch>
    </BrowserRouter>
  )
}

export default App;
