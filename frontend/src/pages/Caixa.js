import React, { useEffect, useState } from 'react';

import Grid from '@material-ui/core/Grid';
import clsx from 'clsx';

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { green } from '@material-ui/core/colors';
import Paper from '@material-ui/core/Paper';
import IconButton from "@material-ui/core/IconButton";
import Typography from '@material-ui/core/Typography';
import EditIcon from "@material-ui/icons/Edit";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import api from '../service/api';
import moment from '../layout/moment';
import NumberFormat from 'react-number-format';

import Title from '../components/Title';
import CaixaModal from '../components/caixa/CaixaModal';
import CaixaChat from '../components/caixa/CaixaChat';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  chat: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    color: theme.palette.common.white,
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[600],
    }
  },
  seeMore: {
    marginTop: theme.spacing(3),
  },

}));

const Caixa = () => {

	const [acoesModalOpen, setaAcoesModalOpen] = useState(false);
  const [selectedAcoes, setaSelectedAcoes] = useState(null);
  const [markets, setMarket] = useState([]);
  const [amount, setAmount] = useState("");

  const fetchMarket = async () =>{

    const { data } = await api.get('/caixa');

    const total = data.reduce((acumulador, acoes) => {
      let totalAcoe = acoes.purchasePrice * acoes.qty;
      let total = totalAcoe + acumulador

      return total
    }, 0);

    setAmount(total)
    setMarket(data)
  }
  
  useEffect(() => {
    fetchMarket();
  }, []);

  const handleCloseAcoeModal = () => {
    setaSelectedAcoes(null)
		setaAcoesModalOpen(false);
    fetchMarket()
	};

  const handleEditedAcoe = marketId => {
    setaSelectedAcoes(marketId)
    setaAcoesModalOpen(true)
  }
  
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <div>
      <CaixaModal
        open={acoesModalOpen}
        onClose={handleCloseAcoeModal}
        marketId={selectedAcoes && selectedAcoes.id}
      ></CaixaModal>

      <Grid container spacing={3}> 
        <Grid item xs={8} md={6} lg={3}>
          <Paper className={fixedHeightPaper}>
            <CaixaChat
              amount={amount}
            >
            </CaixaChat>
          </Paper>
        </Grid>
        <Grid item xs={12} >
          <Paper className={classes.paper}>
            <React.Fragment>
              <Title>Caixa</Title>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Nome</TableCell>
                    <TableCell align="center">Descrição</TableCell>
                    <TableCell align="center">Preço</TableCell>
                    <TableCell align="center">Quantidade</TableCell>
                    <TableCell align="center">Total</TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {markets.map((market) => (
                    <TableRow key={market.id}>
                      <TableCell align="center">
                      <Typography variant="subtitle1" style={{color: "#000"}} >
                        <b>{market.name}</b>
                      </Typography>
                      <Typography variant="body" gutterBottom>
                        {moment(market.purchaseDate).format('LL')}
                      </Typography>
                      </TableCell>
                      <TableCell align="center">{market.description}</TableCell>
                      <TableCell align="center">
                        <NumberFormat value={parseFloat(market.purchasePrice).toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'R$'} />
                      </TableCell>
                      <TableCell align="center" type>{market.qty}</TableCell>
                      <TableCell align="center">
                        <NumberFormat value={parseFloat(market.qty * market.purchasePrice).toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'R$'} />
                      </TableCell>
                      <TableCell align="center">
                        <IconButton
                          size="small"
                          onClick={() => handleEditedAcoe(market)  }
                        >
                          <EditIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className={classes.seeMore}>
              </div>
            </React.Fragment>
          </Paper>
        </Grid>
      </Grid>
      <Fab color="primary" size="medium" aria-label="add" className={classes.fab} onClick={() => {setaAcoesModalOpen(true)}} >
        <AddIcon />
      </Fab>
    </div>
  );
}

export default Caixa;
