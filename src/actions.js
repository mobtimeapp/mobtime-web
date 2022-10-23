import { composable, select, replace } from 'composable-state';

import * as effects from './effects.js';

export const onTick = (state, { now }) => ({
  ...state,
  now,
});

export const setSdk = (state, { sdk }) => ({
  ...state,
  sdk,
});

export const resetTimeState = (state) => composable(
  state,
  select('timer.time', replace(() => ({
    startedAt: state.sdk.timer.items().startedAt,
    duration: state.sdk.timer.items().duration,
  }))),
);

export const timeStart = (state) => [
  state,
  effects.TimerStart(state.sdk),
];

export const timePause = (state) => [
  state,
  effects.TimerPause(state.sdk),
];

export const timeResume = (state) => [
  state,
  effects.TimerResume(state.sdk),
];

export const timeComplete = (state) => [
  state,
  effects.TimerComplete(state.sdk),
];
