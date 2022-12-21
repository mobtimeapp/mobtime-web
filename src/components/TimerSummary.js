import { h } from 'hyperapp';
import { text } from '../i18n/i18n.js';

import { TimerActions } from './TimerActions.js';

import * as actions from '../actions.js';

const timeRemaining = (duration, timerStartedAt, now) => {
  const timerEndsAt = (timerStartedAt || now) + duration;
  const diff = Math.max(0, timerEndsAt - now);

  const minutes = Math.floor(diff / (60 * 1000));
  const seconds = Math.floor((diff - (minutes * 60 * 1000)) / 1000);

  return [
    minutes.toString().padStart(2, '0'),
    seconds.toString().padStart(2, '0'),
  ].join(':');
};

export const TimerSummary = (props) => {
  return h('header', {
    class: 'mb-2 mt-1 flex px-4',
  }, [
    h('mobtime:timer', {
      class: 'flex-grow',
    }, [
      h('h1', {
        class: 'text-sm font-bold uppercase tracking-wide'
      }, text('remainingTime')),
      h('h2', {
        class: 'font-mono text-5xl'
      }, text(
        timeRemaining(props.time.duration || props.settings.duration, props.time.startedAt, props.now),
        false,
      )),
    ]),

    TimerActions({
      time: props.time,
    }),
  ]);
};
