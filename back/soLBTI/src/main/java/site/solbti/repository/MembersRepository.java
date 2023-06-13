package site.solbti.repository;

import org.springframework.data.repository.CrudRepository;
import site.solbti.vo.Members;

import java.util.Optional;

public interface MembersRepository extends CrudRepository<Members, Long> {
    Optional<Members> findByMemId(String memId);

    Optional<Members> findByMemCode(Long id);
    Optional<Members> findByMemEmail(String email);

}
