import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import { toast } from "react-toastify";

import CurrencyTextField from '@unicef/material-ui-currency-textfield'

import { makeStyles } from "@material-ui/core/styles";
import { green, red } from "@material-ui/core/colors";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";

import DialogContentText from '@material-ui/core/DialogContentText';

import api from "../../service/api"

const useStyles = makeStyles(theme => ({
	root: {
		display: "flex",
		flexWrap: "wrap",
	},
	textField: {
		marginRight: theme.spacing(2),
		flex: 1,
	},

	extraAttr: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},

	btnWrapper: {
		position: "relative",
		color: theme.palette.common.white,
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[600],
    }
	},

	btnDel: {
		display: "relative",
    '&:hover': {
      backgroundColor: red,
    }
	},

	buttonProgress: {
		color: green[500],
		position: "absolute",
		top: "50%",
		left: "50%",
		marginTop: -12,
		marginLeft: -12,
	},

}));


const AcoesModalUs = ({ open, onClose, marketId }) => {
	
	const classes = useStyles();
    
	const initialState = {
		code: "",
		name: "",
		pic: null,
		qty: "",
		purchasePrice: "",
		purchaseDate: "",
	  status: false,
	};

	const [acoe, setAcoe] = useState(initialState);
	const [btnDel, setBtnDel] = useState(true);
	const [openDelete, setOpenDelete] = useState(false);
	const [number, setNumber] = useState("0000");

	useEffect(() => {
		const fetchUser = async () => {
			if (!marketId) return;
			try {
				const { data } = await api.get(`/acoesus/${marketId}`);
				setAcoe(data);
				setNumber(data.purchasePrice)
				setBtnDel(false)
				setOpenDelete(false)
			} catch (err) {
			}
		}
		fetchUser();
	}, [marketId, open]);

	const handleClose = () => {
		onClose();
		setAcoe(initialState)
		setBtnDel(true)
		setOpenDelete(false)
		setNumber("0000")
	};

	const handleCloseDelete = () => {
		setOpenDelete(false)
	};

	const handleSaveAcoe = async values => {

		const acoeData = {
			...values,
			purchasePrice: number
		}

		try {
			if (marketId) {
				await api.put(`/acoesus/${marketId}`, acoeData);
				handleClose();
			} else {
			 await api.post("/acoesus", acoeData);
				toast.success("Ações salva com sucesso");
				handleClose();
			}
		} catch (err) {
		}
	};

	const handleDeleteAcoe = async () => {
		await api.put(`/acoesus/${marketId}`, {
				status: openDelete
			});
		handleClose();
	};
	
	return (
		<div className={classes.root}>
			<Dialog 
				open={open}
				onClose={handleClose}
				maxWidth="lg" 
				scroll="paper"
			>
				<DialogTitle id="form-dialog-title">
					Ações - US
				</DialogTitle>
				<Formik
					initialValues={acoe}
					enableReinitialize={true}
					onSubmit={values => handleSaveAcoe(values)}
				>
					{({values, isSubmitting}) => (
						<Form>
							<DialogContent dividers>
								<Typography variant="subtitle1" gutterBottom>
									Carteira Ações
								</Typography>
								
								<div>
										<Field
											as={TextField}
											label={'Nome'}
											name="name"
											placeholder="Moisaco"
											variant="outlined"
											margin="dense"
											fullWidth
											className={classes.textField}
										>
									</Field>
								</div>
								<Field
									as={TextField}
									label={'Codigo'}
									name="code"
									placeholder="MOSI3"
									variant="outlined"
									margin="dense"
									className={classes.textField}
								/>
								<Field
									as={TextField}
									label={'Data da Compra'}
									type="date"
									name="purchaseDate"
									InputLabelProps={{
										shrink: true,
									}}
									variant="outlined"
									margin="dense"
									className={classes.textField}
								/>
								<div>

										<CurrencyTextField
											name="purchasePrice"
											variant="outlined"
											margin="dense"
											className={classes.textField}
											value={number}
											label={'Preço de Compra'}
											currencySymbol="R$"
											minimumValue="0"
											decimalPlaces="2"
											outputFormat="string"
											decimalCharacter=","
											digitGroupSeparator="."
											onChange={(event, values)=> setNumber(values)}
										/>
									<Field
										as={TextField}
										label={'Quantidade'}
										name="qty"
										variant="outlined"
										margin="dense"
									/>
								</div>
								<Typography
									style={{ marginBottom: 8, marginTop: 12 }}
									variant="subtitle1"
								>
								</Typography>
							</DialogContent>
							<DialogActions>
								<Button
									color="secondary"
									variant="outlined"
									disableElevation
									disabled={btnDel}
									onClick={() => setOpenDelete(true)}
									className={classes.btnDel}
								>
									Excluir
								</Button>
								<Button
									color="secondary"
									variant="outlined"
									disableElevation
									onClick={() => handleClose()}
								>
									Cancelar
								</Button>
								<Button
									type="submit"
									color="primary"
									variant="contained"
									disableElevation
									disabled={isSubmitting}
									className={classes.btnWrapper}
								>
									Salvar

									{isSubmitting && (
										<CircularProgress
											size={24}
											className={classes.buttonProgress}
										/>
									)}
								</Button>
							</DialogActions>
						</Form>
					)}
				</Formik>
			</Dialog>

			<Dialog
        open={openDelete}
        onClose={() => handleCloseDelete}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          Tem certeza que deseja excluir?
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
						Apos excluir, os dados serão perdidos para sempre.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button 
						autoFocus 
						onClick={handleCloseDelete} 
						variant="outlined"
						color="secondary">
            Cancelar
          </Button>
          <Button 
						onClick={handleDeleteAcoe} 
						variant="contained"
						color="secondary"
					>
            Excluir
          </Button>
        </DialogActions>
      </Dialog>
		</div>
	);
};

export default AcoesModalUs;
