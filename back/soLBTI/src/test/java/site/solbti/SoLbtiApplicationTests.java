package site.solbti;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import site.solbti.repository.CommonCardRepository;
import site.solbti.repository.MembersRepository;
import site.solbti.vo.CommonCard;
import site.solbti.vo.Members;

@SpringBootTest
class SoLbtiApplicationTests {
	@Autowired
	MembersRepository repo;

	@Autowired
	CommonCardRepository ccRepo;

	@Test
	void contextLoads() {
	}
	
	@Test
	void yseony() {
		System.out.println("ㅎㅇ");
	}

	@Test
	void dbtest() {
		Members member = Members.builder()
				.memId("test").memPwd("test").memName("test").memEmail("test").memAddr("test").memPhone("test").build();
		Members member2 = Members.builder()
				.memId("test2").memPwd("test2").memName("test2").memEmail("test2").memAddr("test2").memPhone("test2").build();
		repo.save(member);
		repo.save(member2);
	}

	@Test
	void testCard() {
		CommonCard card = CommonCard.builder()
				.cardName("국민카드").imgURL("test").build();
		CommonCard card2 = CommonCard.builder()
				.cardName("현대카드").imgURL("test3").build();
		CommonCard card3 = CommonCard.builder()
				.cardName("농협카드").imgURL("test12123123123123123123").build();
		ccRepo.save(card);
		ccRepo.save(card2);
		ccRepo.save(card3);
	}

}
