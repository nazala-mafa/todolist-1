import { EditOutlined } from '@ant-design/icons';
import { Input, Row } from 'antd';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useGetAllActivityQuery, useGetDetailActivityQuery, useUpdateActivityTitleMutation } from '../activityService';
import backButton from './assets/back-button.svg';

export default function ActivityDetailTitle() {
  const { activity_id } = useParams<{ activity_id: string }>()
  const [isActiveEditActivityTitle, setIsActiveEditActivityTitle] = useState(false)
  const { data: activity, refetch } = useGetDetailActivityQuery({ id: parseInt(activity_id) })
  const { refetch: refetchAllActivity } = useGetAllActivityQuery()
  const [updateActivityTitle] = useUpdateActivityTitleMutation()

  const editActivityTitleAttempt = async (e: React.FocusEvent<HTMLInputElement, HTMLElement>) => {
    await updateActivityTitle({ id: parseInt(activity_id), title: e.target.value })
    await refetch()
    await refetchAllActivity()
    setIsActiveEditActivityTitle(false)
  }

  const editActivityTitle = () => {
    setIsActiveEditActivityTitle(true)
  }

  return (
    <>
      <Row>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Link to={'/'} data-cy="todo-back-button" className='back-button'>
            <img src={backButton} />
          </Link>
          {
            isActiveEditActivityTitle
              ? <Input autoFocus={isActiveEditActivityTitle} onBlur={editActivityTitleAttempt} defaultValue={activity?.title} />
              : <h1 data-cy={`todo-title`} onClick={editActivityTitle} className="content-title">{activity?.title}</h1>
          }
          <EditOutlined onClick={editActivityTitle} data-cy={`todo-title-edit-button`} />
        </div>
      </Row>
    </>
  )
}