import { Mobtime, browserWebsocket } from '@mobtime/sdk';

export const ClientSub = (dispatch, props) => {
  const client = new Mobtime()
    .usingSocket(browserWebsocket(props.timerId, props.options))
    .then((timer) => {
      console.log('timer ready');
    });

  return () => {
    client.disconnect();
  };
};
