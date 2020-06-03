/* @flow */

/*
 * This file re-exports graphql-compose basic methods.
 * This is done for obtaining static analysis with Flowtype
 * for TContext accross all resolvers in the schema.
 */

import {
    MongooseSchema,
    MongooseDocument, // eslint-disable-line
} from 'mongoose';
import {SchemaComposer, ObjectTypeComposer} from 'graphql-compose';
import {
    composeWithMongoose as _composeWithMongoose,
    convertSchemaToGraphQL as _convertSchemaToGraphQL,
} from 'graphql-compose-mongoose';

export const schemaComposer = new SchemaComposer();

export const composeWithMongoose = (model, opts) => {
    return _composeWithMongoose(model, {schemaComposer, ...opts});
}

export const convertSchemaToGraphQL = (ms, typeName) => {
    return _convertSchemaToGraphQL(ms, typeName, schemaComposer);
}
