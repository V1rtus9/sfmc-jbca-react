/*
 * Copyright (c) V1rtus9
 * Licensed under the MIT License.
 */

import React from 'react';
import { IActivity } from './interfaces/activity';
import { IInteraction } from './interfaces/interaction';
import { IPostmongerSession } from './interfaces/postmonger';

export interface IContext {
    activity: IActivity;
    interaction: Readonly<IInteraction>;
    session: Readonly<IPostmongerSession>;
}

export const JBCustomActivityAContext = React.createContext<Partial<IContext>>({});