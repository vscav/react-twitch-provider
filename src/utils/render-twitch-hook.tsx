import {
  renderHook,
  RenderHookOptions,
  RenderHookResult
} from '@testing-library/react-hooks';
import React, { ReactNode } from 'react';
import { getMockedClient } from './api';
import { MockTwitchProvider } from './mock-twitch-provider';

async function wrapWithTwitchContext() {
  const data = await getMockedClient()

  const credentials = {
    clientId: data.id,
    clientSecret: data.secret,
  };

  const wrapperFunction = ({children}: {children?: ReactNode}) => (
    <MockTwitchProvider
      clientId={credentials.clientId}
      clientSecret={credentials.clientSecret}
    >
      {children}
    </MockTwitchProvider>
  );

  return wrapperFunction;
}

async function renderHookWithTwitchContext<Props extends { children?: ReactNode }, Result>(
  callback: (props: Props) => Result,
  renderHookOptions?: RenderHookOptions<Props>,
): Promise<RenderHookResult<Props, Result>> {
  const hookRender = renderHook(callback, {
    ...renderHookOptions,
    wrapper: await wrapWithTwitchContext(),
  });
  await hookRender.waitForNextUpdate();
  return hookRender;
}

export { renderHookWithTwitchContext };
