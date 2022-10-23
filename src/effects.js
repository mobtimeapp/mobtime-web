const TimerStartFx = (_, props) => {
  props.sdk.timer.start();
};
export const TimerStart = (sdk) => [
  TimerStartFx,
  { sdk },
];

const TimerPauseFx = (_, props) => {
  props.sdk.timer.pause();
};
export const TimerPause = (sdk) => [
  TimerPauseFx,
  { sdk: sdk },
];

const TimerResumeFx = (_, props) => {
  props.sdk.timer.resume();
};
export const TimerResume = (sdk) => [
  TimerResumeFx,
  { sdk: sdk },
];

