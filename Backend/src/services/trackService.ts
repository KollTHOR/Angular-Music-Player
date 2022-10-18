const promisify = require('util').promisify;
import path from 'path';
import fs from 'fs';
const readdirp = promisify(fs.readdir);
const statp = promisify(fs.stat);
import * as mm from 'music-metadata'; 
import { ICreateTrackRequest } from '../models/RequestModels/ICreateTrackRequest';
import { trackRepository } from '../repository/trackRepository';
import IDbResultDataModel from '../models/DomainModels/IDbResultDataModel';
import { IGetAllTracks } from '../models/ViewModels/IGetAllTracks';



export const trackService = {

    
    async getFilePaths(dir: string, fileList: string[] = []): Promise<string[]> {  
        let files = await readdirp(dir);
        for (let file of files) {
            let fullPath = path.join(dir, file);
            let stat = await statp(fullPath);
            if (stat.isDirectory()) {
                await this.getFilePaths(fullPath, fileList);
            } else {
                fileList.push(fullPath);
            }
        }
        return fileList;
    },

    async parseMediaFile(filePaths: string[]): Promise<ICreateTrackRequest[]>  { 
        // const filePaths: string[] = await trackService.getFilePaths(dirs)
        const parsedFiles: ICreateTrackRequest[] = []

        function generateFiveDigitCode(): number {
            return Math.floor(Math.random()*90000) + 10000;
        }

        try {
            for (let path of filePaths) {
                const metadata = await mm.parseFile(path)
                const newTrack: ICreateTrackRequest = {
                    title: metadata.common.title as string,
                    path: path,
                    duration: metadata.format.duration as number,
                    artist: metadata.common.artist as string,
                    album: metadata.common.album as string,
                    trackId: generateFiveDigitCode()
                }
                parsedFiles.push(newTrack)
            }
        } catch (err) {
            Promise.reject(err)
        }
        return parsedFiles
    },

    async sendTrackRequest(): Promise<number> {
        const dirs: string = path.resolve(__dirname, '../../audio-files')
        const filePaths: string[] = await trackService.getFilePaths(dirs)
            return await trackRepository.getAllTrackPath()
                .then(async paths => {
                    for (let i in paths) {
                        for (let k in filePaths) {
                            if (JSON.parse(JSON.stringify(paths[Number(i)])).path === filePaths[Number(k)]) {
                                filePaths.splice(Number(k), 1)
                            }
                        }
                    }

                    if (filePaths.length === 0) {
                        return 0
                    }

                    const tracks: ICreateTrackRequest[] = await trackService.parseMediaFile(filePaths)
                    return trackRepository.addAllTrack(tracks)
                })
                .catch(err => Promise.reject(err))
    },

    async getTracksByTitle(title: string): Promise<IGetAllTracks[]> {
        return await trackRepository.getTracksByTitle(title)
    }

}
