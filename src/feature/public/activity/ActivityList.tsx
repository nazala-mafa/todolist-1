import { Row, Col, Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { useCreateActivifyMutation, useGetAllActivityQuery } from './activityService'
import ActivifyCard from './components/ActivityCard'
import { NewActivityRequest } from './activityInterface'
import { base_email } from '../../../app/config'
import { useEffect } from 'react'
import person from './components/assets/person.svg'

export default function ActivityList() {
  const { data: activities, error, isLoading, refetch } = useGetAllActivityQuery()
  const [createActivity, { isLoading: createActivityLoading }] = useCreateActivifyMutation()

  const addNewActivityAttempt = async () => {
    const activity: NewActivityRequest = {
      email: base_email,
      title: 'New Activity'
    }

    await createActivity(activity)
    await refetch()
  }

  useEffect(() => {
    window.document.title = 'To Do List - Dashboard'
  }, [])

  return (
    <>
      <Row justify={'space-between'} style={{ marginBottom: '1rem' }}>
        <h1 data-cy="activity-title" className='content-title'>Activity</h1>
        <Button data-cy="activity-add-button" onClick={addNewActivityAttempt} icon={<PlusOutlined />} type='primary' shape={'round'} size="large">Tambah</Button>
      </Row>
      {
        error ? (
          <>Error Attempt ...</>
        ) :
          (isLoading || createActivityLoading) ? (
            <>Loading ...</>
          ) :
            activities?.length ?
              <Row gutter={[16, 16]}>
                {
                  activities.map((activity, idx) => (
                    <Col xl={6} key={activity.id} data-cy={`activity-${idx}`}>
                      <ActivifyCard activity={activity} />
                    </Col>
                  ))
                }
              </Row>
              : <div data-cy="activity-empty-state" style={{ display: 'flex', justifyContent: 'center' }}>
                <Col><img width={'100%'} src={person} /></Col>
              </div>
      }
    </>
  )
}