
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
 * Model BlogPost
 * 
 */
export type BlogPost = $Result.DefaultSelection<Prisma.$BlogPostPayload>
/**
 * Model BlogPostTranslation
 * 
 */
export type BlogPostTranslation = $Result.DefaultSelection<Prisma.$BlogPostTranslationPayload>
/**
 * Model NewsletterSubscriber
 * 
 */
export type NewsletterSubscriber = $Result.DefaultSelection<Prisma.$NewsletterSubscriberPayload>
/**
 * Model NewsletterPostSend
 * 
 */
export type NewsletterPostSend = $Result.DefaultSelection<Prisma.$NewsletterPostSendPayload>
/**
 * Model NewsletterEmailEvent
 * 
 */
export type NewsletterEmailEvent = $Result.DefaultSelection<Prisma.$NewsletterEmailEventPayload>

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


export const BlogPostStatus: {
  DRAFT: 'DRAFT',
  PUBLISHED: 'PUBLISHED'
};

export type BlogPostStatus = (typeof BlogPostStatus)[keyof typeof BlogPostStatus]


export const Locale: {
  cs: 'cs',
  en: 'en'
};

export type Locale = (typeof Locale)[keyof typeof Locale]


export const NewsletterSubscriberStatus: {
  PENDING: 'PENDING',
  CONFIRMED: 'CONFIRMED',
  UNSUBSCRIBED: 'UNSUBSCRIBED'
};

export type NewsletterSubscriberStatus = (typeof NewsletterSubscriberStatus)[keyof typeof NewsletterSubscriberStatus]


export const NewsletterEmailType: {
  CONFIRMATION: 'CONFIRMATION',
  BLOG_POST: 'BLOG_POST'
};

export type NewsletterEmailType = (typeof NewsletterEmailType)[keyof typeof NewsletterEmailType]


export const NewsletterEmailStatus: {
  SENT: 'SENT',
  FAILED: 'FAILED'
};

export type NewsletterEmailStatus = (typeof NewsletterEmailStatus)[keyof typeof NewsletterEmailStatus]


export const NewsletterPostSendStatus: {
  PENDING: 'PENDING',
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED'
};

export type NewsletterPostSendStatus = (typeof NewsletterPostSendStatus)[keyof typeof NewsletterPostSendStatus]

}

export type ProjectStatus = $Enums.ProjectStatus

export const ProjectStatus: typeof $Enums.ProjectStatus

export type WebsiteStatus = $Enums.WebsiteStatus

export const WebsiteStatus: typeof $Enums.WebsiteStatus

export type BlogPostStatus = $Enums.BlogPostStatus

export const BlogPostStatus: typeof $Enums.BlogPostStatus

export type Locale = $Enums.Locale

export const Locale: typeof $Enums.Locale

export type NewsletterSubscriberStatus = $Enums.NewsletterSubscriberStatus

export const NewsletterSubscriberStatus: typeof $Enums.NewsletterSubscriberStatus

export type NewsletterEmailType = $Enums.NewsletterEmailType

export const NewsletterEmailType: typeof $Enums.NewsletterEmailType

export type NewsletterEmailStatus = $Enums.NewsletterEmailStatus

export const NewsletterEmailStatus: typeof $Enums.NewsletterEmailStatus

export type NewsletterPostSendStatus = $Enums.NewsletterPostSendStatus

export const NewsletterPostSendStatus: typeof $Enums.NewsletterPostSendStatus

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

  /**
   * `prisma.blogPost`: Exposes CRUD operations for the **BlogPost** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more BlogPosts
    * const blogPosts = await prisma.blogPost.findMany()
    * ```
    */
  get blogPost(): Prisma.BlogPostDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.blogPostTranslation`: Exposes CRUD operations for the **BlogPostTranslation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more BlogPostTranslations
    * const blogPostTranslations = await prisma.blogPostTranslation.findMany()
    * ```
    */
  get blogPostTranslation(): Prisma.BlogPostTranslationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.newsletterSubscriber`: Exposes CRUD operations for the **NewsletterSubscriber** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more NewsletterSubscribers
    * const newsletterSubscribers = await prisma.newsletterSubscriber.findMany()
    * ```
    */
  get newsletterSubscriber(): Prisma.NewsletterSubscriberDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.newsletterPostSend`: Exposes CRUD operations for the **NewsletterPostSend** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more NewsletterPostSends
    * const newsletterPostSends = await prisma.newsletterPostSend.findMany()
    * ```
    */
  get newsletterPostSend(): Prisma.NewsletterPostSendDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.newsletterEmailEvent`: Exposes CRUD operations for the **NewsletterEmailEvent** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more NewsletterEmailEvents
    * const newsletterEmailEvents = await prisma.newsletterEmailEvent.findMany()
    * ```
    */
  get newsletterEmailEvent(): Prisma.NewsletterEmailEventDelegate<ExtArgs, ClientOptions>;
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
    Website: 'Website',
    BlogPost: 'BlogPost',
    BlogPostTranslation: 'BlogPostTranslation',
    NewsletterSubscriber: 'NewsletterSubscriber',
    NewsletterPostSend: 'NewsletterPostSend',
    NewsletterEmailEvent: 'NewsletterEmailEvent'
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
      modelProps: "project" | "projectTranslation" | "website" | "blogPost" | "blogPostTranslation" | "newsletterSubscriber" | "newsletterPostSend" | "newsletterEmailEvent"
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
      BlogPost: {
        payload: Prisma.$BlogPostPayload<ExtArgs>
        fields: Prisma.BlogPostFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BlogPostFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlogPostPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BlogPostFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlogPostPayload>
          }
          findFirst: {
            args: Prisma.BlogPostFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlogPostPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BlogPostFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlogPostPayload>
          }
          findMany: {
            args: Prisma.BlogPostFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlogPostPayload>[]
          }
          create: {
            args: Prisma.BlogPostCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlogPostPayload>
          }
          createMany: {
            args: Prisma.BlogPostCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BlogPostCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlogPostPayload>[]
          }
          delete: {
            args: Prisma.BlogPostDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlogPostPayload>
          }
          update: {
            args: Prisma.BlogPostUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlogPostPayload>
          }
          deleteMany: {
            args: Prisma.BlogPostDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BlogPostUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.BlogPostUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlogPostPayload>[]
          }
          upsert: {
            args: Prisma.BlogPostUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlogPostPayload>
          }
          aggregate: {
            args: Prisma.BlogPostAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBlogPost>
          }
          groupBy: {
            args: Prisma.BlogPostGroupByArgs<ExtArgs>
            result: $Utils.Optional<BlogPostGroupByOutputType>[]
          }
          count: {
            args: Prisma.BlogPostCountArgs<ExtArgs>
            result: $Utils.Optional<BlogPostCountAggregateOutputType> | number
          }
        }
      }
      BlogPostTranslation: {
        payload: Prisma.$BlogPostTranslationPayload<ExtArgs>
        fields: Prisma.BlogPostTranslationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BlogPostTranslationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlogPostTranslationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BlogPostTranslationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlogPostTranslationPayload>
          }
          findFirst: {
            args: Prisma.BlogPostTranslationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlogPostTranslationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BlogPostTranslationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlogPostTranslationPayload>
          }
          findMany: {
            args: Prisma.BlogPostTranslationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlogPostTranslationPayload>[]
          }
          create: {
            args: Prisma.BlogPostTranslationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlogPostTranslationPayload>
          }
          createMany: {
            args: Prisma.BlogPostTranslationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BlogPostTranslationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlogPostTranslationPayload>[]
          }
          delete: {
            args: Prisma.BlogPostTranslationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlogPostTranslationPayload>
          }
          update: {
            args: Prisma.BlogPostTranslationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlogPostTranslationPayload>
          }
          deleteMany: {
            args: Prisma.BlogPostTranslationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BlogPostTranslationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.BlogPostTranslationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlogPostTranslationPayload>[]
          }
          upsert: {
            args: Prisma.BlogPostTranslationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlogPostTranslationPayload>
          }
          aggregate: {
            args: Prisma.BlogPostTranslationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBlogPostTranslation>
          }
          groupBy: {
            args: Prisma.BlogPostTranslationGroupByArgs<ExtArgs>
            result: $Utils.Optional<BlogPostTranslationGroupByOutputType>[]
          }
          count: {
            args: Prisma.BlogPostTranslationCountArgs<ExtArgs>
            result: $Utils.Optional<BlogPostTranslationCountAggregateOutputType> | number
          }
        }
      }
      NewsletterSubscriber: {
        payload: Prisma.$NewsletterSubscriberPayload<ExtArgs>
        fields: Prisma.NewsletterSubscriberFieldRefs
        operations: {
          findUnique: {
            args: Prisma.NewsletterSubscriberFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewsletterSubscriberPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.NewsletterSubscriberFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewsletterSubscriberPayload>
          }
          findFirst: {
            args: Prisma.NewsletterSubscriberFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewsletterSubscriberPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.NewsletterSubscriberFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewsletterSubscriberPayload>
          }
          findMany: {
            args: Prisma.NewsletterSubscriberFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewsletterSubscriberPayload>[]
          }
          create: {
            args: Prisma.NewsletterSubscriberCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewsletterSubscriberPayload>
          }
          createMany: {
            args: Prisma.NewsletterSubscriberCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.NewsletterSubscriberCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewsletterSubscriberPayload>[]
          }
          delete: {
            args: Prisma.NewsletterSubscriberDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewsletterSubscriberPayload>
          }
          update: {
            args: Prisma.NewsletterSubscriberUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewsletterSubscriberPayload>
          }
          deleteMany: {
            args: Prisma.NewsletterSubscriberDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.NewsletterSubscriberUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.NewsletterSubscriberUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewsletterSubscriberPayload>[]
          }
          upsert: {
            args: Prisma.NewsletterSubscriberUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewsletterSubscriberPayload>
          }
          aggregate: {
            args: Prisma.NewsletterSubscriberAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateNewsletterSubscriber>
          }
          groupBy: {
            args: Prisma.NewsletterSubscriberGroupByArgs<ExtArgs>
            result: $Utils.Optional<NewsletterSubscriberGroupByOutputType>[]
          }
          count: {
            args: Prisma.NewsletterSubscriberCountArgs<ExtArgs>
            result: $Utils.Optional<NewsletterSubscriberCountAggregateOutputType> | number
          }
        }
      }
      NewsletterPostSend: {
        payload: Prisma.$NewsletterPostSendPayload<ExtArgs>
        fields: Prisma.NewsletterPostSendFieldRefs
        operations: {
          findUnique: {
            args: Prisma.NewsletterPostSendFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewsletterPostSendPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.NewsletterPostSendFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewsletterPostSendPayload>
          }
          findFirst: {
            args: Prisma.NewsletterPostSendFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewsletterPostSendPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.NewsletterPostSendFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewsletterPostSendPayload>
          }
          findMany: {
            args: Prisma.NewsletterPostSendFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewsletterPostSendPayload>[]
          }
          create: {
            args: Prisma.NewsletterPostSendCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewsletterPostSendPayload>
          }
          createMany: {
            args: Prisma.NewsletterPostSendCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.NewsletterPostSendCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewsletterPostSendPayload>[]
          }
          delete: {
            args: Prisma.NewsletterPostSendDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewsletterPostSendPayload>
          }
          update: {
            args: Prisma.NewsletterPostSendUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewsletterPostSendPayload>
          }
          deleteMany: {
            args: Prisma.NewsletterPostSendDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.NewsletterPostSendUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.NewsletterPostSendUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewsletterPostSendPayload>[]
          }
          upsert: {
            args: Prisma.NewsletterPostSendUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewsletterPostSendPayload>
          }
          aggregate: {
            args: Prisma.NewsletterPostSendAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateNewsletterPostSend>
          }
          groupBy: {
            args: Prisma.NewsletterPostSendGroupByArgs<ExtArgs>
            result: $Utils.Optional<NewsletterPostSendGroupByOutputType>[]
          }
          count: {
            args: Prisma.NewsletterPostSendCountArgs<ExtArgs>
            result: $Utils.Optional<NewsletterPostSendCountAggregateOutputType> | number
          }
        }
      }
      NewsletterEmailEvent: {
        payload: Prisma.$NewsletterEmailEventPayload<ExtArgs>
        fields: Prisma.NewsletterEmailEventFieldRefs
        operations: {
          findUnique: {
            args: Prisma.NewsletterEmailEventFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewsletterEmailEventPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.NewsletterEmailEventFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewsletterEmailEventPayload>
          }
          findFirst: {
            args: Prisma.NewsletterEmailEventFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewsletterEmailEventPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.NewsletterEmailEventFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewsletterEmailEventPayload>
          }
          findMany: {
            args: Prisma.NewsletterEmailEventFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewsletterEmailEventPayload>[]
          }
          create: {
            args: Prisma.NewsletterEmailEventCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewsletterEmailEventPayload>
          }
          createMany: {
            args: Prisma.NewsletterEmailEventCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.NewsletterEmailEventCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewsletterEmailEventPayload>[]
          }
          delete: {
            args: Prisma.NewsletterEmailEventDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewsletterEmailEventPayload>
          }
          update: {
            args: Prisma.NewsletterEmailEventUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewsletterEmailEventPayload>
          }
          deleteMany: {
            args: Prisma.NewsletterEmailEventDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.NewsletterEmailEventUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.NewsletterEmailEventUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewsletterEmailEventPayload>[]
          }
          upsert: {
            args: Prisma.NewsletterEmailEventUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewsletterEmailEventPayload>
          }
          aggregate: {
            args: Prisma.NewsletterEmailEventAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateNewsletterEmailEvent>
          }
          groupBy: {
            args: Prisma.NewsletterEmailEventGroupByArgs<ExtArgs>
            result: $Utils.Optional<NewsletterEmailEventGroupByOutputType>[]
          }
          count: {
            args: Prisma.NewsletterEmailEventCountArgs<ExtArgs>
            result: $Utils.Optional<NewsletterEmailEventCountAggregateOutputType> | number
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
    blogPost?: BlogPostOmit
    blogPostTranslation?: BlogPostTranslationOmit
    newsletterSubscriber?: NewsletterSubscriberOmit
    newsletterPostSend?: NewsletterPostSendOmit
    newsletterEmailEvent?: NewsletterEmailEventOmit
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
   * Count Type BlogPostCountOutputType
   */

  export type BlogPostCountOutputType = {
    translations: number
    newsletterSends: number
    newsletterEmailEvents: number
  }

  export type BlogPostCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    translations?: boolean | BlogPostCountOutputTypeCountTranslationsArgs
    newsletterSends?: boolean | BlogPostCountOutputTypeCountNewsletterSendsArgs
    newsletterEmailEvents?: boolean | BlogPostCountOutputTypeCountNewsletterEmailEventsArgs
  }

  // Custom InputTypes
  /**
   * BlogPostCountOutputType without action
   */
  export type BlogPostCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlogPostCountOutputType
     */
    select?: BlogPostCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * BlogPostCountOutputType without action
   */
  export type BlogPostCountOutputTypeCountTranslationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BlogPostTranslationWhereInput
  }

  /**
   * BlogPostCountOutputType without action
   */
  export type BlogPostCountOutputTypeCountNewsletterSendsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NewsletterPostSendWhereInput
  }

  /**
   * BlogPostCountOutputType without action
   */
  export type BlogPostCountOutputTypeCountNewsletterEmailEventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NewsletterEmailEventWhereInput
  }


  /**
   * Count Type NewsletterSubscriberCountOutputType
   */

  export type NewsletterSubscriberCountOutputType = {
    emailEvents: number
  }

  export type NewsletterSubscriberCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    emailEvents?: boolean | NewsletterSubscriberCountOutputTypeCountEmailEventsArgs
  }

  // Custom InputTypes
  /**
   * NewsletterSubscriberCountOutputType without action
   */
  export type NewsletterSubscriberCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsletterSubscriberCountOutputType
     */
    select?: NewsletterSubscriberCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * NewsletterSubscriberCountOutputType without action
   */
  export type NewsletterSubscriberCountOutputTypeCountEmailEventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NewsletterEmailEventWhereInput
  }


  /**
   * Count Type NewsletterPostSendCountOutputType
   */

  export type NewsletterPostSendCountOutputType = {
    emailEvents: number
  }

  export type NewsletterPostSendCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    emailEvents?: boolean | NewsletterPostSendCountOutputTypeCountEmailEventsArgs
  }

  // Custom InputTypes
  /**
   * NewsletterPostSendCountOutputType without action
   */
  export type NewsletterPostSendCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsletterPostSendCountOutputType
     */
    select?: NewsletterPostSendCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * NewsletterPostSendCountOutputType without action
   */
  export type NewsletterPostSendCountOutputTypeCountEmailEventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NewsletterEmailEventWhereInput
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
   * Model BlogPost
   */

  export type AggregateBlogPost = {
    _count: BlogPostCountAggregateOutputType | null
    _min: BlogPostMinAggregateOutputType | null
    _max: BlogPostMaxAggregateOutputType | null
  }

  export type BlogPostMinAggregateOutputType = {
    id: string | null
    slug: string | null
    status: $Enums.BlogPostStatus | null
    featured: boolean | null
    coverImageUrl: string | null
    coverImageCredit: string | null
    coverImageCreditUrl: string | null
    createdAt: Date | null
    updatedAt: Date | null
    publishedAt: Date | null
  }

  export type BlogPostMaxAggregateOutputType = {
    id: string | null
    slug: string | null
    status: $Enums.BlogPostStatus | null
    featured: boolean | null
    coverImageUrl: string | null
    coverImageCredit: string | null
    coverImageCreditUrl: string | null
    createdAt: Date | null
    updatedAt: Date | null
    publishedAt: Date | null
  }

  export type BlogPostCountAggregateOutputType = {
    id: number
    slug: number
    status: number
    featured: number
    tags: number
    coverImageUrl: number
    coverImageCredit: number
    coverImageCreditUrl: number
    createdAt: number
    updatedAt: number
    publishedAt: number
    _all: number
  }


  export type BlogPostMinAggregateInputType = {
    id?: true
    slug?: true
    status?: true
    featured?: true
    coverImageUrl?: true
    coverImageCredit?: true
    coverImageCreditUrl?: true
    createdAt?: true
    updatedAt?: true
    publishedAt?: true
  }

  export type BlogPostMaxAggregateInputType = {
    id?: true
    slug?: true
    status?: true
    featured?: true
    coverImageUrl?: true
    coverImageCredit?: true
    coverImageCreditUrl?: true
    createdAt?: true
    updatedAt?: true
    publishedAt?: true
  }

  export type BlogPostCountAggregateInputType = {
    id?: true
    slug?: true
    status?: true
    featured?: true
    tags?: true
    coverImageUrl?: true
    coverImageCredit?: true
    coverImageCreditUrl?: true
    createdAt?: true
    updatedAt?: true
    publishedAt?: true
    _all?: true
  }

  export type BlogPostAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BlogPost to aggregate.
     */
    where?: BlogPostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BlogPosts to fetch.
     */
    orderBy?: BlogPostOrderByWithRelationInput | BlogPostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BlogPostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BlogPosts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BlogPosts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned BlogPosts
    **/
    _count?: true | BlogPostCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BlogPostMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BlogPostMaxAggregateInputType
  }

  export type GetBlogPostAggregateType<T extends BlogPostAggregateArgs> = {
        [P in keyof T & keyof AggregateBlogPost]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBlogPost[P]>
      : GetScalarType<T[P], AggregateBlogPost[P]>
  }




  export type BlogPostGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BlogPostWhereInput
    orderBy?: BlogPostOrderByWithAggregationInput | BlogPostOrderByWithAggregationInput[]
    by: BlogPostScalarFieldEnum[] | BlogPostScalarFieldEnum
    having?: BlogPostScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BlogPostCountAggregateInputType | true
    _min?: BlogPostMinAggregateInputType
    _max?: BlogPostMaxAggregateInputType
  }

  export type BlogPostGroupByOutputType = {
    id: string
    slug: string
    status: $Enums.BlogPostStatus
    featured: boolean
    tags: string[]
    coverImageUrl: string | null
    coverImageCredit: string | null
    coverImageCreditUrl: string | null
    createdAt: Date
    updatedAt: Date
    publishedAt: Date | null
    _count: BlogPostCountAggregateOutputType | null
    _min: BlogPostMinAggregateOutputType | null
    _max: BlogPostMaxAggregateOutputType | null
  }

  type GetBlogPostGroupByPayload<T extends BlogPostGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BlogPostGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BlogPostGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BlogPostGroupByOutputType[P]>
            : GetScalarType<T[P], BlogPostGroupByOutputType[P]>
        }
      >
    >


  export type BlogPostSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    slug?: boolean
    status?: boolean
    featured?: boolean
    tags?: boolean
    coverImageUrl?: boolean
    coverImageCredit?: boolean
    coverImageCreditUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    publishedAt?: boolean
    translations?: boolean | BlogPost$translationsArgs<ExtArgs>
    newsletterSends?: boolean | BlogPost$newsletterSendsArgs<ExtArgs>
    newsletterEmailEvents?: boolean | BlogPost$newsletterEmailEventsArgs<ExtArgs>
    _count?: boolean | BlogPostCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["blogPost"]>

  export type BlogPostSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    slug?: boolean
    status?: boolean
    featured?: boolean
    tags?: boolean
    coverImageUrl?: boolean
    coverImageCredit?: boolean
    coverImageCreditUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    publishedAt?: boolean
  }, ExtArgs["result"]["blogPost"]>

  export type BlogPostSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    slug?: boolean
    status?: boolean
    featured?: boolean
    tags?: boolean
    coverImageUrl?: boolean
    coverImageCredit?: boolean
    coverImageCreditUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    publishedAt?: boolean
  }, ExtArgs["result"]["blogPost"]>

  export type BlogPostSelectScalar = {
    id?: boolean
    slug?: boolean
    status?: boolean
    featured?: boolean
    tags?: boolean
    coverImageUrl?: boolean
    coverImageCredit?: boolean
    coverImageCreditUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    publishedAt?: boolean
  }

  export type BlogPostOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "slug" | "status" | "featured" | "tags" | "coverImageUrl" | "coverImageCredit" | "coverImageCreditUrl" | "createdAt" | "updatedAt" | "publishedAt", ExtArgs["result"]["blogPost"]>
  export type BlogPostInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    translations?: boolean | BlogPost$translationsArgs<ExtArgs>
    newsletterSends?: boolean | BlogPost$newsletterSendsArgs<ExtArgs>
    newsletterEmailEvents?: boolean | BlogPost$newsletterEmailEventsArgs<ExtArgs>
    _count?: boolean | BlogPostCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type BlogPostIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type BlogPostIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $BlogPostPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "BlogPost"
    objects: {
      translations: Prisma.$BlogPostTranslationPayload<ExtArgs>[]
      newsletterSends: Prisma.$NewsletterPostSendPayload<ExtArgs>[]
      newsletterEmailEvents: Prisma.$NewsletterEmailEventPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      slug: string
      status: $Enums.BlogPostStatus
      featured: boolean
      tags: string[]
      coverImageUrl: string | null
      coverImageCredit: string | null
      coverImageCreditUrl: string | null
      createdAt: Date
      updatedAt: Date
      publishedAt: Date | null
    }, ExtArgs["result"]["blogPost"]>
    composites: {}
  }

  type BlogPostGetPayload<S extends boolean | null | undefined | BlogPostDefaultArgs> = $Result.GetResult<Prisma.$BlogPostPayload, S>

  type BlogPostCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BlogPostFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BlogPostCountAggregateInputType | true
    }

  export interface BlogPostDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['BlogPost'], meta: { name: 'BlogPost' } }
    /**
     * Find zero or one BlogPost that matches the filter.
     * @param {BlogPostFindUniqueArgs} args - Arguments to find a BlogPost
     * @example
     * // Get one BlogPost
     * const blogPost = await prisma.blogPost.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BlogPostFindUniqueArgs>(args: SelectSubset<T, BlogPostFindUniqueArgs<ExtArgs>>): Prisma__BlogPostClient<$Result.GetResult<Prisma.$BlogPostPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one BlogPost that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BlogPostFindUniqueOrThrowArgs} args - Arguments to find a BlogPost
     * @example
     * // Get one BlogPost
     * const blogPost = await prisma.blogPost.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BlogPostFindUniqueOrThrowArgs>(args: SelectSubset<T, BlogPostFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BlogPostClient<$Result.GetResult<Prisma.$BlogPostPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BlogPost that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlogPostFindFirstArgs} args - Arguments to find a BlogPost
     * @example
     * // Get one BlogPost
     * const blogPost = await prisma.blogPost.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BlogPostFindFirstArgs>(args?: SelectSubset<T, BlogPostFindFirstArgs<ExtArgs>>): Prisma__BlogPostClient<$Result.GetResult<Prisma.$BlogPostPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BlogPost that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlogPostFindFirstOrThrowArgs} args - Arguments to find a BlogPost
     * @example
     * // Get one BlogPost
     * const blogPost = await prisma.blogPost.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BlogPostFindFirstOrThrowArgs>(args?: SelectSubset<T, BlogPostFindFirstOrThrowArgs<ExtArgs>>): Prisma__BlogPostClient<$Result.GetResult<Prisma.$BlogPostPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more BlogPosts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlogPostFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all BlogPosts
     * const blogPosts = await prisma.blogPost.findMany()
     * 
     * // Get first 10 BlogPosts
     * const blogPosts = await prisma.blogPost.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const blogPostWithIdOnly = await prisma.blogPost.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BlogPostFindManyArgs>(args?: SelectSubset<T, BlogPostFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BlogPostPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a BlogPost.
     * @param {BlogPostCreateArgs} args - Arguments to create a BlogPost.
     * @example
     * // Create one BlogPost
     * const BlogPost = await prisma.blogPost.create({
     *   data: {
     *     // ... data to create a BlogPost
     *   }
     * })
     * 
     */
    create<T extends BlogPostCreateArgs>(args: SelectSubset<T, BlogPostCreateArgs<ExtArgs>>): Prisma__BlogPostClient<$Result.GetResult<Prisma.$BlogPostPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many BlogPosts.
     * @param {BlogPostCreateManyArgs} args - Arguments to create many BlogPosts.
     * @example
     * // Create many BlogPosts
     * const blogPost = await prisma.blogPost.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BlogPostCreateManyArgs>(args?: SelectSubset<T, BlogPostCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many BlogPosts and returns the data saved in the database.
     * @param {BlogPostCreateManyAndReturnArgs} args - Arguments to create many BlogPosts.
     * @example
     * // Create many BlogPosts
     * const blogPost = await prisma.blogPost.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many BlogPosts and only return the `id`
     * const blogPostWithIdOnly = await prisma.blogPost.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BlogPostCreateManyAndReturnArgs>(args?: SelectSubset<T, BlogPostCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BlogPostPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a BlogPost.
     * @param {BlogPostDeleteArgs} args - Arguments to delete one BlogPost.
     * @example
     * // Delete one BlogPost
     * const BlogPost = await prisma.blogPost.delete({
     *   where: {
     *     // ... filter to delete one BlogPost
     *   }
     * })
     * 
     */
    delete<T extends BlogPostDeleteArgs>(args: SelectSubset<T, BlogPostDeleteArgs<ExtArgs>>): Prisma__BlogPostClient<$Result.GetResult<Prisma.$BlogPostPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one BlogPost.
     * @param {BlogPostUpdateArgs} args - Arguments to update one BlogPost.
     * @example
     * // Update one BlogPost
     * const blogPost = await prisma.blogPost.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BlogPostUpdateArgs>(args: SelectSubset<T, BlogPostUpdateArgs<ExtArgs>>): Prisma__BlogPostClient<$Result.GetResult<Prisma.$BlogPostPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more BlogPosts.
     * @param {BlogPostDeleteManyArgs} args - Arguments to filter BlogPosts to delete.
     * @example
     * // Delete a few BlogPosts
     * const { count } = await prisma.blogPost.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BlogPostDeleteManyArgs>(args?: SelectSubset<T, BlogPostDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BlogPosts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlogPostUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many BlogPosts
     * const blogPost = await prisma.blogPost.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BlogPostUpdateManyArgs>(args: SelectSubset<T, BlogPostUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BlogPosts and returns the data updated in the database.
     * @param {BlogPostUpdateManyAndReturnArgs} args - Arguments to update many BlogPosts.
     * @example
     * // Update many BlogPosts
     * const blogPost = await prisma.blogPost.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more BlogPosts and only return the `id`
     * const blogPostWithIdOnly = await prisma.blogPost.updateManyAndReturn({
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
    updateManyAndReturn<T extends BlogPostUpdateManyAndReturnArgs>(args: SelectSubset<T, BlogPostUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BlogPostPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one BlogPost.
     * @param {BlogPostUpsertArgs} args - Arguments to update or create a BlogPost.
     * @example
     * // Update or create a BlogPost
     * const blogPost = await prisma.blogPost.upsert({
     *   create: {
     *     // ... data to create a BlogPost
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the BlogPost we want to update
     *   }
     * })
     */
    upsert<T extends BlogPostUpsertArgs>(args: SelectSubset<T, BlogPostUpsertArgs<ExtArgs>>): Prisma__BlogPostClient<$Result.GetResult<Prisma.$BlogPostPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of BlogPosts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlogPostCountArgs} args - Arguments to filter BlogPosts to count.
     * @example
     * // Count the number of BlogPosts
     * const count = await prisma.blogPost.count({
     *   where: {
     *     // ... the filter for the BlogPosts we want to count
     *   }
     * })
    **/
    count<T extends BlogPostCountArgs>(
      args?: Subset<T, BlogPostCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BlogPostCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a BlogPost.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlogPostAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends BlogPostAggregateArgs>(args: Subset<T, BlogPostAggregateArgs>): Prisma.PrismaPromise<GetBlogPostAggregateType<T>>

    /**
     * Group by BlogPost.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlogPostGroupByArgs} args - Group by arguments.
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
      T extends BlogPostGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BlogPostGroupByArgs['orderBy'] }
        : { orderBy?: BlogPostGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, BlogPostGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBlogPostGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the BlogPost model
   */
  readonly fields: BlogPostFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for BlogPost.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BlogPostClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    translations<T extends BlogPost$translationsArgs<ExtArgs> = {}>(args?: Subset<T, BlogPost$translationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BlogPostTranslationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    newsletterSends<T extends BlogPost$newsletterSendsArgs<ExtArgs> = {}>(args?: Subset<T, BlogPost$newsletterSendsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NewsletterPostSendPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    newsletterEmailEvents<T extends BlogPost$newsletterEmailEventsArgs<ExtArgs> = {}>(args?: Subset<T, BlogPost$newsletterEmailEventsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NewsletterEmailEventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the BlogPost model
   */
  interface BlogPostFieldRefs {
    readonly id: FieldRef<"BlogPost", 'String'>
    readonly slug: FieldRef<"BlogPost", 'String'>
    readonly status: FieldRef<"BlogPost", 'BlogPostStatus'>
    readonly featured: FieldRef<"BlogPost", 'Boolean'>
    readonly tags: FieldRef<"BlogPost", 'String[]'>
    readonly coverImageUrl: FieldRef<"BlogPost", 'String'>
    readonly coverImageCredit: FieldRef<"BlogPost", 'String'>
    readonly coverImageCreditUrl: FieldRef<"BlogPost", 'String'>
    readonly createdAt: FieldRef<"BlogPost", 'DateTime'>
    readonly updatedAt: FieldRef<"BlogPost", 'DateTime'>
    readonly publishedAt: FieldRef<"BlogPost", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * BlogPost findUnique
   */
  export type BlogPostFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlogPost
     */
    select?: BlogPostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BlogPost
     */
    omit?: BlogPostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlogPostInclude<ExtArgs> | null
    /**
     * Filter, which BlogPost to fetch.
     */
    where: BlogPostWhereUniqueInput
  }

  /**
   * BlogPost findUniqueOrThrow
   */
  export type BlogPostFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlogPost
     */
    select?: BlogPostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BlogPost
     */
    omit?: BlogPostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlogPostInclude<ExtArgs> | null
    /**
     * Filter, which BlogPost to fetch.
     */
    where: BlogPostWhereUniqueInput
  }

  /**
   * BlogPost findFirst
   */
  export type BlogPostFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlogPost
     */
    select?: BlogPostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BlogPost
     */
    omit?: BlogPostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlogPostInclude<ExtArgs> | null
    /**
     * Filter, which BlogPost to fetch.
     */
    where?: BlogPostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BlogPosts to fetch.
     */
    orderBy?: BlogPostOrderByWithRelationInput | BlogPostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BlogPosts.
     */
    cursor?: BlogPostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BlogPosts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BlogPosts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BlogPosts.
     */
    distinct?: BlogPostScalarFieldEnum | BlogPostScalarFieldEnum[]
  }

  /**
   * BlogPost findFirstOrThrow
   */
  export type BlogPostFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlogPost
     */
    select?: BlogPostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BlogPost
     */
    omit?: BlogPostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlogPostInclude<ExtArgs> | null
    /**
     * Filter, which BlogPost to fetch.
     */
    where?: BlogPostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BlogPosts to fetch.
     */
    orderBy?: BlogPostOrderByWithRelationInput | BlogPostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BlogPosts.
     */
    cursor?: BlogPostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BlogPosts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BlogPosts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BlogPosts.
     */
    distinct?: BlogPostScalarFieldEnum | BlogPostScalarFieldEnum[]
  }

  /**
   * BlogPost findMany
   */
  export type BlogPostFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlogPost
     */
    select?: BlogPostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BlogPost
     */
    omit?: BlogPostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlogPostInclude<ExtArgs> | null
    /**
     * Filter, which BlogPosts to fetch.
     */
    where?: BlogPostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BlogPosts to fetch.
     */
    orderBy?: BlogPostOrderByWithRelationInput | BlogPostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing BlogPosts.
     */
    cursor?: BlogPostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BlogPosts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BlogPosts.
     */
    skip?: number
    distinct?: BlogPostScalarFieldEnum | BlogPostScalarFieldEnum[]
  }

  /**
   * BlogPost create
   */
  export type BlogPostCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlogPost
     */
    select?: BlogPostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BlogPost
     */
    omit?: BlogPostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlogPostInclude<ExtArgs> | null
    /**
     * The data needed to create a BlogPost.
     */
    data: XOR<BlogPostCreateInput, BlogPostUncheckedCreateInput>
  }

  /**
   * BlogPost createMany
   */
  export type BlogPostCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many BlogPosts.
     */
    data: BlogPostCreateManyInput | BlogPostCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * BlogPost createManyAndReturn
   */
  export type BlogPostCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlogPost
     */
    select?: BlogPostSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BlogPost
     */
    omit?: BlogPostOmit<ExtArgs> | null
    /**
     * The data used to create many BlogPosts.
     */
    data: BlogPostCreateManyInput | BlogPostCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * BlogPost update
   */
  export type BlogPostUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlogPost
     */
    select?: BlogPostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BlogPost
     */
    omit?: BlogPostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlogPostInclude<ExtArgs> | null
    /**
     * The data needed to update a BlogPost.
     */
    data: XOR<BlogPostUpdateInput, BlogPostUncheckedUpdateInput>
    /**
     * Choose, which BlogPost to update.
     */
    where: BlogPostWhereUniqueInput
  }

  /**
   * BlogPost updateMany
   */
  export type BlogPostUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update BlogPosts.
     */
    data: XOR<BlogPostUpdateManyMutationInput, BlogPostUncheckedUpdateManyInput>
    /**
     * Filter which BlogPosts to update
     */
    where?: BlogPostWhereInput
    /**
     * Limit how many BlogPosts to update.
     */
    limit?: number
  }

  /**
   * BlogPost updateManyAndReturn
   */
  export type BlogPostUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlogPost
     */
    select?: BlogPostSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BlogPost
     */
    omit?: BlogPostOmit<ExtArgs> | null
    /**
     * The data used to update BlogPosts.
     */
    data: XOR<BlogPostUpdateManyMutationInput, BlogPostUncheckedUpdateManyInput>
    /**
     * Filter which BlogPosts to update
     */
    where?: BlogPostWhereInput
    /**
     * Limit how many BlogPosts to update.
     */
    limit?: number
  }

  /**
   * BlogPost upsert
   */
  export type BlogPostUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlogPost
     */
    select?: BlogPostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BlogPost
     */
    omit?: BlogPostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlogPostInclude<ExtArgs> | null
    /**
     * The filter to search for the BlogPost to update in case it exists.
     */
    where: BlogPostWhereUniqueInput
    /**
     * In case the BlogPost found by the `where` argument doesn't exist, create a new BlogPost with this data.
     */
    create: XOR<BlogPostCreateInput, BlogPostUncheckedCreateInput>
    /**
     * In case the BlogPost was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BlogPostUpdateInput, BlogPostUncheckedUpdateInput>
  }

  /**
   * BlogPost delete
   */
  export type BlogPostDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlogPost
     */
    select?: BlogPostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BlogPost
     */
    omit?: BlogPostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlogPostInclude<ExtArgs> | null
    /**
     * Filter which BlogPost to delete.
     */
    where: BlogPostWhereUniqueInput
  }

  /**
   * BlogPost deleteMany
   */
  export type BlogPostDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BlogPosts to delete
     */
    where?: BlogPostWhereInput
    /**
     * Limit how many BlogPosts to delete.
     */
    limit?: number
  }

  /**
   * BlogPost.translations
   */
  export type BlogPost$translationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlogPostTranslation
     */
    select?: BlogPostTranslationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BlogPostTranslation
     */
    omit?: BlogPostTranslationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlogPostTranslationInclude<ExtArgs> | null
    where?: BlogPostTranslationWhereInput
    orderBy?: BlogPostTranslationOrderByWithRelationInput | BlogPostTranslationOrderByWithRelationInput[]
    cursor?: BlogPostTranslationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BlogPostTranslationScalarFieldEnum | BlogPostTranslationScalarFieldEnum[]
  }

  /**
   * BlogPost.newsletterSends
   */
  export type BlogPost$newsletterSendsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsletterPostSend
     */
    select?: NewsletterPostSendSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NewsletterPostSend
     */
    omit?: NewsletterPostSendOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NewsletterPostSendInclude<ExtArgs> | null
    where?: NewsletterPostSendWhereInput
    orderBy?: NewsletterPostSendOrderByWithRelationInput | NewsletterPostSendOrderByWithRelationInput[]
    cursor?: NewsletterPostSendWhereUniqueInput
    take?: number
    skip?: number
    distinct?: NewsletterPostSendScalarFieldEnum | NewsletterPostSendScalarFieldEnum[]
  }

  /**
   * BlogPost.newsletterEmailEvents
   */
  export type BlogPost$newsletterEmailEventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsletterEmailEvent
     */
    select?: NewsletterEmailEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NewsletterEmailEvent
     */
    omit?: NewsletterEmailEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NewsletterEmailEventInclude<ExtArgs> | null
    where?: NewsletterEmailEventWhereInput
    orderBy?: NewsletterEmailEventOrderByWithRelationInput | NewsletterEmailEventOrderByWithRelationInput[]
    cursor?: NewsletterEmailEventWhereUniqueInput
    take?: number
    skip?: number
    distinct?: NewsletterEmailEventScalarFieldEnum | NewsletterEmailEventScalarFieldEnum[]
  }

  /**
   * BlogPost without action
   */
  export type BlogPostDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlogPost
     */
    select?: BlogPostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BlogPost
     */
    omit?: BlogPostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlogPostInclude<ExtArgs> | null
  }


  /**
   * Model BlogPostTranslation
   */

  export type AggregateBlogPostTranslation = {
    _count: BlogPostTranslationCountAggregateOutputType | null
    _min: BlogPostTranslationMinAggregateOutputType | null
    _max: BlogPostTranslationMaxAggregateOutputType | null
  }

  export type BlogPostTranslationMinAggregateOutputType = {
    id: string | null
    postId: string | null
    locale: $Enums.Locale | null
    title: string | null
    excerpt: string | null
    contentMarkdown: string | null
    seoTitle: string | null
    seoDescription: string | null
    coverImageAlt: string | null
    coverImageCaption: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BlogPostTranslationMaxAggregateOutputType = {
    id: string | null
    postId: string | null
    locale: $Enums.Locale | null
    title: string | null
    excerpt: string | null
    contentMarkdown: string | null
    seoTitle: string | null
    seoDescription: string | null
    coverImageAlt: string | null
    coverImageCaption: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BlogPostTranslationCountAggregateOutputType = {
    id: number
    postId: number
    locale: number
    title: number
    excerpt: number
    contentMarkdown: number
    seoTitle: number
    seoDescription: number
    coverImageAlt: number
    coverImageCaption: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type BlogPostTranslationMinAggregateInputType = {
    id?: true
    postId?: true
    locale?: true
    title?: true
    excerpt?: true
    contentMarkdown?: true
    seoTitle?: true
    seoDescription?: true
    coverImageAlt?: true
    coverImageCaption?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BlogPostTranslationMaxAggregateInputType = {
    id?: true
    postId?: true
    locale?: true
    title?: true
    excerpt?: true
    contentMarkdown?: true
    seoTitle?: true
    seoDescription?: true
    coverImageAlt?: true
    coverImageCaption?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BlogPostTranslationCountAggregateInputType = {
    id?: true
    postId?: true
    locale?: true
    title?: true
    excerpt?: true
    contentMarkdown?: true
    seoTitle?: true
    seoDescription?: true
    coverImageAlt?: true
    coverImageCaption?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type BlogPostTranslationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BlogPostTranslation to aggregate.
     */
    where?: BlogPostTranslationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BlogPostTranslations to fetch.
     */
    orderBy?: BlogPostTranslationOrderByWithRelationInput | BlogPostTranslationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BlogPostTranslationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BlogPostTranslations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BlogPostTranslations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned BlogPostTranslations
    **/
    _count?: true | BlogPostTranslationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BlogPostTranslationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BlogPostTranslationMaxAggregateInputType
  }

  export type GetBlogPostTranslationAggregateType<T extends BlogPostTranslationAggregateArgs> = {
        [P in keyof T & keyof AggregateBlogPostTranslation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBlogPostTranslation[P]>
      : GetScalarType<T[P], AggregateBlogPostTranslation[P]>
  }




  export type BlogPostTranslationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BlogPostTranslationWhereInput
    orderBy?: BlogPostTranslationOrderByWithAggregationInput | BlogPostTranslationOrderByWithAggregationInput[]
    by: BlogPostTranslationScalarFieldEnum[] | BlogPostTranslationScalarFieldEnum
    having?: BlogPostTranslationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BlogPostTranslationCountAggregateInputType | true
    _min?: BlogPostTranslationMinAggregateInputType
    _max?: BlogPostTranslationMaxAggregateInputType
  }

  export type BlogPostTranslationGroupByOutputType = {
    id: string
    postId: string
    locale: $Enums.Locale
    title: string
    excerpt: string | null
    contentMarkdown: string
    seoTitle: string | null
    seoDescription: string | null
    coverImageAlt: string | null
    coverImageCaption: string | null
    createdAt: Date
    updatedAt: Date
    _count: BlogPostTranslationCountAggregateOutputType | null
    _min: BlogPostTranslationMinAggregateOutputType | null
    _max: BlogPostTranslationMaxAggregateOutputType | null
  }

  type GetBlogPostTranslationGroupByPayload<T extends BlogPostTranslationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BlogPostTranslationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BlogPostTranslationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BlogPostTranslationGroupByOutputType[P]>
            : GetScalarType<T[P], BlogPostTranslationGroupByOutputType[P]>
        }
      >
    >


  export type BlogPostTranslationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    postId?: boolean
    locale?: boolean
    title?: boolean
    excerpt?: boolean
    contentMarkdown?: boolean
    seoTitle?: boolean
    seoDescription?: boolean
    coverImageAlt?: boolean
    coverImageCaption?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    post?: boolean | BlogPostDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["blogPostTranslation"]>

  export type BlogPostTranslationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    postId?: boolean
    locale?: boolean
    title?: boolean
    excerpt?: boolean
    contentMarkdown?: boolean
    seoTitle?: boolean
    seoDescription?: boolean
    coverImageAlt?: boolean
    coverImageCaption?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    post?: boolean | BlogPostDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["blogPostTranslation"]>

  export type BlogPostTranslationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    postId?: boolean
    locale?: boolean
    title?: boolean
    excerpt?: boolean
    contentMarkdown?: boolean
    seoTitle?: boolean
    seoDescription?: boolean
    coverImageAlt?: boolean
    coverImageCaption?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    post?: boolean | BlogPostDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["blogPostTranslation"]>

  export type BlogPostTranslationSelectScalar = {
    id?: boolean
    postId?: boolean
    locale?: boolean
    title?: boolean
    excerpt?: boolean
    contentMarkdown?: boolean
    seoTitle?: boolean
    seoDescription?: boolean
    coverImageAlt?: boolean
    coverImageCaption?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type BlogPostTranslationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "postId" | "locale" | "title" | "excerpt" | "contentMarkdown" | "seoTitle" | "seoDescription" | "coverImageAlt" | "coverImageCaption" | "createdAt" | "updatedAt", ExtArgs["result"]["blogPostTranslation"]>
  export type BlogPostTranslationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    post?: boolean | BlogPostDefaultArgs<ExtArgs>
  }
  export type BlogPostTranslationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    post?: boolean | BlogPostDefaultArgs<ExtArgs>
  }
  export type BlogPostTranslationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    post?: boolean | BlogPostDefaultArgs<ExtArgs>
  }

  export type $BlogPostTranslationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "BlogPostTranslation"
    objects: {
      post: Prisma.$BlogPostPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      postId: string
      locale: $Enums.Locale
      title: string
      excerpt: string | null
      contentMarkdown: string
      seoTitle: string | null
      seoDescription: string | null
      coverImageAlt: string | null
      coverImageCaption: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["blogPostTranslation"]>
    composites: {}
  }

  type BlogPostTranslationGetPayload<S extends boolean | null | undefined | BlogPostTranslationDefaultArgs> = $Result.GetResult<Prisma.$BlogPostTranslationPayload, S>

  type BlogPostTranslationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BlogPostTranslationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BlogPostTranslationCountAggregateInputType | true
    }

  export interface BlogPostTranslationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['BlogPostTranslation'], meta: { name: 'BlogPostTranslation' } }
    /**
     * Find zero or one BlogPostTranslation that matches the filter.
     * @param {BlogPostTranslationFindUniqueArgs} args - Arguments to find a BlogPostTranslation
     * @example
     * // Get one BlogPostTranslation
     * const blogPostTranslation = await prisma.blogPostTranslation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BlogPostTranslationFindUniqueArgs>(args: SelectSubset<T, BlogPostTranslationFindUniqueArgs<ExtArgs>>): Prisma__BlogPostTranslationClient<$Result.GetResult<Prisma.$BlogPostTranslationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one BlogPostTranslation that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BlogPostTranslationFindUniqueOrThrowArgs} args - Arguments to find a BlogPostTranslation
     * @example
     * // Get one BlogPostTranslation
     * const blogPostTranslation = await prisma.blogPostTranslation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BlogPostTranslationFindUniqueOrThrowArgs>(args: SelectSubset<T, BlogPostTranslationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BlogPostTranslationClient<$Result.GetResult<Prisma.$BlogPostTranslationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BlogPostTranslation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlogPostTranslationFindFirstArgs} args - Arguments to find a BlogPostTranslation
     * @example
     * // Get one BlogPostTranslation
     * const blogPostTranslation = await prisma.blogPostTranslation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BlogPostTranslationFindFirstArgs>(args?: SelectSubset<T, BlogPostTranslationFindFirstArgs<ExtArgs>>): Prisma__BlogPostTranslationClient<$Result.GetResult<Prisma.$BlogPostTranslationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BlogPostTranslation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlogPostTranslationFindFirstOrThrowArgs} args - Arguments to find a BlogPostTranslation
     * @example
     * // Get one BlogPostTranslation
     * const blogPostTranslation = await prisma.blogPostTranslation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BlogPostTranslationFindFirstOrThrowArgs>(args?: SelectSubset<T, BlogPostTranslationFindFirstOrThrowArgs<ExtArgs>>): Prisma__BlogPostTranslationClient<$Result.GetResult<Prisma.$BlogPostTranslationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more BlogPostTranslations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlogPostTranslationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all BlogPostTranslations
     * const blogPostTranslations = await prisma.blogPostTranslation.findMany()
     * 
     * // Get first 10 BlogPostTranslations
     * const blogPostTranslations = await prisma.blogPostTranslation.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const blogPostTranslationWithIdOnly = await prisma.blogPostTranslation.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BlogPostTranslationFindManyArgs>(args?: SelectSubset<T, BlogPostTranslationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BlogPostTranslationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a BlogPostTranslation.
     * @param {BlogPostTranslationCreateArgs} args - Arguments to create a BlogPostTranslation.
     * @example
     * // Create one BlogPostTranslation
     * const BlogPostTranslation = await prisma.blogPostTranslation.create({
     *   data: {
     *     // ... data to create a BlogPostTranslation
     *   }
     * })
     * 
     */
    create<T extends BlogPostTranslationCreateArgs>(args: SelectSubset<T, BlogPostTranslationCreateArgs<ExtArgs>>): Prisma__BlogPostTranslationClient<$Result.GetResult<Prisma.$BlogPostTranslationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many BlogPostTranslations.
     * @param {BlogPostTranslationCreateManyArgs} args - Arguments to create many BlogPostTranslations.
     * @example
     * // Create many BlogPostTranslations
     * const blogPostTranslation = await prisma.blogPostTranslation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BlogPostTranslationCreateManyArgs>(args?: SelectSubset<T, BlogPostTranslationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many BlogPostTranslations and returns the data saved in the database.
     * @param {BlogPostTranslationCreateManyAndReturnArgs} args - Arguments to create many BlogPostTranslations.
     * @example
     * // Create many BlogPostTranslations
     * const blogPostTranslation = await prisma.blogPostTranslation.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many BlogPostTranslations and only return the `id`
     * const blogPostTranslationWithIdOnly = await prisma.blogPostTranslation.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BlogPostTranslationCreateManyAndReturnArgs>(args?: SelectSubset<T, BlogPostTranslationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BlogPostTranslationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a BlogPostTranslation.
     * @param {BlogPostTranslationDeleteArgs} args - Arguments to delete one BlogPostTranslation.
     * @example
     * // Delete one BlogPostTranslation
     * const BlogPostTranslation = await prisma.blogPostTranslation.delete({
     *   where: {
     *     // ... filter to delete one BlogPostTranslation
     *   }
     * })
     * 
     */
    delete<T extends BlogPostTranslationDeleteArgs>(args: SelectSubset<T, BlogPostTranslationDeleteArgs<ExtArgs>>): Prisma__BlogPostTranslationClient<$Result.GetResult<Prisma.$BlogPostTranslationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one BlogPostTranslation.
     * @param {BlogPostTranslationUpdateArgs} args - Arguments to update one BlogPostTranslation.
     * @example
     * // Update one BlogPostTranslation
     * const blogPostTranslation = await prisma.blogPostTranslation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BlogPostTranslationUpdateArgs>(args: SelectSubset<T, BlogPostTranslationUpdateArgs<ExtArgs>>): Prisma__BlogPostTranslationClient<$Result.GetResult<Prisma.$BlogPostTranslationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more BlogPostTranslations.
     * @param {BlogPostTranslationDeleteManyArgs} args - Arguments to filter BlogPostTranslations to delete.
     * @example
     * // Delete a few BlogPostTranslations
     * const { count } = await prisma.blogPostTranslation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BlogPostTranslationDeleteManyArgs>(args?: SelectSubset<T, BlogPostTranslationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BlogPostTranslations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlogPostTranslationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many BlogPostTranslations
     * const blogPostTranslation = await prisma.blogPostTranslation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BlogPostTranslationUpdateManyArgs>(args: SelectSubset<T, BlogPostTranslationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BlogPostTranslations and returns the data updated in the database.
     * @param {BlogPostTranslationUpdateManyAndReturnArgs} args - Arguments to update many BlogPostTranslations.
     * @example
     * // Update many BlogPostTranslations
     * const blogPostTranslation = await prisma.blogPostTranslation.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more BlogPostTranslations and only return the `id`
     * const blogPostTranslationWithIdOnly = await prisma.blogPostTranslation.updateManyAndReturn({
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
    updateManyAndReturn<T extends BlogPostTranslationUpdateManyAndReturnArgs>(args: SelectSubset<T, BlogPostTranslationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BlogPostTranslationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one BlogPostTranslation.
     * @param {BlogPostTranslationUpsertArgs} args - Arguments to update or create a BlogPostTranslation.
     * @example
     * // Update or create a BlogPostTranslation
     * const blogPostTranslation = await prisma.blogPostTranslation.upsert({
     *   create: {
     *     // ... data to create a BlogPostTranslation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the BlogPostTranslation we want to update
     *   }
     * })
     */
    upsert<T extends BlogPostTranslationUpsertArgs>(args: SelectSubset<T, BlogPostTranslationUpsertArgs<ExtArgs>>): Prisma__BlogPostTranslationClient<$Result.GetResult<Prisma.$BlogPostTranslationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of BlogPostTranslations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlogPostTranslationCountArgs} args - Arguments to filter BlogPostTranslations to count.
     * @example
     * // Count the number of BlogPostTranslations
     * const count = await prisma.blogPostTranslation.count({
     *   where: {
     *     // ... the filter for the BlogPostTranslations we want to count
     *   }
     * })
    **/
    count<T extends BlogPostTranslationCountArgs>(
      args?: Subset<T, BlogPostTranslationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BlogPostTranslationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a BlogPostTranslation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlogPostTranslationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends BlogPostTranslationAggregateArgs>(args: Subset<T, BlogPostTranslationAggregateArgs>): Prisma.PrismaPromise<GetBlogPostTranslationAggregateType<T>>

    /**
     * Group by BlogPostTranslation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlogPostTranslationGroupByArgs} args - Group by arguments.
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
      T extends BlogPostTranslationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BlogPostTranslationGroupByArgs['orderBy'] }
        : { orderBy?: BlogPostTranslationGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, BlogPostTranslationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBlogPostTranslationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the BlogPostTranslation model
   */
  readonly fields: BlogPostTranslationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for BlogPostTranslation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BlogPostTranslationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    post<T extends BlogPostDefaultArgs<ExtArgs> = {}>(args?: Subset<T, BlogPostDefaultArgs<ExtArgs>>): Prisma__BlogPostClient<$Result.GetResult<Prisma.$BlogPostPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the BlogPostTranslation model
   */
  interface BlogPostTranslationFieldRefs {
    readonly id: FieldRef<"BlogPostTranslation", 'String'>
    readonly postId: FieldRef<"BlogPostTranslation", 'String'>
    readonly locale: FieldRef<"BlogPostTranslation", 'Locale'>
    readonly title: FieldRef<"BlogPostTranslation", 'String'>
    readonly excerpt: FieldRef<"BlogPostTranslation", 'String'>
    readonly contentMarkdown: FieldRef<"BlogPostTranslation", 'String'>
    readonly seoTitle: FieldRef<"BlogPostTranslation", 'String'>
    readonly seoDescription: FieldRef<"BlogPostTranslation", 'String'>
    readonly coverImageAlt: FieldRef<"BlogPostTranslation", 'String'>
    readonly coverImageCaption: FieldRef<"BlogPostTranslation", 'String'>
    readonly createdAt: FieldRef<"BlogPostTranslation", 'DateTime'>
    readonly updatedAt: FieldRef<"BlogPostTranslation", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * BlogPostTranslation findUnique
   */
  export type BlogPostTranslationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlogPostTranslation
     */
    select?: BlogPostTranslationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BlogPostTranslation
     */
    omit?: BlogPostTranslationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlogPostTranslationInclude<ExtArgs> | null
    /**
     * Filter, which BlogPostTranslation to fetch.
     */
    where: BlogPostTranslationWhereUniqueInput
  }

  /**
   * BlogPostTranslation findUniqueOrThrow
   */
  export type BlogPostTranslationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlogPostTranslation
     */
    select?: BlogPostTranslationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BlogPostTranslation
     */
    omit?: BlogPostTranslationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlogPostTranslationInclude<ExtArgs> | null
    /**
     * Filter, which BlogPostTranslation to fetch.
     */
    where: BlogPostTranslationWhereUniqueInput
  }

  /**
   * BlogPostTranslation findFirst
   */
  export type BlogPostTranslationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlogPostTranslation
     */
    select?: BlogPostTranslationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BlogPostTranslation
     */
    omit?: BlogPostTranslationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlogPostTranslationInclude<ExtArgs> | null
    /**
     * Filter, which BlogPostTranslation to fetch.
     */
    where?: BlogPostTranslationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BlogPostTranslations to fetch.
     */
    orderBy?: BlogPostTranslationOrderByWithRelationInput | BlogPostTranslationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BlogPostTranslations.
     */
    cursor?: BlogPostTranslationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BlogPostTranslations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BlogPostTranslations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BlogPostTranslations.
     */
    distinct?: BlogPostTranslationScalarFieldEnum | BlogPostTranslationScalarFieldEnum[]
  }

  /**
   * BlogPostTranslation findFirstOrThrow
   */
  export type BlogPostTranslationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlogPostTranslation
     */
    select?: BlogPostTranslationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BlogPostTranslation
     */
    omit?: BlogPostTranslationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlogPostTranslationInclude<ExtArgs> | null
    /**
     * Filter, which BlogPostTranslation to fetch.
     */
    where?: BlogPostTranslationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BlogPostTranslations to fetch.
     */
    orderBy?: BlogPostTranslationOrderByWithRelationInput | BlogPostTranslationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BlogPostTranslations.
     */
    cursor?: BlogPostTranslationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BlogPostTranslations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BlogPostTranslations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BlogPostTranslations.
     */
    distinct?: BlogPostTranslationScalarFieldEnum | BlogPostTranslationScalarFieldEnum[]
  }

  /**
   * BlogPostTranslation findMany
   */
  export type BlogPostTranslationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlogPostTranslation
     */
    select?: BlogPostTranslationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BlogPostTranslation
     */
    omit?: BlogPostTranslationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlogPostTranslationInclude<ExtArgs> | null
    /**
     * Filter, which BlogPostTranslations to fetch.
     */
    where?: BlogPostTranslationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BlogPostTranslations to fetch.
     */
    orderBy?: BlogPostTranslationOrderByWithRelationInput | BlogPostTranslationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing BlogPostTranslations.
     */
    cursor?: BlogPostTranslationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BlogPostTranslations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BlogPostTranslations.
     */
    skip?: number
    distinct?: BlogPostTranslationScalarFieldEnum | BlogPostTranslationScalarFieldEnum[]
  }

  /**
   * BlogPostTranslation create
   */
  export type BlogPostTranslationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlogPostTranslation
     */
    select?: BlogPostTranslationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BlogPostTranslation
     */
    omit?: BlogPostTranslationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlogPostTranslationInclude<ExtArgs> | null
    /**
     * The data needed to create a BlogPostTranslation.
     */
    data: XOR<BlogPostTranslationCreateInput, BlogPostTranslationUncheckedCreateInput>
  }

  /**
   * BlogPostTranslation createMany
   */
  export type BlogPostTranslationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many BlogPostTranslations.
     */
    data: BlogPostTranslationCreateManyInput | BlogPostTranslationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * BlogPostTranslation createManyAndReturn
   */
  export type BlogPostTranslationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlogPostTranslation
     */
    select?: BlogPostTranslationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BlogPostTranslation
     */
    omit?: BlogPostTranslationOmit<ExtArgs> | null
    /**
     * The data used to create many BlogPostTranslations.
     */
    data: BlogPostTranslationCreateManyInput | BlogPostTranslationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlogPostTranslationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * BlogPostTranslation update
   */
  export type BlogPostTranslationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlogPostTranslation
     */
    select?: BlogPostTranslationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BlogPostTranslation
     */
    omit?: BlogPostTranslationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlogPostTranslationInclude<ExtArgs> | null
    /**
     * The data needed to update a BlogPostTranslation.
     */
    data: XOR<BlogPostTranslationUpdateInput, BlogPostTranslationUncheckedUpdateInput>
    /**
     * Choose, which BlogPostTranslation to update.
     */
    where: BlogPostTranslationWhereUniqueInput
  }

  /**
   * BlogPostTranslation updateMany
   */
  export type BlogPostTranslationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update BlogPostTranslations.
     */
    data: XOR<BlogPostTranslationUpdateManyMutationInput, BlogPostTranslationUncheckedUpdateManyInput>
    /**
     * Filter which BlogPostTranslations to update
     */
    where?: BlogPostTranslationWhereInput
    /**
     * Limit how many BlogPostTranslations to update.
     */
    limit?: number
  }

  /**
   * BlogPostTranslation updateManyAndReturn
   */
  export type BlogPostTranslationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlogPostTranslation
     */
    select?: BlogPostTranslationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BlogPostTranslation
     */
    omit?: BlogPostTranslationOmit<ExtArgs> | null
    /**
     * The data used to update BlogPostTranslations.
     */
    data: XOR<BlogPostTranslationUpdateManyMutationInput, BlogPostTranslationUncheckedUpdateManyInput>
    /**
     * Filter which BlogPostTranslations to update
     */
    where?: BlogPostTranslationWhereInput
    /**
     * Limit how many BlogPostTranslations to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlogPostTranslationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * BlogPostTranslation upsert
   */
  export type BlogPostTranslationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlogPostTranslation
     */
    select?: BlogPostTranslationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BlogPostTranslation
     */
    omit?: BlogPostTranslationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlogPostTranslationInclude<ExtArgs> | null
    /**
     * The filter to search for the BlogPostTranslation to update in case it exists.
     */
    where: BlogPostTranslationWhereUniqueInput
    /**
     * In case the BlogPostTranslation found by the `where` argument doesn't exist, create a new BlogPostTranslation with this data.
     */
    create: XOR<BlogPostTranslationCreateInput, BlogPostTranslationUncheckedCreateInput>
    /**
     * In case the BlogPostTranslation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BlogPostTranslationUpdateInput, BlogPostTranslationUncheckedUpdateInput>
  }

  /**
   * BlogPostTranslation delete
   */
  export type BlogPostTranslationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlogPostTranslation
     */
    select?: BlogPostTranslationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BlogPostTranslation
     */
    omit?: BlogPostTranslationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlogPostTranslationInclude<ExtArgs> | null
    /**
     * Filter which BlogPostTranslation to delete.
     */
    where: BlogPostTranslationWhereUniqueInput
  }

  /**
   * BlogPostTranslation deleteMany
   */
  export type BlogPostTranslationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BlogPostTranslations to delete
     */
    where?: BlogPostTranslationWhereInput
    /**
     * Limit how many BlogPostTranslations to delete.
     */
    limit?: number
  }

  /**
   * BlogPostTranslation without action
   */
  export type BlogPostTranslationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlogPostTranslation
     */
    select?: BlogPostTranslationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BlogPostTranslation
     */
    omit?: BlogPostTranslationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlogPostTranslationInclude<ExtArgs> | null
  }


  /**
   * Model NewsletterSubscriber
   */

  export type AggregateNewsletterSubscriber = {
    _count: NewsletterSubscriberCountAggregateOutputType | null
    _min: NewsletterSubscriberMinAggregateOutputType | null
    _max: NewsletterSubscriberMaxAggregateOutputType | null
  }

  export type NewsletterSubscriberMinAggregateOutputType = {
    id: string | null
    email: string | null
    locale: $Enums.Locale | null
    status: $Enums.NewsletterSubscriberStatus | null
    source: string | null
    confirmationTokenHash: string | null
    unsubscribeToken: string | null
    ipHash: string | null
    userAgent: string | null
    consentAt: Date | null
    confirmedAt: Date | null
    unsubscribedAt: Date | null
    lastSentAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type NewsletterSubscriberMaxAggregateOutputType = {
    id: string | null
    email: string | null
    locale: $Enums.Locale | null
    status: $Enums.NewsletterSubscriberStatus | null
    source: string | null
    confirmationTokenHash: string | null
    unsubscribeToken: string | null
    ipHash: string | null
    userAgent: string | null
    consentAt: Date | null
    confirmedAt: Date | null
    unsubscribedAt: Date | null
    lastSentAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type NewsletterSubscriberCountAggregateOutputType = {
    id: number
    email: number
    locale: number
    status: number
    source: number
    confirmationTokenHash: number
    unsubscribeToken: number
    ipHash: number
    userAgent: number
    consentAt: number
    confirmedAt: number
    unsubscribedAt: number
    lastSentAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type NewsletterSubscriberMinAggregateInputType = {
    id?: true
    email?: true
    locale?: true
    status?: true
    source?: true
    confirmationTokenHash?: true
    unsubscribeToken?: true
    ipHash?: true
    userAgent?: true
    consentAt?: true
    confirmedAt?: true
    unsubscribedAt?: true
    lastSentAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type NewsletterSubscriberMaxAggregateInputType = {
    id?: true
    email?: true
    locale?: true
    status?: true
    source?: true
    confirmationTokenHash?: true
    unsubscribeToken?: true
    ipHash?: true
    userAgent?: true
    consentAt?: true
    confirmedAt?: true
    unsubscribedAt?: true
    lastSentAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type NewsletterSubscriberCountAggregateInputType = {
    id?: true
    email?: true
    locale?: true
    status?: true
    source?: true
    confirmationTokenHash?: true
    unsubscribeToken?: true
    ipHash?: true
    userAgent?: true
    consentAt?: true
    confirmedAt?: true
    unsubscribedAt?: true
    lastSentAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type NewsletterSubscriberAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which NewsletterSubscriber to aggregate.
     */
    where?: NewsletterSubscriberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NewsletterSubscribers to fetch.
     */
    orderBy?: NewsletterSubscriberOrderByWithRelationInput | NewsletterSubscriberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: NewsletterSubscriberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NewsletterSubscribers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NewsletterSubscribers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned NewsletterSubscribers
    **/
    _count?: true | NewsletterSubscriberCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: NewsletterSubscriberMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: NewsletterSubscriberMaxAggregateInputType
  }

  export type GetNewsletterSubscriberAggregateType<T extends NewsletterSubscriberAggregateArgs> = {
        [P in keyof T & keyof AggregateNewsletterSubscriber]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateNewsletterSubscriber[P]>
      : GetScalarType<T[P], AggregateNewsletterSubscriber[P]>
  }




  export type NewsletterSubscriberGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NewsletterSubscriberWhereInput
    orderBy?: NewsletterSubscriberOrderByWithAggregationInput | NewsletterSubscriberOrderByWithAggregationInput[]
    by: NewsletterSubscriberScalarFieldEnum[] | NewsletterSubscriberScalarFieldEnum
    having?: NewsletterSubscriberScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: NewsletterSubscriberCountAggregateInputType | true
    _min?: NewsletterSubscriberMinAggregateInputType
    _max?: NewsletterSubscriberMaxAggregateInputType
  }

  export type NewsletterSubscriberGroupByOutputType = {
    id: string
    email: string
    locale: $Enums.Locale
    status: $Enums.NewsletterSubscriberStatus
    source: string | null
    confirmationTokenHash: string | null
    unsubscribeToken: string
    ipHash: string | null
    userAgent: string | null
    consentAt: Date
    confirmedAt: Date | null
    unsubscribedAt: Date | null
    lastSentAt: Date | null
    createdAt: Date
    updatedAt: Date
    _count: NewsletterSubscriberCountAggregateOutputType | null
    _min: NewsletterSubscriberMinAggregateOutputType | null
    _max: NewsletterSubscriberMaxAggregateOutputType | null
  }

  type GetNewsletterSubscriberGroupByPayload<T extends NewsletterSubscriberGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<NewsletterSubscriberGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof NewsletterSubscriberGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], NewsletterSubscriberGroupByOutputType[P]>
            : GetScalarType<T[P], NewsletterSubscriberGroupByOutputType[P]>
        }
      >
    >


  export type NewsletterSubscriberSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    locale?: boolean
    status?: boolean
    source?: boolean
    confirmationTokenHash?: boolean
    unsubscribeToken?: boolean
    ipHash?: boolean
    userAgent?: boolean
    consentAt?: boolean
    confirmedAt?: boolean
    unsubscribedAt?: boolean
    lastSentAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    emailEvents?: boolean | NewsletterSubscriber$emailEventsArgs<ExtArgs>
    _count?: boolean | NewsletterSubscriberCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["newsletterSubscriber"]>

  export type NewsletterSubscriberSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    locale?: boolean
    status?: boolean
    source?: boolean
    confirmationTokenHash?: boolean
    unsubscribeToken?: boolean
    ipHash?: boolean
    userAgent?: boolean
    consentAt?: boolean
    confirmedAt?: boolean
    unsubscribedAt?: boolean
    lastSentAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["newsletterSubscriber"]>

  export type NewsletterSubscriberSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    locale?: boolean
    status?: boolean
    source?: boolean
    confirmationTokenHash?: boolean
    unsubscribeToken?: boolean
    ipHash?: boolean
    userAgent?: boolean
    consentAt?: boolean
    confirmedAt?: boolean
    unsubscribedAt?: boolean
    lastSentAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["newsletterSubscriber"]>

  export type NewsletterSubscriberSelectScalar = {
    id?: boolean
    email?: boolean
    locale?: boolean
    status?: boolean
    source?: boolean
    confirmationTokenHash?: boolean
    unsubscribeToken?: boolean
    ipHash?: boolean
    userAgent?: boolean
    consentAt?: boolean
    confirmedAt?: boolean
    unsubscribedAt?: boolean
    lastSentAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type NewsletterSubscriberOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "locale" | "status" | "source" | "confirmationTokenHash" | "unsubscribeToken" | "ipHash" | "userAgent" | "consentAt" | "confirmedAt" | "unsubscribedAt" | "lastSentAt" | "createdAt" | "updatedAt", ExtArgs["result"]["newsletterSubscriber"]>
  export type NewsletterSubscriberInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    emailEvents?: boolean | NewsletterSubscriber$emailEventsArgs<ExtArgs>
    _count?: boolean | NewsletterSubscriberCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type NewsletterSubscriberIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type NewsletterSubscriberIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $NewsletterSubscriberPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "NewsletterSubscriber"
    objects: {
      emailEvents: Prisma.$NewsletterEmailEventPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      locale: $Enums.Locale
      status: $Enums.NewsletterSubscriberStatus
      source: string | null
      confirmationTokenHash: string | null
      unsubscribeToken: string
      ipHash: string | null
      userAgent: string | null
      consentAt: Date
      confirmedAt: Date | null
      unsubscribedAt: Date | null
      lastSentAt: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["newsletterSubscriber"]>
    composites: {}
  }

  type NewsletterSubscriberGetPayload<S extends boolean | null | undefined | NewsletterSubscriberDefaultArgs> = $Result.GetResult<Prisma.$NewsletterSubscriberPayload, S>

  type NewsletterSubscriberCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<NewsletterSubscriberFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: NewsletterSubscriberCountAggregateInputType | true
    }

  export interface NewsletterSubscriberDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['NewsletterSubscriber'], meta: { name: 'NewsletterSubscriber' } }
    /**
     * Find zero or one NewsletterSubscriber that matches the filter.
     * @param {NewsletterSubscriberFindUniqueArgs} args - Arguments to find a NewsletterSubscriber
     * @example
     * // Get one NewsletterSubscriber
     * const newsletterSubscriber = await prisma.newsletterSubscriber.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends NewsletterSubscriberFindUniqueArgs>(args: SelectSubset<T, NewsletterSubscriberFindUniqueArgs<ExtArgs>>): Prisma__NewsletterSubscriberClient<$Result.GetResult<Prisma.$NewsletterSubscriberPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one NewsletterSubscriber that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {NewsletterSubscriberFindUniqueOrThrowArgs} args - Arguments to find a NewsletterSubscriber
     * @example
     * // Get one NewsletterSubscriber
     * const newsletterSubscriber = await prisma.newsletterSubscriber.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends NewsletterSubscriberFindUniqueOrThrowArgs>(args: SelectSubset<T, NewsletterSubscriberFindUniqueOrThrowArgs<ExtArgs>>): Prisma__NewsletterSubscriberClient<$Result.GetResult<Prisma.$NewsletterSubscriberPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first NewsletterSubscriber that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NewsletterSubscriberFindFirstArgs} args - Arguments to find a NewsletterSubscriber
     * @example
     * // Get one NewsletterSubscriber
     * const newsletterSubscriber = await prisma.newsletterSubscriber.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends NewsletterSubscriberFindFirstArgs>(args?: SelectSubset<T, NewsletterSubscriberFindFirstArgs<ExtArgs>>): Prisma__NewsletterSubscriberClient<$Result.GetResult<Prisma.$NewsletterSubscriberPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first NewsletterSubscriber that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NewsletterSubscriberFindFirstOrThrowArgs} args - Arguments to find a NewsletterSubscriber
     * @example
     * // Get one NewsletterSubscriber
     * const newsletterSubscriber = await prisma.newsletterSubscriber.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends NewsletterSubscriberFindFirstOrThrowArgs>(args?: SelectSubset<T, NewsletterSubscriberFindFirstOrThrowArgs<ExtArgs>>): Prisma__NewsletterSubscriberClient<$Result.GetResult<Prisma.$NewsletterSubscriberPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more NewsletterSubscribers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NewsletterSubscriberFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all NewsletterSubscribers
     * const newsletterSubscribers = await prisma.newsletterSubscriber.findMany()
     * 
     * // Get first 10 NewsletterSubscribers
     * const newsletterSubscribers = await prisma.newsletterSubscriber.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const newsletterSubscriberWithIdOnly = await prisma.newsletterSubscriber.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends NewsletterSubscriberFindManyArgs>(args?: SelectSubset<T, NewsletterSubscriberFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NewsletterSubscriberPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a NewsletterSubscriber.
     * @param {NewsletterSubscriberCreateArgs} args - Arguments to create a NewsletterSubscriber.
     * @example
     * // Create one NewsletterSubscriber
     * const NewsletterSubscriber = await prisma.newsletterSubscriber.create({
     *   data: {
     *     // ... data to create a NewsletterSubscriber
     *   }
     * })
     * 
     */
    create<T extends NewsletterSubscriberCreateArgs>(args: SelectSubset<T, NewsletterSubscriberCreateArgs<ExtArgs>>): Prisma__NewsletterSubscriberClient<$Result.GetResult<Prisma.$NewsletterSubscriberPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many NewsletterSubscribers.
     * @param {NewsletterSubscriberCreateManyArgs} args - Arguments to create many NewsletterSubscribers.
     * @example
     * // Create many NewsletterSubscribers
     * const newsletterSubscriber = await prisma.newsletterSubscriber.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends NewsletterSubscriberCreateManyArgs>(args?: SelectSubset<T, NewsletterSubscriberCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many NewsletterSubscribers and returns the data saved in the database.
     * @param {NewsletterSubscriberCreateManyAndReturnArgs} args - Arguments to create many NewsletterSubscribers.
     * @example
     * // Create many NewsletterSubscribers
     * const newsletterSubscriber = await prisma.newsletterSubscriber.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many NewsletterSubscribers and only return the `id`
     * const newsletterSubscriberWithIdOnly = await prisma.newsletterSubscriber.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends NewsletterSubscriberCreateManyAndReturnArgs>(args?: SelectSubset<T, NewsletterSubscriberCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NewsletterSubscriberPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a NewsletterSubscriber.
     * @param {NewsletterSubscriberDeleteArgs} args - Arguments to delete one NewsletterSubscriber.
     * @example
     * // Delete one NewsletterSubscriber
     * const NewsletterSubscriber = await prisma.newsletterSubscriber.delete({
     *   where: {
     *     // ... filter to delete one NewsletterSubscriber
     *   }
     * })
     * 
     */
    delete<T extends NewsletterSubscriberDeleteArgs>(args: SelectSubset<T, NewsletterSubscriberDeleteArgs<ExtArgs>>): Prisma__NewsletterSubscriberClient<$Result.GetResult<Prisma.$NewsletterSubscriberPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one NewsletterSubscriber.
     * @param {NewsletterSubscriberUpdateArgs} args - Arguments to update one NewsletterSubscriber.
     * @example
     * // Update one NewsletterSubscriber
     * const newsletterSubscriber = await prisma.newsletterSubscriber.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends NewsletterSubscriberUpdateArgs>(args: SelectSubset<T, NewsletterSubscriberUpdateArgs<ExtArgs>>): Prisma__NewsletterSubscriberClient<$Result.GetResult<Prisma.$NewsletterSubscriberPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more NewsletterSubscribers.
     * @param {NewsletterSubscriberDeleteManyArgs} args - Arguments to filter NewsletterSubscribers to delete.
     * @example
     * // Delete a few NewsletterSubscribers
     * const { count } = await prisma.newsletterSubscriber.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends NewsletterSubscriberDeleteManyArgs>(args?: SelectSubset<T, NewsletterSubscriberDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more NewsletterSubscribers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NewsletterSubscriberUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many NewsletterSubscribers
     * const newsletterSubscriber = await prisma.newsletterSubscriber.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends NewsletterSubscriberUpdateManyArgs>(args: SelectSubset<T, NewsletterSubscriberUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more NewsletterSubscribers and returns the data updated in the database.
     * @param {NewsletterSubscriberUpdateManyAndReturnArgs} args - Arguments to update many NewsletterSubscribers.
     * @example
     * // Update many NewsletterSubscribers
     * const newsletterSubscriber = await prisma.newsletterSubscriber.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more NewsletterSubscribers and only return the `id`
     * const newsletterSubscriberWithIdOnly = await prisma.newsletterSubscriber.updateManyAndReturn({
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
    updateManyAndReturn<T extends NewsletterSubscriberUpdateManyAndReturnArgs>(args: SelectSubset<T, NewsletterSubscriberUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NewsletterSubscriberPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one NewsletterSubscriber.
     * @param {NewsletterSubscriberUpsertArgs} args - Arguments to update or create a NewsletterSubscriber.
     * @example
     * // Update or create a NewsletterSubscriber
     * const newsletterSubscriber = await prisma.newsletterSubscriber.upsert({
     *   create: {
     *     // ... data to create a NewsletterSubscriber
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the NewsletterSubscriber we want to update
     *   }
     * })
     */
    upsert<T extends NewsletterSubscriberUpsertArgs>(args: SelectSubset<T, NewsletterSubscriberUpsertArgs<ExtArgs>>): Prisma__NewsletterSubscriberClient<$Result.GetResult<Prisma.$NewsletterSubscriberPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of NewsletterSubscribers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NewsletterSubscriberCountArgs} args - Arguments to filter NewsletterSubscribers to count.
     * @example
     * // Count the number of NewsletterSubscribers
     * const count = await prisma.newsletterSubscriber.count({
     *   where: {
     *     // ... the filter for the NewsletterSubscribers we want to count
     *   }
     * })
    **/
    count<T extends NewsletterSubscriberCountArgs>(
      args?: Subset<T, NewsletterSubscriberCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], NewsletterSubscriberCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a NewsletterSubscriber.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NewsletterSubscriberAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends NewsletterSubscriberAggregateArgs>(args: Subset<T, NewsletterSubscriberAggregateArgs>): Prisma.PrismaPromise<GetNewsletterSubscriberAggregateType<T>>

    /**
     * Group by NewsletterSubscriber.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NewsletterSubscriberGroupByArgs} args - Group by arguments.
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
      T extends NewsletterSubscriberGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: NewsletterSubscriberGroupByArgs['orderBy'] }
        : { orderBy?: NewsletterSubscriberGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, NewsletterSubscriberGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNewsletterSubscriberGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the NewsletterSubscriber model
   */
  readonly fields: NewsletterSubscriberFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for NewsletterSubscriber.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__NewsletterSubscriberClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    emailEvents<T extends NewsletterSubscriber$emailEventsArgs<ExtArgs> = {}>(args?: Subset<T, NewsletterSubscriber$emailEventsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NewsletterEmailEventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the NewsletterSubscriber model
   */
  interface NewsletterSubscriberFieldRefs {
    readonly id: FieldRef<"NewsletterSubscriber", 'String'>
    readonly email: FieldRef<"NewsletterSubscriber", 'String'>
    readonly locale: FieldRef<"NewsletterSubscriber", 'Locale'>
    readonly status: FieldRef<"NewsletterSubscriber", 'NewsletterSubscriberStatus'>
    readonly source: FieldRef<"NewsletterSubscriber", 'String'>
    readonly confirmationTokenHash: FieldRef<"NewsletterSubscriber", 'String'>
    readonly unsubscribeToken: FieldRef<"NewsletterSubscriber", 'String'>
    readonly ipHash: FieldRef<"NewsletterSubscriber", 'String'>
    readonly userAgent: FieldRef<"NewsletterSubscriber", 'String'>
    readonly consentAt: FieldRef<"NewsletterSubscriber", 'DateTime'>
    readonly confirmedAt: FieldRef<"NewsletterSubscriber", 'DateTime'>
    readonly unsubscribedAt: FieldRef<"NewsletterSubscriber", 'DateTime'>
    readonly lastSentAt: FieldRef<"NewsletterSubscriber", 'DateTime'>
    readonly createdAt: FieldRef<"NewsletterSubscriber", 'DateTime'>
    readonly updatedAt: FieldRef<"NewsletterSubscriber", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * NewsletterSubscriber findUnique
   */
  export type NewsletterSubscriberFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsletterSubscriber
     */
    select?: NewsletterSubscriberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NewsletterSubscriber
     */
    omit?: NewsletterSubscriberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NewsletterSubscriberInclude<ExtArgs> | null
    /**
     * Filter, which NewsletterSubscriber to fetch.
     */
    where: NewsletterSubscriberWhereUniqueInput
  }

  /**
   * NewsletterSubscriber findUniqueOrThrow
   */
  export type NewsletterSubscriberFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsletterSubscriber
     */
    select?: NewsletterSubscriberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NewsletterSubscriber
     */
    omit?: NewsletterSubscriberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NewsletterSubscriberInclude<ExtArgs> | null
    /**
     * Filter, which NewsletterSubscriber to fetch.
     */
    where: NewsletterSubscriberWhereUniqueInput
  }

  /**
   * NewsletterSubscriber findFirst
   */
  export type NewsletterSubscriberFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsletterSubscriber
     */
    select?: NewsletterSubscriberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NewsletterSubscriber
     */
    omit?: NewsletterSubscriberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NewsletterSubscriberInclude<ExtArgs> | null
    /**
     * Filter, which NewsletterSubscriber to fetch.
     */
    where?: NewsletterSubscriberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NewsletterSubscribers to fetch.
     */
    orderBy?: NewsletterSubscriberOrderByWithRelationInput | NewsletterSubscriberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for NewsletterSubscribers.
     */
    cursor?: NewsletterSubscriberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NewsletterSubscribers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NewsletterSubscribers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of NewsletterSubscribers.
     */
    distinct?: NewsletterSubscriberScalarFieldEnum | NewsletterSubscriberScalarFieldEnum[]
  }

  /**
   * NewsletterSubscriber findFirstOrThrow
   */
  export type NewsletterSubscriberFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsletterSubscriber
     */
    select?: NewsletterSubscriberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NewsletterSubscriber
     */
    omit?: NewsletterSubscriberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NewsletterSubscriberInclude<ExtArgs> | null
    /**
     * Filter, which NewsletterSubscriber to fetch.
     */
    where?: NewsletterSubscriberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NewsletterSubscribers to fetch.
     */
    orderBy?: NewsletterSubscriberOrderByWithRelationInput | NewsletterSubscriberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for NewsletterSubscribers.
     */
    cursor?: NewsletterSubscriberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NewsletterSubscribers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NewsletterSubscribers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of NewsletterSubscribers.
     */
    distinct?: NewsletterSubscriberScalarFieldEnum | NewsletterSubscriberScalarFieldEnum[]
  }

  /**
   * NewsletterSubscriber findMany
   */
  export type NewsletterSubscriberFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsletterSubscriber
     */
    select?: NewsletterSubscriberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NewsletterSubscriber
     */
    omit?: NewsletterSubscriberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NewsletterSubscriberInclude<ExtArgs> | null
    /**
     * Filter, which NewsletterSubscribers to fetch.
     */
    where?: NewsletterSubscriberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NewsletterSubscribers to fetch.
     */
    orderBy?: NewsletterSubscriberOrderByWithRelationInput | NewsletterSubscriberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing NewsletterSubscribers.
     */
    cursor?: NewsletterSubscriberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NewsletterSubscribers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NewsletterSubscribers.
     */
    skip?: number
    distinct?: NewsletterSubscriberScalarFieldEnum | NewsletterSubscriberScalarFieldEnum[]
  }

  /**
   * NewsletterSubscriber create
   */
  export type NewsletterSubscriberCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsletterSubscriber
     */
    select?: NewsletterSubscriberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NewsletterSubscriber
     */
    omit?: NewsletterSubscriberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NewsletterSubscriberInclude<ExtArgs> | null
    /**
     * The data needed to create a NewsletterSubscriber.
     */
    data: XOR<NewsletterSubscriberCreateInput, NewsletterSubscriberUncheckedCreateInput>
  }

  /**
   * NewsletterSubscriber createMany
   */
  export type NewsletterSubscriberCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many NewsletterSubscribers.
     */
    data: NewsletterSubscriberCreateManyInput | NewsletterSubscriberCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * NewsletterSubscriber createManyAndReturn
   */
  export type NewsletterSubscriberCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsletterSubscriber
     */
    select?: NewsletterSubscriberSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the NewsletterSubscriber
     */
    omit?: NewsletterSubscriberOmit<ExtArgs> | null
    /**
     * The data used to create many NewsletterSubscribers.
     */
    data: NewsletterSubscriberCreateManyInput | NewsletterSubscriberCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * NewsletterSubscriber update
   */
  export type NewsletterSubscriberUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsletterSubscriber
     */
    select?: NewsletterSubscriberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NewsletterSubscriber
     */
    omit?: NewsletterSubscriberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NewsletterSubscriberInclude<ExtArgs> | null
    /**
     * The data needed to update a NewsletterSubscriber.
     */
    data: XOR<NewsletterSubscriberUpdateInput, NewsletterSubscriberUncheckedUpdateInput>
    /**
     * Choose, which NewsletterSubscriber to update.
     */
    where: NewsletterSubscriberWhereUniqueInput
  }

  /**
   * NewsletterSubscriber updateMany
   */
  export type NewsletterSubscriberUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update NewsletterSubscribers.
     */
    data: XOR<NewsletterSubscriberUpdateManyMutationInput, NewsletterSubscriberUncheckedUpdateManyInput>
    /**
     * Filter which NewsletterSubscribers to update
     */
    where?: NewsletterSubscriberWhereInput
    /**
     * Limit how many NewsletterSubscribers to update.
     */
    limit?: number
  }

  /**
   * NewsletterSubscriber updateManyAndReturn
   */
  export type NewsletterSubscriberUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsletterSubscriber
     */
    select?: NewsletterSubscriberSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the NewsletterSubscriber
     */
    omit?: NewsletterSubscriberOmit<ExtArgs> | null
    /**
     * The data used to update NewsletterSubscribers.
     */
    data: XOR<NewsletterSubscriberUpdateManyMutationInput, NewsletterSubscriberUncheckedUpdateManyInput>
    /**
     * Filter which NewsletterSubscribers to update
     */
    where?: NewsletterSubscriberWhereInput
    /**
     * Limit how many NewsletterSubscribers to update.
     */
    limit?: number
  }

  /**
   * NewsletterSubscriber upsert
   */
  export type NewsletterSubscriberUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsletterSubscriber
     */
    select?: NewsletterSubscriberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NewsletterSubscriber
     */
    omit?: NewsletterSubscriberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NewsletterSubscriberInclude<ExtArgs> | null
    /**
     * The filter to search for the NewsletterSubscriber to update in case it exists.
     */
    where: NewsletterSubscriberWhereUniqueInput
    /**
     * In case the NewsletterSubscriber found by the `where` argument doesn't exist, create a new NewsletterSubscriber with this data.
     */
    create: XOR<NewsletterSubscriberCreateInput, NewsletterSubscriberUncheckedCreateInput>
    /**
     * In case the NewsletterSubscriber was found with the provided `where` argument, update it with this data.
     */
    update: XOR<NewsletterSubscriberUpdateInput, NewsletterSubscriberUncheckedUpdateInput>
  }

  /**
   * NewsletterSubscriber delete
   */
  export type NewsletterSubscriberDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsletterSubscriber
     */
    select?: NewsletterSubscriberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NewsletterSubscriber
     */
    omit?: NewsletterSubscriberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NewsletterSubscriberInclude<ExtArgs> | null
    /**
     * Filter which NewsletterSubscriber to delete.
     */
    where: NewsletterSubscriberWhereUniqueInput
  }

  /**
   * NewsletterSubscriber deleteMany
   */
  export type NewsletterSubscriberDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which NewsletterSubscribers to delete
     */
    where?: NewsletterSubscriberWhereInput
    /**
     * Limit how many NewsletterSubscribers to delete.
     */
    limit?: number
  }

  /**
   * NewsletterSubscriber.emailEvents
   */
  export type NewsletterSubscriber$emailEventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsletterEmailEvent
     */
    select?: NewsletterEmailEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NewsletterEmailEvent
     */
    omit?: NewsletterEmailEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NewsletterEmailEventInclude<ExtArgs> | null
    where?: NewsletterEmailEventWhereInput
    orderBy?: NewsletterEmailEventOrderByWithRelationInput | NewsletterEmailEventOrderByWithRelationInput[]
    cursor?: NewsletterEmailEventWhereUniqueInput
    take?: number
    skip?: number
    distinct?: NewsletterEmailEventScalarFieldEnum | NewsletterEmailEventScalarFieldEnum[]
  }

  /**
   * NewsletterSubscriber without action
   */
  export type NewsletterSubscriberDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsletterSubscriber
     */
    select?: NewsletterSubscriberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NewsletterSubscriber
     */
    omit?: NewsletterSubscriberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NewsletterSubscriberInclude<ExtArgs> | null
  }


  /**
   * Model NewsletterPostSend
   */

  export type AggregateNewsletterPostSend = {
    _count: NewsletterPostSendCountAggregateOutputType | null
    _avg: NewsletterPostSendAvgAggregateOutputType | null
    _sum: NewsletterPostSendSumAggregateOutputType | null
    _min: NewsletterPostSendMinAggregateOutputType | null
    _max: NewsletterPostSendMaxAggregateOutputType | null
  }

  export type NewsletterPostSendAvgAggregateOutputType = {
    recipientCount: number | null
    sentCount: number | null
    failedCount: number | null
  }

  export type NewsletterPostSendSumAggregateOutputType = {
    recipientCount: number | null
    sentCount: number | null
    failedCount: number | null
  }

  export type NewsletterPostSendMinAggregateOutputType = {
    id: string | null
    postId: string | null
    status: $Enums.NewsletterPostSendStatus | null
    recipientCount: number | null
    sentCount: number | null
    failedCount: number | null
    errorMessage: string | null
    startedAt: Date | null
    completedAt: Date | null
    createdAt: Date | null
  }

  export type NewsletterPostSendMaxAggregateOutputType = {
    id: string | null
    postId: string | null
    status: $Enums.NewsletterPostSendStatus | null
    recipientCount: number | null
    sentCount: number | null
    failedCount: number | null
    errorMessage: string | null
    startedAt: Date | null
    completedAt: Date | null
    createdAt: Date | null
  }

  export type NewsletterPostSendCountAggregateOutputType = {
    id: number
    postId: number
    status: number
    recipientCount: number
    sentCount: number
    failedCount: number
    errorMessage: number
    startedAt: number
    completedAt: number
    createdAt: number
    _all: number
  }


  export type NewsletterPostSendAvgAggregateInputType = {
    recipientCount?: true
    sentCount?: true
    failedCount?: true
  }

  export type NewsletterPostSendSumAggregateInputType = {
    recipientCount?: true
    sentCount?: true
    failedCount?: true
  }

  export type NewsletterPostSendMinAggregateInputType = {
    id?: true
    postId?: true
    status?: true
    recipientCount?: true
    sentCount?: true
    failedCount?: true
    errorMessage?: true
    startedAt?: true
    completedAt?: true
    createdAt?: true
  }

  export type NewsletterPostSendMaxAggregateInputType = {
    id?: true
    postId?: true
    status?: true
    recipientCount?: true
    sentCount?: true
    failedCount?: true
    errorMessage?: true
    startedAt?: true
    completedAt?: true
    createdAt?: true
  }

  export type NewsletterPostSendCountAggregateInputType = {
    id?: true
    postId?: true
    status?: true
    recipientCount?: true
    sentCount?: true
    failedCount?: true
    errorMessage?: true
    startedAt?: true
    completedAt?: true
    createdAt?: true
    _all?: true
  }

  export type NewsletterPostSendAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which NewsletterPostSend to aggregate.
     */
    where?: NewsletterPostSendWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NewsletterPostSends to fetch.
     */
    orderBy?: NewsletterPostSendOrderByWithRelationInput | NewsletterPostSendOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: NewsletterPostSendWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NewsletterPostSends from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NewsletterPostSends.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned NewsletterPostSends
    **/
    _count?: true | NewsletterPostSendCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: NewsletterPostSendAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: NewsletterPostSendSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: NewsletterPostSendMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: NewsletterPostSendMaxAggregateInputType
  }

  export type GetNewsletterPostSendAggregateType<T extends NewsletterPostSendAggregateArgs> = {
        [P in keyof T & keyof AggregateNewsletterPostSend]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateNewsletterPostSend[P]>
      : GetScalarType<T[P], AggregateNewsletterPostSend[P]>
  }




  export type NewsletterPostSendGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NewsletterPostSendWhereInput
    orderBy?: NewsletterPostSendOrderByWithAggregationInput | NewsletterPostSendOrderByWithAggregationInput[]
    by: NewsletterPostSendScalarFieldEnum[] | NewsletterPostSendScalarFieldEnum
    having?: NewsletterPostSendScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: NewsletterPostSendCountAggregateInputType | true
    _avg?: NewsletterPostSendAvgAggregateInputType
    _sum?: NewsletterPostSendSumAggregateInputType
    _min?: NewsletterPostSendMinAggregateInputType
    _max?: NewsletterPostSendMaxAggregateInputType
  }

  export type NewsletterPostSendGroupByOutputType = {
    id: string
    postId: string
    status: $Enums.NewsletterPostSendStatus
    recipientCount: number
    sentCount: number
    failedCount: number
    errorMessage: string | null
    startedAt: Date
    completedAt: Date | null
    createdAt: Date
    _count: NewsletterPostSendCountAggregateOutputType | null
    _avg: NewsletterPostSendAvgAggregateOutputType | null
    _sum: NewsletterPostSendSumAggregateOutputType | null
    _min: NewsletterPostSendMinAggregateOutputType | null
    _max: NewsletterPostSendMaxAggregateOutputType | null
  }

  type GetNewsletterPostSendGroupByPayload<T extends NewsletterPostSendGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<NewsletterPostSendGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof NewsletterPostSendGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], NewsletterPostSendGroupByOutputType[P]>
            : GetScalarType<T[P], NewsletterPostSendGroupByOutputType[P]>
        }
      >
    >


  export type NewsletterPostSendSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    postId?: boolean
    status?: boolean
    recipientCount?: boolean
    sentCount?: boolean
    failedCount?: boolean
    errorMessage?: boolean
    startedAt?: boolean
    completedAt?: boolean
    createdAt?: boolean
    post?: boolean | BlogPostDefaultArgs<ExtArgs>
    emailEvents?: boolean | NewsletterPostSend$emailEventsArgs<ExtArgs>
    _count?: boolean | NewsletterPostSendCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["newsletterPostSend"]>

  export type NewsletterPostSendSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    postId?: boolean
    status?: boolean
    recipientCount?: boolean
    sentCount?: boolean
    failedCount?: boolean
    errorMessage?: boolean
    startedAt?: boolean
    completedAt?: boolean
    createdAt?: boolean
    post?: boolean | BlogPostDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["newsletterPostSend"]>

  export type NewsletterPostSendSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    postId?: boolean
    status?: boolean
    recipientCount?: boolean
    sentCount?: boolean
    failedCount?: boolean
    errorMessage?: boolean
    startedAt?: boolean
    completedAt?: boolean
    createdAt?: boolean
    post?: boolean | BlogPostDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["newsletterPostSend"]>

  export type NewsletterPostSendSelectScalar = {
    id?: boolean
    postId?: boolean
    status?: boolean
    recipientCount?: boolean
    sentCount?: boolean
    failedCount?: boolean
    errorMessage?: boolean
    startedAt?: boolean
    completedAt?: boolean
    createdAt?: boolean
  }

  export type NewsletterPostSendOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "postId" | "status" | "recipientCount" | "sentCount" | "failedCount" | "errorMessage" | "startedAt" | "completedAt" | "createdAt", ExtArgs["result"]["newsletterPostSend"]>
  export type NewsletterPostSendInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    post?: boolean | BlogPostDefaultArgs<ExtArgs>
    emailEvents?: boolean | NewsletterPostSend$emailEventsArgs<ExtArgs>
    _count?: boolean | NewsletterPostSendCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type NewsletterPostSendIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    post?: boolean | BlogPostDefaultArgs<ExtArgs>
  }
  export type NewsletterPostSendIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    post?: boolean | BlogPostDefaultArgs<ExtArgs>
  }

  export type $NewsletterPostSendPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "NewsletterPostSend"
    objects: {
      post: Prisma.$BlogPostPayload<ExtArgs>
      emailEvents: Prisma.$NewsletterEmailEventPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      postId: string
      status: $Enums.NewsletterPostSendStatus
      recipientCount: number
      sentCount: number
      failedCount: number
      errorMessage: string | null
      startedAt: Date
      completedAt: Date | null
      createdAt: Date
    }, ExtArgs["result"]["newsletterPostSend"]>
    composites: {}
  }

  type NewsletterPostSendGetPayload<S extends boolean | null | undefined | NewsletterPostSendDefaultArgs> = $Result.GetResult<Prisma.$NewsletterPostSendPayload, S>

  type NewsletterPostSendCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<NewsletterPostSendFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: NewsletterPostSendCountAggregateInputType | true
    }

  export interface NewsletterPostSendDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['NewsletterPostSend'], meta: { name: 'NewsletterPostSend' } }
    /**
     * Find zero or one NewsletterPostSend that matches the filter.
     * @param {NewsletterPostSendFindUniqueArgs} args - Arguments to find a NewsletterPostSend
     * @example
     * // Get one NewsletterPostSend
     * const newsletterPostSend = await prisma.newsletterPostSend.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends NewsletterPostSendFindUniqueArgs>(args: SelectSubset<T, NewsletterPostSendFindUniqueArgs<ExtArgs>>): Prisma__NewsletterPostSendClient<$Result.GetResult<Prisma.$NewsletterPostSendPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one NewsletterPostSend that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {NewsletterPostSendFindUniqueOrThrowArgs} args - Arguments to find a NewsletterPostSend
     * @example
     * // Get one NewsletterPostSend
     * const newsletterPostSend = await prisma.newsletterPostSend.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends NewsletterPostSendFindUniqueOrThrowArgs>(args: SelectSubset<T, NewsletterPostSendFindUniqueOrThrowArgs<ExtArgs>>): Prisma__NewsletterPostSendClient<$Result.GetResult<Prisma.$NewsletterPostSendPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first NewsletterPostSend that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NewsletterPostSendFindFirstArgs} args - Arguments to find a NewsletterPostSend
     * @example
     * // Get one NewsletterPostSend
     * const newsletterPostSend = await prisma.newsletterPostSend.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends NewsletterPostSendFindFirstArgs>(args?: SelectSubset<T, NewsletterPostSendFindFirstArgs<ExtArgs>>): Prisma__NewsletterPostSendClient<$Result.GetResult<Prisma.$NewsletterPostSendPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first NewsletterPostSend that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NewsletterPostSendFindFirstOrThrowArgs} args - Arguments to find a NewsletterPostSend
     * @example
     * // Get one NewsletterPostSend
     * const newsletterPostSend = await prisma.newsletterPostSend.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends NewsletterPostSendFindFirstOrThrowArgs>(args?: SelectSubset<T, NewsletterPostSendFindFirstOrThrowArgs<ExtArgs>>): Prisma__NewsletterPostSendClient<$Result.GetResult<Prisma.$NewsletterPostSendPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more NewsletterPostSends that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NewsletterPostSendFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all NewsletterPostSends
     * const newsletterPostSends = await prisma.newsletterPostSend.findMany()
     * 
     * // Get first 10 NewsletterPostSends
     * const newsletterPostSends = await prisma.newsletterPostSend.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const newsletterPostSendWithIdOnly = await prisma.newsletterPostSend.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends NewsletterPostSendFindManyArgs>(args?: SelectSubset<T, NewsletterPostSendFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NewsletterPostSendPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a NewsletterPostSend.
     * @param {NewsletterPostSendCreateArgs} args - Arguments to create a NewsletterPostSend.
     * @example
     * // Create one NewsletterPostSend
     * const NewsletterPostSend = await prisma.newsletterPostSend.create({
     *   data: {
     *     // ... data to create a NewsletterPostSend
     *   }
     * })
     * 
     */
    create<T extends NewsletterPostSendCreateArgs>(args: SelectSubset<T, NewsletterPostSendCreateArgs<ExtArgs>>): Prisma__NewsletterPostSendClient<$Result.GetResult<Prisma.$NewsletterPostSendPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many NewsletterPostSends.
     * @param {NewsletterPostSendCreateManyArgs} args - Arguments to create many NewsletterPostSends.
     * @example
     * // Create many NewsletterPostSends
     * const newsletterPostSend = await prisma.newsletterPostSend.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends NewsletterPostSendCreateManyArgs>(args?: SelectSubset<T, NewsletterPostSendCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many NewsletterPostSends and returns the data saved in the database.
     * @param {NewsletterPostSendCreateManyAndReturnArgs} args - Arguments to create many NewsletterPostSends.
     * @example
     * // Create many NewsletterPostSends
     * const newsletterPostSend = await prisma.newsletterPostSend.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many NewsletterPostSends and only return the `id`
     * const newsletterPostSendWithIdOnly = await prisma.newsletterPostSend.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends NewsletterPostSendCreateManyAndReturnArgs>(args?: SelectSubset<T, NewsletterPostSendCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NewsletterPostSendPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a NewsletterPostSend.
     * @param {NewsletterPostSendDeleteArgs} args - Arguments to delete one NewsletterPostSend.
     * @example
     * // Delete one NewsletterPostSend
     * const NewsletterPostSend = await prisma.newsletterPostSend.delete({
     *   where: {
     *     // ... filter to delete one NewsletterPostSend
     *   }
     * })
     * 
     */
    delete<T extends NewsletterPostSendDeleteArgs>(args: SelectSubset<T, NewsletterPostSendDeleteArgs<ExtArgs>>): Prisma__NewsletterPostSendClient<$Result.GetResult<Prisma.$NewsletterPostSendPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one NewsletterPostSend.
     * @param {NewsletterPostSendUpdateArgs} args - Arguments to update one NewsletterPostSend.
     * @example
     * // Update one NewsletterPostSend
     * const newsletterPostSend = await prisma.newsletterPostSend.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends NewsletterPostSendUpdateArgs>(args: SelectSubset<T, NewsletterPostSendUpdateArgs<ExtArgs>>): Prisma__NewsletterPostSendClient<$Result.GetResult<Prisma.$NewsletterPostSendPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more NewsletterPostSends.
     * @param {NewsletterPostSendDeleteManyArgs} args - Arguments to filter NewsletterPostSends to delete.
     * @example
     * // Delete a few NewsletterPostSends
     * const { count } = await prisma.newsletterPostSend.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends NewsletterPostSendDeleteManyArgs>(args?: SelectSubset<T, NewsletterPostSendDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more NewsletterPostSends.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NewsletterPostSendUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many NewsletterPostSends
     * const newsletterPostSend = await prisma.newsletterPostSend.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends NewsletterPostSendUpdateManyArgs>(args: SelectSubset<T, NewsletterPostSendUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more NewsletterPostSends and returns the data updated in the database.
     * @param {NewsletterPostSendUpdateManyAndReturnArgs} args - Arguments to update many NewsletterPostSends.
     * @example
     * // Update many NewsletterPostSends
     * const newsletterPostSend = await prisma.newsletterPostSend.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more NewsletterPostSends and only return the `id`
     * const newsletterPostSendWithIdOnly = await prisma.newsletterPostSend.updateManyAndReturn({
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
    updateManyAndReturn<T extends NewsletterPostSendUpdateManyAndReturnArgs>(args: SelectSubset<T, NewsletterPostSendUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NewsletterPostSendPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one NewsletterPostSend.
     * @param {NewsletterPostSendUpsertArgs} args - Arguments to update or create a NewsletterPostSend.
     * @example
     * // Update or create a NewsletterPostSend
     * const newsletterPostSend = await prisma.newsletterPostSend.upsert({
     *   create: {
     *     // ... data to create a NewsletterPostSend
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the NewsletterPostSend we want to update
     *   }
     * })
     */
    upsert<T extends NewsletterPostSendUpsertArgs>(args: SelectSubset<T, NewsletterPostSendUpsertArgs<ExtArgs>>): Prisma__NewsletterPostSendClient<$Result.GetResult<Prisma.$NewsletterPostSendPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of NewsletterPostSends.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NewsletterPostSendCountArgs} args - Arguments to filter NewsletterPostSends to count.
     * @example
     * // Count the number of NewsletterPostSends
     * const count = await prisma.newsletterPostSend.count({
     *   where: {
     *     // ... the filter for the NewsletterPostSends we want to count
     *   }
     * })
    **/
    count<T extends NewsletterPostSendCountArgs>(
      args?: Subset<T, NewsletterPostSendCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], NewsletterPostSendCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a NewsletterPostSend.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NewsletterPostSendAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends NewsletterPostSendAggregateArgs>(args: Subset<T, NewsletterPostSendAggregateArgs>): Prisma.PrismaPromise<GetNewsletterPostSendAggregateType<T>>

    /**
     * Group by NewsletterPostSend.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NewsletterPostSendGroupByArgs} args - Group by arguments.
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
      T extends NewsletterPostSendGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: NewsletterPostSendGroupByArgs['orderBy'] }
        : { orderBy?: NewsletterPostSendGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, NewsletterPostSendGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNewsletterPostSendGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the NewsletterPostSend model
   */
  readonly fields: NewsletterPostSendFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for NewsletterPostSend.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__NewsletterPostSendClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    post<T extends BlogPostDefaultArgs<ExtArgs> = {}>(args?: Subset<T, BlogPostDefaultArgs<ExtArgs>>): Prisma__BlogPostClient<$Result.GetResult<Prisma.$BlogPostPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    emailEvents<T extends NewsletterPostSend$emailEventsArgs<ExtArgs> = {}>(args?: Subset<T, NewsletterPostSend$emailEventsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NewsletterEmailEventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the NewsletterPostSend model
   */
  interface NewsletterPostSendFieldRefs {
    readonly id: FieldRef<"NewsletterPostSend", 'String'>
    readonly postId: FieldRef<"NewsletterPostSend", 'String'>
    readonly status: FieldRef<"NewsletterPostSend", 'NewsletterPostSendStatus'>
    readonly recipientCount: FieldRef<"NewsletterPostSend", 'Int'>
    readonly sentCount: FieldRef<"NewsletterPostSend", 'Int'>
    readonly failedCount: FieldRef<"NewsletterPostSend", 'Int'>
    readonly errorMessage: FieldRef<"NewsletterPostSend", 'String'>
    readonly startedAt: FieldRef<"NewsletterPostSend", 'DateTime'>
    readonly completedAt: FieldRef<"NewsletterPostSend", 'DateTime'>
    readonly createdAt: FieldRef<"NewsletterPostSend", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * NewsletterPostSend findUnique
   */
  export type NewsletterPostSendFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsletterPostSend
     */
    select?: NewsletterPostSendSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NewsletterPostSend
     */
    omit?: NewsletterPostSendOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NewsletterPostSendInclude<ExtArgs> | null
    /**
     * Filter, which NewsletterPostSend to fetch.
     */
    where: NewsletterPostSendWhereUniqueInput
  }

  /**
   * NewsletterPostSend findUniqueOrThrow
   */
  export type NewsletterPostSendFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsletterPostSend
     */
    select?: NewsletterPostSendSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NewsletterPostSend
     */
    omit?: NewsletterPostSendOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NewsletterPostSendInclude<ExtArgs> | null
    /**
     * Filter, which NewsletterPostSend to fetch.
     */
    where: NewsletterPostSendWhereUniqueInput
  }

  /**
   * NewsletterPostSend findFirst
   */
  export type NewsletterPostSendFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsletterPostSend
     */
    select?: NewsletterPostSendSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NewsletterPostSend
     */
    omit?: NewsletterPostSendOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NewsletterPostSendInclude<ExtArgs> | null
    /**
     * Filter, which NewsletterPostSend to fetch.
     */
    where?: NewsletterPostSendWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NewsletterPostSends to fetch.
     */
    orderBy?: NewsletterPostSendOrderByWithRelationInput | NewsletterPostSendOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for NewsletterPostSends.
     */
    cursor?: NewsletterPostSendWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NewsletterPostSends from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NewsletterPostSends.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of NewsletterPostSends.
     */
    distinct?: NewsletterPostSendScalarFieldEnum | NewsletterPostSendScalarFieldEnum[]
  }

  /**
   * NewsletterPostSend findFirstOrThrow
   */
  export type NewsletterPostSendFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsletterPostSend
     */
    select?: NewsletterPostSendSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NewsletterPostSend
     */
    omit?: NewsletterPostSendOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NewsletterPostSendInclude<ExtArgs> | null
    /**
     * Filter, which NewsletterPostSend to fetch.
     */
    where?: NewsletterPostSendWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NewsletterPostSends to fetch.
     */
    orderBy?: NewsletterPostSendOrderByWithRelationInput | NewsletterPostSendOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for NewsletterPostSends.
     */
    cursor?: NewsletterPostSendWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NewsletterPostSends from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NewsletterPostSends.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of NewsletterPostSends.
     */
    distinct?: NewsletterPostSendScalarFieldEnum | NewsletterPostSendScalarFieldEnum[]
  }

  /**
   * NewsletterPostSend findMany
   */
  export type NewsletterPostSendFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsletterPostSend
     */
    select?: NewsletterPostSendSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NewsletterPostSend
     */
    omit?: NewsletterPostSendOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NewsletterPostSendInclude<ExtArgs> | null
    /**
     * Filter, which NewsletterPostSends to fetch.
     */
    where?: NewsletterPostSendWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NewsletterPostSends to fetch.
     */
    orderBy?: NewsletterPostSendOrderByWithRelationInput | NewsletterPostSendOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing NewsletterPostSends.
     */
    cursor?: NewsletterPostSendWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NewsletterPostSends from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NewsletterPostSends.
     */
    skip?: number
    distinct?: NewsletterPostSendScalarFieldEnum | NewsletterPostSendScalarFieldEnum[]
  }

  /**
   * NewsletterPostSend create
   */
  export type NewsletterPostSendCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsletterPostSend
     */
    select?: NewsletterPostSendSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NewsletterPostSend
     */
    omit?: NewsletterPostSendOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NewsletterPostSendInclude<ExtArgs> | null
    /**
     * The data needed to create a NewsletterPostSend.
     */
    data: XOR<NewsletterPostSendCreateInput, NewsletterPostSendUncheckedCreateInput>
  }

  /**
   * NewsletterPostSend createMany
   */
  export type NewsletterPostSendCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many NewsletterPostSends.
     */
    data: NewsletterPostSendCreateManyInput | NewsletterPostSendCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * NewsletterPostSend createManyAndReturn
   */
  export type NewsletterPostSendCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsletterPostSend
     */
    select?: NewsletterPostSendSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the NewsletterPostSend
     */
    omit?: NewsletterPostSendOmit<ExtArgs> | null
    /**
     * The data used to create many NewsletterPostSends.
     */
    data: NewsletterPostSendCreateManyInput | NewsletterPostSendCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NewsletterPostSendIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * NewsletterPostSend update
   */
  export type NewsletterPostSendUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsletterPostSend
     */
    select?: NewsletterPostSendSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NewsletterPostSend
     */
    omit?: NewsletterPostSendOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NewsletterPostSendInclude<ExtArgs> | null
    /**
     * The data needed to update a NewsletterPostSend.
     */
    data: XOR<NewsletterPostSendUpdateInput, NewsletterPostSendUncheckedUpdateInput>
    /**
     * Choose, which NewsletterPostSend to update.
     */
    where: NewsletterPostSendWhereUniqueInput
  }

  /**
   * NewsletterPostSend updateMany
   */
  export type NewsletterPostSendUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update NewsletterPostSends.
     */
    data: XOR<NewsletterPostSendUpdateManyMutationInput, NewsletterPostSendUncheckedUpdateManyInput>
    /**
     * Filter which NewsletterPostSends to update
     */
    where?: NewsletterPostSendWhereInput
    /**
     * Limit how many NewsletterPostSends to update.
     */
    limit?: number
  }

  /**
   * NewsletterPostSend updateManyAndReturn
   */
  export type NewsletterPostSendUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsletterPostSend
     */
    select?: NewsletterPostSendSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the NewsletterPostSend
     */
    omit?: NewsletterPostSendOmit<ExtArgs> | null
    /**
     * The data used to update NewsletterPostSends.
     */
    data: XOR<NewsletterPostSendUpdateManyMutationInput, NewsletterPostSendUncheckedUpdateManyInput>
    /**
     * Filter which NewsletterPostSends to update
     */
    where?: NewsletterPostSendWhereInput
    /**
     * Limit how many NewsletterPostSends to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NewsletterPostSendIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * NewsletterPostSend upsert
   */
  export type NewsletterPostSendUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsletterPostSend
     */
    select?: NewsletterPostSendSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NewsletterPostSend
     */
    omit?: NewsletterPostSendOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NewsletterPostSendInclude<ExtArgs> | null
    /**
     * The filter to search for the NewsletterPostSend to update in case it exists.
     */
    where: NewsletterPostSendWhereUniqueInput
    /**
     * In case the NewsletterPostSend found by the `where` argument doesn't exist, create a new NewsletterPostSend with this data.
     */
    create: XOR<NewsletterPostSendCreateInput, NewsletterPostSendUncheckedCreateInput>
    /**
     * In case the NewsletterPostSend was found with the provided `where` argument, update it with this data.
     */
    update: XOR<NewsletterPostSendUpdateInput, NewsletterPostSendUncheckedUpdateInput>
  }

  /**
   * NewsletterPostSend delete
   */
  export type NewsletterPostSendDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsletterPostSend
     */
    select?: NewsletterPostSendSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NewsletterPostSend
     */
    omit?: NewsletterPostSendOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NewsletterPostSendInclude<ExtArgs> | null
    /**
     * Filter which NewsletterPostSend to delete.
     */
    where: NewsletterPostSendWhereUniqueInput
  }

  /**
   * NewsletterPostSend deleteMany
   */
  export type NewsletterPostSendDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which NewsletterPostSends to delete
     */
    where?: NewsletterPostSendWhereInput
    /**
     * Limit how many NewsletterPostSends to delete.
     */
    limit?: number
  }

  /**
   * NewsletterPostSend.emailEvents
   */
  export type NewsletterPostSend$emailEventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsletterEmailEvent
     */
    select?: NewsletterEmailEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NewsletterEmailEvent
     */
    omit?: NewsletterEmailEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NewsletterEmailEventInclude<ExtArgs> | null
    where?: NewsletterEmailEventWhereInput
    orderBy?: NewsletterEmailEventOrderByWithRelationInput | NewsletterEmailEventOrderByWithRelationInput[]
    cursor?: NewsletterEmailEventWhereUniqueInput
    take?: number
    skip?: number
    distinct?: NewsletterEmailEventScalarFieldEnum | NewsletterEmailEventScalarFieldEnum[]
  }

  /**
   * NewsletterPostSend without action
   */
  export type NewsletterPostSendDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsletterPostSend
     */
    select?: NewsletterPostSendSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NewsletterPostSend
     */
    omit?: NewsletterPostSendOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NewsletterPostSendInclude<ExtArgs> | null
  }


  /**
   * Model NewsletterEmailEvent
   */

  export type AggregateNewsletterEmailEvent = {
    _count: NewsletterEmailEventCountAggregateOutputType | null
    _min: NewsletterEmailEventMinAggregateOutputType | null
    _max: NewsletterEmailEventMaxAggregateOutputType | null
  }

  export type NewsletterEmailEventMinAggregateOutputType = {
    id: string | null
    subscriberId: string | null
    postId: string | null
    postSendId: string | null
    type: $Enums.NewsletterEmailType | null
    status: $Enums.NewsletterEmailStatus | null
    toEmail: string | null
    subject: string | null
    resendEmailId: string | null
    errorMessage: string | null
    createdAt: Date | null
  }

  export type NewsletterEmailEventMaxAggregateOutputType = {
    id: string | null
    subscriberId: string | null
    postId: string | null
    postSendId: string | null
    type: $Enums.NewsletterEmailType | null
    status: $Enums.NewsletterEmailStatus | null
    toEmail: string | null
    subject: string | null
    resendEmailId: string | null
    errorMessage: string | null
    createdAt: Date | null
  }

  export type NewsletterEmailEventCountAggregateOutputType = {
    id: number
    subscriberId: number
    postId: number
    postSendId: number
    type: number
    status: number
    toEmail: number
    subject: number
    resendEmailId: number
    errorMessage: number
    createdAt: number
    _all: number
  }


  export type NewsletterEmailEventMinAggregateInputType = {
    id?: true
    subscriberId?: true
    postId?: true
    postSendId?: true
    type?: true
    status?: true
    toEmail?: true
    subject?: true
    resendEmailId?: true
    errorMessage?: true
    createdAt?: true
  }

  export type NewsletterEmailEventMaxAggregateInputType = {
    id?: true
    subscriberId?: true
    postId?: true
    postSendId?: true
    type?: true
    status?: true
    toEmail?: true
    subject?: true
    resendEmailId?: true
    errorMessage?: true
    createdAt?: true
  }

  export type NewsletterEmailEventCountAggregateInputType = {
    id?: true
    subscriberId?: true
    postId?: true
    postSendId?: true
    type?: true
    status?: true
    toEmail?: true
    subject?: true
    resendEmailId?: true
    errorMessage?: true
    createdAt?: true
    _all?: true
  }

  export type NewsletterEmailEventAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which NewsletterEmailEvent to aggregate.
     */
    where?: NewsletterEmailEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NewsletterEmailEvents to fetch.
     */
    orderBy?: NewsletterEmailEventOrderByWithRelationInput | NewsletterEmailEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: NewsletterEmailEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NewsletterEmailEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NewsletterEmailEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned NewsletterEmailEvents
    **/
    _count?: true | NewsletterEmailEventCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: NewsletterEmailEventMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: NewsletterEmailEventMaxAggregateInputType
  }

  export type GetNewsletterEmailEventAggregateType<T extends NewsletterEmailEventAggregateArgs> = {
        [P in keyof T & keyof AggregateNewsletterEmailEvent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateNewsletterEmailEvent[P]>
      : GetScalarType<T[P], AggregateNewsletterEmailEvent[P]>
  }




  export type NewsletterEmailEventGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NewsletterEmailEventWhereInput
    orderBy?: NewsletterEmailEventOrderByWithAggregationInput | NewsletterEmailEventOrderByWithAggregationInput[]
    by: NewsletterEmailEventScalarFieldEnum[] | NewsletterEmailEventScalarFieldEnum
    having?: NewsletterEmailEventScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: NewsletterEmailEventCountAggregateInputType | true
    _min?: NewsletterEmailEventMinAggregateInputType
    _max?: NewsletterEmailEventMaxAggregateInputType
  }

  export type NewsletterEmailEventGroupByOutputType = {
    id: string
    subscriberId: string | null
    postId: string | null
    postSendId: string | null
    type: $Enums.NewsletterEmailType
    status: $Enums.NewsletterEmailStatus
    toEmail: string
    subject: string
    resendEmailId: string | null
    errorMessage: string | null
    createdAt: Date
    _count: NewsletterEmailEventCountAggregateOutputType | null
    _min: NewsletterEmailEventMinAggregateOutputType | null
    _max: NewsletterEmailEventMaxAggregateOutputType | null
  }

  type GetNewsletterEmailEventGroupByPayload<T extends NewsletterEmailEventGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<NewsletterEmailEventGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof NewsletterEmailEventGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], NewsletterEmailEventGroupByOutputType[P]>
            : GetScalarType<T[P], NewsletterEmailEventGroupByOutputType[P]>
        }
      >
    >


  export type NewsletterEmailEventSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    subscriberId?: boolean
    postId?: boolean
    postSendId?: boolean
    type?: boolean
    status?: boolean
    toEmail?: boolean
    subject?: boolean
    resendEmailId?: boolean
    errorMessage?: boolean
    createdAt?: boolean
    subscriber?: boolean | NewsletterEmailEvent$subscriberArgs<ExtArgs>
    post?: boolean | NewsletterEmailEvent$postArgs<ExtArgs>
    postSend?: boolean | NewsletterEmailEvent$postSendArgs<ExtArgs>
  }, ExtArgs["result"]["newsletterEmailEvent"]>

  export type NewsletterEmailEventSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    subscriberId?: boolean
    postId?: boolean
    postSendId?: boolean
    type?: boolean
    status?: boolean
    toEmail?: boolean
    subject?: boolean
    resendEmailId?: boolean
    errorMessage?: boolean
    createdAt?: boolean
    subscriber?: boolean | NewsletterEmailEvent$subscriberArgs<ExtArgs>
    post?: boolean | NewsletterEmailEvent$postArgs<ExtArgs>
    postSend?: boolean | NewsletterEmailEvent$postSendArgs<ExtArgs>
  }, ExtArgs["result"]["newsletterEmailEvent"]>

  export type NewsletterEmailEventSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    subscriberId?: boolean
    postId?: boolean
    postSendId?: boolean
    type?: boolean
    status?: boolean
    toEmail?: boolean
    subject?: boolean
    resendEmailId?: boolean
    errorMessage?: boolean
    createdAt?: boolean
    subscriber?: boolean | NewsletterEmailEvent$subscriberArgs<ExtArgs>
    post?: boolean | NewsletterEmailEvent$postArgs<ExtArgs>
    postSend?: boolean | NewsletterEmailEvent$postSendArgs<ExtArgs>
  }, ExtArgs["result"]["newsletterEmailEvent"]>

  export type NewsletterEmailEventSelectScalar = {
    id?: boolean
    subscriberId?: boolean
    postId?: boolean
    postSendId?: boolean
    type?: boolean
    status?: boolean
    toEmail?: boolean
    subject?: boolean
    resendEmailId?: boolean
    errorMessage?: boolean
    createdAt?: boolean
  }

  export type NewsletterEmailEventOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "subscriberId" | "postId" | "postSendId" | "type" | "status" | "toEmail" | "subject" | "resendEmailId" | "errorMessage" | "createdAt", ExtArgs["result"]["newsletterEmailEvent"]>
  export type NewsletterEmailEventInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    subscriber?: boolean | NewsletterEmailEvent$subscriberArgs<ExtArgs>
    post?: boolean | NewsletterEmailEvent$postArgs<ExtArgs>
    postSend?: boolean | NewsletterEmailEvent$postSendArgs<ExtArgs>
  }
  export type NewsletterEmailEventIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    subscriber?: boolean | NewsletterEmailEvent$subscriberArgs<ExtArgs>
    post?: boolean | NewsletterEmailEvent$postArgs<ExtArgs>
    postSend?: boolean | NewsletterEmailEvent$postSendArgs<ExtArgs>
  }
  export type NewsletterEmailEventIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    subscriber?: boolean | NewsletterEmailEvent$subscriberArgs<ExtArgs>
    post?: boolean | NewsletterEmailEvent$postArgs<ExtArgs>
    postSend?: boolean | NewsletterEmailEvent$postSendArgs<ExtArgs>
  }

  export type $NewsletterEmailEventPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "NewsletterEmailEvent"
    objects: {
      subscriber: Prisma.$NewsletterSubscriberPayload<ExtArgs> | null
      post: Prisma.$BlogPostPayload<ExtArgs> | null
      postSend: Prisma.$NewsletterPostSendPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      subscriberId: string | null
      postId: string | null
      postSendId: string | null
      type: $Enums.NewsletterEmailType
      status: $Enums.NewsletterEmailStatus
      toEmail: string
      subject: string
      resendEmailId: string | null
      errorMessage: string | null
      createdAt: Date
    }, ExtArgs["result"]["newsletterEmailEvent"]>
    composites: {}
  }

  type NewsletterEmailEventGetPayload<S extends boolean | null | undefined | NewsletterEmailEventDefaultArgs> = $Result.GetResult<Prisma.$NewsletterEmailEventPayload, S>

  type NewsletterEmailEventCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<NewsletterEmailEventFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: NewsletterEmailEventCountAggregateInputType | true
    }

  export interface NewsletterEmailEventDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['NewsletterEmailEvent'], meta: { name: 'NewsletterEmailEvent' } }
    /**
     * Find zero or one NewsletterEmailEvent that matches the filter.
     * @param {NewsletterEmailEventFindUniqueArgs} args - Arguments to find a NewsletterEmailEvent
     * @example
     * // Get one NewsletterEmailEvent
     * const newsletterEmailEvent = await prisma.newsletterEmailEvent.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends NewsletterEmailEventFindUniqueArgs>(args: SelectSubset<T, NewsletterEmailEventFindUniqueArgs<ExtArgs>>): Prisma__NewsletterEmailEventClient<$Result.GetResult<Prisma.$NewsletterEmailEventPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one NewsletterEmailEvent that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {NewsletterEmailEventFindUniqueOrThrowArgs} args - Arguments to find a NewsletterEmailEvent
     * @example
     * // Get one NewsletterEmailEvent
     * const newsletterEmailEvent = await prisma.newsletterEmailEvent.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends NewsletterEmailEventFindUniqueOrThrowArgs>(args: SelectSubset<T, NewsletterEmailEventFindUniqueOrThrowArgs<ExtArgs>>): Prisma__NewsletterEmailEventClient<$Result.GetResult<Prisma.$NewsletterEmailEventPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first NewsletterEmailEvent that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NewsletterEmailEventFindFirstArgs} args - Arguments to find a NewsletterEmailEvent
     * @example
     * // Get one NewsletterEmailEvent
     * const newsletterEmailEvent = await prisma.newsletterEmailEvent.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends NewsletterEmailEventFindFirstArgs>(args?: SelectSubset<T, NewsletterEmailEventFindFirstArgs<ExtArgs>>): Prisma__NewsletterEmailEventClient<$Result.GetResult<Prisma.$NewsletterEmailEventPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first NewsletterEmailEvent that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NewsletterEmailEventFindFirstOrThrowArgs} args - Arguments to find a NewsletterEmailEvent
     * @example
     * // Get one NewsletterEmailEvent
     * const newsletterEmailEvent = await prisma.newsletterEmailEvent.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends NewsletterEmailEventFindFirstOrThrowArgs>(args?: SelectSubset<T, NewsletterEmailEventFindFirstOrThrowArgs<ExtArgs>>): Prisma__NewsletterEmailEventClient<$Result.GetResult<Prisma.$NewsletterEmailEventPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more NewsletterEmailEvents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NewsletterEmailEventFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all NewsletterEmailEvents
     * const newsletterEmailEvents = await prisma.newsletterEmailEvent.findMany()
     * 
     * // Get first 10 NewsletterEmailEvents
     * const newsletterEmailEvents = await prisma.newsletterEmailEvent.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const newsletterEmailEventWithIdOnly = await prisma.newsletterEmailEvent.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends NewsletterEmailEventFindManyArgs>(args?: SelectSubset<T, NewsletterEmailEventFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NewsletterEmailEventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a NewsletterEmailEvent.
     * @param {NewsletterEmailEventCreateArgs} args - Arguments to create a NewsletterEmailEvent.
     * @example
     * // Create one NewsletterEmailEvent
     * const NewsletterEmailEvent = await prisma.newsletterEmailEvent.create({
     *   data: {
     *     // ... data to create a NewsletterEmailEvent
     *   }
     * })
     * 
     */
    create<T extends NewsletterEmailEventCreateArgs>(args: SelectSubset<T, NewsletterEmailEventCreateArgs<ExtArgs>>): Prisma__NewsletterEmailEventClient<$Result.GetResult<Prisma.$NewsletterEmailEventPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many NewsletterEmailEvents.
     * @param {NewsletterEmailEventCreateManyArgs} args - Arguments to create many NewsletterEmailEvents.
     * @example
     * // Create many NewsletterEmailEvents
     * const newsletterEmailEvent = await prisma.newsletterEmailEvent.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends NewsletterEmailEventCreateManyArgs>(args?: SelectSubset<T, NewsletterEmailEventCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many NewsletterEmailEvents and returns the data saved in the database.
     * @param {NewsletterEmailEventCreateManyAndReturnArgs} args - Arguments to create many NewsletterEmailEvents.
     * @example
     * // Create many NewsletterEmailEvents
     * const newsletterEmailEvent = await prisma.newsletterEmailEvent.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many NewsletterEmailEvents and only return the `id`
     * const newsletterEmailEventWithIdOnly = await prisma.newsletterEmailEvent.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends NewsletterEmailEventCreateManyAndReturnArgs>(args?: SelectSubset<T, NewsletterEmailEventCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NewsletterEmailEventPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a NewsletterEmailEvent.
     * @param {NewsletterEmailEventDeleteArgs} args - Arguments to delete one NewsletterEmailEvent.
     * @example
     * // Delete one NewsletterEmailEvent
     * const NewsletterEmailEvent = await prisma.newsletterEmailEvent.delete({
     *   where: {
     *     // ... filter to delete one NewsletterEmailEvent
     *   }
     * })
     * 
     */
    delete<T extends NewsletterEmailEventDeleteArgs>(args: SelectSubset<T, NewsletterEmailEventDeleteArgs<ExtArgs>>): Prisma__NewsletterEmailEventClient<$Result.GetResult<Prisma.$NewsletterEmailEventPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one NewsletterEmailEvent.
     * @param {NewsletterEmailEventUpdateArgs} args - Arguments to update one NewsletterEmailEvent.
     * @example
     * // Update one NewsletterEmailEvent
     * const newsletterEmailEvent = await prisma.newsletterEmailEvent.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends NewsletterEmailEventUpdateArgs>(args: SelectSubset<T, NewsletterEmailEventUpdateArgs<ExtArgs>>): Prisma__NewsletterEmailEventClient<$Result.GetResult<Prisma.$NewsletterEmailEventPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more NewsletterEmailEvents.
     * @param {NewsletterEmailEventDeleteManyArgs} args - Arguments to filter NewsletterEmailEvents to delete.
     * @example
     * // Delete a few NewsletterEmailEvents
     * const { count } = await prisma.newsletterEmailEvent.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends NewsletterEmailEventDeleteManyArgs>(args?: SelectSubset<T, NewsletterEmailEventDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more NewsletterEmailEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NewsletterEmailEventUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many NewsletterEmailEvents
     * const newsletterEmailEvent = await prisma.newsletterEmailEvent.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends NewsletterEmailEventUpdateManyArgs>(args: SelectSubset<T, NewsletterEmailEventUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more NewsletterEmailEvents and returns the data updated in the database.
     * @param {NewsletterEmailEventUpdateManyAndReturnArgs} args - Arguments to update many NewsletterEmailEvents.
     * @example
     * // Update many NewsletterEmailEvents
     * const newsletterEmailEvent = await prisma.newsletterEmailEvent.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more NewsletterEmailEvents and only return the `id`
     * const newsletterEmailEventWithIdOnly = await prisma.newsletterEmailEvent.updateManyAndReturn({
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
    updateManyAndReturn<T extends NewsletterEmailEventUpdateManyAndReturnArgs>(args: SelectSubset<T, NewsletterEmailEventUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NewsletterEmailEventPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one NewsletterEmailEvent.
     * @param {NewsletterEmailEventUpsertArgs} args - Arguments to update or create a NewsletterEmailEvent.
     * @example
     * // Update or create a NewsletterEmailEvent
     * const newsletterEmailEvent = await prisma.newsletterEmailEvent.upsert({
     *   create: {
     *     // ... data to create a NewsletterEmailEvent
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the NewsletterEmailEvent we want to update
     *   }
     * })
     */
    upsert<T extends NewsletterEmailEventUpsertArgs>(args: SelectSubset<T, NewsletterEmailEventUpsertArgs<ExtArgs>>): Prisma__NewsletterEmailEventClient<$Result.GetResult<Prisma.$NewsletterEmailEventPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of NewsletterEmailEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NewsletterEmailEventCountArgs} args - Arguments to filter NewsletterEmailEvents to count.
     * @example
     * // Count the number of NewsletterEmailEvents
     * const count = await prisma.newsletterEmailEvent.count({
     *   where: {
     *     // ... the filter for the NewsletterEmailEvents we want to count
     *   }
     * })
    **/
    count<T extends NewsletterEmailEventCountArgs>(
      args?: Subset<T, NewsletterEmailEventCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], NewsletterEmailEventCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a NewsletterEmailEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NewsletterEmailEventAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends NewsletterEmailEventAggregateArgs>(args: Subset<T, NewsletterEmailEventAggregateArgs>): Prisma.PrismaPromise<GetNewsletterEmailEventAggregateType<T>>

    /**
     * Group by NewsletterEmailEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NewsletterEmailEventGroupByArgs} args - Group by arguments.
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
      T extends NewsletterEmailEventGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: NewsletterEmailEventGroupByArgs['orderBy'] }
        : { orderBy?: NewsletterEmailEventGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, NewsletterEmailEventGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNewsletterEmailEventGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the NewsletterEmailEvent model
   */
  readonly fields: NewsletterEmailEventFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for NewsletterEmailEvent.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__NewsletterEmailEventClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    subscriber<T extends NewsletterEmailEvent$subscriberArgs<ExtArgs> = {}>(args?: Subset<T, NewsletterEmailEvent$subscriberArgs<ExtArgs>>): Prisma__NewsletterSubscriberClient<$Result.GetResult<Prisma.$NewsletterSubscriberPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    post<T extends NewsletterEmailEvent$postArgs<ExtArgs> = {}>(args?: Subset<T, NewsletterEmailEvent$postArgs<ExtArgs>>): Prisma__BlogPostClient<$Result.GetResult<Prisma.$BlogPostPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    postSend<T extends NewsletterEmailEvent$postSendArgs<ExtArgs> = {}>(args?: Subset<T, NewsletterEmailEvent$postSendArgs<ExtArgs>>): Prisma__NewsletterPostSendClient<$Result.GetResult<Prisma.$NewsletterPostSendPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the NewsletterEmailEvent model
   */
  interface NewsletterEmailEventFieldRefs {
    readonly id: FieldRef<"NewsletterEmailEvent", 'String'>
    readonly subscriberId: FieldRef<"NewsletterEmailEvent", 'String'>
    readonly postId: FieldRef<"NewsletterEmailEvent", 'String'>
    readonly postSendId: FieldRef<"NewsletterEmailEvent", 'String'>
    readonly type: FieldRef<"NewsletterEmailEvent", 'NewsletterEmailType'>
    readonly status: FieldRef<"NewsletterEmailEvent", 'NewsletterEmailStatus'>
    readonly toEmail: FieldRef<"NewsletterEmailEvent", 'String'>
    readonly subject: FieldRef<"NewsletterEmailEvent", 'String'>
    readonly resendEmailId: FieldRef<"NewsletterEmailEvent", 'String'>
    readonly errorMessage: FieldRef<"NewsletterEmailEvent", 'String'>
    readonly createdAt: FieldRef<"NewsletterEmailEvent", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * NewsletterEmailEvent findUnique
   */
  export type NewsletterEmailEventFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsletterEmailEvent
     */
    select?: NewsletterEmailEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NewsletterEmailEvent
     */
    omit?: NewsletterEmailEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NewsletterEmailEventInclude<ExtArgs> | null
    /**
     * Filter, which NewsletterEmailEvent to fetch.
     */
    where: NewsletterEmailEventWhereUniqueInput
  }

  /**
   * NewsletterEmailEvent findUniqueOrThrow
   */
  export type NewsletterEmailEventFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsletterEmailEvent
     */
    select?: NewsletterEmailEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NewsletterEmailEvent
     */
    omit?: NewsletterEmailEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NewsletterEmailEventInclude<ExtArgs> | null
    /**
     * Filter, which NewsletterEmailEvent to fetch.
     */
    where: NewsletterEmailEventWhereUniqueInput
  }

  /**
   * NewsletterEmailEvent findFirst
   */
  export type NewsletterEmailEventFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsletterEmailEvent
     */
    select?: NewsletterEmailEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NewsletterEmailEvent
     */
    omit?: NewsletterEmailEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NewsletterEmailEventInclude<ExtArgs> | null
    /**
     * Filter, which NewsletterEmailEvent to fetch.
     */
    where?: NewsletterEmailEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NewsletterEmailEvents to fetch.
     */
    orderBy?: NewsletterEmailEventOrderByWithRelationInput | NewsletterEmailEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for NewsletterEmailEvents.
     */
    cursor?: NewsletterEmailEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NewsletterEmailEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NewsletterEmailEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of NewsletterEmailEvents.
     */
    distinct?: NewsletterEmailEventScalarFieldEnum | NewsletterEmailEventScalarFieldEnum[]
  }

  /**
   * NewsletterEmailEvent findFirstOrThrow
   */
  export type NewsletterEmailEventFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsletterEmailEvent
     */
    select?: NewsletterEmailEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NewsletterEmailEvent
     */
    omit?: NewsletterEmailEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NewsletterEmailEventInclude<ExtArgs> | null
    /**
     * Filter, which NewsletterEmailEvent to fetch.
     */
    where?: NewsletterEmailEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NewsletterEmailEvents to fetch.
     */
    orderBy?: NewsletterEmailEventOrderByWithRelationInput | NewsletterEmailEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for NewsletterEmailEvents.
     */
    cursor?: NewsletterEmailEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NewsletterEmailEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NewsletterEmailEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of NewsletterEmailEvents.
     */
    distinct?: NewsletterEmailEventScalarFieldEnum | NewsletterEmailEventScalarFieldEnum[]
  }

  /**
   * NewsletterEmailEvent findMany
   */
  export type NewsletterEmailEventFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsletterEmailEvent
     */
    select?: NewsletterEmailEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NewsletterEmailEvent
     */
    omit?: NewsletterEmailEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NewsletterEmailEventInclude<ExtArgs> | null
    /**
     * Filter, which NewsletterEmailEvents to fetch.
     */
    where?: NewsletterEmailEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NewsletterEmailEvents to fetch.
     */
    orderBy?: NewsletterEmailEventOrderByWithRelationInput | NewsletterEmailEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing NewsletterEmailEvents.
     */
    cursor?: NewsletterEmailEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NewsletterEmailEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NewsletterEmailEvents.
     */
    skip?: number
    distinct?: NewsletterEmailEventScalarFieldEnum | NewsletterEmailEventScalarFieldEnum[]
  }

  /**
   * NewsletterEmailEvent create
   */
  export type NewsletterEmailEventCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsletterEmailEvent
     */
    select?: NewsletterEmailEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NewsletterEmailEvent
     */
    omit?: NewsletterEmailEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NewsletterEmailEventInclude<ExtArgs> | null
    /**
     * The data needed to create a NewsletterEmailEvent.
     */
    data: XOR<NewsletterEmailEventCreateInput, NewsletterEmailEventUncheckedCreateInput>
  }

  /**
   * NewsletterEmailEvent createMany
   */
  export type NewsletterEmailEventCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many NewsletterEmailEvents.
     */
    data: NewsletterEmailEventCreateManyInput | NewsletterEmailEventCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * NewsletterEmailEvent createManyAndReturn
   */
  export type NewsletterEmailEventCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsletterEmailEvent
     */
    select?: NewsletterEmailEventSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the NewsletterEmailEvent
     */
    omit?: NewsletterEmailEventOmit<ExtArgs> | null
    /**
     * The data used to create many NewsletterEmailEvents.
     */
    data: NewsletterEmailEventCreateManyInput | NewsletterEmailEventCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NewsletterEmailEventIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * NewsletterEmailEvent update
   */
  export type NewsletterEmailEventUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsletterEmailEvent
     */
    select?: NewsletterEmailEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NewsletterEmailEvent
     */
    omit?: NewsletterEmailEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NewsletterEmailEventInclude<ExtArgs> | null
    /**
     * The data needed to update a NewsletterEmailEvent.
     */
    data: XOR<NewsletterEmailEventUpdateInput, NewsletterEmailEventUncheckedUpdateInput>
    /**
     * Choose, which NewsletterEmailEvent to update.
     */
    where: NewsletterEmailEventWhereUniqueInput
  }

  /**
   * NewsletterEmailEvent updateMany
   */
  export type NewsletterEmailEventUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update NewsletterEmailEvents.
     */
    data: XOR<NewsletterEmailEventUpdateManyMutationInput, NewsletterEmailEventUncheckedUpdateManyInput>
    /**
     * Filter which NewsletterEmailEvents to update
     */
    where?: NewsletterEmailEventWhereInput
    /**
     * Limit how many NewsletterEmailEvents to update.
     */
    limit?: number
  }

  /**
   * NewsletterEmailEvent updateManyAndReturn
   */
  export type NewsletterEmailEventUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsletterEmailEvent
     */
    select?: NewsletterEmailEventSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the NewsletterEmailEvent
     */
    omit?: NewsletterEmailEventOmit<ExtArgs> | null
    /**
     * The data used to update NewsletterEmailEvents.
     */
    data: XOR<NewsletterEmailEventUpdateManyMutationInput, NewsletterEmailEventUncheckedUpdateManyInput>
    /**
     * Filter which NewsletterEmailEvents to update
     */
    where?: NewsletterEmailEventWhereInput
    /**
     * Limit how many NewsletterEmailEvents to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NewsletterEmailEventIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * NewsletterEmailEvent upsert
   */
  export type NewsletterEmailEventUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsletterEmailEvent
     */
    select?: NewsletterEmailEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NewsletterEmailEvent
     */
    omit?: NewsletterEmailEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NewsletterEmailEventInclude<ExtArgs> | null
    /**
     * The filter to search for the NewsletterEmailEvent to update in case it exists.
     */
    where: NewsletterEmailEventWhereUniqueInput
    /**
     * In case the NewsletterEmailEvent found by the `where` argument doesn't exist, create a new NewsletterEmailEvent with this data.
     */
    create: XOR<NewsletterEmailEventCreateInput, NewsletterEmailEventUncheckedCreateInput>
    /**
     * In case the NewsletterEmailEvent was found with the provided `where` argument, update it with this data.
     */
    update: XOR<NewsletterEmailEventUpdateInput, NewsletterEmailEventUncheckedUpdateInput>
  }

  /**
   * NewsletterEmailEvent delete
   */
  export type NewsletterEmailEventDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsletterEmailEvent
     */
    select?: NewsletterEmailEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NewsletterEmailEvent
     */
    omit?: NewsletterEmailEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NewsletterEmailEventInclude<ExtArgs> | null
    /**
     * Filter which NewsletterEmailEvent to delete.
     */
    where: NewsletterEmailEventWhereUniqueInput
  }

  /**
   * NewsletterEmailEvent deleteMany
   */
  export type NewsletterEmailEventDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which NewsletterEmailEvents to delete
     */
    where?: NewsletterEmailEventWhereInput
    /**
     * Limit how many NewsletterEmailEvents to delete.
     */
    limit?: number
  }

  /**
   * NewsletterEmailEvent.subscriber
   */
  export type NewsletterEmailEvent$subscriberArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsletterSubscriber
     */
    select?: NewsletterSubscriberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NewsletterSubscriber
     */
    omit?: NewsletterSubscriberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NewsletterSubscriberInclude<ExtArgs> | null
    where?: NewsletterSubscriberWhereInput
  }

  /**
   * NewsletterEmailEvent.post
   */
  export type NewsletterEmailEvent$postArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlogPost
     */
    select?: BlogPostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BlogPost
     */
    omit?: BlogPostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlogPostInclude<ExtArgs> | null
    where?: BlogPostWhereInput
  }

  /**
   * NewsletterEmailEvent.postSend
   */
  export type NewsletterEmailEvent$postSendArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsletterPostSend
     */
    select?: NewsletterPostSendSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NewsletterPostSend
     */
    omit?: NewsletterPostSendOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NewsletterPostSendInclude<ExtArgs> | null
    where?: NewsletterPostSendWhereInput
  }

  /**
   * NewsletterEmailEvent without action
   */
  export type NewsletterEmailEventDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsletterEmailEvent
     */
    select?: NewsletterEmailEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NewsletterEmailEvent
     */
    omit?: NewsletterEmailEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NewsletterEmailEventInclude<ExtArgs> | null
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


  export const BlogPostScalarFieldEnum: {
    id: 'id',
    slug: 'slug',
    status: 'status',
    featured: 'featured',
    tags: 'tags',
    coverImageUrl: 'coverImageUrl',
    coverImageCredit: 'coverImageCredit',
    coverImageCreditUrl: 'coverImageCreditUrl',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    publishedAt: 'publishedAt'
  };

  export type BlogPostScalarFieldEnum = (typeof BlogPostScalarFieldEnum)[keyof typeof BlogPostScalarFieldEnum]


  export const BlogPostTranslationScalarFieldEnum: {
    id: 'id',
    postId: 'postId',
    locale: 'locale',
    title: 'title',
    excerpt: 'excerpt',
    contentMarkdown: 'contentMarkdown',
    seoTitle: 'seoTitle',
    seoDescription: 'seoDescription',
    coverImageAlt: 'coverImageAlt',
    coverImageCaption: 'coverImageCaption',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type BlogPostTranslationScalarFieldEnum = (typeof BlogPostTranslationScalarFieldEnum)[keyof typeof BlogPostTranslationScalarFieldEnum]


  export const NewsletterSubscriberScalarFieldEnum: {
    id: 'id',
    email: 'email',
    locale: 'locale',
    status: 'status',
    source: 'source',
    confirmationTokenHash: 'confirmationTokenHash',
    unsubscribeToken: 'unsubscribeToken',
    ipHash: 'ipHash',
    userAgent: 'userAgent',
    consentAt: 'consentAt',
    confirmedAt: 'confirmedAt',
    unsubscribedAt: 'unsubscribedAt',
    lastSentAt: 'lastSentAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type NewsletterSubscriberScalarFieldEnum = (typeof NewsletterSubscriberScalarFieldEnum)[keyof typeof NewsletterSubscriberScalarFieldEnum]


  export const NewsletterPostSendScalarFieldEnum: {
    id: 'id',
    postId: 'postId',
    status: 'status',
    recipientCount: 'recipientCount',
    sentCount: 'sentCount',
    failedCount: 'failedCount',
    errorMessage: 'errorMessage',
    startedAt: 'startedAt',
    completedAt: 'completedAt',
    createdAt: 'createdAt'
  };

  export type NewsletterPostSendScalarFieldEnum = (typeof NewsletterPostSendScalarFieldEnum)[keyof typeof NewsletterPostSendScalarFieldEnum]


  export const NewsletterEmailEventScalarFieldEnum: {
    id: 'id',
    subscriberId: 'subscriberId',
    postId: 'postId',
    postSendId: 'postSendId',
    type: 'type',
    status: 'status',
    toEmail: 'toEmail',
    subject: 'subject',
    resendEmailId: 'resendEmailId',
    errorMessage: 'errorMessage',
    createdAt: 'createdAt'
  };

  export type NewsletterEmailEventScalarFieldEnum = (typeof NewsletterEmailEventScalarFieldEnum)[keyof typeof NewsletterEmailEventScalarFieldEnum]


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
   * Reference to a field of type 'BlogPostStatus'
   */
  export type EnumBlogPostStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BlogPostStatus'>
    


  /**
   * Reference to a field of type 'BlogPostStatus[]'
   */
  export type ListEnumBlogPostStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BlogPostStatus[]'>
    


  /**
   * Reference to a field of type 'NewsletterSubscriberStatus'
   */
  export type EnumNewsletterSubscriberStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'NewsletterSubscriberStatus'>
    


  /**
   * Reference to a field of type 'NewsletterSubscriberStatus[]'
   */
  export type ListEnumNewsletterSubscriberStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'NewsletterSubscriberStatus[]'>
    


  /**
   * Reference to a field of type 'NewsletterPostSendStatus'
   */
  export type EnumNewsletterPostSendStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'NewsletterPostSendStatus'>
    


  /**
   * Reference to a field of type 'NewsletterPostSendStatus[]'
   */
  export type ListEnumNewsletterPostSendStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'NewsletterPostSendStatus[]'>
    


  /**
   * Reference to a field of type 'NewsletterEmailType'
   */
  export type EnumNewsletterEmailTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'NewsletterEmailType'>
    


  /**
   * Reference to a field of type 'NewsletterEmailType[]'
   */
  export type ListEnumNewsletterEmailTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'NewsletterEmailType[]'>
    


  /**
   * Reference to a field of type 'NewsletterEmailStatus'
   */
  export type EnumNewsletterEmailStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'NewsletterEmailStatus'>
    


  /**
   * Reference to a field of type 'NewsletterEmailStatus[]'
   */
  export type ListEnumNewsletterEmailStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'NewsletterEmailStatus[]'>
    


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

  export type BlogPostWhereInput = {
    AND?: BlogPostWhereInput | BlogPostWhereInput[]
    OR?: BlogPostWhereInput[]
    NOT?: BlogPostWhereInput | BlogPostWhereInput[]
    id?: StringFilter<"BlogPost"> | string
    slug?: StringFilter<"BlogPost"> | string
    status?: EnumBlogPostStatusFilter<"BlogPost"> | $Enums.BlogPostStatus
    featured?: BoolFilter<"BlogPost"> | boolean
    tags?: StringNullableListFilter<"BlogPost">
    coverImageUrl?: StringNullableFilter<"BlogPost"> | string | null
    coverImageCredit?: StringNullableFilter<"BlogPost"> | string | null
    coverImageCreditUrl?: StringNullableFilter<"BlogPost"> | string | null
    createdAt?: DateTimeFilter<"BlogPost"> | Date | string
    updatedAt?: DateTimeFilter<"BlogPost"> | Date | string
    publishedAt?: DateTimeNullableFilter<"BlogPost"> | Date | string | null
    translations?: BlogPostTranslationListRelationFilter
    newsletterSends?: NewsletterPostSendListRelationFilter
    newsletterEmailEvents?: NewsletterEmailEventListRelationFilter
  }

  export type BlogPostOrderByWithRelationInput = {
    id?: SortOrder
    slug?: SortOrder
    status?: SortOrder
    featured?: SortOrder
    tags?: SortOrder
    coverImageUrl?: SortOrderInput | SortOrder
    coverImageCredit?: SortOrderInput | SortOrder
    coverImageCreditUrl?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    publishedAt?: SortOrderInput | SortOrder
    translations?: BlogPostTranslationOrderByRelationAggregateInput
    newsletterSends?: NewsletterPostSendOrderByRelationAggregateInput
    newsletterEmailEvents?: NewsletterEmailEventOrderByRelationAggregateInput
  }

  export type BlogPostWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    slug?: string
    AND?: BlogPostWhereInput | BlogPostWhereInput[]
    OR?: BlogPostWhereInput[]
    NOT?: BlogPostWhereInput | BlogPostWhereInput[]
    status?: EnumBlogPostStatusFilter<"BlogPost"> | $Enums.BlogPostStatus
    featured?: BoolFilter<"BlogPost"> | boolean
    tags?: StringNullableListFilter<"BlogPost">
    coverImageUrl?: StringNullableFilter<"BlogPost"> | string | null
    coverImageCredit?: StringNullableFilter<"BlogPost"> | string | null
    coverImageCreditUrl?: StringNullableFilter<"BlogPost"> | string | null
    createdAt?: DateTimeFilter<"BlogPost"> | Date | string
    updatedAt?: DateTimeFilter<"BlogPost"> | Date | string
    publishedAt?: DateTimeNullableFilter<"BlogPost"> | Date | string | null
    translations?: BlogPostTranslationListRelationFilter
    newsletterSends?: NewsletterPostSendListRelationFilter
    newsletterEmailEvents?: NewsletterEmailEventListRelationFilter
  }, "id" | "slug">

  export type BlogPostOrderByWithAggregationInput = {
    id?: SortOrder
    slug?: SortOrder
    status?: SortOrder
    featured?: SortOrder
    tags?: SortOrder
    coverImageUrl?: SortOrderInput | SortOrder
    coverImageCredit?: SortOrderInput | SortOrder
    coverImageCreditUrl?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    publishedAt?: SortOrderInput | SortOrder
    _count?: BlogPostCountOrderByAggregateInput
    _max?: BlogPostMaxOrderByAggregateInput
    _min?: BlogPostMinOrderByAggregateInput
  }

  export type BlogPostScalarWhereWithAggregatesInput = {
    AND?: BlogPostScalarWhereWithAggregatesInput | BlogPostScalarWhereWithAggregatesInput[]
    OR?: BlogPostScalarWhereWithAggregatesInput[]
    NOT?: BlogPostScalarWhereWithAggregatesInput | BlogPostScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"BlogPost"> | string
    slug?: StringWithAggregatesFilter<"BlogPost"> | string
    status?: EnumBlogPostStatusWithAggregatesFilter<"BlogPost"> | $Enums.BlogPostStatus
    featured?: BoolWithAggregatesFilter<"BlogPost"> | boolean
    tags?: StringNullableListFilter<"BlogPost">
    coverImageUrl?: StringNullableWithAggregatesFilter<"BlogPost"> | string | null
    coverImageCredit?: StringNullableWithAggregatesFilter<"BlogPost"> | string | null
    coverImageCreditUrl?: StringNullableWithAggregatesFilter<"BlogPost"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"BlogPost"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"BlogPost"> | Date | string
    publishedAt?: DateTimeNullableWithAggregatesFilter<"BlogPost"> | Date | string | null
  }

  export type BlogPostTranslationWhereInput = {
    AND?: BlogPostTranslationWhereInput | BlogPostTranslationWhereInput[]
    OR?: BlogPostTranslationWhereInput[]
    NOT?: BlogPostTranslationWhereInput | BlogPostTranslationWhereInput[]
    id?: StringFilter<"BlogPostTranslation"> | string
    postId?: StringFilter<"BlogPostTranslation"> | string
    locale?: EnumLocaleFilter<"BlogPostTranslation"> | $Enums.Locale
    title?: StringFilter<"BlogPostTranslation"> | string
    excerpt?: StringNullableFilter<"BlogPostTranslation"> | string | null
    contentMarkdown?: StringFilter<"BlogPostTranslation"> | string
    seoTitle?: StringNullableFilter<"BlogPostTranslation"> | string | null
    seoDescription?: StringNullableFilter<"BlogPostTranslation"> | string | null
    coverImageAlt?: StringNullableFilter<"BlogPostTranslation"> | string | null
    coverImageCaption?: StringNullableFilter<"BlogPostTranslation"> | string | null
    createdAt?: DateTimeFilter<"BlogPostTranslation"> | Date | string
    updatedAt?: DateTimeFilter<"BlogPostTranslation"> | Date | string
    post?: XOR<BlogPostScalarRelationFilter, BlogPostWhereInput>
  }

  export type BlogPostTranslationOrderByWithRelationInput = {
    id?: SortOrder
    postId?: SortOrder
    locale?: SortOrder
    title?: SortOrder
    excerpt?: SortOrderInput | SortOrder
    contentMarkdown?: SortOrder
    seoTitle?: SortOrderInput | SortOrder
    seoDescription?: SortOrderInput | SortOrder
    coverImageAlt?: SortOrderInput | SortOrder
    coverImageCaption?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    post?: BlogPostOrderByWithRelationInput
  }

  export type BlogPostTranslationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    postId_locale?: BlogPostTranslationPostIdLocaleCompoundUniqueInput
    AND?: BlogPostTranslationWhereInput | BlogPostTranslationWhereInput[]
    OR?: BlogPostTranslationWhereInput[]
    NOT?: BlogPostTranslationWhereInput | BlogPostTranslationWhereInput[]
    postId?: StringFilter<"BlogPostTranslation"> | string
    locale?: EnumLocaleFilter<"BlogPostTranslation"> | $Enums.Locale
    title?: StringFilter<"BlogPostTranslation"> | string
    excerpt?: StringNullableFilter<"BlogPostTranslation"> | string | null
    contentMarkdown?: StringFilter<"BlogPostTranslation"> | string
    seoTitle?: StringNullableFilter<"BlogPostTranslation"> | string | null
    seoDescription?: StringNullableFilter<"BlogPostTranslation"> | string | null
    coverImageAlt?: StringNullableFilter<"BlogPostTranslation"> | string | null
    coverImageCaption?: StringNullableFilter<"BlogPostTranslation"> | string | null
    createdAt?: DateTimeFilter<"BlogPostTranslation"> | Date | string
    updatedAt?: DateTimeFilter<"BlogPostTranslation"> | Date | string
    post?: XOR<BlogPostScalarRelationFilter, BlogPostWhereInput>
  }, "id" | "postId_locale">

  export type BlogPostTranslationOrderByWithAggregationInput = {
    id?: SortOrder
    postId?: SortOrder
    locale?: SortOrder
    title?: SortOrder
    excerpt?: SortOrderInput | SortOrder
    contentMarkdown?: SortOrder
    seoTitle?: SortOrderInput | SortOrder
    seoDescription?: SortOrderInput | SortOrder
    coverImageAlt?: SortOrderInput | SortOrder
    coverImageCaption?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: BlogPostTranslationCountOrderByAggregateInput
    _max?: BlogPostTranslationMaxOrderByAggregateInput
    _min?: BlogPostTranslationMinOrderByAggregateInput
  }

  export type BlogPostTranslationScalarWhereWithAggregatesInput = {
    AND?: BlogPostTranslationScalarWhereWithAggregatesInput | BlogPostTranslationScalarWhereWithAggregatesInput[]
    OR?: BlogPostTranslationScalarWhereWithAggregatesInput[]
    NOT?: BlogPostTranslationScalarWhereWithAggregatesInput | BlogPostTranslationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"BlogPostTranslation"> | string
    postId?: StringWithAggregatesFilter<"BlogPostTranslation"> | string
    locale?: EnumLocaleWithAggregatesFilter<"BlogPostTranslation"> | $Enums.Locale
    title?: StringWithAggregatesFilter<"BlogPostTranslation"> | string
    excerpt?: StringNullableWithAggregatesFilter<"BlogPostTranslation"> | string | null
    contentMarkdown?: StringWithAggregatesFilter<"BlogPostTranslation"> | string
    seoTitle?: StringNullableWithAggregatesFilter<"BlogPostTranslation"> | string | null
    seoDescription?: StringNullableWithAggregatesFilter<"BlogPostTranslation"> | string | null
    coverImageAlt?: StringNullableWithAggregatesFilter<"BlogPostTranslation"> | string | null
    coverImageCaption?: StringNullableWithAggregatesFilter<"BlogPostTranslation"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"BlogPostTranslation"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"BlogPostTranslation"> | Date | string
  }

  export type NewsletterSubscriberWhereInput = {
    AND?: NewsletterSubscriberWhereInput | NewsletterSubscriberWhereInput[]
    OR?: NewsletterSubscriberWhereInput[]
    NOT?: NewsletterSubscriberWhereInput | NewsletterSubscriberWhereInput[]
    id?: StringFilter<"NewsletterSubscriber"> | string
    email?: StringFilter<"NewsletterSubscriber"> | string
    locale?: EnumLocaleFilter<"NewsletterSubscriber"> | $Enums.Locale
    status?: EnumNewsletterSubscriberStatusFilter<"NewsletterSubscriber"> | $Enums.NewsletterSubscriberStatus
    source?: StringNullableFilter<"NewsletterSubscriber"> | string | null
    confirmationTokenHash?: StringNullableFilter<"NewsletterSubscriber"> | string | null
    unsubscribeToken?: StringFilter<"NewsletterSubscriber"> | string
    ipHash?: StringNullableFilter<"NewsletterSubscriber"> | string | null
    userAgent?: StringNullableFilter<"NewsletterSubscriber"> | string | null
    consentAt?: DateTimeFilter<"NewsletterSubscriber"> | Date | string
    confirmedAt?: DateTimeNullableFilter<"NewsletterSubscriber"> | Date | string | null
    unsubscribedAt?: DateTimeNullableFilter<"NewsletterSubscriber"> | Date | string | null
    lastSentAt?: DateTimeNullableFilter<"NewsletterSubscriber"> | Date | string | null
    createdAt?: DateTimeFilter<"NewsletterSubscriber"> | Date | string
    updatedAt?: DateTimeFilter<"NewsletterSubscriber"> | Date | string
    emailEvents?: NewsletterEmailEventListRelationFilter
  }

  export type NewsletterSubscriberOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    locale?: SortOrder
    status?: SortOrder
    source?: SortOrderInput | SortOrder
    confirmationTokenHash?: SortOrderInput | SortOrder
    unsubscribeToken?: SortOrder
    ipHash?: SortOrderInput | SortOrder
    userAgent?: SortOrderInput | SortOrder
    consentAt?: SortOrder
    confirmedAt?: SortOrderInput | SortOrder
    unsubscribedAt?: SortOrderInput | SortOrder
    lastSentAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    emailEvents?: NewsletterEmailEventOrderByRelationAggregateInput
  }

  export type NewsletterSubscriberWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    confirmationTokenHash?: string
    unsubscribeToken?: string
    AND?: NewsletterSubscriberWhereInput | NewsletterSubscriberWhereInput[]
    OR?: NewsletterSubscriberWhereInput[]
    NOT?: NewsletterSubscriberWhereInput | NewsletterSubscriberWhereInput[]
    locale?: EnumLocaleFilter<"NewsletterSubscriber"> | $Enums.Locale
    status?: EnumNewsletterSubscriberStatusFilter<"NewsletterSubscriber"> | $Enums.NewsletterSubscriberStatus
    source?: StringNullableFilter<"NewsletterSubscriber"> | string | null
    ipHash?: StringNullableFilter<"NewsletterSubscriber"> | string | null
    userAgent?: StringNullableFilter<"NewsletterSubscriber"> | string | null
    consentAt?: DateTimeFilter<"NewsletterSubscriber"> | Date | string
    confirmedAt?: DateTimeNullableFilter<"NewsletterSubscriber"> | Date | string | null
    unsubscribedAt?: DateTimeNullableFilter<"NewsletterSubscriber"> | Date | string | null
    lastSentAt?: DateTimeNullableFilter<"NewsletterSubscriber"> | Date | string | null
    createdAt?: DateTimeFilter<"NewsletterSubscriber"> | Date | string
    updatedAt?: DateTimeFilter<"NewsletterSubscriber"> | Date | string
    emailEvents?: NewsletterEmailEventListRelationFilter
  }, "id" | "email" | "confirmationTokenHash" | "unsubscribeToken">

  export type NewsletterSubscriberOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    locale?: SortOrder
    status?: SortOrder
    source?: SortOrderInput | SortOrder
    confirmationTokenHash?: SortOrderInput | SortOrder
    unsubscribeToken?: SortOrder
    ipHash?: SortOrderInput | SortOrder
    userAgent?: SortOrderInput | SortOrder
    consentAt?: SortOrder
    confirmedAt?: SortOrderInput | SortOrder
    unsubscribedAt?: SortOrderInput | SortOrder
    lastSentAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: NewsletterSubscriberCountOrderByAggregateInput
    _max?: NewsletterSubscriberMaxOrderByAggregateInput
    _min?: NewsletterSubscriberMinOrderByAggregateInput
  }

  export type NewsletterSubscriberScalarWhereWithAggregatesInput = {
    AND?: NewsletterSubscriberScalarWhereWithAggregatesInput | NewsletterSubscriberScalarWhereWithAggregatesInput[]
    OR?: NewsletterSubscriberScalarWhereWithAggregatesInput[]
    NOT?: NewsletterSubscriberScalarWhereWithAggregatesInput | NewsletterSubscriberScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"NewsletterSubscriber"> | string
    email?: StringWithAggregatesFilter<"NewsletterSubscriber"> | string
    locale?: EnumLocaleWithAggregatesFilter<"NewsletterSubscriber"> | $Enums.Locale
    status?: EnumNewsletterSubscriberStatusWithAggregatesFilter<"NewsletterSubscriber"> | $Enums.NewsletterSubscriberStatus
    source?: StringNullableWithAggregatesFilter<"NewsletterSubscriber"> | string | null
    confirmationTokenHash?: StringNullableWithAggregatesFilter<"NewsletterSubscriber"> | string | null
    unsubscribeToken?: StringWithAggregatesFilter<"NewsletterSubscriber"> | string
    ipHash?: StringNullableWithAggregatesFilter<"NewsletterSubscriber"> | string | null
    userAgent?: StringNullableWithAggregatesFilter<"NewsletterSubscriber"> | string | null
    consentAt?: DateTimeWithAggregatesFilter<"NewsletterSubscriber"> | Date | string
    confirmedAt?: DateTimeNullableWithAggregatesFilter<"NewsletterSubscriber"> | Date | string | null
    unsubscribedAt?: DateTimeNullableWithAggregatesFilter<"NewsletterSubscriber"> | Date | string | null
    lastSentAt?: DateTimeNullableWithAggregatesFilter<"NewsletterSubscriber"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"NewsletterSubscriber"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"NewsletterSubscriber"> | Date | string
  }

  export type NewsletterPostSendWhereInput = {
    AND?: NewsletterPostSendWhereInput | NewsletterPostSendWhereInput[]
    OR?: NewsletterPostSendWhereInput[]
    NOT?: NewsletterPostSendWhereInput | NewsletterPostSendWhereInput[]
    id?: StringFilter<"NewsletterPostSend"> | string
    postId?: StringFilter<"NewsletterPostSend"> | string
    status?: EnumNewsletterPostSendStatusFilter<"NewsletterPostSend"> | $Enums.NewsletterPostSendStatus
    recipientCount?: IntFilter<"NewsletterPostSend"> | number
    sentCount?: IntFilter<"NewsletterPostSend"> | number
    failedCount?: IntFilter<"NewsletterPostSend"> | number
    errorMessage?: StringNullableFilter<"NewsletterPostSend"> | string | null
    startedAt?: DateTimeFilter<"NewsletterPostSend"> | Date | string
    completedAt?: DateTimeNullableFilter<"NewsletterPostSend"> | Date | string | null
    createdAt?: DateTimeFilter<"NewsletterPostSend"> | Date | string
    post?: XOR<BlogPostScalarRelationFilter, BlogPostWhereInput>
    emailEvents?: NewsletterEmailEventListRelationFilter
  }

  export type NewsletterPostSendOrderByWithRelationInput = {
    id?: SortOrder
    postId?: SortOrder
    status?: SortOrder
    recipientCount?: SortOrder
    sentCount?: SortOrder
    failedCount?: SortOrder
    errorMessage?: SortOrderInput | SortOrder
    startedAt?: SortOrder
    completedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    post?: BlogPostOrderByWithRelationInput
    emailEvents?: NewsletterEmailEventOrderByRelationAggregateInput
  }

  export type NewsletterPostSendWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: NewsletterPostSendWhereInput | NewsletterPostSendWhereInput[]
    OR?: NewsletterPostSendWhereInput[]
    NOT?: NewsletterPostSendWhereInput | NewsletterPostSendWhereInput[]
    postId?: StringFilter<"NewsletterPostSend"> | string
    status?: EnumNewsletterPostSendStatusFilter<"NewsletterPostSend"> | $Enums.NewsletterPostSendStatus
    recipientCount?: IntFilter<"NewsletterPostSend"> | number
    sentCount?: IntFilter<"NewsletterPostSend"> | number
    failedCount?: IntFilter<"NewsletterPostSend"> | number
    errorMessage?: StringNullableFilter<"NewsletterPostSend"> | string | null
    startedAt?: DateTimeFilter<"NewsletterPostSend"> | Date | string
    completedAt?: DateTimeNullableFilter<"NewsletterPostSend"> | Date | string | null
    createdAt?: DateTimeFilter<"NewsletterPostSend"> | Date | string
    post?: XOR<BlogPostScalarRelationFilter, BlogPostWhereInput>
    emailEvents?: NewsletterEmailEventListRelationFilter
  }, "id">

  export type NewsletterPostSendOrderByWithAggregationInput = {
    id?: SortOrder
    postId?: SortOrder
    status?: SortOrder
    recipientCount?: SortOrder
    sentCount?: SortOrder
    failedCount?: SortOrder
    errorMessage?: SortOrderInput | SortOrder
    startedAt?: SortOrder
    completedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: NewsletterPostSendCountOrderByAggregateInput
    _avg?: NewsletterPostSendAvgOrderByAggregateInput
    _max?: NewsletterPostSendMaxOrderByAggregateInput
    _min?: NewsletterPostSendMinOrderByAggregateInput
    _sum?: NewsletterPostSendSumOrderByAggregateInput
  }

  export type NewsletterPostSendScalarWhereWithAggregatesInput = {
    AND?: NewsletterPostSendScalarWhereWithAggregatesInput | NewsletterPostSendScalarWhereWithAggregatesInput[]
    OR?: NewsletterPostSendScalarWhereWithAggregatesInput[]
    NOT?: NewsletterPostSendScalarWhereWithAggregatesInput | NewsletterPostSendScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"NewsletterPostSend"> | string
    postId?: StringWithAggregatesFilter<"NewsletterPostSend"> | string
    status?: EnumNewsletterPostSendStatusWithAggregatesFilter<"NewsletterPostSend"> | $Enums.NewsletterPostSendStatus
    recipientCount?: IntWithAggregatesFilter<"NewsletterPostSend"> | number
    sentCount?: IntWithAggregatesFilter<"NewsletterPostSend"> | number
    failedCount?: IntWithAggregatesFilter<"NewsletterPostSend"> | number
    errorMessage?: StringNullableWithAggregatesFilter<"NewsletterPostSend"> | string | null
    startedAt?: DateTimeWithAggregatesFilter<"NewsletterPostSend"> | Date | string
    completedAt?: DateTimeNullableWithAggregatesFilter<"NewsletterPostSend"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"NewsletterPostSend"> | Date | string
  }

  export type NewsletterEmailEventWhereInput = {
    AND?: NewsletterEmailEventWhereInput | NewsletterEmailEventWhereInput[]
    OR?: NewsletterEmailEventWhereInput[]
    NOT?: NewsletterEmailEventWhereInput | NewsletterEmailEventWhereInput[]
    id?: StringFilter<"NewsletterEmailEvent"> | string
    subscriberId?: StringNullableFilter<"NewsletterEmailEvent"> | string | null
    postId?: StringNullableFilter<"NewsletterEmailEvent"> | string | null
    postSendId?: StringNullableFilter<"NewsletterEmailEvent"> | string | null
    type?: EnumNewsletterEmailTypeFilter<"NewsletterEmailEvent"> | $Enums.NewsletterEmailType
    status?: EnumNewsletterEmailStatusFilter<"NewsletterEmailEvent"> | $Enums.NewsletterEmailStatus
    toEmail?: StringFilter<"NewsletterEmailEvent"> | string
    subject?: StringFilter<"NewsletterEmailEvent"> | string
    resendEmailId?: StringNullableFilter<"NewsletterEmailEvent"> | string | null
    errorMessage?: StringNullableFilter<"NewsletterEmailEvent"> | string | null
    createdAt?: DateTimeFilter<"NewsletterEmailEvent"> | Date | string
    subscriber?: XOR<NewsletterSubscriberNullableScalarRelationFilter, NewsletterSubscriberWhereInput> | null
    post?: XOR<BlogPostNullableScalarRelationFilter, BlogPostWhereInput> | null
    postSend?: XOR<NewsletterPostSendNullableScalarRelationFilter, NewsletterPostSendWhereInput> | null
  }

  export type NewsletterEmailEventOrderByWithRelationInput = {
    id?: SortOrder
    subscriberId?: SortOrderInput | SortOrder
    postId?: SortOrderInput | SortOrder
    postSendId?: SortOrderInput | SortOrder
    type?: SortOrder
    status?: SortOrder
    toEmail?: SortOrder
    subject?: SortOrder
    resendEmailId?: SortOrderInput | SortOrder
    errorMessage?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    subscriber?: NewsletterSubscriberOrderByWithRelationInput
    post?: BlogPostOrderByWithRelationInput
    postSend?: NewsletterPostSendOrderByWithRelationInput
  }

  export type NewsletterEmailEventWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: NewsletterEmailEventWhereInput | NewsletterEmailEventWhereInput[]
    OR?: NewsletterEmailEventWhereInput[]
    NOT?: NewsletterEmailEventWhereInput | NewsletterEmailEventWhereInput[]
    subscriberId?: StringNullableFilter<"NewsletterEmailEvent"> | string | null
    postId?: StringNullableFilter<"NewsletterEmailEvent"> | string | null
    postSendId?: StringNullableFilter<"NewsletterEmailEvent"> | string | null
    type?: EnumNewsletterEmailTypeFilter<"NewsletterEmailEvent"> | $Enums.NewsletterEmailType
    status?: EnumNewsletterEmailStatusFilter<"NewsletterEmailEvent"> | $Enums.NewsletterEmailStatus
    toEmail?: StringFilter<"NewsletterEmailEvent"> | string
    subject?: StringFilter<"NewsletterEmailEvent"> | string
    resendEmailId?: StringNullableFilter<"NewsletterEmailEvent"> | string | null
    errorMessage?: StringNullableFilter<"NewsletterEmailEvent"> | string | null
    createdAt?: DateTimeFilter<"NewsletterEmailEvent"> | Date | string
    subscriber?: XOR<NewsletterSubscriberNullableScalarRelationFilter, NewsletterSubscriberWhereInput> | null
    post?: XOR<BlogPostNullableScalarRelationFilter, BlogPostWhereInput> | null
    postSend?: XOR<NewsletterPostSendNullableScalarRelationFilter, NewsletterPostSendWhereInput> | null
  }, "id">

  export type NewsletterEmailEventOrderByWithAggregationInput = {
    id?: SortOrder
    subscriberId?: SortOrderInput | SortOrder
    postId?: SortOrderInput | SortOrder
    postSendId?: SortOrderInput | SortOrder
    type?: SortOrder
    status?: SortOrder
    toEmail?: SortOrder
    subject?: SortOrder
    resendEmailId?: SortOrderInput | SortOrder
    errorMessage?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: NewsletterEmailEventCountOrderByAggregateInput
    _max?: NewsletterEmailEventMaxOrderByAggregateInput
    _min?: NewsletterEmailEventMinOrderByAggregateInput
  }

  export type NewsletterEmailEventScalarWhereWithAggregatesInput = {
    AND?: NewsletterEmailEventScalarWhereWithAggregatesInput | NewsletterEmailEventScalarWhereWithAggregatesInput[]
    OR?: NewsletterEmailEventScalarWhereWithAggregatesInput[]
    NOT?: NewsletterEmailEventScalarWhereWithAggregatesInput | NewsletterEmailEventScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"NewsletterEmailEvent"> | string
    subscriberId?: StringNullableWithAggregatesFilter<"NewsletterEmailEvent"> | string | null
    postId?: StringNullableWithAggregatesFilter<"NewsletterEmailEvent"> | string | null
    postSendId?: StringNullableWithAggregatesFilter<"NewsletterEmailEvent"> | string | null
    type?: EnumNewsletterEmailTypeWithAggregatesFilter<"NewsletterEmailEvent"> | $Enums.NewsletterEmailType
    status?: EnumNewsletterEmailStatusWithAggregatesFilter<"NewsletterEmailEvent"> | $Enums.NewsletterEmailStatus
    toEmail?: StringWithAggregatesFilter<"NewsletterEmailEvent"> | string
    subject?: StringWithAggregatesFilter<"NewsletterEmailEvent"> | string
    resendEmailId?: StringNullableWithAggregatesFilter<"NewsletterEmailEvent"> | string | null
    errorMessage?: StringNullableWithAggregatesFilter<"NewsletterEmailEvent"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"NewsletterEmailEvent"> | Date | string
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

  export type BlogPostCreateInput = {
    id?: string
    slug: string
    status?: $Enums.BlogPostStatus
    featured?: boolean
    tags?: BlogPostCreatetagsInput | string[]
    coverImageUrl?: string | null
    coverImageCredit?: string | null
    coverImageCreditUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    publishedAt?: Date | string | null
    translations?: BlogPostTranslationCreateNestedManyWithoutPostInput
    newsletterSends?: NewsletterPostSendCreateNestedManyWithoutPostInput
    newsletterEmailEvents?: NewsletterEmailEventCreateNestedManyWithoutPostInput
  }

  export type BlogPostUncheckedCreateInput = {
    id?: string
    slug: string
    status?: $Enums.BlogPostStatus
    featured?: boolean
    tags?: BlogPostCreatetagsInput | string[]
    coverImageUrl?: string | null
    coverImageCredit?: string | null
    coverImageCreditUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    publishedAt?: Date | string | null
    translations?: BlogPostTranslationUncheckedCreateNestedManyWithoutPostInput
    newsletterSends?: NewsletterPostSendUncheckedCreateNestedManyWithoutPostInput
    newsletterEmailEvents?: NewsletterEmailEventUncheckedCreateNestedManyWithoutPostInput
  }

  export type BlogPostUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    status?: EnumBlogPostStatusFieldUpdateOperationsInput | $Enums.BlogPostStatus
    featured?: BoolFieldUpdateOperationsInput | boolean
    tags?: BlogPostUpdatetagsInput | string[]
    coverImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    coverImageCredit?: NullableStringFieldUpdateOperationsInput | string | null
    coverImageCreditUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    translations?: BlogPostTranslationUpdateManyWithoutPostNestedInput
    newsletterSends?: NewsletterPostSendUpdateManyWithoutPostNestedInput
    newsletterEmailEvents?: NewsletterEmailEventUpdateManyWithoutPostNestedInput
  }

  export type BlogPostUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    status?: EnumBlogPostStatusFieldUpdateOperationsInput | $Enums.BlogPostStatus
    featured?: BoolFieldUpdateOperationsInput | boolean
    tags?: BlogPostUpdatetagsInput | string[]
    coverImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    coverImageCredit?: NullableStringFieldUpdateOperationsInput | string | null
    coverImageCreditUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    translations?: BlogPostTranslationUncheckedUpdateManyWithoutPostNestedInput
    newsletterSends?: NewsletterPostSendUncheckedUpdateManyWithoutPostNestedInput
    newsletterEmailEvents?: NewsletterEmailEventUncheckedUpdateManyWithoutPostNestedInput
  }

  export type BlogPostCreateManyInput = {
    id?: string
    slug: string
    status?: $Enums.BlogPostStatus
    featured?: boolean
    tags?: BlogPostCreatetagsInput | string[]
    coverImageUrl?: string | null
    coverImageCredit?: string | null
    coverImageCreditUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    publishedAt?: Date | string | null
  }

  export type BlogPostUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    status?: EnumBlogPostStatusFieldUpdateOperationsInput | $Enums.BlogPostStatus
    featured?: BoolFieldUpdateOperationsInput | boolean
    tags?: BlogPostUpdatetagsInput | string[]
    coverImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    coverImageCredit?: NullableStringFieldUpdateOperationsInput | string | null
    coverImageCreditUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type BlogPostUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    status?: EnumBlogPostStatusFieldUpdateOperationsInput | $Enums.BlogPostStatus
    featured?: BoolFieldUpdateOperationsInput | boolean
    tags?: BlogPostUpdatetagsInput | string[]
    coverImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    coverImageCredit?: NullableStringFieldUpdateOperationsInput | string | null
    coverImageCreditUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type BlogPostTranslationCreateInput = {
    id?: string
    locale: $Enums.Locale
    title: string
    excerpt?: string | null
    contentMarkdown: string
    seoTitle?: string | null
    seoDescription?: string | null
    coverImageAlt?: string | null
    coverImageCaption?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    post: BlogPostCreateNestedOneWithoutTranslationsInput
  }

  export type BlogPostTranslationUncheckedCreateInput = {
    id?: string
    postId: string
    locale: $Enums.Locale
    title: string
    excerpt?: string | null
    contentMarkdown: string
    seoTitle?: string | null
    seoDescription?: string | null
    coverImageAlt?: string | null
    coverImageCaption?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BlogPostTranslationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    locale?: EnumLocaleFieldUpdateOperationsInput | $Enums.Locale
    title?: StringFieldUpdateOperationsInput | string
    excerpt?: NullableStringFieldUpdateOperationsInput | string | null
    contentMarkdown?: StringFieldUpdateOperationsInput | string
    seoTitle?: NullableStringFieldUpdateOperationsInput | string | null
    seoDescription?: NullableStringFieldUpdateOperationsInput | string | null
    coverImageAlt?: NullableStringFieldUpdateOperationsInput | string | null
    coverImageCaption?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    post?: BlogPostUpdateOneRequiredWithoutTranslationsNestedInput
  }

  export type BlogPostTranslationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    postId?: StringFieldUpdateOperationsInput | string
    locale?: EnumLocaleFieldUpdateOperationsInput | $Enums.Locale
    title?: StringFieldUpdateOperationsInput | string
    excerpt?: NullableStringFieldUpdateOperationsInput | string | null
    contentMarkdown?: StringFieldUpdateOperationsInput | string
    seoTitle?: NullableStringFieldUpdateOperationsInput | string | null
    seoDescription?: NullableStringFieldUpdateOperationsInput | string | null
    coverImageAlt?: NullableStringFieldUpdateOperationsInput | string | null
    coverImageCaption?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BlogPostTranslationCreateManyInput = {
    id?: string
    postId: string
    locale: $Enums.Locale
    title: string
    excerpt?: string | null
    contentMarkdown: string
    seoTitle?: string | null
    seoDescription?: string | null
    coverImageAlt?: string | null
    coverImageCaption?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BlogPostTranslationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    locale?: EnumLocaleFieldUpdateOperationsInput | $Enums.Locale
    title?: StringFieldUpdateOperationsInput | string
    excerpt?: NullableStringFieldUpdateOperationsInput | string | null
    contentMarkdown?: StringFieldUpdateOperationsInput | string
    seoTitle?: NullableStringFieldUpdateOperationsInput | string | null
    seoDescription?: NullableStringFieldUpdateOperationsInput | string | null
    coverImageAlt?: NullableStringFieldUpdateOperationsInput | string | null
    coverImageCaption?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BlogPostTranslationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    postId?: StringFieldUpdateOperationsInput | string
    locale?: EnumLocaleFieldUpdateOperationsInput | $Enums.Locale
    title?: StringFieldUpdateOperationsInput | string
    excerpt?: NullableStringFieldUpdateOperationsInput | string | null
    contentMarkdown?: StringFieldUpdateOperationsInput | string
    seoTitle?: NullableStringFieldUpdateOperationsInput | string | null
    seoDescription?: NullableStringFieldUpdateOperationsInput | string | null
    coverImageAlt?: NullableStringFieldUpdateOperationsInput | string | null
    coverImageCaption?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NewsletterSubscriberCreateInput = {
    id?: string
    email: string
    locale?: $Enums.Locale
    status?: $Enums.NewsletterSubscriberStatus
    source?: string | null
    confirmationTokenHash?: string | null
    unsubscribeToken: string
    ipHash?: string | null
    userAgent?: string | null
    consentAt?: Date | string
    confirmedAt?: Date | string | null
    unsubscribedAt?: Date | string | null
    lastSentAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    emailEvents?: NewsletterEmailEventCreateNestedManyWithoutSubscriberInput
  }

  export type NewsletterSubscriberUncheckedCreateInput = {
    id?: string
    email: string
    locale?: $Enums.Locale
    status?: $Enums.NewsletterSubscriberStatus
    source?: string | null
    confirmationTokenHash?: string | null
    unsubscribeToken: string
    ipHash?: string | null
    userAgent?: string | null
    consentAt?: Date | string
    confirmedAt?: Date | string | null
    unsubscribedAt?: Date | string | null
    lastSentAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    emailEvents?: NewsletterEmailEventUncheckedCreateNestedManyWithoutSubscriberInput
  }

  export type NewsletterSubscriberUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    locale?: EnumLocaleFieldUpdateOperationsInput | $Enums.Locale
    status?: EnumNewsletterSubscriberStatusFieldUpdateOperationsInput | $Enums.NewsletterSubscriberStatus
    source?: NullableStringFieldUpdateOperationsInput | string | null
    confirmationTokenHash?: NullableStringFieldUpdateOperationsInput | string | null
    unsubscribeToken?: StringFieldUpdateOperationsInput | string
    ipHash?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    consentAt?: DateTimeFieldUpdateOperationsInput | Date | string
    confirmedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    unsubscribedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastSentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    emailEvents?: NewsletterEmailEventUpdateManyWithoutSubscriberNestedInput
  }

  export type NewsletterSubscriberUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    locale?: EnumLocaleFieldUpdateOperationsInput | $Enums.Locale
    status?: EnumNewsletterSubscriberStatusFieldUpdateOperationsInput | $Enums.NewsletterSubscriberStatus
    source?: NullableStringFieldUpdateOperationsInput | string | null
    confirmationTokenHash?: NullableStringFieldUpdateOperationsInput | string | null
    unsubscribeToken?: StringFieldUpdateOperationsInput | string
    ipHash?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    consentAt?: DateTimeFieldUpdateOperationsInput | Date | string
    confirmedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    unsubscribedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastSentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    emailEvents?: NewsletterEmailEventUncheckedUpdateManyWithoutSubscriberNestedInput
  }

  export type NewsletterSubscriberCreateManyInput = {
    id?: string
    email: string
    locale?: $Enums.Locale
    status?: $Enums.NewsletterSubscriberStatus
    source?: string | null
    confirmationTokenHash?: string | null
    unsubscribeToken: string
    ipHash?: string | null
    userAgent?: string | null
    consentAt?: Date | string
    confirmedAt?: Date | string | null
    unsubscribedAt?: Date | string | null
    lastSentAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type NewsletterSubscriberUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    locale?: EnumLocaleFieldUpdateOperationsInput | $Enums.Locale
    status?: EnumNewsletterSubscriberStatusFieldUpdateOperationsInput | $Enums.NewsletterSubscriberStatus
    source?: NullableStringFieldUpdateOperationsInput | string | null
    confirmationTokenHash?: NullableStringFieldUpdateOperationsInput | string | null
    unsubscribeToken?: StringFieldUpdateOperationsInput | string
    ipHash?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    consentAt?: DateTimeFieldUpdateOperationsInput | Date | string
    confirmedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    unsubscribedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastSentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NewsletterSubscriberUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    locale?: EnumLocaleFieldUpdateOperationsInput | $Enums.Locale
    status?: EnumNewsletterSubscriberStatusFieldUpdateOperationsInput | $Enums.NewsletterSubscriberStatus
    source?: NullableStringFieldUpdateOperationsInput | string | null
    confirmationTokenHash?: NullableStringFieldUpdateOperationsInput | string | null
    unsubscribeToken?: StringFieldUpdateOperationsInput | string
    ipHash?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    consentAt?: DateTimeFieldUpdateOperationsInput | Date | string
    confirmedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    unsubscribedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastSentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NewsletterPostSendCreateInput = {
    id?: string
    status: $Enums.NewsletterPostSendStatus
    recipientCount?: number
    sentCount?: number
    failedCount?: number
    errorMessage?: string | null
    startedAt?: Date | string
    completedAt?: Date | string | null
    createdAt?: Date | string
    post: BlogPostCreateNestedOneWithoutNewsletterSendsInput
    emailEvents?: NewsletterEmailEventCreateNestedManyWithoutPostSendInput
  }

  export type NewsletterPostSendUncheckedCreateInput = {
    id?: string
    postId: string
    status: $Enums.NewsletterPostSendStatus
    recipientCount?: number
    sentCount?: number
    failedCount?: number
    errorMessage?: string | null
    startedAt?: Date | string
    completedAt?: Date | string | null
    createdAt?: Date | string
    emailEvents?: NewsletterEmailEventUncheckedCreateNestedManyWithoutPostSendInput
  }

  export type NewsletterPostSendUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumNewsletterPostSendStatusFieldUpdateOperationsInput | $Enums.NewsletterPostSendStatus
    recipientCount?: IntFieldUpdateOperationsInput | number
    sentCount?: IntFieldUpdateOperationsInput | number
    failedCount?: IntFieldUpdateOperationsInput | number
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    post?: BlogPostUpdateOneRequiredWithoutNewsletterSendsNestedInput
    emailEvents?: NewsletterEmailEventUpdateManyWithoutPostSendNestedInput
  }

  export type NewsletterPostSendUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    postId?: StringFieldUpdateOperationsInput | string
    status?: EnumNewsletterPostSendStatusFieldUpdateOperationsInput | $Enums.NewsletterPostSendStatus
    recipientCount?: IntFieldUpdateOperationsInput | number
    sentCount?: IntFieldUpdateOperationsInput | number
    failedCount?: IntFieldUpdateOperationsInput | number
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    emailEvents?: NewsletterEmailEventUncheckedUpdateManyWithoutPostSendNestedInput
  }

  export type NewsletterPostSendCreateManyInput = {
    id?: string
    postId: string
    status: $Enums.NewsletterPostSendStatus
    recipientCount?: number
    sentCount?: number
    failedCount?: number
    errorMessage?: string | null
    startedAt?: Date | string
    completedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type NewsletterPostSendUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumNewsletterPostSendStatusFieldUpdateOperationsInput | $Enums.NewsletterPostSendStatus
    recipientCount?: IntFieldUpdateOperationsInput | number
    sentCount?: IntFieldUpdateOperationsInput | number
    failedCount?: IntFieldUpdateOperationsInput | number
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NewsletterPostSendUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    postId?: StringFieldUpdateOperationsInput | string
    status?: EnumNewsletterPostSendStatusFieldUpdateOperationsInput | $Enums.NewsletterPostSendStatus
    recipientCount?: IntFieldUpdateOperationsInput | number
    sentCount?: IntFieldUpdateOperationsInput | number
    failedCount?: IntFieldUpdateOperationsInput | number
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NewsletterEmailEventCreateInput = {
    id?: string
    type: $Enums.NewsletterEmailType
    status: $Enums.NewsletterEmailStatus
    toEmail: string
    subject: string
    resendEmailId?: string | null
    errorMessage?: string | null
    createdAt?: Date | string
    subscriber?: NewsletterSubscriberCreateNestedOneWithoutEmailEventsInput
    post?: BlogPostCreateNestedOneWithoutNewsletterEmailEventsInput
    postSend?: NewsletterPostSendCreateNestedOneWithoutEmailEventsInput
  }

  export type NewsletterEmailEventUncheckedCreateInput = {
    id?: string
    subscriberId?: string | null
    postId?: string | null
    postSendId?: string | null
    type: $Enums.NewsletterEmailType
    status: $Enums.NewsletterEmailStatus
    toEmail: string
    subject: string
    resendEmailId?: string | null
    errorMessage?: string | null
    createdAt?: Date | string
  }

  export type NewsletterEmailEventUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumNewsletterEmailTypeFieldUpdateOperationsInput | $Enums.NewsletterEmailType
    status?: EnumNewsletterEmailStatusFieldUpdateOperationsInput | $Enums.NewsletterEmailStatus
    toEmail?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    resendEmailId?: NullableStringFieldUpdateOperationsInput | string | null
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subscriber?: NewsletterSubscriberUpdateOneWithoutEmailEventsNestedInput
    post?: BlogPostUpdateOneWithoutNewsletterEmailEventsNestedInput
    postSend?: NewsletterPostSendUpdateOneWithoutEmailEventsNestedInput
  }

  export type NewsletterEmailEventUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    subscriberId?: NullableStringFieldUpdateOperationsInput | string | null
    postId?: NullableStringFieldUpdateOperationsInput | string | null
    postSendId?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumNewsletterEmailTypeFieldUpdateOperationsInput | $Enums.NewsletterEmailType
    status?: EnumNewsletterEmailStatusFieldUpdateOperationsInput | $Enums.NewsletterEmailStatus
    toEmail?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    resendEmailId?: NullableStringFieldUpdateOperationsInput | string | null
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NewsletterEmailEventCreateManyInput = {
    id?: string
    subscriberId?: string | null
    postId?: string | null
    postSendId?: string | null
    type: $Enums.NewsletterEmailType
    status: $Enums.NewsletterEmailStatus
    toEmail: string
    subject: string
    resendEmailId?: string | null
    errorMessage?: string | null
    createdAt?: Date | string
  }

  export type NewsletterEmailEventUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumNewsletterEmailTypeFieldUpdateOperationsInput | $Enums.NewsletterEmailType
    status?: EnumNewsletterEmailStatusFieldUpdateOperationsInput | $Enums.NewsletterEmailStatus
    toEmail?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    resendEmailId?: NullableStringFieldUpdateOperationsInput | string | null
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NewsletterEmailEventUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    subscriberId?: NullableStringFieldUpdateOperationsInput | string | null
    postId?: NullableStringFieldUpdateOperationsInput | string | null
    postSendId?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumNewsletterEmailTypeFieldUpdateOperationsInput | $Enums.NewsletterEmailType
    status?: EnumNewsletterEmailStatusFieldUpdateOperationsInput | $Enums.NewsletterEmailStatus
    toEmail?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    resendEmailId?: NullableStringFieldUpdateOperationsInput | string | null
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
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

  export type EnumBlogPostStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.BlogPostStatus | EnumBlogPostStatusFieldRefInput<$PrismaModel>
    in?: $Enums.BlogPostStatus[] | ListEnumBlogPostStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.BlogPostStatus[] | ListEnumBlogPostStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumBlogPostStatusFilter<$PrismaModel> | $Enums.BlogPostStatus
  }

  export type BlogPostTranslationListRelationFilter = {
    every?: BlogPostTranslationWhereInput
    some?: BlogPostTranslationWhereInput
    none?: BlogPostTranslationWhereInput
  }

  export type NewsletterPostSendListRelationFilter = {
    every?: NewsletterPostSendWhereInput
    some?: NewsletterPostSendWhereInput
    none?: NewsletterPostSendWhereInput
  }

  export type NewsletterEmailEventListRelationFilter = {
    every?: NewsletterEmailEventWhereInput
    some?: NewsletterEmailEventWhereInput
    none?: NewsletterEmailEventWhereInput
  }

  export type BlogPostTranslationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type NewsletterPostSendOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type NewsletterEmailEventOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type BlogPostCountOrderByAggregateInput = {
    id?: SortOrder
    slug?: SortOrder
    status?: SortOrder
    featured?: SortOrder
    tags?: SortOrder
    coverImageUrl?: SortOrder
    coverImageCredit?: SortOrder
    coverImageCreditUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    publishedAt?: SortOrder
  }

  export type BlogPostMaxOrderByAggregateInput = {
    id?: SortOrder
    slug?: SortOrder
    status?: SortOrder
    featured?: SortOrder
    coverImageUrl?: SortOrder
    coverImageCredit?: SortOrder
    coverImageCreditUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    publishedAt?: SortOrder
  }

  export type BlogPostMinOrderByAggregateInput = {
    id?: SortOrder
    slug?: SortOrder
    status?: SortOrder
    featured?: SortOrder
    coverImageUrl?: SortOrder
    coverImageCredit?: SortOrder
    coverImageCreditUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    publishedAt?: SortOrder
  }

  export type EnumBlogPostStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BlogPostStatus | EnumBlogPostStatusFieldRefInput<$PrismaModel>
    in?: $Enums.BlogPostStatus[] | ListEnumBlogPostStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.BlogPostStatus[] | ListEnumBlogPostStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumBlogPostStatusWithAggregatesFilter<$PrismaModel> | $Enums.BlogPostStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumBlogPostStatusFilter<$PrismaModel>
    _max?: NestedEnumBlogPostStatusFilter<$PrismaModel>
  }

  export type BlogPostScalarRelationFilter = {
    is?: BlogPostWhereInput
    isNot?: BlogPostWhereInput
  }

  export type BlogPostTranslationPostIdLocaleCompoundUniqueInput = {
    postId: string
    locale: $Enums.Locale
  }

  export type BlogPostTranslationCountOrderByAggregateInput = {
    id?: SortOrder
    postId?: SortOrder
    locale?: SortOrder
    title?: SortOrder
    excerpt?: SortOrder
    contentMarkdown?: SortOrder
    seoTitle?: SortOrder
    seoDescription?: SortOrder
    coverImageAlt?: SortOrder
    coverImageCaption?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BlogPostTranslationMaxOrderByAggregateInput = {
    id?: SortOrder
    postId?: SortOrder
    locale?: SortOrder
    title?: SortOrder
    excerpt?: SortOrder
    contentMarkdown?: SortOrder
    seoTitle?: SortOrder
    seoDescription?: SortOrder
    coverImageAlt?: SortOrder
    coverImageCaption?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BlogPostTranslationMinOrderByAggregateInput = {
    id?: SortOrder
    postId?: SortOrder
    locale?: SortOrder
    title?: SortOrder
    excerpt?: SortOrder
    contentMarkdown?: SortOrder
    seoTitle?: SortOrder
    seoDescription?: SortOrder
    coverImageAlt?: SortOrder
    coverImageCaption?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumNewsletterSubscriberStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.NewsletterSubscriberStatus | EnumNewsletterSubscriberStatusFieldRefInput<$PrismaModel>
    in?: $Enums.NewsletterSubscriberStatus[] | ListEnumNewsletterSubscriberStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.NewsletterSubscriberStatus[] | ListEnumNewsletterSubscriberStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumNewsletterSubscriberStatusFilter<$PrismaModel> | $Enums.NewsletterSubscriberStatus
  }

  export type NewsletterSubscriberCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    locale?: SortOrder
    status?: SortOrder
    source?: SortOrder
    confirmationTokenHash?: SortOrder
    unsubscribeToken?: SortOrder
    ipHash?: SortOrder
    userAgent?: SortOrder
    consentAt?: SortOrder
    confirmedAt?: SortOrder
    unsubscribedAt?: SortOrder
    lastSentAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type NewsletterSubscriberMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    locale?: SortOrder
    status?: SortOrder
    source?: SortOrder
    confirmationTokenHash?: SortOrder
    unsubscribeToken?: SortOrder
    ipHash?: SortOrder
    userAgent?: SortOrder
    consentAt?: SortOrder
    confirmedAt?: SortOrder
    unsubscribedAt?: SortOrder
    lastSentAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type NewsletterSubscriberMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    locale?: SortOrder
    status?: SortOrder
    source?: SortOrder
    confirmationTokenHash?: SortOrder
    unsubscribeToken?: SortOrder
    ipHash?: SortOrder
    userAgent?: SortOrder
    consentAt?: SortOrder
    confirmedAt?: SortOrder
    unsubscribedAt?: SortOrder
    lastSentAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumNewsletterSubscriberStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.NewsletterSubscriberStatus | EnumNewsletterSubscriberStatusFieldRefInput<$PrismaModel>
    in?: $Enums.NewsletterSubscriberStatus[] | ListEnumNewsletterSubscriberStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.NewsletterSubscriberStatus[] | ListEnumNewsletterSubscriberStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumNewsletterSubscriberStatusWithAggregatesFilter<$PrismaModel> | $Enums.NewsletterSubscriberStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumNewsletterSubscriberStatusFilter<$PrismaModel>
    _max?: NestedEnumNewsletterSubscriberStatusFilter<$PrismaModel>
  }

  export type EnumNewsletterPostSendStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.NewsletterPostSendStatus | EnumNewsletterPostSendStatusFieldRefInput<$PrismaModel>
    in?: $Enums.NewsletterPostSendStatus[] | ListEnumNewsletterPostSendStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.NewsletterPostSendStatus[] | ListEnumNewsletterPostSendStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumNewsletterPostSendStatusFilter<$PrismaModel> | $Enums.NewsletterPostSendStatus
  }

  export type NewsletterPostSendCountOrderByAggregateInput = {
    id?: SortOrder
    postId?: SortOrder
    status?: SortOrder
    recipientCount?: SortOrder
    sentCount?: SortOrder
    failedCount?: SortOrder
    errorMessage?: SortOrder
    startedAt?: SortOrder
    completedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type NewsletterPostSendAvgOrderByAggregateInput = {
    recipientCount?: SortOrder
    sentCount?: SortOrder
    failedCount?: SortOrder
  }

  export type NewsletterPostSendMaxOrderByAggregateInput = {
    id?: SortOrder
    postId?: SortOrder
    status?: SortOrder
    recipientCount?: SortOrder
    sentCount?: SortOrder
    failedCount?: SortOrder
    errorMessage?: SortOrder
    startedAt?: SortOrder
    completedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type NewsletterPostSendMinOrderByAggregateInput = {
    id?: SortOrder
    postId?: SortOrder
    status?: SortOrder
    recipientCount?: SortOrder
    sentCount?: SortOrder
    failedCount?: SortOrder
    errorMessage?: SortOrder
    startedAt?: SortOrder
    completedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type NewsletterPostSendSumOrderByAggregateInput = {
    recipientCount?: SortOrder
    sentCount?: SortOrder
    failedCount?: SortOrder
  }

  export type EnumNewsletterPostSendStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.NewsletterPostSendStatus | EnumNewsletterPostSendStatusFieldRefInput<$PrismaModel>
    in?: $Enums.NewsletterPostSendStatus[] | ListEnumNewsletterPostSendStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.NewsletterPostSendStatus[] | ListEnumNewsletterPostSendStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumNewsletterPostSendStatusWithAggregatesFilter<$PrismaModel> | $Enums.NewsletterPostSendStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumNewsletterPostSendStatusFilter<$PrismaModel>
    _max?: NestedEnumNewsletterPostSendStatusFilter<$PrismaModel>
  }

  export type EnumNewsletterEmailTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.NewsletterEmailType | EnumNewsletterEmailTypeFieldRefInput<$PrismaModel>
    in?: $Enums.NewsletterEmailType[] | ListEnumNewsletterEmailTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.NewsletterEmailType[] | ListEnumNewsletterEmailTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumNewsletterEmailTypeFilter<$PrismaModel> | $Enums.NewsletterEmailType
  }

  export type EnumNewsletterEmailStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.NewsletterEmailStatus | EnumNewsletterEmailStatusFieldRefInput<$PrismaModel>
    in?: $Enums.NewsletterEmailStatus[] | ListEnumNewsletterEmailStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.NewsletterEmailStatus[] | ListEnumNewsletterEmailStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumNewsletterEmailStatusFilter<$PrismaModel> | $Enums.NewsletterEmailStatus
  }

  export type NewsletterSubscriberNullableScalarRelationFilter = {
    is?: NewsletterSubscriberWhereInput | null
    isNot?: NewsletterSubscriberWhereInput | null
  }

  export type BlogPostNullableScalarRelationFilter = {
    is?: BlogPostWhereInput | null
    isNot?: BlogPostWhereInput | null
  }

  export type NewsletterPostSendNullableScalarRelationFilter = {
    is?: NewsletterPostSendWhereInput | null
    isNot?: NewsletterPostSendWhereInput | null
  }

  export type NewsletterEmailEventCountOrderByAggregateInput = {
    id?: SortOrder
    subscriberId?: SortOrder
    postId?: SortOrder
    postSendId?: SortOrder
    type?: SortOrder
    status?: SortOrder
    toEmail?: SortOrder
    subject?: SortOrder
    resendEmailId?: SortOrder
    errorMessage?: SortOrder
    createdAt?: SortOrder
  }

  export type NewsletterEmailEventMaxOrderByAggregateInput = {
    id?: SortOrder
    subscriberId?: SortOrder
    postId?: SortOrder
    postSendId?: SortOrder
    type?: SortOrder
    status?: SortOrder
    toEmail?: SortOrder
    subject?: SortOrder
    resendEmailId?: SortOrder
    errorMessage?: SortOrder
    createdAt?: SortOrder
  }

  export type NewsletterEmailEventMinOrderByAggregateInput = {
    id?: SortOrder
    subscriberId?: SortOrder
    postId?: SortOrder
    postSendId?: SortOrder
    type?: SortOrder
    status?: SortOrder
    toEmail?: SortOrder
    subject?: SortOrder
    resendEmailId?: SortOrder
    errorMessage?: SortOrder
    createdAt?: SortOrder
  }

  export type EnumNewsletterEmailTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.NewsletterEmailType | EnumNewsletterEmailTypeFieldRefInput<$PrismaModel>
    in?: $Enums.NewsletterEmailType[] | ListEnumNewsletterEmailTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.NewsletterEmailType[] | ListEnumNewsletterEmailTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumNewsletterEmailTypeWithAggregatesFilter<$PrismaModel> | $Enums.NewsletterEmailType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumNewsletterEmailTypeFilter<$PrismaModel>
    _max?: NestedEnumNewsletterEmailTypeFilter<$PrismaModel>
  }

  export type EnumNewsletterEmailStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.NewsletterEmailStatus | EnumNewsletterEmailStatusFieldRefInput<$PrismaModel>
    in?: $Enums.NewsletterEmailStatus[] | ListEnumNewsletterEmailStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.NewsletterEmailStatus[] | ListEnumNewsletterEmailStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumNewsletterEmailStatusWithAggregatesFilter<$PrismaModel> | $Enums.NewsletterEmailStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumNewsletterEmailStatusFilter<$PrismaModel>
    _max?: NestedEnumNewsletterEmailStatusFilter<$PrismaModel>
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

  export type BlogPostCreatetagsInput = {
    set: string[]
  }

  export type BlogPostTranslationCreateNestedManyWithoutPostInput = {
    create?: XOR<BlogPostTranslationCreateWithoutPostInput, BlogPostTranslationUncheckedCreateWithoutPostInput> | BlogPostTranslationCreateWithoutPostInput[] | BlogPostTranslationUncheckedCreateWithoutPostInput[]
    connectOrCreate?: BlogPostTranslationCreateOrConnectWithoutPostInput | BlogPostTranslationCreateOrConnectWithoutPostInput[]
    createMany?: BlogPostTranslationCreateManyPostInputEnvelope
    connect?: BlogPostTranslationWhereUniqueInput | BlogPostTranslationWhereUniqueInput[]
  }

  export type NewsletterPostSendCreateNestedManyWithoutPostInput = {
    create?: XOR<NewsletterPostSendCreateWithoutPostInput, NewsletterPostSendUncheckedCreateWithoutPostInput> | NewsletterPostSendCreateWithoutPostInput[] | NewsletterPostSendUncheckedCreateWithoutPostInput[]
    connectOrCreate?: NewsletterPostSendCreateOrConnectWithoutPostInput | NewsletterPostSendCreateOrConnectWithoutPostInput[]
    createMany?: NewsletterPostSendCreateManyPostInputEnvelope
    connect?: NewsletterPostSendWhereUniqueInput | NewsletterPostSendWhereUniqueInput[]
  }

  export type NewsletterEmailEventCreateNestedManyWithoutPostInput = {
    create?: XOR<NewsletterEmailEventCreateWithoutPostInput, NewsletterEmailEventUncheckedCreateWithoutPostInput> | NewsletterEmailEventCreateWithoutPostInput[] | NewsletterEmailEventUncheckedCreateWithoutPostInput[]
    connectOrCreate?: NewsletterEmailEventCreateOrConnectWithoutPostInput | NewsletterEmailEventCreateOrConnectWithoutPostInput[]
    createMany?: NewsletterEmailEventCreateManyPostInputEnvelope
    connect?: NewsletterEmailEventWhereUniqueInput | NewsletterEmailEventWhereUniqueInput[]
  }

  export type BlogPostTranslationUncheckedCreateNestedManyWithoutPostInput = {
    create?: XOR<BlogPostTranslationCreateWithoutPostInput, BlogPostTranslationUncheckedCreateWithoutPostInput> | BlogPostTranslationCreateWithoutPostInput[] | BlogPostTranslationUncheckedCreateWithoutPostInput[]
    connectOrCreate?: BlogPostTranslationCreateOrConnectWithoutPostInput | BlogPostTranslationCreateOrConnectWithoutPostInput[]
    createMany?: BlogPostTranslationCreateManyPostInputEnvelope
    connect?: BlogPostTranslationWhereUniqueInput | BlogPostTranslationWhereUniqueInput[]
  }

  export type NewsletterPostSendUncheckedCreateNestedManyWithoutPostInput = {
    create?: XOR<NewsletterPostSendCreateWithoutPostInput, NewsletterPostSendUncheckedCreateWithoutPostInput> | NewsletterPostSendCreateWithoutPostInput[] | NewsletterPostSendUncheckedCreateWithoutPostInput[]
    connectOrCreate?: NewsletterPostSendCreateOrConnectWithoutPostInput | NewsletterPostSendCreateOrConnectWithoutPostInput[]
    createMany?: NewsletterPostSendCreateManyPostInputEnvelope
    connect?: NewsletterPostSendWhereUniqueInput | NewsletterPostSendWhereUniqueInput[]
  }

  export type NewsletterEmailEventUncheckedCreateNestedManyWithoutPostInput = {
    create?: XOR<NewsletterEmailEventCreateWithoutPostInput, NewsletterEmailEventUncheckedCreateWithoutPostInput> | NewsletterEmailEventCreateWithoutPostInput[] | NewsletterEmailEventUncheckedCreateWithoutPostInput[]
    connectOrCreate?: NewsletterEmailEventCreateOrConnectWithoutPostInput | NewsletterEmailEventCreateOrConnectWithoutPostInput[]
    createMany?: NewsletterEmailEventCreateManyPostInputEnvelope
    connect?: NewsletterEmailEventWhereUniqueInput | NewsletterEmailEventWhereUniqueInput[]
  }

  export type EnumBlogPostStatusFieldUpdateOperationsInput = {
    set?: $Enums.BlogPostStatus
  }

  export type BlogPostUpdatetagsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type BlogPostTranslationUpdateManyWithoutPostNestedInput = {
    create?: XOR<BlogPostTranslationCreateWithoutPostInput, BlogPostTranslationUncheckedCreateWithoutPostInput> | BlogPostTranslationCreateWithoutPostInput[] | BlogPostTranslationUncheckedCreateWithoutPostInput[]
    connectOrCreate?: BlogPostTranslationCreateOrConnectWithoutPostInput | BlogPostTranslationCreateOrConnectWithoutPostInput[]
    upsert?: BlogPostTranslationUpsertWithWhereUniqueWithoutPostInput | BlogPostTranslationUpsertWithWhereUniqueWithoutPostInput[]
    createMany?: BlogPostTranslationCreateManyPostInputEnvelope
    set?: BlogPostTranslationWhereUniqueInput | BlogPostTranslationWhereUniqueInput[]
    disconnect?: BlogPostTranslationWhereUniqueInput | BlogPostTranslationWhereUniqueInput[]
    delete?: BlogPostTranslationWhereUniqueInput | BlogPostTranslationWhereUniqueInput[]
    connect?: BlogPostTranslationWhereUniqueInput | BlogPostTranslationWhereUniqueInput[]
    update?: BlogPostTranslationUpdateWithWhereUniqueWithoutPostInput | BlogPostTranslationUpdateWithWhereUniqueWithoutPostInput[]
    updateMany?: BlogPostTranslationUpdateManyWithWhereWithoutPostInput | BlogPostTranslationUpdateManyWithWhereWithoutPostInput[]
    deleteMany?: BlogPostTranslationScalarWhereInput | BlogPostTranslationScalarWhereInput[]
  }

  export type NewsletterPostSendUpdateManyWithoutPostNestedInput = {
    create?: XOR<NewsletterPostSendCreateWithoutPostInput, NewsletterPostSendUncheckedCreateWithoutPostInput> | NewsletterPostSendCreateWithoutPostInput[] | NewsletterPostSendUncheckedCreateWithoutPostInput[]
    connectOrCreate?: NewsletterPostSendCreateOrConnectWithoutPostInput | NewsletterPostSendCreateOrConnectWithoutPostInput[]
    upsert?: NewsletterPostSendUpsertWithWhereUniqueWithoutPostInput | NewsletterPostSendUpsertWithWhereUniqueWithoutPostInput[]
    createMany?: NewsletterPostSendCreateManyPostInputEnvelope
    set?: NewsletterPostSendWhereUniqueInput | NewsletterPostSendWhereUniqueInput[]
    disconnect?: NewsletterPostSendWhereUniqueInput | NewsletterPostSendWhereUniqueInput[]
    delete?: NewsletterPostSendWhereUniqueInput | NewsletterPostSendWhereUniqueInput[]
    connect?: NewsletterPostSendWhereUniqueInput | NewsletterPostSendWhereUniqueInput[]
    update?: NewsletterPostSendUpdateWithWhereUniqueWithoutPostInput | NewsletterPostSendUpdateWithWhereUniqueWithoutPostInput[]
    updateMany?: NewsletterPostSendUpdateManyWithWhereWithoutPostInput | NewsletterPostSendUpdateManyWithWhereWithoutPostInput[]
    deleteMany?: NewsletterPostSendScalarWhereInput | NewsletterPostSendScalarWhereInput[]
  }

  export type NewsletterEmailEventUpdateManyWithoutPostNestedInput = {
    create?: XOR<NewsletterEmailEventCreateWithoutPostInput, NewsletterEmailEventUncheckedCreateWithoutPostInput> | NewsletterEmailEventCreateWithoutPostInput[] | NewsletterEmailEventUncheckedCreateWithoutPostInput[]
    connectOrCreate?: NewsletterEmailEventCreateOrConnectWithoutPostInput | NewsletterEmailEventCreateOrConnectWithoutPostInput[]
    upsert?: NewsletterEmailEventUpsertWithWhereUniqueWithoutPostInput | NewsletterEmailEventUpsertWithWhereUniqueWithoutPostInput[]
    createMany?: NewsletterEmailEventCreateManyPostInputEnvelope
    set?: NewsletterEmailEventWhereUniqueInput | NewsletterEmailEventWhereUniqueInput[]
    disconnect?: NewsletterEmailEventWhereUniqueInput | NewsletterEmailEventWhereUniqueInput[]
    delete?: NewsletterEmailEventWhereUniqueInput | NewsletterEmailEventWhereUniqueInput[]
    connect?: NewsletterEmailEventWhereUniqueInput | NewsletterEmailEventWhereUniqueInput[]
    update?: NewsletterEmailEventUpdateWithWhereUniqueWithoutPostInput | NewsletterEmailEventUpdateWithWhereUniqueWithoutPostInput[]
    updateMany?: NewsletterEmailEventUpdateManyWithWhereWithoutPostInput | NewsletterEmailEventUpdateManyWithWhereWithoutPostInput[]
    deleteMany?: NewsletterEmailEventScalarWhereInput | NewsletterEmailEventScalarWhereInput[]
  }

  export type BlogPostTranslationUncheckedUpdateManyWithoutPostNestedInput = {
    create?: XOR<BlogPostTranslationCreateWithoutPostInput, BlogPostTranslationUncheckedCreateWithoutPostInput> | BlogPostTranslationCreateWithoutPostInput[] | BlogPostTranslationUncheckedCreateWithoutPostInput[]
    connectOrCreate?: BlogPostTranslationCreateOrConnectWithoutPostInput | BlogPostTranslationCreateOrConnectWithoutPostInput[]
    upsert?: BlogPostTranslationUpsertWithWhereUniqueWithoutPostInput | BlogPostTranslationUpsertWithWhereUniqueWithoutPostInput[]
    createMany?: BlogPostTranslationCreateManyPostInputEnvelope
    set?: BlogPostTranslationWhereUniqueInput | BlogPostTranslationWhereUniqueInput[]
    disconnect?: BlogPostTranslationWhereUniqueInput | BlogPostTranslationWhereUniqueInput[]
    delete?: BlogPostTranslationWhereUniqueInput | BlogPostTranslationWhereUniqueInput[]
    connect?: BlogPostTranslationWhereUniqueInput | BlogPostTranslationWhereUniqueInput[]
    update?: BlogPostTranslationUpdateWithWhereUniqueWithoutPostInput | BlogPostTranslationUpdateWithWhereUniqueWithoutPostInput[]
    updateMany?: BlogPostTranslationUpdateManyWithWhereWithoutPostInput | BlogPostTranslationUpdateManyWithWhereWithoutPostInput[]
    deleteMany?: BlogPostTranslationScalarWhereInput | BlogPostTranslationScalarWhereInput[]
  }

  export type NewsletterPostSendUncheckedUpdateManyWithoutPostNestedInput = {
    create?: XOR<NewsletterPostSendCreateWithoutPostInput, NewsletterPostSendUncheckedCreateWithoutPostInput> | NewsletterPostSendCreateWithoutPostInput[] | NewsletterPostSendUncheckedCreateWithoutPostInput[]
    connectOrCreate?: NewsletterPostSendCreateOrConnectWithoutPostInput | NewsletterPostSendCreateOrConnectWithoutPostInput[]
    upsert?: NewsletterPostSendUpsertWithWhereUniqueWithoutPostInput | NewsletterPostSendUpsertWithWhereUniqueWithoutPostInput[]
    createMany?: NewsletterPostSendCreateManyPostInputEnvelope
    set?: NewsletterPostSendWhereUniqueInput | NewsletterPostSendWhereUniqueInput[]
    disconnect?: NewsletterPostSendWhereUniqueInput | NewsletterPostSendWhereUniqueInput[]
    delete?: NewsletterPostSendWhereUniqueInput | NewsletterPostSendWhereUniqueInput[]
    connect?: NewsletterPostSendWhereUniqueInput | NewsletterPostSendWhereUniqueInput[]
    update?: NewsletterPostSendUpdateWithWhereUniqueWithoutPostInput | NewsletterPostSendUpdateWithWhereUniqueWithoutPostInput[]
    updateMany?: NewsletterPostSendUpdateManyWithWhereWithoutPostInput | NewsletterPostSendUpdateManyWithWhereWithoutPostInput[]
    deleteMany?: NewsletterPostSendScalarWhereInput | NewsletterPostSendScalarWhereInput[]
  }

  export type NewsletterEmailEventUncheckedUpdateManyWithoutPostNestedInput = {
    create?: XOR<NewsletterEmailEventCreateWithoutPostInput, NewsletterEmailEventUncheckedCreateWithoutPostInput> | NewsletterEmailEventCreateWithoutPostInput[] | NewsletterEmailEventUncheckedCreateWithoutPostInput[]
    connectOrCreate?: NewsletterEmailEventCreateOrConnectWithoutPostInput | NewsletterEmailEventCreateOrConnectWithoutPostInput[]
    upsert?: NewsletterEmailEventUpsertWithWhereUniqueWithoutPostInput | NewsletterEmailEventUpsertWithWhereUniqueWithoutPostInput[]
    createMany?: NewsletterEmailEventCreateManyPostInputEnvelope
    set?: NewsletterEmailEventWhereUniqueInput | NewsletterEmailEventWhereUniqueInput[]
    disconnect?: NewsletterEmailEventWhereUniqueInput | NewsletterEmailEventWhereUniqueInput[]
    delete?: NewsletterEmailEventWhereUniqueInput | NewsletterEmailEventWhereUniqueInput[]
    connect?: NewsletterEmailEventWhereUniqueInput | NewsletterEmailEventWhereUniqueInput[]
    update?: NewsletterEmailEventUpdateWithWhereUniqueWithoutPostInput | NewsletterEmailEventUpdateWithWhereUniqueWithoutPostInput[]
    updateMany?: NewsletterEmailEventUpdateManyWithWhereWithoutPostInput | NewsletterEmailEventUpdateManyWithWhereWithoutPostInput[]
    deleteMany?: NewsletterEmailEventScalarWhereInput | NewsletterEmailEventScalarWhereInput[]
  }

  export type BlogPostCreateNestedOneWithoutTranslationsInput = {
    create?: XOR<BlogPostCreateWithoutTranslationsInput, BlogPostUncheckedCreateWithoutTranslationsInput>
    connectOrCreate?: BlogPostCreateOrConnectWithoutTranslationsInput
    connect?: BlogPostWhereUniqueInput
  }

  export type BlogPostUpdateOneRequiredWithoutTranslationsNestedInput = {
    create?: XOR<BlogPostCreateWithoutTranslationsInput, BlogPostUncheckedCreateWithoutTranslationsInput>
    connectOrCreate?: BlogPostCreateOrConnectWithoutTranslationsInput
    upsert?: BlogPostUpsertWithoutTranslationsInput
    connect?: BlogPostWhereUniqueInput
    update?: XOR<XOR<BlogPostUpdateToOneWithWhereWithoutTranslationsInput, BlogPostUpdateWithoutTranslationsInput>, BlogPostUncheckedUpdateWithoutTranslationsInput>
  }

  export type NewsletterEmailEventCreateNestedManyWithoutSubscriberInput = {
    create?: XOR<NewsletterEmailEventCreateWithoutSubscriberInput, NewsletterEmailEventUncheckedCreateWithoutSubscriberInput> | NewsletterEmailEventCreateWithoutSubscriberInput[] | NewsletterEmailEventUncheckedCreateWithoutSubscriberInput[]
    connectOrCreate?: NewsletterEmailEventCreateOrConnectWithoutSubscriberInput | NewsletterEmailEventCreateOrConnectWithoutSubscriberInput[]
    createMany?: NewsletterEmailEventCreateManySubscriberInputEnvelope
    connect?: NewsletterEmailEventWhereUniqueInput | NewsletterEmailEventWhereUniqueInput[]
  }

  export type NewsletterEmailEventUncheckedCreateNestedManyWithoutSubscriberInput = {
    create?: XOR<NewsletterEmailEventCreateWithoutSubscriberInput, NewsletterEmailEventUncheckedCreateWithoutSubscriberInput> | NewsletterEmailEventCreateWithoutSubscriberInput[] | NewsletterEmailEventUncheckedCreateWithoutSubscriberInput[]
    connectOrCreate?: NewsletterEmailEventCreateOrConnectWithoutSubscriberInput | NewsletterEmailEventCreateOrConnectWithoutSubscriberInput[]
    createMany?: NewsletterEmailEventCreateManySubscriberInputEnvelope
    connect?: NewsletterEmailEventWhereUniqueInput | NewsletterEmailEventWhereUniqueInput[]
  }

  export type EnumNewsletterSubscriberStatusFieldUpdateOperationsInput = {
    set?: $Enums.NewsletterSubscriberStatus
  }

  export type NewsletterEmailEventUpdateManyWithoutSubscriberNestedInput = {
    create?: XOR<NewsletterEmailEventCreateWithoutSubscriberInput, NewsletterEmailEventUncheckedCreateWithoutSubscriberInput> | NewsletterEmailEventCreateWithoutSubscriberInput[] | NewsletterEmailEventUncheckedCreateWithoutSubscriberInput[]
    connectOrCreate?: NewsletterEmailEventCreateOrConnectWithoutSubscriberInput | NewsletterEmailEventCreateOrConnectWithoutSubscriberInput[]
    upsert?: NewsletterEmailEventUpsertWithWhereUniqueWithoutSubscriberInput | NewsletterEmailEventUpsertWithWhereUniqueWithoutSubscriberInput[]
    createMany?: NewsletterEmailEventCreateManySubscriberInputEnvelope
    set?: NewsletterEmailEventWhereUniqueInput | NewsletterEmailEventWhereUniqueInput[]
    disconnect?: NewsletterEmailEventWhereUniqueInput | NewsletterEmailEventWhereUniqueInput[]
    delete?: NewsletterEmailEventWhereUniqueInput | NewsletterEmailEventWhereUniqueInput[]
    connect?: NewsletterEmailEventWhereUniqueInput | NewsletterEmailEventWhereUniqueInput[]
    update?: NewsletterEmailEventUpdateWithWhereUniqueWithoutSubscriberInput | NewsletterEmailEventUpdateWithWhereUniqueWithoutSubscriberInput[]
    updateMany?: NewsletterEmailEventUpdateManyWithWhereWithoutSubscriberInput | NewsletterEmailEventUpdateManyWithWhereWithoutSubscriberInput[]
    deleteMany?: NewsletterEmailEventScalarWhereInput | NewsletterEmailEventScalarWhereInput[]
  }

  export type NewsletterEmailEventUncheckedUpdateManyWithoutSubscriberNestedInput = {
    create?: XOR<NewsletterEmailEventCreateWithoutSubscriberInput, NewsletterEmailEventUncheckedCreateWithoutSubscriberInput> | NewsletterEmailEventCreateWithoutSubscriberInput[] | NewsletterEmailEventUncheckedCreateWithoutSubscriberInput[]
    connectOrCreate?: NewsletterEmailEventCreateOrConnectWithoutSubscriberInput | NewsletterEmailEventCreateOrConnectWithoutSubscriberInput[]
    upsert?: NewsletterEmailEventUpsertWithWhereUniqueWithoutSubscriberInput | NewsletterEmailEventUpsertWithWhereUniqueWithoutSubscriberInput[]
    createMany?: NewsletterEmailEventCreateManySubscriberInputEnvelope
    set?: NewsletterEmailEventWhereUniqueInput | NewsletterEmailEventWhereUniqueInput[]
    disconnect?: NewsletterEmailEventWhereUniqueInput | NewsletterEmailEventWhereUniqueInput[]
    delete?: NewsletterEmailEventWhereUniqueInput | NewsletterEmailEventWhereUniqueInput[]
    connect?: NewsletterEmailEventWhereUniqueInput | NewsletterEmailEventWhereUniqueInput[]
    update?: NewsletterEmailEventUpdateWithWhereUniqueWithoutSubscriberInput | NewsletterEmailEventUpdateWithWhereUniqueWithoutSubscriberInput[]
    updateMany?: NewsletterEmailEventUpdateManyWithWhereWithoutSubscriberInput | NewsletterEmailEventUpdateManyWithWhereWithoutSubscriberInput[]
    deleteMany?: NewsletterEmailEventScalarWhereInput | NewsletterEmailEventScalarWhereInput[]
  }

  export type BlogPostCreateNestedOneWithoutNewsletterSendsInput = {
    create?: XOR<BlogPostCreateWithoutNewsletterSendsInput, BlogPostUncheckedCreateWithoutNewsletterSendsInput>
    connectOrCreate?: BlogPostCreateOrConnectWithoutNewsletterSendsInput
    connect?: BlogPostWhereUniqueInput
  }

  export type NewsletterEmailEventCreateNestedManyWithoutPostSendInput = {
    create?: XOR<NewsletterEmailEventCreateWithoutPostSendInput, NewsletterEmailEventUncheckedCreateWithoutPostSendInput> | NewsletterEmailEventCreateWithoutPostSendInput[] | NewsletterEmailEventUncheckedCreateWithoutPostSendInput[]
    connectOrCreate?: NewsletterEmailEventCreateOrConnectWithoutPostSendInput | NewsletterEmailEventCreateOrConnectWithoutPostSendInput[]
    createMany?: NewsletterEmailEventCreateManyPostSendInputEnvelope
    connect?: NewsletterEmailEventWhereUniqueInput | NewsletterEmailEventWhereUniqueInput[]
  }

  export type NewsletterEmailEventUncheckedCreateNestedManyWithoutPostSendInput = {
    create?: XOR<NewsletterEmailEventCreateWithoutPostSendInput, NewsletterEmailEventUncheckedCreateWithoutPostSendInput> | NewsletterEmailEventCreateWithoutPostSendInput[] | NewsletterEmailEventUncheckedCreateWithoutPostSendInput[]
    connectOrCreate?: NewsletterEmailEventCreateOrConnectWithoutPostSendInput | NewsletterEmailEventCreateOrConnectWithoutPostSendInput[]
    createMany?: NewsletterEmailEventCreateManyPostSendInputEnvelope
    connect?: NewsletterEmailEventWhereUniqueInput | NewsletterEmailEventWhereUniqueInput[]
  }

  export type EnumNewsletterPostSendStatusFieldUpdateOperationsInput = {
    set?: $Enums.NewsletterPostSendStatus
  }

  export type BlogPostUpdateOneRequiredWithoutNewsletterSendsNestedInput = {
    create?: XOR<BlogPostCreateWithoutNewsletterSendsInput, BlogPostUncheckedCreateWithoutNewsletterSendsInput>
    connectOrCreate?: BlogPostCreateOrConnectWithoutNewsletterSendsInput
    upsert?: BlogPostUpsertWithoutNewsletterSendsInput
    connect?: BlogPostWhereUniqueInput
    update?: XOR<XOR<BlogPostUpdateToOneWithWhereWithoutNewsletterSendsInput, BlogPostUpdateWithoutNewsletterSendsInput>, BlogPostUncheckedUpdateWithoutNewsletterSendsInput>
  }

  export type NewsletterEmailEventUpdateManyWithoutPostSendNestedInput = {
    create?: XOR<NewsletterEmailEventCreateWithoutPostSendInput, NewsletterEmailEventUncheckedCreateWithoutPostSendInput> | NewsletterEmailEventCreateWithoutPostSendInput[] | NewsletterEmailEventUncheckedCreateWithoutPostSendInput[]
    connectOrCreate?: NewsletterEmailEventCreateOrConnectWithoutPostSendInput | NewsletterEmailEventCreateOrConnectWithoutPostSendInput[]
    upsert?: NewsletterEmailEventUpsertWithWhereUniqueWithoutPostSendInput | NewsletterEmailEventUpsertWithWhereUniqueWithoutPostSendInput[]
    createMany?: NewsletterEmailEventCreateManyPostSendInputEnvelope
    set?: NewsletterEmailEventWhereUniqueInput | NewsletterEmailEventWhereUniqueInput[]
    disconnect?: NewsletterEmailEventWhereUniqueInput | NewsletterEmailEventWhereUniqueInput[]
    delete?: NewsletterEmailEventWhereUniqueInput | NewsletterEmailEventWhereUniqueInput[]
    connect?: NewsletterEmailEventWhereUniqueInput | NewsletterEmailEventWhereUniqueInput[]
    update?: NewsletterEmailEventUpdateWithWhereUniqueWithoutPostSendInput | NewsletterEmailEventUpdateWithWhereUniqueWithoutPostSendInput[]
    updateMany?: NewsletterEmailEventUpdateManyWithWhereWithoutPostSendInput | NewsletterEmailEventUpdateManyWithWhereWithoutPostSendInput[]
    deleteMany?: NewsletterEmailEventScalarWhereInput | NewsletterEmailEventScalarWhereInput[]
  }

  export type NewsletterEmailEventUncheckedUpdateManyWithoutPostSendNestedInput = {
    create?: XOR<NewsletterEmailEventCreateWithoutPostSendInput, NewsletterEmailEventUncheckedCreateWithoutPostSendInput> | NewsletterEmailEventCreateWithoutPostSendInput[] | NewsletterEmailEventUncheckedCreateWithoutPostSendInput[]
    connectOrCreate?: NewsletterEmailEventCreateOrConnectWithoutPostSendInput | NewsletterEmailEventCreateOrConnectWithoutPostSendInput[]
    upsert?: NewsletterEmailEventUpsertWithWhereUniqueWithoutPostSendInput | NewsletterEmailEventUpsertWithWhereUniqueWithoutPostSendInput[]
    createMany?: NewsletterEmailEventCreateManyPostSendInputEnvelope
    set?: NewsletterEmailEventWhereUniqueInput | NewsletterEmailEventWhereUniqueInput[]
    disconnect?: NewsletterEmailEventWhereUniqueInput | NewsletterEmailEventWhereUniqueInput[]
    delete?: NewsletterEmailEventWhereUniqueInput | NewsletterEmailEventWhereUniqueInput[]
    connect?: NewsletterEmailEventWhereUniqueInput | NewsletterEmailEventWhereUniqueInput[]
    update?: NewsletterEmailEventUpdateWithWhereUniqueWithoutPostSendInput | NewsletterEmailEventUpdateWithWhereUniqueWithoutPostSendInput[]
    updateMany?: NewsletterEmailEventUpdateManyWithWhereWithoutPostSendInput | NewsletterEmailEventUpdateManyWithWhereWithoutPostSendInput[]
    deleteMany?: NewsletterEmailEventScalarWhereInput | NewsletterEmailEventScalarWhereInput[]
  }

  export type NewsletterSubscriberCreateNestedOneWithoutEmailEventsInput = {
    create?: XOR<NewsletterSubscriberCreateWithoutEmailEventsInput, NewsletterSubscriberUncheckedCreateWithoutEmailEventsInput>
    connectOrCreate?: NewsletterSubscriberCreateOrConnectWithoutEmailEventsInput
    connect?: NewsletterSubscriberWhereUniqueInput
  }

  export type BlogPostCreateNestedOneWithoutNewsletterEmailEventsInput = {
    create?: XOR<BlogPostCreateWithoutNewsletterEmailEventsInput, BlogPostUncheckedCreateWithoutNewsletterEmailEventsInput>
    connectOrCreate?: BlogPostCreateOrConnectWithoutNewsletterEmailEventsInput
    connect?: BlogPostWhereUniqueInput
  }

  export type NewsletterPostSendCreateNestedOneWithoutEmailEventsInput = {
    create?: XOR<NewsletterPostSendCreateWithoutEmailEventsInput, NewsletterPostSendUncheckedCreateWithoutEmailEventsInput>
    connectOrCreate?: NewsletterPostSendCreateOrConnectWithoutEmailEventsInput
    connect?: NewsletterPostSendWhereUniqueInput
  }

  export type EnumNewsletterEmailTypeFieldUpdateOperationsInput = {
    set?: $Enums.NewsletterEmailType
  }

  export type EnumNewsletterEmailStatusFieldUpdateOperationsInput = {
    set?: $Enums.NewsletterEmailStatus
  }

  export type NewsletterSubscriberUpdateOneWithoutEmailEventsNestedInput = {
    create?: XOR<NewsletterSubscriberCreateWithoutEmailEventsInput, NewsletterSubscriberUncheckedCreateWithoutEmailEventsInput>
    connectOrCreate?: NewsletterSubscriberCreateOrConnectWithoutEmailEventsInput
    upsert?: NewsletterSubscriberUpsertWithoutEmailEventsInput
    disconnect?: NewsletterSubscriberWhereInput | boolean
    delete?: NewsletterSubscriberWhereInput | boolean
    connect?: NewsletterSubscriberWhereUniqueInput
    update?: XOR<XOR<NewsletterSubscriberUpdateToOneWithWhereWithoutEmailEventsInput, NewsletterSubscriberUpdateWithoutEmailEventsInput>, NewsletterSubscriberUncheckedUpdateWithoutEmailEventsInput>
  }

  export type BlogPostUpdateOneWithoutNewsletterEmailEventsNestedInput = {
    create?: XOR<BlogPostCreateWithoutNewsletterEmailEventsInput, BlogPostUncheckedCreateWithoutNewsletterEmailEventsInput>
    connectOrCreate?: BlogPostCreateOrConnectWithoutNewsletterEmailEventsInput
    upsert?: BlogPostUpsertWithoutNewsletterEmailEventsInput
    disconnect?: BlogPostWhereInput | boolean
    delete?: BlogPostWhereInput | boolean
    connect?: BlogPostWhereUniqueInput
    update?: XOR<XOR<BlogPostUpdateToOneWithWhereWithoutNewsletterEmailEventsInput, BlogPostUpdateWithoutNewsletterEmailEventsInput>, BlogPostUncheckedUpdateWithoutNewsletterEmailEventsInput>
  }

  export type NewsletterPostSendUpdateOneWithoutEmailEventsNestedInput = {
    create?: XOR<NewsletterPostSendCreateWithoutEmailEventsInput, NewsletterPostSendUncheckedCreateWithoutEmailEventsInput>
    connectOrCreate?: NewsletterPostSendCreateOrConnectWithoutEmailEventsInput
    upsert?: NewsletterPostSendUpsertWithoutEmailEventsInput
    disconnect?: NewsletterPostSendWhereInput | boolean
    delete?: NewsletterPostSendWhereInput | boolean
    connect?: NewsletterPostSendWhereUniqueInput
    update?: XOR<XOR<NewsletterPostSendUpdateToOneWithWhereWithoutEmailEventsInput, NewsletterPostSendUpdateWithoutEmailEventsInput>, NewsletterPostSendUncheckedUpdateWithoutEmailEventsInput>
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

  export type NestedEnumBlogPostStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.BlogPostStatus | EnumBlogPostStatusFieldRefInput<$PrismaModel>
    in?: $Enums.BlogPostStatus[] | ListEnumBlogPostStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.BlogPostStatus[] | ListEnumBlogPostStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumBlogPostStatusFilter<$PrismaModel> | $Enums.BlogPostStatus
  }

  export type NestedEnumBlogPostStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BlogPostStatus | EnumBlogPostStatusFieldRefInput<$PrismaModel>
    in?: $Enums.BlogPostStatus[] | ListEnumBlogPostStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.BlogPostStatus[] | ListEnumBlogPostStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumBlogPostStatusWithAggregatesFilter<$PrismaModel> | $Enums.BlogPostStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumBlogPostStatusFilter<$PrismaModel>
    _max?: NestedEnumBlogPostStatusFilter<$PrismaModel>
  }

  export type NestedEnumNewsletterSubscriberStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.NewsletterSubscriberStatus | EnumNewsletterSubscriberStatusFieldRefInput<$PrismaModel>
    in?: $Enums.NewsletterSubscriberStatus[] | ListEnumNewsletterSubscriberStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.NewsletterSubscriberStatus[] | ListEnumNewsletterSubscriberStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumNewsletterSubscriberStatusFilter<$PrismaModel> | $Enums.NewsletterSubscriberStatus
  }

  export type NestedEnumNewsletterSubscriberStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.NewsletterSubscriberStatus | EnumNewsletterSubscriberStatusFieldRefInput<$PrismaModel>
    in?: $Enums.NewsletterSubscriberStatus[] | ListEnumNewsletterSubscriberStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.NewsletterSubscriberStatus[] | ListEnumNewsletterSubscriberStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumNewsletterSubscriberStatusWithAggregatesFilter<$PrismaModel> | $Enums.NewsletterSubscriberStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumNewsletterSubscriberStatusFilter<$PrismaModel>
    _max?: NestedEnumNewsletterSubscriberStatusFilter<$PrismaModel>
  }

  export type NestedEnumNewsletterPostSendStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.NewsletterPostSendStatus | EnumNewsletterPostSendStatusFieldRefInput<$PrismaModel>
    in?: $Enums.NewsletterPostSendStatus[] | ListEnumNewsletterPostSendStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.NewsletterPostSendStatus[] | ListEnumNewsletterPostSendStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumNewsletterPostSendStatusFilter<$PrismaModel> | $Enums.NewsletterPostSendStatus
  }

  export type NestedEnumNewsletterPostSendStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.NewsletterPostSendStatus | EnumNewsletterPostSendStatusFieldRefInput<$PrismaModel>
    in?: $Enums.NewsletterPostSendStatus[] | ListEnumNewsletterPostSendStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.NewsletterPostSendStatus[] | ListEnumNewsletterPostSendStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumNewsletterPostSendStatusWithAggregatesFilter<$PrismaModel> | $Enums.NewsletterPostSendStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumNewsletterPostSendStatusFilter<$PrismaModel>
    _max?: NestedEnumNewsletterPostSendStatusFilter<$PrismaModel>
  }

  export type NestedEnumNewsletterEmailTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.NewsletterEmailType | EnumNewsletterEmailTypeFieldRefInput<$PrismaModel>
    in?: $Enums.NewsletterEmailType[] | ListEnumNewsletterEmailTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.NewsletterEmailType[] | ListEnumNewsletterEmailTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumNewsletterEmailTypeFilter<$PrismaModel> | $Enums.NewsletterEmailType
  }

  export type NestedEnumNewsletterEmailStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.NewsletterEmailStatus | EnumNewsletterEmailStatusFieldRefInput<$PrismaModel>
    in?: $Enums.NewsletterEmailStatus[] | ListEnumNewsletterEmailStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.NewsletterEmailStatus[] | ListEnumNewsletterEmailStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumNewsletterEmailStatusFilter<$PrismaModel> | $Enums.NewsletterEmailStatus
  }

  export type NestedEnumNewsletterEmailTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.NewsletterEmailType | EnumNewsletterEmailTypeFieldRefInput<$PrismaModel>
    in?: $Enums.NewsletterEmailType[] | ListEnumNewsletterEmailTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.NewsletterEmailType[] | ListEnumNewsletterEmailTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumNewsletterEmailTypeWithAggregatesFilter<$PrismaModel> | $Enums.NewsletterEmailType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumNewsletterEmailTypeFilter<$PrismaModel>
    _max?: NestedEnumNewsletterEmailTypeFilter<$PrismaModel>
  }

  export type NestedEnumNewsletterEmailStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.NewsletterEmailStatus | EnumNewsletterEmailStatusFieldRefInput<$PrismaModel>
    in?: $Enums.NewsletterEmailStatus[] | ListEnumNewsletterEmailStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.NewsletterEmailStatus[] | ListEnumNewsletterEmailStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumNewsletterEmailStatusWithAggregatesFilter<$PrismaModel> | $Enums.NewsletterEmailStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumNewsletterEmailStatusFilter<$PrismaModel>
    _max?: NestedEnumNewsletterEmailStatusFilter<$PrismaModel>
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

  export type BlogPostTranslationCreateWithoutPostInput = {
    id?: string
    locale: $Enums.Locale
    title: string
    excerpt?: string | null
    contentMarkdown: string
    seoTitle?: string | null
    seoDescription?: string | null
    coverImageAlt?: string | null
    coverImageCaption?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BlogPostTranslationUncheckedCreateWithoutPostInput = {
    id?: string
    locale: $Enums.Locale
    title: string
    excerpt?: string | null
    contentMarkdown: string
    seoTitle?: string | null
    seoDescription?: string | null
    coverImageAlt?: string | null
    coverImageCaption?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BlogPostTranslationCreateOrConnectWithoutPostInput = {
    where: BlogPostTranslationWhereUniqueInput
    create: XOR<BlogPostTranslationCreateWithoutPostInput, BlogPostTranslationUncheckedCreateWithoutPostInput>
  }

  export type BlogPostTranslationCreateManyPostInputEnvelope = {
    data: BlogPostTranslationCreateManyPostInput | BlogPostTranslationCreateManyPostInput[]
    skipDuplicates?: boolean
  }

  export type NewsletterPostSendCreateWithoutPostInput = {
    id?: string
    status: $Enums.NewsletterPostSendStatus
    recipientCount?: number
    sentCount?: number
    failedCount?: number
    errorMessage?: string | null
    startedAt?: Date | string
    completedAt?: Date | string | null
    createdAt?: Date | string
    emailEvents?: NewsletterEmailEventCreateNestedManyWithoutPostSendInput
  }

  export type NewsletterPostSendUncheckedCreateWithoutPostInput = {
    id?: string
    status: $Enums.NewsletterPostSendStatus
    recipientCount?: number
    sentCount?: number
    failedCount?: number
    errorMessage?: string | null
    startedAt?: Date | string
    completedAt?: Date | string | null
    createdAt?: Date | string
    emailEvents?: NewsletterEmailEventUncheckedCreateNestedManyWithoutPostSendInput
  }

  export type NewsletterPostSendCreateOrConnectWithoutPostInput = {
    where: NewsletterPostSendWhereUniqueInput
    create: XOR<NewsletterPostSendCreateWithoutPostInput, NewsletterPostSendUncheckedCreateWithoutPostInput>
  }

  export type NewsletterPostSendCreateManyPostInputEnvelope = {
    data: NewsletterPostSendCreateManyPostInput | NewsletterPostSendCreateManyPostInput[]
    skipDuplicates?: boolean
  }

  export type NewsletterEmailEventCreateWithoutPostInput = {
    id?: string
    type: $Enums.NewsletterEmailType
    status: $Enums.NewsletterEmailStatus
    toEmail: string
    subject: string
    resendEmailId?: string | null
    errorMessage?: string | null
    createdAt?: Date | string
    subscriber?: NewsletterSubscriberCreateNestedOneWithoutEmailEventsInput
    postSend?: NewsletterPostSendCreateNestedOneWithoutEmailEventsInput
  }

  export type NewsletterEmailEventUncheckedCreateWithoutPostInput = {
    id?: string
    subscriberId?: string | null
    postSendId?: string | null
    type: $Enums.NewsletterEmailType
    status: $Enums.NewsletterEmailStatus
    toEmail: string
    subject: string
    resendEmailId?: string | null
    errorMessage?: string | null
    createdAt?: Date | string
  }

  export type NewsletterEmailEventCreateOrConnectWithoutPostInput = {
    where: NewsletterEmailEventWhereUniqueInput
    create: XOR<NewsletterEmailEventCreateWithoutPostInput, NewsletterEmailEventUncheckedCreateWithoutPostInput>
  }

  export type NewsletterEmailEventCreateManyPostInputEnvelope = {
    data: NewsletterEmailEventCreateManyPostInput | NewsletterEmailEventCreateManyPostInput[]
    skipDuplicates?: boolean
  }

  export type BlogPostTranslationUpsertWithWhereUniqueWithoutPostInput = {
    where: BlogPostTranslationWhereUniqueInput
    update: XOR<BlogPostTranslationUpdateWithoutPostInput, BlogPostTranslationUncheckedUpdateWithoutPostInput>
    create: XOR<BlogPostTranslationCreateWithoutPostInput, BlogPostTranslationUncheckedCreateWithoutPostInput>
  }

  export type BlogPostTranslationUpdateWithWhereUniqueWithoutPostInput = {
    where: BlogPostTranslationWhereUniqueInput
    data: XOR<BlogPostTranslationUpdateWithoutPostInput, BlogPostTranslationUncheckedUpdateWithoutPostInput>
  }

  export type BlogPostTranslationUpdateManyWithWhereWithoutPostInput = {
    where: BlogPostTranslationScalarWhereInput
    data: XOR<BlogPostTranslationUpdateManyMutationInput, BlogPostTranslationUncheckedUpdateManyWithoutPostInput>
  }

  export type BlogPostTranslationScalarWhereInput = {
    AND?: BlogPostTranslationScalarWhereInput | BlogPostTranslationScalarWhereInput[]
    OR?: BlogPostTranslationScalarWhereInput[]
    NOT?: BlogPostTranslationScalarWhereInput | BlogPostTranslationScalarWhereInput[]
    id?: StringFilter<"BlogPostTranslation"> | string
    postId?: StringFilter<"BlogPostTranslation"> | string
    locale?: EnumLocaleFilter<"BlogPostTranslation"> | $Enums.Locale
    title?: StringFilter<"BlogPostTranslation"> | string
    excerpt?: StringNullableFilter<"BlogPostTranslation"> | string | null
    contentMarkdown?: StringFilter<"BlogPostTranslation"> | string
    seoTitle?: StringNullableFilter<"BlogPostTranslation"> | string | null
    seoDescription?: StringNullableFilter<"BlogPostTranslation"> | string | null
    coverImageAlt?: StringNullableFilter<"BlogPostTranslation"> | string | null
    coverImageCaption?: StringNullableFilter<"BlogPostTranslation"> | string | null
    createdAt?: DateTimeFilter<"BlogPostTranslation"> | Date | string
    updatedAt?: DateTimeFilter<"BlogPostTranslation"> | Date | string
  }

  export type NewsletterPostSendUpsertWithWhereUniqueWithoutPostInput = {
    where: NewsletterPostSendWhereUniqueInput
    update: XOR<NewsletterPostSendUpdateWithoutPostInput, NewsletterPostSendUncheckedUpdateWithoutPostInput>
    create: XOR<NewsletterPostSendCreateWithoutPostInput, NewsletterPostSendUncheckedCreateWithoutPostInput>
  }

  export type NewsletterPostSendUpdateWithWhereUniqueWithoutPostInput = {
    where: NewsletterPostSendWhereUniqueInput
    data: XOR<NewsletterPostSendUpdateWithoutPostInput, NewsletterPostSendUncheckedUpdateWithoutPostInput>
  }

  export type NewsletterPostSendUpdateManyWithWhereWithoutPostInput = {
    where: NewsletterPostSendScalarWhereInput
    data: XOR<NewsletterPostSendUpdateManyMutationInput, NewsletterPostSendUncheckedUpdateManyWithoutPostInput>
  }

  export type NewsletterPostSendScalarWhereInput = {
    AND?: NewsletterPostSendScalarWhereInput | NewsletterPostSendScalarWhereInput[]
    OR?: NewsletterPostSendScalarWhereInput[]
    NOT?: NewsletterPostSendScalarWhereInput | NewsletterPostSendScalarWhereInput[]
    id?: StringFilter<"NewsletterPostSend"> | string
    postId?: StringFilter<"NewsletterPostSend"> | string
    status?: EnumNewsletterPostSendStatusFilter<"NewsletterPostSend"> | $Enums.NewsletterPostSendStatus
    recipientCount?: IntFilter<"NewsletterPostSend"> | number
    sentCount?: IntFilter<"NewsletterPostSend"> | number
    failedCount?: IntFilter<"NewsletterPostSend"> | number
    errorMessage?: StringNullableFilter<"NewsletterPostSend"> | string | null
    startedAt?: DateTimeFilter<"NewsletterPostSend"> | Date | string
    completedAt?: DateTimeNullableFilter<"NewsletterPostSend"> | Date | string | null
    createdAt?: DateTimeFilter<"NewsletterPostSend"> | Date | string
  }

  export type NewsletterEmailEventUpsertWithWhereUniqueWithoutPostInput = {
    where: NewsletterEmailEventWhereUniqueInput
    update: XOR<NewsletterEmailEventUpdateWithoutPostInput, NewsletterEmailEventUncheckedUpdateWithoutPostInput>
    create: XOR<NewsletterEmailEventCreateWithoutPostInput, NewsletterEmailEventUncheckedCreateWithoutPostInput>
  }

  export type NewsletterEmailEventUpdateWithWhereUniqueWithoutPostInput = {
    where: NewsletterEmailEventWhereUniqueInput
    data: XOR<NewsletterEmailEventUpdateWithoutPostInput, NewsletterEmailEventUncheckedUpdateWithoutPostInput>
  }

  export type NewsletterEmailEventUpdateManyWithWhereWithoutPostInput = {
    where: NewsletterEmailEventScalarWhereInput
    data: XOR<NewsletterEmailEventUpdateManyMutationInput, NewsletterEmailEventUncheckedUpdateManyWithoutPostInput>
  }

  export type NewsletterEmailEventScalarWhereInput = {
    AND?: NewsletterEmailEventScalarWhereInput | NewsletterEmailEventScalarWhereInput[]
    OR?: NewsletterEmailEventScalarWhereInput[]
    NOT?: NewsletterEmailEventScalarWhereInput | NewsletterEmailEventScalarWhereInput[]
    id?: StringFilter<"NewsletterEmailEvent"> | string
    subscriberId?: StringNullableFilter<"NewsletterEmailEvent"> | string | null
    postId?: StringNullableFilter<"NewsletterEmailEvent"> | string | null
    postSendId?: StringNullableFilter<"NewsletterEmailEvent"> | string | null
    type?: EnumNewsletterEmailTypeFilter<"NewsletterEmailEvent"> | $Enums.NewsletterEmailType
    status?: EnumNewsletterEmailStatusFilter<"NewsletterEmailEvent"> | $Enums.NewsletterEmailStatus
    toEmail?: StringFilter<"NewsletterEmailEvent"> | string
    subject?: StringFilter<"NewsletterEmailEvent"> | string
    resendEmailId?: StringNullableFilter<"NewsletterEmailEvent"> | string | null
    errorMessage?: StringNullableFilter<"NewsletterEmailEvent"> | string | null
    createdAt?: DateTimeFilter<"NewsletterEmailEvent"> | Date | string
  }

  export type BlogPostCreateWithoutTranslationsInput = {
    id?: string
    slug: string
    status?: $Enums.BlogPostStatus
    featured?: boolean
    tags?: BlogPostCreatetagsInput | string[]
    coverImageUrl?: string | null
    coverImageCredit?: string | null
    coverImageCreditUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    publishedAt?: Date | string | null
    newsletterSends?: NewsletterPostSendCreateNestedManyWithoutPostInput
    newsletterEmailEvents?: NewsletterEmailEventCreateNestedManyWithoutPostInput
  }

  export type BlogPostUncheckedCreateWithoutTranslationsInput = {
    id?: string
    slug: string
    status?: $Enums.BlogPostStatus
    featured?: boolean
    tags?: BlogPostCreatetagsInput | string[]
    coverImageUrl?: string | null
    coverImageCredit?: string | null
    coverImageCreditUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    publishedAt?: Date | string | null
    newsletterSends?: NewsletterPostSendUncheckedCreateNestedManyWithoutPostInput
    newsletterEmailEvents?: NewsletterEmailEventUncheckedCreateNestedManyWithoutPostInput
  }

  export type BlogPostCreateOrConnectWithoutTranslationsInput = {
    where: BlogPostWhereUniqueInput
    create: XOR<BlogPostCreateWithoutTranslationsInput, BlogPostUncheckedCreateWithoutTranslationsInput>
  }

  export type BlogPostUpsertWithoutTranslationsInput = {
    update: XOR<BlogPostUpdateWithoutTranslationsInput, BlogPostUncheckedUpdateWithoutTranslationsInput>
    create: XOR<BlogPostCreateWithoutTranslationsInput, BlogPostUncheckedCreateWithoutTranslationsInput>
    where?: BlogPostWhereInput
  }

  export type BlogPostUpdateToOneWithWhereWithoutTranslationsInput = {
    where?: BlogPostWhereInput
    data: XOR<BlogPostUpdateWithoutTranslationsInput, BlogPostUncheckedUpdateWithoutTranslationsInput>
  }

  export type BlogPostUpdateWithoutTranslationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    status?: EnumBlogPostStatusFieldUpdateOperationsInput | $Enums.BlogPostStatus
    featured?: BoolFieldUpdateOperationsInput | boolean
    tags?: BlogPostUpdatetagsInput | string[]
    coverImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    coverImageCredit?: NullableStringFieldUpdateOperationsInput | string | null
    coverImageCreditUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    newsletterSends?: NewsletterPostSendUpdateManyWithoutPostNestedInput
    newsletterEmailEvents?: NewsletterEmailEventUpdateManyWithoutPostNestedInput
  }

  export type BlogPostUncheckedUpdateWithoutTranslationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    status?: EnumBlogPostStatusFieldUpdateOperationsInput | $Enums.BlogPostStatus
    featured?: BoolFieldUpdateOperationsInput | boolean
    tags?: BlogPostUpdatetagsInput | string[]
    coverImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    coverImageCredit?: NullableStringFieldUpdateOperationsInput | string | null
    coverImageCreditUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    newsletterSends?: NewsletterPostSendUncheckedUpdateManyWithoutPostNestedInput
    newsletterEmailEvents?: NewsletterEmailEventUncheckedUpdateManyWithoutPostNestedInput
  }

  export type NewsletterEmailEventCreateWithoutSubscriberInput = {
    id?: string
    type: $Enums.NewsletterEmailType
    status: $Enums.NewsletterEmailStatus
    toEmail: string
    subject: string
    resendEmailId?: string | null
    errorMessage?: string | null
    createdAt?: Date | string
    post?: BlogPostCreateNestedOneWithoutNewsletterEmailEventsInput
    postSend?: NewsletterPostSendCreateNestedOneWithoutEmailEventsInput
  }

  export type NewsletterEmailEventUncheckedCreateWithoutSubscriberInput = {
    id?: string
    postId?: string | null
    postSendId?: string | null
    type: $Enums.NewsletterEmailType
    status: $Enums.NewsletterEmailStatus
    toEmail: string
    subject: string
    resendEmailId?: string | null
    errorMessage?: string | null
    createdAt?: Date | string
  }

  export type NewsletterEmailEventCreateOrConnectWithoutSubscriberInput = {
    where: NewsletterEmailEventWhereUniqueInput
    create: XOR<NewsletterEmailEventCreateWithoutSubscriberInput, NewsletterEmailEventUncheckedCreateWithoutSubscriberInput>
  }

  export type NewsletterEmailEventCreateManySubscriberInputEnvelope = {
    data: NewsletterEmailEventCreateManySubscriberInput | NewsletterEmailEventCreateManySubscriberInput[]
    skipDuplicates?: boolean
  }

  export type NewsletterEmailEventUpsertWithWhereUniqueWithoutSubscriberInput = {
    where: NewsletterEmailEventWhereUniqueInput
    update: XOR<NewsletterEmailEventUpdateWithoutSubscriberInput, NewsletterEmailEventUncheckedUpdateWithoutSubscriberInput>
    create: XOR<NewsletterEmailEventCreateWithoutSubscriberInput, NewsletterEmailEventUncheckedCreateWithoutSubscriberInput>
  }

  export type NewsletterEmailEventUpdateWithWhereUniqueWithoutSubscriberInput = {
    where: NewsletterEmailEventWhereUniqueInput
    data: XOR<NewsletterEmailEventUpdateWithoutSubscriberInput, NewsletterEmailEventUncheckedUpdateWithoutSubscriberInput>
  }

  export type NewsletterEmailEventUpdateManyWithWhereWithoutSubscriberInput = {
    where: NewsletterEmailEventScalarWhereInput
    data: XOR<NewsletterEmailEventUpdateManyMutationInput, NewsletterEmailEventUncheckedUpdateManyWithoutSubscriberInput>
  }

  export type BlogPostCreateWithoutNewsletterSendsInput = {
    id?: string
    slug: string
    status?: $Enums.BlogPostStatus
    featured?: boolean
    tags?: BlogPostCreatetagsInput | string[]
    coverImageUrl?: string | null
    coverImageCredit?: string | null
    coverImageCreditUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    publishedAt?: Date | string | null
    translations?: BlogPostTranslationCreateNestedManyWithoutPostInput
    newsletterEmailEvents?: NewsletterEmailEventCreateNestedManyWithoutPostInput
  }

  export type BlogPostUncheckedCreateWithoutNewsletterSendsInput = {
    id?: string
    slug: string
    status?: $Enums.BlogPostStatus
    featured?: boolean
    tags?: BlogPostCreatetagsInput | string[]
    coverImageUrl?: string | null
    coverImageCredit?: string | null
    coverImageCreditUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    publishedAt?: Date | string | null
    translations?: BlogPostTranslationUncheckedCreateNestedManyWithoutPostInput
    newsletterEmailEvents?: NewsletterEmailEventUncheckedCreateNestedManyWithoutPostInput
  }

  export type BlogPostCreateOrConnectWithoutNewsletterSendsInput = {
    where: BlogPostWhereUniqueInput
    create: XOR<BlogPostCreateWithoutNewsletterSendsInput, BlogPostUncheckedCreateWithoutNewsletterSendsInput>
  }

  export type NewsletterEmailEventCreateWithoutPostSendInput = {
    id?: string
    type: $Enums.NewsletterEmailType
    status: $Enums.NewsletterEmailStatus
    toEmail: string
    subject: string
    resendEmailId?: string | null
    errorMessage?: string | null
    createdAt?: Date | string
    subscriber?: NewsletterSubscriberCreateNestedOneWithoutEmailEventsInput
    post?: BlogPostCreateNestedOneWithoutNewsletterEmailEventsInput
  }

  export type NewsletterEmailEventUncheckedCreateWithoutPostSendInput = {
    id?: string
    subscriberId?: string | null
    postId?: string | null
    type: $Enums.NewsletterEmailType
    status: $Enums.NewsletterEmailStatus
    toEmail: string
    subject: string
    resendEmailId?: string | null
    errorMessage?: string | null
    createdAt?: Date | string
  }

  export type NewsletterEmailEventCreateOrConnectWithoutPostSendInput = {
    where: NewsletterEmailEventWhereUniqueInput
    create: XOR<NewsletterEmailEventCreateWithoutPostSendInput, NewsletterEmailEventUncheckedCreateWithoutPostSendInput>
  }

  export type NewsletterEmailEventCreateManyPostSendInputEnvelope = {
    data: NewsletterEmailEventCreateManyPostSendInput | NewsletterEmailEventCreateManyPostSendInput[]
    skipDuplicates?: boolean
  }

  export type BlogPostUpsertWithoutNewsletterSendsInput = {
    update: XOR<BlogPostUpdateWithoutNewsletterSendsInput, BlogPostUncheckedUpdateWithoutNewsletterSendsInput>
    create: XOR<BlogPostCreateWithoutNewsletterSendsInput, BlogPostUncheckedCreateWithoutNewsletterSendsInput>
    where?: BlogPostWhereInput
  }

  export type BlogPostUpdateToOneWithWhereWithoutNewsletterSendsInput = {
    where?: BlogPostWhereInput
    data: XOR<BlogPostUpdateWithoutNewsletterSendsInput, BlogPostUncheckedUpdateWithoutNewsletterSendsInput>
  }

  export type BlogPostUpdateWithoutNewsletterSendsInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    status?: EnumBlogPostStatusFieldUpdateOperationsInput | $Enums.BlogPostStatus
    featured?: BoolFieldUpdateOperationsInput | boolean
    tags?: BlogPostUpdatetagsInput | string[]
    coverImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    coverImageCredit?: NullableStringFieldUpdateOperationsInput | string | null
    coverImageCreditUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    translations?: BlogPostTranslationUpdateManyWithoutPostNestedInput
    newsletterEmailEvents?: NewsletterEmailEventUpdateManyWithoutPostNestedInput
  }

  export type BlogPostUncheckedUpdateWithoutNewsletterSendsInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    status?: EnumBlogPostStatusFieldUpdateOperationsInput | $Enums.BlogPostStatus
    featured?: BoolFieldUpdateOperationsInput | boolean
    tags?: BlogPostUpdatetagsInput | string[]
    coverImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    coverImageCredit?: NullableStringFieldUpdateOperationsInput | string | null
    coverImageCreditUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    translations?: BlogPostTranslationUncheckedUpdateManyWithoutPostNestedInput
    newsletterEmailEvents?: NewsletterEmailEventUncheckedUpdateManyWithoutPostNestedInput
  }

  export type NewsletterEmailEventUpsertWithWhereUniqueWithoutPostSendInput = {
    where: NewsletterEmailEventWhereUniqueInput
    update: XOR<NewsletterEmailEventUpdateWithoutPostSendInput, NewsletterEmailEventUncheckedUpdateWithoutPostSendInput>
    create: XOR<NewsletterEmailEventCreateWithoutPostSendInput, NewsletterEmailEventUncheckedCreateWithoutPostSendInput>
  }

  export type NewsletterEmailEventUpdateWithWhereUniqueWithoutPostSendInput = {
    where: NewsletterEmailEventWhereUniqueInput
    data: XOR<NewsletterEmailEventUpdateWithoutPostSendInput, NewsletterEmailEventUncheckedUpdateWithoutPostSendInput>
  }

  export type NewsletterEmailEventUpdateManyWithWhereWithoutPostSendInput = {
    where: NewsletterEmailEventScalarWhereInput
    data: XOR<NewsletterEmailEventUpdateManyMutationInput, NewsletterEmailEventUncheckedUpdateManyWithoutPostSendInput>
  }

  export type NewsletterSubscriberCreateWithoutEmailEventsInput = {
    id?: string
    email: string
    locale?: $Enums.Locale
    status?: $Enums.NewsletterSubscriberStatus
    source?: string | null
    confirmationTokenHash?: string | null
    unsubscribeToken: string
    ipHash?: string | null
    userAgent?: string | null
    consentAt?: Date | string
    confirmedAt?: Date | string | null
    unsubscribedAt?: Date | string | null
    lastSentAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type NewsletterSubscriberUncheckedCreateWithoutEmailEventsInput = {
    id?: string
    email: string
    locale?: $Enums.Locale
    status?: $Enums.NewsletterSubscriberStatus
    source?: string | null
    confirmationTokenHash?: string | null
    unsubscribeToken: string
    ipHash?: string | null
    userAgent?: string | null
    consentAt?: Date | string
    confirmedAt?: Date | string | null
    unsubscribedAt?: Date | string | null
    lastSentAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type NewsletterSubscriberCreateOrConnectWithoutEmailEventsInput = {
    where: NewsletterSubscriberWhereUniqueInput
    create: XOR<NewsletterSubscriberCreateWithoutEmailEventsInput, NewsletterSubscriberUncheckedCreateWithoutEmailEventsInput>
  }

  export type BlogPostCreateWithoutNewsletterEmailEventsInput = {
    id?: string
    slug: string
    status?: $Enums.BlogPostStatus
    featured?: boolean
    tags?: BlogPostCreatetagsInput | string[]
    coverImageUrl?: string | null
    coverImageCredit?: string | null
    coverImageCreditUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    publishedAt?: Date | string | null
    translations?: BlogPostTranslationCreateNestedManyWithoutPostInput
    newsletterSends?: NewsletterPostSendCreateNestedManyWithoutPostInput
  }

  export type BlogPostUncheckedCreateWithoutNewsletterEmailEventsInput = {
    id?: string
    slug: string
    status?: $Enums.BlogPostStatus
    featured?: boolean
    tags?: BlogPostCreatetagsInput | string[]
    coverImageUrl?: string | null
    coverImageCredit?: string | null
    coverImageCreditUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    publishedAt?: Date | string | null
    translations?: BlogPostTranslationUncheckedCreateNestedManyWithoutPostInput
    newsletterSends?: NewsletterPostSendUncheckedCreateNestedManyWithoutPostInput
  }

  export type BlogPostCreateOrConnectWithoutNewsletterEmailEventsInput = {
    where: BlogPostWhereUniqueInput
    create: XOR<BlogPostCreateWithoutNewsletterEmailEventsInput, BlogPostUncheckedCreateWithoutNewsletterEmailEventsInput>
  }

  export type NewsletterPostSendCreateWithoutEmailEventsInput = {
    id?: string
    status: $Enums.NewsletterPostSendStatus
    recipientCount?: number
    sentCount?: number
    failedCount?: number
    errorMessage?: string | null
    startedAt?: Date | string
    completedAt?: Date | string | null
    createdAt?: Date | string
    post: BlogPostCreateNestedOneWithoutNewsletterSendsInput
  }

  export type NewsletterPostSendUncheckedCreateWithoutEmailEventsInput = {
    id?: string
    postId: string
    status: $Enums.NewsletterPostSendStatus
    recipientCount?: number
    sentCount?: number
    failedCount?: number
    errorMessage?: string | null
    startedAt?: Date | string
    completedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type NewsletterPostSendCreateOrConnectWithoutEmailEventsInput = {
    where: NewsletterPostSendWhereUniqueInput
    create: XOR<NewsletterPostSendCreateWithoutEmailEventsInput, NewsletterPostSendUncheckedCreateWithoutEmailEventsInput>
  }

  export type NewsletterSubscriberUpsertWithoutEmailEventsInput = {
    update: XOR<NewsletterSubscriberUpdateWithoutEmailEventsInput, NewsletterSubscriberUncheckedUpdateWithoutEmailEventsInput>
    create: XOR<NewsletterSubscriberCreateWithoutEmailEventsInput, NewsletterSubscriberUncheckedCreateWithoutEmailEventsInput>
    where?: NewsletterSubscriberWhereInput
  }

  export type NewsletterSubscriberUpdateToOneWithWhereWithoutEmailEventsInput = {
    where?: NewsletterSubscriberWhereInput
    data: XOR<NewsletterSubscriberUpdateWithoutEmailEventsInput, NewsletterSubscriberUncheckedUpdateWithoutEmailEventsInput>
  }

  export type NewsletterSubscriberUpdateWithoutEmailEventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    locale?: EnumLocaleFieldUpdateOperationsInput | $Enums.Locale
    status?: EnumNewsletterSubscriberStatusFieldUpdateOperationsInput | $Enums.NewsletterSubscriberStatus
    source?: NullableStringFieldUpdateOperationsInput | string | null
    confirmationTokenHash?: NullableStringFieldUpdateOperationsInput | string | null
    unsubscribeToken?: StringFieldUpdateOperationsInput | string
    ipHash?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    consentAt?: DateTimeFieldUpdateOperationsInput | Date | string
    confirmedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    unsubscribedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastSentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NewsletterSubscriberUncheckedUpdateWithoutEmailEventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    locale?: EnumLocaleFieldUpdateOperationsInput | $Enums.Locale
    status?: EnumNewsletterSubscriberStatusFieldUpdateOperationsInput | $Enums.NewsletterSubscriberStatus
    source?: NullableStringFieldUpdateOperationsInput | string | null
    confirmationTokenHash?: NullableStringFieldUpdateOperationsInput | string | null
    unsubscribeToken?: StringFieldUpdateOperationsInput | string
    ipHash?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    consentAt?: DateTimeFieldUpdateOperationsInput | Date | string
    confirmedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    unsubscribedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastSentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BlogPostUpsertWithoutNewsletterEmailEventsInput = {
    update: XOR<BlogPostUpdateWithoutNewsletterEmailEventsInput, BlogPostUncheckedUpdateWithoutNewsletterEmailEventsInput>
    create: XOR<BlogPostCreateWithoutNewsletterEmailEventsInput, BlogPostUncheckedCreateWithoutNewsletterEmailEventsInput>
    where?: BlogPostWhereInput
  }

  export type BlogPostUpdateToOneWithWhereWithoutNewsletterEmailEventsInput = {
    where?: BlogPostWhereInput
    data: XOR<BlogPostUpdateWithoutNewsletterEmailEventsInput, BlogPostUncheckedUpdateWithoutNewsletterEmailEventsInput>
  }

  export type BlogPostUpdateWithoutNewsletterEmailEventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    status?: EnumBlogPostStatusFieldUpdateOperationsInput | $Enums.BlogPostStatus
    featured?: BoolFieldUpdateOperationsInput | boolean
    tags?: BlogPostUpdatetagsInput | string[]
    coverImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    coverImageCredit?: NullableStringFieldUpdateOperationsInput | string | null
    coverImageCreditUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    translations?: BlogPostTranslationUpdateManyWithoutPostNestedInput
    newsletterSends?: NewsletterPostSendUpdateManyWithoutPostNestedInput
  }

  export type BlogPostUncheckedUpdateWithoutNewsletterEmailEventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    status?: EnumBlogPostStatusFieldUpdateOperationsInput | $Enums.BlogPostStatus
    featured?: BoolFieldUpdateOperationsInput | boolean
    tags?: BlogPostUpdatetagsInput | string[]
    coverImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    coverImageCredit?: NullableStringFieldUpdateOperationsInput | string | null
    coverImageCreditUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    translations?: BlogPostTranslationUncheckedUpdateManyWithoutPostNestedInput
    newsletterSends?: NewsletterPostSendUncheckedUpdateManyWithoutPostNestedInput
  }

  export type NewsletterPostSendUpsertWithoutEmailEventsInput = {
    update: XOR<NewsletterPostSendUpdateWithoutEmailEventsInput, NewsletterPostSendUncheckedUpdateWithoutEmailEventsInput>
    create: XOR<NewsletterPostSendCreateWithoutEmailEventsInput, NewsletterPostSendUncheckedCreateWithoutEmailEventsInput>
    where?: NewsletterPostSendWhereInput
  }

  export type NewsletterPostSendUpdateToOneWithWhereWithoutEmailEventsInput = {
    where?: NewsletterPostSendWhereInput
    data: XOR<NewsletterPostSendUpdateWithoutEmailEventsInput, NewsletterPostSendUncheckedUpdateWithoutEmailEventsInput>
  }

  export type NewsletterPostSendUpdateWithoutEmailEventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumNewsletterPostSendStatusFieldUpdateOperationsInput | $Enums.NewsletterPostSendStatus
    recipientCount?: IntFieldUpdateOperationsInput | number
    sentCount?: IntFieldUpdateOperationsInput | number
    failedCount?: IntFieldUpdateOperationsInput | number
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    post?: BlogPostUpdateOneRequiredWithoutNewsletterSendsNestedInput
  }

  export type NewsletterPostSendUncheckedUpdateWithoutEmailEventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    postId?: StringFieldUpdateOperationsInput | string
    status?: EnumNewsletterPostSendStatusFieldUpdateOperationsInput | $Enums.NewsletterPostSendStatus
    recipientCount?: IntFieldUpdateOperationsInput | number
    sentCount?: IntFieldUpdateOperationsInput | number
    failedCount?: IntFieldUpdateOperationsInput | number
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
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

  export type BlogPostTranslationCreateManyPostInput = {
    id?: string
    locale: $Enums.Locale
    title: string
    excerpt?: string | null
    contentMarkdown: string
    seoTitle?: string | null
    seoDescription?: string | null
    coverImageAlt?: string | null
    coverImageCaption?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type NewsletterPostSendCreateManyPostInput = {
    id?: string
    status: $Enums.NewsletterPostSendStatus
    recipientCount?: number
    sentCount?: number
    failedCount?: number
    errorMessage?: string | null
    startedAt?: Date | string
    completedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type NewsletterEmailEventCreateManyPostInput = {
    id?: string
    subscriberId?: string | null
    postSendId?: string | null
    type: $Enums.NewsletterEmailType
    status: $Enums.NewsletterEmailStatus
    toEmail: string
    subject: string
    resendEmailId?: string | null
    errorMessage?: string | null
    createdAt?: Date | string
  }

  export type BlogPostTranslationUpdateWithoutPostInput = {
    id?: StringFieldUpdateOperationsInput | string
    locale?: EnumLocaleFieldUpdateOperationsInput | $Enums.Locale
    title?: StringFieldUpdateOperationsInput | string
    excerpt?: NullableStringFieldUpdateOperationsInput | string | null
    contentMarkdown?: StringFieldUpdateOperationsInput | string
    seoTitle?: NullableStringFieldUpdateOperationsInput | string | null
    seoDescription?: NullableStringFieldUpdateOperationsInput | string | null
    coverImageAlt?: NullableStringFieldUpdateOperationsInput | string | null
    coverImageCaption?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BlogPostTranslationUncheckedUpdateWithoutPostInput = {
    id?: StringFieldUpdateOperationsInput | string
    locale?: EnumLocaleFieldUpdateOperationsInput | $Enums.Locale
    title?: StringFieldUpdateOperationsInput | string
    excerpt?: NullableStringFieldUpdateOperationsInput | string | null
    contentMarkdown?: StringFieldUpdateOperationsInput | string
    seoTitle?: NullableStringFieldUpdateOperationsInput | string | null
    seoDescription?: NullableStringFieldUpdateOperationsInput | string | null
    coverImageAlt?: NullableStringFieldUpdateOperationsInput | string | null
    coverImageCaption?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BlogPostTranslationUncheckedUpdateManyWithoutPostInput = {
    id?: StringFieldUpdateOperationsInput | string
    locale?: EnumLocaleFieldUpdateOperationsInput | $Enums.Locale
    title?: StringFieldUpdateOperationsInput | string
    excerpt?: NullableStringFieldUpdateOperationsInput | string | null
    contentMarkdown?: StringFieldUpdateOperationsInput | string
    seoTitle?: NullableStringFieldUpdateOperationsInput | string | null
    seoDescription?: NullableStringFieldUpdateOperationsInput | string | null
    coverImageAlt?: NullableStringFieldUpdateOperationsInput | string | null
    coverImageCaption?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NewsletterPostSendUpdateWithoutPostInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumNewsletterPostSendStatusFieldUpdateOperationsInput | $Enums.NewsletterPostSendStatus
    recipientCount?: IntFieldUpdateOperationsInput | number
    sentCount?: IntFieldUpdateOperationsInput | number
    failedCount?: IntFieldUpdateOperationsInput | number
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    emailEvents?: NewsletterEmailEventUpdateManyWithoutPostSendNestedInput
  }

  export type NewsletterPostSendUncheckedUpdateWithoutPostInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumNewsletterPostSendStatusFieldUpdateOperationsInput | $Enums.NewsletterPostSendStatus
    recipientCount?: IntFieldUpdateOperationsInput | number
    sentCount?: IntFieldUpdateOperationsInput | number
    failedCount?: IntFieldUpdateOperationsInput | number
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    emailEvents?: NewsletterEmailEventUncheckedUpdateManyWithoutPostSendNestedInput
  }

  export type NewsletterPostSendUncheckedUpdateManyWithoutPostInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumNewsletterPostSendStatusFieldUpdateOperationsInput | $Enums.NewsletterPostSendStatus
    recipientCount?: IntFieldUpdateOperationsInput | number
    sentCount?: IntFieldUpdateOperationsInput | number
    failedCount?: IntFieldUpdateOperationsInput | number
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NewsletterEmailEventUpdateWithoutPostInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumNewsletterEmailTypeFieldUpdateOperationsInput | $Enums.NewsletterEmailType
    status?: EnumNewsletterEmailStatusFieldUpdateOperationsInput | $Enums.NewsletterEmailStatus
    toEmail?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    resendEmailId?: NullableStringFieldUpdateOperationsInput | string | null
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subscriber?: NewsletterSubscriberUpdateOneWithoutEmailEventsNestedInput
    postSend?: NewsletterPostSendUpdateOneWithoutEmailEventsNestedInput
  }

  export type NewsletterEmailEventUncheckedUpdateWithoutPostInput = {
    id?: StringFieldUpdateOperationsInput | string
    subscriberId?: NullableStringFieldUpdateOperationsInput | string | null
    postSendId?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumNewsletterEmailTypeFieldUpdateOperationsInput | $Enums.NewsletterEmailType
    status?: EnumNewsletterEmailStatusFieldUpdateOperationsInput | $Enums.NewsletterEmailStatus
    toEmail?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    resendEmailId?: NullableStringFieldUpdateOperationsInput | string | null
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NewsletterEmailEventUncheckedUpdateManyWithoutPostInput = {
    id?: StringFieldUpdateOperationsInput | string
    subscriberId?: NullableStringFieldUpdateOperationsInput | string | null
    postSendId?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumNewsletterEmailTypeFieldUpdateOperationsInput | $Enums.NewsletterEmailType
    status?: EnumNewsletterEmailStatusFieldUpdateOperationsInput | $Enums.NewsletterEmailStatus
    toEmail?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    resendEmailId?: NullableStringFieldUpdateOperationsInput | string | null
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NewsletterEmailEventCreateManySubscriberInput = {
    id?: string
    postId?: string | null
    postSendId?: string | null
    type: $Enums.NewsletterEmailType
    status: $Enums.NewsletterEmailStatus
    toEmail: string
    subject: string
    resendEmailId?: string | null
    errorMessage?: string | null
    createdAt?: Date | string
  }

  export type NewsletterEmailEventUpdateWithoutSubscriberInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumNewsletterEmailTypeFieldUpdateOperationsInput | $Enums.NewsletterEmailType
    status?: EnumNewsletterEmailStatusFieldUpdateOperationsInput | $Enums.NewsletterEmailStatus
    toEmail?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    resendEmailId?: NullableStringFieldUpdateOperationsInput | string | null
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    post?: BlogPostUpdateOneWithoutNewsletterEmailEventsNestedInput
    postSend?: NewsletterPostSendUpdateOneWithoutEmailEventsNestedInput
  }

  export type NewsletterEmailEventUncheckedUpdateWithoutSubscriberInput = {
    id?: StringFieldUpdateOperationsInput | string
    postId?: NullableStringFieldUpdateOperationsInput | string | null
    postSendId?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumNewsletterEmailTypeFieldUpdateOperationsInput | $Enums.NewsletterEmailType
    status?: EnumNewsletterEmailStatusFieldUpdateOperationsInput | $Enums.NewsletterEmailStatus
    toEmail?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    resendEmailId?: NullableStringFieldUpdateOperationsInput | string | null
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NewsletterEmailEventUncheckedUpdateManyWithoutSubscriberInput = {
    id?: StringFieldUpdateOperationsInput | string
    postId?: NullableStringFieldUpdateOperationsInput | string | null
    postSendId?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumNewsletterEmailTypeFieldUpdateOperationsInput | $Enums.NewsletterEmailType
    status?: EnumNewsletterEmailStatusFieldUpdateOperationsInput | $Enums.NewsletterEmailStatus
    toEmail?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    resendEmailId?: NullableStringFieldUpdateOperationsInput | string | null
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NewsletterEmailEventCreateManyPostSendInput = {
    id?: string
    subscriberId?: string | null
    postId?: string | null
    type: $Enums.NewsletterEmailType
    status: $Enums.NewsletterEmailStatus
    toEmail: string
    subject: string
    resendEmailId?: string | null
    errorMessage?: string | null
    createdAt?: Date | string
  }

  export type NewsletterEmailEventUpdateWithoutPostSendInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumNewsletterEmailTypeFieldUpdateOperationsInput | $Enums.NewsletterEmailType
    status?: EnumNewsletterEmailStatusFieldUpdateOperationsInput | $Enums.NewsletterEmailStatus
    toEmail?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    resendEmailId?: NullableStringFieldUpdateOperationsInput | string | null
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subscriber?: NewsletterSubscriberUpdateOneWithoutEmailEventsNestedInput
    post?: BlogPostUpdateOneWithoutNewsletterEmailEventsNestedInput
  }

  export type NewsletterEmailEventUncheckedUpdateWithoutPostSendInput = {
    id?: StringFieldUpdateOperationsInput | string
    subscriberId?: NullableStringFieldUpdateOperationsInput | string | null
    postId?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumNewsletterEmailTypeFieldUpdateOperationsInput | $Enums.NewsletterEmailType
    status?: EnumNewsletterEmailStatusFieldUpdateOperationsInput | $Enums.NewsletterEmailStatus
    toEmail?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    resendEmailId?: NullableStringFieldUpdateOperationsInput | string | null
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NewsletterEmailEventUncheckedUpdateManyWithoutPostSendInput = {
    id?: StringFieldUpdateOperationsInput | string
    subscriberId?: NullableStringFieldUpdateOperationsInput | string | null
    postId?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumNewsletterEmailTypeFieldUpdateOperationsInput | $Enums.NewsletterEmailType
    status?: EnumNewsletterEmailStatusFieldUpdateOperationsInput | $Enums.NewsletterEmailStatus
    toEmail?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    resendEmailId?: NullableStringFieldUpdateOperationsInput | string | null
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
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