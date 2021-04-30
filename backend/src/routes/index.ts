import { Router } from "express";

import userRoutes from "./userRoutes";
import acoesRoutes from "./acoesRoutes";
import acoesUsRoutes from "./acoesUsRoutes";
import walletRoutes from "./walletRoutes";
import cryptoRoutes from "./cyptoRoutes";
import caixaRoutes from "./caixaRoutes";

const routes = Router();

routes.use(userRoutes);
routes.use(acoesRoutes);
routes.use(acoesUsRoutes);
routes.use(walletRoutes);
routes.use(cryptoRoutes);
routes.use(caixaRoutes);

export default routes;
