import { Expose, Transform } from "class-transformer";
import * as moment from 'moment';

export class TaskDto {
    @Expose()
    id: number;

    @Expose()
    technicianId: number;

    @Expose()
    summary: string;

    @Expose()
    @Transform(({ value }) => moment(value).format('DD/MM/YYYY'), { toClassOnly: true })
    date: string;

    @Expose()
    completed: boolean;

    @Expose()
    Isworking: boolean;
}