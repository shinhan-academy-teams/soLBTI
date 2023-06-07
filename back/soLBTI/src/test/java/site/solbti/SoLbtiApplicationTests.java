package site.solbti;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import site.solbti.repository.CommonCardRepository;
import site.solbti.repository.MembersRepository;
import site.solbti.repository.PaymentHistoryRepository;
import site.solbti.repository.PersonalCardRepository;
import site.solbti.vo.CommonCard;
import site.solbti.vo.Members;
import site.solbti.vo.PaymentHistory;
import site.solbti.vo.PersonalCard;

import java.util.List;

@SpringBootTest
class SoLbtiApplicationTests {
	@Autowired
	MembersRepository repo;

	@Autowired
	CommonCardRepository ccRepo;

	@Autowired
	PersonalCardRepository personalCardRepo;

	@Autowired
	PaymentHistoryRepository historyRepo;


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

	@Test
	void insertPersonalCard(){

		CommonCard card = ccRepo.findById(20L).orElse(null);

		PersonalCard personalCard = PersonalCard.builder().card(card).build();

//		List<PersonalCard> mycards = repo.findById(1L).ifPresent(i->{
//			i.getMyCards()
//		});

		repo.findById(1L).ifPresent(entity->{
			List<PersonalCard> myCards = entity.getMyCards();
			myCards.add(personalCard);
			entity.setMyCards(myCards);

			repo.save(entity);
		});
	}

	@Test
	void historyTest(){

		PersonalCard card = personalCardRepo.findById(10L).orElse(null);

		PaymentHistory history = PaymentHistory.builder()
				.price(1000L)
				.personalCard(card)
				.build();

		historyRepo.save(history);
	}

	@Test
	void floatTest(){

		System.out.println("1.1+0.3=1.4 ->"+(1.1+0.3==1.4));
		System.out.println("1.0+0.5=1.5 ->"+(1.0+0.5==1.5));
	}
}