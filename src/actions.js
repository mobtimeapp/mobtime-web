import { composable, select, replace, merge, concat } from 'composable-state';

import * as effects from './effects.js';

export const initialState = () => ({
  now: 0,
  clientRestartedAt: 0,
  timer: {
    time: {
      startedAt: null,
      duration: null,
    },
    mob: [],
    goals: [],
    settings: {
      duration: 5 * 60 * 1000,
    },
  },
  local: {
    mob: [],
    goals: [],
    settings: {},
  },
  channels: {
    timer: null,
    mob: null,
    goals: null,
    settings: null,
  },
});

export const Nop = (state) => state;

export const setClientRestartedAt = (state, { clientRestartedAt }) => composable(
  state,
  select('clientRestartedAt', replace(clientRestartedAt))
);

export const setChannel = (state, { name, channel }) => composable(
  state,
  select('channels', select(name, replace(() => channel))),
);

export const setMob = (state, { mob }) => composable(state, select('timer.mob', replace(mob)));
export const setGoals = (state, { goals }) => composable(state, select('timer.goals', replace(goals)));
export const setSettings = (state, { settings }) => composable(state, select('timer.settings', replace(settings)));

export const onTick = (state, { now }) => ({
  ...state,
  now,
});

export const resetTimeState = (state) => composable(
  state,
  select('timer.time', replace(() => ({
    startedAt: state.sdk.timer.items().startedAt,
    duration: state.sdk.timer.items().duration,
  }))),
);

const justEffect = (effectFactory) => (state) => [state, effectFactory(state)];

export const timeStart = justEffect((state) => effects.TimerStart(state.channels.timer));
export const timePause = justEffect((state) => effects.TimerPause(state.channels.timer));
export const timeResume = justEffect((state) => effects.TimerResume(state.channels.timer));
export const timeComplete = justEffect((state) => effects.TimerComplete(state.channels.timer));

export const addMember = (state, { name }) => [
  state,
  effects.AddMember(name, state.channels.mob),
];
// export const addMember = (state, { name }) => composable(
//   state,
//   select('local.mob', concat(name)),
// );
export const editMember = (state, { name, id }) => [
  state,
  effects.EditMember(id, name, state.channels.mob),
];

export const addGoal = (state, { text }) => [
  state,
  effects.AddGoal(text, state.channels.goals)
];

export const completeGoal = (state, { id, completed }) => [
  state,
  effects.CompleteGoal(id, completed, state.channels.goals)
];

export const setTimerTime = (state, time) => composable(
  state,
  select('timer.time', merge(time)),
);
