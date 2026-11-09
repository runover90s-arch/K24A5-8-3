export interface PersonalLetter {
  greeting: string;
  paragraphs: readonly [string, string, string, ...string[]];
  ending: string;
}

/** 24 lá thư viết độc lập. Mỗi thư hướng đến một thông điệp, không khẳng định kỷ niệm chưa biết. */
export const letters: Readonly<Record<string, PersonalLetter>> = {
  'letter-1': {
    greeting: 'Gửi Kim Anh,',
    paragraphs: [
      'Có những cánh cửa mở ra thật khẽ, đến mức ta chỉ nhận ra khi phía trước đã là một khoảng trời mới. Mình nghĩ những năm tháng cuối thời học sinh cũng giống như thế: mỗi ngày tưởng chừng bình thường, rồi một hôm nhìn lại, ta thấy mình đã đi được một quãng rất xa.',
      'Nhân ngày 8/3, mình muốn gửi đến Kim Anh một lời chúc không quá ồn ào. Mong bạn đủ tự tin để thử những điều còn lạ, đủ kiên nhẫn để đi qua những bài toán khó của tuổi trẻ, và đủ dịu dàng với chính mình khi mọi chuyện chưa đúng như dự định.',
      'Nếu có lúc đứng trước nhiều lựa chọn, hy vọng bạn sẽ nhớ rằng không cần bước nhanh hơn bất kỳ ai. Chỉ cần mỗi quyết định đưa bạn gần hơn với điều thật sự quan trọng. Chúc những cánh cửa sắp tới mở ra bằng niềm háo hức, chứ không phải nỗi sợ.'
    ],
    ending: 'Chúc mừng ngày 8/3/2027!'
  },
  'letter-5': {
    greeting: 'Gửi Mỹ Đình,',
    paragraphs: [
      'Nếu cuộc sống là một tấm bản đồ, có lẽ đẹp nhất không phải những con đường được vẽ sẵn, mà là những lối rẽ ta dần tự khám phá. Ở tuổi này, phía trước có biết bao ngã rẽ; chẳng ai có thể biết hết đâu là lối đi hoàn hảo, và điều đó cũng chẳng sao cả.',
      'Ngày 8/3 này, mình chúc Mỹ Đình có một chiếc la bàn thật đặc biệt: không chỉ hướng về thành tích hay sự mong đợi của người khác, mà hướng về điều khiến bạn thấy mình được là chính mình. Mong bạn can đảm hỏi, dám thử, biết dừng lại nghỉ khi cần và không ngại bắt đầu lại.',
      'Sẽ có những ngày nắng đẹp, cũng có những chặng đường nhiều mây. Nhưng một hành trình ý nghĩa không cần bầu trời lúc nào cũng quang đãng. Hy vọng bạn sẽ gặp những người tốt, những cơ hội đáng quý, và luôn giữ được sự háo hức khi nhìn vào trang bản đồ chưa được mở.'
    ],
    ending: 'Chúc mừng ngày 8/3/2027!'
  },
  'letter-6': {
    greeting: 'Gửi Gia Hân,',
    paragraphs: [
      'Đôi khi điều ta cần giữa một tuần bận rộn chỉ là vài phút thật yên: một cốc nước mát, một khoảng trời chiều, hay một câu nói khiến lòng nhẹ đi. Những niềm vui nho nhỏ ấy không làm thế giới thay đổi, nhưng có thể khiến một ngày bình thường trở nên đáng nhớ.',
      'Mình gửi Gia Hân lời chúc 8/3 với mong muốn bạn có thật nhiều khoảnh khắc như vậy. Mong những cố gắng của bạn được nhìn nhận xứng đáng, những điều chưa trọn vẹn không khiến bạn tự trách quá lâu, và những niềm vui giản dị luôn có một chỗ trong lịch trình mỗi ngày.',
      'Khi nghĩ đến tương lai, ai cũng dễ chú ý tới những cột mốc lớn. Nhưng hy vọng trên đường tới đó, bạn vẫn dành thời gian cho bản thân và những người mình quý. Chúc Gia Hân tìm được nhịp sống riêng: có ước mơ để bước tới, có bình yên để trở về, và có lý do để mỉm cười hôm nay.'
    ],
    ending: 'Chúc mừng ngày 8/3/2027!'
  },
  'letter-8': {
    greeting: 'Gửi Anh Hồng,',
    paragraphs: [
      'Một cuốn sách hay không chỉ có những chương rực rỡ. Đôi khi trang đáng nhớ nhất lại là trang có vài dòng gạch xóa, một dấu hỏi bên lề, hay một đoạn ta phải đọc lại mới hiểu. Mình thấy tuổi học trò cũng vậy: chẳng cần trang nào cũng phải hoàn hảo.',
      'Nhân ngày 8/3, chúc Anh Hồng luôn giữ được sự tò mò để viết tiếp câu chuyện của mình. Mong bạn đừng vì một lần chưa như ý mà vội kết luận về cả hành trình. Có những điều hôm nay còn khó, nhưng rồi sẽ trở thành một phần khiến bạn trưởng thành và hiểu mình hơn.',
      'Mình mong những chương mới đem đến nhiều cuộc gặp gỡ tử tế, những bài học thú vị và cả những khoảng nghỉ vui vẻ. Nếu đôi khi cần lật sang trang khác, cứ làm điều đó bằng lòng tin. Cuốn sách này thuộc về bạn, và bạn có quyền chọn cách kể câu chuyện của chính mình.'
    ],
    ending: 'Chúc mừng ngày 8/3/2027!'
  },
  'letter-10': {
    greeting: 'Gửi Xuân Hương,',
    paragraphs: [
      'Có một điều rất lạ ở đầu mùa: đôi khi ta không nhìn thấy sự thay đổi ngay, mà chỉ cảm nhận được qua làn gió hay mùi hương thoảng qua. Sự trưởng thành cũng âm thầm như thế. Mỗi ngày học thêm một chút, hiểu thêm một chút, rồi bất chợt nhận ra mình đã khác.',
      'Vào ngày 8/3, mình chúc Xuân Hương đón nhận những đổi thay sắp tới bằng lòng tin và sự bình thản. Nếu một kế hoạch chưa thành, mong bạn vẫn nhìn thấy những điều tốt đang lớn dần. Nếu một ước mơ còn xa, mong bạn tìm được niềm vui trong từng bước nhỏ hướng về nó.',
      'Không cần phải rực rỡ mọi lúc mới là một mùa đẹp. Có những ngày chỉ cần khỏe mạnh, ngủ ngon và được làm điều mình thích đã rất đáng quý. Hy vọng mỗi mùa đi qua đều để lại cho bạn một điều đáng nhớ, và mỗi mùa sắp đến đều mang theo một lý do mới để hy vọng.'
    ],
    ending: 'Chúc mừng ngày 8/3/2027!'
  },
  'letter-17': {
    greeting: 'Gửi Minh Khuê,',
    paragraphs: [
      'Người ta có thể dùng những tọa độ rất chính xác để tìm một ngôi sao, nhưng không có công thức nào đủ đơn giản để chỉ ra con đường phù hợp nhất với mỗi người. Phía trước là khoảng không rộng lớn của những lựa chọn, và đôi khi chính sự chưa biết lại làm hành trình thú vị.',
      'Ngày 8/3, mình muốn chúc Minh Khuê luôn đủ tò mò để đặt câu hỏi và đủ bản lĩnh để tìm câu trả lời của riêng mình. Mong những mục tiêu lớn trở thành động lực chứ không phải sức ép, và những lần thử sai chỉ giúp bạn hiểu thêm đâu là điều thực sự có ý nghĩa.',
      'Một bầu trời không chỉ đẹp vì những ngôi sao sáng nhất, mà còn vì cách mỗi điểm sáng góp vào cả bức tranh. Hy vọng bạn sẽ không so sánh hành trình của mình với quỹ đạo người khác. Chỉ cần biết mình đang đi về đâu, từng bước tiến nhỏ cũng đã là điều đáng tự hào.'
    ],
    ending: 'Chúc mừng ngày 8/3/2027!'
  },
  'letter-18': {
    greeting: 'Gửi Ling,',
    paragraphs: [
      'Có những lời chúc dù được viết bằng ngôn ngữ nào vẫn mang cùng một ý nghĩa: mong người nhận có một ngày thật vui và một tương lai nhiều điều tốt đẹp. Vì vậy, hôm nay mình muốn gửi đến Ling một lời nhắn giản dị, không cầu kỳ, nhưng được đặt vào đây bằng tất cả sự trân trọng.',
      'Chúc bạn trong những năm tháng sắp tới được khám phá nhiều điều khiến mình hứng thú, gặp những người biết lắng nghe và có đủ tự tin để nói lên suy nghĩ của bản thân. Mong những ngày nhiều việc vẫn có chỗ cho tiếng cười, còn những ngày khó khăn luôn có một điều nhỏ giúp bạn vững lòng.',
      'Thế giới rộng lớn giống một bản hòa âm có rất nhiều giai điệu. Bạn không cần phải hát theo nhịp của bất kỳ ai để có vị trí riêng trong bản nhạc ấy. Hy vọng Ling sẽ giữ được giai điệu của mình, thử những nốt nhạc mới và tận hưởng từng chặng đường đang mở ra.'
    ],
    ending: 'Chúc mừng ngày 8/3/2027!'
  },
  'letter-19': {
    greeting: 'Gửi Ánh Minh,',
    paragraphs: [
      'Buổi sáng đôi khi bắt đầu chỉ bằng một vệt sáng mỏng qua khung cửa. Nó không làm mọi thứ thay đổi ngay lập tức, nhưng đủ để ta biết một ngày mới đã đến. Mình thích nghĩ về hy vọng theo cách ấy: không cần lớn lao, chỉ cần xuất hiện đúng lúc và cho ta thêm can đảm.',
      'Nhân ngày 8/3, mình chúc Ánh Minh luôn tìm thấy những khoảng sáng dành cho mình. Có thể đó là một tin vui bất ngờ, một kết quả đến sau nhiều cố gắng, hoặc đơn giản là cảm giác nhẹ lòng sau khi vượt qua điều từng khiến bạn lo lắng. Mong bạn ghi nhận từng bước tiến của bản thân.',
      'Nếu đôi khi mọi chuyện chưa rõ ràng, cũng không sao. Ánh sáng cần thời gian để lan qua một căn phòng, và con người cần thời gian để lớn lên. Chúc bạn kiên trì với điều mình tin, không quên nghỉ ngơi, và luôn có người đồng hành thật tử tế trên đường phía trước.'
    ],
    ending: 'Chúc mừng ngày 8/3/2027!'
  },
  'letter-20': {
    greeting: 'Gửi Giáng My,',
    paragraphs: [
      'Hãy tưởng tượng có một chiếc hộp nhỏ được gửi đến tương lai, bên trong là vài điều ta muốn nhắn với chính mình của nhiều năm sau. Có lẽ ta sẽ bỏ vào đó những mong ước còn đang ấp ủ, cả những băn khoăn của tuổi học trò mà sau này đọc lại sẽ thấy thương.',
      'Ngày 8/3 này, mình chúc Giáng My có đủ trải nghiệm đẹp để một ngày nào đó mở chiếc hộp tưởng tượng ấy với nụ cười. Mong bạn không ngại viết ra những ước mơ táo bạo, nhưng cũng không quên trân trọng hiện tại. Không phải giấc mơ nào cũng cần trở thành một kế hoạch ngay lập tức.',
      'Nếu gửi thêm một mảnh giấy vào hộp, mình sẽ viết rằng: hãy tin vào khả năng lớn lên của bản thân. Những điều chưa biết hôm nay rồi có thể học được, những đoạn đường khó rồi có thể đi qua. Chúc bạn có thật nhiều ký ức ấm áp để mang theo tới phiên bản tương lai của mình.'
    ],
    ending: 'Chúc mừng ngày 8/3/2027!'
  },
  'letter-22': {
    greeting: 'Gửi Bảo Ngọc,',
    paragraphs: [
      'Có những viên sỏi nằm bên đường, thoạt nhìn bình thường. Nhưng nếu nhặt lên và quan sát kỹ, ta sẽ thấy mỗi viên có những đường vân riêng. Những điều bé nhỏ trong cuộc sống cũng vậy: đôi khi phải chậm lại một chút mới nhận ra vẻ đáng quý của chúng.',
      'Mình muốn dùng ngày 8/3 để chúc Bảo Ngọc có nhiều niềm vui không cần lý do quá lớn. Mong bạn biết tự thưởng cho mình sau một ngày cố gắng, bớt khắt khe với những thiếu sót, và luôn có cơ hội thử sức ở những lĩnh vực khiến bạn tò mò. Mỗi trải nghiệm đều có thể để lại một điều hay.',
      'Trong những năm tới, chắc hẳn sẽ có nhiều thứ thay đổi. Hy vọng giữa nhịp sống nhanh, bạn vẫn giữ được khả năng nhận ra điều đẹp đẽ rất gần: một lời động viên, một buổi chiều mát, một mục tiêu vừa đạt được. Chúc hành trình của bạn được tạo nên từ thật nhiều khoảnh khắc đáng gìn giữ.'
    ],
    ending: 'Chúc mừng ngày 8/3/2027!'
  },
  'letter-23': {
    greeting: 'Gửi Ánh Ngọc,',
    paragraphs: [
      'Một chiếc kính vạn hoa xoay nhẹ là những mảnh màu quen thuộc đã tạo thành bức tranh khác. Cuộc sống cũng có những lúc như thế: cùng một sự việc, chỉ cần thử nhìn ở góc khác, ta có thể thấy một câu trả lời hoặc điều chưa từng nghĩ tới.',
      'Nhân ngày 8/3, mình chúc Ánh Ngọc luôn có sự linh hoạt ấy khi bước vào những chặng đường sắp tới. Mong bạn không bị một lần vấp váp định nghĩa, không ngại thay đổi kế hoạch khi cần, và giữ được niềm vui học hỏi ngay cả khi câu hỏi khó hơn trước. Không phải câu trả lời nào cũng đến ngay.',
      'Kính vạn hoa đẹp vì không bức tranh nào tồn tại mãi, và điều đó khiến lần xoay tiếp theo trở nên đáng mong chờ. Hy vọng bạn cũng tìm thấy sự thú vị trong những thay đổi của tuổi trẻ. Chúc mỗi năm mới đem đến thêm màu sắc, thêm hiểu biết và thêm sự tự tin để chọn điều phù hợp với mình.'
    ],
    ending: 'Chúc mừng ngày 8/3/2027!'
  },
  'letter-24': {
    greeting: 'Gửi Khánh Ngọc,',
    paragraphs: [
      'Những cơn mưa đầu mùa thường đến bất chợt. Có lúc ta chỉ muốn chạy thật nhanh để tránh ướt, nhưng cũng có hôm đứng dưới mái hiên, nghe tiếng mưa và nhận ra một khoảng lặng thật dễ chịu. Không phải điều gì đến ngoài dự tính cũng là điều không tốt.',
      'Mình chúc Khánh Ngọc một ngày 8/3 thật nhẹ nhàng, cùng nhiều ngày phía trước đủ rộng để bạn vừa cố gắng vừa nghỉ ngơi. Mong bạn kiên nhẫn với những mục tiêu cần thời gian, biết nhờ giúp đỡ khi cần và không xem những thay đổi bất ngờ là dấu chấm hết cho kế hoạch của mình.',
      'Sau mưa, đường phố không nhất thiết phải có cầu vồng mới trở nên đẹp. Chỉ cần không khí trong hơn và ta thấy dễ thở đã là điều đáng mừng. Hy vọng bạn luôn nhận ra những tín hiệu tốt, dù rất nhỏ, trong cuộc sống hằng ngày. Chúc những bước chân sắp tới vững vàng mà vẫn đầy háo hức.'
    ],
    ending: 'Chúc mừng ngày 8/3/2027!'
  },
  'letter-25': {
    greeting: 'Gửi Hồng Ngọc,',
    paragraphs: [
      'Bầu trời lúc hoàng hôn hiếm khi chỉ có một màu. Có hôm cam ấm, hôm phớt hồng, có hôm tím nhạt; những lớp màu hòa vào nhau mà không cần lớp nào nổi bật hơn. Mỗi người có nhiều sắc thái, chẳng cần giống hình dung của người khác.',
      'Nhân ngày 8/3, mình chúc Hồng Ngọc được tự do khám phá những phần khác nhau của bản thân. Mong bạn có thể mạnh mẽ khi cần, dịu lại khi muốn, thay đổi suy nghĩ khi hiểu thêm điều mới và tự tin bảo vệ điều mình coi trọng. Không ai phải luôn vui vẻ hay luôn giỏi giang mới xứng đáng được trân trọng.',
      'Những năm học trò sẽ dần đi qua, để lại rất nhiều sắc màu trong ký ức. Hy vọng sau này nhìn lại, bạn sẽ thấy mình đã sống thật với những lựa chọn và không bỏ quên niềm vui nhỏ nào. Chúc cuộc sống phía trước mở ra những gam màu chưa từng thử, nhưng vẫn hài hòa theo cách của bạn.'
    ],
    ending: 'Chúc mừng ngày 8/3/2027!'
  },
  'letter-32': {
    greeting: 'Gửi Phương Thảo,',
    paragraphs: [
      'Một mầm cây không vươn lên chỉ sau một đêm. Nó cần ánh sáng, nước, đất tốt và cả những khoảng thời gian tưởng như không có gì xảy ra. Có lẽ việc theo đuổi một ước mơ cũng vậy: tiến bộ đôi khi rất yên lặng, đến mức ta dễ quên rằng mình vẫn đang lớn lên.',
      'Ngày 8/3 này, chúc Phương Thảo đủ kiên nhẫn để chăm sóc những điều mình thật sự muốn xây dựng. Mong bạn không quá vội so sánh kết quả với người khác, vì mỗi người có một nhịp phát triển riêng. Những bước nhỏ, nếu được giữ bằng sự bền bỉ, vẫn có thể đưa ta tới nơi đáng mong chờ.',
      'Trong hành trình ấy, mong bạn nhớ chăm sóc chính mình. Không phải ngày nào cũng cần gắng hết sức; có lúc nghỉ ngơi là cách tốt nhất để tiếp tục. Chúc những hạt giống bạn gieo hôm nay dần thành điều khiến bạn tự hào, và mỗi mùa mới đều mang lại thêm chút bình yên.'
    ],
    ending: 'Chúc mừng ngày 8/3/2027!'
  },
  'letter-33': {
    greeting: 'Gửi Minh Thư,',
    paragraphs: [
      'Có câu chuyện bắt đầu từ một trang giấy trắng. Ban đầu, trang giấy ấy có thể khiến ta ngần ngại: nên viết điều gì trước, có sợ sai không, liệu câu chuyện rồi sẽ đi đến đâu? Nhưng có lẽ điều quan trọng nhất là cho phép bản thân đặt xuống dòng chữ đầu tiên.',
      'Nhân ngày 8/3, mình chúc Minh Thư có can đảm với những khởi đầu chưa hoàn hảo. Mong bạn tìm được niềm vui khi thử một điều mới, được công nhận cho những cố gắng âm thầm và giữ được sự dịu dàng với bản thân trong những ngày mọi thứ chưa đúng kế hoạch. Một bản nháp vẫn có giá trị của nó.',
      'Nếu một chương không diễn ra như mong đợi, bạn hoàn toàn có thể viết tiếp theo hướng khác. Cuộc đời không cần một cốt truyện duy nhất để trở nên đáng yêu. Chúc bạn gặp nhiều người bạn tốt, có những ngày đáng nhớ và có quyền viết nên câu chuyện thật riêng của chính mình.'
    ],
    ending: 'Chúc mừng ngày 8/3/2027!'
  },
  'letter-35': {
    greeting: 'Gửi Anh Thư,',
    paragraphs: [
      'Dải Ngân Hà nhìn từ xa giống một con đường bằng ánh sáng. Nhưng thực ra chẳng có vạch kẻ nào chỉ sẵn hướng đi cho từng ngôi sao. Mỗi điểm sáng có một vị trí, một khoảng cách, và chính sự khác nhau ấy mới tạo thành bầu trời rộng đến thế.',
      'Vì vậy, ngày 8/3 này mình muốn chúc Anh Thư luôn tin vào đường đi của riêng mình. Mong bạn thử sức với điều khiến bạn háo hức, không vội bỏ cuộc khi gặp một khúc quanh, và không thấy mình chậm chỉ vì người khác đang tiến nhanh. Mỗi lựa chọn góp thành hành trình đáng giá.',
      'Sẽ có lúc tương lai trông như một bầu trời nhiều mây, chưa nhìn rõ điểm đến. Hy vọng những khi ấy bạn vẫn có thể dựa vào điều mình yêu thích và những người thật lòng quan tâm. Chúc bạn có nhiều phát hiện bất ngờ, nhiều ngày bình yên và đủ dũng khí để bước vào vùng trời mình chọn.'
    ],
    ending: 'Chúc mừng ngày 8/3/2027!'
  },
  'letter-36': {
    greeting: 'Gửi Võ Anh Thư,',
    paragraphs: [
      'Một chiếc đồng hồ có những kim chuyển động ở tốc độ khác nhau, nhưng cả ba vẫn thuộc về cùng một mặt số. Mình thích hình ảnh ấy vì nó nhắc rằng không phải điều gì cũng diễn ra nhanh. Có những thành quả cần nhiều tháng, còn có niềm vui chỉ mất vài giây để xuất hiện.',
      'Nhân ngày 8/3, chúc Võ Anh Thư tìm được nhịp độ hợp với mình giữa những lịch học và dự định. Mong bạn không quên nghỉ ngơi khi mệt, biết tự hào về tiến bộ dù nhỏ, vẫn dành chỗ cho điều khiến hôm nay thú vị. Thời gian cho bản thân không hề lãng phí.',
      'Khi những cột mốc mới đến gần, hy vọng bạn sẽ đón chúng bằng tâm thế sẵn sàng mà không quá vội vàng. Có lúc cần bước nhanh, có lúc chỉ cần bước đều; điều quan trọng là hướng đi có ý nghĩa với bạn. Chúc mỗi lần nhìn lại, bạn đều thấy mình đã sử dụng thời gian một cách đáng trân trọng.'
    ],
    ending: 'Chúc mừng ngày 8/3/2027!'
  },
  'letter-40': {
    greeting: 'Gửi Tường Vy,',
    paragraphs: [
      'Một bông hoa không cần nở vào đúng ngày người khác mong đợi. Có loài thích nắng sớm, có loài đợi một cơn mưa, cũng có loài lặng lẽ lớn lên qua nhiều mùa. Mình nghĩ đây là một cách thật đẹp để nhớ rằng mỗi người có thời điểm và con đường trưởng thành riêng.',
      'Nhân ngày 8/3, mình chúc Tường Vy luôn được tôn trọng với những lựa chọn của bản thân. Mong bạn không phải gồng mình để đáp ứng mọi kỳ vọng, có thể nói ra điều mình cần, và vẫn sẵn lòng thử những điều khiến trái tim thấy tò mò. Những ước mơ dù còn nhỏ cũng xứng đáng được nuôi dưỡng.',
      'Nếu có một mùa chưa như ý, đó không có nghĩa tất cả những mùa sau đều sẽ như vậy. Hy vọng bạn giữ được niềm tin vào những cơ hội tiếp theo và có người ở bên khi cần một lời động viên. Chúc bạn bước qua từng mùa bằng sự tự do, nhẹ nhõm và nhiều niềm vui thật lòng.'
    ],
    ending: 'Chúc mừng ngày 8/3/2027!'
  },
  'letter-41': {
    greeting: 'Gửi Ngọc Tường Vy,',
    paragraphs: [
      'Có lẽ cánh buồm đẹp nhất không phải khi biển hoàn toàn lặng gió, mà khi nó học cách đón từng luồng gió khác nhau để đi tiếp. Những thay đổi đôi khi khiến ta bối rối, nhưng cũng có thể đưa đến những vùng nước và chân trời mà trước đó mình chưa từng nghĩ tới.',
      'Ngày 8/3 này, mình chúc Ngọc Tường Vy có đủ lòng tin để điều chỉnh hướng đi khi cần. Mong bạn không sợ phải học lại một điều, không thấy mình thất bại khi thay đổi mục tiêu, và không quên cảm nhận niềm vui trên hành trình. Đi đúng hướng với bản thân quan trọng hơn đi thật nhanh.',
      'Sẽ có ngày gió thuận, cũng có ngày phải kiên nhẫn chờ đợi. Hy vọng bạn luôn có điểm tựa tốt, những người bạn chân thành và một khoảng bình yên để trở về. Chúc cánh buồm ước mơ của bạn đi qua nhiều bến bờ đáng nhớ, mang theo những trải nghiệm khiến bạn hiểu mình hơn.'
    ],
    ending: 'Chúc mừng ngày 8/3/2027!'
  },
  'letter-42': {
    greeting: 'Gửi Thanh Xuân,',
    paragraphs: [
      'Hai chữ “thanh xuân” thường gợi lên những ngày nhiều tiếng cười, nhưng mình nghĩ chúng còn chứa cả sự bỡ ngỡ, những lần phân vân và rất nhiều điều đang học cách hiểu. Tuổi trẻ không nhất thiết phải hoàn hảo mới đáng nhớ; chính những trải nghiệm khác nhau mới làm nó trở nên chân thật.',
      'Nhân ngày 8/3, mình chúc Thanh Xuân tận hưởng những ngày hiện tại theo nhịp của mình. Mong bạn không quá lo rằng mình phải có mọi đáp án ngay bây giờ. Có những câu hỏi chỉ thời gian mới giúp ta trả lời, và trong khi chờ đợi, bạn vẫn xứng đáng có những khoảng thời gian vui vẻ.',
      'Sau này, khi nhìn lại những năm tháng học trò, hy vọng bạn sẽ không chỉ nhớ các cột mốc lớn mà còn mỉm cười vì những ngày rất bình thường. Chúc bạn luôn có người để chia sẻ, những mục tiêu để phấn đấu và đủ bao dung để yêu quý cả phiên bản đang học hỏi của chính mình.'
    ],
    ending: 'Chúc mừng ngày 8/3/2027!'
  },
  'letter-43': {
    greeting: 'Gửi Như Ý,',
    paragraphs: [
      'Ai cũng mong nhiều điều trong cuộc sống diễn ra như ý, nhưng đôi khi chính những khúc quanh ngoài dự đoán lại dẫn ta đến một góc nhìn hay. Một con đường không đi thẳng vẫn có thể là con đường đẹp, nếu trên đó ta hiểu thêm về bản thân và điều mình thật sự muốn.',
      'Ngày 8/3, mình chúc Như Ý nhiều ngày thuận lợi, nhưng còn chúc bạn có sự vững vàng trong cả những ngày không thuận lợi. Mong bạn không đánh giá bản thân chỉ bằng kết quả, biết tự cho mình cơ hội thứ hai và đủ dũng cảm để nói “mình sẽ thử lại” khi cần.',
      'Những dự định sắp tới có thể sẽ thay đổi vài lần, và điều đó không lấy đi giá trị của ước mơ ban đầu. Hy vọng bạn gặp những cơ hội phù hợp, những người chân thành và những khoảng lặng giúp mình chọn hướng đi. Chúc bạn luôn biết điều gì làm mình hạnh phúc, kể cả khi thế giới xung quanh thay đổi.'
    ],
    ending: 'Chúc mừng ngày 8/3/2027!'
  },
  'letter-44': {
    greeting: 'Gửi Hải Yến,',
    paragraphs: [
      'Trên mặt biển rộng, một ngọn hải đăng không quyết định con tàu phải đi đâu. Nó chỉ mang đến một điểm sáng để người đi biển nhận ra phương hướng trong đêm. Đôi khi những lời động viên cũng như vậy: không chọn thay ta, chỉ giúp ta tin mình có thể đi tiếp.',
      'Nhân ngày 8/3, mình chúc Hải Yến luôn tìm thấy những điểm sáng như thế trên hành trình trưởng thành. Mong bạn có những người sẵn lòng lắng nghe, có cơ hội khám phá điều mình yêu thích và có đủ bình tĩnh khi phải đứng trước một lựa chọn lớn. Không cần biết hết mọi thứ mới có thể bắt đầu.',
      'Biển có lúc lặng, có lúc nổi sóng, nhưng vẫn luôn mở ra những chân trời mới. Hy vọng bạn sẽ không vì một ngày nhiều gió mà quên nhìn về phía trước. Chúc từng chặng đường đem đến những phát hiện thú vị, và bạn luôn giữ được quyền tự do chọn bến bờ phù hợp với mình.'
    ],
    ending: 'Chúc mừng ngày 8/3/2027!'
  },
  'letter-45': {
    greeting: 'Gửi Nhất Linh,',
    paragraphs: [
      'Có những khoảng thời gian không kéo dài mãi nhưng vẫn trở thành một phần đẹp trong câu chuyện của mỗi người. Những ngày từng chung lớp cũng vậy: rồi lịch học, phòng học và những con đường khác đi, nhưng sự trân trọng dành cho một người bạn vẫn ở lại.',
      'Ngày 8/3 này, mình muốn gửi Nhất Linh một lời chúc thật ấm áp, như một tấm thiệp nhỏ đi qua khoảng cách giữa lớp học. Mong nơi bạn đang bước tiếp có nhiều điều thú vị, những người bạn tử tế và cơ hội để bạn khám phá khả năng của bản thân. Hy vọng mỗi ngày đều có một điều khiến bạn mỉm cười.',
      'Dù không còn cùng một tập thể lớp ở hiện tại, bạn vẫn được nhớ đến bằng sự quý mến và những lời chúc tốt lành. Chúc Nhất Linh bình an trước những thay đổi, tự tin với lựa chọn của mình và luôn cảm thấy có những tình bạn đáng trân trọng ở nhiều nơi trên hành trình.'
    ],
    ending: 'Chúc mừng ngày 8/3/2027!'
  },
  'letter-46': {
    greeting: 'Gửi Thiên Nga,',
    paragraphs: [
      'Buổi bình minh trên mỗi dòng sông có thể mang màu khác, nhưng ánh sáng của ngày mới vẫn đến với tất cả. Mình thích hình ảnh ấy khi nghĩ về những người bạn giờ đi trên những hành trình riêng: không cần ở cùng nơi mới có thể gửi cho nhau một lời chúc chân thành.',
      'Nhân ngày 8/3, mong Thiên Nga sẽ có nhiều khởi đầu đáng mong đợi ở môi trường hiện tại. Chúc bạn gặp những người biết trân trọng mình, có trải nghiệm làm đôi mắt thêm tò mò và đủ vững vàng trước những điều còn mới. Những ngày chung lớp là kỷ niệm đáng quý, không phải điều gì cần phải buồn khi nhớ lại.',
      'Tương lai có thể đưa mỗi người đi xa theo một hướng, nhưng sự tử tế luôn có cách vượt qua khoảng cách ấy. Mình chúc bạn đón nhiều bình minh vui vẻ, đủ tự tin mở những cánh cửa mới và luôn có thể nhìn về năm học trò bằng nụ cười nhẹ nhõm.'
    ],
    ending: 'Chúc mừng ngày 8/3/2027!'
  }
};
