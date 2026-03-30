
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Project
 * 
 */
export type Project = $Result.DefaultSelection<Prisma.$ProjectPayload>
/**
 * Model ProjectTranslation
 * 
 */
export type ProjectTranslation = $Result.DefaultSelection<Prisma.$ProjectTranslationPayload>
/**
 * Model Website
 * 
 */
export type Website = $Result.DefaultSelection<Prisma.$WebsitePayload>

/**
 * Enums
 */
export namespace $Enums {
  export const ProjectStatus: {
  DRAFT: 'DRAFT',
  PUBLISHED: 'PUBLISHED'
};

export type ProjectStatus = (typeof ProjectStatus)[keyof typeof ProjectStatus]


export const WebsiteStatus: {
  DRAFT: 'DRAFT',
  PUBLISHED: 'PUBLISHED'
};

export type WebsiteStatus = (typeof WebsiteStatus)[keyof typeof WebsiteStatus]


export const Locale: {
  cs: 'cs',
  en: 'en'
};

export type Locale = (typeof Locale)[keyof typeof Locale]

}

export type ProjectStatus = $Enums.ProjectStatus

export const ProjectStatus: typeof $Enums.ProjectStatus

export type WebsiteStatus = $Enums.WebsiteStatus

export const WebsiteStatus: typeof $Enums.WebsiteStatus

export type Locale = $Enums.Locale

export const Locale: typeof $Enums.Locale

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Projects
 * const projects = await prisma.project.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Projects
   * const projects = await prisma.project.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.project`: Exposes CRUD operations for the **Project** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Projects
    * const projects = await prisma.project.findMany()
    * ```
    */
  get project(): Prisma.ProjectDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.projectTranslation`: Exposes CRUD operations for the **ProjectTranslation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ProjectTranslations
    * const projectTranslations = await prisma.projectTranslation.findMany()
    * ```
    */
  get projectTranslation(): Prisma.ProjectTranslationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.website`: Exposes CRUD operations for the **Website** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Websites
    * const websites = await prisma.website.findMany()
    * ```
    */
  get website(): Prisma.WebsiteDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.3.0
   * Query Engine version: 9d6ad21cbbceab97458517b147a6a09ff43aa735
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Project: 'Project',
    ProjectTranslation: 'ProjectTranslation',
    Website: 'Website'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "project" | "projectTranslation" | "website"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Project: {
        payload: Prisma.$ProjectPayload<ExtArgs>
        fields: Prisma.ProjectFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProjectFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProjectFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          findFirst: {
            args: Prisma.ProjectFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProjectFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          findMany: {
            args: Prisma.ProjectFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>[]
          }
          create: {
            args: Prisma.ProjectCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          createMany: {
            args: Prisma.ProjectCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProjectCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>[]
          }
          delete: {
            args: Prisma.ProjectDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          update: {
            args: Prisma.ProjectUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          deleteMany: {
            args: Prisma.ProjectDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProjectUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProjectUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>[]
          }
          upsert: {
            args: Prisma.ProjectUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          aggregate: {
            args: Prisma.ProjectAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProject>
          }
          groupBy: {
            args: Prisma.ProjectGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProjectGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProjectCountArgs<ExtArgs>
            result: $Utils.Optional<ProjectCountAggregateOutputType> | number
          }
        }
      }
      ProjectTranslation: {
        payload: Prisma.$ProjectTranslationPayload<ExtArgs>
        fields: Prisma.ProjectTranslationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProjectTranslationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectTranslationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProjectTranslationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectTranslationPayload>
          }
          findFirst: {
            args: Prisma.ProjectTranslationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectTranslationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProjectTranslationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectTranslationPayload>
          }
          findMany: {
            args: Prisma.ProjectTranslationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectTranslationPayload>[]
          }
          create: {
            args: Prisma.ProjectTranslationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectTranslationPayload>
          }
          createMany: {
            args: Prisma.ProjectTranslationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProjectTranslationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectTranslationPayload>[]
          }
          delete: {
            args: Prisma.ProjectTranslationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectTranslationPayload>
          }
          update: {
            args: Prisma.ProjectTranslationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectTranslationPayload>
          }
          deleteMany: {
            args: Prisma.ProjectTranslationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProjectTranslationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProjectTranslationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectTranslationPayload>[]
          }
          upsert: {
            args: Prisma.ProjectTranslationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectTranslationPayload>
          }
          aggregate: {
            args: Prisma.ProjectTranslationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProjectTranslation>
          }
          groupBy: {
            args: Prisma.ProjectTranslationGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProjectTranslationGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProjectTranslationCountArgs<ExtArgs>
            result: $Utils.Optional<ProjectTranslationCountAggregateOutputType> | number
          }
        }
      }
      Website: {
        payload: Prisma.$WebsitePayload<ExtArgs>
        fields: Prisma.WebsiteFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WebsiteFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebsitePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WebsiteFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebsitePayload>
          }
          findFirst: {
            args: Prisma.WebsiteFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebsitePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WebsiteFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebsitePayload>
          }
          findMany: {
            args: Prisma.WebsiteFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebsitePayload>[]
          }
          create: {
            args: Prisma.WebsiteCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebsitePayload>
          }
          createMany: {
            args: Prisma.WebsiteCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.WebsiteCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebsitePayload>[]
          }
          delete: {
            args: Prisma.WebsiteDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebsitePayload>
          }
          update: {
            args: Prisma.WebsiteUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebsitePayload>
          }
          deleteMany: {
            args: Prisma.WebsiteDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.WebsiteUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.WebsiteUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebsitePayload>[]
          }
          upsert: {
            args: Prisma.WebsiteUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebsitePayload>
          }
          aggregate: {
            args: Prisma.WebsiteAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWebsite>
          }
          groupBy: {
            args: Prisma.WebsiteGroupByArgs<ExtArgs>
            result: $Utils.Optional<WebsiteGroupByOutputType>[]
          }
          count: {
            args: Prisma.WebsiteCountArgs<ExtArgs>
            result: $Utils.Optional<WebsiteCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    project?: ProjectOmit
    projectTranslation?: ProjectTranslationOmit
    website?: WebsiteOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type ProjectCountOutputType
   */

  export type ProjectCountOutputType = {
    translations: number
  }

  export type ProjectCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    translations?: boolean | ProjectCountOutputTypeCountTranslationsArgs
  }

  // Custom InputTypes
  /**
   * ProjectCountOutputType without action
   */
  export type ProjectCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectCountOutputType
     */
    select?: ProjectCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProjectCountOutputType without action
   */
  export type ProjectCountOutputTypeCountTranslationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjectTranslationWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Project
   */

  export type AggregateProject = {
    _count: ProjectCountAggregateOutputType | null
    _avg: ProjectAvgAggregateOutputType | null
    _sum: ProjectSumAggregateOutputType | null
    _min: ProjectMinAggregateOutputType | null
    _max: ProjectMaxAggregateOutputType | null
  }

  export type ProjectAvgAggregateOutputType = {
    year: number | null
  }

  export type ProjectSumAggregateOutputType = {
    year: number | null
  }

  export type ProjectMinAggregateOutputType = {
    id: string | null
    slug: string | null
    status: $Enums.ProjectStatus | null
    featured: boolean | null
    year: number | null
    coverImageUrl: string | null
    liveUrl: string | null
    repoUrl: string | null
    createdAt: Date | null
    updatedAt: Date | null
    publishedAt: Date | null
  }

  export type ProjectMaxAggregateOutputType = {
    id: string | null
    slug: string | null
    status: $Enums.ProjectStatus | null
    featured: boolean | null
    year: number | null
    coverImageUrl: string | null
    liveUrl: string | null
    repoUrl: string | null
    createdAt: Date | null
    updatedAt: Date | null
    publishedAt: Date | null
  }

  export type ProjectCountAggregateOutputType = {
    id: number
    slug: number
    status: number
    featured: number
    year: number
    coverImageUrl: number
    galleryImageUrls: number
    liveUrl: number
    repoUrl: number
    techStack: number
    createdAt: number
    updatedAt: number
    publishedAt: number
    _all: number
  }


  export type ProjectAvgAggregateInputType = {
    year?: true
  }

  export type ProjectSumAggregateInputType = {
    year?: true
  }

  export type ProjectMinAggregateInputType = {
    id?: true
    slug?: true
    status?: true
    featured?: true
    year?: true
    coverImageUrl?: true
    liveUrl?: true
    repoUrl?: true
    createdAt?: true
    updatedAt?: true
    publishedAt?: true
  }

  export type ProjectMaxAggregateInputType = {
    id?: true
    slug?: true
    status?: true
    featured?: true
    year?: true
    coverImageUrl?: true
    liveUrl?: true
    repoUrl?: true
    createdAt?: true
    updatedAt?: true
    publishedAt?: true
  }

  export type ProjectCountAggregateInputType = {
    id?: true
    slug?: true
    status?: true
    featured?: true
    year?: true
    coverImageUrl?: true
    galleryImageUrls?: true
    liveUrl?: true
    repoUrl?: true
    techStack?: true
    createdAt?: true
    updatedAt?: true
    publishedAt?: true
    _all?: true
  }

  export type ProjectAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Project to aggregate.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Projects
    **/
    _count?: true | ProjectCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProjectAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProjectSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProjectMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProjectMaxAggregateInputType
  }

  export type GetProjectAggregateType<T extends ProjectAggregateArgs> = {
        [P in keyof T & keyof AggregateProject]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProject[P]>
      : GetScalarType<T[P], AggregateProject[P]>
  }




  export type ProjectGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjectWhereInput
    orderBy?: ProjectOrderByWithAggregationInput | ProjectOrderByWithAggregationInput[]
    by: ProjectScalarFieldEnum[] | ProjectScalarFieldEnum
    having?: ProjectScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProjectCountAggregateInputType | true
    _avg?: ProjectAvgAggregateInputType
    _sum?: ProjectSumAggregateInputType
    _min?: ProjectMinAggregateInputType
    _max?: ProjectMaxAggregateInputType
  }

  export type ProjectGroupByOutputType = {
    id: string
    slug: string
    status: $Enums.ProjectStatus
    featured: boolean
    year: number | null
    coverImageUrl: string | null
    galleryImageUrls: string[]
    liveUrl: string | null
    repoUrl: string | null
    techStack: string[]
    createdAt: Date
    updatedAt: Date
    publishedAt: Date | null
    _count: ProjectCountAggregateOutputType | null
    _avg: ProjectAvgAggregateOutputType | null
    _sum: ProjectSumAggregateOutputType | null
    _min: ProjectMinAggregateOutputType | null
    _max: ProjectMaxAggregateOutputType | null
  }

  type GetProjectGroupByPayload<T extends ProjectGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProjectGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProjectGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProjectGroupByOutputType[P]>
            : GetScalarType<T[P], ProjectGroupByOutputType[P]>
        }
      >
    >


  export type ProjectSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    slug?: boolean
    status?: boolean
    featured?: boolean
    year?: boolean
    coverImageUrl?: boolean
    galleryImageUrls?: boolean
    liveUrl?: boolean
    repoUrl?: boolean
    techStack?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    publishedAt?: boolean
    translations?: boolean | Project$translationsArgs<ExtArgs>
    _count?: boolean | ProjectCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["project"]>

  export type ProjectSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    slug?: boolean
    status?: boolean
    featured?: boolean
    year?: boolean
    coverImageUrl?: boolean
    galleryImageUrls?: boolean
    liveUrl?: boolean
    repoUrl?: boolean
    techStack?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    publishedAt?: boolean
  }, ExtArgs["result"]["project"]>

  export type ProjectSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    slug?: boolean
    status?: boolean
    featured?: boolean
    year?: boolean
    coverImageUrl?: boolean
    galleryImageUrls?: boolean
    liveUrl?: boolean
    repoUrl?: boolean
    techStack?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    publishedAt?: boolean
  }, ExtArgs["result"]["project"]>

  export type ProjectSelectScalar = {
    id?: boolean
    slug?: boolean
    status?: boolean
    featured?: boolean
    year?: boolean
    coverImageUrl?: boolean
    galleryImageUrls?: boolean
    liveUrl?: boolean
    repoUrl?: boolean
    techStack?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    publishedAt?: boolean
  }

  export type ProjectOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "slug" | "status" | "featured" | "year" | "coverImageUrl" | "galleryImageUrls" | "liveUrl" | "repoUrl" | "techStack" | "createdAt" | "updatedAt" | "publishedAt", ExtArgs["result"]["project"]>
  export type ProjectInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    translations?: boolean | Project$translationsArgs<ExtArgs>
    _count?: boolean | ProjectCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ProjectIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type ProjectIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ProjectPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Project"
    objects: {
      translations: Prisma.$ProjectTranslationPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      slug: string
      status: $Enums.ProjectStatus
      featured: boolean
      year: number | null
      coverImageUrl: string | null
      galleryImageUrls: string[]
      liveUrl: string | null
      repoUrl: string | null
      techStack: string[]
      createdAt: Date
      updatedAt: Date
      publishedAt: Date | null
    }, ExtArgs["result"]["project"]>
    composites: {}
  }

  type ProjectGetPayload<S extends boolean | null | undefined | ProjectDefaultArgs> = $Result.GetResult<Prisma.$ProjectPayload, S>

  type ProjectCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProjectFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProjectCountAggregateInputType | true
    }

  export interface ProjectDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Project'], meta: { name: 'Project' } }
    /**
     * Find zero or one Project that matches the filter.
     * @param {ProjectFindUniqueArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProjectFindUniqueArgs>(args: SelectSubset<T, ProjectFindUniqueArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Project that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProjectFindUniqueOrThrowArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProjectFindUniqueOrThrowArgs>(args: SelectSubset<T, ProjectFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Project that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectFindFirstArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProjectFindFirstArgs>(args?: SelectSubset<T, ProjectFindFirstArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Project that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectFindFirstOrThrowArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProjectFindFirstOrThrowArgs>(args?: SelectSubset<T, ProjectFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Projects that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Projects
     * const projects = await prisma.project.findMany()
     * 
     * // Get first 10 Projects
     * const projects = await prisma.project.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const projectWithIdOnly = await prisma.project.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProjectFindManyArgs>(args?: SelectSubset<T, ProjectFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Project.
     * @param {ProjectCreateArgs} args - Arguments to create a Project.
     * @example
     * // Create one Project
     * const Project = await prisma.project.create({
     *   data: {
     *     // ... data to create a Project
     *   }
     * })
     * 
     */
    create<T extends ProjectCreateArgs>(args: SelectSubset<T, ProjectCreateArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Projects.
     * @param {ProjectCreateManyArgs} args - Arguments to create many Projects.
     * @example
     * // Create many Projects
     * const project = await prisma.project.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProjectCreateManyArgs>(args?: SelectSubset<T, ProjectCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Projects and returns the data saved in the database.
     * @param {ProjectCreateManyAndReturnArgs} args - Arguments to create many Projects.
     * @example
     * // Create many Projects
     * const project = await prisma.project.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Projects and only return the `id`
     * const projectWithIdOnly = await prisma.project.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProjectCreateManyAndReturnArgs>(args?: SelectSubset<T, ProjectCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Project.
     * @param {ProjectDeleteArgs} args - Arguments to delete one Project.
     * @example
     * // Delete one Project
     * const Project = await prisma.project.delete({
     *   where: {
     *     // ... filter to delete one Project
     *   }
     * })
     * 
     */
    delete<T extends ProjectDeleteArgs>(args: SelectSubset<T, ProjectDeleteArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Project.
     * @param {ProjectUpdateArgs} args - Arguments to update one Project.
     * @example
     * // Update one Project
     * const project = await prisma.project.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProjectUpdateArgs>(args: SelectSubset<T, ProjectUpdateArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Projects.
     * @param {ProjectDeleteManyArgs} args - Arguments to filter Projects to delete.
     * @example
     * // Delete a few Projects
     * const { count } = await prisma.project.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProjectDeleteManyArgs>(args?: SelectSubset<T, ProjectDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Projects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Projects
     * const project = await prisma.project.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProjectUpdateManyArgs>(args: SelectSubset<T, ProjectUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Projects and returns the data updated in the database.
     * @param {ProjectUpdateManyAndReturnArgs} args - Arguments to update many Projects.
     * @example
     * // Update many Projects
     * const project = await prisma.project.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Projects and only return the `id`
     * const projectWithIdOnly = await prisma.project.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProjectUpdateManyAndReturnArgs>(args: SelectSubset<T, ProjectUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Project.
     * @param {ProjectUpsertArgs} args - Arguments to update or create a Project.
     * @example
     * // Update or create a Project
     * const project = await prisma.project.upsert({
     *   create: {
     *     // ... data to create a Project
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Project we want to update
     *   }
     * })
     */
    upsert<T extends ProjectUpsertArgs>(args: SelectSubset<T, ProjectUpsertArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Projects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectCountArgs} args - Arguments to filter Projects to count.
     * @example
     * // Count the number of Projects
     * const count = await prisma.project.count({
     *   where: {
     *     // ... the filter for the Projects we want to count
     *   }
     * })
    **/
    count<T extends ProjectCountArgs>(
      args?: Subset<T, ProjectCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProjectCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Project.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProjectAggregateArgs>(args: Subset<T, ProjectAggregateArgs>): Prisma.PrismaPromise<GetProjectAggregateType<T>>

    /**
     * Group by Project.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProjectGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProjectGroupByArgs['orderBy'] }
        : { orderBy?: ProjectGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProjectGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProjectGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Project model
   */
  readonly fields: ProjectFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Project.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProjectClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    translations<T extends Project$translationsArgs<ExtArgs> = {}>(args?: Subset<T, Project$translationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectTranslationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Project model
   */
  interface ProjectFieldRefs {
    readonly id: FieldRef<"Project", 'String'>
    readonly slug: FieldRef<"Project", 'String'>
    readonly status: FieldRef<"Project", 'ProjectStatus'>
    readonly featured: FieldRef<"Project", 'Boolean'>
    readonly year: FieldRef<"Project", 'Int'>
    readonly coverImageUrl: FieldRef<"Project", 'String'>
    readonly galleryImageUrls: FieldRef<"Project", 'String[]'>
    readonly liveUrl: FieldRef<"Project", 'String'>
    readonly repoUrl: FieldRef<"Project", 'String'>
    readonly techStack: FieldRef<"Project", 'String[]'>
    readonly createdAt: FieldRef<"Project", 'DateTime'>
    readonly updatedAt: FieldRef<"Project", 'DateTime'>
    readonly publishedAt: FieldRef<"Project", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Project findUnique
   */
  export type ProjectFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project findUniqueOrThrow
   */
  export type ProjectFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project findFirst
   */
  export type ProjectFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Projects.
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Projects.
     */
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * Project findFirstOrThrow
   */
  export type ProjectFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Projects.
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Projects.
     */
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * Project findMany
   */
  export type ProjectFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Projects to fetch.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Projects.
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * Project create
   */
  export type ProjectCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * The data needed to create a Project.
     */
    data: XOR<ProjectCreateInput, ProjectUncheckedCreateInput>
  }

  /**
   * Project createMany
   */
  export type ProjectCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Projects.
     */
    data: ProjectCreateManyInput | ProjectCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Project createManyAndReturn
   */
  export type ProjectCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * The data used to create many Projects.
     */
    data: ProjectCreateManyInput | ProjectCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Project update
   */
  export type ProjectUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * The data needed to update a Project.
     */
    data: XOR<ProjectUpdateInput, ProjectUncheckedUpdateInput>
    /**
     * Choose, which Project to update.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project updateMany
   */
  export type ProjectUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Projects.
     */
    data: XOR<ProjectUpdateManyMutationInput, ProjectUncheckedUpdateManyInput>
    /**
     * Filter which Projects to update
     */
    where?: ProjectWhereInput
    /**
     * Limit how many Projects to update.
     */
    limit?: number
  }

  /**
   * Project updateManyAndReturn
   */
  export type ProjectUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * The data used to update Projects.
     */
    data: XOR<ProjectUpdateManyMutationInput, ProjectUncheckedUpdateManyInput>
    /**
     * Filter which Projects to update
     */
    where?: ProjectWhereInput
    /**
     * Limit how many Projects to update.
     */
    limit?: number
  }

  /**
   * Project upsert
   */
  export type ProjectUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * The filter to search for the Project to update in case it exists.
     */
    where: ProjectWhereUniqueInput
    /**
     * In case the Project found by the `where` argument doesn't exist, create a new Project with this data.
     */
    create: XOR<ProjectCreateInput, ProjectUncheckedCreateInput>
    /**
     * In case the Project was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProjectUpdateInput, ProjectUncheckedUpdateInput>
  }

  /**
   * Project delete
   */
  export type ProjectDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter which Project to delete.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project deleteMany
   */
  export type ProjectDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Projects to delete
     */
    where?: ProjectWhereInput
    /**
     * Limit how many Projects to delete.
     */
    limit?: number
  }

  /**
   * Project.translations
   */
  export type Project$translationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectTranslation
     */
    select?: ProjectTranslationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectTranslation
     */
    omit?: ProjectTranslationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectTranslationInclude<ExtArgs> | null
    where?: ProjectTranslationWhereInput
    orderBy?: ProjectTranslationOrderByWithRelationInput | ProjectTranslationOrderByWithRelationInput[]
    cursor?: ProjectTranslationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProjectTranslationScalarFieldEnum | ProjectTranslationScalarFieldEnum[]
  }

  /**
   * Project without action
   */
  export type ProjectDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
  }


  /**
   * Model ProjectTranslation
   */

  export type AggregateProjectTranslation = {
    _count: ProjectTranslationCountAggregateOutputType | null
    _min: ProjectTranslationMinAggregateOutputType | null
    _max: ProjectTranslationMaxAggregateOutputType | null
  }

  export type ProjectTranslationMinAggregateOutputType = {
    id: string | null
    projectId: string | null
    locale: $Enums.Locale | null
    title: string | null
    tagline: string | null
    descriptionShort: string | null
    descriptionLong: string | null
    role: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProjectTranslationMaxAggregateOutputType = {
    id: string | null
    projectId: string | null
    locale: $Enums.Locale | null
    title: string | null
    tagline: string | null
    descriptionShort: string | null
    descriptionLong: string | null
    role: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProjectTranslationCountAggregateOutputType = {
    id: number
    projectId: number
    locale: number
    title: number
    tagline: number
    descriptionShort: number
    descriptionLong: number
    caseStudyBlocks: number
    role: number
    highlights: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ProjectTranslationMinAggregateInputType = {
    id?: true
    projectId?: true
    locale?: true
    title?: true
    tagline?: true
    descriptionShort?: true
    descriptionLong?: true
    role?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProjectTranslationMaxAggregateInputType = {
    id?: true
    projectId?: true
    locale?: true
    title?: true
    tagline?: true
    descriptionShort?: true
    descriptionLong?: true
    role?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProjectTranslationCountAggregateInputType = {
    id?: true
    projectId?: true
    locale?: true
    title?: true
    tagline?: true
    descriptionShort?: true
    descriptionLong?: true
    caseStudyBlocks?: true
    role?: true
    highlights?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ProjectTranslationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProjectTranslation to aggregate.
     */
    where?: ProjectTranslationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProjectTranslations to fetch.
     */
    orderBy?: ProjectTranslationOrderByWithRelationInput | ProjectTranslationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProjectTranslationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProjectTranslations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProjectTranslations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ProjectTranslations
    **/
    _count?: true | ProjectTranslationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProjectTranslationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProjectTranslationMaxAggregateInputType
  }

  export type GetProjectTranslationAggregateType<T extends ProjectTranslationAggregateArgs> = {
        [P in keyof T & keyof AggregateProjectTranslation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProjectTranslation[P]>
      : GetScalarType<T[P], AggregateProjectTranslation[P]>
  }




  export type ProjectTranslationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjectTranslationWhereInput
    orderBy?: ProjectTranslationOrderByWithAggregationInput | ProjectTranslationOrderByWithAggregationInput[]
    by: ProjectTranslationScalarFieldEnum[] | ProjectTranslationScalarFieldEnum
    having?: ProjectTranslationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProjectTranslationCountAggregateInputType | true
    _min?: ProjectTranslationMinAggregateInputType
    _max?: ProjectTranslationMaxAggregateInputType
  }

  export type ProjectTranslationGroupByOutputType = {
    id: string
    projectId: string
    locale: $Enums.Locale
    title: string
    tagline: string | null
    descriptionShort: string | null
    descriptionLong: string | null
    caseStudyBlocks: JsonValue
    role: string | null
    highlights: string[]
    createdAt: Date
    updatedAt: Date
    _count: ProjectTranslationCountAggregateOutputType | null
    _min: ProjectTranslationMinAggregateOutputType | null
    _max: ProjectTranslationMaxAggregateOutputType | null
  }

  type GetProjectTranslationGroupByPayload<T extends ProjectTranslationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProjectTranslationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProjectTranslationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProjectTranslationGroupByOutputType[P]>
            : GetScalarType<T[P], ProjectTranslationGroupByOutputType[P]>
        }
      >
    >


  export type ProjectTranslationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projectId?: boolean
    locale?: boolean
    title?: boolean
    tagline?: boolean
    descriptionShort?: boolean
    descriptionLong?: boolean
    caseStudyBlocks?: boolean
    role?: boolean
    highlights?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["projectTranslation"]>

  export type ProjectTranslationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projectId?: boolean
    locale?: boolean
    title?: boolean
    tagline?: boolean
    descriptionShort?: boolean
    descriptionLong?: boolean
    caseStudyBlocks?: boolean
    role?: boolean
    highlights?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["projectTranslation"]>

  export type ProjectTranslationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projectId?: boolean
    locale?: boolean
    title?: boolean
    tagline?: boolean
    descriptionShort?: boolean
    descriptionLong?: boolean
    caseStudyBlocks?: boolean
    role?: boolean
    highlights?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["projectTranslation"]>

  export type ProjectTranslationSelectScalar = {
    id?: boolean
    projectId?: boolean
    locale?: boolean
    title?: boolean
    tagline?: boolean
    descriptionShort?: boolean
    descriptionLong?: boolean
    caseStudyBlocks?: boolean
    role?: boolean
    highlights?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ProjectTranslationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "projectId" | "locale" | "title" | "tagline" | "descriptionShort" | "descriptionLong" | "caseStudyBlocks" | "role" | "highlights" | "createdAt" | "updatedAt", ExtArgs["result"]["projectTranslation"]>
  export type ProjectTranslationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }
  export type ProjectTranslationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }
  export type ProjectTranslationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }

  export type $ProjectTranslationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ProjectTranslation"
    objects: {
      project: Prisma.$ProjectPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      projectId: string
      locale: $Enums.Locale
      title: string
      tagline: string | null
      descriptionShort: string | null
      descriptionLong: string | null
      caseStudyBlocks: Prisma.JsonValue
      role: string | null
      highlights: string[]
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["projectTranslation"]>
    composites: {}
  }

  type ProjectTranslationGetPayload<S extends boolean | null | undefined | ProjectTranslationDefaultArgs> = $Result.GetResult<Prisma.$ProjectTranslationPayload, S>

  type ProjectTranslationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProjectTranslationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProjectTranslationCountAggregateInputType | true
    }

  export interface ProjectTranslationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ProjectTranslation'], meta: { name: 'ProjectTranslation' } }
    /**
     * Find zero or one ProjectTranslation that matches the filter.
     * @param {ProjectTranslationFindUniqueArgs} args - Arguments to find a ProjectTranslation
     * @example
     * // Get one ProjectTranslation
     * const projectTranslation = await prisma.projectTranslation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProjectTranslationFindUniqueArgs>(args: SelectSubset<T, ProjectTranslationFindUniqueArgs<ExtArgs>>): Prisma__ProjectTranslationClient<$Result.GetResult<Prisma.$ProjectTranslationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ProjectTranslation that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProjectTranslationFindUniqueOrThrowArgs} args - Arguments to find a ProjectTranslation
     * @example
     * // Get one ProjectTranslation
     * const projectTranslation = await prisma.projectTranslation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProjectTranslationFindUniqueOrThrowArgs>(args: SelectSubset<T, ProjectTranslationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProjectTranslationClient<$Result.GetResult<Prisma.$ProjectTranslationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProjectTranslation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectTranslationFindFirstArgs} args - Arguments to find a ProjectTranslation
     * @example
     * // Get one ProjectTranslation
     * const projectTranslation = await prisma.projectTranslation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProjectTranslationFindFirstArgs>(args?: SelectSubset<T, ProjectTranslationFindFirstArgs<ExtArgs>>): Prisma__ProjectTranslationClient<$Result.GetResult<Prisma.$ProjectTranslationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProjectTranslation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectTranslationFindFirstOrThrowArgs} args - Arguments to find a ProjectTranslation
     * @example
     * // Get one ProjectTranslation
     * const projectTranslation = await prisma.projectTranslation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProjectTranslationFindFirstOrThrowArgs>(args?: SelectSubset<T, ProjectTranslationFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProjectTranslationClient<$Result.GetResult<Prisma.$ProjectTranslationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ProjectTranslations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectTranslationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ProjectTranslations
     * const projectTranslations = await prisma.projectTranslation.findMany()
     * 
     * // Get first 10 ProjectTranslations
     * const projectTranslations = await prisma.projectTranslation.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const projectTranslationWithIdOnly = await prisma.projectTranslation.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProjectTranslationFindManyArgs>(args?: SelectSubset<T, ProjectTranslationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectTranslationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ProjectTranslation.
     * @param {ProjectTranslationCreateArgs} args - Arguments to create a ProjectTranslation.
     * @example
     * // Create one ProjectTranslation
     * const ProjectTranslation = await prisma.projectTranslation.create({
     *   data: {
     *     // ... data to create a ProjectTranslation
     *   }
     * })
     * 
     */
    create<T extends ProjectTranslationCreateArgs>(args: SelectSubset<T, ProjectTranslationCreateArgs<ExtArgs>>): Prisma__ProjectTranslationClient<$Result.GetResult<Prisma.$ProjectTranslationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ProjectTranslations.
     * @param {ProjectTranslationCreateManyArgs} args - Arguments to create many ProjectTranslations.
     * @example
     * // Create many ProjectTranslations
     * const projectTranslation = await prisma.projectTranslation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProjectTranslationCreateManyArgs>(args?: SelectSubset<T, ProjectTranslationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ProjectTranslations and returns the data saved in the database.
     * @param {ProjectTranslationCreateManyAndReturnArgs} args - Arguments to create many ProjectTranslations.
     * @example
     * // Create many ProjectTranslations
     * const projectTranslation = await prisma.projectTranslation.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ProjectTranslations and only return the `id`
     * const projectTranslationWithIdOnly = await prisma.projectTranslation.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProjectTranslationCreateManyAndReturnArgs>(args?: SelectSubset<T, ProjectTranslationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectTranslationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ProjectTranslation.
     * @param {ProjectTranslationDeleteArgs} args - Arguments to delete one ProjectTranslation.
     * @example
     * // Delete one ProjectTranslation
     * const ProjectTranslation = await prisma.projectTranslation.delete({
     *   where: {
     *     // ... filter to delete one ProjectTranslation
     *   }
     * })
     * 
     */
    delete<T extends ProjectTranslationDeleteArgs>(args: SelectSubset<T, ProjectTranslationDeleteArgs<ExtArgs>>): Prisma__ProjectTranslationClient<$Result.GetResult<Prisma.$ProjectTranslationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ProjectTranslation.
     * @param {ProjectTranslationUpdateArgs} args - Arguments to update one ProjectTranslation.
     * @example
     * // Update one ProjectTranslation
     * const projectTranslation = await prisma.projectTranslation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProjectTranslationUpdateArgs>(args: SelectSubset<T, ProjectTranslationUpdateArgs<ExtArgs>>): Prisma__ProjectTranslationClient<$Result.GetResult<Prisma.$ProjectTranslationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ProjectTranslations.
     * @param {ProjectTranslationDeleteManyArgs} args - Arguments to filter ProjectTranslations to delete.
     * @example
     * // Delete a few ProjectTranslations
     * const { count } = await prisma.projectTranslation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProjectTranslationDeleteManyArgs>(args?: SelectSubset<T, ProjectTranslationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProjectTranslations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectTranslationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ProjectTranslations
     * const projectTranslation = await prisma.projectTranslation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProjectTranslationUpdateManyArgs>(args: SelectSubset<T, ProjectTranslationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProjectTranslations and returns the data updated in the database.
     * @param {ProjectTranslationUpdateManyAndReturnArgs} args - Arguments to update many ProjectTranslations.
     * @example
     * // Update many ProjectTranslations
     * const projectTranslation = await prisma.projectTranslation.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ProjectTranslations and only return the `id`
     * const projectTranslationWithIdOnly = await prisma.projectTranslation.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProjectTranslationUpdateManyAndReturnArgs>(args: SelectSubset<T, ProjectTranslationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectTranslationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ProjectTranslation.
     * @param {ProjectTranslationUpsertArgs} args - Arguments to update or create a ProjectTranslation.
     * @example
     * // Update or create a ProjectTranslation
     * const projectTranslation = await prisma.projectTranslation.upsert({
     *   create: {
     *     // ... data to create a ProjectTranslation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ProjectTranslation we want to update
     *   }
     * })
     */
    upsert<T extends ProjectTranslationUpsertArgs>(args: SelectSubset<T, ProjectTranslationUpsertArgs<ExtArgs>>): Prisma__ProjectTranslationClient<$Result.GetResult<Prisma.$ProjectTranslationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ProjectTranslations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectTranslationCountArgs} args - Arguments to filter ProjectTranslations to count.
     * @example
     * // Count the number of ProjectTranslations
     * const count = await prisma.projectTranslation.count({
     *   where: {
     *     // ... the filter for the ProjectTranslations we want to count
     *   }
     * })
    **/
    count<T extends ProjectTranslationCountArgs>(
      args?: Subset<T, ProjectTranslationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProjectTranslationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ProjectTranslation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectTranslationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProjectTranslationAggregateArgs>(args: Subset<T, ProjectTranslationAggregateArgs>): Prisma.PrismaPromise<GetProjectTranslationAggregateType<T>>

    /**
     * Group by ProjectTranslation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectTranslationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProjectTranslationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProjectTranslationGroupByArgs['orderBy'] }
        : { orderBy?: ProjectTranslationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProjectTranslationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProjectTranslationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ProjectTranslation model
   */
  readonly fields: ProjectTranslationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ProjectTranslation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProjectTranslationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    project<T extends ProjectDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProjectDefaultArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ProjectTranslation model
   */
  interface ProjectTranslationFieldRefs {
    readonly id: FieldRef<"ProjectTranslation", 'String'>
    readonly projectId: FieldRef<"ProjectTranslation", 'String'>
    readonly locale: FieldRef<"ProjectTranslation", 'Locale'>
    readonly title: FieldRef<"ProjectTranslation", 'String'>
    readonly tagline: FieldRef<"ProjectTranslation", 'String'>
    readonly descriptionShort: FieldRef<"ProjectTranslation", 'String'>
    readonly descriptionLong: FieldRef<"ProjectTranslation", 'String'>
    readonly caseStudyBlocks: FieldRef<"ProjectTranslation", 'Json'>
    readonly role: FieldRef<"ProjectTranslation", 'String'>
    readonly highlights: FieldRef<"ProjectTranslation", 'String[]'>
    readonly createdAt: FieldRef<"ProjectTranslation", 'DateTime'>
    readonly updatedAt: FieldRef<"ProjectTranslation", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ProjectTranslation findUnique
   */
  export type ProjectTranslationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectTranslation
     */
    select?: ProjectTranslationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectTranslation
     */
    omit?: ProjectTranslationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectTranslationInclude<ExtArgs> | null
    /**
     * Filter, which ProjectTranslation to fetch.
     */
    where: ProjectTranslationWhereUniqueInput
  }

  /**
   * ProjectTranslation findUniqueOrThrow
   */
  export type ProjectTranslationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectTranslation
     */
    select?: ProjectTranslationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectTranslation
     */
    omit?: ProjectTranslationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectTranslationInclude<ExtArgs> | null
    /**
     * Filter, which ProjectTranslation to fetch.
     */
    where: ProjectTranslationWhereUniqueInput
  }

  /**
   * ProjectTranslation findFirst
   */
  export type ProjectTranslationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectTranslation
     */
    select?: ProjectTranslationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectTranslation
     */
    omit?: ProjectTranslationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectTranslationInclude<ExtArgs> | null
    /**
     * Filter, which ProjectTranslation to fetch.
     */
    where?: ProjectTranslationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProjectTranslations to fetch.
     */
    orderBy?: ProjectTranslationOrderByWithRelationInput | ProjectTranslationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProjectTranslations.
     */
    cursor?: ProjectTranslationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProjectTranslations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProjectTranslations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProjectTranslations.
     */
    distinct?: ProjectTranslationScalarFieldEnum | ProjectTranslationScalarFieldEnum[]
  }

  /**
   * ProjectTranslation findFirstOrThrow
   */
  export type ProjectTranslationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectTranslation
     */
    select?: ProjectTranslationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectTranslation
     */
    omit?: ProjectTranslationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectTranslationInclude<ExtArgs> | null
    /**
     * Filter, which ProjectTranslation to fetch.
     */
    where?: ProjectTranslationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProjectTranslations to fetch.
     */
    orderBy?: ProjectTranslationOrderByWithRelationInput | ProjectTranslationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProjectTranslations.
     */
    cursor?: ProjectTranslationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProjectTranslations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProjectTranslations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProjectTranslations.
     */
    distinct?: ProjectTranslationScalarFieldEnum | ProjectTranslationScalarFieldEnum[]
  }

  /**
   * ProjectTranslation findMany
   */
  export type ProjectTranslationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectTranslation
     */
    select?: ProjectTranslationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectTranslation
     */
    omit?: ProjectTranslationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectTranslationInclude<ExtArgs> | null
    /**
     * Filter, which ProjectTranslations to fetch.
     */
    where?: ProjectTranslationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProjectTranslations to fetch.
     */
    orderBy?: ProjectTranslationOrderByWithRelationInput | ProjectTranslationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ProjectTranslations.
     */
    cursor?: ProjectTranslationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProjectTranslations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProjectTranslations.
     */
    skip?: number
    distinct?: ProjectTranslationScalarFieldEnum | ProjectTranslationScalarFieldEnum[]
  }

  /**
   * ProjectTranslation create
   */
  export type ProjectTranslationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectTranslation
     */
    select?: ProjectTranslationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectTranslation
     */
    omit?: ProjectTranslationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectTranslationInclude<ExtArgs> | null
    /**
     * The data needed to create a ProjectTranslation.
     */
    data: XOR<ProjectTranslationCreateInput, ProjectTranslationUncheckedCreateInput>
  }

  /**
   * ProjectTranslation createMany
   */
  export type ProjectTranslationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ProjectTranslations.
     */
    data: ProjectTranslationCreateManyInput | ProjectTranslationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ProjectTranslation createManyAndReturn
   */
  export type ProjectTranslationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectTranslation
     */
    select?: ProjectTranslationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectTranslation
     */
    omit?: ProjectTranslationOmit<ExtArgs> | null
    /**
     * The data used to create many ProjectTranslations.
     */
    data: ProjectTranslationCreateManyInput | ProjectTranslationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectTranslationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ProjectTranslation update
   */
  export type ProjectTranslationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectTranslation
     */
    select?: ProjectTranslationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectTranslation
     */
    omit?: ProjectTranslationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectTranslationInclude<ExtArgs> | null
    /**
     * The data needed to update a ProjectTranslation.
     */
    data: XOR<ProjectTranslationUpdateInput, ProjectTranslationUncheckedUpdateInput>
    /**
     * Choose, which ProjectTranslation to update.
     */
    where: ProjectTranslationWhereUniqueInput
  }

  /**
   * ProjectTranslation updateMany
   */
  export type ProjectTranslationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ProjectTranslations.
     */
    data: XOR<ProjectTranslationUpdateManyMutationInput, ProjectTranslationUncheckedUpdateManyInput>
    /**
     * Filter which ProjectTranslations to update
     */
    where?: ProjectTranslationWhereInput
    /**
     * Limit how many ProjectTranslations to update.
     */
    limit?: number
  }

  /**
   * ProjectTranslation updateManyAndReturn
   */
  export type ProjectTranslationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectTranslation
     */
    select?: ProjectTranslationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectTranslation
     */
    omit?: ProjectTranslationOmit<ExtArgs> | null
    /**
     * The data used to update ProjectTranslations.
     */
    data: XOR<ProjectTranslationUpdateManyMutationInput, ProjectTranslationUncheckedUpdateManyInput>
    /**
     * Filter which ProjectTranslations to update
     */
    where?: ProjectTranslationWhereInput
    /**
     * Limit how many ProjectTranslations to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectTranslationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ProjectTranslation upsert
   */
  export type ProjectTranslationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectTranslation
     */
    select?: ProjectTranslationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectTranslation
     */
    omit?: ProjectTranslationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectTranslationInclude<ExtArgs> | null
    /**
     * The filter to search for the ProjectTranslation to update in case it exists.
     */
    where: ProjectTranslationWhereUniqueInput
    /**
     * In case the ProjectTranslation found by the `where` argument doesn't exist, create a new ProjectTranslation with this data.
     */
    create: XOR<ProjectTranslationCreateInput, ProjectTranslationUncheckedCreateInput>
    /**
     * In case the ProjectTranslation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProjectTranslationUpdateInput, ProjectTranslationUncheckedUpdateInput>
  }

  /**
   * ProjectTranslation delete
   */
  export type ProjectTranslationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectTranslation
     */
    select?: ProjectTranslationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectTranslation
     */
    omit?: ProjectTranslationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectTranslationInclude<ExtArgs> | null
    /**
     * Filter which ProjectTranslation to delete.
     */
    where: ProjectTranslationWhereUniqueInput
  }

  /**
   * ProjectTranslation deleteMany
   */
  export type ProjectTranslationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProjectTranslations to delete
     */
    where?: ProjectTranslationWhereInput
    /**
     * Limit how many ProjectTranslations to delete.
     */
    limit?: number
  }

  /**
   * ProjectTranslation without action
   */
  export type ProjectTranslationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectTranslation
     */
    select?: ProjectTranslationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectTranslation
     */
    omit?: ProjectTranslationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectTranslationInclude<ExtArgs> | null
  }


  /**
   * Model Website
   */

  export type AggregateWebsite = {
    _count: WebsiteCountAggregateOutputType | null
    _avg: WebsiteAvgAggregateOutputType | null
    _sum: WebsiteSumAggregateOutputType | null
    _min: WebsiteMinAggregateOutputType | null
    _max: WebsiteMaxAggregateOutputType | null
  }

  export type WebsiteAvgAggregateOutputType = {
    sortOrder: number | null
  }

  export type WebsiteSumAggregateOutputType = {
    sortOrder: number | null
  }

  export type WebsiteMinAggregateOutputType = {
    id: string | null
    name: string | null
    url: string | null
    category: string | null
    description: string | null
    sortOrder: number | null
    status: $Enums.WebsiteStatus | null
    createdAt: Date | null
    updatedAt: Date | null
    publishedAt: Date | null
  }

  export type WebsiteMaxAggregateOutputType = {
    id: string | null
    name: string | null
    url: string | null
    category: string | null
    description: string | null
    sortOrder: number | null
    status: $Enums.WebsiteStatus | null
    createdAt: Date | null
    updatedAt: Date | null
    publishedAt: Date | null
  }

  export type WebsiteCountAggregateOutputType = {
    id: number
    name: number
    url: number
    category: number
    description: number
    sortOrder: number
    status: number
    createdAt: number
    updatedAt: number
    publishedAt: number
    _all: number
  }


  export type WebsiteAvgAggregateInputType = {
    sortOrder?: true
  }

  export type WebsiteSumAggregateInputType = {
    sortOrder?: true
  }

  export type WebsiteMinAggregateInputType = {
    id?: true
    name?: true
    url?: true
    category?: true
    description?: true
    sortOrder?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    publishedAt?: true
  }

  export type WebsiteMaxAggregateInputType = {
    id?: true
    name?: true
    url?: true
    category?: true
    description?: true
    sortOrder?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    publishedAt?: true
  }

  export type WebsiteCountAggregateInputType = {
    id?: true
    name?: true
    url?: true
    category?: true
    description?: true
    sortOrder?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    publishedAt?: true
    _all?: true
  }

  export type WebsiteAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Website to aggregate.
     */
    where?: WebsiteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Websites to fetch.
     */
    orderBy?: WebsiteOrderByWithRelationInput | WebsiteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WebsiteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Websites from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Websites.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Websites
    **/
    _count?: true | WebsiteCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: WebsiteAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: WebsiteSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WebsiteMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WebsiteMaxAggregateInputType
  }

  export type GetWebsiteAggregateType<T extends WebsiteAggregateArgs> = {
        [P in keyof T & keyof AggregateWebsite]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWebsite[P]>
      : GetScalarType<T[P], AggregateWebsite[P]>
  }




  export type WebsiteGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WebsiteWhereInput
    orderBy?: WebsiteOrderByWithAggregationInput | WebsiteOrderByWithAggregationInput[]
    by: WebsiteScalarFieldEnum[] | WebsiteScalarFieldEnum
    having?: WebsiteScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WebsiteCountAggregateInputType | true
    _avg?: WebsiteAvgAggregateInputType
    _sum?: WebsiteSumAggregateInputType
    _min?: WebsiteMinAggregateInputType
    _max?: WebsiteMaxAggregateInputType
  }

  export type WebsiteGroupByOutputType = {
    id: string
    name: string
    url: string
    category: string
    description: string | null
    sortOrder: number
    status: $Enums.WebsiteStatus
    createdAt: Date
    updatedAt: Date
    publishedAt: Date | null
    _count: WebsiteCountAggregateOutputType | null
    _avg: WebsiteAvgAggregateOutputType | null
    _sum: WebsiteSumAggregateOutputType | null
    _min: WebsiteMinAggregateOutputType | null
    _max: WebsiteMaxAggregateOutputType | null
  }

  type GetWebsiteGroupByPayload<T extends WebsiteGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WebsiteGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WebsiteGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WebsiteGroupByOutputType[P]>
            : GetScalarType<T[P], WebsiteGroupByOutputType[P]>
        }
      >
    >


  export type WebsiteSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    url?: boolean
    category?: boolean
    description?: boolean
    sortOrder?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    publishedAt?: boolean
  }, ExtArgs["result"]["website"]>

  export type WebsiteSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    url?: boolean
    category?: boolean
    description?: boolean
    sortOrder?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    publishedAt?: boolean
  }, ExtArgs["result"]["website"]>

  export type WebsiteSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    url?: boolean
    category?: boolean
    description?: boolean
    sortOrder?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    publishedAt?: boolean
  }, ExtArgs["result"]["website"]>

  export type WebsiteSelectScalar = {
    id?: boolean
    name?: boolean
    url?: boolean
    category?: boolean
    description?: boolean
    sortOrder?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    publishedAt?: boolean
  }

  export type WebsiteOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "url" | "category" | "description" | "sortOrder" | "status" | "createdAt" | "updatedAt" | "publishedAt", ExtArgs["result"]["website"]>

  export type $WebsitePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Website"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      url: string
      category: string
      description: string | null
      sortOrder: number
      status: $Enums.WebsiteStatus
      createdAt: Date
      updatedAt: Date
      publishedAt: Date | null
    }, ExtArgs["result"]["website"]>
    composites: {}
  }

  type WebsiteGetPayload<S extends boolean | null | undefined | WebsiteDefaultArgs> = $Result.GetResult<Prisma.$WebsitePayload, S>

  type WebsiteCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<WebsiteFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: WebsiteCountAggregateInputType | true
    }

  export interface WebsiteDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Website'], meta: { name: 'Website' } }
    /**
     * Find zero or one Website that matches the filter.
     * @param {WebsiteFindUniqueArgs} args - Arguments to find a Website
     * @example
     * // Get one Website
     * const website = await prisma.website.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WebsiteFindUniqueArgs>(args: SelectSubset<T, WebsiteFindUniqueArgs<ExtArgs>>): Prisma__WebsiteClient<$Result.GetResult<Prisma.$WebsitePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Website that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {WebsiteFindUniqueOrThrowArgs} args - Arguments to find a Website
     * @example
     * // Get one Website
     * const website = await prisma.website.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WebsiteFindUniqueOrThrowArgs>(args: SelectSubset<T, WebsiteFindUniqueOrThrowArgs<ExtArgs>>): Prisma__WebsiteClient<$Result.GetResult<Prisma.$WebsitePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Website that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebsiteFindFirstArgs} args - Arguments to find a Website
     * @example
     * // Get one Website
     * const website = await prisma.website.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WebsiteFindFirstArgs>(args?: SelectSubset<T, WebsiteFindFirstArgs<ExtArgs>>): Prisma__WebsiteClient<$Result.GetResult<Prisma.$WebsitePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Website that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebsiteFindFirstOrThrowArgs} args - Arguments to find a Website
     * @example
     * // Get one Website
     * const website = await prisma.website.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WebsiteFindFirstOrThrowArgs>(args?: SelectSubset<T, WebsiteFindFirstOrThrowArgs<ExtArgs>>): Prisma__WebsiteClient<$Result.GetResult<Prisma.$WebsitePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Websites that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebsiteFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Websites
     * const websites = await prisma.website.findMany()
     * 
     * // Get first 10 Websites
     * const websites = await prisma.website.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const websiteWithIdOnly = await prisma.website.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends WebsiteFindManyArgs>(args?: SelectSubset<T, WebsiteFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WebsitePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Website.
     * @param {WebsiteCreateArgs} args - Arguments to create a Website.
     * @example
     * // Create one Website
     * const Website = await prisma.website.create({
     *   data: {
     *     // ... data to create a Website
     *   }
     * })
     * 
     */
    create<T extends WebsiteCreateArgs>(args: SelectSubset<T, WebsiteCreateArgs<ExtArgs>>): Prisma__WebsiteClient<$Result.GetResult<Prisma.$WebsitePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Websites.
     * @param {WebsiteCreateManyArgs} args - Arguments to create many Websites.
     * @example
     * // Create many Websites
     * const website = await prisma.website.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends WebsiteCreateManyArgs>(args?: SelectSubset<T, WebsiteCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Websites and returns the data saved in the database.
     * @param {WebsiteCreateManyAndReturnArgs} args - Arguments to create many Websites.
     * @example
     * // Create many Websites
     * const website = await prisma.website.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Websites and only return the `id`
     * const websiteWithIdOnly = await prisma.website.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends WebsiteCreateManyAndReturnArgs>(args?: SelectSubset<T, WebsiteCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WebsitePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Website.
     * @param {WebsiteDeleteArgs} args - Arguments to delete one Website.
     * @example
     * // Delete one Website
     * const Website = await prisma.website.delete({
     *   where: {
     *     // ... filter to delete one Website
     *   }
     * })
     * 
     */
    delete<T extends WebsiteDeleteArgs>(args: SelectSubset<T, WebsiteDeleteArgs<ExtArgs>>): Prisma__WebsiteClient<$Result.GetResult<Prisma.$WebsitePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Website.
     * @param {WebsiteUpdateArgs} args - Arguments to update one Website.
     * @example
     * // Update one Website
     * const website = await prisma.website.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends WebsiteUpdateArgs>(args: SelectSubset<T, WebsiteUpdateArgs<ExtArgs>>): Prisma__WebsiteClient<$Result.GetResult<Prisma.$WebsitePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Websites.
     * @param {WebsiteDeleteManyArgs} args - Arguments to filter Websites to delete.
     * @example
     * // Delete a few Websites
     * const { count } = await prisma.website.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends WebsiteDeleteManyArgs>(args?: SelectSubset<T, WebsiteDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Websites.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebsiteUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Websites
     * const website = await prisma.website.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends WebsiteUpdateManyArgs>(args: SelectSubset<T, WebsiteUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Websites and returns the data updated in the database.
     * @param {WebsiteUpdateManyAndReturnArgs} args - Arguments to update many Websites.
     * @example
     * // Update many Websites
     * const website = await prisma.website.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Websites and only return the `id`
     * const websiteWithIdOnly = await prisma.website.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends WebsiteUpdateManyAndReturnArgs>(args: SelectSubset<T, WebsiteUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WebsitePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Website.
     * @param {WebsiteUpsertArgs} args - Arguments to update or create a Website.
     * @example
     * // Update or create a Website
     * const website = await prisma.website.upsert({
     *   create: {
     *     // ... data to create a Website
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Website we want to update
     *   }
     * })
     */
    upsert<T extends WebsiteUpsertArgs>(args: SelectSubset<T, WebsiteUpsertArgs<ExtArgs>>): Prisma__WebsiteClient<$Result.GetResult<Prisma.$WebsitePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Websites.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebsiteCountArgs} args - Arguments to filter Websites to count.
     * @example
     * // Count the number of Websites
     * const count = await prisma.website.count({
     *   where: {
     *     // ... the filter for the Websites we want to count
     *   }
     * })
    **/
    count<T extends WebsiteCountArgs>(
      args?: Subset<T, WebsiteCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WebsiteCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Website.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebsiteAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends WebsiteAggregateArgs>(args: Subset<T, WebsiteAggregateArgs>): Prisma.PrismaPromise<GetWebsiteAggregateType<T>>

    /**
     * Group by Website.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebsiteGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends WebsiteGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WebsiteGroupByArgs['orderBy'] }
        : { orderBy?: WebsiteGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, WebsiteGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWebsiteGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Website model
   */
  readonly fields: WebsiteFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Website.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WebsiteClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Website model
   */
  interface WebsiteFieldRefs {
    readonly id: FieldRef<"Website", 'String'>
    readonly name: FieldRef<"Website", 'String'>
    readonly url: FieldRef<"Website", 'String'>
    readonly category: FieldRef<"Website", 'String'>
    readonly description: FieldRef<"Website", 'String'>
    readonly sortOrder: FieldRef<"Website", 'Int'>
    readonly status: FieldRef<"Website", 'WebsiteStatus'>
    readonly createdAt: FieldRef<"Website", 'DateTime'>
    readonly updatedAt: FieldRef<"Website", 'DateTime'>
    readonly publishedAt: FieldRef<"Website", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Website findUnique
   */
  export type WebsiteFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Website
     */
    select?: WebsiteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Website
     */
    omit?: WebsiteOmit<ExtArgs> | null
    /**
     * Filter, which Website to fetch.
     */
    where: WebsiteWhereUniqueInput
  }

  /**
   * Website findUniqueOrThrow
   */
  export type WebsiteFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Website
     */
    select?: WebsiteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Website
     */
    omit?: WebsiteOmit<ExtArgs> | null
    /**
     * Filter, which Website to fetch.
     */
    where: WebsiteWhereUniqueInput
  }

  /**
   * Website findFirst
   */
  export type WebsiteFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Website
     */
    select?: WebsiteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Website
     */
    omit?: WebsiteOmit<ExtArgs> | null
    /**
     * Filter, which Website to fetch.
     */
    where?: WebsiteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Websites to fetch.
     */
    orderBy?: WebsiteOrderByWithRelationInput | WebsiteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Websites.
     */
    cursor?: WebsiteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Websites from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Websites.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Websites.
     */
    distinct?: WebsiteScalarFieldEnum | WebsiteScalarFieldEnum[]
  }

  /**
   * Website findFirstOrThrow
   */
  export type WebsiteFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Website
     */
    select?: WebsiteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Website
     */
    omit?: WebsiteOmit<ExtArgs> | null
    /**
     * Filter, which Website to fetch.
     */
    where?: WebsiteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Websites to fetch.
     */
    orderBy?: WebsiteOrderByWithRelationInput | WebsiteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Websites.
     */
    cursor?: WebsiteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Websites from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Websites.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Websites.
     */
    distinct?: WebsiteScalarFieldEnum | WebsiteScalarFieldEnum[]
  }

  /**
   * Website findMany
   */
  export type WebsiteFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Website
     */
    select?: WebsiteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Website
     */
    omit?: WebsiteOmit<ExtArgs> | null
    /**
     * Filter, which Websites to fetch.
     */
    where?: WebsiteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Websites to fetch.
     */
    orderBy?: WebsiteOrderByWithRelationInput | WebsiteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Websites.
     */
    cursor?: WebsiteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Websites from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Websites.
     */
    skip?: number
    distinct?: WebsiteScalarFieldEnum | WebsiteScalarFieldEnum[]
  }

  /**
   * Website create
   */
  export type WebsiteCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Website
     */
    select?: WebsiteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Website
     */
    omit?: WebsiteOmit<ExtArgs> | null
    /**
     * The data needed to create a Website.
     */
    data: XOR<WebsiteCreateInput, WebsiteUncheckedCreateInput>
  }

  /**
   * Website createMany
   */
  export type WebsiteCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Websites.
     */
    data: WebsiteCreateManyInput | WebsiteCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Website createManyAndReturn
   */
  export type WebsiteCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Website
     */
    select?: WebsiteSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Website
     */
    omit?: WebsiteOmit<ExtArgs> | null
    /**
     * The data used to create many Websites.
     */
    data: WebsiteCreateManyInput | WebsiteCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Website update
   */
  export type WebsiteUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Website
     */
    select?: WebsiteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Website
     */
    omit?: WebsiteOmit<ExtArgs> | null
    /**
     * The data needed to update a Website.
     */
    data: XOR<WebsiteUpdateInput, WebsiteUncheckedUpdateInput>
    /**
     * Choose, which Website to update.
     */
    where: WebsiteWhereUniqueInput
  }

  /**
   * Website updateMany
   */
  export type WebsiteUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Websites.
     */
    data: XOR<WebsiteUpdateManyMutationInput, WebsiteUncheckedUpdateManyInput>
    /**
     * Filter which Websites to update
     */
    where?: WebsiteWhereInput
    /**
     * Limit how many Websites to update.
     */
    limit?: number
  }

  /**
   * Website updateManyAndReturn
   */
  export type WebsiteUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Website
     */
    select?: WebsiteSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Website
     */
    omit?: WebsiteOmit<ExtArgs> | null
    /**
     * The data used to update Websites.
     */
    data: XOR<WebsiteUpdateManyMutationInput, WebsiteUncheckedUpdateManyInput>
    /**
     * Filter which Websites to update
     */
    where?: WebsiteWhereInput
    /**
     * Limit how many Websites to update.
     */
    limit?: number
  }

  /**
   * Website upsert
   */
  export type WebsiteUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Website
     */
    select?: WebsiteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Website
     */
    omit?: WebsiteOmit<ExtArgs> | null
    /**
     * The filter to search for the Website to update in case it exists.
     */
    where: WebsiteWhereUniqueInput
    /**
     * In case the Website found by the `where` argument doesn't exist, create a new Website with this data.
     */
    create: XOR<WebsiteCreateInput, WebsiteUncheckedCreateInput>
    /**
     * In case the Website was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WebsiteUpdateInput, WebsiteUncheckedUpdateInput>
  }

  /**
   * Website delete
   */
  export type WebsiteDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Website
     */
    select?: WebsiteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Website
     */
    omit?: WebsiteOmit<ExtArgs> | null
    /**
     * Filter which Website to delete.
     */
    where: WebsiteWhereUniqueInput
  }

  /**
   * Website deleteMany
   */
  export type WebsiteDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Websites to delete
     */
    where?: WebsiteWhereInput
    /**
     * Limit how many Websites to delete.
     */
    limit?: number
  }

  /**
   * Website without action
   */
  export type WebsiteDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Website
     */
    select?: WebsiteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Website
     */
    omit?: WebsiteOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const ProjectScalarFieldEnum: {
    id: 'id',
    slug: 'slug',
    status: 'status',
    featured: 'featured',
    year: 'year',
    coverImageUrl: 'coverImageUrl',
    galleryImageUrls: 'galleryImageUrls',
    liveUrl: 'liveUrl',
    repoUrl: 'repoUrl',
    techStack: 'techStack',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    publishedAt: 'publishedAt'
  };

  export type ProjectScalarFieldEnum = (typeof ProjectScalarFieldEnum)[keyof typeof ProjectScalarFieldEnum]


  export const ProjectTranslationScalarFieldEnum: {
    id: 'id',
    projectId: 'projectId',
    locale: 'locale',
    title: 'title',
    tagline: 'tagline',
    descriptionShort: 'descriptionShort',
    descriptionLong: 'descriptionLong',
    caseStudyBlocks: 'caseStudyBlocks',
    role: 'role',
    highlights: 'highlights',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ProjectTranslationScalarFieldEnum = (typeof ProjectTranslationScalarFieldEnum)[keyof typeof ProjectTranslationScalarFieldEnum]


  export const WebsiteScalarFieldEnum: {
    id: 'id',
    name: 'name',
    url: 'url',
    category: 'category',
    description: 'description',
    sortOrder: 'sortOrder',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    publishedAt: 'publishedAt'
  };

  export type WebsiteScalarFieldEnum = (typeof WebsiteScalarFieldEnum)[keyof typeof WebsiteScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'ProjectStatus'
   */
  export type EnumProjectStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ProjectStatus'>
    


  /**
   * Reference to a field of type 'ProjectStatus[]'
   */
  export type ListEnumProjectStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ProjectStatus[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Locale'
   */
  export type EnumLocaleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Locale'>
    


  /**
   * Reference to a field of type 'Locale[]'
   */
  export type ListEnumLocaleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Locale[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'WebsiteStatus'
   */
  export type EnumWebsiteStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'WebsiteStatus'>
    


  /**
   * Reference to a field of type 'WebsiteStatus[]'
   */
  export type ListEnumWebsiteStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'WebsiteStatus[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type ProjectWhereInput = {
    AND?: ProjectWhereInput | ProjectWhereInput[]
    OR?: ProjectWhereInput[]
    NOT?: ProjectWhereInput | ProjectWhereInput[]
    id?: StringFilter<"Project"> | string
    slug?: StringFilter<"Project"> | string
    status?: EnumProjectStatusFilter<"Project"> | $Enums.ProjectStatus
    featured?: BoolFilter<"Project"> | boolean
    year?: IntNullableFilter<"Project"> | number | null
    coverImageUrl?: StringNullableFilter<"Project"> | string | null
    galleryImageUrls?: StringNullableListFilter<"Project">
    liveUrl?: StringNullableFilter<"Project"> | string | null
    repoUrl?: StringNullableFilter<"Project"> | string | null
    techStack?: StringNullableListFilter<"Project">
    createdAt?: DateTimeFilter<"Project"> | Date | string
    updatedAt?: DateTimeFilter<"Project"> | Date | string
    publishedAt?: DateTimeNullableFilter<"Project"> | Date | string | null
    translations?: ProjectTranslationListRelationFilter
  }

  export type ProjectOrderByWithRelationInput = {
    id?: SortOrder
    slug?: SortOrder
    status?: SortOrder
    featured?: SortOrder
    year?: SortOrderInput | SortOrder
    coverImageUrl?: SortOrderInput | SortOrder
    galleryImageUrls?: SortOrder
    liveUrl?: SortOrderInput | SortOrder
    repoUrl?: SortOrderInput | SortOrder
    techStack?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    publishedAt?: SortOrderInput | SortOrder
    translations?: ProjectTranslationOrderByRelationAggregateInput
  }

  export type ProjectWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    slug?: string
    AND?: ProjectWhereInput | ProjectWhereInput[]
    OR?: ProjectWhereInput[]
    NOT?: ProjectWhereInput | ProjectWhereInput[]
    status?: EnumProjectStatusFilter<"Project"> | $Enums.ProjectStatus
    featured?: BoolFilter<"Project"> | boolean
    year?: IntNullableFilter<"Project"> | number | null
    coverImageUrl?: StringNullableFilter<"Project"> | string | null
    galleryImageUrls?: StringNullableListFilter<"Project">
    liveUrl?: StringNullableFilter<"Project"> | string | null
    repoUrl?: StringNullableFilter<"Project"> | string | null
    techStack?: StringNullableListFilter<"Project">
    createdAt?: DateTimeFilter<"Project"> | Date | string
    updatedAt?: DateTimeFilter<"Project"> | Date | string
    publishedAt?: DateTimeNullableFilter<"Project"> | Date | string | null
    translations?: ProjectTranslationListRelationFilter
  }, "id" | "slug">

  export type ProjectOrderByWithAggregationInput = {
    id?: SortOrder
    slug?: SortOrder
    status?: SortOrder
    featured?: SortOrder
    year?: SortOrderInput | SortOrder
    coverImageUrl?: SortOrderInput | SortOrder
    galleryImageUrls?: SortOrder
    liveUrl?: SortOrderInput | SortOrder
    repoUrl?: SortOrderInput | SortOrder
    techStack?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    publishedAt?: SortOrderInput | SortOrder
    _count?: ProjectCountOrderByAggregateInput
    _avg?: ProjectAvgOrderByAggregateInput
    _max?: ProjectMaxOrderByAggregateInput
    _min?: ProjectMinOrderByAggregateInput
    _sum?: ProjectSumOrderByAggregateInput
  }

  export type ProjectScalarWhereWithAggregatesInput = {
    AND?: ProjectScalarWhereWithAggregatesInput | ProjectScalarWhereWithAggregatesInput[]
    OR?: ProjectScalarWhereWithAggregatesInput[]
    NOT?: ProjectScalarWhereWithAggregatesInput | ProjectScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Project"> | string
    slug?: StringWithAggregatesFilter<"Project"> | string
    status?: EnumProjectStatusWithAggregatesFilter<"Project"> | $Enums.ProjectStatus
    featured?: BoolWithAggregatesFilter<"Project"> | boolean
    year?: IntNullableWithAggregatesFilter<"Project"> | number | null
    coverImageUrl?: StringNullableWithAggregatesFilter<"Project"> | string | null
    galleryImageUrls?: StringNullableListFilter<"Project">
    liveUrl?: StringNullableWithAggregatesFilter<"Project"> | string | null
    repoUrl?: StringNullableWithAggregatesFilter<"Project"> | string | null
    techStack?: StringNullableListFilter<"Project">
    createdAt?: DateTimeWithAggregatesFilter<"Project"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Project"> | Date | string
    publishedAt?: DateTimeNullableWithAggregatesFilter<"Project"> | Date | string | null
  }

  export type ProjectTranslationWhereInput = {
    AND?: ProjectTranslationWhereInput | ProjectTranslationWhereInput[]
    OR?: ProjectTranslationWhereInput[]
    NOT?: ProjectTranslationWhereInput | ProjectTranslationWhereInput[]
    id?: StringFilter<"ProjectTranslation"> | string
    projectId?: StringFilter<"ProjectTranslation"> | string
    locale?: EnumLocaleFilter<"ProjectTranslation"> | $Enums.Locale
    title?: StringFilter<"ProjectTranslation"> | string
    tagline?: StringNullableFilter<"ProjectTranslation"> | string | null
    descriptionShort?: StringNullableFilter<"ProjectTranslation"> | string | null
    descriptionLong?: StringNullableFilter<"ProjectTranslation"> | string | null
    caseStudyBlocks?: JsonFilter<"ProjectTranslation">
    role?: StringNullableFilter<"ProjectTranslation"> | string | null
    highlights?: StringNullableListFilter<"ProjectTranslation">
    createdAt?: DateTimeFilter<"ProjectTranslation"> | Date | string
    updatedAt?: DateTimeFilter<"ProjectTranslation"> | Date | string
    project?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
  }

  export type ProjectTranslationOrderByWithRelationInput = {
    id?: SortOrder
    projectId?: SortOrder
    locale?: SortOrder
    title?: SortOrder
    tagline?: SortOrderInput | SortOrder
    descriptionShort?: SortOrderInput | SortOrder
    descriptionLong?: SortOrderInput | SortOrder
    caseStudyBlocks?: SortOrder
    role?: SortOrderInput | SortOrder
    highlights?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    project?: ProjectOrderByWithRelationInput
  }

  export type ProjectTranslationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    projectId_locale?: ProjectTranslationProjectIdLocaleCompoundUniqueInput
    AND?: ProjectTranslationWhereInput | ProjectTranslationWhereInput[]
    OR?: ProjectTranslationWhereInput[]
    NOT?: ProjectTranslationWhereInput | ProjectTranslationWhereInput[]
    projectId?: StringFilter<"ProjectTranslation"> | string
    locale?: EnumLocaleFilter<"ProjectTranslation"> | $Enums.Locale
    title?: StringFilter<"ProjectTranslation"> | string
    tagline?: StringNullableFilter<"ProjectTranslation"> | string | null
    descriptionShort?: StringNullableFilter<"ProjectTranslation"> | string | null
    descriptionLong?: StringNullableFilter<"ProjectTranslation"> | string | null
    caseStudyBlocks?: JsonFilter<"ProjectTranslation">
    role?: StringNullableFilter<"ProjectTranslation"> | string | null
    highlights?: StringNullableListFilter<"ProjectTranslation">
    createdAt?: DateTimeFilter<"ProjectTranslation"> | Date | string
    updatedAt?: DateTimeFilter<"ProjectTranslation"> | Date | string
    project?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
  }, "id" | "projectId_locale">

  export type ProjectTranslationOrderByWithAggregationInput = {
    id?: SortOrder
    projectId?: SortOrder
    locale?: SortOrder
    title?: SortOrder
    tagline?: SortOrderInput | SortOrder
    descriptionShort?: SortOrderInput | SortOrder
    descriptionLong?: SortOrderInput | SortOrder
    caseStudyBlocks?: SortOrder
    role?: SortOrderInput | SortOrder
    highlights?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ProjectTranslationCountOrderByAggregateInput
    _max?: ProjectTranslationMaxOrderByAggregateInput
    _min?: ProjectTranslationMinOrderByAggregateInput
  }

  export type ProjectTranslationScalarWhereWithAggregatesInput = {
    AND?: ProjectTranslationScalarWhereWithAggregatesInput | ProjectTranslationScalarWhereWithAggregatesInput[]
    OR?: ProjectTranslationScalarWhereWithAggregatesInput[]
    NOT?: ProjectTranslationScalarWhereWithAggregatesInput | ProjectTranslationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ProjectTranslation"> | string
    projectId?: StringWithAggregatesFilter<"ProjectTranslation"> | string
    locale?: EnumLocaleWithAggregatesFilter<"ProjectTranslation"> | $Enums.Locale
    title?: StringWithAggregatesFilter<"ProjectTranslation"> | string
    tagline?: StringNullableWithAggregatesFilter<"ProjectTranslation"> | string | null
    descriptionShort?: StringNullableWithAggregatesFilter<"ProjectTranslation"> | string | null
    descriptionLong?: StringNullableWithAggregatesFilter<"ProjectTranslation"> | string | null
    caseStudyBlocks?: JsonWithAggregatesFilter<"ProjectTranslation">
    role?: StringNullableWithAggregatesFilter<"ProjectTranslation"> | string | null
    highlights?: StringNullableListFilter<"ProjectTranslation">
    createdAt?: DateTimeWithAggregatesFilter<"ProjectTranslation"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ProjectTranslation"> | Date | string
  }

  export type WebsiteWhereInput = {
    AND?: WebsiteWhereInput | WebsiteWhereInput[]
    OR?: WebsiteWhereInput[]
    NOT?: WebsiteWhereInput | WebsiteWhereInput[]
    id?: StringFilter<"Website"> | string
    name?: StringFilter<"Website"> | string
    url?: StringFilter<"Website"> | string
    category?: StringFilter<"Website"> | string
    description?: StringNullableFilter<"Website"> | string | null
    sortOrder?: IntFilter<"Website"> | number
    status?: EnumWebsiteStatusFilter<"Website"> | $Enums.WebsiteStatus
    createdAt?: DateTimeFilter<"Website"> | Date | string
    updatedAt?: DateTimeFilter<"Website"> | Date | string
    publishedAt?: DateTimeNullableFilter<"Website"> | Date | string | null
  }

  export type WebsiteOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    url?: SortOrder
    category?: SortOrder
    description?: SortOrderInput | SortOrder
    sortOrder?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    publishedAt?: SortOrderInput | SortOrder
  }

  export type WebsiteWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: WebsiteWhereInput | WebsiteWhereInput[]
    OR?: WebsiteWhereInput[]
    NOT?: WebsiteWhereInput | WebsiteWhereInput[]
    name?: StringFilter<"Website"> | string
    url?: StringFilter<"Website"> | string
    category?: StringFilter<"Website"> | string
    description?: StringNullableFilter<"Website"> | string | null
    sortOrder?: IntFilter<"Website"> | number
    status?: EnumWebsiteStatusFilter<"Website"> | $Enums.WebsiteStatus
    createdAt?: DateTimeFilter<"Website"> | Date | string
    updatedAt?: DateTimeFilter<"Website"> | Date | string
    publishedAt?: DateTimeNullableFilter<"Website"> | Date | string | null
  }, "id">

  export type WebsiteOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    url?: SortOrder
    category?: SortOrder
    description?: SortOrderInput | SortOrder
    sortOrder?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    publishedAt?: SortOrderInput | SortOrder
    _count?: WebsiteCountOrderByAggregateInput
    _avg?: WebsiteAvgOrderByAggregateInput
    _max?: WebsiteMaxOrderByAggregateInput
    _min?: WebsiteMinOrderByAggregateInput
    _sum?: WebsiteSumOrderByAggregateInput
  }

  export type WebsiteScalarWhereWithAggregatesInput = {
    AND?: WebsiteScalarWhereWithAggregatesInput | WebsiteScalarWhereWithAggregatesInput[]
    OR?: WebsiteScalarWhereWithAggregatesInput[]
    NOT?: WebsiteScalarWhereWithAggregatesInput | WebsiteScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Website"> | string
    name?: StringWithAggregatesFilter<"Website"> | string
    url?: StringWithAggregatesFilter<"Website"> | string
    category?: StringWithAggregatesFilter<"Website"> | string
    description?: StringNullableWithAggregatesFilter<"Website"> | string | null
    sortOrder?: IntWithAggregatesFilter<"Website"> | number
    status?: EnumWebsiteStatusWithAggregatesFilter<"Website"> | $Enums.WebsiteStatus
    createdAt?: DateTimeWithAggregatesFilter<"Website"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Website"> | Date | string
    publishedAt?: DateTimeNullableWithAggregatesFilter<"Website"> | Date | string | null
  }

  export type ProjectCreateInput = {
    id?: string
    slug: string
    status?: $Enums.ProjectStatus
    featured?: boolean
    year?: number | null
    coverImageUrl?: string | null
    galleryImageUrls?: ProjectCreategalleryImageUrlsInput | string[]
    liveUrl?: string | null
    repoUrl?: string | null
    techStack?: ProjectCreatetechStackInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    publishedAt?: Date | string | null
    translations?: ProjectTranslationCreateNestedManyWithoutProjectInput
  }

  export type ProjectUncheckedCreateInput = {
    id?: string
    slug: string
    status?: $Enums.ProjectStatus
    featured?: boolean
    year?: number | null
    coverImageUrl?: string | null
    galleryImageUrls?: ProjectCreategalleryImageUrlsInput | string[]
    liveUrl?: string | null
    repoUrl?: string | null
    techStack?: ProjectCreatetechStackInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    publishedAt?: Date | string | null
    translations?: ProjectTranslationUncheckedCreateNestedManyWithoutProjectInput
  }

  export type ProjectUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    status?: EnumProjectStatusFieldUpdateOperationsInput | $Enums.ProjectStatus
    featured?: BoolFieldUpdateOperationsInput | boolean
    year?: NullableIntFieldUpdateOperationsInput | number | null
    coverImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    galleryImageUrls?: ProjectUpdategalleryImageUrlsInput | string[]
    liveUrl?: NullableStringFieldUpdateOperationsInput | string | null
    repoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    techStack?: ProjectUpdatetechStackInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    translations?: ProjectTranslationUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    status?: EnumProjectStatusFieldUpdateOperationsInput | $Enums.ProjectStatus
    featured?: BoolFieldUpdateOperationsInput | boolean
    year?: NullableIntFieldUpdateOperationsInput | number | null
    coverImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    galleryImageUrls?: ProjectUpdategalleryImageUrlsInput | string[]
    liveUrl?: NullableStringFieldUpdateOperationsInput | string | null
    repoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    techStack?: ProjectUpdatetechStackInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    translations?: ProjectTranslationUncheckedUpdateManyWithoutProjectNestedInput
  }

  export type ProjectCreateManyInput = {
    id?: string
    slug: string
    status?: $Enums.ProjectStatus
    featured?: boolean
    year?: number | null
    coverImageUrl?: string | null
    galleryImageUrls?: ProjectCreategalleryImageUrlsInput | string[]
    liveUrl?: string | null
    repoUrl?: string | null
    techStack?: ProjectCreatetechStackInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    publishedAt?: Date | string | null
  }

  export type ProjectUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    status?: EnumProjectStatusFieldUpdateOperationsInput | $Enums.ProjectStatus
    featured?: BoolFieldUpdateOperationsInput | boolean
    year?: NullableIntFieldUpdateOperationsInput | number | null
    coverImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    galleryImageUrls?: ProjectUpdategalleryImageUrlsInput | string[]
    liveUrl?: NullableStringFieldUpdateOperationsInput | string | null
    repoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    techStack?: ProjectUpdatetechStackInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ProjectUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    status?: EnumProjectStatusFieldUpdateOperationsInput | $Enums.ProjectStatus
    featured?: BoolFieldUpdateOperationsInput | boolean
    year?: NullableIntFieldUpdateOperationsInput | number | null
    coverImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    galleryImageUrls?: ProjectUpdategalleryImageUrlsInput | string[]
    liveUrl?: NullableStringFieldUpdateOperationsInput | string | null
    repoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    techStack?: ProjectUpdatetechStackInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ProjectTranslationCreateInput = {
    id?: string
    locale: $Enums.Locale
    title: string
    tagline?: string | null
    descriptionShort?: string | null
    descriptionLong?: string | null
    caseStudyBlocks?: JsonNullValueInput | InputJsonValue
    role?: string | null
    highlights?: ProjectTranslationCreatehighlightsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    project: ProjectCreateNestedOneWithoutTranslationsInput
  }

  export type ProjectTranslationUncheckedCreateInput = {
    id?: string
    projectId: string
    locale: $Enums.Locale
    title: string
    tagline?: string | null
    descriptionShort?: string | null
    descriptionLong?: string | null
    caseStudyBlocks?: JsonNullValueInput | InputJsonValue
    role?: string | null
    highlights?: ProjectTranslationCreatehighlightsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProjectTranslationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    locale?: EnumLocaleFieldUpdateOperationsInput | $Enums.Locale
    title?: StringFieldUpdateOperationsInput | string
    tagline?: NullableStringFieldUpdateOperationsInput | string | null
    descriptionShort?: NullableStringFieldUpdateOperationsInput | string | null
    descriptionLong?: NullableStringFieldUpdateOperationsInput | string | null
    caseStudyBlocks?: JsonNullValueInput | InputJsonValue
    role?: NullableStringFieldUpdateOperationsInput | string | null
    highlights?: ProjectTranslationUpdatehighlightsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    project?: ProjectUpdateOneRequiredWithoutTranslationsNestedInput
  }

  export type ProjectTranslationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    locale?: EnumLocaleFieldUpdateOperationsInput | $Enums.Locale
    title?: StringFieldUpdateOperationsInput | string
    tagline?: NullableStringFieldUpdateOperationsInput | string | null
    descriptionShort?: NullableStringFieldUpdateOperationsInput | string | null
    descriptionLong?: NullableStringFieldUpdateOperationsInput | string | null
    caseStudyBlocks?: JsonNullValueInput | InputJsonValue
    role?: NullableStringFieldUpdateOperationsInput | string | null
    highlights?: ProjectTranslationUpdatehighlightsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectTranslationCreateManyInput = {
    id?: string
    projectId: string
    locale: $Enums.Locale
    title: string
    tagline?: string | null
    descriptionShort?: string | null
    descriptionLong?: string | null
    caseStudyBlocks?: JsonNullValueInput | InputJsonValue
    role?: string | null
    highlights?: ProjectTranslationCreatehighlightsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProjectTranslationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    locale?: EnumLocaleFieldUpdateOperationsInput | $Enums.Locale
    title?: StringFieldUpdateOperationsInput | string
    tagline?: NullableStringFieldUpdateOperationsInput | string | null
    descriptionShort?: NullableStringFieldUpdateOperationsInput | string | null
    descriptionLong?: NullableStringFieldUpdateOperationsInput | string | null
    caseStudyBlocks?: JsonNullValueInput | InputJsonValue
    role?: NullableStringFieldUpdateOperationsInput | string | null
    highlights?: ProjectTranslationUpdatehighlightsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectTranslationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    locale?: EnumLocaleFieldUpdateOperationsInput | $Enums.Locale
    title?: StringFieldUpdateOperationsInput | string
    tagline?: NullableStringFieldUpdateOperationsInput | string | null
    descriptionShort?: NullableStringFieldUpdateOperationsInput | string | null
    descriptionLong?: NullableStringFieldUpdateOperationsInput | string | null
    caseStudyBlocks?: JsonNullValueInput | InputJsonValue
    role?: NullableStringFieldUpdateOperationsInput | string | null
    highlights?: ProjectTranslationUpdatehighlightsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WebsiteCreateInput = {
    id?: string
    name: string
    url: string
    category: string
    description?: string | null
    sortOrder?: number
    status?: $Enums.WebsiteStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    publishedAt?: Date | string | null
  }

  export type WebsiteUncheckedCreateInput = {
    id?: string
    name: string
    url: string
    category: string
    description?: string | null
    sortOrder?: number
    status?: $Enums.WebsiteStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    publishedAt?: Date | string | null
  }

  export type WebsiteUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    sortOrder?: IntFieldUpdateOperationsInput | number
    status?: EnumWebsiteStatusFieldUpdateOperationsInput | $Enums.WebsiteStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type WebsiteUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    sortOrder?: IntFieldUpdateOperationsInput | number
    status?: EnumWebsiteStatusFieldUpdateOperationsInput | $Enums.WebsiteStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type WebsiteCreateManyInput = {
    id?: string
    name: string
    url: string
    category: string
    description?: string | null
    sortOrder?: number
    status?: $Enums.WebsiteStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    publishedAt?: Date | string | null
  }

  export type WebsiteUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    sortOrder?: IntFieldUpdateOperationsInput | number
    status?: EnumWebsiteStatusFieldUpdateOperationsInput | $Enums.WebsiteStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type WebsiteUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    sortOrder?: IntFieldUpdateOperationsInput | number
    status?: EnumWebsiteStatusFieldUpdateOperationsInput | $Enums.WebsiteStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type EnumProjectStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ProjectStatus | EnumProjectStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ProjectStatus[] | ListEnumProjectStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ProjectStatus[] | ListEnumProjectStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumProjectStatusFilter<$PrismaModel> | $Enums.ProjectStatus
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type ProjectTranslationListRelationFilter = {
    every?: ProjectTranslationWhereInput
    some?: ProjectTranslationWhereInput
    none?: ProjectTranslationWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ProjectTranslationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProjectCountOrderByAggregateInput = {
    id?: SortOrder
    slug?: SortOrder
    status?: SortOrder
    featured?: SortOrder
    year?: SortOrder
    coverImageUrl?: SortOrder
    galleryImageUrls?: SortOrder
    liveUrl?: SortOrder
    repoUrl?: SortOrder
    techStack?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    publishedAt?: SortOrder
  }

  export type ProjectAvgOrderByAggregateInput = {
    year?: SortOrder
  }

  export type ProjectMaxOrderByAggregateInput = {
    id?: SortOrder
    slug?: SortOrder
    status?: SortOrder
    featured?: SortOrder
    year?: SortOrder
    coverImageUrl?: SortOrder
    liveUrl?: SortOrder
    repoUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    publishedAt?: SortOrder
  }

  export type ProjectMinOrderByAggregateInput = {
    id?: SortOrder
    slug?: SortOrder
    status?: SortOrder
    featured?: SortOrder
    year?: SortOrder
    coverImageUrl?: SortOrder
    liveUrl?: SortOrder
    repoUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    publishedAt?: SortOrder
  }

  export type ProjectSumOrderByAggregateInput = {
    year?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type EnumProjectStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ProjectStatus | EnumProjectStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ProjectStatus[] | ListEnumProjectStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ProjectStatus[] | ListEnumProjectStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumProjectStatusWithAggregatesFilter<$PrismaModel> | $Enums.ProjectStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumProjectStatusFilter<$PrismaModel>
    _max?: NestedEnumProjectStatusFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type EnumLocaleFilter<$PrismaModel = never> = {
    equals?: $Enums.Locale | EnumLocaleFieldRefInput<$PrismaModel>
    in?: $Enums.Locale[] | ListEnumLocaleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Locale[] | ListEnumLocaleFieldRefInput<$PrismaModel>
    not?: NestedEnumLocaleFilter<$PrismaModel> | $Enums.Locale
  }
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type ProjectScalarRelationFilter = {
    is?: ProjectWhereInput
    isNot?: ProjectWhereInput
  }

  export type ProjectTranslationProjectIdLocaleCompoundUniqueInput = {
    projectId: string
    locale: $Enums.Locale
  }

  export type ProjectTranslationCountOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    locale?: SortOrder
    title?: SortOrder
    tagline?: SortOrder
    descriptionShort?: SortOrder
    descriptionLong?: SortOrder
    caseStudyBlocks?: SortOrder
    role?: SortOrder
    highlights?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProjectTranslationMaxOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    locale?: SortOrder
    title?: SortOrder
    tagline?: SortOrder
    descriptionShort?: SortOrder
    descriptionLong?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProjectTranslationMinOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    locale?: SortOrder
    title?: SortOrder
    tagline?: SortOrder
    descriptionShort?: SortOrder
    descriptionLong?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumLocaleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Locale | EnumLocaleFieldRefInput<$PrismaModel>
    in?: $Enums.Locale[] | ListEnumLocaleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Locale[] | ListEnumLocaleFieldRefInput<$PrismaModel>
    not?: NestedEnumLocaleWithAggregatesFilter<$PrismaModel> | $Enums.Locale
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumLocaleFilter<$PrismaModel>
    _max?: NestedEnumLocaleFilter<$PrismaModel>
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type EnumWebsiteStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.WebsiteStatus | EnumWebsiteStatusFieldRefInput<$PrismaModel>
    in?: $Enums.WebsiteStatus[] | ListEnumWebsiteStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.WebsiteStatus[] | ListEnumWebsiteStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumWebsiteStatusFilter<$PrismaModel> | $Enums.WebsiteStatus
  }

  export type WebsiteCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    url?: SortOrder
    category?: SortOrder
    description?: SortOrder
    sortOrder?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    publishedAt?: SortOrder
  }

  export type WebsiteAvgOrderByAggregateInput = {
    sortOrder?: SortOrder
  }

  export type WebsiteMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    url?: SortOrder
    category?: SortOrder
    description?: SortOrder
    sortOrder?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    publishedAt?: SortOrder
  }

  export type WebsiteMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    url?: SortOrder
    category?: SortOrder
    description?: SortOrder
    sortOrder?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    publishedAt?: SortOrder
  }

  export type WebsiteSumOrderByAggregateInput = {
    sortOrder?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type EnumWebsiteStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.WebsiteStatus | EnumWebsiteStatusFieldRefInput<$PrismaModel>
    in?: $Enums.WebsiteStatus[] | ListEnumWebsiteStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.WebsiteStatus[] | ListEnumWebsiteStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumWebsiteStatusWithAggregatesFilter<$PrismaModel> | $Enums.WebsiteStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumWebsiteStatusFilter<$PrismaModel>
    _max?: NestedEnumWebsiteStatusFilter<$PrismaModel>
  }

  export type ProjectCreategalleryImageUrlsInput = {
    set: string[]
  }

  export type ProjectCreatetechStackInput = {
    set: string[]
  }

  export type ProjectTranslationCreateNestedManyWithoutProjectInput = {
    create?: XOR<ProjectTranslationCreateWithoutProjectInput, ProjectTranslationUncheckedCreateWithoutProjectInput> | ProjectTranslationCreateWithoutProjectInput[] | ProjectTranslationUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: ProjectTranslationCreateOrConnectWithoutProjectInput | ProjectTranslationCreateOrConnectWithoutProjectInput[]
    createMany?: ProjectTranslationCreateManyProjectInputEnvelope
    connect?: ProjectTranslationWhereUniqueInput | ProjectTranslationWhereUniqueInput[]
  }

  export type ProjectTranslationUncheckedCreateNestedManyWithoutProjectInput = {
    create?: XOR<ProjectTranslationCreateWithoutProjectInput, ProjectTranslationUncheckedCreateWithoutProjectInput> | ProjectTranslationCreateWithoutProjectInput[] | ProjectTranslationUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: ProjectTranslationCreateOrConnectWithoutProjectInput | ProjectTranslationCreateOrConnectWithoutProjectInput[]
    createMany?: ProjectTranslationCreateManyProjectInputEnvelope
    connect?: ProjectTranslationWhereUniqueInput | ProjectTranslationWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumProjectStatusFieldUpdateOperationsInput = {
    set?: $Enums.ProjectStatus
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type ProjectUpdategalleryImageUrlsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type ProjectUpdatetechStackInput = {
    set?: string[]
    push?: string | string[]
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type ProjectTranslationUpdateManyWithoutProjectNestedInput = {
    create?: XOR<ProjectTranslationCreateWithoutProjectInput, ProjectTranslationUncheckedCreateWithoutProjectInput> | ProjectTranslationCreateWithoutProjectInput[] | ProjectTranslationUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: ProjectTranslationCreateOrConnectWithoutProjectInput | ProjectTranslationCreateOrConnectWithoutProjectInput[]
    upsert?: ProjectTranslationUpsertWithWhereUniqueWithoutProjectInput | ProjectTranslationUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: ProjectTranslationCreateManyProjectInputEnvelope
    set?: ProjectTranslationWhereUniqueInput | ProjectTranslationWhereUniqueInput[]
    disconnect?: ProjectTranslationWhereUniqueInput | ProjectTranslationWhereUniqueInput[]
    delete?: ProjectTranslationWhereUniqueInput | ProjectTranslationWhereUniqueInput[]
    connect?: ProjectTranslationWhereUniqueInput | ProjectTranslationWhereUniqueInput[]
    update?: ProjectTranslationUpdateWithWhereUniqueWithoutProjectInput | ProjectTranslationUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: ProjectTranslationUpdateManyWithWhereWithoutProjectInput | ProjectTranslationUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: ProjectTranslationScalarWhereInput | ProjectTranslationScalarWhereInput[]
  }

  export type ProjectTranslationUncheckedUpdateManyWithoutProjectNestedInput = {
    create?: XOR<ProjectTranslationCreateWithoutProjectInput, ProjectTranslationUncheckedCreateWithoutProjectInput> | ProjectTranslationCreateWithoutProjectInput[] | ProjectTranslationUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: ProjectTranslationCreateOrConnectWithoutProjectInput | ProjectTranslationCreateOrConnectWithoutProjectInput[]
    upsert?: ProjectTranslationUpsertWithWhereUniqueWithoutProjectInput | ProjectTranslationUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: ProjectTranslationCreateManyProjectInputEnvelope
    set?: ProjectTranslationWhereUniqueInput | ProjectTranslationWhereUniqueInput[]
    disconnect?: ProjectTranslationWhereUniqueInput | ProjectTranslationWhereUniqueInput[]
    delete?: ProjectTranslationWhereUniqueInput | ProjectTranslationWhereUniqueInput[]
    connect?: ProjectTranslationWhereUniqueInput | ProjectTranslationWhereUniqueInput[]
    update?: ProjectTranslationUpdateWithWhereUniqueWithoutProjectInput | ProjectTranslationUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: ProjectTranslationUpdateManyWithWhereWithoutProjectInput | ProjectTranslationUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: ProjectTranslationScalarWhereInput | ProjectTranslationScalarWhereInput[]
  }

  export type ProjectTranslationCreatehighlightsInput = {
    set: string[]
  }

  export type ProjectCreateNestedOneWithoutTranslationsInput = {
    create?: XOR<ProjectCreateWithoutTranslationsInput, ProjectUncheckedCreateWithoutTranslationsInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutTranslationsInput
    connect?: ProjectWhereUniqueInput
  }

  export type EnumLocaleFieldUpdateOperationsInput = {
    set?: $Enums.Locale
  }

  export type ProjectTranslationUpdatehighlightsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type ProjectUpdateOneRequiredWithoutTranslationsNestedInput = {
    create?: XOR<ProjectCreateWithoutTranslationsInput, ProjectUncheckedCreateWithoutTranslationsInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutTranslationsInput
    upsert?: ProjectUpsertWithoutTranslationsInput
    connect?: ProjectWhereUniqueInput
    update?: XOR<XOR<ProjectUpdateToOneWithWhereWithoutTranslationsInput, ProjectUpdateWithoutTranslationsInput>, ProjectUncheckedUpdateWithoutTranslationsInput>
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EnumWebsiteStatusFieldUpdateOperationsInput = {
    set?: $Enums.WebsiteStatus
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedEnumProjectStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ProjectStatus | EnumProjectStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ProjectStatus[] | ListEnumProjectStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ProjectStatus[] | ListEnumProjectStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumProjectStatusFilter<$PrismaModel> | $Enums.ProjectStatus
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedEnumProjectStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ProjectStatus | EnumProjectStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ProjectStatus[] | ListEnumProjectStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ProjectStatus[] | ListEnumProjectStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumProjectStatusWithAggregatesFilter<$PrismaModel> | $Enums.ProjectStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumProjectStatusFilter<$PrismaModel>
    _max?: NestedEnumProjectStatusFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedEnumLocaleFilter<$PrismaModel = never> = {
    equals?: $Enums.Locale | EnumLocaleFieldRefInput<$PrismaModel>
    in?: $Enums.Locale[] | ListEnumLocaleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Locale[] | ListEnumLocaleFieldRefInput<$PrismaModel>
    not?: NestedEnumLocaleFilter<$PrismaModel> | $Enums.Locale
  }

  export type NestedEnumLocaleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Locale | EnumLocaleFieldRefInput<$PrismaModel>
    in?: $Enums.Locale[] | ListEnumLocaleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Locale[] | ListEnumLocaleFieldRefInput<$PrismaModel>
    not?: NestedEnumLocaleWithAggregatesFilter<$PrismaModel> | $Enums.Locale
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumLocaleFilter<$PrismaModel>
    _max?: NestedEnumLocaleFilter<$PrismaModel>
  }
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedEnumWebsiteStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.WebsiteStatus | EnumWebsiteStatusFieldRefInput<$PrismaModel>
    in?: $Enums.WebsiteStatus[] | ListEnumWebsiteStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.WebsiteStatus[] | ListEnumWebsiteStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumWebsiteStatusFilter<$PrismaModel> | $Enums.WebsiteStatus
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedEnumWebsiteStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.WebsiteStatus | EnumWebsiteStatusFieldRefInput<$PrismaModel>
    in?: $Enums.WebsiteStatus[] | ListEnumWebsiteStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.WebsiteStatus[] | ListEnumWebsiteStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumWebsiteStatusWithAggregatesFilter<$PrismaModel> | $Enums.WebsiteStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumWebsiteStatusFilter<$PrismaModel>
    _max?: NestedEnumWebsiteStatusFilter<$PrismaModel>
  }

  export type ProjectTranslationCreateWithoutProjectInput = {
    id?: string
    locale: $Enums.Locale
    title: string
    tagline?: string | null
    descriptionShort?: string | null
    descriptionLong?: string | null
    caseStudyBlocks?: JsonNullValueInput | InputJsonValue
    role?: string | null
    highlights?: ProjectTranslationCreatehighlightsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProjectTranslationUncheckedCreateWithoutProjectInput = {
    id?: string
    locale: $Enums.Locale
    title: string
    tagline?: string | null
    descriptionShort?: string | null
    descriptionLong?: string | null
    caseStudyBlocks?: JsonNullValueInput | InputJsonValue
    role?: string | null
    highlights?: ProjectTranslationCreatehighlightsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProjectTranslationCreateOrConnectWithoutProjectInput = {
    where: ProjectTranslationWhereUniqueInput
    create: XOR<ProjectTranslationCreateWithoutProjectInput, ProjectTranslationUncheckedCreateWithoutProjectInput>
  }

  export type ProjectTranslationCreateManyProjectInputEnvelope = {
    data: ProjectTranslationCreateManyProjectInput | ProjectTranslationCreateManyProjectInput[]
    skipDuplicates?: boolean
  }

  export type ProjectTranslationUpsertWithWhereUniqueWithoutProjectInput = {
    where: ProjectTranslationWhereUniqueInput
    update: XOR<ProjectTranslationUpdateWithoutProjectInput, ProjectTranslationUncheckedUpdateWithoutProjectInput>
    create: XOR<ProjectTranslationCreateWithoutProjectInput, ProjectTranslationUncheckedCreateWithoutProjectInput>
  }

  export type ProjectTranslationUpdateWithWhereUniqueWithoutProjectInput = {
    where: ProjectTranslationWhereUniqueInput
    data: XOR<ProjectTranslationUpdateWithoutProjectInput, ProjectTranslationUncheckedUpdateWithoutProjectInput>
  }

  export type ProjectTranslationUpdateManyWithWhereWithoutProjectInput = {
    where: ProjectTranslationScalarWhereInput
    data: XOR<ProjectTranslationUpdateManyMutationInput, ProjectTranslationUncheckedUpdateManyWithoutProjectInput>
  }

  export type ProjectTranslationScalarWhereInput = {
    AND?: ProjectTranslationScalarWhereInput | ProjectTranslationScalarWhereInput[]
    OR?: ProjectTranslationScalarWhereInput[]
    NOT?: ProjectTranslationScalarWhereInput | ProjectTranslationScalarWhereInput[]
    id?: StringFilter<"ProjectTranslation"> | string
    projectId?: StringFilter<"ProjectTranslation"> | string
    locale?: EnumLocaleFilter<"ProjectTranslation"> | $Enums.Locale
    title?: StringFilter<"ProjectTranslation"> | string
    tagline?: StringNullableFilter<"ProjectTranslation"> | string | null
    descriptionShort?: StringNullableFilter<"ProjectTranslation"> | string | null
    descriptionLong?: StringNullableFilter<"ProjectTranslation"> | string | null
    caseStudyBlocks?: JsonFilter<"ProjectTranslation">
    role?: StringNullableFilter<"ProjectTranslation"> | string | null
    highlights?: StringNullableListFilter<"ProjectTranslation">
    createdAt?: DateTimeFilter<"ProjectTranslation"> | Date | string
    updatedAt?: DateTimeFilter<"ProjectTranslation"> | Date | string
  }

  export type ProjectCreateWithoutTranslationsInput = {
    id?: string
    slug: string
    status?: $Enums.ProjectStatus
    featured?: boolean
    year?: number | null
    coverImageUrl?: string | null
    galleryImageUrls?: ProjectCreategalleryImageUrlsInput | string[]
    liveUrl?: string | null
    repoUrl?: string | null
    techStack?: ProjectCreatetechStackInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    publishedAt?: Date | string | null
  }

  export type ProjectUncheckedCreateWithoutTranslationsInput = {
    id?: string
    slug: string
    status?: $Enums.ProjectStatus
    featured?: boolean
    year?: number | null
    coverImageUrl?: string | null
    galleryImageUrls?: ProjectCreategalleryImageUrlsInput | string[]
    liveUrl?: string | null
    repoUrl?: string | null
    techStack?: ProjectCreatetechStackInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    publishedAt?: Date | string | null
  }

  export type ProjectCreateOrConnectWithoutTranslationsInput = {
    where: ProjectWhereUniqueInput
    create: XOR<ProjectCreateWithoutTranslationsInput, ProjectUncheckedCreateWithoutTranslationsInput>
  }

  export type ProjectUpsertWithoutTranslationsInput = {
    update: XOR<ProjectUpdateWithoutTranslationsInput, ProjectUncheckedUpdateWithoutTranslationsInput>
    create: XOR<ProjectCreateWithoutTranslationsInput, ProjectUncheckedCreateWithoutTranslationsInput>
    where?: ProjectWhereInput
  }

  export type ProjectUpdateToOneWithWhereWithoutTranslationsInput = {
    where?: ProjectWhereInput
    data: XOR<ProjectUpdateWithoutTranslationsInput, ProjectUncheckedUpdateWithoutTranslationsInput>
  }

  export type ProjectUpdateWithoutTranslationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    status?: EnumProjectStatusFieldUpdateOperationsInput | $Enums.ProjectStatus
    featured?: BoolFieldUpdateOperationsInput | boolean
    year?: NullableIntFieldUpdateOperationsInput | number | null
    coverImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    galleryImageUrls?: ProjectUpdategalleryImageUrlsInput | string[]
    liveUrl?: NullableStringFieldUpdateOperationsInput | string | null
    repoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    techStack?: ProjectUpdatetechStackInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ProjectUncheckedUpdateWithoutTranslationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    status?: EnumProjectStatusFieldUpdateOperationsInput | $Enums.ProjectStatus
    featured?: BoolFieldUpdateOperationsInput | boolean
    year?: NullableIntFieldUpdateOperationsInput | number | null
    coverImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    galleryImageUrls?: ProjectUpdategalleryImageUrlsInput | string[]
    liveUrl?: NullableStringFieldUpdateOperationsInput | string | null
    repoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    techStack?: ProjectUpdatetechStackInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ProjectTranslationCreateManyProjectInput = {
    id?: string
    locale: $Enums.Locale
    title: string
    tagline?: string | null
    descriptionShort?: string | null
    descriptionLong?: string | null
    caseStudyBlocks?: JsonNullValueInput | InputJsonValue
    role?: string | null
    highlights?: ProjectTranslationCreatehighlightsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProjectTranslationUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    locale?: EnumLocaleFieldUpdateOperationsInput | $Enums.Locale
    title?: StringFieldUpdateOperationsInput | string
    tagline?: NullableStringFieldUpdateOperationsInput | string | null
    descriptionShort?: NullableStringFieldUpdateOperationsInput | string | null
    descriptionLong?: NullableStringFieldUpdateOperationsInput | string | null
    caseStudyBlocks?: JsonNullValueInput | InputJsonValue
    role?: NullableStringFieldUpdateOperationsInput | string | null
    highlights?: ProjectTranslationUpdatehighlightsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectTranslationUncheckedUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    locale?: EnumLocaleFieldUpdateOperationsInput | $Enums.Locale
    title?: StringFieldUpdateOperationsInput | string
    tagline?: NullableStringFieldUpdateOperationsInput | string | null
    descriptionShort?: NullableStringFieldUpdateOperationsInput | string | null
    descriptionLong?: NullableStringFieldUpdateOperationsInput | string | null
    caseStudyBlocks?: JsonNullValueInput | InputJsonValue
    role?: NullableStringFieldUpdateOperationsInput | string | null
    highlights?: ProjectTranslationUpdatehighlightsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectTranslationUncheckedUpdateManyWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    locale?: EnumLocaleFieldUpdateOperationsInput | $Enums.Locale
    title?: StringFieldUpdateOperationsInput | string
    tagline?: NullableStringFieldUpdateOperationsInput | string | null
    descriptionShort?: NullableStringFieldUpdateOperationsInput | string | null
    descriptionLong?: NullableStringFieldUpdateOperationsInput | string | null
    caseStudyBlocks?: JsonNullValueInput | InputJsonValue
    role?: NullableStringFieldUpdateOperationsInput | string | null
    highlights?: ProjectTranslationUpdatehighlightsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}