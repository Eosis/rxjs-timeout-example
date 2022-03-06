
import { timeout, of, BehaviorSubject, shareReplay, Observable} from 'rxjs'

const wait = async (ms: number) => {
  await new Promise((resolve) => { setTimeout(resolve, ms) })
}

export const behavior_subject_example = async (): Promise<void> => {
  const base_subject$ = new BehaviorSubject(1)

  const with_timeout$ = base_subject$.pipe(
    timeout({first: 500, with: () => of(-1)}),
  );

  const sub = with_timeout$.subscribe(
    console.log
  )
  await wait(1000)
  base_subject$.next(2)
  await wait(1000)
  sub.unsubscribe()
}

export const share_replay_example = async (): Promise<void> => {
  const long_running_observable$ = new Observable((subscriber) => {
    setTimeout(() => subscriber.next(1), 1000)
  });

  const with_replay$ = long_running_observable$.pipe(
    shareReplay(1),
  )

  const with_timeout$ = with_replay$.pipe(
    timeout({first: 1500, with: () => of(-1)}),
  )

  const first_sub$ = with_timeout$.subscribe((x) => console.log(`First Sub: ${x}`))
  await wait(2500);
  const second_sub$ = with_timeout$.subscribe((x) => console.log(`Second Sub: ${x}`))
  await wait(2500);

  first_sub$.unsubscribe()
  second_sub$.unsubscribe()
}


