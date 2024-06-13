package com.example.journal.repo;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.journal.domain.Obligation;

@Repository
public interface ObligationRepository extends JpaRepository<Obligation, String> {

	Optional<Obligation> findById(String id);

	List<Obligation> findByCustomerId(Long postId);
}
