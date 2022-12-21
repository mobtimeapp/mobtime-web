const TimerMessageFx = (_dispatch, props) => props.channel(props.msg);

export const TimerStart = (channel) => [TimerMessageFx, { channel, msg: 'start' }];
export const TimerPause = (channel) => [TimerMessageFx, { channel, msg: 'pause' }];
export const TimerResume = (channel) => [TimerMessageFx, { channel, msg: 'resume' }];
export const TimerComplete = (channel) => [TimerMessageFx, { channel, msg: 'complete' }];

const AddMemberFx = (_dispatch, props) => {
  props.channel('add', { name: props.name });
};
export const AddMember = (name, channel) => [AddMemberFx, { channel, name }];

const EditMemberFx = (_dispatch, props) => {
  props.channel('edit', { id: props.id, name: props.name });
};
export const EditMember = (id, name, channel) => [EditMemberFx, { channel, id, name }];

const AddGoalFx = (_dispatch, props) => {
  props.channel('add', props.text);
};
export const AddGoal = (text, channel) => [AddGoalFx, { channel, text }];

const CompleteGoalFx = (_dispatch, props) => {
  props.channel('complete', { id: props.id, completed: props.completed });
};
export const CompleteGoal = (id, completed, channel) => [CompleteGoalFx, { channel, id, completed }];
