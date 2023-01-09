import { DeleteOutlined } from '@ant-design/icons';
import { Card, Row } from 'antd';
import { createRef, MouseEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import DeleteModal from '../../../../common/components/DeleteModal';
import { dateFormatter } from '../../../../common/utils';
import { Activity } from '../activityInterface';
import { useDeleteActivityMutation, useGetAllActivityQuery } from '../activityService';

export default function ActivifyCard({ activity }: { activity: Activity }) {
  const [deleteActivity] = useDeleteActivityMutation()
  const { refetch } = useGetAllActivityQuery()
  const history = useHistory()
  const deleteBtnRef = createRef<HTMLSpanElement>()
  const [visible, setVisible] = useState(false)

  const onDelete = async (activity: Activity) => {
    setVisible(true)
  }

  const onDeleteCancel = () => {
    setVisible(false)
  }

  const onDeleteAttempt = async () => {
    await deleteActivity(activity.id)
    await refetch()
    setVisible(false)
  }


  const cardClick = (e: MouseEvent<HTMLDivElement>) => {
    if (
      e.target === deleteBtnRef.current ||
      e.target === deleteBtnRef.current?.children[0] ||
      e.target === deleteBtnRef.current?.children[0].children[0]) {
      return;
    }
    history.push('/detail/' + activity.id)
  }

  return (
    <>
      <Card onClick={cardClick} style={{ cursor: 'pointer' }}>
        <h1>{activity.title}</h1>
        <Row justify={'space-between'} style={{ marginTop: '7rem' }}>
          <p>{dateFormatter(activity.created_at)}</p>
          <DeleteOutlined ref={deleteBtnRef} onClick={() => onDelete(activity)} />
        </Row>
      </Card>
      <DeleteModal subject='activity' title={activity.title} visible={visible} onCancel={onDeleteCancel} onOk={onDeleteAttempt} />
    </>
  )
}