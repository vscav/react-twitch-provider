import type { RenderOptions } from '@testing-library/react'
import { render } from '@testing-library/react'
import type { RenderHookOptions, RenderHookResult } from '@testing-library/react-hooks'
import { renderHook } from '@testing-library/react-hooks'
import React from 'react'
import { SWRConfig } from 'swr'
import type { MockTwitchProviderOptions } from '../__mocks__/provider'
import { MockTwitchProvider } from '../__mocks__/provider'

function wrapWithMockTwitchContext(givenOptions?: Partial<MockTwitchProviderOptions>) {
  const providerOptions = {
    accessToken: 'foo',
    clientId: 'bar',
    redirectUri: 'http://localhost',
  }

  if (givenOptions) {
    Object.assign(providerOptions, givenOptions)
  }

  const wrapperFunction = ({ children }: { children?: React.ReactNode }) => (
    <SWRConfig value={{ provider: () => new Map() }}>
      <MockTwitchProvider {...providerOptions}>{children}</MockTwitchProvider>
    </SWRConfig>
  )

  return wrapperFunction
}

function renderWithMockTwitchContext(
  ui: React.ReactElement,
  contextOptions?: Partial<MockTwitchProviderOptions>,
  renderOptions?: Omit<RenderOptions, 'wrapper'>,
) {
  return render(ui, { ...renderOptions, wrapper: wrapWithMockTwitchContext(contextOptions) })
}

function renderHookWithMockTwitchContext<Props extends { children?: React.ReactNode }, Result>(
  callback: (props: Props) => Result,
  contextOptions?: Partial<MockTwitchProviderOptions>,
  renderHookOptions?: RenderHookOptions<Props>,
): RenderHookResult<Props, Result> {
  return renderHook(callback, {
    ...renderHookOptions,
    wrapper: wrapWithMockTwitchContext(contextOptions),
  })
}

export { renderHookWithMockTwitchContext, renderWithMockTwitchContext }
