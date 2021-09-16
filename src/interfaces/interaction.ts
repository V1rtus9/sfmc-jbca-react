export interface IInteraction {
    id: string;
    key: string;
    name: string;
    status: string;
    version: number;
    channel: string;
    entryMode: string;
    categoryId: number;
    description: string;
    createdDate: string;
    triggers: Array<any>;
    modifiedDate: string;
    definitionId: string;
    executionMode: string;
    definitionType: string;
    scheduledStatus: string;
    notifiers: Array<unknown>;
    workflowApiVersion: number;
    transactionKeys: unknown | null;
    persistenceModel_pausing: unknown;
    persistenceModel_resuming: unknown;
    persistenceModel_asyncStopping: unknown;
}

export interface IInteractionDefaults {
    email: Array<any>;
    mobileNumber: Array<any>;
    properties: {
        analyticsTracking: {
            enabled: boolean;
            analyticsType: string;
            urlDomainsToTrack: Array<any>;
        }
    }
}

export interface IInteractionTriggerEventDefinition {
    name: string;
    type: string;
    mode: number;
    iconUrl: string;
    isVisibleInPicker: boolean;
    eventDefinitionKey: string;
}