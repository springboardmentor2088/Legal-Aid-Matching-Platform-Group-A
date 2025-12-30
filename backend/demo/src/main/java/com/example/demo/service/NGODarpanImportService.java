package com.example.demo.service;

import com.example.demo.entity.DirectoryEntry;
import com.example.demo.repository.DirectoryEntryRepository;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

@Service
public class NGODarpanImportService {

    private final DirectoryEntryRepository directoryEntryRepository;

    public NGODarpanImportService(DirectoryEntryRepository directoryEntryRepository) {
        this.directoryEntryRepository = directoryEntryRepository;
    }

    /**
     * Import NGOs from a CSV file on the classpath.
     * Expected header:
     * registrationNumber,name,state,district,specialization,contactPhone
     */
    public void importCSV(String filename) {
        try {
            ClassPathResource resource = new ClassPathResource(filename);

            try (BufferedReader reader = new BufferedReader(
                    new InputStreamReader(resource.getInputStream(), StandardCharsets.UTF_8))) {

                String line;
                boolean first = true;

                while ((line = reader.readLine()) != null) {
                    // skip header
                    if (first) {
                        first = false;
                        continue;
                    }

                    if (line.isBlank()) {
                        continue;
                    }

                    String[] parts = line.split(",", -1); // keep empty columns

                    // Guard if the row is shorter than expected
                    if (parts.length < 6) {
                        continue;
                    }

                    String registrationNumber = parts[0].trim();
                    String name = parts[1].trim();
                    String state = parts[2].trim();
                    String district = parts[3].trim();
                    String specialization = parts[4].trim();
                    String contactPhone = parts[5].trim();

                    DirectoryEntry entry = new DirectoryEntry();
                    entry.setType("NGO");
                    entry.setSource("NGO_DARPAN");
                    entry.setRegistrationNumber(registrationNumber);
                    entry.setName(name);
                    entry.setState(state);
                    entry.setDistrict(district);
                    entry.setSpecialization(specialization);
                    entry.setContactPhone(contactPhone);

                    // Imported entries are verified but still need admin approval to show in
                    // citizen search
                    entry.setVerified(true);
                    entry.setApproved(false);

                    directoryEntryRepository.save(entry);
                }
            }
        } catch (Exception e) {
            throw new RuntimeException("Failed to import NGO Darpan CSV", e);
        }
    }
}
