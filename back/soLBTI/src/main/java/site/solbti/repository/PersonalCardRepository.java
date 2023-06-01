package site.solbti.repository;

import org.springframework.data.repository.CrudRepository;
import site.solbti.vo.PersonalCard;

public interface PersonalCardRepository extends CrudRepository<PersonalCard, Long> {
}
