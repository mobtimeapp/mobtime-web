import { app, h, text } from 'hyperapp';

import { Section } from './components/Section.js';

import { TimerSub } from './subscriptions/Timer.js';

const timeRemaining = (timerEndsAt, now) => {
  const diff = Math.max(0, timerEndsAt - now);
  const minutes = Math.floor(diff / (60 * 1000));
  const seconds = Math.floor((diff - (minutes * 60 * 1000)) / 1000);
  return [
    minutes.toString().padStart(2, '0'),
    seconds.toString().padStart(2, '0'),
  ].join(':');
};

const OnTick = (state, { now }) => ({
  ...state,
  now,
});

export const ui = (domMount) => app({
  init: {
    now: Date.now(),
    timer: {
      time: {
        endsAt: null, // (Date.now() + (5 * 60 * 1000)),
        duration: 5 * 60 * 1000,
      },
      
    },
  },

  view: (state) => {
    return h('main', {
      class: '',
    }, [

      h('header', {
        class: 'mb-2 mt-1 flex px-4',
      }, [
        h('mobtime:timer', {
          class: 'flex-grow',
        }, [
          h('h1', {
            class: 'text-sm font-bold uppercase tracking-wide'
          }, text('remaining time')),
          h('h2', {
            class: 'font-mono text-5xl'
          }, text(timeRemaining(state.timer.time.endsAt, state.now))),
        ]),

        h('mobtime:controls', {
          class: 'flex h-full flex-col items-end justify-center',
        }, [
          h('button', {
            type: 'button',
            class: 'mb-1 w-full rounded-sm border border-gray-500 px-2 py-1',
          }, text('Pause')),
          h('button', {
            type: 'button',
            class: 'mb-1 w-full rounded-sm border border-gray-500 px-2 py-1',
          }, text('Cancel')),
        ]),
      ]),

      h('mobtime-grid', {
        class: 'grid sm:grid-cols-2',
      }, [
        Section({ title: 'your team' }, []),
        Section({ title: 'goals' }, []),
        Section({ title: 'timer configuration' }, []),
        Section({ title: 'timer summary' }, []),
      ]),

    ]);
  },

  subscriptions: (state) => [
    (state.timer.time.endsAt && state.now < state.timer.time.endsAt) && [TimerSub, { onTick: OnTick }],
  ],

  node: domMount,
});
