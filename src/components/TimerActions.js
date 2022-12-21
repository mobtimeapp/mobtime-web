import { h } from 'hyperapp';
import { text } from '../i18n/i18n.js';

import * as actions from '../actions.js';

export const TimerActions = (props) => {
    const show = {
      start: props.time.startedAt === null && props.time.duration === null,
      pause: props.time.startedAt !== null,
      resume: props.time.startedAt === null && props.time.duration > 0,
      cancel: props.time.duration > 0,
    };

  return h('timer-controls', {
    class: 'flex flex-col items-center justify-center w-32',
  }, [
    show.start && h('button', {
      type: 'button',
      class: 'mb-1 w-full rounded-sm border border-gray-500 px-2 py-1 capitalize',
      onclick: actions.timeStart,
    }, text('actions.start')),
    show.pause && h('button', {
      type: 'button',
      class: 'mb-1 w-full rounded-sm border border-gray-500 px-2 py-1 capitalize',
      onclick: actions.timePause,
    }, text('actions.pause')),
    show.resume && h('button', {
      type: 'button',
      class: 'mb-1 w-full rounded-sm border border-gray-500 px-2 py-1 capitalize',
      onclick: actions.timeResume,
    }, text('actions.resume')),
    show.cancel && h('button', {
      type: 'button',
      class: 'mb-1 w-full rounded-sm border border-gray-500 px-2 py-1 capitalize',
      onclick: actions.timeComplete,
    }, text('actions.cancel')),
  ]);
};
