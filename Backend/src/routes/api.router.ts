import express from "express";
import { trackController } from "../controllers/trackController";
import cors from 'cors';

const apiRouter = express.Router()
apiRouter.use(express.json());
apiRouter.use(cors());

apiRouter.get('/search', trackController.searchAllFiles)

apiRouter.get('/titles', trackController.getAllTrack)

export default apiRouter