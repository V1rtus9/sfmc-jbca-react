/*
 * Copyright (c) V1rtus9
 * Licensed under the MIT License.
 */
import React from 'react';
//@ts-ignore
import Postmonger from 'postmonger';
import { JBCustomActivityAContext } from './jbca-context';
import { __init, __ready, __getInteraction } from './hooks/utils/jba';

enum ProviderStatus {
    Init,
    Ready,
    Error
}

interface IProviderState {
    value?: any;
    status: ProviderStatus;
}

interface IProviderProps {
    initComponent?: React.ReactElement;
    errorComponent?: React.ReactElement;
}

export const JourneyBuilderProvider = ({children, initComponent, errorComponent}: React.PropsWithChildren<IProviderProps>): React.ReactElement => {

    const [state, setState] = React.useState<IProviderState>({
        status: ProviderStatus.Init
    });
    
    React.useEffect(() => {
        const session = 
            new Postmonger.Session();

        __ready(session);

        (async () => {

            const value = {
                session,
                activity: await __init(session),
                interaction: await __getInteraction(session)
            };

            setState({
                value,
                status: ProviderStatus.Ready
            });

        })()
        .catch(() => setState({status: ProviderStatus.Error}));
    }, [])
 
    return(
        <React.Fragment>
            {(() => {
                switch(state.status){
                    case ProviderStatus.Init:
                        return initComponent ? initComponent : <div />
                    case ProviderStatus.Ready:
                        return(
                            <JBCustomActivityAContext.Provider value={state.value}>
                                {children}
                            </JBCustomActivityAContext.Provider>
                        )
                    case ProviderStatus.Error:
                        return errorComponent ? errorComponent : (
                            <div style={{display: 'flex', height: '100vh', justifyContent:'center', alignItems: 'center'}}>
                                <div style={{height: 25}}>
                                    <span>Connection with Marketing Cloud failed.</span>
                                </div>
                            </div>
                        )
                }
            })()}
        </React.Fragment>
    )
}