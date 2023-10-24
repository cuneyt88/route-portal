package com.cs.routeportal.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@EqualsAndHashCode
@AllArgsConstructor
@NoArgsConstructor
@Document("routes")
public class Route extends BaseEntity {

    @Id
    private String routeId;
    private String kml;
    private String name;

}
