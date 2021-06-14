import React from 'react'
const Task = ({task}) => (
  <div>
    {task.title} {task.difficulty}
  </div>
) 

export default Task