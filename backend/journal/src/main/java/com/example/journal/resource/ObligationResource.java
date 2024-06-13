package com.example.journal.resource;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.journal.domain.Obligation;
import com.example.journal.service.ObligationService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/obligations")
@RequiredArgsConstructor
public class ObligationResource {

	@Autowired
	private ObligationService obligationService;

	@GetMapping("/{id}")
	public ResponseEntity<Obligation> getObligation(@PathVariable(value = "id") String id) {
		Obligation obligation = obligationService.getObligation(id);
		return ResponseEntity.ok().body(obligation);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<String> deleteObligation(@PathVariable(value = "id") String id) {

		Obligation obligation = obligationService.getObligation(id);
		if (obligation != null) {
			obligationService.deleteObligation(obligation);
			return ResponseEntity.noContent().build();
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Obligation not found");
		}
	}

	@PostMapping("/{id}")
	public ResponseEntity<Obligation> updateObligation(@PathVariable String id,
			@RequestBody Obligation updatedObligation) {
		try {
			Obligation obligation = obligationService.updateObligation(id, updatedObligation);
			return ResponseEntity.ok(obligation);
		} catch (RuntimeException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		}
	}

	@GetMapping("/customers/{customerId}/obligations")
	public ResponseEntity<List<Obligation>> getAllObligationsByCustomerId(
			@PathVariable(value = "customerId") Long customerId) {
		List<Obligation> obligations = obligationService.getAllObligationsByCustomerId(customerId);
		return ResponseEntity.ok().body(obligations);
	}

	@PostMapping("/customers/{customerId}/obligations")
	public ResponseEntity<Obligation> createObligationForCustomer(@PathVariable(value = "customerId") Long customerId,
			@RequestBody Obligation obligationRequest) {
		Obligation obligation = obligationService.createObligationForCustomer(customerId, obligationRequest);
		return ResponseEntity.status(HttpStatus.CREATED).body(obligation);
	}
}
