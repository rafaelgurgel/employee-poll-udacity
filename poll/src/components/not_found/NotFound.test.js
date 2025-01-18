import React from 'react'
import { render } from '@testing-library/react'
import NotFound from './NotFound'
import '@testing-library/jest-dom'

describe('NotFound Component', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(<NotFound />)
    expect(asFragment()).toMatchSnapshot()
  })
})
