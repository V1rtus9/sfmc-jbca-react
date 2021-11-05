/*
 * Copyright (c) V1rtus9
 * Licensed under the MIT License.
 */

import React from 'react'
import { IStep } from '../interfaces/step';
import { ISchema } from '../interfaces/schema';
import { ITokens } from '../interfaces/tokens';
import { Button, IButton } from '../interfaces/button';
import { __getTokens, __ready } from './utils/jba';
import { postmongerPromise } from './utils/promise';
import { IEndpoints } from '../interfaces/endpoints';
import { IDataSource } from '../interfaces/data-sources';
import { JBCustomActivityAContext, IContext  } from '../jbca-context';
import { IInteractionDefaults, IInteractionTriggerEventDefinition } from '../interfaces/interaction';

export const useJourneyBuilder = () => {
    const {session, activity, interaction} =
        React.useContext(JBCustomActivityAContext) as IContext;

    /**
     *
     * Called any time there is load time required between Journey Builder and the custom application (on iFrame load, and whenever a Next or Back button is clicked).
     */
    const ready = (): void => __ready(session);

    /**
     * Causes the modal window to close. Currently only works for runningModal.
     */
    const destroy = (): void => session.trigger('destroy');

    /**
     * Journey Builder passes back an object containing both a legacy token and a fuel2token.
     */
    const getTokens = (): Promise<ITokens> => __getTokens(session);

    /**
     * Returns information about the JB Entry Source attributes
     *
     * @unofficial
     */
    const getSchema = (): Promise<ISchema> => postmongerPromise(session, 'requestSchema', 'requestedSchema');

    /**
     * Returns current culture
     */
    const getCulture = (): Promise<string> => postmongerPromise(session, 'requestCulture', 'requestedCulture');

    /**
     * Returns information about the data sources used in the journey
     *
     * @unofficial
     */
    const getDataSources = (): Promise<IDataSource[]> => postmongerPromise(session, 'requestDataSources', 'requestedDataSources');

    /**
     * Broadcast in response to a requestEndpoints event called by the custom application. Journey Builder passes back an object containing a REST host URL.
     */
    const getEndpoints = (): Promise<IEndpoints> => postmongerPromise(session, 'requestEndpoints', 'requestedEndpoints');

    /**
     * Journey Builder passes back an object containing the current journey default settings for activities.
     */
    const getInteractionDefaults = (): Promise<IInteractionDefaults> => postmongerPromise(session, 'requestInteractionDefaults', 'requestedInteractionDefaults');

    /**
     * Journey Builder passes back either an object containing the current Entry Source Event Definition Model, or null.
     */
    const getInteractionTriggerEventDefinition = (): Promise<IInteractionTriggerEventDefinition> => postmongerPromise(session, 'requestTriggerEventDefinition', 'requestedTriggerEventDefinition');

    /**
     * Called in response to clickedNext if there are no validation failures.
     */
    const nextStep = (): void =>  session.trigger('nextStep');

    /**
     * Called in response to clickedBack if there are no validation failures.
     */
    const prevStep = (): void => session.trigger('prevStep');

    /**
     * Called if the configuration flow needs to change, for instance, when a step in the configuration flow should be shown or hidden based on user input.
     */
    const updateSteps = (steps: IStep[]): void => session.trigger('updateSteps', steps);

    /**
     * Called any time clickedNext or clickedBack is called by Journey Builder. May also be called programmatically, for instance, to disable the Next button if the user does not have a valid entry for a given field.
     */
    const updateButton = (button: IButton): void => session.trigger('updateButton', button);

    /** */
    const enableButton = (button: Button): void  => updateButton({
        button,
        enabled: true
    });

    /** */
    const disableButton = (button: Button): void  => updateButton({
        button,
        enabled: false
    });

    /**
     * Called when the activity modal should be closed, with the data saved to the activity on the canvas.
     * Expects an activity definition payload to be passed.
     * payload.metaData.isConfigured must be set to true for the journey to recognize the activity as fully configured (required for activation).
     * Calling updateActivity at any time will skip any remaining configuration steps.
     */
    const updateActivity = (data: any): void => {
        if(!data) {
            throw new Error('data object is missed');
        }

        if(!data.metaData) {
            throw new Error('no metadata object')
        }

        if(data.metaData.isConfigured !== true) {
            throw new Error('data.metaData.isConfigured must be set to true for the journey to recognize the activity as fully configured (required for activation)')
        }

        session.trigger('updateActivity', data);
    }

    /**
     * Subscribe to one of the events that is braadcasted by journey builder
     *
     * @clickedNext
     * Broadcast when the next button has been clicked on the configuration modal. The activity should respond by calling nextStep (or ready, if validation failed, and the custom activity wants to prevent navigation to the next step).
     * @clickedBack
     * Broadcast when the back button has been clicked on the configuration modal. The activity should respond by calling prevStep (or ready, if validation failed, and the custom activity wants to prevent navigation to the previous step).
     * @gotoStep
     * Broadcast when a new step has been loaded (either via button navigation, or the user clicking on a step via the wizard). Returns a step payload.
     */
    const addEventListener = (e: 'clickedNext' | 'clickedBack' | 'gotoStep', cb: (data?: any) => void): void => session.on(e, cb);

    return {
        ready,
        destroy,
        nextStep,
        prevStep,
        activity,
        getSchema,
        getTokens,
        getCulture,
        updateSteps,
        interaction,
        updateButton,
        enableButton,
        getEndpoints,
        disableButton,
        getDataSources,
        updateActivity,
        addEventListener,
        getInteractionDefaults,
        getInteractionTriggerEventDefinition
    }
}