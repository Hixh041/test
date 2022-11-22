import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationsService {
    async send(msg: {desctiption: string, otherData: any}) {
        // send message to queue
        return msg;
    }
}
