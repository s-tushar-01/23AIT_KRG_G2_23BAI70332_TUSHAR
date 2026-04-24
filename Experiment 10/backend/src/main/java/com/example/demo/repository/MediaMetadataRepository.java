package com.example.demo.repository;


import com.example.demo.model.MediaMetadata;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;


public interface MediaMetadataRepository extends MongoRepository<MediaMetadata, String>{
	
	Optional<MediaMetadata> findByFilename(String filename);
}
