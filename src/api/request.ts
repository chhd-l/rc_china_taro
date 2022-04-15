import { Customer, CustomerPagedQueryResponse } from "./types/customer";
import { getAllCustomersQuery } from "./queries/get-all-customers-query";
import { Config } from "./types/api/fetcher";
import fetchGraphqlApi from "./fetchGraphqlApi";
import { getAllPetsQuery } from "./queries/get-all-pets-query";
import { petDeleteMutation } from "./mutations/pet-delete";
import { petCreateMutation } from "./mutations/pet-create";
import { Pet, PetInput } from "./types/pet";

const config: Config = {
  fetch: fetchGraphqlApi,
};

export class ClientBuilder {
  public apiRoot: any = {
    customers: this.customers,
  };

  async customers(): Promise<CustomerPagedQueryResponse | any> {
    const { data } = await config.fetch(getAllCustomersQuery, {
      variables: {
        offset: 20,
      },
    });
    return {
      customers: data?.customers,
    };
  }

  pets(): {
    getPets: Function;
    createPet: Function;
    deletePet: Function;
  } {
    return {
      getPets: this.getPets,
      createPet: this.createPet,
      deletePet: this.deletePet,
    };
  }

  private async getPets({
    customerId,
  }: {
    customerId: string;
  }): Promise<Pet[]> {
    const { data } = await config.fetch(getAllPetsQuery, {
      variables: {
        customerId,
      },
    });
    console.log(data);
    return data.pets;
  }
  private async deletePet({
    customerId,
    operator,
  }: {
    customerId: string;
    operator?: string;
  }): Promise<any> {
    const { data } = await config.fetch(petDeleteMutation, {
      variables: {
        customerId,
        operator: operator || "root",
      },
    });
  }

  private async createPet({ body }: { body: PetInput }): Promise<any> {
    const { data } = await config.fetch(petCreateMutation, {
      variables: {
        body,
      },
    });
  }
}

// async function getAllProducts({
//   query = getAllProductsQuery,
//   variables: { field = 'products', ...vars } = {},
//   config,
// }: {
//   query?: string
//   variables?: ProductVariables
//   config?: BigcommerceConfig
//   preview?: boolean
//   // TODO: fix the product type here
// } = {}): Promise<{ products: Product[] | any[] }> {
//   config = getConfig(config)

//   const locale = vars.locale || config.locale
//   const variables: GetAllProductsQueryVariables = {
//     ...vars,
//     locale,
//     hasLocale: !!locale,
//   }

//   if (!FIELDS.includes(field)) {
//     throw new Error(
//       `The field variable has to match one of ${FIELDS.join(', ')}`
//     )
//   }

//   variables[field] = true

//   // RecursivePartial forces the method to check for every prop in the data, which is
//   // required in case there's a custom `query`
//   const { data } = await config.fetch<RecursivePartial<GetAllProductsQuery>>(
//     query,
//     { variables }
//   )
//   const edges = data.site?.[field]?.edges
//   const products = filterEdges(edges as RecursiveRequired<typeof edges>)

//   if (locale && config.applyLocale) {
//     products.forEach((product: RecursivePartial<ProductEdge>) => {
//       if (product.node) setProductLocaleMeta(product.node)
//     })
//   }

//   return { products: products.map(({ node }) => normalizeProduct(node as any)) }
// }

// export class ApiRoot {
//   private executeRequest: executeRequest
//   private baseUri: string

//   constructor(args: { executeRequest: executeRequest; baseUri?: string }) {
//     this.executeRequest = args.executeRequest
//     this.baseUri =
//       args.baseUri || 'https://import.europe-west1.gcp.commercetools.com'
//   }

//   public withProjectKeyValue(childPathArgs: {
//     projectKey: string
//   }): ByProjectKeyRequestBuilder {
//     return new ByProjectKeyRequestBuilder({
//       pathArgs: {
//         ...childPathArgs,
//       },
//       executeRequest: this.executeRequest,
//       baseUri: this.baseUri,
//     })
//   }
// }

// export default class ClientBuilder {
//   private projectKey: string | undefined
//   private authMiddleware: Nullable<Middleware>
//   private httpMiddleware: Nullable<Middleware>
//   private userAgentMiddleware: Nullable<Middleware>
//   private correlationIdMiddleware: Nullable<Middleware>
//   private loggerMiddleware: Nullable<Middleware>
//   private queueMiddleware: Nullable<Middleware>
//   private middlewares: Array<Middleware> = []

//   withProjectKey(key: string): ClientBuilder {
//     this.projectKey = key
//     return this
//   }

//   defaultClient(
//     baseUri: string,
//     credentials: Credentials,
//     oauthUri?: string,
//     projectKey?: string
//   ): ClientBuilder {
//     return this.withClientCredentialsFlow({
//       host: oauthUri,
//       projectKey: projectKey || this.projectKey,
//       credentials,
//     })
//       .withHttpMiddleware({
//         host: baseUri,
//         fetch: fetch,
//       })
//       .withLoggerMiddleware()
//   }

//   withAuthMiddleware(authMiddleware: Middleware): ClientBuilder {
//     this.authMiddleware = authMiddleware
//     return this
//   }

//   withMiddleware(middleware: Middleware): ClientBuilder {
//     this.middlewares.push(middleware)
//     return this
//   }

//   withClientCredentialsFlow(options: AuthMiddlewareOptions): ClientBuilder {
//     return this.withAuthMiddleware(
//       createAuthMiddlewareForClientCredentialsFlow({
//         host: options.host || 'https://auth.europe-west1.gcp.commercetools.com',
//         projectKey: options.projectKey || this.projectKey,
//         credentials: {
//           clientId: options.credentials.clientId || '',
//           clientSecret: options.credentials.clientSecret || '',
//         },
//         oauthUri: options.oauthUri || '',
//         scopes: options.scopes,
//         fetch: options.fetch || fetch,
//         ...options,
//       })
//     )
//   }

//   withPasswordFlow(options: PasswordAuthMiddlewareOptions): ClientBuilder {
//     return this.withAuthMiddleware(
//       createAuthMiddlewareForPasswordFlow({
//         host: options.host || 'https://auth.europe-west1.gcp.commercetools.com',
//         projectKey: options.projectKey || this.projectKey,
//         credentials: {
//           clientId: options.credentials.clientId || '',
//           clientSecret: options.credentials.clientSecret || '',
//           user: {
//             username: options.credentials.user.username || '',
//             password: options.credentials.user.password || '',
//           },
//         },
//         fetch: options.fetch || fetch,
//         ...options,
//       })
//     )
//   }

//   withAnonymousSessionFlow(
//     options: AnonymousAuthMiddlewareOptions
//   ): ClientBuilder {
//     return this.withAuthMiddleware(
//       createAuthMiddlewareForAnonymousSessionFlow({
//         host: options.host || 'https://auth.europe-west1.gcp.commercetools.com',
//         projectKey: this.projectKey || options.projectKey,
//         credentials: {
//           clientId: options.credentials.clientId || '',
//           clientSecret: options.credentials.clientSecret || '',
//           anonymousId: options.credentials.anonymousId || '',
//         },
//         fetch: options.fetch || fetch,
//         ...options,
//       })
//     )
//   }

//   withRefreshTokenFlow(options: RefreshAuthMiddlewareOptions): ClientBuilder {
//     return this.withAuthMiddleware(
//       createAuthMiddlewareForRefreshTokenFlow({
//         host: options.host || 'https://auth.europe-west1.gcp.commercetools.com',
//         projectKey: this.projectKey || options.projectKey,
//         credentials: {
//           clientId: options.credentials.clientId || '',
//           clientSecret: options.credentials.clientSecret || '',
//         },
//         fetch: options.fetch || fetch,
//         refreshToken: options.refreshToken || '',
//         ...options,
//       })
//     )
//   }

//   withExistingTokenFlow(
//     authorization: string,
//     options: ExistingTokenMiddlewareOptions
//   ): ClientBuilder {
//     return this.withAuthMiddleware(
//       createAuthMiddlewareWithExistingToken(authorization, {
//         force: options.force || true,
//         ...options,
//       })
//     )
//   }

//   withHttpMiddleware(options: HttpMiddlewareOptions): ClientBuilder {
//     this.httpMiddleware = createHttpMiddleware({
//       host: options.host || 'https://api.europe-west1.gcp.commercetools.com',
//       fetch: options.fetch || fetch,
//       ...options,
//     })
//     return this
//   }

//   withUserAgentMiddleware(): ClientBuilder {
//     this.userAgentMiddleware = createUserAgentMiddleware()
//     return this
//   }

//   withQueueMiddleware(options: QueueMiddlewareOptions): ClientBuilder {
//     this.queueMiddleware = createQueueMiddleware({
//       concurrency: options.concurrency || 20,
//       ...options,
//     })
//     return this
//   }

//   withLoggerMiddleware() {
//     this.loggerMiddleware = createLoggerMiddleware()
//     return this
//   }

//   withCorrelationIdMiddleware(
//     options: CorrelationIdMiddlewareOptions
//   ): ClientBuilder {
//     this.correlationIdMiddleware = createCorrelationIdMiddleware({
//       generate: options.generate || null,
//       ...options,
//     })
//     return this
//   }

//   build(): Client {
//     const middlewares = this.middlewares.slice()

//     if (this.correlationIdMiddleware)
//       middlewares.push(this.correlationIdMiddleware)
//     if (this.userAgentMiddleware) middlewares.push(this.userAgentMiddleware)
//     if (this.authMiddleware) middlewares.push(this.authMiddleware)
//     if (this.loggerMiddleware) middlewares.push(this.loggerMiddleware)
//     if (this.queueMiddleware) middlewares.push(this.queueMiddleware)
//     if (this.httpMiddleware) middlewares.push(this.httpMiddleware)

//     return createClient({ middlewares })
//   }
// }

// fetch('http://example.com/movies.json')
//   .then(response => response.json())
//   .then(data => console.log(data));
