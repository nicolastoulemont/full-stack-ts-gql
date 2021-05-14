/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */


import { Context } from "./context"
import { FieldAuthorizationResolver } from "./plugins/authorization"
import { FieldValidationResolver } from "./plugins/validation"
import { core } from "nexus"
declare global {
  interface NexusGenCustomInputMethods<TypeName extends string> {
    /**
     * A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
     */
    date<FieldName extends string>(fieldName: FieldName, opts?: core.CommonInputFieldConfig<TypeName, FieldName>): void // "DateTime";
  }
}
declare global {
  interface NexusGenCustomOutputMethods<TypeName extends string> {
    /**
     * A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
     */
    date<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "DateTime";
  }
}


declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
}

export interface NexusGenEnums {
  ErrorCode: "BAD_REQUEST" | "NOT_FOUND" | "UNAUTHORIZED"
  ErrorMessage: "RESOURCE_NOT_FOUND" | "UNABLE_TO_PROCESS_REQUEST_DUE_TO_CLIENT_ERROR" | "UNAUTHENTICATED_PLEASE_LOGIN"
  UserStatus: "ACTIVE" | "BANNED" | "DELETED"
}

export interface NexusGenScalars {
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
  DateTime: any
}

export interface NexusGenObjects {
  ActiveUser: { // root type
    email?: string | null; // String
    id?: number | null; // Int
    name?: string | null; // String
    status?: NexusGenEnums['UserStatus'] | null; // UserStatus
  }
  BannedUser: { // root type
    banReason?: string | null; // String
    id?: number | null; // Int
    name?: string | null; // String
    status?: NexusGenEnums['UserStatus'] | null; // UserStatus
  }
  DeletedUser: { // root type
    deletedAt?: NexusGenScalars['DateTime'] | null; // DateTime
    id?: number | null; // Int
    name?: string | null; // String
    status?: NexusGenEnums['UserStatus'] | null; // UserStatus
  }
  InvalidArgument: { // root type
    key?: string | null; // String
    message?: string | null; // String
  }
  InvalidArgumentsError: { // root type
    invalidArguments?: Array<NexusGenRootTypes['InvalidArgument'] | null> | null; // [InvalidArgument]
  }
  Mutation: {};
  NotFoundError: {};
  Post: { // root type
    content?: string | null; // String
    createdAt?: NexusGenScalars['DateTime'] | null; // DateTime
    id?: number | null; // Int
    published?: boolean | null; // Boolean
    title?: string | null; // String
    updatedAt?: NexusGenScalars['DateTime'] | null; // DateTime
  }
  Query: {};
  UserAuthenticationError: {};
}

export interface NexusGenInterfaces {
  Error: NexusGenRootTypes['InvalidArgumentsError'] | NexusGenRootTypes['NotFoundError'] | NexusGenRootTypes['UserAuthenticationError'];
  User: NexusGenRootTypes['ActiveUser'] | NexusGenRootTypes['BannedUser'] | NexusGenRootTypes['DeletedUser'];
}

export interface NexusGenUnions {
  PostResult: NexusGenRootTypes['InvalidArgumentsError'] | NexusGenRootTypes['Post'] | NexusGenRootTypes['UserAuthenticationError'];
  UserResult: NexusGenRootTypes['ActiveUser'] | NexusGenRootTypes['BannedUser'] | NexusGenRootTypes['DeletedUser'] | NexusGenRootTypes['InvalidArgumentsError'] | NexusGenRootTypes['NotFoundError'] | NexusGenRootTypes['UserAuthenticationError'];
}

export type NexusGenRootTypes = NexusGenInterfaces & NexusGenObjects & NexusGenUnions

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars & NexusGenEnums

export interface NexusGenFieldTypes {
  ActiveUser: { // field return type
    email: string | null; // String
    id: number | null; // Int
    name: string | null; // String
    posts: Array<NexusGenRootTypes['Post'] | null> | null; // [Post]
    status: NexusGenEnums['UserStatus'] | null; // UserStatus
  }
  BannedUser: { // field return type
    banReason: string | null; // String
    id: number | null; // Int
    name: string | null; // String
    status: NexusGenEnums['UserStatus'] | null; // UserStatus
  }
  DeletedUser: { // field return type
    deletedAt: NexusGenScalars['DateTime'] | null; // DateTime
    id: number | null; // Int
    name: string | null; // String
    status: NexusGenEnums['UserStatus'] | null; // UserStatus
  }
  InvalidArgument: { // field return type
    key: string | null; // String
    message: string | null; // String
  }
  InvalidArgumentsError: { // field return type
    code: NexusGenEnums['ErrorCode'] | null; // ErrorCode
    invalidArguments: Array<NexusGenRootTypes['InvalidArgument'] | null> | null; // [InvalidArgument]
    message: NexusGenEnums['ErrorMessage'] | null; // ErrorMessage
  }
  Mutation: { // field return type
    changeUserStatus: NexusGenRootTypes['UserResult'] | null; // UserResult
    createPost: NexusGenRootTypes['PostResult'] | null; // PostResult
    createUser: NexusGenRootTypes['UserResult'] | null; // UserResult
  }
  NotFoundError: { // field return type
    code: NexusGenEnums['ErrorCode'] | null; // ErrorCode
    message: NexusGenEnums['ErrorMessage'] | null; // ErrorMessage
  }
  Post: { // field return type
    author: NexusGenRootTypes['User'] | null; // User
    content: string | null; // String
    createdAt: NexusGenScalars['DateTime'] | null; // DateTime
    id: number | null; // Int
    published: boolean | null; // Boolean
    title: string | null; // String
    updatedAt: NexusGenScalars['DateTime'] | null; // DateTime
  }
  Query: { // field return type
    userById: NexusGenRootTypes['UserResult'] | null; // UserResult
    users: Array<NexusGenRootTypes['UserResult'] | null> | null; // [UserResult]
  }
  UserAuthenticationError: { // field return type
    code: NexusGenEnums['ErrorCode'] | null; // ErrorCode
    message: NexusGenEnums['ErrorMessage'] | null; // ErrorMessage
  }
  Error: { // field return type
    code: NexusGenEnums['ErrorCode'] | null; // ErrorCode
    message: NexusGenEnums['ErrorMessage'] | null; // ErrorMessage
  }
  User: { // field return type
    id: number | null; // Int
    name: string | null; // String
    status: NexusGenEnums['UserStatus'] | null; // UserStatus
  }
}

export interface NexusGenFieldTypeNames {
  ActiveUser: { // field return type name
    email: 'String'
    id: 'Int'
    name: 'String'
    posts: 'Post'
    status: 'UserStatus'
  }
  BannedUser: { // field return type name
    banReason: 'String'
    id: 'Int'
    name: 'String'
    status: 'UserStatus'
  }
  DeletedUser: { // field return type name
    deletedAt: 'DateTime'
    id: 'Int'
    name: 'String'
    status: 'UserStatus'
  }
  InvalidArgument: { // field return type name
    key: 'String'
    message: 'String'
  }
  InvalidArgumentsError: { // field return type name
    code: 'ErrorCode'
    invalidArguments: 'InvalidArgument'
    message: 'ErrorMessage'
  }
  Mutation: { // field return type name
    changeUserStatus: 'UserResult'
    createPost: 'PostResult'
    createUser: 'UserResult'
  }
  NotFoundError: { // field return type name
    code: 'ErrorCode'
    message: 'ErrorMessage'
  }
  Post: { // field return type name
    author: 'User'
    content: 'String'
    createdAt: 'DateTime'
    id: 'Int'
    published: 'Boolean'
    title: 'String'
    updatedAt: 'DateTime'
  }
  Query: { // field return type name
    userById: 'UserResult'
    users: 'UserResult'
  }
  UserAuthenticationError: { // field return type name
    code: 'ErrorCode'
    message: 'ErrorMessage'
  }
  Error: { // field return type name
    code: 'ErrorCode'
    message: 'ErrorMessage'
  }
  User: { // field return type name
    id: 'Int'
    name: 'String'
    status: 'UserStatus'
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    changeUserStatus: { // args
      id: number; // Int!
      status: NexusGenEnums['UserStatus']; // UserStatus!
    }
    createPost: { // args
      authorEmail: string; // String!
      content?: string | null; // String
      title: string; // String!
    }
    createUser: { // args
      email: string; // String!
      name: string; // String!
    }
  }
  Query: {
    userById: { // args
      id: string; // ID!
    }
  }
}

export interface NexusGenAbstractTypeMembers {
  PostResult: "InvalidArgumentsError" | "Post" | "UserAuthenticationError"
  UserResult: "ActiveUser" | "BannedUser" | "DeletedUser" | "InvalidArgumentsError" | "NotFoundError" | "UserAuthenticationError"
  Error: "InvalidArgumentsError" | "NotFoundError" | "UserAuthenticationError"
  User: "ActiveUser" | "BannedUser" | "DeletedUser"
}

export interface NexusGenTypeInterfaces {
  ActiveUser: "User"
  BannedUser: "User"
  DeletedUser: "User"
  InvalidArgumentsError: "Error"
  NotFoundError: "Error"
  UserAuthenticationError: "Error"
}

export type NexusGenObjectNames = keyof NexusGenObjects;

export type NexusGenInputNames = never;

export type NexusGenEnumNames = keyof NexusGenEnums;

export type NexusGenInterfaceNames = keyof NexusGenInterfaces;

export type NexusGenScalarNames = keyof NexusGenScalars;

export type NexusGenUnionNames = keyof NexusGenUnions;

export type NexusGenObjectsUsingAbstractStrategyIsTypeOf = "ActiveUser" | "BannedUser" | "DeletedUser" | "InvalidArgumentsError" | "NotFoundError" | "Post" | "UserAuthenticationError";

export type NexusGenAbstractsUsingStrategyResolveType = never;

export type NexusGenFeaturesConfig = {
  abstractTypeStrategies: {
    isTypeOf: true
    __typename: false
    resolveType: false
  }
}

export interface NexusGenTypes {
  context: Context;
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
    authorization?: FieldAuthorizationResolver<TypeName, FieldName>
    /**
     * Validation for an individual field. Returning "undefined"
     * or "Promise<undefined>" means the field can be accessed.
     * Returning InvalidArgumentsError or "Promise<InvalidArgumentsError>" will prevent the resolver from executing.
     */
    validation?: FieldValidationResolver<TypeName, FieldName>
  }
  interface NexusGenPluginInputFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginSchemaConfig {
  }
  interface NexusGenPluginArgConfig {
  }
}