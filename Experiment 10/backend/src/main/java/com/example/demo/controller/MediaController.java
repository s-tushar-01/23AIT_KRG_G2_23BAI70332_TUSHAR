package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.model.MediaMetadata;
import com.example.demo.service.MediaService;

@RestController
@RequestMapping("/api")
public class MediaController {

	@Autowired
	private MediaService service;

	
	@GetMapping("/media")
	public ResponseEntity<Page<MediaMetadata>> getMediaPaginated(
	        @RequestParam(defaultValue = "0") int page,
	        @RequestParam(defaultValue = "4") int size,
	        @RequestParam(defaultValue = "uploadedAt") String sortBy,
	        @RequestParam(defaultValue = "true") boolean desc) {

	    Page<MediaMetadata> result = service.getPaginatedMedia(page, size, sortBy, desc);
	    return ResponseEntity.ok(result);
	}
	
	
	@PostMapping("/upload")
	public ResponseEntity<String> upload(@RequestParam MultipartFile file) throws Exception {
		return ResponseEntity.ok(service.uploadFile(file));
	}

	@GetMapping("/download/{id}")
	public ResponseEntity<Resource> download(@PathVariable String id) {
		return service.download(id);
	}


	@GetMapping("/stream/{id}")
    public ResponseEntity<Resource> stream(@PathVariable String id, @RequestHeader(value = "Range", required = false) String range) {
        return service.stream(id, range);
    }
	
	
	@DeleteMapping("/media/{id}")
	public ResponseEntity<String> deleteMedia(@PathVariable String id) {
	    try {
	        service.deleteMediaById(id);
	        return ResponseEntity.ok("Deleted media with id: " + id);
	    } catch (Exception e) {
	        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
	    }
	}
}
