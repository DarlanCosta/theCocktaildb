import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Main from './pages/Main';
import Landing from './pages/Landing';
import Categories from './pages/Categories';
import Drinks from './pages/Drinks';
import DrinkDatails from './pages/DrinkDetails';
import Ingredients from './pages/Ingredients';
import Videos from './pages/Videos';
import NewUser from './pages/NewUser';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/landing/" component={Landing} />
        <Route path="/categories/" component={Categories} />
        <Route path="/drinks/" component={Drinks} />
        <Route path="/drinkdetails/" component={DrinkDatails} />
        <Route path="/ingredients/" component={Ingredients} />
        <Route path="/videos/" component={Videos} />
        <Route path="/newuser/" component={NewUser} />
      </Switch>
    </BrowserRouter>
  );
}
