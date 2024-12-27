import { Injectable } from '@angular/core'
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client'
import { AppRouter } from 'backend'
import { from } from 'rxjs'
import { SERVER_PORT } from 'common/environment'

@Injectable({
  providedIn: 'root',
})
export class TrpcService {
  private readonly _client = createTRPCProxyClient<AppRouter>({
    links: [
      httpBatchLink({
        url: `http://localhost:${SERVER_PORT}/trpc`,
        // You can pass any HTTP headers you wish here
        // async headers() {
        //   return {
        //     authorization: getAuthCookie(),
        //   }
        // },
      }),
    ],
  })

  constructor() {}

  hello() {
    return from(this._client.hello.query())
  }
}
