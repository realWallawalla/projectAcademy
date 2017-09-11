package main.domain;

import java.io.Serializable;

/**
 * Created by Administrator on 2017-09-06.
 */
public class Bar {
    public int id;
    public String adress;
    public String postnr;
    public int priceBeer;
    public int priceCider;
    public int priceWine;

    public Bar(int id, String adress, String postnr, int priceBeer, int priceCider, int priceWine) {
        this.id = id;
        this.adress = adress;
        this.postnr = postnr;
        this.priceBeer = priceBeer;
        this.priceCider = priceCider;
        this.priceWine = priceWine;
    }
}

