import type { RenderOptions } from '@testing-library/react'
import { render } from '@testing-library/react'
import type { RenderHookOptions, RenderHookResult } from '@testing-library/react-hooks'
import { renderHook } from '@testing-library/react-hooks'
import type { ReactElement, ReactNode } from 'react'
import React from 'react'
import { getMockedClient } from './api'
import type { MockTwitchProviderOptions } from './mock-twitch-provider'
import { MockTwitchProvider } from './mock-twitch-provider'

async function wrapWithMockTwitchContext(givenOptions?: Partial<MockTwitchProviderOptions>) {
  const data = await getMockedClient()

  const credentials = {
    clientId: data.id,
    clientSecret: data.secret,
  }

  if (givenOptions) {
    Object.assign(credentials, givenOptions)
  }

  const wrapperFunction = ({ children }: { children?: ReactNode }) => (
    <MockTwitchProvider clientId={credentials.clientId} clientSecret={credentials.clientSecret}>
      {children}
    </MockTwitchProvider>
  )

  return wrapperFunction
}

async function renderWithMockTwitchContext(
  ui: ReactElement,
  contextOptions?: Partial<MockTwitchProviderOptions>,
  renderOptions?: Omit<RenderOptions, 'wrapper'>,
) {
  return render(ui, { ...renderOptions, wrapper: await wrapWithMockTwitchContext(contextOptions) })
}

async function renderHookWithMockTwitchContext<Props extends { children?: ReactNode }, Result>(
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
