export const IntervalSub = (dispatch, props) => {
  let handle = null;

  const tick = () => {
    const now = Date.now();
    dispatch(props.onTick, { now });
  };

  setTimeout(() => {
    handle = setInterval(tick, 50);
    tick();
  }, 0);

  return () => {
    clearInterval(handle);
  };
};
