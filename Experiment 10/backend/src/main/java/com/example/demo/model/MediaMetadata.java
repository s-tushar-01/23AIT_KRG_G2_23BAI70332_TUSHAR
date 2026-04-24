package com.example.demo.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

@Document(collection = "media")
public class MediaMetadata {

	@Id
	private String id;
	private String filename;
	private String contentType;
	private long size;
	private Instant uploadedAt;

	public MediaMetadata() {
		
	}

	public MediaMetadata(String filename, String contentType, long size, Instant uploadedAt) {
		this.filename = filename;
		this.contentType = contentType;
		this.size = size;
		this.uploadedAt = uploadedAt;
	}

	// Getters and Setters

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getFilename() {
		return filename;
	}

	public void setFilename(String filename) {
		this.filename = filename;
	}

	public String getContentType() {
		return contentType;
	}

	public void setContentType(String contentType) {
		this.contentType = contentType;
	}

	public long getSize() {
		return size;
	}

	public void setSize(long size) {
		this.size = size;
	}

	public Instant getUploadedAt() {
		return uploadedAt;
	}

	public void setUploadedAt(Instant uploadedAt) {
		this.uploadedAt = uploadedAt;
	}
}