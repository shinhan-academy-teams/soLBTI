package site.solbti.repository;

import org.springframework.data.repository.CrudRepository;
import site.solbti.vo.Members;

public interface MembersRepository extends CrudRepository<Members, Long> {
}
