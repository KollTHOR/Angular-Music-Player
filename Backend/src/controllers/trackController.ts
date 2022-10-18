import { NextFunction, Request, Response } from 'express';
import { IGetAllTracks } from '../models/ViewModels/IGetAllTracks';
import { trackRepository } from '../repository/trackRepository';
import { trackService } from '../services/trackService';

export const trackController = {
    async searchAllFiles(
        _req: Request,
        res: Response<number>,
        next: NextFunction
    ) {
        await trackService
            .sendTrackRequest()
            .then(affectedRows => {
                return res.json(affectedRows)
            })
            .catch(err => {
                console.log(err)
                next(err)
                return
            })
    },

    async getAllTrack(
        _req: Request, 
        res: Response<IGetAllTracks[]>,
        next: NextFunction
    ) {
        await trackRepository
            .getAllTrack()
            .then(tracks => {
                return res.json(tracks)
            })
            .catch(err => {
                console.log(err)
                next(err)
                return
            })
    },

    async getTracksByTitle(
        req: Request<string>,
        res: Response<IGetAllTracks[]>,
        next: NextFunction
    ) {
        await trackService
            .getTracksByTitle(req)
            .then(tracks => {
                return res.json(tracks)
            })
            .catch(err => {
                console.log(err)
                next(err)
                return
            })
    }


}




