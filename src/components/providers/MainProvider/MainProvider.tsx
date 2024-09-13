import en from '@planview/pv-uikit/lang/en.json'
import { ReactNode } from 'react'
import { IntlProvider } from 'react-intl'
import { RecoilRoot } from 'recoil'

interface Props {
  children: ReactNode
}

// This is the place responsible for grouping all providers from the app
export const MainProvider = ({ children }: Props) => (
  <>
    <IntlProvider
      locale='en-US'
      messages={en}
    >
      <RecoilRoot>{children}</RecoilRoot>
    </IntlProvider>
  </>
)
