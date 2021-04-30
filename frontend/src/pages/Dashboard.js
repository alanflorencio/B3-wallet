import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Chart from '../components/Chart';
import AmountTotal from '../components/AmountTotal';
import AcoesChat from '../components/acoes/AcoesChat';
import AcoesChatUs from '../components/acoesUs/AcoesChatUs';
import CaixaChat from '../components/caixa/CaixaChat';
import CryptoChat from '../components/crypto/CryptoChat';
import MetaProgres from '../components/MetaProgres';
import TotalByPercentage from '../components/TotalByPercentage';

import api from '../service/api';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    borderRadius: '15px',
  },
  paperHeight: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    borderRadius: '15px',
    height: 600,

  },
    paperAmount: {
    padding: theme.spacing(2),
    overflow: 'auto',
    flexDirection: 'column',
    borderRadius: '15px',

  },
  fixedHeight: {
    height: 240,
  },
}));

const Dashboard = () => {
  
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const [amount, setAmount] = useState("0");
  const [amountAcoes, setAmountAcoes] = useState("");
  const [amountAcoesUs, setAmountAcoesUs] = useState("");
  const [amountCrypto, setAmountCrypto] = useState("");
  const [amountCaixa, setAmountCaixa] = useState("");

  const fetchDashboard = async () =>{

    const { data } = await api.get('/wallet/1');

    setAmountCrypto(data.amountCrypto);
    setAmountCaixa(data.amountCaixa);
    setAmountAcoes(data.amountAcoes);
    setAmountAcoesUs(data.amountAcoesUs);
    setAmount(data.amount)
  }
  
  useEffect(() => {
    fetchDashboard();
  }, []);
  
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4} lg={8}>
        <TotalByPercentage/>
      </Grid>
      <Grid item xs={12} md={4} lg={3}>
        <Paper className={fixedHeightPaper}>
          <AmountTotal amount={amount} />
        </Paper>
        <div style={{    marginTop: "17px"}}>
          <MetaProgres />
        </div>
      </Grid>
      <Grid item xs={12} md={4} lg={3}>
        <Paper className={fixedHeightPaper}>
          <AcoesChat amount={amountAcoes} />
        </Paper>
      </Grid>
      <Grid item xs={12} md={4} lg={3}>
        <Paper className={fixedHeightPaper}>
          <AcoesChatUs amount={amountAcoesUs} />
        </Paper>
      </Grid>
      <Grid item xs={12} md={4} lg={3}>
        <Paper className={fixedHeightPaper}>
          <CaixaChat amount={amountCaixa} />
        </Paper>
      </Grid>
      <Grid item xs={12} md={4} lg={3}>
        <Paper className={fixedHeightPaper}>
          <CryptoChat amount={amountCrypto} />
        </Paper>
      </Grid>
    </Grid>
  );
}

export default Dashboard;
