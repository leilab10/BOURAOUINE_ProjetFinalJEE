package com.example.demo.web;
import com.example.demo.entities.Bill;
import com.example.demo.feign.CustomerRestClient;
import com.example.demo.feign.ProductItemRestClient;
import com.example.demo.model.Customer;
import com.example.demo.model.Product;
import com.example.demo.repositories.BillRepository;
import com.example.demo.repositories.ProductItemRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class BillingRestController {
    private BillRepository billRepository;
    private ProductItemRepository productItemRepository;
    private CustomerRestClient customerRestClient;
    private ProductItemRestClient productItemRestClient;

    public BillingRestController(BillRepository billRepository, ProductItemRepository productItemRepository, CustomerRestClient customerRestClient, ProductItemRestClient productItemRestClient) {
        this.billRepository = billRepository;
        this.productItemRepository = productItemRepository;
        this.customerRestClient = customerRestClient;
        this.productItemRestClient = productItemRestClient;
    }


    @GetMapping(path = "/bills/full/{id}")
    public Bill getBill(@PathVariable Long id){
        Bill bill=billRepository.findById(id).get();
        Customer customer=customerRestClient.getCustomerById(bill.getCustomerID());
        bill.setCustomer(customer);
        bill.getProductItems().forEach(pi -> {
            Product product=productItemRestClient.getProductById(pi.getProductID());
            // pi.setProduct(product);
            pi.setProductName(product.getName());
        });

        return bill;
    }
}

