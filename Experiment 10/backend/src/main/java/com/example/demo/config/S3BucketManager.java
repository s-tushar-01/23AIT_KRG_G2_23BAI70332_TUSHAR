package com.example.demo.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

import jakarta.annotation.PostConstruct;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.CreateBucketRequest;
import software.amazon.awssdk.services.s3.model.HeadBucketRequest;
import software.amazon.awssdk.services.s3.model.NoSuchBucketException;

@Configuration
public class S3BucketManager {

	@Autowired
	private S3Client s3Client;
	
	@Value("${minio.bucket}")
	private String bucketName;
	
	
	@PostConstruct
	public void createBucketIfNotExist() {
		try {
			s3Client.headBucket(HeadBucketRequest.builder().bucket(bucketName).build());
		}
		catch (NoSuchBucketException e) {
			createBucket(bucketName);
			System.out.println(e);
		}
	}
	
	
	private void createBucket(String bucketName) {
		s3Client.createBucket(CreateBucketRequest.builder()
				.bucket(bucketName)
				.build());
	}
	
}
