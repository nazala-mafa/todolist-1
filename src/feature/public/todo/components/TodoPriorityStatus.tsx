import { Badge } from "antd";
import { CSSProperties } from "react";


const style: CSSProperties = {
  width: '1rem',
  height: '1rem',
  display: 'inline-block',
  borderRadius: '1rem',
  position: 'relative',
  top: 3,
}

export function TodoPriorityStatus({ status }: { status: string }) {
  switch (status) {
    case 'very-high':
      return <div style={{ ...style, backgroundColor: '#ED4C5C' }}></div>
    case 'high':
      return <div style={{ ...style, backgroundColor: '#F8A541' }}></div>
    case 'normal':
      return <div style={{ ...style, backgroundColor: '#00A790' }}></div>
    case 'low':
      return <div style={{ ...style, backgroundColor: '#428BC1' }}></div>
    case 'very-low':
      return <div style={{ ...style, backgroundColor: '#8942C1' }}></div>
    default:
      return <div style={{ ...style, backgroundColor: '#000' }}></div>
  }

}
