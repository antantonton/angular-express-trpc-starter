import { Component, inject } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { TrpcService } from './shared/services/trpc.service'
import { AsyncPipe } from '@angular/common'

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private readonly _trpcService = inject(TrpcService)
  readonly hello$ = this._trpcService.hello()
}
