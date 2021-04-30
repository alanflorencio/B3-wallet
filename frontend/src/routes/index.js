import React from "react";
import { Switch, Route } from "react-router-dom";

import Dashboard from '../pages/Dashboard';
import Trader from '../pages/Trader';
import Acoes from '../pages/Acoes';
import AcoesUs from '../pages/AcoesUs';
import Crypto from '../pages/Crypto';
import Caixa from '../pages/Caixa';

import LoggedInLayout from "../layout";


export default function Routes() {
  return (
    <Switch>
        <LoggedInLayout>
          <Route path="/" exact component={Dashboard} />
          <Route path="/trader" exact component={Trader} />
          <Route path="/acoes" exact component={Acoes} />
          <Route path="/acoes-us" exact component={AcoesUs} />
          <Route path="/caixa" exact component={Caixa} />
          <Route path="/crypto" exact component={Crypto} />
        </LoggedInLayout>
    </Switch>
  );
}