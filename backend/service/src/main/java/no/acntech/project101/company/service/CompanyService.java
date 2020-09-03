package no.acntech.project101.company.service;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import no.acntech.project101.company.model.Person;
import no.acntech.project101.employee.Employee;
import no.acntech.project101.employee.service.EmployeeService;
import org.springframework.stereotype.Service;

import no.acntech.project101.company.Company;
import no.acntech.project101.company.consumer.BrregRestClient;
import no.acntech.project101.company.repository.CompanyRepository;

@Service
public class CompanyService {

    private final CompanyRepository companyRepository;
    private final BrregRestClient brregRestClient;
    private final EmployeeService employeeService;

    public CompanyService(final CompanyRepository companyRepository,
                          final BrregRestClient brregRestClient,
                          final EmployeeService employeeService) {
        this.companyRepository = companyRepository;
        this.brregRestClient = brregRestClient;
        this.employeeService = employeeService;
    }

    public Company save(Company company) {
        return companyRepository.save(company);
    }

    public Company save(final String organizationNumber) {
        final String organizationName = brregRestClient.lookupOrganizationName(organizationNumber);
        final List<Person> orgMembers = brregRestClient.lookupOrganizationMembers(organizationNumber);

        final Company company = new Company(organizationName, organizationNumber);
        final Company savedCompany = save(company);

        for (int i = 0; i < orgMembers.size(); i++) {
            final Person p = orgMembers.get(i);
            final int idx = p.getPerson().lastIndexOf(' ');

            final String firstName = p.getPerson().substring(0, idx);
            final String lastName = p.getPerson().substring(idx + 1);
            final LocalDate dateOfBirth = LocalDate.of(1996, 04, 03); // TODO: fetch DOB externally

            final Employee e = new Employee(firstName, lastName, dateOfBirth);
            e.setCompany(savedCompany);
            employeeService.save(e);
        }

        return savedCompany;
    }

    public List<Company> findAll() {
        return companyRepository.findAll();
    }

    public Optional<Company> findById(Long id) {
        return companyRepository.findById(id);
    }

    public void delete(Long id) {
        if (companyRepository.existsById(id)) {
            companyRepository.deleteById(id);
        }
    }
}
