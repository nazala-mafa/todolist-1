import { Button, Dropdown, MenuProps, Row, Space } from "antd";
import sortIcon from './assets/sort.svg';
import terbaruIcon from './assets/terbaru.svg';
import terlamaIcon from './assets/terlama.svg';
import abcIcon from './assets/abc.svg';
import cbaIcon from './assets/cba.svg';
import belumSelesaiIcon from './assets/belum-selesai.svg';
import checkIcon from './assets/check.svg';
import { activityApi } from "../../activity/activityService";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { todoSortSlice } from "../todoService";
import { useSelector } from "react-redux";

export default function TodoSortButton() {
  return (
    <Dropdown
      menu={{ items }} trigger={['click']}>
      <a onClick={(e) => e.preventDefault()}>
        <Space>
          <Button shape="circle" size="large" icon={<img src={sortIcon} />}></Button>
        </Space>
      </a>
    </Dropdown>
  )
}

const items: MenuProps['items'] = [
  {
    key: 'terbaru',
    label: <MenuItems type="terbaru" />
  },
  {
    key: 'terlama',
    label: <MenuItems type="terlama" />
  },
  {
    key: 'abc',
    label: <MenuItems type="abc" />
  },
  {
    key: 'cba',
    label: <MenuItems type="cba" />
  },
  {
    key: 'belumSelesai',
    label: <MenuItems type="belumSelesai" />
  },
]

function MenuItems({ type }: { type: string }) {
  const dispatch = useAppDispatch()
  const { activity_id } = useParams<{ activity_id: string }>()
  const sort = activityApi.util.updateQueryData('getDetailActivity', { id: parseInt(activity_id) }, (detail) => {
    if (type == 'terlama') {
      detail.todo_items.sort((a, b) => {
        if (a.id < b.id) return -1;
        if (a.id > b.id) return 1;
        return 0;
      })
    }
    if (type == 'terbaru') {
      detail.todo_items.sort((a, b) => {
        if (a.id > b.id) return -1;
        if (a.id < b.id) return 1;
        return 0;
      })
    }
    if (type == 'abc') {
      detail.todo_items.sort((a, b) => {
        if (a.title < b.title) return -1;
        if (a.title > b.title) return 1;
        return 0;
      })
    }
    if (type == 'cba') {
      detail.todo_items.sort((a, b) => {
        if (a.title > b.title) return -1;
        if (a.title < b.title) return 1;
        return 0;
      })
    }
    if (type == 'belumSelesai') {
      detail.todo_items.sort((a, b) => {
        if (a.is_active > b.is_active) return -1;
        if (a.is_active < b.is_active) return 1;
        return 0;
      })
    }
  })
  const activeSort = useAppSelector(state => state.todoSort.sort)

  const onClick = () => {
    dispatch(sort)
    dispatch(todoSortSlice.actions.setSort(type))
  }

  let icon = '';
  let label = '';
  switch (type) {
    case 'terbaru':
      icon = terbaruIcon;
      label = 'Terbaru';
      break;
    case 'terlama':
      icon = terlamaIcon;
      label = 'Terlama';
      break;
    case 'abc':
      icon = abcIcon;
      label = 'A-Z'
      break;
    case 'cba':
      icon = cbaIcon;
      label = 'Z-A'
      break;
    case 'belumSelesai':
      icon = belumSelesaiIcon;
      label = 'Belum Selesai';
      break;
  }

  return (
    <Row justify={'space-between'} style={{ gap: '1rem' }} onClick={onClick}>
      <Row style={{ gap: '1rem' }}>
        <img src={icon} />
        <span>{label}</span>
      </Row>
      {(activeSort === type) ? <img src={checkIcon} /> : null}
    </Row>
  )
}