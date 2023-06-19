package site.solbti.vo;


import lombok.*;

import javax.persistence.*;

@Getter
@Setter
@ToString
@EqualsAndHashCode
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="bigger_category_map")
public class BiggerStoreCategory {

    @Id
    private String storeCategory;
    private String storeBiggerCategory;
}
