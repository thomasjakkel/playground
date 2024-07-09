import { screen, render } from '@testing-library/react'
import { BasicTestComponent } from './component'

describe('Basic Test Component', () => {
  it('should render the title with react logo', async () => {
    const { getByAltText } = render(<BasicTestComponent />)
    expect(
      await screen.findByText('This is a basic component'),
    ).toBeInTheDocument()

    getByAltText('React logo')
  })
})
