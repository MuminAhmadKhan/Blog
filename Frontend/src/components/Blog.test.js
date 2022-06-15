import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'
test('renders content', () => {
  const blog = {
    title: "xut",
    author: "bjhklj;lk",
    url: "123456",
    likes: 1
  }
  const mockHandler = jest.fn()
  const { container } = render(<Blog blog={blog} setBlogs={()=>jh} blogs ={[]} />)

  const element1 = container.querySelector('.title')
  const element2 = screen.getByText('bjhklj;lk')
  const element = container.querySelector('.url')
  expect(element).toBeDefined()
  expect(element2).toBeDefined()
  expect(element).toBeNull()
  
  const button = screen.getByText('Expand')
  userEvent.click(button)
  const element3 = screen.getByText('123456')
  const element4 = screen.getByText('1')
  expect(element3).toBeDefined()
  expect(element4).toBeDefined()
  const button1 = screen.getByText('Like')
  userEvent.click(button1)
  userEvent.click(button1)


})