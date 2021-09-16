export interface IArgument {
    url: string;
    verb: string;
    body: string;
    format: string;
    header: string;
    useJwt: boolean;
    timeout: number;
    retryCount: number;
    retryDelay: number;
}

export interface IActivity {
    id: string;
    key: string;
    name: string;
    type: string;
    arguments: {
        execute: IArgument;
    };
    configurationArguments: {
        save: IArgument;
        stop: IArgument;
        publish: IArgument;
        validate: IArgument;
        applicationExtensionKey: string;
    }
    editable: boolean;
    errors: unknown | null;
    metaData: {
        isConfigured: boolean;
    };
    outcomes: Array<{
        key: string
        metaData: {
            invalid: boolean;
        };
        next: string;
        arguments: unknown;
    }>
}