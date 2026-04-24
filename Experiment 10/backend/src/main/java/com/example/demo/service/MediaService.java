package com.example.demo.service;

import java.time.Instant;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.model.MediaMetadata;
import com.example.demo.repository.MediaMetadataRepository;

import software.amazon.awssdk.core.ResponseInputStream;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.GetObjectRequest;
import software.amazon.awssdk.services.s3.model.GetObjectResponse;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

@Service
public class MediaService {

	private static final Logger logger = LoggerFactory.getLogger(MediaService.class);
	
	@Autowired
    private S3Client s3Client;
	
	@Autowired
    private MediaMetadataRepository repository;

    @Value("${minio.bucket}")
    private String bucket;

    
    public Page<MediaMetadata> getPaginatedMedia(int page, int size, String sortBy, boolean descending) {
        Sort sort = descending ? Sort.by(sortBy).descending() : Sort.by(sortBy).ascending();
        Pageable pageable = PageRequest.of(page, size, sort);
        return repository.findAll(pageable);
    }
    

    public String uploadFile(MultipartFile file) throws Exception {
        // Save metadata
        MediaMetadata metadata = new MediaMetadata();
        metadata.setFilename(file.getOriginalFilename());
        metadata.setContentType(file.getContentType());
        metadata.setSize(file.getSize());
        metadata.setUploadedAt(Instant.now());
        metadata = repository.save(metadata);

        String key = metadata.getId(); // Use metadata ID as the file key

        // Upload the file in one go
        s3Client.putObject(
                PutObjectRequest.builder()
                        .bucket(bucket)
                        .key(key)
                        .contentType(file.getContentType())
                        .build(),
                software.amazon.awssdk.core.sync.RequestBody.fromInputStream(file.getInputStream(), file.getSize())
        );

        return key;
    }

    
    public ResponseEntity<Resource> download(String id) {
        Optional<MediaMetadata> optionalMeta = repository.findById(id); 
        if (!optionalMeta.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        MediaMetadata meta = optionalMeta.get();
        ResponseInputStream<GetObjectResponse> object = s3Client.getObject(GetObjectRequest.builder()
                .bucket(bucket)
                .key(id) // Ensure this is correct
                .build());

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(meta.getContentType()))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + meta.getFilename() + "\"")
                .body(new InputStreamResource(object));
    }

      
           

    public ResponseEntity<Resource> stream(String id, String rangeHeader) {
        Optional<MediaMetadata> optionalMeta = repository.findById(id);
        if (!optionalMeta.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        MediaMetadata meta = optionalMeta.get();
        String contentType = meta.getContentType();
        long fileSize = meta.getSize();

        GetObjectRequest.Builder requestBuilder = GetObjectRequest.builder()
                .bucket(bucket)
                .key(id);

        long start = 0;
        long end = fileSize - 1;

        boolean isPartial = false;

        if (rangeHeader != null && rangeHeader.startsWith("bytes=")) {
            isPartial = true;
            String[] ranges = rangeHeader.replace("bytes=", "").split("-");
            try {
                start = Long.parseLong(ranges[0]);
                if (ranges.length > 1 && !ranges[1].isEmpty()) {
                    end = Long.parseLong(ranges[1]);
                }
            } catch (NumberFormatException e) {
                return ResponseEntity.status(HttpStatus.REQUESTED_RANGE_NOT_SATISFIABLE).build();
            }

            requestBuilder.range("bytes=" + start + "-" + end);
        }

        ResponseInputStream<GetObjectResponse> objectStream = s3Client.getObject(requestBuilder.build());
        long contentLength = end - start + 1;

        HttpHeaders headers = new HttpHeaders();
        headers.set("Accept-Ranges", "bytes");
        headers.setContentType(MediaType.parseMediaType(contentType));
        headers.setContentLength(contentLength);
        headers.set("Content-Disposition", "inline; filename=\"" + meta.getFilename() + "\"");

        if (isPartial) {
            headers.set("Content-Range", String.format("bytes %d-%d/%d", start, end, fileSize));
            return ResponseEntity.status(HttpStatus.PARTIAL_CONTENT)
                    .headers(headers)
                    .body(new InputStreamResource(objectStream));
        }

        return ResponseEntity.status(HttpStatus.OK)
                .headers(headers)
                .body(new InputStreamResource(objectStream));
    }

    
    
    public void deleteMediaById(String id) throws Exception {
        Optional<MediaMetadata> optionalMeta = repository.findById(id);
        if (!optionalMeta.isPresent()) {
            throw new Exception("Media with id " + id + " not found");
        }

        // Delete from S3 bucket
        try {
            s3Client.deleteObject(builder -> builder.bucket(bucket).key(id).build());
        } catch (Exception e) {
            throw new Exception("Failed to delete file from storage: " + e.getMessage());
        }

        // Delete metadata from DB
        repository.deleteById(id);
    }

    
}
