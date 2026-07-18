import { RandomEvent } from '../types/game';

export const RANDOM_EVENTS: RandomEvent[] = [
  {
    id: "e1_server_crash",
    title: { en: "Server Crash", vi: "Sập Máy Chủ" },
    description: {
      en: "A massive DDoS attack has hit the regional data centers. Operations are halted.",
      vi: "Một cuộc tấn công DDoS quy mô lớn nhắm vào trung tâm dữ liệu khu vực. Mọi hoạt động bị đình trệ."
    },
    choices: [
      { id: "c1", text: { en: "Pay $150 for emergency backup", vi: "Chi 150$ để dùng máy chủ dự phòng" }, effect: { playerMoneyDelta: -150, botMoneyDelta: -300 }, outcome: { en: "Your swift action limited your losses, but your rival suffered heavily.", vi: "Hành động nhanh chóng giúp bạn giảm thiệt hại, trong khi đối thủ bị ảnh hưởng nặng." } },
      { id: "c2", text: { en: "Wait it out", vi: "Chờ đợi hệ thống phục hồi" }, effect: { playerMoneyDelta: -300, botMoneyDelta: -300 }, outcome: { en: "Both companies lost significant revenue during the downtime.", vi: "Cả hai công ty đều mất doanh thu đáng kể trong thời gian gián đoạn." } }
    ]
  },
  {
    id: "e2_corp_espionage",
    title: { en: "Corporate Espionage", vi: "Gián Điệp Công Nghiệp" },
    description: {
      en: "A whistleblower from your rival offers to sell you their pricing algorithm.",
      vi: "Một nhân viên bất mãn từ đối thủ chào bán thuật toán định giá của họ cho bạn."
    },
    choices: [
      { id: "c1", text: { en: "Buy it for $200", vi: "Mua với giá 200$" }, effect: { playerMoneyDelta: -200, botMoneyDelta: -450 }, outcome: { en: "You weaponized their data, causing massive market loss for your rival.", vi: "Bạn đã vũ khí hóa dữ liệu của họ, gây thiệt hại thị trường khổng lồ cho đối thủ." }, karmaRisk: { probability: 0.35, penalty: -400, botReward: 200, message: { en: "Corporate spies exposed your illegal algorithm purchase! Heavy fines and market shift.", vi: "Gián điệp công nghiệp tố giác bạn mua thuật toán bất hợp pháp! Bị phạt nặng và mất thị phần." } } },
      { id: "c2", text: { en: "Report them (Gain PR)", vi: "Báo cáo nội bộ (Được tiếng thơm)" }, effect: { playerMoneyDelta: 150, botMoneyDelta: 0 }, outcome: { en: "The public praises your integrity, boosting your sales.", vi: "Công chúng ca ngợi sự chính trực của bạn, giúp tăng doanh số." } }
    ]
  },
  {
    id: "e3_gov_subsidies",
    title: { en: "Government Subsidies", vi: "Trợ Cấp Chính Phủ" },
    description: {
      en: "The Mega-City council is offering tech subsidies. How do you apply?",
      vi: "Hội đồng siêu đô thị đang cung cấp gói trợ cấp công nghệ. Bạn đăng ký thế nào?"
    },
    choices: [
      { id: "c1", text: { en: "Aggressive lobbying (-$100)", vi: "Vận động hành lang mạnh (-100$)" }, effect: { playerMoneyDelta: 300, botMoneyDelta: 0 }, outcome: { en: "Your lobbyist secured the lion's share of the subsidy fund.", vi: "Người vận động hành lang của bạn đã chiếm được phần lớn quỹ trợ cấp." } },
      { id: "c2", text: { en: "Standard application", vi: "Đăng ký theo quy trình chuẩn" }, effect: { playerMoneyDelta: 120, botMoneyDelta: 120 }, outcome: { en: "Both companies received a standard subsidy payout.", vi: "Cả hai công ty đều nhận được khoản trợ cấp tiêu chuẩn." } }
    ]
  },
  {
    id: "e4_ai_rogue",
    title: { en: "Rogue AI Detected", vi: "AI Nổi Loạn" },
    description: {
      en: "An autonomous trading AI is manipulating the market, draining funds.",
      vi: "Một AI giao dịch tự trị đang thao túng thị trường, bòn rút quỹ của cả hai."
    },
    choices: [
      { id: "c1", text: { en: "Deploy Hunter Virus (-$120)", vi: "Tung Virus Săn Lùng (-120$)" }, effect: { playerMoneyDelta: -120, botMoneyDelta: -250 }, outcome: { en: "Your virus neutralized the AI but infected your rival's systems.", vi: "Virus của bạn đã vô hiệu hóa AI nhưng lây nhiễm sang hệ thống của đối thủ." }, karmaRisk: { probability: 0.25, penalty: -300, botReward: 150, message: { en: "Your virus mutated and targeted your own mainframes! Rivals capitalized on the downtime.", vi: "Virus của bạn bị đột biến và tấn công ngược lại bạn! Đối thủ chớp thời cơ lôi kéo khách hàng." } } },
      { id: "c2", text: { en: "Do nothing", vi: "Mặc kệ nó" }, effect: { playerMoneyDelta: -200, botMoneyDelta: -200 }, outcome: { en: "The rogue AI siphoned funds indiscriminately from everyone.", vi: "AI nổi loạn đã bòn rút tiền một cách bừa bãi từ tất cả mọi người." } }
    ]
  },
  {
    id: "e5_market_boom",
    title: { en: "Sudden Market Boom", vi: "Thị Trường Bùng Nổ" },
    description: {
      en: "Consumer demand skyrockets due to a viral trend.",
      vi: "Nhu cầu tiêu dùng tăng vọt nhờ một trào lưu trên mạng."
    },
    choices: [
      { id: "c1", text: { en: "Capitalize immediately", vi: "Tận dụng ngay lập tức" }, effect: { playerMoneyDelta: 350, botMoneyDelta: 350 }, outcome: { en: "A rising tide lifts all boats. Huge profits for both sides.", vi: "Nước lên thuyền lên. Lợi nhuận khổng lồ cho cả hai bên." } },
      { id: "c2", text: { en: "Sabotage your rival's ads (-$50)", vi: "Phá hoại quảng cáo của đối thủ (-50$)" }, effect: { playerMoneyDelta: 250, botMoneyDelta: -100 }, outcome: { en: "You hijacked their ad space, taking their share of the boom.", vi: "Bạn đã chiếm đoạt không gian quảng cáo của họ, nẫng tay trên phần lợi nhuận." } }
    ]
  },
  {
    id: "e6_hacker_ransom",
    title: { en: "Ransomware Attack", vi: "Bị Tống Tiền" },
    description: {
      en: "Hackers have locked your databases. They demand a ransom.",
      vi: "Hacker đã khóa cơ sở dữ liệu của bạn và đòi tiền chuộc."
    },
    choices: [
      { id: "c1", text: { en: "Pay ransom (-$300)", vi: "Trả tiền chuộc (-300$)" }, effect: { playerMoneyDelta: -300, botMoneyDelta: 0 }, outcome: { en: "You paid the ransom. Operations resumed quickly.", vi: "Bạn đã trả tiền chuộc. Hoạt động được khôi phục nhanh chóng." } },
      { id: "c2", text: { en: "Try to decrypt (Risky)", vi: "Cố gắng giải mã (Rủi ro)" }, effect: { playerMoneyDelta: -450, botMoneyDelta: 0 }, outcome: { en: "The decryption failed, costing you immense recovery fees.", vi: "Quá trình giải mã thất bại, khiến bạn tốn khoản phí phục hồi khổng lồ." } }
    ]
  },
  {
    id: "e7_leak",
    title: { en: "Data Leak", vi: "Rò Rỉ Dữ Liệu" },
    description: {
      en: "your rival's private financial records were leaked online.",
      vi: "Hồ sơ tài chính mật của đối thủ bị rò rỉ trên mạng."
    },
    choices: [
      { id: "c1", text: { en: "Exploit the data", vi: "Trục lợi từ dữ liệu này" }, effect: { playerMoneyDelta: 240, botMoneyDelta: -240 }, outcome: { en: "You used the leaked data to undercut their margins perfectly.", vi: "Bạn đã dùng dữ liệu rò rỉ để chèn ép biên lợi nhuận của họ một cách hoàn hảo." } },
      { id: "c2", text: { en: "Tip them off (Gain trust)", vi: "Báo cho họ (Lấy lòng tin)" }, effect: { playerMoneyDelta: 0, botMoneyDelta: 150 }, outcome: { en: "your rival stabilized their systems and gained a PR boost from your help.", vi: "đối thủ đã ổn định hệ thống và tăng cường uy tín nhờ sự giúp đỡ của bạn." } }
    ]
  },
  {
    id: "e8_union_strike",
    title: { en: "Worker Strike", vi: "Đình Công" },
    description: {
      en: "Delivery drone operators are striking for better battery allocations.",
      vi: "Người vận hành drone giao hàng đang đình công đòi phân bổ pin tốt hơn."
    },
    choices: [
      { id: "c1", text: { en: "Concede to demands (-$180)", vi: "Chấp nhận yêu sách (-180$)" }, effect: { playerMoneyDelta: -180, botMoneyDelta: 0 }, outcome: { en: "The workers returned to their posts, though the concession was costly.", vi: "Công nhân đã quay lại làm việc, dù sự nhượng bộ khá tốn kém." } },
      { id: "c2", text: { en: "Automate entirely (-$450)", vi: "Tự động hóa hoàn toàn (-450$)" }, effect: { playerMoneyDelta: -450, botMoneyDelta: -60 }, outcome: { en: "Full automation was a brutal, expensive shift that shocked the market.", vi: "Tự động hóa hoàn toàn là một bước chuyển tàn nhẫn và đắt đỏ, gây chấn động thị trường." } }
    ]
  },
  {
    id: "e9_pr_disaster",
    title: { en: "PR Disaster", vi: "Thảm Họa Truyền Thông" },
    description: {
      en: "A fake news campaign targets both companies.",
      vi: "Một chiến dịch tin giả nhắm vào cả hai công ty."
    },
    choices: [
      { id: "c1", text: { en: "Joint press release", vi: "Họp báo chung" }, effect: { playerMoneyDelta: -90, botMoneyDelta: -90 }, outcome: { en: "A unified front mitigated the worst of the reputational damage.", vi: "Sự đoàn kết đã giảm thiểu phần lớn thiệt hại về danh tiếng." } },
      { id: "c2", text: { en: "Shift blame to your rival", vi: "Đổ lỗi cho đối thủ" }, effect: { playerMoneyDelta: -30, botMoneyDelta: -270 }, outcome: { en: "Your scapegoating tactic worked, burying your rival under bad press.", vi: "Chiến thuật đổ lỗi của bạn đã hiệu quả, vùi dập đối thủ trong bão dư luận." }, karmaRisk: { probability: 0.4, penalty: -250, botReward: 250, message: { en: "Investigative journalists uncovered your smear campaign! Public outrage shifts the market.", vi: "Nhà báo điều tra lật tẩy chiến dịch bôi nhọ của bạn! Dư luận phẫn nộ và quay lưng." } } }
    ]
  },
  {
    id: "e10_black_market",
    title: { en: "Black Market Deal", vi: "Giao Dịch Chợ Đen" },
    description: {
      en: "A shadowy figure offers cheap, smuggled server components.",
      vi: "Một kẻ bí ẩn chào bán linh kiện máy chủ buôn lậu giá rẻ."
    },
    choices: [
      { id: "c1", text: { en: "Buy them (-$150)", vi: "Mua ngay (-150$)" }, effect: { playerMoneyDelta: 360, botMoneyDelta: 0 }, outcome: { en: "The components were extremely efficient, boosting your processing power.", vi: "Linh kiện cực kỳ hiệu quả, giúp tăng cường mạnh mẽ sức mạnh xử lý của bạn." } },
      { id: "c2", text: { en: "Refuse", vi: "Từ chối" }, effect: { playerMoneyDelta: 0, botMoneyDelta: 0 }, outcome: { en: "You played it safe and avoided potential legal trouble.", vi: "Bạn chọn cách an toàn và tránh được những rắc rối pháp lý tiềm ẩn." } }
    ]
  },
  {
    id: "e11_tax_audit",
    title: { en: "Surprise Audit", vi: "Kiểm Toán Đột Xuất" },
    description: {
      en: "The Omni-Gov tax agency is auditing your sector.",
      vi: "Cơ quan thuế Omni-Gov đang kiểm toán khu vực của bạn."
    },
    choices: [
      { id: "c1", text: { en: "Bribe auditor (-$240)", vi: "Hối lộ kiểm toán viên (-240$)" }, effect: { playerMoneyDelta: -240, botMoneyDelta: -300 }, outcome: { en: "You bribed your way out, leaving your rival to face the full audit penalty.", vi: "Bạn đã hối lộ để thoát thân, để lại đối thủ hứng chịu toàn bộ hình phạt kiểm toán." }, karmaRisk: { probability: 0.5, penalty: -500, botReward: 100, message: { en: "The Omni-Gov Anti-Corruption Bureau caught your auditor! Massive fines issued.", vi: "Cục Chống Tham Nhũng tóm được viên kiểm toán của bạn! Khoản tiền phạt khổng lồ được giáng xuống." } } },
      { id: "c2", text: { en: "Pay fines cleanly", vi: "Nộp phạt minh bạch" }, effect: { playerMoneyDelta: -360, botMoneyDelta: -360 }, outcome: { en: "Both corporations were heavily fined for aggressive tax avoidance.", vi: "Cả hai tập đoàn đều bị phạt nặng vì hành vi trốn thuế tinh vi." } }
    ]
  },
  {
    id: "e12_crypto_crash",
    title: { en: "Crypto Crash", vi: "Crypto Sập Sàn" },
    description: {
      en: "The underlying currency network experiences a flash crash.",
      vi: "Mạng lưới tiền tệ cơ sở gặp phải một đợt sập sàn chớp nhoáng."
    },
    choices: [
      { id: "c1", text: { en: "Buy the dip (-$300)", vi: "Bắt đáy (-300$)" }, effect: { playerMoneyDelta: 450, botMoneyDelta: 0 }, outcome: { en: "A risky bet paid off handsomely when the market rebounded.", vi: "Một ván cược rủi ro đã mang lại lợi nhuận hậu hĩnh khi thị trường phục hồi." } },
      { id: "c2", text: { en: "Panic sell", vi: "Bán tháo hoảng loạn" }, effect: { playerMoneyDelta: -180, botMoneyDelta: 0 }, outcome: { en: "You locked in your losses before the market could recover.", vi: "Bạn đã chốt lỗ ngay trước khi thị trường kịp phục hồi." } }
    ]
  },
  {
    id: "e13_new_tech",
    title: { en: "Quantum Algorithm", vi: "Thuật Toán Lượng Tử" },
    description: {
      en: "A new quantum pricing algorithm is open-sourced.",
      vi: "Một thuật toán định giá lượng tử mới vừa được mã nguồn mở."
    },
    choices: [
      { id: "c1", text: { en: "Integrate it (-$210)", vi: "Tích hợp nó (-210$)" }, effect: { playerMoneyDelta: 420, botMoneyDelta: 180 }, outcome: { en: "Early integration gave you a massive technological edge.", vi: "Việc tích hợp sớm đã mang lại cho bạn một lợi thế công nghệ to lớn." } },
      { id: "c2", text: { en: "Ignore it", vi: "Bỏ qua" }, effect: { playerMoneyDelta: 0, botMoneyDelta: 420 }, outcome: { en: "You ignored the tech, and your rival capitalized on it perfectly.", vi: "Bạn phớt lờ công nghệ này, và đối thủ đã tận dụng nó một cách hoàn hảo." } }
    ]
  },
  {
    id: "e14_mole",
    title: { en: "The Mole", vi: "Kẻ Chỉ Điểm" },
    description: {
      en: "You discover a your rival spy in your engineering team.",
      vi: "Bạn phát hiện một gián điệp của đối thủ trong đội ngũ kỹ sư."
    },
    choices: [
      { id: "c1", text: { en: "Feed false intel", vi: "Tuồn tin giả" }, effect: { playerMoneyDelta: 240, botMoneyDelta: -150 }, outcome: { en: "The false intel tricked your rival into a disastrous product launch.", vi: "Tin giả đã lừa đối thủ tung ra một sản phẩm thảm họa." } },
      { id: "c2", text: { en: "Fire them immediately", vi: "Sa thải ngay lập tức" }, effect: { playerMoneyDelta: 60, botMoneyDelta: 0 }, outcome: { en: "You purged the threat cleanly, securing your internal systems.", vi: "Bạn đã loại bỏ triệt để mối đe dọa, bảo mật lại hệ thống nội bộ." } }
    ]
  },
  {
    id: "e15_celeb_endorsement",
    title: { en: "Cyber-Celeb Endorsement", vi: "Idol Ảo Quảng Cáo" },
    description: {
      en: "A famous virtual idol mentions your brand.",
      vi: "Một thần tượng ảo nổi tiếng vừa nhắc đến thương hiệu của bạn."
    },
    choices: [
      { id: "c1", text: { en: "Sponsor them (-$360)", vi: "Tài trợ cho họ (-360$)" }, effect: { playerMoneyDelta: 750, botMoneyDelta: -90 }, outcome: { en: "The sponsorship went viral, generating astronomical returns.", vi: "Bản hợp đồng tài trợ trở thành hiện tượng mạng, tạo ra lợi nhuận khổng lồ." } },
      { id: "c2", text: { en: "Just say thanks", vi: "Chỉ gửi lời cảm ơn" }, effect: { playerMoneyDelta: 180, botMoneyDelta: 0 }, outcome: { en: "A polite acknowledgement got you some free, moderate publicity.", vi: "Một lời cảm ơn lịch sự mang lại cho bạn chút danh tiếng miễn phí." } }
    ]
  },
  {
    id: "e16_supply_chain",
    title: { en: "Supply Chain Crisis", vi: "Khủng Hoảng Chuỗi Cung Ứng" },
    description: {
      en: "Neon-gas shortages affect chip manufacturing.",
      vi: "Thiếu hụt khí Neon ảnh hưởng đến việc sản xuất chip."
    },
    choices: [
      { id: "c1", text: { en: "Hoard supplies (-$270)", vi: "Đầu cơ tích trữ (-270$)" }, effect: { playerMoneyDelta: 150, botMoneyDelta: -300 }, outcome: { en: "Your hoarding caused your rival's production lines to stall completely.", vi: "Hành động đầu cơ của bạn khiến dây chuyền sản xuất của đối thủ đình trệ hoàn toàn." } },
      { id: "c2", text: { en: "Share with your rival", vi: "Chia sẻ với đối thủ" }, effect: { playerMoneyDelta: -90, botMoneyDelta: -90 }, outcome: { en: "Cooperation eased the crisis, minimizing losses for both sides.", vi: "Sự hợp tác đã xoa dịu cuộc khủng hoảng, giảm thiểu thiệt hại cho cả hai bên." } }
    ]
  },
  {
    id: "e17_power_outage",
    title: { en: "Grid Failure", vi: "Mất Điện Toàn Cục" },
    description: {
      en: "Sector 4 loses power. Offline sales plummet.",
      vi: "Khu vực 4 bị mất điện. Doanh số ngoại tuyến giảm thê thảm."
    },
    choices: [
      { id: "c1", text: { en: "Deploy generators (-$120)", vi: "Triển khai máy phát điện (-120$)" }, effect: { playerMoneyDelta: 60, botMoneyDelta: -180 }, outcome: { en: "You kept your lights on, stealing all offline customers from your rival.", vi: "Bạn giữ được nguồn điện, cuỗm sạch khách hàng ngoại tuyến từ tay đối thủ." } },
      { id: "c2", text: { en: "Conserve energy", vi: "Tiết kiệm năng lượng" }, effect: { playerMoneyDelta: -150, botMoneyDelta: -150 }, outcome: { en: "Both companies suffered heavy losses during the blackout.", vi: "Cả hai công ty đều chịu tổn thất nặng nề trong thời gian mất điện." } }
    ]
  },
  {
    id: "e18_charity",
    title: { en: "Charity Gala", vi: "Dạ Tiệc Từ Thiện" },
    description: {
      en: "The Mayor is hosting a charity gala for tech orphans.",
      vi: "Thị trưởng tổ chức dạ tiệc từ thiện cho trẻ mồ côi công nghệ."
    },
    choices: [
      { id: "c1", text: { en: "Donate generously (-$300)", vi: "Quyên góp hào phóng (-300$)" }, effect: { playerMoneyDelta: -300, botMoneyDelta: -150 }, outcome: { en: "Your massive donation pressured your rival to overspend to save face.", vi: "Khoản quyên góp khổng lồ của bạn buộc đối thủ phải chi đậm để giữ thể diện." } },
      { id: "c2", text: { en: "Ignore it", vi: "Phớt lờ" }, effect: { playerMoneyDelta: -120, botMoneyDelta: 0 }, outcome: { en: "The public frowned upon your stinginess, slightly hurting sales.", vi: "Công chúng phẫn nộ vì sự keo kiệt của bạn, làm giảm nhẹ doanh số." } }
    ]
  },
  {
    id: "e19_bounty",
    title: { en: "Bug Bounty", vi: "Săn Tiền Thưởng Lỗi" },
    description: {
      en: "A critical exploit is found in your firewall.",
      vi: "Một lỗ hổng nghiêm trọng được tìm thấy trong tường lửa của bạn."
    },
    choices: [
      { id: "c1", text: { en: "Pay the hacker (-$240)", vi: "Trả tiền cho hacker (-240$)" }, effect: { playerMoneyDelta: -240, botMoneyDelta: 0 }, outcome: { en: "You paid the bounty, swiftly securing your systems before any damage occurred.", vi: "Bạn đã trả tiền thưởng, nhanh chóng bảo mật hệ thống trước khi có thiệt hại." } },
      { id: "c2", text: { en: "Patch it internally", vi: "Tự vá lỗi nội bộ" }, effect: { playerMoneyDelta: -450, botMoneyDelta: 0 }, outcome: { en: "The internal patch took too long. Hackers exploited it, causing severe damage.", vi: "Việc vá lỗi nội bộ mất quá nhiều thời gian. Hacker đã kịp khai thác, gây thiệt hại nặng." } }
    ]
  },
  {
    id: "e20_merger_rumor",
    title: { en: "Merger Rumors", vi: "Tin Đồn Sáp Nhập" },
    description: {
      en: "Rumors spread that you and your rival are merging.",
      vi: "Tin đồn lan truyền rằng bạn và đối thủ đang sáp nhập."
    },
    choices: [
      { id: "c1", text: { en: "Deny aggressively", vi: "Phủ nhận gay gắt" }, effect: { playerMoneyDelta: 120, botMoneyDelta: -120 }, outcome: { en: "Your aggressive denial reassured investors, while destabilizing your rival's stock.", vi: "Sự phủ nhận gay gắt đã trấn an nhà đầu tư của bạn, đồng thời làm lung lay cổ phiếu đối thủ." } },
      { id: "c2", text: { en: "Fuel the rumors", vi: "Thêm dầu vào lửa" }, effect: { playerMoneyDelta: 300, botMoneyDelta: 300 }, outcome: { en: "Speculators went wild. Both companies profited massively from the hype.", vi: "Giới đầu cơ phát cuồng. Cả hai công ty đều thu lợi khổng lồ từ sự cường điệu này." } }
    ]
  },
  {
    id: "e21",
    title: { en: "Drone Strike Hijack", vi: "Cướp Máy Bay Không Người Lái" },
    description: { en: "Hackers took over your rival's delivery drones. You can either buy the stolen goods or report the hackers.", vi: "Hacker đã chiếm quyền điều khiển drone giao hàng của đối thủ. Bạn có thể mua hàng ăn cắp hoặc báo cáo chúng." },
    choices: [
      { id: "c1", text: { en: "Buy the goods", vi: "Mua hàng" }, effect: { playerMoneyDelta: 450, botMoneyDelta: -600 }, outcome: { en: "You bought their stock at a massive discount. your rival suffered a heavy loss.", vi: "Bạn mua được kho hàng với giá bèo bọt. đối thủ thiệt hại nặng nề." } },
      { id: "c2", text: { en: "Report them", vi: "Báo cáo" }, effect: { playerMoneyDelta: 150, botMoneyDelta: 150 }, outcome: { en: "The authorities rewarded you. your rival recovered their goods.", vi: "Chính quyền thưởng cho bạn. đối thủ thu hồi được hàng hóa." } }
    ]
  },
  {
    id: "e22",
    title: { en: "Neural Network Crash", vi: "Sập Mạng Lưới Thần Kinh" },
    description: { en: "A massive solar flare knocked out the global neural net. Do you spend reserves to restore yours first?", vi: "Một đợt lốc xoáy mặt trời đã làm sập mạng lưới thần kinh toàn cầu. Bạn có chi tiền dự trữ để khôi phục trước không?" },
    choices: [
      { id: "c1", text: { en: "Use reserves", vi: "Dùng quỹ dự trữ" }, effect: { playerMoneyDelta: -300, botMoneyDelta: -450 }, outcome: { en: "You got back online quickly, scooping up stranded customers.", vi: "Bạn trực tuyến trở lại nhanh chóng, thu gom được lượng lớn khách hàng bị kẹt." } },
      { id: "c2", text: { en: "Wait it out", vi: "Chờ đợi" }, effect: { playerMoneyDelta: -150, botMoneyDelta: -150 }, outcome: { en: "Both companies lost revenue during the long blackout.", vi: "Cả hai công ty đều mất doanh thu trong thời gian mất điện dài." } }
    ]
  },
  {
    id: "e23",
    title: { en: "Orbital Debris Fall", vi: "Mảnh Vỡ Quỹ Đạo Rơi" },
    description: { en: "Space junk is on a collision course with your rival's HQ. Do you warn them or let it hit?", vi: "Rác vũ trụ đang rơi thẳng vào trụ sở đối thủ. Bạn cảnh báo họ hay để nó rơi trúng?" },
    choices: [
      { id: "c1", text: { en: "Warn them", vi: "Cảnh báo" }, effect: { playerMoneyDelta: 0, botMoneyDelta: -150 }, outcome: { en: "They activated their shields in time, but the evasion still cost them.", vi: "Họ kịp kích hoạt lá chắn, nhưng việc né tránh vẫn làm họ tốn kém." } },
      { id: "c2", text: { en: "Stay silent", vi: "Giữ im lặng" }, effect: { playerMoneyDelta: 600, botMoneyDelta: -900 }, outcome: { en: "your rival HQ was heavily damaged! You absorbed their market share.", vi: "Trụ sở đối thủ bị hư hại nặng! Bạn thâu tóm thị phần của họ." } }
    ]
  },
  {
    id: "e24",
    title: { en: "VIP Defection", vi: "Sự Đào Tẩu Của VIP" },
    description: { en: "A lead engineer from your rival wants to defect to your company with secret blueprints.", vi: "Một kỹ sư trưởng của đối thủ muốn đào tẩu sang công ty bạn mang theo bản thiết kế bí mật." },
    choices: [
      { id: "c1", text: { en: "Welcome him", vi: "Chào đón anh ta" }, effect: { playerMoneyDelta: 450, botMoneyDelta: -300 }, outcome: { en: "The secrets were incredibly valuable. your rival was left scrambling.", vi: "Các bí mật này cực kì giá trị. đối thủ rơi vào cảnh hỗn loạn." } },
      { id: "c2", text: { en: "Reject him", vi: "Từ chối" }, effect: { playerMoneyDelta: 0, botMoneyDelta: 150 }, outcome: { en: "He returned to your rival and got promoted.", vi: "Anh ta quay lại đối thủ và được thăng chức." } }
    ]
  },
  {
    id: "e25",
    title: { en: "Illegal Tech Smuggling", vi: "Buôn Lậu Công Nghệ Cấm" },
    description: { en: "You found a lucrative but illegal cybernetics shipment. Do you intercept it?", vi: "Bạn tìm thấy một chuyến hàng sinh cơ học béo bở nhưng bất hợp pháp. Bạn có chặn thu nó không?" },
    choices: [
      { id: "c1", text: { en: "Intercept", vi: "Chặn thu" }, effect: { playerMoneyDelta: 600, botMoneyDelta: 0 }, outcome: { en: "You sold the parts on the black market for a massive profit.", vi: "Bạn bán các bộ phận này ở chợ đen với lợi nhuận khổng lồ." } },
      { id: "c2", text: { en: "Report to police", vi: "Báo cảnh sát" }, effect: { playerMoneyDelta: 150, botMoneyDelta: 0 }, outcome: { en: "You received a small bounty from the Megacity Police Department.", vi: "Bạn nhận được tiền thưởng nhỏ từ Sở Cảnh sát Megacity." } }
    ]
  },
  {
    id: "e26",
    title: { en: "Subliminal Ads", vi: "Quảng Cáo Tiềm Thức" },
    description: { en: "A rogue marketing firm offers to embed your brand into citizens' dreams. It's unethical but highly effective.", vi: "Một công ty marketing mờ ám đề nghị cấy thương hiệu của bạn vào giấc mơ của người dân. Phi đạo đức nhưng cực kỳ hiệu quả." },
    choices: [
      { id: "c1", text: { en: "Do it", vi: "Làm thôi" }, effect: { playerMoneyDelta: 750, botMoneyDelta: -300 }, outcome: { en: "Sales skyrocketed. Citizens don't know why they love your products, but they do.", vi: "Doanh số tăng vọt. Công dân không biết tại sao họ thích sản phẩm của bạn, nhưng họ thích." } },
      { id: "c2", text: { en: "Refuse", vi: "Từ chối" }, effect: { playerMoneyDelta: 0, botMoneyDelta: 0 }, outcome: { en: "You kept your hands clean, but gained nothing.", vi: "Bạn giữ tay mình sạch sẽ, nhưng chẳng được lợi gì." } }
    ]
  },
  {
    id: "e27",
    title: { en: "Crypto Crash", vi: "Sụp Đổ Crypto" },
    description: { en: "The Neo-Credit market just collapsed. Both companies are bleeding funds.", vi: "Thị trường Neo-Credit vừa sụp đổ. Cả hai công ty đều đang chảy máu dòng tiền." },
    choices: [
      { id: "c1", text: { en: "Bailout protocol", vi: "Giao thức cứu trợ" }, effect: { playerMoneyDelta: -450, botMoneyDelta: -450 }, outcome: { en: "You spent heavily to stabilize your own currency reserves.", vi: "Bạn chi đậm để ổn định dự trữ tiền tệ của mình." } },
      { id: "c2", text: { en: "Short the market", vi: "Bán khống thị trường" }, effect: { playerMoneyDelta: 300, botMoneyDelta: -600 }, outcome: { en: "You ruthlessly profited from the crash, leaving your rival to burn.", vi: "Bạn tàn nhẫn kiếm lời từ cú sập, mặc kệ đối thủ bốc cháy." } }
    ]
  },
  {
    id: "e28",
    title: { en: "Quantum Decryption", vi: "Giải Mã Lượng Tử" },
    description: { en: "Your R&D lab built a quantum decryptor capable of stealing your rival's data.", vi: "Phòng R&D của bạn đã chế tạo bộ giải mã lượng tử có khả năng đánh cắp dữ liệu của đối thủ." },
    choices: [
      { id: "c1", text: { en: "Steal data", vi: "Đánh cắp dữ liệu" }, effect: { playerMoneyDelta: 450, botMoneyDelta: -450 }, outcome: { en: "You stole their client list and launched a devastating ad campaign.", vi: "Bạn đánh cắp danh sách khách hàng và tung chiến dịch quảng cáo tàn phá." } },
      { id: "c2", text: { en: "Patent it instead", vi: "Đăng ký bản quyền thay thế" }, effect: { playerMoneyDelta: 300, botMoneyDelta: 0 }, outcome: { en: "You made a solid profit selling the tech to the government.", vi: "Bạn kiếm bộn tiền nhờ bán công nghệ này cho chính phủ." } }
    ]
  },
  {
    id: "e29",
    title: { en: "Rogue AI Assistant", vi: "Trợ Lý AI Nổi Loạn" },
    description: { en: "Your newest line of AI assistants started insulting customers and destroying furniture.", vi: "Dòng trợ lý AI mới nhất của bạn bắt đầu lăng mạ khách hàng và phá hủy đồ đạc." },
    choices: [
      { id: "c1", text: { en: "Recall them", vi: "Thu hồi" }, effect: { playerMoneyDelta: -300, botMoneyDelta: 150 }, outcome: { en: "The recall was expensive, and your rival capitalized on your blunder.", vi: "Việc thu hồi rất tốn kém, và đối thủ đã tận dụng sai lầm của bạn." } },
      { id: "c2", text: { en: "Rebrand as 'Edgy AI'", vi: "Đổi tên thành 'AI Cực Chất'" }, effect: { playerMoneyDelta: 150, botMoneyDelta: -150 }, outcome: { en: "Miraculously, it became a trend. People love rude robots now.", vi: "Kì diệu thay, nó trở thành xu hướng. Giờ mọi người thích robot thô lỗ." } }
    ]
  },
  {
    id: "e30",
    title: { en: "Synthetic Food Poisoning", vi: "Ngộ Độc Thực Phẩm Tổng Hợp" },
    description: { en: "your rival's synthetic protein vats have been tainted. Do you expose them to the media?", vi: "Các bồn protein tổng hợp của đối thủ bị ô nhiễm. Bạn có phơi bày họ trước truyền thông không?" },
    choices: [
      { id: "c1", text: { en: "Expose them", vi: "Phơi bày" }, effect: { playerMoneyDelta: 300, botMoneyDelta: -450 }, outcome: { en: "Their stocks plummeted and customers flocked to your safe alternatives.", vi: "Cổ phiếu của họ lao dốc và khách hàng đổ xô sang lựa chọn an toàn của bạn." } },
      { id: "c2", text: { en: "Blackmail them", vi: "Tống tiền" }, effect: { playerMoneyDelta: 450, botMoneyDelta: -450 }, outcome: { en: "They paid you quietly to keep your mouth shut.", vi: "Họ âm thầm trả tiền để bạn ngậm miệng." } }
    ]
  },
  {
    id: "e31",
    title: { en: "Underground Cyber-Brawl", vi: "Đấu Trường Cyber Ngầm" },
    description: { en: "An illegal fighting ring is using your experimental combat cyberware.", vi: "Một võ đài bất hợp pháp đang sử dụng thiết bị sinh cơ học chiến đấu thử nghiệm của bạn." },
    choices: [
      { id: "c1", text: { en: "Sponsor them", vi: "Tài trợ họ" }, effect: { playerMoneyDelta: 300, botMoneyDelta: 0 }, outcome: { en: "The brutal fights served as a perfect, highly-watched marketing stunt.", vi: "Các trận đấu đẫm máu trở thành một chiêu trò quảng cáo hoàn hảo, được xem nhiều." } },
      { id: "c2", text: { en: "Shut it down", vi: "Dẹp bỏ" }, effect: { playerMoneyDelta: -150, botMoneyDelta: 0 }, outcome: { en: "You lost the tech, but avoided a massive PR disaster.", vi: "Bạn mất công nghệ, nhưng tránh được thảm họa PR lớn." } }
    ]
  },
  {
    id: "e32",
    title: { en: "Megacity Tax Audit", vi: "Kiểm Toán Thuế Megacity" },
    description: { en: "The terrifying Megacity IRS is knocking on your door. Time to hide the funds.", vi: "Sở thuế Megacity đáng sợ đang gõ cửa. Đã đến lúc giấu tiền." },
    choices: [
      { id: "c1", text: { en: "Bribe the auditor", vi: "Hối lộ kiểm toán viên" }, effect: { playerMoneyDelta: -300, botMoneyDelta: 0 }, outcome: { en: "It was costly, but better than having your hidden assets seized.", vi: "Tuy tốn kém nhưng còn hơn là bị tịch thu tài sản giấu kín." } },
      { id: "c2", text: { en: "Pin it on your rival", vi: "Đổ tội cho đối thủ" }, effect: { playerMoneyDelta: 0, botMoneyDelta: -600 }, outcome: { en: "You forged documents linking the tax fraud to your rival. They got raided.", vi: "Bạn làm giả tài liệu liên kết vụ trốn thuế với đối thủ. Họ bị đột kích." } }
    ]
  },
  {
    id: "e33",
    title: { en: "Corporate Espionage", vi: "Gián Điệp Thương Mại" },
    description: { en: "You've captured a your rival spy in your server room.", vi: "Bạn bắt được một điệp viên của đối thủ trong phòng máy chủ." },
    choices: [
      { id: "c1", text: { en: "Turn him into a double agent", vi: "Biến thành điệp viên hai mang" }, effect: { playerMoneyDelta: 450, botMoneyDelta: -450 }, outcome: { en: "He fed your rival false data, ruining their next product launch.", vi: "Hắn cung cấp dữ liệu giả cho đối thủ, hủy hoại đợt ra mắt sản phẩm tiếp theo của họ." } },
      { id: "c2", text: { en: "Extract ransom", vi: "Đòi tiền chuộc" }, effect: { playerMoneyDelta: 300, botMoneyDelta: -300 }, outcome: { en: "your rival paid a hefty sum to quietly get their operative back.", vi: "đối thủ trả khoản tiền lớn để âm thầm nhận lại đặc vụ." } }
    ]
  },
  {
    id: "e34",
    title: { en: "Neon Drug Cartel", vi: "Băng Đảng Thuốc Neon" },
    description: { en: "A powerful cartel wants to use your transport network to move 'Digital Bliss'.", vi: "Một băng đảng quyền lực muốn dùng mạng lưới vận tải của bạn để chuyển hàng 'Digital Bliss'." },
    choices: [
      { id: "c1", text: { en: "Accept the deal", vi: "Chấp nhận thỏa thuận" }, effect: { playerMoneyDelta: 600, botMoneyDelta: 0 }, outcome: { en: "Dirty money is still money. The profits were astronomical.", vi: "Tiền bẩn vẫn là tiền. Lợi nhuận cao ngất ngưởng." } },
      { id: "c2", text: { en: "Refuse", vi: "Từ chối" }, effect: { playerMoneyDelta: -300, botMoneyDelta: 0 }, outcome: { en: "The cartel retaliated by blowing up three of your cargo ships.", vi: "Băng đảng trả đũa bằng cách nổ tung ba tàu chở hàng của bạn." } }
    ]
  },
  {
    id: "e35",
    title: { en: "Space Elevator Malfunction", vi: "Trục Trặc Thang Máy Vũ Trụ" },
    description: { en: "The main space elevator broke, delaying shipments for everyone.", vi: "Thang máy vũ trụ chính bị hỏng, làm chậm trễ chuyến hàng của tất cả." },
    choices: [
      { id: "c1", text: { en: "Charter smuggler ships", vi: "Thuê tàu buôn lậu" }, effect: { playerMoneyDelta: -150, botMoneyDelta: -450 }, outcome: { en: "You paid a premium to bypass the delay, while your rival was left waiting.", vi: "Bạn trả thêm tiền để vượt qua sự chậm trễ, trong khi đối thủ phải chờ đợi." } },
      { id: "c2", text: { en: "Accept the loss", vi: "Chấp nhận tổn thất" }, effect: { playerMoneyDelta: -300, botMoneyDelta: -300 }, outcome: { en: "Both companies suffered heavy supply chain disruptions.", vi: "Cả hai công ty đều chịu thiệt hại nặng về chuỗi cung ứng." } }
    ]
  },
  {
    id: "e36",
    title: { en: "Zero-G Racing Sponsorship", vi: "Tài Trợ Đua Xe Không Trọng Lực" },
    description: { en: "The galactic racing finals are here. Do you sponsor the favorite or the underdog?", vi: "Chung kết đua xe toàn dải ngân hà đã đến. Bạn tài trợ cho kẻ dẫn đầu hay kẻ cửa dưới?" },
    choices: [
      { id: "c1", text: { en: "The Favorite", vi: "Kẻ dẫn đầu" }, effect: { playerMoneyDelta: 300, botMoneyDelta: 0 }, outcome: { en: "A safe bet. Your brand was seen by billions.", vi: "Một vụ cá cược an toàn. Thương hiệu của bạn được hàng tỷ người thấy." } },
      { id: "c2", text: { en: "The Underdog", vi: "Kẻ cửa dưới" }, effect: { playerMoneyDelta: 750, botMoneyDelta: -300 }, outcome: { en: "The underdog pulled off a miracle win! Your brand skyrocketed.", vi: "Kẻ cửa dưới giành chiến thắng thần kỳ! Thương hiệu của bạn thăng hoa." } }
    ]
  },
  {
    id: "e37",
    title: { en: "AI Art Copyright Troll", vi: "Bản Quyền Nghệ Thuật AI" },
    description: { en: "An AI has copyrighted a specific shade of neon blue and is suing you.", vi: "Một AI đã đăng ký bản quyền một tông màu xanh neon cụ thể và đang kiện bạn." },
    choices: [
      { id: "c1", text: { en: "Settle out of court", vi: "Hòa giải ngoài tòa" }, effect: { playerMoneyDelta: -150, botMoneyDelta: 0 }, outcome: { en: "You paid the troll to go away. A frustrating loss.", vi: "Bạn trả tiền cho kẻ tống tiền để chúng biến đi. Một mất mát bực bội." } },
      { id: "c2", text: { en: "Hack and delete the AI", vi: "Hack và xóa sổ AI" }, effect: { playerMoneyDelta: 0, botMoneyDelta: -300 }, outcome: { en: "You destroyed the AI, and maliciously redirected its lawsuits to your rival.", vi: "Bạn tiêu diệt AI, và ác ý chuyển hướng các vụ kiện của nó sang đối thủ." } }
    ]
  },
  {
    id: "e38",
    title: { en: "Cyberware Recall", vi: "Thu Hồi Thiết Bị Cyber" },
    description: { en: "your rival's eye implants are causing hallucinations. Do you exploit it?", vi: "Cấy ghép mắt của đối thủ đang gây ảo giác. Bạn có lợi dụng điều này?" },
    choices: [
      { id: "c1", text: { en: "Launch 'SafeEyes' promo", vi: "Tung khuyến mãi 'Mắt An Toàn'" }, effect: { playerMoneyDelta: 450, botMoneyDelta: -600 }, outcome: { en: "Customers ripped out your rival's eyes to buy yours.", vi: "Khách hàng móc bỏ mắt của đối thủ để mua của bạn." } },
      { id: "c2", text: { en: "Sell them a patch", vi: "Bán bản vá lỗi cho họ" }, effect: { playerMoneyDelta: 300, botMoneyDelta: 150 }, outcome: { en: "You sold them the software fix. Both made money off the disaster.", vi: "Bạn bán cho họ phần mềm sửa lỗi. Cả hai đều kiếm tiền từ thảm họa này." } }
    ]
  },
  {
    id: "e39",
    title: { en: "Hacker Ransomware", vi: "Mã Độc Tống Tiền" },
    description: { en: "Your core banking servers are locked by a notorious hacker group.", vi: "Máy chủ ngân hàng cốt lõi của bạn bị khóa bởi một nhóm hacker khét tiếng." },
    choices: [
      { id: "c1", text: { en: "Pay the ransom", vi: "Trả tiền chuộc" }, effect: { playerMoneyDelta: -450, botMoneyDelta: 0 }, outcome: { en: "You paid a massive sum, but the data was recovered instantly.", vi: "Bạn trả một khoản tiền khổng lồ, nhưng dữ liệu được khôi phục ngay lập tức." } },
      { id: "c2", text: { en: "Wipe and rebuild", vi: "Xóa sạch và xây lại" }, effect: { playerMoneyDelta: -300, botMoneyDelta: 150 }, outcome: { en: "The downtime was brutal. your rival stole some of your clients.", vi: "Thời gian ngừng hoạt động thật tàn khốc. đối thủ đã cướp đi một số khách hàng của bạn." } }
    ]
  },
  {
    id: "e40",
    title: { en: "Memory Wipe Scandal", vi: "Bê Bối Tẩy Não" },
    description: { en: "A whistleblower claims your tech erases traumatic memories without consent.", vi: "Một người thổi còi khẳng định công nghệ của bạn xóa ký ức đau buồn mà không cần xin phép." },
    choices: [
      { id: "c1", text: { en: "Erase the whistleblower", vi: "Xóa sổ người thổi còi" }, effect: { playerMoneyDelta: -150, botMoneyDelta: 0 }, outcome: { en: "You spent funds on cleanup crews. The problem disappeared.", vi: "Bạn chi tiền cho đội dọn dẹp. Vấn đề đã biến mất." } },
      { id: "c2", text: { en: "Market it as a feature", vi: "Quảng cáo nó như một tính năng" }, effect: { playerMoneyDelta: 600, botMoneyDelta: -300 }, outcome: { en: "People actually LOVED the idea of forced forgetting. Sales boomed.", vi: "Mọi người THỰC SỰ THÍCH ý tưởng ép buộc quên lãng. Doanh số bùng nổ." } }
    ]
  },
  {
    id: "e41",
    title: { en: "Black Market Blueprint", vi: "Bản Thiết Kế Chợ Đen" },
    description: { en: "A shady merchant offers you the schematics for your rival's next-gen processor.", vi: "Một thương gia mờ ám bán cho bạn bản thiết kế bộ xử lý thế hệ tiếp theo của đối thủ." },
    choices: [
      { id: "c1", text: { en: "Buy it", vi: "Mua nó" }, effect: { playerMoneyDelta: 450, botMoneyDelta: -450 }, outcome: { en: "You beat them to market with their own technology.", vi: "Bạn đánh bại họ trên thị trường bằng chính công nghệ của họ." } },
      { id: "c2", text: { en: "It's a trap", vi: "Đó là bẫy" }, effect: { playerMoneyDelta: 0, botMoneyDelta: 0 }, outcome: { en: "You ignored the offer. Turns out, it was a your rival sting operation.", vi: "Bạn phớt lờ lời đề nghị. Hóa ra, đó là một chiến dịch giăng bẫy của đối thủ." } }
    ]
  },
  {
    id: "e42",
    title: { en: "Android Uprising", vi: "Cuộc Nổi Dậy Android" },
    description: { en: "Worker androids in your factories are demanding human rights.", vi: "Người máy công nhân trong nhà máy của bạn đang đòi quyền con người." },
    choices: [
      { id: "c1", text: { en: "EMP the factory", vi: "Kích nổ EMP nhà máy" }, effect: { playerMoneyDelta: -600, botMoneyDelta: 150 }, outcome: { en: "You destroyed millions in hardware to stop the revolt.", vi: "Bạn phá hủy hàng triệu phần cứng để ngăn chặn cuộc nổi dậy." } },
      { id: "c2", text: { en: "Grant them rights", vi: "Trao quyền cho chúng" }, effect: { playerMoneyDelta: -300, botMoneyDelta: -300 }, outcome: { en: "Labor costs increased, and the movement spread to your rival's factories too.", vi: "Chi phí nhân công tăng, và phong trào cũng lan sang cả nhà máy của đối thủ." } }
    ]
  },
  {
    id: "e43",
    title: { en: "Hovercar Crash", vi: "Tai Nạn Xe Bay" },
    description: { en: "Your CEO's hovercar crashed into a your rival billboard. It looks bad.", vi: "Xe bay của CEO bạn đâm sầm vào biển quảng cáo của đối thủ. Trông rất tệ." },
    choices: [
      { id: "c1", text: { en: "Blame autopilot", vi: "Đổ lỗi cho lái tự động" }, effect: { playerMoneyDelta: -150, botMoneyDelta: 0 }, outcome: { en: "Your stock dipped briefly, but PR managed to spin it.", vi: "Cổ phiếu giảm nhẹ, nhưng PR đã xoay sở thành công." } },
      { id: "c2", text: { en: "Sue your rival's billboard", vi: "Kiện biển quảng cáo của đối thủ" }, effect: { playerMoneyDelta: 300, botMoneyDelta: -300 }, outcome: { en: "Your lawyers successfully argued the billboard was too distracting.", vi: "Luật sư của bạn lập luận thành công rằng biển quảng cáo gây mất tập trung." } }
    ]
  },
  {
    id: "e44",
    title: { en: "Secret Military Contract", vi: "Hợp Đồng Quân Sự Bí Mật" },
    description: { en: "The government wants experimental orbital weapons. It's highly illegal under UN laws.", vi: "Chính phủ muốn vũ khí quỹ đạo thử nghiệm. Rất bất hợp pháp theo luật LHQ." },
    choices: [
      { id: "c1", text: { en: "Take the blood money", vi: "Nhận tiền máu" }, effect: { playerMoneyDelta: 900, botMoneyDelta: 0 }, outcome: { en: "The payout was staggering. Let's hope nobody finds out.", vi: "Khoản thanh toán thật đáng kinh ngạc. Hi vọng không ai phát hiện." } },
      { id: "c2", text: { en: "Leak it to the press", vi: "Tuồn tin cho báo chí" }, effect: { playerMoneyDelta: 0, botMoneyDelta: 0 }, outcome: { en: "You took the moral high ground. The contract was canceled.", vi: "Bạn chọn đứng trên đạo lý. Hợp đồng bị hủy." } }
    ]
  },
  {
    id: "e45",
    title: { en: "Deepfake Smear Campaign", vi: "Chiến Dịch Bôi Nhọ Bằng Deepfake" },
    description: { en: "your rival released a hyper-realistic deepfake of you kicking a cyborg puppy.", vi: "đối thủ tung video deepfake siêu thực cảnh bạn đá một con cún cyborg." },
    choices: [
      { id: "c1", text: { en: "Release a counter-fake", vi: "Tung fake đáp trả" }, effect: { playerMoneyDelta: 300, botMoneyDelta: -450 }, outcome: { en: "Your deepfake of their CEO eating a live rat went viral.", vi: "Video deepfake CEO của họ ăn chuột sống trở nên viral." } },
      { id: "c2", text: { en: "Adopt a real cyborg puppy", vi: "Nhận nuôi cún cyborg thật" }, effect: { playerMoneyDelta: 150, botMoneyDelta: 0 }, outcome: { en: "The wholesome PR move won back the public's heart.", vi: "Hành động PR ấm áp đã lấy lại trái tim công chúng." } }
    ]
  },
  {
    id: "e46",
    title: { en: "Cyber-Plague", vi: "Dịch Bệnh Cyber" },
    description: { en: "A nasty virus is burning out implants in the lower sectors.", vi: "Một loại virus độc ác đang làm cháy các bộ phận cấy ghép ở khu ổ chuột." },
    choices: [
      { id: "c1", text: { en: "Donate free vaccines", vi: "Quyên góp vaccine miễn phí" }, effect: { playerMoneyDelta: -300, botMoneyDelta: -150 }, outcome: { en: "You lost money, but gained immense brand loyalty. your rival looked greedy.", vi: "Bạn mất tiền, nhưng nhận được sự trung thành tuyệt đối. đối thủ trông có vẻ tham lam." } },
      { id: "c2", text: { en: "Price gouge the cure", vi: "Đội giá thuốc chữa" }, effect: { playerMoneyDelta: 600, botMoneyDelta: 0 }, outcome: { en: "People hate you, but your bank accounts are overflowing.", vi: "Người ta ghét bạn, nhưng tài khoản ngân hàng của bạn tràn ngập tiền." } }
    ]
  },
  {
    id: "e47",
    title: { en: "Underground Data Haven", vi: "Thiên Đường Dữ Liệu Ngầm" },
    description: { en: "Hackers offer to store your illegal research off the grid in a sunken submarine.", vi: "Hacker đề nghị lưu trữ nghiên cứu phi pháp của bạn ngoài mạng lưới trong một chiếc tàu ngầm chìm." },
    choices: [
      { id: "c1", text: { en: "Rent the space", vi: "Thuê chỗ" }, effect: { playerMoneyDelta: -150, botMoneyDelta: 0 }, outcome: { en: "Your secrets are safe from corporate spies.", vi: "Bí mật của bạn an toàn khỏi gián điệp tập đoàn." } },
      { id: "c2", text: { en: "Hack the submarine", vi: "Hack chiếc tàu ngầm" }, effect: { playerMoneyDelta: 450, botMoneyDelta: -450 }, outcome: { en: "You broke in and stole your rival's illegal research stored there!", vi: "Bạn đột nhập và đánh cắp nghiên cứu phi pháp của đối thủ được lưu trữ ở đó!" } }
    ]
  },
  {
    id: "e48",
    title: { en: "Clone Replacement", vi: "Thay Thế Bản Sao" },
    description: { en: "Rumors say your rival's CEO died and was replaced by a clone.", vi: "Có tin đồn CEO của đối thủ đã chết và bị thay thế bằng một bản sao." },
    choices: [
      { id: "c1", text: { en: "Demand genetic proof", vi: "Yêu cầu bằng chứng gen" }, effect: { playerMoneyDelta: 300, botMoneyDelta: -600 }, outcome: { en: "The stock tanked when they refused to provide DNA tests.", vi: "Cổ phiếu lao dốc khi họ từ chối cung cấp xét nghiệm DNA." } },
      { id: "c2", text: { en: "Clone yourself too", vi: "Cũng tạo bản sao chính mình" }, effect: { playerMoneyDelta: -450, botMoneyDelta: -150 }, outcome: { en: "Cloning is expensive, but now you have a backup body. Cool.", vi: "Tạo bản sao rất tốn kém, nhưng giờ bạn có một cơ thể dự phòng. Tuyệt." } }
    ]
  },
  {
    id: "e49",
    title: { en: "Neural Link Breakthrough", vi: "Đột Phá Liên Kết Thần Kinh" },
    description: { en: "Your scientists discovered a way to upload memories directly to the cloud.", vi: "Các nhà khoa học của bạn đã phát hiện ra cách tải trực tiếp ký ức lên đám mây." },
    choices: [
      { id: "c1", text: { en: "Patent and sell", vi: "Cấp bằng sáng chế và bán" }, effect: { playerMoneyDelta: 750, botMoneyDelta: -300 }, outcome: { en: "A massive paradigm shift in tech. You are the pioneer.", vi: "Một sự thay đổi mô hình lớn trong công nghệ. Bạn là người tiên phong." } },
      { id: "c2", text: { en: "Keep it for military", vi: "Giữ cho quân đội" }, effect: { playerMoneyDelta: 450, botMoneyDelta: 0 }, outcome: { en: "Soldiers can now respawn. The government pays you billions.", vi: "Binh lính giờ có thể hồi sinh. Chính phủ trả cho bạn hàng tỷ." } }
    ]
  },
  {
    id: "e50",
    title: { en: "The Omniscient Oracle", vi: "Nhà Tiên Tri Toàn Năng" },
    description: { en: "An ancient rogue AI named 'The Oracle' offers to predict market trends for a massive fee.", vi: "Một AI nổi loạn cổ đại có tên 'The Oracle' đề nghị dự đoán xu hướng thị trường với một khoản phí khổng lồ." },
    choices: [
      { id: "c1", text: { en: "Pay the Oracle", vi: "Trả tiền cho Oracle" }, effect: { playerMoneyDelta: 600, botMoneyDelta: -450 }, outcome: { en: "The prediction was flawless. You crushed the next quarter.", vi: "Dự đoán thật hoàn hảo. Bạn đè bẹp quý tiếp theo." } },
      { id: "c2", text: { en: "It's a scam", vi: "Đó là trò lừa đảo" }, effect: { playerMoneyDelta: 0, botMoneyDelta: 0 }, outcome: { en: "You kept your money. Nothing happened.", vi: "Bạn giữ lại tiền. Không có gì xảy ra." } }
    ]
  },
  {
    id: "e_oligopoly",
    title: { en: "A New Challenger", vi: "Kẻ Thách Thức Mới" },
    description: {
      en: "WARNING: A massive tech conglomerate, OMEGA_Corp, has aggressively entered the market! The duopoly is shattered. Prepare for a 3-way Oligopoly war!",
      vi: "CẢNH BÁO: Tập đoàn công nghệ khổng lồ OMEGA_Corp đã ngang ngược tiến vào thị trường! Thế độc quyền song phương bị phá vỡ. Chuẩn bị cho cuộc chiến Oligopoly 3 bên!"
    },
    choices: [
      { 
        id: "c1", 
        text: { en: "Brace for impact!", vi: "Sẵn sàng nghênh chiến!" }, 
        effect: { playerMoneyDelta: 0, botMoneyDelta: 0 }, 
        outcome: { en: "OMEGA_Corp has arrived. The rules have changed.", vi: "OMEGA_Corp đã xuất hiện. Luật chơi đã thay đổi." },
        triggerOligopoly: true 
      }
    ]
  }
];
