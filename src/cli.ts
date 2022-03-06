#!/usr/bin/env node
import { share_replay_example, behavior_subject_example } from './main'

if (process.argv[2] == 'behavior') {
  console.log('Behaviour subject example')
  behavior_subject_example()
} else {
  console.log('Share replay example')
  share_replay_example()
}
