# Snapshot report for `public/actions.init.test.js`

The actual snapshot is saved in `actions.init.test.js.snap`.

Generated by [AVA](https://avajs.dev).

## creates a state with timer-related state

> Snapshot 1

    [
      {
        addMultiple: false,
        allowNotification: false,
        allowSound: false,
        currentTime: null,
        dark: undefined,
        drag: {
          active: false,
          clientX: null,
          clientY: null,
          from: null,
          to: null,
          type: null,
        },
        expandedReorderable: null,
        externals: {
          Notification: {},
          documentElement: {},
        },
        goal: '',
        goals: [],
        mob: [],
        name: '',
        pendingSettings: {},
        prompt: {
          OnValue: Function Noop {},
          context: null,
          text: '',
          value: '',
          visible: false,
        },
        settings: {
          duration: 300000,
          mobOrder: 'Navigator,Driver',
        },
        sound: 'horn',
        timerDuration: 0,
        timerId: 'test',
        timerStartedAt: null,
        timerTab: 'overview',
        toasts: [],
        websocket: null,
      },
      [
        Function CheckSettingsFX {},
        {
          onDarkEnabled: Function SetDark {},
          onLocalSoundEnabled: Function SoundToast {},
          storage: undefined,
        },
      ],
      undefined,
      [
        Function RemoveQueryParametersFX {},
        {
          Notification: {},
          documentElement: {},
        },
      ],
    ]