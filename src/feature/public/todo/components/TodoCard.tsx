import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Card, Checkbox } from 'antd'
import { CheckboxChangeEvent } from 'antd/es/checkbox'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAppDispatch } from '../../../../app/hooks'
import DeleteModal from '../../../../common/components/DeleteModal'
import { showModal, useGetDetailActivityQuery } from '../../activity/activityService'
import { Todo } from '../todoInterface'
import { useDeleteTodoMutation, useUpdateActiveTodoMutation } from '../todoService'
import { TodoPriorityStatus } from './TodoPriorityStatus'

export default function TodoCard({ todo }: { todo: Todo }) {
  const [visible, setVisible] = useState(false)
  const { activity_id } = useParams<{ activity_id: string }>()
  const { refetch } = useGetDetailActivityQuery({ id: parseInt(activity_id) })
  const [deleteTodo] = useDeleteTodoMutation()
  const [updateActiveTodo] = useUpdateActiveTodoMutation()
  const dispatch = useAppDispatch()

  const onEdit = (todo: Todo) => {
    dispatch(showModal({ title: `Edit Todo ${todo.title}`, type: 'edit', formState: todo }))
  }

  const onDelete = () => {
    setVisible(true)
  }

  const onCancel = () => {
    setVisible(false)
  }

  const onDeleteAttempt = async () => {
    await deleteTodo(todo.id)
    await refetch()
    setVisible(false)
  }

  const onActiveUpdate = async (e: CheckboxChangeEvent) => {
    const is_active = e.target.checked ? 0 : 1;
    await updateActiveTodo({ id: todo.id, is_active: is_active, priority: todo.priority })
    await refetch()
  }

  return (
    <>
      <Card hoverable>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <Checkbox defaultChecked={!(todo.is_active == 1)} onChange={(e) => onActiveUpdate(e)} />
            <TodoPriorityStatus status={todo.priority} />
            <span style={{ textDecoration: (!(todo.is_active == 1)) ? 'line-through' : 'initial' }}>{todo.title}</span>
            <EditOutlined onClick={() => onEdit(todo)} />
          </div>
          <DeleteOutlined onClick={() => onDelete()} />
        </div>
      </Card>
      <DeleteModal visible={visible} subject="todo" title={todo.title} onCancel={onCancel} onOk={onDeleteAttempt} />
    </>
  )
}