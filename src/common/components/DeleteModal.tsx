import { Button, Modal, Row } from "antd";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../app/hooks";
import warningIcon from '../assets/warning-icon.svg'
import { utilSlice } from "../utiltService";

type DeleteModalProps = {
  visible: boolean,
  subject: string,
  title: string,
  onOk: () => void,
  onCancel: () => void
}

export default function DeleteModal({ visible, subject, title, onOk, onCancel }: DeleteModalProps) {
  const _onOk = () => {
    onOk()
    Modal.info({ content: `${subject} berhasil dihapus`, footer: null, maskClosable: true, style: { marginTop: '30vh' } })
  }

  const _onCancel = () => {
    onCancel()
  }

  return (
    <Modal open={visible} footer={null} closable={false}>
      <div style={{ textAlign: 'center' }} data-cy={'modal-delete'}>
        <div>
          <img src={warningIcon} />
        </div>
        <div style={{ margin: '1.5rem 0' }}>
          <div>Apakah anda yakin menghapus {subject}</div>
          <div><b>“{title}”</b>?</div>
        </div>
        <Row justify={'center'} style={{ gap: '1rem' }} >
          <Button onClick={_onCancel}>Batal</Button>
          <Button onClick={_onOk} type={'primary'} color="#f00" danger>Hapus</Button>
        </Row >
      </div>
    </Modal>
  )
}