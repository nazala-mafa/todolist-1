import { Button, Modal, Row } from "antd";
import warningIcon from './assets/warning-icon.svg'

export function dateFormatter(string_date: string) {
  const bulan = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
  const date = new Date(string_date);
  return `${date.getDay()} ${bulan[date.getMonth()]} ${date.getFullYear()}`
}