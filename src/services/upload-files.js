import http from "../http-common";

class UploadFilesService {
  upload(file, UploadProgress) {
    let formData = new FormData();


    formData.append("file", file);
    formData.append("user", "user")
    return http.post("/api/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      UploadProgress,
    });
  }
}

export default new UploadFilesService();
