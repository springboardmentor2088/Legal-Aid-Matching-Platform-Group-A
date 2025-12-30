package com.example.demo.repository;

import com.example.demo.entity.Lawyer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LawyerRepository extends JpaRepository<Lawyer, Integer> {

    // already existing (KEEP THESE)
    boolean existsByEmail(String email);
    boolean existsByAadharNum(String aadharNum);
    boolean existsByBarCouncilId(String barCouncilId);
    Lawyer findByEmail(String email);

    // for verification-based filtering
    List<Lawyer> findByVerificationStatusTrue();

    // ✅ existing for directory search
    List<Lawyer> findByCity(String city);

    List<Lawyer> findBySpecialization(String specialization);

    List<Lawyer> findByCityAndSpecialization(String city, String specialization);
}
