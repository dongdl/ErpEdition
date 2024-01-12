import { Component } from '@angular/core'
import { formatBytes, formatDate } from '../../utils/helper'

interface fileItem {
  id: number
  fileName: string
  dateCreated: string
  fileSize: string
  fileType: string
}

@Component({
  selector: 'app-upload-file-list',
  standalone: true,
  imports: [],
  templateUrl: './upload-file-list.component.html',
  styleUrl: './upload-file-list.component.css'
})
export class UploadFileListComponent {
  tableHeader: { key: keyof fileItem; name: string; width?: string }[] = [
    { key: 'fileName', name: 'Tên', width: '20%' },
    { key: 'fileType', name: 'Loại', width: '10%' },
    { key: 'fileSize', name: 'Dung lượng', width: '100px' },
    { key: 'dateCreated', name: 'Thời gian', width: '180px' }
  ]
  fileList: fileItem[] = []
  allowedFile = '.xls,.xlsx,.rar,.zip,.csv,.doc,.docx,.pdf,.txt,.msg'

  onAddFile() {}

  onChangeFile(event: Event) {
    const input = event.target as HTMLInputElement
    const fileList = Array.from(input?.files || [])
    const addedFile: fileItem[] = fileList.map((file, idx) => ({
      id: Date.now() + idx,
      dateCreated: formatDate(new Date()),
      fileName: file.name,
      fileSize: formatBytes(file.size),
      fileType: file?.name?.split('.')?.[1] || ''
    }))
    this.fileList.unshift(...addedFile)
  }

  removeFile(id: number) {
    const index = this.fileList.findIndex((x) => x.id === id)
    if (index === -1) return
    this.fileList.splice(index, 1)
  }
}
