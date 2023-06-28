package site.solbti.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import site.solbti.vo.Members;

import java.util.List;
import java.util.Optional;

public interface MembersRepository extends CrudRepository<Members, Long> {
    Optional<Members> findByMemId(String memId);
    Optional<Members> findByMemCode(Long id);
    Optional<Members> findByMemEmail(String email);
    Optional<Members> findByMemPhone(String phone);
    List<Members> findByMemType(String solBTI);

    @Query("select m from Members m where TO_NUMBER(MONTHS_BETWEEN(TRUNC(CURRENT_DATE,'YEAR'),TRUNC(TO_DATE(m.memBirth,'YYYY-MM-DD'),'YEAR')) /12 +1) BETWEEN ?1 AND ?2")
    List<Members> findByAge(int minAge, int maxAge);

    List<Members> findByMemGender(String gen);

}
