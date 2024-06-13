package com.example.journal.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.journal.domain.Customer;
import com.example.journal.repo.CustomerRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@Transactional(rollbackOn = Exception.class)
@RequiredArgsConstructor
public class CustomerService {

	@Autowired
	private CustomerRepository customerRepository;

	public List<Customer> getCustomers() {
		return customerRepository.findAll();
	}

	public Customer getCustomer(String email, String password) {
		Optional<Customer> customerOptional = customerRepository.findCustomerByEmail(email);
		if (customerOptional.isPresent()) {
			if (!customerOptional.get().getPassword().equals(password)) {
				throw new IllegalStateException("Password is not correct for email: " + email);
			}
		} else {
			throw new IllegalStateException("Email: " + email + " is not present");
		}
		return customerOptional.get();
	}

	public Customer addNewCustomer(Customer customer) {
		Optional<Customer> customerOptional = customerRepository.findCustomerByEmail(customer.getEmail());
		if (customerOptional.isPresent()) {
			throw new IllegalStateException("Email already taken");
		}
		return customerRepository.save(customer);
	}

}
