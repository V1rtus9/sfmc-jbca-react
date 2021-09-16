/*
 * Copyright (c) V1rtus9
 * Licensed under the MIT License.
 */

import { rejectTimer } from './reject-timer';
import { IPostmongerSession } from '../../interfaces/postmonger';

export const __init = (session: IPostmongerSession): Promise<any> => {
    return new Promise((resolve, reject) => {
        const t = rejectTimer(reject);
        
        const _fn = (data: any) => {
            resolve(data);
            clearTimeout(t);
        };
        
        session.on('initEvent', _fn);
        session.on('initActivity', _fn);
        session.on('initActivityRunningHover', _fn);
        session.on('initActivityRunningModal', _fn);
    });
}

export const __ready = (session: IPostmongerSession): void => session.trigger('ready');

export const __getTokens = (session: IPostmongerSession): Promise<any> => {
    return new Promise((resolve, reject) => {
        const t = rejectTimer(reject);

        const _fn = (data: any) => {
            typeof data === 'string' ?
                reject() : resolve(data);
                
            clearTimeout(t);
        };

        session?.trigger('requestTokens');
        session?.on('requestedTokens', _fn);
    });
}

export const __getInteraction = (session: IPostmongerSession): Promise<any> => {
    return new Promise((resolve, reject) => {
        const t = rejectTimer(reject);

        const _fn = (data: any) => {
            resolve(data);
            clearTimeout(t);
        };
        
        session?.trigger('requestInteraction');
        session?.on('requestedInteraction', _fn);
    });
}