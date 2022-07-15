import React from 'react';
import { VERSION } from '@twilio/flex-ui';
import { FlexPlugin } from '@twilio/flex-plugin';

import CustomTaskListContainer from './components/CustomTaskList/CustomTaskList.Container';
import reducers, { namespace } from './states';

const PLUGIN_NAME = 'CarlosHoldMusicPlugin';

export default class CarlosHoldMusicPlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof import('@twilio/flex-ui') }
   * @param manager { import('@twilio/flex-ui').Manager }
   */
  async init(flex, manager) {
    this.registerReducers(manager);
    manager.strings.NoTasks= "There are no tasks to do, just chill out"

    const options = { sortOrder: -1 };
    flex.AgentDesktopView.Panel1.Content.add(<CustomTaskListContainer key="CarlosHoldMusicPlugin-component" />, options);

    flex.Actions.addListener('beforeHoldParticipant', async (payload) => {
      payload.holdMusicUrl = 'https://carlos-cch-2022-demo.s3.amazonaws.com/Calvin+Harris%2C+Dua+Lipa+-+One+Kiss+(Lyrics).mp3';
    });

    flex.Actions.addListener('beforeHoldCall', async (payload) => {
      payload.holdMusicUrl = 'https://carlos-cch-2022-demo.s3.amazonaws.com/Calvin+Harris%2C+Dua+Lipa+-+One+Kiss+(Lyrics).mp3';
    });

    flex.Actions.addListener('beforeTransferTask', async (payload) => {
      flex.Actions.invokeAction('HoldCall', payload);

    });
  }

  /**
   * Registers the plugin reducers
   *
   * @param manager { Flex.Manager }
   */
  registerReducers(manager) {
    if (!manager.store.addReducer) {
      // eslint-disable-next-line
      console.error(`You need FlexUI > 1.9.0 to use built-in redux; you are currently on ${VERSION}`);
      return;
    }

    manager.store.addReducer(namespace, reducers);
  }
}
