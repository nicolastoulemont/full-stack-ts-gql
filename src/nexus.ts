/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */







declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
}

export interface NexusGenEnums {
  ErrorCode: "BAD_REQUEST" | "UNAUTHORIZED"
  ErrorMessage: "UNABLE_TO_PROCESS_REQUEST_DUE_TO_CLIENT_ERROR" | "UNAUTHENTICATED_PLEASE_LOGIN"
}

export interface NexusGenScalars {
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
}

export interface NexusGenObjects {
  Error: { // root type
    key?: string | null; // String
    message?: string | null; // String
  }
  InvalidArgumentsError: { // root type
    invalidArguments?: Array<NexusGenRootTypes['Error'] | null> | null; // [Error]
  }
  Mutation: {};
  Query: {};
  User: { // root type
    email?: string | null; // String
    id?: string | null; // ID
    username?: string | null; // String
    verified?: boolean | null; // Boolean
  }
  UserAuthenticationError: {};
}

export interface NexusGenInterfaces {
}

export interface NexusGenUnions {
  UserResult: NexusGenRootTypes['InvalidArgumentsError'] | NexusGenRootTypes['User'] | NexusGenRootTypes['UserAuthenticationError'];
}

export type NexusGenRootTypes = NexusGenObjects & NexusGenUnions

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars & NexusGenEnums

export interface NexusGenFieldTypes {
  Error: { // field return type
    key: string | null; // String
    message: string | null; // String
  }
  InvalidArgumentsError: { // field return type
    code: NexusGenEnums['ErrorCode'] | null; // ErrorCode
    invalidArguments: Array<NexusGenRootTypes['Error'] | null> | null; // [Error]
    message: NexusGenEnums['ErrorMessage'] | null; // ErrorMessage
  }
  Mutation: { // field return type
    createUser: NexusGenRootTypes['UserResult'] | null; // UserResult
  }
  Query: { // field return type
    userById: NexusGenRootTypes['User'] | null; // User
    users: Array<NexusGenRootTypes['User'] | null> | null; // [User]
  }
  User: { // field return type
    email: string | null; // String
    id: string | null; // ID
    username: string | null; // String
    verified: boolean | null; // Boolean
  }
  UserAuthenticationError: { // field return type
    code: NexusGenEnums['ErrorCode'] | null; // ErrorCode
    message: NexusGenEnums['ErrorMessage'] | null; // ErrorMessage
  }
}

export interface NexusGenFieldTypeNames {
  Error: { // field return type name
    key: 'String'
    message: 'String'
  }
  InvalidArgumentsError: { // field return type name
    code: 'ErrorCode'
    invalidArguments: 'Error'
    message: 'ErrorMessage'
  }
  Mutation: { // field return type name
    createUser: 'UserResult'
  }
  Query: { // field return type name
    userById: 'User'
    users: 'User'
  }
  User: { // field return type name
    email: 'String'
    id: 'ID'
    username: 'String'
    verified: 'Boolean'
  }
  UserAuthenticationError: { // field return type name
    code: 'ErrorCode'
    message: 'ErrorMessage'
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    createUser: { // args
      email: string; // String!
      id: string; // String!
      username: string; // String!
      verified: boolean; // Boolean!
    }
  }
  Query: {
    userById: { // args
      id: string; // ID!
    }
  }
}

export interface NexusGenAbstractTypeMembers {
  UserResult: "InvalidArgumentsError" | "User" | "UserAuthenticationError"
}

export interface NexusGenTypeInterfaces {
}

export type NexusGenObjectNames = keyof NexusGenObjects;

export type NexusGenInputNames = never;

export type NexusGenEnumNames = keyof NexusGenEnums;

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = keyof NexusGenScalars;

export type NexusGenUnionNames = keyof NexusGenUnions;

export type NexusGenObjectsUsingAbstractStrategyIsTypeOf = "Error" | "InvalidArgumentsError" | "User" | "UserAuthenticationError";

export type NexusGenAbstractsUsingStrategyResolveType = never;

export type NexusGenFeaturesConfig = {
  abstractTypeStrategies: {
    isTypeOf: true
    __typename: false
    resolveType: false
  }
}

export interface NexusGenTypes {
  context: any;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  inputTypeShapes: NexusGenInputs & NexusGenEnums & NexusGenScalars;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  fieldTypeNames: NexusGenFieldTypeNames;
  allTypes: NexusGenAllTypes;
  typeInterfaces: NexusGenTypeInterfaces;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractTypeMembers: NexusGenAbstractTypeMembers;
  objectsUsingAbstractStrategyIsTypeOf: NexusGenObjectsUsingAbstractStrategyIsTypeOf;
  abstractsUsingStrategyResolveType: NexusGenAbstractsUsingStrategyResolveType;
  features: NexusGenFeaturesConfig;
}


declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
    /**
     * Authorization for an individual field. Returning "undefined"
     * or "Promise<undefined>" means the field can be accessed.
     * Returning "UserAuthenticationError" will prevent the resolver from executing.
     */
    authorization?: (ctx: any) => NexusGenFieldTypes['UserAuthenticationError'] | undefined
    /**
     * Validation for an individual field. Returning "undefined"
     * or "Promise<undefined>" means the field can be accessed.
     * Returning InvalidArgumentsError or "Promise<InvalidArgumentsError>" will prevent the resolver from executing.
     */
    validation?: (args: any) => NexusGenFieldTypes['InvalidArgumentsError'] | undefined
  }
  interface NexusGenPluginInputFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginSchemaConfig {
  }
  interface NexusGenPluginArgConfig {
  }
}