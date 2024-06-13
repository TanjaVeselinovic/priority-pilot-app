package com.example.journal.resource;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.journal.domain.Customer;
import com.example.journal.service.CustomerService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping(path = "/customers")
@RequiredArgsConstructor
public class CustomerResource {

	@Autowired
	private CustomerService customerService;

	@GetMapping("/all")
	public List<Customer> getCustomers() {
		return customerService.getCustomers();
	}

	@GetMapping("/get")
	public Customer getCustomer(@RequestParam String email, @RequestParam String password) {
		return customerService.getCustomer(email, password);
	}

	@PostMapping("/add")
	ResponseEntity<Customer> addCustomer(@RequestBody Customer customer) {
		return ResponseEntity.ok().body(customerService.addNewCustomer(customer));
	}
}
