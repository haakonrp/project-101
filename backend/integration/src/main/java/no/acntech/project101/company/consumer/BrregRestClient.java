package no.acntech.project101.company.consumer;

import java.net.URI;
import java.util.List;

import no.acntech.project101.company.model.Person;
import no.acntech.project101.company.model.MemberList;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import no.acntech.project101.company.model.BrregRespons;

@Component
public class BrregRestClient {

    private final RestTemplate restTemplate;

    private final String urlName = "https://webapi.no/api/v1/brreg/{orgnr}";
    private final String urlMembers = "https://webapi.no/api/v1/brreg/{orgnr}/roles";

    public BrregRestClient(final RestTemplateBuilder restTemplateBuilder) {
        this.restTemplate = restTemplateBuilder.build();
    }

    public String lookupOrganizationName(final String organisasjonsnummer) {
        final URI uri = UriComponentsBuilder
                .fromUriString(urlName)
                .buildAndExpand(organisasjonsnummer)
                .toUri();

        final BrregRespons brregRespons = restTemplate.getForEntity(uri, BrregRespons.class).getBody();
        return brregRespons.getData().getName();
    }

    public List<Person> lookupOrganizationMembers(final String organisasjonsnummer) {
        final URI uri = UriComponentsBuilder
                .fromUriString(urlMembers)
                .buildAndExpand(organisasjonsnummer)
                .toUri();

        final MemberList response = restTemplate.getForEntity(uri, MemberList.class).getBody();
        return response.getData();
    }
}
