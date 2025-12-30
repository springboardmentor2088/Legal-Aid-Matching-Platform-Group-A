package com.example.demo.controller;

import com.example.demo.entity.DirectoryEntry;
import com.example.demo.service.DirectoryService;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/directory")
@CrossOrigin(origins = "http://localhost:5173")
public class DirectoryController {

    private final DirectoryService directoryService;

    public DirectoryController(DirectoryService directoryService) {
        this.directoryService = directoryService;
    }

    // GET
    // /api/directory/search?type=LAWYER&name=...&state=...&district=...&specialization=...&page=0&size=10
    @GetMapping("/search")
    public Page<DirectoryEntry> search(
            @RequestParam(name = "type", required = false) String type,
            @RequestParam(name = "name", required = false) String name,
            @RequestParam(name = "state", required = false) String state,
            @RequestParam(name = "district", required = false) String district,
            @RequestParam(name = "specialization", required = false) String specialization,
            @RequestParam(name = "minExperience", required = false) Integer minExperience,
            @RequestParam(name = "page", defaultValue = "0") int page,
            @RequestParam(name = "size", defaultValue = "10") int size) {
        return directoryService.search(type, name, state, district, specialization, minExperience, page, size);
    }

    // GET /api/directory/{id}
    @GetMapping("/{id}")
    public DirectoryEntry getById(@PathVariable("id") Long id) {
        return directoryService.getById(id);
    }
}
