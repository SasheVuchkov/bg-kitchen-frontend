
import {Request, Response} from '../../lib/types';

import {controller} from '../backend/controller';

self.addEventListener("message",  async (message) => {
    console.log(message?.data);
    if (!message?.data?.action || !controller[message.data.action]) {
        return;
    }

    try {
        const response = await controller[message.data.action](message.data as Request<any>);
        console.log("response", response)
        postMessage(response);
    } catch (error) {
        console.log(error);
    } finally {
        return true;
    }
});