import { Mobtime, Message, browserWebsocket } from '@mobtime/sdk';
import { channel } from '../lib/channel.js';

export const ClientSub = (dispatch, props) => {
  console.log('connecting...', props);
  const client = new Mobtime();

  const channels = {
    timer: channel((msg) => {
      console.log('ClientSub.channels.timer', msg);
      switch (msg) {
        case 'start':
          client.timer().start().commit();
          break;

        case 'pause':
          client.timer().pause().commit();
          break;

        case 'resume':
          client.timer().resume().commit();
          break;

        case 'complete':
          client.timer().complete().commit();
          break;

        default:
          console.warn('timer channel does not support', msg);
          break;
      }
    }, 'timer'),
    mob: channel((msg, target) => {
      console.log('ClientSub.channels.mob', msg, target);
      switch (msg) {
        case 'add':
          client.mob().add(target.name).commit();
          break;

        case 'edit':
          if (target.name) {
            client.mob().rename({ id: target.id }, target.name).commit();
          } else {
            client.mob().remove({ id: target.id }).commit();
          }
          break;

        default:
          console.warn('mob channel does not support', msg);
      }
    }, 'mob'),
    goals: channel((msg, target) => {
      console.log('ClientSub.channels.goals', msg, target);
      switch (msg) {
        case 'add':
          client.goals().add(target).commit();
          break;

        case 'complete':
          client.goals().complete({ id: target.id }, target.completed).commit();
          break;

        default:
          console.warn('goal channel does not support', msg);
      }
    }, 'goals'),
    settings: channel((message) => {
      console.log('ClientSub.channels.settings', message);
      client.trigger("message", message);
    }, 'settings'),
  };

  client.on(Message.MOB_UPDATE, () => {
    dispatch(props.setMob, { mob: client.mob().items() });
  });
  client.on(Message.GOALS_UPDATE, () => {
    dispatch(props.setGoals, { goals: client.goals().items() });
  });
  client.on(Message.SETTINGS_UPDATE, () => {
    dispatch(props.setSettings, { settings: client.settings().items() });
  });

  client.on(Message.TIMER_START, (message) => {
    dispatch(props.setTimerTime, {
      duration: message.payload.timerDuration,
      startedAt: Date.now(),
    });
  });

  client.on(Message.TIMER_UPDATE, (_message) => {});

  client.on(Message.TIMER_PAUSE, (message) => {
    console.log("timer:paused", message);
    dispatch(props.setTimerTime, {
      duration: message.payload.timerDuration,
      startedAt: null,
    });
  });

  client.on(Message.TIMER_COMPLETE, (message) => {
    console.log("timer:completed", message);
    dispatch(props.setTimerTime, {
      duration: null,
      startedAt: null,
    });
  });

  client.on('close', () => {
    setTimeout(() => {
      dispatch(props.setClientRestartedAt, { clientRestartedAt: Date.now() });
    }, 1000);
  });

  client
    .usingSocket(browserWebsocket(props.client.timerId, props.client.options))
    .then((_timer) => {
      dispatch(props.setChannel, { name: 'timer', channel: channels.timer });
      dispatch(props.setChannel, { name: 'mob', channel: channels.mob });
      dispatch(props.setChannel, { name: 'goals', channel: channels.goals });
      dispatch(props.setChannel, { name: 'settings', channel: channels.settings });
    })
    .catch((err) => {
      console.error('unable to connect to mobtime', err);
    });

  return () => {
    client.disconnect();
    dispatch(props.setChannel, { name: 'timer', channel: null });
    dispatch(props.setChannel, { name: 'mob', channel: null });
    dispatch(props.setChannel, { name: 'goals', channel: null });
    dispatch(props.setChannel, { name: 'settings', channel: null });
  };
};
