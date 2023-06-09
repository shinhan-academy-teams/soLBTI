package site.solbti;

import oracle.jdbc.logging.annotations.Log;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import site.solbti.controller.MemberController;
import site.solbti.repository.CommonCardRepository;
import site.solbti.repository.MembersRepository;
import site.solbti.repository.PaymentHistoryRepository;
import site.solbti.repository.PersonalCardRepository;
import site.solbti.vo.CommonCard;
import site.solbti.vo.Members;
import site.solbti.vo.PaymentHistory;
import site.solbti.vo.PersonalCard;

import java.util.List;
import java.util.Optional;


@SpringBootTest
class JPATests {

	private static final Logger log = LoggerFactory.getLogger(JPATests.class);
	@Autowired
	MembersRepository memRepo;

	@Autowired
	CommonCardRepository commonCardRepo;

	@Autowired
	PersonalCardRepository personalCardRepo;

	@Autowired
	PaymentHistoryRepository historyRepo;

	@Test // members 테이블 insert test
	void testMember() {
		Members member = Members.builder()
				.memId("test_id1").memPwd("test_pwd1").memName("이진경").memEmail("test@naver.com").memAddr("test").memPhone("test").build();
		Members member2 = Members.builder()
				.memId("test_id2").memPwd("test_pwd2").memName("김범기").memEmail("test@gmail.com").memAddr("test2").memPhone("test2").build();
		memRepo.save(member);
		memRepo.save(member2);
	}

	@Test // common_card 테이블 insert test
	void testCard() {
		CommonCard card = CommonCard.builder()
				.cardName("국민카드").imgURL("test1").build();
		CommonCard card2 = CommonCard.builder()
				.cardName("현대카드").imgURL("test2").build();
		CommonCard card3 = CommonCard.builder()
				.cardName("농협카드").imgURL("test3").build();
		commonCardRepo.save(card);
		commonCardRepo.save(card2);
		commonCardRepo.save(card3);
	}


	@Test
	void testPersonalCard(){ // personal_card 테이블 insert test
		CommonCard card = commonCardRepo.findById(20L).orElse(null);
		PersonalCard personalCard = PersonalCard.builder().card(card).build();

		memRepo.findById(1L).ifPresent(entity->{
			List<PersonalCard> myCards = entity.getMyCards();
			myCards.add(personalCard);
			entity.setMyCards(myCards);
			memRepo.save(entity);
		});
	}

	@Test
	void historyTest(){ // payment_history 테이블 insert test
		PersonalCard card = personalCardRepo.findById(10L).orElse(null);
		PaymentHistory history = PaymentHistory.builder()
				.price(1000L)
				.personalCard(card)
				.build();
		historyRepo.save(history);
	}

	@Test
	void securityTest1(){
		Optional<Members> result = memRepo.findById(25L);
		result.ifPresent(member-> System.out.println(member));
	}


	@Test
	void findByCardNameTest(){
		List<CommonCard> resultCardList = commonCardRepo.findByCardNameLike("Deep");
		log.info(resultCardList.toString());
	}

	@Test
	void findByCardNameConTest(){
		List<CommonCard> resultCardList = commonCardRepo.findByCardNameContaining("Deep");
		log.info(resultCardList.toString());
	}


}
