# 🚀 Media Application (File Upload, Streaming & Management System)

<p align="center">
  <img src="https://img.shields.io/badge/SpringBoot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white"/>
  <img src="https://img.shields.io/badge/MinIO-S3%20Storage-red?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white"/>
  <img src="https://img.shields.io/badge/REST%20API-Backend-blue?style=for-the-badge"/>
</p>

<p align="center">
  <b>Scalable Media Management System with Upload, Download & Streaming</b><br/>
</p>

---

## ✨ Features
- Upload media files  
- Download with byte-range support  
- Video streaming  
- File listing with pagination  
- Delete media  
- Metadata management (MongoDB)  
- MinIO object storage  

---

## 🧠 Architecture
Client → Spring Boot → Service Layer → MinIO + MongoDB  

---

## 🛠️ Tech Stack
- Spring Boot  
- MinIO (S3)  
- MongoDB  
- REST APIs  

---

## ⚙️ Setup

```bash
git clone https://github.com/Aastha932/MediaApplication---23bai70432.git
cd MediaApplication---23bai70432
```

Run MinIO:
```bash
docker run -p 9000:9000 -p 9001:9001 \
  -e "MINIO_ROOT_USER=minio" \
  -e "MINIO_ROOT_PASSWORD=minio123" \
  minio/minio server /data --console-address ":9001"
```

Run app:
```bash
mvn spring-boot:run
```

---

## 🔌 API Endpoints
- POST /upload  
- GET /download/{id}  
- GET /stream/{id}  
- GET /files  
- DELETE /delete/{id}  

---

## 🚀 Future Enhancements
- Authentication  
- React frontend  
- Admin dashboard  
- Large file support  

---

## ⭐ Support
Give a ⭐ if you like the project!
