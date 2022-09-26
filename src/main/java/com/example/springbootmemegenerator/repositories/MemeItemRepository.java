package com.example.springbootmemegenerator.repositories;

import com.example.springbootmemegenerator.models.MemeItem;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MemeItemRepository extends CrudRepository<MemeItem, Long> {
}
