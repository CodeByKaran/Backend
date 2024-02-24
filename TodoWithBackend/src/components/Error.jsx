import React from 'react'

export default function Error({message}) {
  return (
    <div className="alert alert-danger text-start my-alert" role="alert" data-bs-theme="dark">
  {message}
</div>
  )
}