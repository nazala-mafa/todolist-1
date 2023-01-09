import { Form, Input, Modal, Select } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { TodoPriorityStatus } from "../../todo/components/TodoPriorityStatus";
import { useCreateTodoMutation, useUpdateTodoMutation } from "../../todo/todoService";
import { hideModal, useGetDetailActivityQuery } from "../activityService";

export default function ActivifyDetailSettingModal() {
  const [form] = Form.useForm()
  const dispatch = useAppDispatch()
  const { visible, title, formState, type } = useAppSelector(state => state.activitySettingModal)
  const { activity_id } = useParams<{ activity_id: string }>()
  const { refetch } = useGetDetailActivityQuery({ id: parseInt(activity_id) })
  const [createTodo] = useCreateTodoMutation()
  const [updateTodo] = useUpdateTodoMutation()
  const [isFormValidated, setIsFormValidated] = useState(false)

  const formChange = () => {
    form.validateFields()
      .then(() => {
        setIsFormValidated(true)
      })
      .catch(() => {
        setIsFormValidated(false)
      })
  }

  const modalOk = async () => {
    if (type == 'create') {
      await createTodo({
        ...form.getFieldsValue(),
        activity_group_id: activity_id
      })
    } else if (formState && formState.id && type == 'edit') {
      await updateTodo({
        todo_id: formState.id,
        body: {
          ...form.getFieldsValue(),
          activity_group_id: activity_id
        }
      })
    }
    await refetch()
    dispatch(hideModal())
    form.resetFields()
  }

  const modalCancel = () => {
    dispatch(hideModal())
    form.resetFields()
  }

  useEffect(() => {
    form.setFieldsValue(formState)
    type == 'edit' && formChange()
  }, [visible])

  return (
    <Modal forceRender open={visible} onOk={modalOk} onCancel={modalCancel} title={title} okButtonProps={{ disabled: !isFormValidated }}>
      <Form layout='vertical' form={form} onChange={formChange}>
        <Form.Item label="NAMA LIST ITEM" name={'title'} rules={[{ required: true, message: 'Nama List Item Tidak Boleh Kosong' }]}>
          <Input placeholder='Tambahkan Nama Activity' />
        </Form.Item>
        <Form.Item label="PRIORITY" name={'priority'} rules={[{ required: true, message: 'Priority Tidak Boleh Kosong' }]}>
          <Select onChange={formChange}>
            {todoPriorityOptions.map(opt => (
              <Select.Option value={opt.value} key={opt.value}>
                <TodoPriorityStatus status={opt.value} /> <span>{opt.label}</span>
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  )
}

const todoPriorityOptions = [
  {
    value: 'very-high',
    label: 'Very High',
    color: '#dc3545'
  }, {
    value: 'high',
    label: 'High',
    color: '#fd7e14'
  }, {
    value: 'normal',
    label: 'Medium',
    color: '#198754'
  }, {
    value: 'low',
    label: 'Low',
    color: '#0d6efd'
  }, {
    value: 'very-low',
    label: 'Very Low',
    color: '#6f42c1'
  }
]