package com.example.journal.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.journal.domain.Customer;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {

	@Query("SELECT customer FROM Customer customer WHERE customer.email = ?1")
	Optional<Customer> findCustomerByEmail(String email);
}
