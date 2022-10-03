import type { RenderOptions } from '@testing-library/react'
import { render } from '@testing-library/react'
import type { RenderHookOptions, RenderHookResult } from '@testing-library/react-hooks'
import { renderHook } from '@testing-library/react-hooks'
import React from 'react'
import { getMockedClient } from './mock-api'
import type { MockTwitchProviderOptions } from './mock-twitch-provider'
import { MockTwitchProvider } from './mock-twitch-provider'

async function wrapWithMockTwitchContext(givenOptions?: Partial<MockTwitchProviderOptions>) {
  const data = await getMockedClient()

  const providerOptions = {
    clientId: data.id,
    clientSecret: data.secret,
    redirectUri: 'http://localhost',
    token: undefined,
  }

  if (givenOptions) {
    Object.assign(providerOptions, givenOptions)
  }

  const wrapperFunction = ({ children }: { children?: React.ReactNode }) => (
    <MockTwitchProvider {...providerOptions}>{children}</MockTwitchProvider>
  )

  return wrapperFunction
}

async function renderWithMockTwitchContext(
  ui: React.ReactElement,
  contextOptions?: Partial<MockTwitchProviderOptions>,
  renderOptions?: Omit<RenderOptions, 'wrapper'>,
) {
  return render(ui, { ...renderOptions, wrapper: await wrapWithMockTwitchContext(contextOptions) })
}

async function renderHookWithMockTwitchContext<Props extends { children?: React.ReactNode }, Result>(
  callback: (props: Props) => Result,
  contextOptions?: Partial<MockTwitchProviderOptions>,
  renderHookOptions?: RenderHookOptions<Props>,
): Promise<RenderHookResult<Props, Result>> {
  const hookRender = renderHook(callback, {
    ...renderHookOptions,
    wrapper: await wrapWithMockTwitchContext(contextOptions),
  })
  await hookRender.waitForNextUpdate()
  return hookRender
}

export { renderHookWithMockTwitchContext, renderWithMockTwitchContext }
