import { ICreateTrackRequest } from "../models/RequestModels/ICreateTrackRequest";
import { db } from '../data/connection'
import IDbResultDataModel from "../models/DomainModels/IDbResultDataModel";
import { ITrackRequest } from "../models/RequestModels/ITrackRequest";
import { IGetAllTracks } from "../models/ViewModels/IGetAllTracks";

export const trackRepository = {
    async addAllTrack(tracks: ICreateTrackRequest[]): Promise<number> {
        const insertable: string[][] = tracks.map(Object.values)
        const sql: string = "INSERT INTO tracks (`title`, `path`, `duration`, `artist`, `album`, `trackId`) VALUES ?"
        const newTrack = await db.query<IDbResultDataModel>(sql, [insertable]);
        return newTrack.affectedRows
    },

    async getAllTrackPath(): Promise<string[]> {
      const allTrack = await db.query<string[]>(
        `SELECT path FROM tracks`,
        []
      );
      return allTrack
    },

    async getAllTrack(): Promise<IGetAllTracks[]> {
      const allTrack = await db.query<IGetAllTracks[]>(
        `SELECT * FROM tracks`,
        []
      );
      return allTrack
    },

    async getTracksByTitle(title: string): Promise<IGetAllTracks[]> {
      const allTrack = await db.query<IGetAllTracks[]>(
        `SELECT * FROM tracks WHERE title = ?`,
        [
          title
        ]
      );
      return allTrack
    }
}

