import {Request, Response} from './types';
import {getWorker} from './web-app/workers';
import {v4 as uuidV4} from 'uuid';

export const makeRequest = <T, >(data: T, action: string) => ({
    id: uuidV4(),
    action: action,
    data: data,
});


export const sendRequest = (request: Request<any>) => {
    /*
    console.log("chrome", chrome);
    if (typeof chrome !== 'undefined' && typeof chrome.runtime !== 'undefined') {
        return sendChromeRequest(request);
    }*/

    return sendWorkerRequest(request);
}

export const sendWorkerRequest = (request: Request<any>) => {
    return new Promise((resolve) => {
        const worker = getWorker();
        const onReceiveResponse = (message) => {
            if (message.data.id === request.id) {
                worker.removeEventListener("message", onReceiveResponse);
                resolve(message.data);
            }
        }

        worker.addEventListener('message', onReceiveResponse);
        worker.postMessage(request);
    });
}

/*
export async function sendChromeRequest(request: Request<any>): Promise<Response<any>> {
    return new Promise ((resolve) => {
        if (!chrome?.runtime) {
            resolve({
                id: request.id,
                action: request.action,
                body: {
                    type: "error",
                    message: "Chrome extension unavailable",
                }
            });
        }

        chrome.runtime.sendMessage(request);

        const callback = (message) => {
            if (message.id === request.id) {
                chrome.runtime.onMessage.removeListener(callback);
                resolve(message);
            }
        }

        chrome.runtime.onMessage.addListener(callback);
    });
}*/