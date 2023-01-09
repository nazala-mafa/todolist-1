import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, Row } from 'antd';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../../../app/hooks';
import TodoCard from '../todo/components/TodoCard';
import TodoSortButton from '../todo/components/TodoSortButton';
import { showModal, useGetDetailActivityQuery } from './activityService';
import ActivifyDetailSettingModal from './components/ActivityDetailSettingModal';
import ActivityDetailTitle from './components/ActivityDetailTitle';
import person from './components/assets/person2.svg'

export default function ActivifyDetail() {
  const { activity_id } = useParams<{ activity_id: string }>()
  const { data: activity, error, isLoading } = useGetDetailActivityQuery({ id: parseInt(activity_id) })
  const dispatch = useAppDispatch()

  const addNewTodo = () => {
    dispatch(showModal({ title: "Tambah Todo", type: 'create', formState: { id: undefined, title: '', priority: '' } }))
  }

  useEffect(() => {
    window.document.title = 'To Do List - Detail'
  }, [])

  return (
    <>
      <Row justify={'space-between'} style={{ marginBottom: '1rem' }}>
        <Col xs={24}>
          <ActivityDetailTitle />
        </Col>
        <Col xs={24} style={{ display: 'flex', justifyContent: 'end' }}>
          <Row style={{ alignItems: 'center', gap: '1rem', justifyItems: 'right' }}>
            <TodoSortButton />
            <Button onClick={addNewTodo} icon={<PlusOutlined />} type='primary' shape={'round'} size="large" data-cy="todo-add-button">Tambah</Button>
          </Row>
        </Col>
      </Row>

      {
        error ? (
          <>Error Attempt ...</>
        ) : isLoading ? (
          <>Loading ...</>
        ) : activity?.todo_items.length ? (
          <Row gutter={[16, 16]}>
            {activity?.todo_items.map(todo => (
              <Col xs={24} key={todo.id}>
                <TodoCard todo={todo} />
              </Col>
            ))}
          </Row>
        ) : (
          <div style={{ display: 'flex', justifyContent: 'center' }} data-cy="todo-empty-state">
            <img width={'100%'} src={person} />
          </div>
        )
      }

      <ActivifyDetailSettingModal />

    </>
  )
}