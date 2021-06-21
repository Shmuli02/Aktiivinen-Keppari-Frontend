import axios from 'axios'
const baseUrl = '/api/upload'

class UploadFiles {
  upload(file, uploadProgress) {
    let formData = new FormData()

    formData.append("file", file)

    return 
  }
}
const create = async fileObject => {
  const response = await axios.post(baseUrl, fileObject)
  return response.data
}

export default {create}