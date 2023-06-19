package site.solbti.repository;

import org.springframework.data.repository.CrudRepository;
import site.solbti.vo.BiggerStoreCategory;

public interface BiggerCategoryRepository extends CrudRepository<BiggerStoreCategory, String> {

    @Override
    Iterable<BiggerStoreCategory> findAll();
}
