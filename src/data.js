// Interview553 Official Online Boutique Data
export const BRAND_DATA = {
  id: "1100024247",
  name: "Interview553",
  brandUrl: "interview553",
  brandLoungeName: "Interview553 Club",
  officialBadge: "공식 온라인 부티크",
  tagline: "아이코닉 럭셔리 패션 브랜드 Interview553",
  description: `정교하게 완성된 모던 럭셔리, 트렌드, 그리고 하이패션의 시대정신.
Interview553는 장인 정신, 최고 품질, 시대를 초월하는 우아한 디자인을 상징합니다.`,
  logoWhite: "/interview553-logo-white.png",
  logoBlack: "/interview553-logo-dark.png",
  repImage: "https://shop-phinf.pstatic.net/20260511_69/177846240743383h6q_JPEG/112595211384053008_852132089.jpg",
  brandBg: "https://shop-phinf.pstatic.net/20260514_39/1778757569314syIKz_JPEG/%B8%F0%B9%D9%C0%CF_%BA%EA%B7%A3%B5%E5%BC%D2%B0%B3.jpg",
  followers: 128490,
  formattedFollowers: "12.8만",
  rating: 4.9,
  reviewCount: 4820,
  saleCount: 714,
  businessInfo: {
    company: "주식회사 유닉유니온 (Interview553 공식 운영사)",
    ceo: "박상용",
    bizNumber: "211-88-12450",
    mailOrderNumber: "2023-서울강남-04128호",
    tel: "02-544-7720",
    email: "interview553_cs@unicunion.co.kr",
    address: "서울특별시 강남구 압구정로 412 유닉빌딩 4층",
    csTime: "평일 10:00 ~ 17:00 (점심시간 12:30 ~ 13:30, 주말/공휴일 휴무)"
  }
};

export const CATEGORIES = [
  { id: "new", name: "NEW ARRIVALS", count: 42 },
  { id: "autumn", name: "FW26 AUTUMN", count: 68 },
  { id: "bag", name: "BAGS & LEATHER", count: 114 },
  { id: "apparel", name: "APPAREL & COATS", count: 95 },
  { id: "shoes", name: "SHOES", count: 37 },
  { id: "acc", name: "ACCESSORIES", count: 83 },
  { id: "heritage", name: "HERITAGE ARCHIVE", count: 56 },
  { id: "all", name: "ALL COLLECTIONS", count: 495 }
];

export const STORIES = [
  {
    id: 5003015429,
    title: "수영 PICK! FW26 Interview553",
    subtitle: "INTERVIEW553 x SOOYOUNG 2026 FW COLLECTION EDITORIAL",
    regDate: "2026.09.16.",
    readCount: 6397,
    likes: 482,
    badge: "CAMPAIGN EDITORIAL",
    isTarget: true,
    coverImage: "https://shop-phinf.pstatic.net/20260923_222/1790134609585PVnxC_JPEG/%EA%B8%B0%ED%9A%8D%EC%A0%84_01.jpg?type=w860",
    detailImage: "https://shop-phinf.pstatic.net/20260923_257/17901346123221pVJY_JPEG/%EA%B8%B0%ED%9A%8D%EC%A0%84_01_%EC%83%81%EC%84%B8.jpg?type=w860",
    introText: "배우이자 패션 아이콘 수영이 제안하는 Interview553 2026 FW 컬렉션. 정교한 장인 정신과 세련된 모던 럭셔리가 결합된 감각적인 스타일링을 지금 만나보세요.",
    tags: ["#Interview553", "#SOOYOUNG", "#FW26", "#인터뷰553", "#수영가방", "#명품백", "#아다라백", "#럭셔리컬렉션"],
    hotspots: [
      { id: "h1", top: "18%", left: "48%", productId: 13408642750, title: "Interview553 아다라 크로스 바디백 M", price: "990,000원" },
      { id: "h2", top: "34%", left: "54%", productId: 13408642752, title: "Interview553 캐시미어 삼각 숄", price: "159,000원" },
      { id: "h3", top: "52%", left: "42%", productId: 13408642753, title: "Interview553 아인스 FAUX FUR 베스트", price: "239,000원" },
      { id: "h4", top: "71%", left: "50%", productId: 13408642754, title: "Interview553 하이넥 카라 배색 풀오버", price: "179,000원" }
    ],
    featuredProductIds: [
      13408642750, 13408642752, 13408642751, 13408642753,
      13408642754, 13408642755, 13408642756, 13408642757
    ]
  },
  {
    id: 5003085128,
    title: "가을 컬러를 담은 기프트 큐레이션",
    subtitle: "AUTUMN COLOR GIFT CURATION",
    regDate: "2026.10.01.",
    readCount: 1240,
    likes: 198,
    badge: "CURATION",
    isTarget: false,
    coverImage: "https://shop-phinf.pstatic.net/20261001_80/1790848140592UqHBp_JPEG/%EA%B8%B0%ED%9A%8D%EC%A0%84_02_%EC%83%81%EC%84%B8.jpg?type=w860",
    detailImage: "https://shop-phinf.pstatic.net/20261001_80/1790848140592UqHBp_JPEG/%EA%B8%B0%ED%9A%8D%EC%A0%84_02_%EC%83%81%EC%84%B8.jpg?type=w860",
    introText: "선선해진 가을바람과 함께 전하는 Interview553의 감각적인 선물 제안. 깊이 있는 어텀 컬러와 부드러운 텍스처로 소중한 분께 품격을 선물하세요.",
    tags: ["#가을선물", "#Interview553선물", "#기프트컬렉션", "#캐시미어숄"],
    hotspots: [
      { id: "h1", top: "25%", left: "50%", productId: 13408642752, title: "Interview553 캐시미어 삼각 숄", price: "159,000원" }
    ],
    featuredProductIds: [13408642752, 13408642751, 13408642757]
  },
  {
    id: 5002831788,
    title: "NEW SEASON, NEW BAG",
    subtitle: "2026 ICONIC LEATHER BAG COLLECTION",
    regDate: "2026.07.02.",
    readCount: 890,
    likes: 145,
    badge: "ICONIC BAGS",
    isTarget: false,
    coverImage: "https://shop-phinf.pstatic.net/20260702_59/17829549835067ybMz_JPEG/%EA%B8%B0%ED%9A%8D%EC%A0%84.jpg?type=w860",
    detailImage: "https://shop-phinf.pstatic.net/20260702_59/17829549835067ybMz_JPEG/%EA%B8%B0%ED%9A%8D%EC%A0%84.jpg?type=w860",
    introText: "새로운 시즌을 여는 Interview553의 아이코닉 레더 백 라인업. 엄격한 가죽 가공 기술과 독보적인 실루엣의 시너지를 경험하세요.",
    tags: ["#Interview553가방", "#명품가죽백", "#뉴시즌", "#레더컬렉션"],
    hotspots: [
      { id: "h1", top: "30%", left: "45%", productId: 13408642750, title: "Interview553 아다라 크로스 바디백 M", price: "990,000원" }
    ],
    featuredProductIds: [13408642750, 13408642756]
  },
  {
    id: 5002831767,
    title: "멤버십 혜택 안내 (Interview553 Club)",
    subtitle: "INTERVIEW553 CLUB EXCLUSIVE PRIVILEGES",
    regDate: "2026.07.02.",
    readCount: 1530,
    likes: 312,
    badge: "MEMBERSHIP",
    isTarget: false,
    coverImage: "https://shop-phinf.pstatic.net/20260702_235/1782954777566RhpXq_JPEG/SE-cad4aece-d44f-494f-90ae-98b954150168.jpg?type=w860",
    detailImage: "https://shop-phinf.pstatic.net/20260702_253/1782955144628CUDuu_JPEG/SE-d9c26cbd-664e-46d8-a493-227355d15511.jpg?type=w860",
    introText: "Interview553 Club 멤버십 가입 시 드리는 스페셜 웰컴 쿠폰 10%, 첫 구매 감사 바우처 및 생일 축하 선물 등 부티크 익스클루시브 프리미엄 혜택을 확인하세요.",
    tags: ["#Interview553Club", "#공식부티크멤버십", "#웰컴바우처", "#회원혜택"],
    hotspots: [],
    featuredProductIds: [13408642750, 13408642752]
  },
  {
    id: 5002790317,
    title: "SUMMER RESORT SELECTION",
    subtitle: "RESORT & VACATION LUXURY STYLING",
    regDate: "2026.06.02.",
    readCount: 940,
    likes: 120,
    badge: "RESORT EDIT",
    isTarget: false,
    coverImage: "https://shop-phinf.pstatic.net/20260602_7/1780383337965OrBgy_JPEG/1%EC%95%88%EA%B8%B0%ED%9A%8D%EC%A0%84.jpg?type=w860",
    detailImage: "https://shop-phinf.pstatic.net/20260602_7/1780383337965OrBgy_JPEG/1%EC%95%88%EA%B8%B0%ED%9A%8D%EC%A0%84.jpg?type=w860",
    introText: "눈부신 햇살 아래 완성하는 리조트 럭셔리 룩. 가볍고 편안하면서도 우아함을 잃지 않는 Interview553의 서머 에디션.",
    tags: ["#휴양지룩", "#버킷햇", "#바캉스백", "#여름스타일링"],
    hotspots: [],
    featuredProductIds: [13408642757, 13408642755]
  },
  {
    id: 5002790212,
    title: "THE GIFT EDIT",
    subtitle: "FOR YOUR PRECIOUS MOMENTS",
    regDate: "2026.06.02.",
    readCount: 680,
    likes: 95,
    badge: "GIFT GUIDE",
    isTarget: false,
    coverImage: "https://shop-phinf.pstatic.net/20260602_82/1780382880976spt3o_JPEG/2%EC%95%88%EA%B8%B0%ED%9A%8D%EC%A0%84.jpg?type=w860",
    detailImage: "https://shop-phinf.pstatic.net/20260602_82/1780382880976spt3o_JPEG/2%EC%95%88%EA%B8%B0%ED%9A%8D%EC%A0%84.jpg?type=w860",
    introText: "소중한 사람들에게 전하는 Interview553의 선물 가이드. 고급 시그니처 패키징과 함께 잊지 못할 특별한 순간을 선물해 보세요.",
    tags: ["#기프트에딧", "#선물추천", "#명품선물", "#Interview553"],
    hotspots: [],
    featuredProductIds: [13408642752, 13408642750]
  }
];

export const PRODUCTS = [
  {
    id: 13408642750,
    name: "Interview553 아다라 크로스 바디백 M",
    originalPrice: 1100000,
    price: 990000,
    discountRate: 10,
    image: "https://shop-phinf.pstatic.net/20260422_194/1776838525244wRHPe_JPEG/110971378371896821_975092856.jpg",
    category: "BAGS",
    subCategory: "CROSSBODY",
    badge: "SOOYOUNG'S PICK · BEST 1",
    color: "블랙 / 버건디 / 토프",
    material: "천연 소가죽 (카프스킨 100%)",
    size: "24 x 16 x 8 cm",
    delivery: "무료배송 & 부티크 선물 포장",
    deliveryCompany: "프리미엄 특송 배송",
    pointRate: "Interview553 마일리지 5% 적립",
    pointAmount: 49500,
    rating: 4.95,
    reviewCount: 312,
    description: "Interview553의 시그니처 엠블럼 버클이 돋보이는 모던 럭셔리 크로스백. 수영 캠페인 메인 착용 아이템."
  },
  {
    id: 13408642752,
    name: "Interview553 캐시미어 삼각 숄",
    originalPrice: 198000,
    price: 159000,
    discountRate: 20,
    image: "https://shop-phinf.pstatic.net/20260422_255/1776848448620dhxIP_JPEG/110981363755537916_2013079804.jpg",
    category: "ACCESSORIES",
    subCategory: "SHAWLS",
    badge: "SEASON BESTSELLER",
    color: "오트밀 / 차콜 / 카멜",
    material: "캐시미어 30%, 파인울 70%",
    size: "FREE (180 x 75 cm)",
    delivery: "무료배송 & 부티크 선물 포장",
    deliveryCompany: "프리미엄 특송 배송",
    pointRate: "Interview553 마일리지 5% 적립",
    pointAmount: 7950,
    rating: 4.9,
    reviewCount: 528,
    description: "포근한 터치감과 유려한 드레이핑의 캐시미어 블렌드 삼각 숄. 가을-겨울 시즌 필수 포인트 아이템."
  },
  {
    id: 13408642751,
    name: "Interview553 니트 후드 워머",
    originalPrice: 198000,
    price: 159000,
    discountRate: 20,
    image: "https://shop-phinf.pstatic.net/20260907_55/1788767673003WVJ5t_JPEG/43285665373429096_506756907.jpg",
    category: "ACCESSORIES",
    subCategory: "WARMERS",
    badge: "NEW FW26",
    color: "그레이지 / 블랙",
    material: "메리노울 100%",
    size: "FREE",
    delivery: "무료배송",
    deliveryCompany: "프리미엄 특송 배송",
    pointRate: "Interview553 마일리지 5% 적립",
    pointAmount: 7950,
    rating: 4.88,
    reviewCount: 164,
    description: "트렌디한 발라클라바 실루엣으로 코트나 패딩에 매치하기 좋은 니트 후드 워머."
  },
  {
    id: 13408642753,
    name: "Interview553 아인스 FAUX FUR 베스트",
    originalPrice: 298000,
    price: 239000,
    discountRate: 20,
    image: "https://shop-phinf.pstatic.net/20260429_186/17774214397806k9Ys_JPEG/111554292870867976_1305476570.jpg",
    category: "APPAREL",
    subCategory: "VESTS & COATS",
    badge: "LUXURY FAUX FUR",
    color: "아이보리 / 브라운",
    material: "에코 퍼 폴리에스터 100%",
    size: "55 / 66 / 77",
    delivery: "무료배송 & 부티크 수트케이스",
    deliveryCompany: "프리미엄 특송 배송",
    pointRate: "Interview553 마일리지 5% 적립",
    pointAmount: 11950,
    rating: 4.92,
    reviewCount: 97,
    description: "부드럽고 윤기 있는 프리미엄 에코 퍼로 완성한 고급스러운 실루엣의 집업 베스트."
  },
  {
    id: 13408642754,
    name: "Interview553 하이넥 카라 배색 풀오버",
    originalPrice: 220000,
    price: 179000,
    discountRate: 19,
    image: "https://shop-phinf.pstatic.net/20261007_116/1791361728012B7iOW_JPEG/28966754859710128_1166470678.jpg",
    category: "APPAREL",
    subCategory: "KNITWEAR",
    badge: "SIGNATURE COLOR BLOCK",
    color: "네이비콤비 / 베이지콤비",
    material: "캐시미어 10%, 엑스트라파인 울 90%",
    size: "55 / 66",
    delivery: "무료배송",
    deliveryCompany: "프리미엄 특송 배송",
    pointRate: "Interview553 마일리지 5% 적립",
    pointAmount: 8950,
    rating: 4.87,
    reviewCount: 84,
    description: "목선을 우아하게 감싸는 하이넥과 세련된 컬러 블록 디테일의 프리미엄 풀오버 니트."
  },
  {
    id: 13408642755,
    name: "Interview553 사선절개 기모 데님팬츠",
    originalPrice: 220000,
    price: 179000,
    discountRate: 19,
    image: "https://shop-phinf.pstatic.net/20261016_236/1792116194387dKF0p_JPEG/13658542205600918_1313440815.jpg",
    category: "APPAREL",
    subCategory: "DENIM & PANTS",
    badge: "SLIM STRAIGHT FIT",
    color: "딥블루 / 빈티지인디고",
    material: "코튼 98%, 폴리우레탄 2% (속기모)",
    size: "26 / 27 / 28 / 29 / 30",
    delivery: "무료배송",
    deliveryCompany: "프리미엄 특송 배송",
    pointRate: "Interview553 마일리지 5% 적립",
    pointAmount: 8950,
    rating: 4.9,
    reviewCount: 119,
    description: "다리가 길어 보이는 사선 절개 라인과 한겨울까지 따뜻한 소프트 본딩 기모 데님."
  },
  {
    id: 13408642756,
    name: "Interview553 골드 버튼 탑 티셔츠",
    originalPrice: 159000,
    price: 129000,
    discountRate: 19,
    image: "https://shop-phinf.pstatic.net/20260827_255/1787798397129PIBeX_JPEG/58187849269807798_749884593.jpg",
    category: "APPAREL",
    subCategory: "TOPS",
    badge: "DAILY ESSENTIAL",
    color: "화이트 / 블랙 / 모카",
    material: "텐셀 70%, 울 30%",
    size: "55 / 66",
    delivery: "무료배송",
    deliveryCompany: "프리미엄 특송 배송",
    pointRate: "Interview553 마일리지 5% 적립",
    pointAmount: 6450,
    rating: 4.85,
    reviewCount: 76,
    description: "어깨 라인 Interview553 각인 골드 버튼이 포인트인 고급 텐셀 울 블렌드 탑."
  },
  {
    id: 13408642757,
    name: "Interview553 페이즐리 헤리티지 버킷햇",
    originalPrice: 139000,
    price: 109000,
    discountRate: 22,
    image: "https://shop-phinf.pstatic.net/20260429_282/1777446190668x98W3_JPEG/4268553039462945_1837846882.jpg",
    category: "ACCESSORIES",
    subCategory: "HATS",
    badge: "HERITAGE PRINT",
    color: "와인 / 네이비",
    material: "코튼 트윌 100%",
    size: "FREE (둘레 57.5cm)",
    delivery: "무료배송",
    deliveryCompany: "프리미엄 특송 배송",
    pointRate: "Interview553 마일리지 5% 적립",
    pointAmount: 5450,
    rating: 4.89,
    reviewCount: 142,
    description: "Interview553 아카이브 페이즐리 패턴을 현대적으로 재해석한 헤리티지 버킷햇.",
    colorList: ["와인", "네이비"],
    sizeList: ["FREE (57.5cm)"],
    inStock: 12
  }
];

// Product enhancements for rich PDP
PRODUCTS.forEach(p => {
  if (!p.colorList) {
    if (p.id === 13408642750) p.colorList = ["버건디", "블랙", "토프"];
    else if (p.id === 13408642752) p.colorList = ["오트밀", "차콜", "카멜"];
    else if (p.id === 13408642751) p.colorList = ["그레이지", "블랙"];
    else if (p.id === 13408642753) p.colorList = ["아이보리", "브라운"];
    else if (p.id === 13408642754) p.colorList = ["네이비콤비", "베이지콤비"];
    else if (p.id === 13408642755) p.colorList = ["딥블루", "빈티지인디고"];
    else if (p.id === 13408642756) p.colorList = ["화이트", "블랙", "모카"];
    else p.colorList = ["와인", "네이비"];
  }
  if (!p.sizeList) {
    if (p.category === "APPAREL") {
      if (p.subCategory.includes("DENIM")) p.sizeList = ["26", "27", "28", "29", "30"];
      else p.sizeList = ["55 (S)", "66 (M)", "77 (L)"];
    } else {
      p.sizeList = ["FREE"];
    }
  }
  if (!p.inStock) p.inStock = Math.floor(Math.random() * 8) + 3;
});

export const BOUTIQUE_LOCATIONS = [
  {
    id: "flagship",
    name: "INTERVIEW553 SEOUL FLAGSHIP",
    type: "플래그십 부티크",
    address: "서울특별시 강남구 압구정로 412 유닉빌딩 1F-2F",
    tel: "02-544-7720",
    hours: "월-일 11:00 ~ 20:00 (연중무휴)",
    services: ["VIP 프라이빗 살롱 예약", "슈프림 퍼스널 스타일링", "부티크 익스클루시브 라인 전시", "아틀리에 수선 서비스"],
    image: "https://shop-phinf.pstatic.net/20260514_39/1778757569314syIKz_JPEG/%B8%F0%B9%D9%C0%CF_%BA%EA%B7%A3%B5%E5%BC%D2%B0%B3.jpg"
  },
  {
    id: "galleria",
    name: "GALLERIA LUXURY HALL EAST",
    type: "백화점 부티크",
    address: "서울특별시 강남구 압구정로 407 갤러리아 명품관 EAST 2F",
    tel: "02-540-1965",
    hours: "월-목 10:30 ~ 20:00, 금-일 10:30 ~ 20:30",
    services: ["시즌 컬렉션 쇼케이스", "발렛 파킹 연계", "선물 포장 서비스"],
    image: "https://shop-phinf.pstatic.net/20260923_222/1790134609585PVnxC_JPEG/%EA%B8%B0%ED%9A%8D%EC%A0%84_01.jpg?type=w860"
  },
  {
    id: "shinsegae",
    name: "SHINSEGAE GANGNAM BOUTIQUE",
    type: "백화점 부티크",
    address: "서울특별시 서초구 신반포로 176 신세계백화점 강남점 3F 럭셔리 부티크",
    tel: "02-3479-1553",
    hours: "월-목 10:30 ~ 20:00, 금-일 10:30 ~ 20:30",
    services: ["백 & 레더 전문 컨설팅", "신세계 VIP 라운지 연동"],
    image: "https://shop-phinf.pstatic.net/20260702_59/17829549835067ybMz_JPEG/%EA%B8%B0%ED%9A%8D%EC%A0%84.jpg?type=w860"
  },
  {
    id: "lotte",
    name: "LOTTE MAIN DEPARTMENT STORE",
    type: "백화점 부티크",
    address: "서울특별시 중구 을지로 30 롯데백화점 본점 1F 인터내셔널 부티크",
    tel: "02-772-3553",
    hours: "월-목 10:30 ~ 20:00, 금-일 10:30 ~ 20:30",
    services: ["글로벌 택스리펀드", "글로벌 컨시어지 서비스"],
    image: "https://shop-phinf.pstatic.net/20261001_80/1790848140592UqHBp_JPEG/%EA%B8%B0%ED%9A%8D%EC%A0%84_02_%EC%83%81%EC%84%B8.jpg?type=w860"
  },
  {
    id: "hyundai",
    name: "HYUNDAI APGUJEONG MAIN STORE",
    type: "백화점 부티크",
    address: "서울특별시 강남구 압구정로 165 현대백화점 본점 2F",
    tel: "02-3449-5530",
    hours: "월-목 10:30 ~ 20:00, 금-일 10:30 ~ 20:30",
    services: ["헤리티지 컬렉션 단독 큐레이션", "프리미엄 레더 케어"],
    image: "https://shop-phinf.pstatic.net/20260602_7/1780383337965OrBgy_JPEG/1%EC%95%88%EA%B8%B0%ED%9A%8D%EC%A0%84.jpg?type=w860"
  }
];

export const HERITAGE_DATA = {
  title: "THE WORLD OF INTERVIEW553",
  subtitle: "SARTORIAL PERFECTION & MODERN COUTURE HERITAGE",
  mission: "시대를 초월하는 우아함, 정교한 테일러링, 그리고 타협하지 않는 최고급 가죽 장인 정신.",
  chapters: [
    {
      num: "01",
      title: "THE HANGER EMBLEM: 553",
      text: "Interview553의 상징인 코트 행어(Hanger)와 '553' 시그니처는 비스포크 꾸뛰르의 정교한 재단과 현대적인 하이패션의 시대정신을 상징합니다. 옷걸이 실루엣은 언제나 품격을 지키며 옷의 가장 완벽한 형태를 유지하는 장인의 약속을 담고 있습니다."
    },
    {
      num: "02",
      title: "ATELIER & LEATHER CRAFTSMANSHIP",
      text: "엄격하게 선별된 최상급 독일산 풀그레인 카프스킨(Calfskin)과 몽골리안 파인 캐시미어를 고집합니다. 가죽의 재단부터 엣지 페인팅, 스티칭 마감까지 수십 년 경력의 아틀리에 마스터 장인들의 손끝에서 완성됩니다."
    },
    {
      num: "03",
      title: "SUSTAINABLE LUXURY & TIMELESS SILHOUETTES",
      text: "우리는 단발성 트렌드를 넘어 세대를 거듭하며 가치를 더해가는 타임리스 피스를 창조합니다. 모든 공정은 환경에 미치는 영향을 최소화하는 친환경 무두질 공정과 윤리적인 원자재 수급만을 준수합니다."
    }
  ]
};

export const FAQS = [
  {
    q: "정품 보증 및 무상 수선(A/S) 안내",
    a: "Interview553 공식 온라인 부티크 및 직영 매장에서 구매하신 모든 정품에는 고유 정품 보증 카드가 동봉됩니다. 정상적인 사용 상태에서 발생한 제조상의 결함은 구매일로부터 1년간 무상 수선 서비스를 제공합니다."
  },
  {
    q: "배송 기간 및 시그니처 패키징",
    a: "모든 주문은 Interview553 시그니처 럭셔리 하드박스 및 리본으로 포장되어 무료 특송 발송됩니다. 평일 오후 2시 이전 결제 완료 건은 당일 출고되며, 평균 1~2영업일 이내에 안전하게 수령하실 수 있습니다."
  },
  {
    q: "교환 및 반품 규정",
    a: "상품 수령 후 7일 이내에 공식 온라인 부티크 마이페이지 또는 고객센터를 통해 무료 회수 접수가 가능합니다. 단, 보안 씰(Security Tag) 훼손 및 착용 흔적이 있는 경우 교환/반품이 제한될 수 있습니다."
  },
  {
    q: "Interview553 Club 회원 등급 혜택",
    a: "신규 가입 즉시 10% 웰컴 바우처가 발급되며, 모든 구매 금액의 5%가 마일리지로 적립됩니다. 연간 누적 300만원 이상 구매 고객께는 NOIR VIP 등급으로 승급되어 프라이빗 컬렉션 우선 구매권과 생일 바우처(20%)가 제공됩니다."
  }
];

export const INITIAL_COMMENTS = [
  {
    id: "c1",
    author: "minji_style",
    date: "2026.09.16. 17:42",
    content: "수영님 화보 분위기 정말 압도적이네요... 아다라 크로스백 착용한 컷 보고 바로 쇼핑백에 담았습니다! 버건디 실물 컬러 너무 기대됩니다 ✨",
    likes: 34,
    isLiked: false,
    isOfficial: false
  },
  {
    id: "c2",
    author: "Interview553 Official",
    date: "2026.09.16. 18:05",
    content: "안녕하세요 고객님, Interview553 공식 온라인 부티크입니다. 수영 님과 함께한 이번 FW26 컬렉션에 많은 사랑 감사드립니다. 아다라 백은 최고급 카프스킨으로 제작되어 실물의 우아한 광택감과 품격을 직접 느껴보실 수 있습니다. 감사합니다 ✨",
    likes: 89,
    isLiked: true,
    isOfficial: true
  },
  {
    id: "c3",
    author: "claire_k",
    date: "2026.09.17. 11:20",
    content: "캐시미어 삼각 숄 저번 시즌에도 잘 썼는데 올해 오트밀 컬러 톤 진짜 고급스럽게 뽑혔네요. 선물 포장도 너무 정갈해서 소중한 분 선물로 제격이에요.",
    likes: 19,
    isLiked: false,
    isOfficial: false
  },
  {
    id: "c4",
    author: "sooyoung_fan24",
    date: "2026.09.18. 09:14",
    content: "수영언니 비율이랑 Interview553 클래식 무드가 완전 찰떡이에요 ㅠㅠㅠㅠ 화보집 따로 소장하고 싶을 정도!",
    likes: 42,
    isLiked: false,
    isOfficial: false
  },
  {
    id: "c5",
    author: "seoul_fashionista",
    date: "2026.09.21. 22:30",
    content: "퍼 베스트랑 니트 풀오버 코디 조합 너무 예뻐요. 부티크 매장에서 봤는데 원단 퀄리티가 확실히 다르더라구요. 온라인 공식몰 웰컴 혜택 적용해서 기분 좋게 구매했습니다.",
    likes: 12,
    isLiked: false,
    isOfficial: false
  }
];
