package com.example.demo.repository;

import com.example.demo.entity.DirectoryEntry;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface DirectoryEntryRepository extends JpaRepository<DirectoryEntry, Long> {

  @Query("""
      SELECT d FROM DirectoryEntry d
      WHERE (:type IS NULL OR d.type = :type)
        AND (:state IS NULL OR d.state = :state)
        AND (:district IS NULL OR d.district = :district)
        AND (:specialization IS NULL OR d.specialization = :specialization)
        AND (d.approved = true)
        AND (:minExperience IS NULL OR d.experienceYears >= :minExperience)
      """)
  Page<DirectoryEntry> searchDirectory(
      @Param("type") String type,
      @Param("state") String state,
      @Param("district") String district,
      @Param("specialization") String specialization,
      @Param("minExperience") Integer minExperience,
      Pageable pageable);

  // Find entry to sync updates
  DirectoryEntry findByTypeAndRegistrationNumber(String type, String registrationNumber);

  DirectoryEntry findByTypeAndBarCouncilId(String type, String barCouncilId);

  // for lawyer verification: directory has LAWYER entries with barCouncilId
  boolean existsByTypeAndBarCouncilId(String type, String barCouncilId);

  // for NGO verification: directory has NGO entries with registrationNumber
  boolean existsByTypeAndRegistrationNumber(String type, String registrationNumber);
}
