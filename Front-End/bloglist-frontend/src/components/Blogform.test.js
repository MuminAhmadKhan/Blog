import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('<NoteForm /> updates parent state and calls onSubmit', () => {
    const setBlogVisible = jest.fn()
  
    render(<BlogForm  setBlogVisible={setBlogVisible} setBlogs={()=>0} blogs={[]} blogVisible={false} />)
    const name = screen.getByLabelText('Name')
    const author = screen.getByLabelText('Author')
    const url = screen.getByLabelText('Url')

    const sendButton = screen.getByText('Save')
  
    userEvent.type(name, 'testing a  blog...' )
    
    userEvent.type(author, 'testing a  blog...' )
    
    userEvent.type(url, 'testing a  blog...' )
    expect(screen.getByLabelText('Url')).toHaveValue('testing a  blog...')
    userEvent.click(sendButton)
    expect(setBlogVisible.mock.calls).toHaveLength(1)
  })