
import { timeout, of, BehaviorSubject } from 'rxjs'

const base_subject$ = new BehaviorSubject(1);

const with_timeout = base_subject$.pipe(
	timeout({first: 500, with: () => of(-1)}),
);

const wait = async (ms: number) => {
  await new Promise((resolve) => { setTimeout(resolve, ms) })
}

export const foo = async (): Promise<void> => {
  const sub = with_timeout.subscribe(
    console.log
  )
  await wait(1000)
  base_subject$.next(2)
  await wait(1000)
  sub.unsubscribe()
}
