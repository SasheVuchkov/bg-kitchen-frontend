

import {Person, Request, Response} from '../../lib/types';


export enum Actions {
    SavePerson = "SavePerson",
    ListPersons = "ListPersons",
    GetPerson = "GetPerson",
    SaveArticle = "SaveArticle",
    ListArticles = "ListArticles",
    GetArticle = "GetArticle",
}

export type Controller = (request: Request<any>) => Promise<Response<any>>;

const apiUrl = "http://light.local/api";

export const tryRequest = async (request: Request<any>, callback: () => Promise<any>) => {
    try {
        return await callback();
    }  catch (error: any) {
        return {
            id: request.id,
            action: request.action,
            body: {
                statusCode: 500,
                data: {
                    type: "error",
                    message: error.stack || error.message,
                }
            },
        }
    }
}

export const controller: Record<Actions, Controller> = {
    [Actions.SavePerson]: async (request: Request<Person>) => {
        return await tryRequest(request, async () => {
            const {data: person} = request;
            const response = await fetch(`${apiUrl}/legal-entities`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(person),
            });
            const body = await response.json();

            return {
                id: request.id,
                action: request.action,
                body: body,
            }
        });
    },

    [Actions.ListPersons]: async (request: Request<any>) => {
        return await tryRequest(request, async () => {
            const response = await fetch(`${apiUrl}/legal-entities?type=${request.data.type}`);
            const body = await response.json();
            return {
                id: request.id,
                action: request.action,
                body: body,
            }
        });
    },

    [Actions.GetPerson]: async (request: Request<any>) => {
        return await tryRequest(request, async () => {
            const {personId} = request?.data;
            const response = await fetch(`${apiUrl}/legal-entities/${personId}`);
            const body = await response.json();
            return {
                id: request.id,
                action: request.action,
                body: body,
            }
        });
    },

    [Actions.SaveArticle]: async (request: Request<Person>) => {
        return await tryRequest(request, async () => {
            const {data: person} = request;
            const response = await fetch(`${apiUrl}/invoice-articles`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(person),
            });
            const body = await response.json();

            return {
                id: request.id,
                action: request.action,
                body: body,
            }
        });
    },

    [Actions.ListArticles]: async (request: Request<any>) => {
        return await tryRequest(request, async () => {
            const response = await fetch(`${apiUrl}/invoice-articles`);
            const body = await response.json();
            return {
                id: request.id,
                action: request.action,
                body: body,
            }
        });
    },

    [Actions.GetArticle]: async (request: Request<any>) => {
        return await tryRequest(request, async () => {
            const {articleId} = request?.data;
            const response = await fetch(`${apiUrl}/invoice-articles/${articleId}`);
            const body = await response.json();
            return {
                id: request.id,
                action: request.action,
                body: body,
            }
        });
    },
}