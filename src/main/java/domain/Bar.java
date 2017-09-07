package domain;

/**
 * Created by Administrator on 2017-09-06.
 */
public class Bar {
    private final int id;
    private final String adress;
    private final String postnr;
    private final int priceBeer;
    private final int priceCider;
    private final int priceWine;

    public Bar(int id, String adress, String postnr, int priceBeer, int priceCider, int priceWine) {
        this.id = id;
        this.adress = adress;
        this.postnr = postnr;
        this.priceBeer = priceBeer;
        this.priceCider = priceCider;
        this.priceWine = priceWine;
    }
}

