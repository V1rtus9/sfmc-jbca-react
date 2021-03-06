/**
 * 
 * {

    "schema": [

        {

            "key": "Event.DEAudience-eabac269-8abc-2a8b-aebb-56d0728fdfb3.ContactKey",

            "type": "Text",

            "length": 50,

            "default": "secondValye",

            "isNullable": null,

            "isPrimaryKey": true

        },

        {

            "key": "Event.DEAudience-eabac269-8abc-2a8b-aebb-56d0728fdfb3.Email",

            "type": "EmailAddress",

            "length": 254,

            "default": null,

            "isNullable": true,

            "isPrimaryKey": null

        },

        {

            "key": "Event.DEAudience-eabac269-8abc-2a8b-aebb-56d0728fdfb3.restrictedvalue",

            "type": "Text",

            "length": 50,

            "default": "happy",

            "isNullable": true,

            "isPrimaryKey": null

        }

    ]

}
 * 
 */

interface ISchemaItem {
    key: string;
    type: string;
    length: number;
    default: string;
    isNullable: boolean;
    isPrimaryKey: boolean;
}

export interface ISchema {
    schema: Array<ISchemaItem>;
}