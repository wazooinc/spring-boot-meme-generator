package com.example.springbootmemegenerator.models;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;

@Entity
@Data
public class MemeItem implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    private String title;

    @Lob
    private byte[] image;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    @Override
    public String toString() {
        return "MemeItem{" +
                "id=" + id +
                ", title='" + title + "'" +
                ", createdAt='" + createdAt + "'" +
                ", updatedAt='" + updatedAt + "'" +
                "}";
    }

}
