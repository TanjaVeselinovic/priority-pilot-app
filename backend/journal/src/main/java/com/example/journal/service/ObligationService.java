package com.example.journal.service;

import org.springframework.stereotype.Service;

import com.example.journal.domain.Obligation;
import com.example.journal.repo.CustomerRepository;
import com.example.journal.repo.ObligationRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

@Service
@Transactional(rollbackOn = Exception.class)
@RequiredArgsConstructor
public class ObligationService {

	@Autowired
	private ObligationRepository obligationRepository;

	@Autowired
	private CustomerRepository customerRepository;

	public Obligation getObligation(String id) {
		return obligationRepository.findById(id).orElseThrow(() -> new RuntimeException("Obligation not found"));
	}

	public void deleteObligation(Obligation obligation) {
		obligationRepository.delete(obligation);
	}

	public Obligation updateObligation(String id, Obligation updatedObligation) {
		return obligationRepository.findById(id).map(obligation -> {
			obligation.setTitle(updatedObligation.getTitle());
			obligation.setDescription(updatedObligation.getDescription());
			obligation.setDue(updatedObligation.getDue());
			obligation.setPriority(updatedObligation.getPriority());
			return obligationRepository.save(obligation);
		}).orElseThrow(() -> new RuntimeException("Obligation not found with id " + id));
	}

	public List<Obligation> getAllObligationsByCustomerId(Long customerlId) {

		return obligationRepository.findByCustomerId(customerlId);
	}

	public Obligation createObligationForCustomer(Long customerId, Obligation obligationRequest) {
		return customerRepository.findById(customerId).map(customer -> {
			obligationRequest.setCustomer(customer);
			return obligationRepository.save(obligationRequest);
		}).orElseThrow(() -> new RuntimeException("Obligation is not created"));
	}
}
