package no.acntech.project101.company.model;

import java.util.ArrayList;
import java.util.List;

public class MemberList {

    private List<Person> data;

    public MemberList() {
        this.data = new ArrayList<>();
    }

    public List<Person> getData() {
        return data;
    }

    public void setData(List<Person> data) {
        this.data = data;
    }
}
