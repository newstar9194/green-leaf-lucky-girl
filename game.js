const canvas = document.querySelector("#game");
const ctx = canvas.getContext("2d");
const scoreEl = document.querySelector("#score");
const bestEl = document.querySelector("#best");
const luckyStatusEl = document.querySelector("#luckyStatus");
const startOverlay = document.querySelector("#startOverlay");
const startButton = document.querySelector("#startButton");
const magnetButton = document.querySelector("#magnetButton");
const fortuneButton = document.querySelector("#fortuneButton");
const fortuneModal = document.querySelector("#fortuneModal");
const fortuneLabelEl = document.querySelector("#fortuneLabel");
const fortuneTitleEl = document.querySelector("#fortuneTitle");
const fortuneTextEl = document.querySelector("#fortuneText");
const fortuneCardsEl = document.querySelector("#fortuneCards");
const fortuneCloseButton = document.querySelector("#fortuneCloseButton");
const boostCaptionEl = document.querySelector("#boostCaption");

const WORLD_WIDTH = 900;
const WORLD_HEIGHT = 1400;
const LEAF_RADIUS = 23;
const CLOVER_CHANCE = 0.006;
const CONTROL_SAFE_ZONE = 230;
const GROUND_Y = WORLD_HEIGHT - CONTROL_SAFE_ZONE;
const WIND_DURATION = 5200;
const SPEED_MULTIPLIER = 1.2;
const GRAVITY = 1850;
const JUMP_VELOCITY = -760;
const MAX_JUMPS = 2;
const TRIPLE_JUMP_SCORE = 33;
const FLY_SCORE = 333;
const FORTUNE_SCORE = 777;
const CLOVER_FORCE_LEAVES = 36;
const CLOVER_BOOST_DURATION = 3000;
const LUCKY_TOMATO_MIN_LEAVES = 77;
const LUCKY_TOMATO_FORCE_LEAVES = 77;
const MAGNET_LEAF_REWARD = 30;
const GREEN_DANCE_DURATION = 5200;
const FORTUNE_RAIN_DURATION = 7200;
const MAGNET_DURATION = 12000;
const MAGNET_STRENGTH = 860;
const TOMATO_CHARACTERS = [
  { name: "토마토마", src: "/assets/tomato-cute/tomato.svg" },
  { name: "토링이", src: "/assets/tomato-cute/toring.svg" },
  { name: "토순이", src: "/assets/tomato-cute/tosoon.svg" },
  { name: "토도리", src: "/assets/tomato-cute/todori.svg" },
  { name: "토몽", src: "/assets/tomato-cute/tomong.svg" },
  { name: "방토단", src: "/assets/tomato-cute/bangto.svg" },
];

const BASIC_FORTUNES = [
  "오늘은 작은 웃음 하나가 큰 행운으로 번져요. 먼저 인사하면 마음이 포근해질 거예요.",
  "귀여운 실수가 오히려 분위기를 살려줘요. 너무 완벽하려고 하지 않아도 괜찮아요.",
  "마음에 걸리던 일이 생각보다 쉽게 풀려요. 차분히 한 번만 더 확인해 보세요.",
  "오늘의 행운은 따뜻한 음료 근처에 있어요. 한 모금 마시고 다시 시작하면 좋아요.",
  "좋은 소식이 아주 작은 알림처럼 찾아와요. 놓치지 않게 기분 좋은 마음을 켜두세요.",
  "오래 미룬 일을 5분만 해도 운이 붙어요. 시작만 해도 반은 반짝입니다.",
  "오늘은 초록색 물건이 행운을 불러요. 가방 속 작은 초록도 충분해요.",
  "누군가의 칭찬을 있는 그대로 받아도 되는 날이에요. 부끄러워 말고 웃어주세요.",
  "길을 조금 돌아가도 예쁜 장면을 만나요. 서두르지 않으면 더 좋은 걸 봐요.",
  "작은 정리가 큰 상쾌함을 데려와요. 책상 한 귀퉁이만 치워도 운세가 맑아져요.",
  "오늘은 귀여운 것을 보면 에너지가 충전돼요. 마음에 드는 사진을 하나 저장해 보세요.",
  "생각보다 내 편이 가까이에 있어요. 도움을 청하면 다정한 답이 돌아와요.",
  "가벼운 산책이 답답함을 녹여줘요. 바람을 쐬면 머릿속이 반짝 정리돼요.",
  "오늘의 행운 숫자는 3이에요. 세 번째 선택지에 귀여운 힌트가 숨어 있어요.",
  "달콤한 간식이 기분을 올려줘요. 작은 보상 하나를 스스로에게 주세요.",
  "말을 예쁘게 고르면 하루가 부드러워져요. 다정한 표현이 행운을 데려옵니다.",
  "기다리던 답이 늦어도 좋은 쪽으로 흐르고 있어요. 조급함을 잠깐 내려놔요.",
  "오늘은 손끝이 야무진 날이에요. 만들기, 정리, 메모에 운이 붙어요.",
  "우연히 들은 노래가 기분을 바꿔줘요. 마음에 드는 리듬을 따라가 보세요.",
  "작은 용기가 커다란 칭찬을 받아요. 하고 싶던 말을 부드럽게 꺼내보세요.",
  "오늘의 행운은 창가 쪽에 있어요. 햇빛을 잠깐 보면 마음이 반질반질해져요.",
  "갑자기 떠오른 아이디어가 꽤 쓸모 있어요. 잊기 전에 메모하면 좋아요.",
  "귀여운 농담이 어색함을 풀어줘요. 가볍게 웃는 순간 운이 들어와요.",
  "오늘은 색감이 좋은 날이에요. 예쁜 색을 고르면 선택도 산뜻해져요.",
  "놓친 줄 알았던 기회가 다시 와요. 이번엔 천천히 잡으면 됩니다.",
  "조용히 집중하면 예상보다 빨리 끝나요. 짧은 몰입이 큰 행운이에요.",
  "친절한 한마디가 하루를 살려요. 먼저 다정해지면 다정함이 돌아옵니다.",
  "오늘은 물을 자주 마시면 운이 맑아져요. 몸도 마음도 촉촉하게 가요.",
  "귀찮은 일이 끝나고 작은 선물이 기다려요. 끝까지 가면 뿌듯함이 와요.",
  "새로운 길을 눌러보면 재미있는 발견이 있어요. 호기심이 오늘의 열쇠예요.",
  "오늘은 눈치보다 취향을 믿어도 좋아요. 마음이 끌리는 쪽이 행운길이에요.",
  "가까운 사람에게 고마움을 말하면 운이 두 배가 돼요. 짧아도 충분해요.",
  "살짝 늦어도 괜찮아요. 오늘의 좋은 일은 느긋한 속도를 좋아해요.",
  "작은 목표를 낮게 잡으면 성공이 와르르 쌓여요. 하나만 해도 훌륭해요.",
  "오늘의 행운 색은 토마토 빨강이에요. 톡톡 튀는 기운이 따라옵니다.",
  "잠깐의 멍때림이 좋은 생각을 데려와요. 쉬는 것도 작전이에요.",
  "가방이나 주머니에서 반가운 걸 발견할 수 있어요. 작은 보물찾기 날이에요.",
  "오늘은 답장 운이 좋아요. 보내고 싶던 말을 너무 오래 품지 마세요.",
  "기분 좋은 향기가 하루를 바꿔줘요. 비누, 커피, 빵 냄새를 찾아봐요.",
  "작은 칭찬을 건네면 분위기가 몽글몽글해져요. 좋은 말은 행운 씨앗이에요.",
  "오늘은 배움 운이 반짝여요. 몰랐던 걸 하나 알게 되면 기분이 좋아져요.",
  "마음이 복잡하면 목록을 세 개만 적어보세요. 길이 또렷해질 거예요.",
  "좋아하는 캐릭터가 행운 부적이에요. 귀여움을 가까이 두면 힘이 납니다.",
  "오늘은 먼저 양보하면 더 좋은 자리가 생겨요. 여유가 행운을 불러요.",
  "작은 성공을 크게 기뻐해도 되는 날이에요. 셀프 박수를 아끼지 마세요.",
  "생각보다 운이 가까이 있어요. 고개를 들면 귀여운 힌트가 보여요.",
  "오늘은 맛있는 밥이 회복 아이템이에요. 든든하게 먹으면 기운이 차요.",
  "새로운 스티커나 이모지가 대화를 살려줘요. 귀여운 표현을 써보세요.",
  "걱정한 일이 순하게 지나가요. 마음속 우산을 접어도 괜찮아요.",
  "오랜 친구나 익숙한 장소에서 안정감이 와요. 편안함도 큰 행운이에요.",
  "오늘은 정답보다 재미가 중요해요. 즐겁게 해본 일이 좋은 결과를 데려와요.",
  "작은 꽃이나 잎사귀를 보면 운이 올라가요. 자연의 초록이 응원해요.",
  "기분 전환으로 배경화면을 바꿔보세요. 새 화면이 새 마음을 불러요.",
  "오늘은 듣는 운이 좋아요. 누군가의 말을 잘 들어주면 좋은 정보가 와요.",
  "서랍 하나를 열면 잊었던 귀여움이 나와요. 추억이 오늘의 간식이에요.",
  "조금 엉뚱한 선택이 의외로 잘 맞아요. 귀여운 모험을 해도 좋아요.",
  "오늘은 손글씨 운이 있어요. 짧은 메모가 마음을 정돈해줘요.",
  "좋은 사람과 눈이 마주치는 순간 행운이 반짝해요. 미소를 준비하세요.",
  "할 일을 나누면 훨씬 쉬워져요. 작게 쪼갠 계획이 오늘의 클로버예요.",
  "오늘은 사진 운이 좋아요. 귀여운 순간을 한 장 남겨보세요.",
  "편한 신발이 행운을 지켜줘요. 발걸음이 가벼우면 마음도 가벼워요.",
  "작은 돈을 아끼거나 잘 쓰는 감각이 좋아요. 똑똑한 선택이 반짝입니다.",
  "오늘은 집중보다 리듬이 중요해요. 짧게 하고 쉬고 다시 하면 좋아요.",
  "예상 밖의 칭찬이 들어올 수 있어요. 아니에요 대신 고마워요가 행운 주문이에요.",
  "귀여운 계획표를 만들면 실천력이 올라가요. 예쁜 표시가 마음을 밀어줘요.",
  "오늘은 햇살 같은 사람이 되어도 좋아요. 밝은 말이 주변을 데워요.",
  "잃어버린 줄 알았던 의욕이 조금씩 돌아와요. 아주 작게 시작해요.",
  "좋아하는 맛을 고르면 운이 올라가요. 오늘은 취향을 아껴주세요.",
  "친구의 추천에 행운이 숨어 있어요. 가볍게 따라 해보면 재미있어요.",
  "오늘은 눈에 띄지 않는 친절이 큰 복이 돼요. 조용한 다정함이 멋져요.",
  "잠깐 스트레칭하면 기분이 맑아져요. 몸을 펴면 운도 펴집니다.",
  "작은 소원을 하나만 정하면 이루어질 힘이 커져요. 마음을 한 점에 모아봐요.",
  "오늘의 행운 방향은 위쪽이에요. 하늘이나 높은 선반에서 힌트를 찾아봐요.",
  "반짝이는 물건이 기분을 올려줘요. 작은 광택이 마음에도 불을 켜요.",
  "오늘은 천천히 말하면 오해가 줄어요. 부드러운 속도가 행운이에요.",
  "가벼운 청소가 좋은 기운을 불러요. 먼지를 털면 마음도 보송해져요.",
  "처음 보는 정보가 좋은 선택을 도와줘요. 호기심 버튼을 눌러보세요.",
  "오늘은 웃긴 일이 하나쯤 생겨요. 크게 웃으면 행운이 오래 머물러요.",
  "아침이나 오후의 첫 선택이 중요해요. 산뜻한 걸 고르면 하루가 따라와요.",
  "작은 약속을 지키면 자신감이 반짝 올라요. 나와의 약속도 소중해요.",
  "오늘은 귀여운 말투가 먹히는 날이에요. 부끄러워도 살짝 말랑하게 가요.",
  "기분이 애매하면 좋아하는 음악을 틀어보세요. 리듬이 마음을 데려갑니다.",
  "옆 사람의 좋은 점이 보여요. 알아봐 주면 관계 운이 좋아져요.",
  "오늘은 체크 표시가 행운이에요. 완료 하나가 다음 완료를 부릅니다.",
  "작은 기다림 끝에 더 맛있는 순간이 와요. 성급히 판단하지 마세요.",
  "예쁜 하늘을 보면 걱정이 조금 작아져요. 고개를 들어 행운을 받아요.",
  "오늘은 내가 생각보다 귀엽고 강한 날이에요. 자신을 조금 더 믿어주세요.",
  "새로운 표현을 써보면 대화가 살아나요. 말랑한 문장이 행운을 불러요.",
  "조금 어설퍼도 진심이면 충분해요. 오늘의 운은 솔직함을 좋아해요.",
  "작은 선물을 주거나 받기 좋은 날이에요. 마음을 담으면 크기와 상관없어요.",
  "오늘은 계획 변경이 오히려 잘 맞아요. 유연하게 움직이면 좋은 장면을 만나요.",
  "맛있는 냄새를 따라가면 기분 좋은 선택이 있어요. 배고픔도 힌트가 돼요.",
  "귀여운 초록을 발견하면 마음속으로 저장해요. 클로버 기운이 따라붙어요.",
  "오늘은 마무리 운이 좋아요. 끝내고 나면 생각보다 큰 후련함이 와요.",
  "잘 안 되던 일이 한 칸 움직여요. 아주 작은 진전도 축하할 만해요.",
  "마음에 드는 단어 하나가 하루의 부적이 돼요. 예쁜 말을 골라 품어보세요.",
  "오늘은 토마토처럼 통통 튀는 매력이 있어요. 조금 발랄하게 움직여도 좋아요.",
  "귀여운 우연이 당신 편이에요. 기대 없이 한 선택에서 작은 복이 와요.",
  "잠깐 눈을 감고 숨을 고르면 답이 가까워져요. 마음을 말랑하게 풀어주세요.",
  "오늘의 결론은 괜찮아질 거라는 것! 클로버가 조용히 옆에서 먕먕 응원해요.",
];

const TOMATO_FORTUNES = [
  "오늘은 아이스크림을 먹어보세요~~~! 달콤함에 취해서 기분이 몽글몽글 좋아질 거예요~~!~!~!",
  "오늘은 빨간 과일을 하나 골라보세요. 토마토 기운이 톡 터지면서 말도 생각도 상큼해질 거예요~!",
  "오늘은 길을 걷다가 하늘을 한 번 올려다보세요. 구름 사이로 귀여운 힌트가 쏙 나올지도 몰라요!",
  "오늘은 좋아하는 노래를 작게 틀어보세요. 보싸노바 리듬처럼 하루가 살랑살랑 풀릴 거예요~!",
  "오늘은 편의점에서 처음 눈에 들어온 간식을 골라보세요. 그게 바로 토마토가 보낸 작은 복권이에요!",
  "오늘은 물을 한 컵 더 마셔보세요. 마음속 시든 잎이 다시 탱글탱글 살아날 거예요~!",
  "오늘은 누군가에게 귀여운 이모지를 보내보세요. 답장에 작은 행운이 또르르 굴러올 거예요!",
  "오늘은 방 한구석만 정리해보세요. 먼지 아래 숨어 있던 의욕이가 빼꼼 하고 나와요~!",
  "오늘은 평소보다 10분 일찍 쉬어보세요. 쉬는 동안 운이 몰래 충전돼서 내일의 나를 도와줘요!",
  "오늘은 토마토처럼 당당하게 말해보세요. 말끝에 자신감이 붙어서 생각보다 멋져 보일 거예요~!",
  "오늘은 작은 산책을 해보세요. 발끝마다 초록 행운이 톡톡 붙어서 기분이 가벼워져요!",
  "오늘은 귀여운 사진을 한 장 찍어보세요. 나중에 다시 보면 그 순간의 행운이 다시 켜질 거예요.",
  "오늘은 달콤한 음료 대신 상큼한 걸 골라도 좋아요. 입안이 반짝하면 머릿속도 반짝해져요~!",
  "오늘은 미뤄둔 답장을 하나만 보내보세요. 관계 운이 말랑해지고 마음도 보송해질 거예요!",
  "오늘은 스스로에게 잘했다고 말해주세요. 토마토가 옆에서 박수 짝짝 치고 있어요~~!",
  "오늘은 초록색 물건을 가까이 두세요. 네잎클로버가 작은 안테나처럼 좋은 기운을 잡아줄 거예요.",
  "오늘은 새 메뉴에 도전해보세요. 의외의 맛이 의외의 기분 전환을 데려올 거예요~!",
  "오늘은 천천히 걷고 천천히 말해보세요. 느린 리듬 안에 놓쳤던 행운이 숨어 있어요.",
  "오늘은 귀여운 농담을 하나 해보세요. 분위기가 풀리면서 당신의 매력이 통통 튈 거예요~!",
  "오늘은 하고 싶은 일을 아주 작게 시작해보세요. 3분만 해도 토마토 행운 도장이 쾅 찍혀요!",
];

let dpr = 1;
let scale = 1;
let lockedAppHeight = 0;
let lockedAppWidth = 0;
let lastTime = 0;
let running = false;
let score = 0;
let greenLeafCount = 0;
let best = Number(localStorage.getItem("leafLuckyBest") || 0);
let coins = Number(localStorage.getItem("leafLuckyCoins") || 0);
let nextMagnetRewardAt = MAGNET_LEAF_REWARD;
let floatTime = 0;
let spawnTimer = 0;
let windUntil = 0;
let nextWindAt = 0;
let windPower = 0;
let cloverBoostUntil = 0;
let greenDanceUntil = 0;
let fortuneRainUntil = 0;
let magnetUntil = 0;
let flyAnnounced = false;
let fortuneAnnounced = false;
let fortuneUnlocked = false;
let luckyTomatoSpawned = false;
let luckyTomatoMet = false;
let cloverFortuneSeen = false;
let confetti = [];
let leaves = [];
let keyState = new Set();
let activePointers = new Map();
let lastTouchEndAt = 0;
let fortuneMode = "tomato";
let modalResumeOnClose = false;
let pendingCloverBoost = false;
let pendingCloverBoostFortune = "";
let selectedTomatoCharacter = TOMATO_CHARACTERS[0];
let selectedTomatoCards = TOMATO_CHARACTERS.slice(0, 2);
let cloverIntroTimer = null;
let tomatoIntroTimer = null;
let boostCaptionTimer = null;
let bgmContext = null;
let bgmTimer = null;
let bgmStep = 0;

const player = {
  x: WORLD_WIDTH / 2,
  y: WORLD_HEIGHT / 2,
  vx: 0,
  vy: 0,
  grounded: true,
  jumpCount: 0,
  face: 1,
};

bestEl.textContent = best;
updateActionPanel(performance.now());

function resize() {
  const rect = canvas.getBoundingClientRect();
  dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.round(rect.width * dpr);
  canvas.height = Math.round(rect.height * dpr);
  scale = Math.min(canvas.width / WORLD_WIDTH, canvas.height / WORLD_HEIGHT);
}

function setAppHeight(force = false) {
  const width = Math.round(window.visualViewport?.width || window.innerWidth);
  const height = window.visualViewport?.height || window.innerHeight;
  if (!force && lockedAppHeight && Math.abs(width - lockedAppWidth) < 40) {
    resize();
    return;
  }
  lockedAppWidth = width;
  lockedAppHeight = Math.round(height);
  document.documentElement.style.setProperty("--app-height", `${lockedAppHeight}px`);
  resize();
}

function getPointerZone(event) {
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  if (x < rect.width * 0.44) return -1;
  if (x > rect.width * 0.56) return 1;
  return 0;
}

function getPointerDirection() {
  let direction = 0;
  activePointers.forEach((pointer) => {
    direction += pointer.zone;
  });
  return clamp(direction, -1, 1);
}

function trackPointer(event) {
  const existing = activePointers.get(event.pointerId);
  const startX = existing?.startX ?? event.clientX;
  const startY = existing?.startY ?? event.clientY;
  activePointers.set(event.pointerId, {
    startX,
    startY,
    zone: getPointerZone(event),
    moved: existing?.moved || Math.hypot(event.clientX - startX, event.clientY - startY) > 16,
  });
}

function resetGame() {
  running = true;
  score = 0;
  greenLeafCount = 0;
  nextMagnetRewardAt = MAGNET_LEAF_REWARD;
  spawnTimer = 0;
  windUntil = 0;
  nextWindAt = performance.now() + 6000 + Math.random() * 6500;
  windPower = 0;
  cloverBoostUntil = 0;
  greenDanceUntil = 0;
  fortuneRainUntil = 0;
  magnetUntil = 0;
  flyAnnounced = false;
  fortuneAnnounced = false;
  fortuneUnlocked = false;
  luckyTomatoSpawned = false;
  luckyTomatoMet = false;
  cloverFortuneSeen = false;
  pendingCloverBoost = false;
  pendingCloverBoostFortune = "";
  selectedTomatoCharacter = TOMATO_CHARACTERS[0];
  selectedTomatoCards = TOMATO_CHARACTERS.slice(0, 2);
  hideBoostCaption();
  activePointers.clear();
  confetti = [];
  leaves = [];
  player.x = WORLD_WIDTH / 2;
  player.y = GROUND_Y;
  player.vx = 0;
  player.vy = 0;
  player.grounded = true;
  player.jumpCount = 0;
  for (let i = 0; i < 4; i += 1) spawnLeaf(-Math.random() * WORLD_HEIGHT * 0.55);
  updateHud(performance.now());
}

function spawnLeaf(y = -60) {
  const roll = Math.random();
  const shouldForceFirstClover = !cloverFortuneSeen
    && greenLeafCount >= CLOVER_FORCE_LEAVES
    && !leaves.some((leaf) => leaf.type === "clover");
  const shouldSpawnLuckyTomato = !luckyTomatoSpawned
    && cloverFortuneSeen
    && greenLeafCount >= LUCKY_TOMATO_MIN_LEAVES
    && (greenLeafCount >= LUCKY_TOMATO_FORCE_LEAVES || Math.random() < 0.09);
  const shouldSpawnRareClover = cloverFortuneSeen && roll < CLOVER_CHANCE;
  const type = shouldSpawnLuckyTomato ? "tomato" : shouldForceFirstClover || shouldSpawnRareClover ? "clover" : "leaf";
  if (type === "tomato") luckyTomatoSpawned = true;
  const fallSpeed = (175 + Math.random() * 95 + Math.min(110, score * 1.4)) * SPEED_MULTIPLIER;
  leaves.push({
    x: 70 + Math.random() * (WORLD_WIDTH - 140),
    y,
    r: type === "tomato" ? 36 : type === "clover" ? 28 : LEAF_RADIUS,
    type,
    clover: type === "clover",
    fallSpeed,
    drift: -34 + Math.random() * 68,
    sway: 36 + Math.random() * 44,
    spin: Math.random() * Math.PI * 2,
    bob: Math.random() * Math.PI * 2,
  });
}

function burst(x, y, color) {
  for (let i = 0; i < 18; i += 1) {
    const angle = Math.random() * Math.PI * 2;
    const speed = 90 + Math.random() * 190;
    confetti.push({
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life: 0.45 + Math.random() * 0.55,
      color,
      size: 5 + Math.random() * 6,
    });
  }
}

function updateHud(now) {
  scoreEl.textContent = score;
  bestEl.textContent = best;
  const cloverBoosted = isCloverBoosted(now);
  luckyStatusEl.classList.toggle("lucky", cloverBoosted);
  luckyStatusEl.classList.toggle("windy", isWindy(now));
  const guideMessages = [
    "행운의 초록잎을 모아봐요",
    "네잎클로버를 받으면 행운 운세를 볼 수 있어요",
    "럭키토마토를 받으면 토마토 운세를 볼 수 있어요",
  ];
  if (isFortuneRaining(now)) {
    luckyStatusEl.textContent = "행운 뿌리기";
  } else if (cloverBoosted) {
    luckyStatusEl.textContent = "행운의 네잎클로버를 받아서 몸이 커졌어요!!";
  } else if (isGreenDancing(now)) {
    luckyStatusEl.textContent = "초록짱짱 댄스";
  } else if (isMagnetActive(now)) {
    luckyStatusEl.textContent = `자석 ${Math.ceil((magnetUntil - now) / 1000)}초`;
  } else if (isWindy(now)) {
    luckyStatusEl.textContent = "강풍 조심";
  } else {
    const abilityMessages = [];
    if (canTripleJump()) abilityMessages.push("3단 점프");
    if (canFly()) abilityMessages.push("자유 비행");
    const messages = abilityMessages.concat(guideMessages);
    luckyStatusEl.textContent = messages[Math.floor(now / 2600) % messages.length];
  }
  updateActionPanel(now);
}

function isWindy(now) {
  return now < windUntil;
}

function isCloverBoosted(now) {
  return now < cloverBoostUntil;
}

function startCloverBoost(fortune = "", now = performance.now()) {
  cloverBoostUntil = now + CLOVER_BOOST_DURATION;
  luckyStatusEl.textContent = "행운의 네잎클로버를 받아서 몸이 커졌어요!!";
  showBoostCaption("행운의 네잎클로버를 받아서 몸이 커졌어요!!", fortune);
  burst(player.x, Math.max(150, player.y - 150), "#f7d75b");
  burst(player.x, Math.max(190, player.y - 80), "#5ee088");
  updateHud(now);
}

function showBoostCaption(message, fortune = "") {
  boostCaptionEl.innerHTML = `
    <strong>${message}</strong>
    ${fortune ? `<span>${fortune}</span>` : ""}
  `;
  boostCaptionEl.classList.remove("hidden");
  if (boostCaptionTimer) window.clearTimeout(boostCaptionTimer);
  boostCaptionTimer = window.setTimeout(hideBoostCaption, CLOVER_BOOST_DURATION);
}

function hideBoostCaption() {
  if (boostCaptionTimer) window.clearTimeout(boostCaptionTimer);
  boostCaptionTimer = null;
  boostCaptionEl.classList.add("hidden");
  boostCaptionEl.innerHTML = "";
}

function startWind(now) {
  windUntil = now + WIND_DURATION;
  windPower = (Math.random() < 0.5 ? -1 : 1) * (185 + Math.random() * 115);
  nextWindAt = now + WIND_DURATION + 7500 + Math.random() * 9000;
  burst(WORLD_WIDTH / 2, 170, "#d8fbff");
}

function canFly() {
  return score >= FLY_SCORE;
}

function canTripleJump() {
  return score >= TRIPLE_JUMP_SCORE;
}

function getMaxJumps() {
  return canTripleJump() ? 3 : MAX_JUMPS;
}

function isFortuneRaining(now) {
  return now < fortuneRainUntil;
}

function isGreenDancing(now) {
  return now < greenDanceUntil;
}

function isDanceTime(now) {
  return isGreenDancing(now);
}

function isMagnetActive(now) {
  return now < magnetUntil;
}

function canDrawFortune() {
  return luckyTomatoMet || greenLeafCount >= FORTUNE_SCORE || fortuneUnlocked;
}

function updateActionPanel(now) {
  magnetButton.textContent = isMagnetActive(now)
    ? `자석 ${Math.ceil((magnetUntil - now) / 1000)}`
    : `자석 ${coins}`;
  magnetButton.disabled = coins <= 0 && !isMagnetActive(now);
  fortuneButton.disabled = !canDrawFortune();
  fortuneButton.textContent = canDrawFortune() ? "토마토 운세" : `${greenLeafCount}/777 운세`;
}

function update(dt, now) {
  floatTime += dt;
  if (isDanceTime(now)) {
    player.vx *= 0.84;
    player.vy = 0;
    if (!canFly()) {
      player.y = GROUND_Y;
      player.grounded = true;
      player.jumpCount = 0;
    }
    confetti.forEach((piece) => {
      piece.life -= dt;
      piece.x += piece.vx * dt;
      piece.y += piece.vy * dt;
      piece.vy += 130 * dt;
    });
    confetti = confetti.filter((piece) => piece.life > 0);
    if (isGreenDancing(now)) spawnGreenDanceSparkles(dt, now);
    updateHud(now);
    return;
  }

  const input = { x: 0, y: 0 };

  if (keyState.has("ArrowLeft") || keyState.has("KeyA") || keyState.has("left")) input.x -= 1;
  if (keyState.has("ArrowRight") || keyState.has("KeyD") || keyState.has("right")) input.x += 1;
  if (keyState.has("ArrowUp") || keyState.has("KeyW") || keyState.has("up")) input.y -= 1;
  if (keyState.has("ArrowDown") || keyState.has("KeyS") || keyState.has("down")) input.y += 1;

  input.x += getPointerDirection();

  if (now >= nextWindAt) startWind(now);

  spawnTimer -= dt;
  if (spawnTimer <= 0) {
    spawnLeaf();
    const pace = Math.max(0.42, 1.06 - score * 0.006);
    spawnTimer = (pace + Math.random() * 0.3) / SPEED_MULTIPLIER;
  }

  const speed = (canFly() ? 520 : isCloverBoosted(now) ? 610 : 440) * SPEED_MULTIPLIER;
  const inputLength = Math.hypot(input.x, input.y) || 1;
  player.vx += (clamp(input.x / inputLength, -1, 1) * speed - player.vx) * Math.min(1, dt * 11);
  if (canFly()) {
    player.vy += (clamp(input.y / inputLength, -1, 1) * speed - player.vy) * Math.min(1, dt * 11);
  } else {
    player.vy += GRAVITY * dt;
  }
  player.x = clamp(player.x + player.vx * dt, 48, WORLD_WIDTH - 48);
  player.y += player.vy * dt;
  if (canFly()) {
    player.y = clamp(player.y, 190, GROUND_Y);
    player.grounded = false;
    player.jumpCount = 0;
  } else if (player.y >= GROUND_Y) {
    player.y = GROUND_Y;
    player.vy = 0;
    player.grounded = true;
    player.jumpCount = 0;
  } else {
    player.grounded = false;
  }
  if (Math.abs(player.vx) > 10) player.face = Math.sign(player.vx);

  leaves = leaves.filter((leaf) => {
    leaf.spin += dt * (leaf.clover ? 4.6 : 3.2);
    const windPush = isWindy(now) ? windPower + Math.sin(floatTime * 12 + leaf.bob) * 165 : 0;
    let pullX = 0;
    let pullY = 0;
    if (isMagnetActive(now) && leaf.type === "leaf") {
      const dx = player.x - leaf.x;
      const dy = getBasketCatchY(now) - leaf.y;
      const dist = Math.hypot(dx, dy) || 1;
      const pull = MAGNET_STRENGTH * (1 + Math.max(0, 1 - dist / 720));
      pullX = (dx / dist) * pull;
      pullY = (dy / dist) * pull;
    }
    leaf.x += (leaf.drift + windPush + pullX + Math.sin(floatTime * 3.4 + leaf.bob) * leaf.sway) * dt;
    leaf.y += (leaf.fallSpeed + pullY) * dt;
    if (leaf.type === "tomato" && leaf.y > WORLD_HEIGHT + 80 && !luckyTomatoMet) {
      luckyTomatoSpawned = false;
    }
    if (leaf.x < 38 || leaf.x > WORLD_WIDTH - 38) {
      leaf.x = clamp(leaf.x, 38, WORLD_WIDTH - 38);
      leaf.drift *= -0.78;
    }

    const catchY = getBasketCatchY(now);
    const catchWidth = isCloverBoosted(now) ? 178 : 98;
    const catchHeight = isCloverBoosted(now) ? 70 : 42;
    const caught = Math.abs(player.x - leaf.x) < catchWidth && Math.abs(catchY - leaf.y) < catchHeight;
    if (caught) {
      score += leaf.type === "tomato" ? 11 : leaf.clover ? 7 : 1;
      if (leaf.type === "leaf") {
        greenLeafCount += 1;
        while (greenLeafCount >= nextMagnetRewardAt) {
          coins += 1;
          nextMagnetRewardAt += MAGNET_LEAF_REWARD;
          localStorage.setItem("leafLuckyCoins", String(coins));
          luckyStatusEl.textContent = "자석 1개 획득!";
          burst(player.x, catchY, "#7df2a0");
        }
      }
      if (leaf.clover) {
        openCloverFortuneModal();
      }
      if (leaf.type === "tomato") {
        luckyTomatoMet = true;
        fortuneUnlocked = true;
        selectedTomatoCharacter = pickTomatoCharacter();
        fortuneRainUntil = now + FORTUNE_RAIN_DURATION;
        burst(leaf.x, leaf.y, "#ff7662");
        openTomatoFortuneModal(true);
      }
      burst(leaf.x, leaf.y, leaf.type === "tomato" ? "#ff7662" : leaf.clover ? "#f6cf4f" : "#49bd72");
      return false;
    }
    return leaf.y < WORLD_HEIGHT + 90;
  });
  if (!flyAnnounced && score >= FLY_SCORE) {
    flyAnnounced = true;
    burst(player.x, player.y - 120, "#bde9ff");
  }
  if (!fortuneAnnounced && (score >= FORTUNE_SCORE || luckyTomatoMet)) {
    fortuneAnnounced = true;
    fortuneRainUntil = now + FORTUNE_RAIN_DURATION;
    burst(player.x, player.y - 160, "#f7d75b");
  }
  if (!fortuneUnlocked && greenLeafCount >= FORTUNE_SCORE) {
    fortuneUnlocked = true;
    burst(player.x, player.y - 180, "#ff7662");
  }

  if (score > best) {
    best = score;
    localStorage.setItem("leafLuckyBest", String(best));
  }

  confetti.forEach((piece) => {
    piece.life -= dt;
    piece.x += piece.vx * dt;
    piece.y += piece.vy * dt;
    piece.vy += 220 * dt;
  });
  confetti = confetti.filter((piece) => piece.life > 0);
  if (isFortuneRaining(now)) spawnFortuneSparkles(dt, now);

  updateHud(now);
}

function draw(now) {
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.setTransform(scale, 0, 0, scale, (canvas.width - WORLD_WIDTH * scale) / 2, (canvas.height - WORLD_HEIGHT * scale) / 2);

  drawMeadow();
  leaves.forEach(drawCollectible);
  confetti.forEach(drawConfetti);
  drawPlayer(now);
  if (isGreenDancing(now)) drawGreenDance(now);
}

function drawMeadow() {
  const grd = ctx.createLinearGradient(0, 0, 0, WORLD_HEIGHT);
  grd.addColorStop(0, "#bfeeff");
  grd.addColorStop(0.36, "#d8f8cc");
  grd.addColorStop(0.72, "#9fe1ad");
  grd.addColorStop(1, "#f4d47a");
  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, WORLD_WIDTH, WORLD_HEIGHT);

  ctx.fillStyle = "rgba(255,255,255,0.62)";
  for (let i = 0; i < 7; i += 1) {
    const x = ((i * 170 + floatTime * 18) % (WORLD_WIDTH + 220)) - 110;
    drawCloud(x, 120 + (i % 3) * 74, 0.74 + (i % 2) * 0.22);
  }

  ctx.globalAlpha = 0.4;
  for (let y = 270; y < WORLD_HEIGHT; y += 140) {
    for (let x = 30; x < WORLD_WIDTH; x += 110) {
      drawTinyLeaf(x + Math.sin(y) * 14, y, 0.8, "#69bd78");
    }
  }
  ctx.globalAlpha = 1;

  ctx.fillStyle = "rgba(255,255,255,0.45)";
  roundedRect(28, 96, WORLD_WIDTH - 56, WORLD_HEIGHT - 128, 38);
  ctx.fill();

  ctx.fillStyle = "rgba(64, 151, 84, 0.35)";
  ctx.fillRect(28, GROUND_Y + 36, WORLD_WIDTH - 56, 96);

  if (isWindy(performance.now())) {
    ctx.save();
    ctx.strokeStyle = "rgba(255,255,255,0.8)";
    ctx.lineWidth = 5;
    ctx.lineCap = "round";
    for (let i = 0; i < 8; i += 1) {
      const y = 230 + i * 105;
      const offset = ((floatTime * 260 + i * 90) % (WORLD_WIDTH + 240)) - 120;
      ctx.beginPath();
      ctx.moveTo(offset, y);
      ctx.bezierCurveTo(offset + 80, y - 26, offset + 180, y + 26, offset + 270, y - 10);
      ctx.stroke();
    }
    ctx.restore();
  }
}

function drawCollectible(leaf) {
  ctx.save();
  ctx.translate(leaf.x, leaf.y);
  ctx.rotate(leaf.spin + Math.sin(floatTime * 8 + leaf.bob) * (isWindy(performance.now()) ? 0.45 : 0.16));
  if (leaf.type === "tomato") {
    drawLuckyTomatoItem(0, 0, leaf.r);
  } else if (leaf.clover) {
    drawClover(0, 0, leaf.r);
  } else {
    drawLeaf(0, 0, leaf.r, "#35ad61", "#247e49");
  }
  ctx.restore();
}

function drawPlayer(now) {
  const cloverBoosted = isCloverBoosted(now);
  const s = getPlayerScale(now);
  const dancing = isDanceTime(now);
  const danceBeat = dancing ? Math.sin(floatTime * 18) : 0;
  const bounce = dancing
    ? Math.abs(Math.sin(floatTime * 16)) * -18
    : Math.sin(floatTime * 9) * (Math.abs(player.vx) + Math.abs(player.vy) > 20 ? 3 : 1);

  ctx.save();
  const drawX = dancing ? WORLD_WIDTH / 2 : player.x;
  const drawY = dancing ? GROUND_Y - 4 : player.y;
  ctx.translate(drawX + danceBeat * 44, drawY + bounce);
  if (dancing) ctx.rotate(Math.sin(floatTime * 14) * 0.22);
  ctx.scale(s * player.face * (dancing ? 1 + Math.abs(danceBeat) * 0.1 : 1), s * (dancing ? 1 - Math.abs(danceBeat) * 0.05 : 1));

  ctx.fillStyle = cloverBoosted ? "rgba(246, 207, 79, 0.34)" : "rgba(49, 151, 84, 0.18)";
  ctx.beginPath();
  ctx.ellipse(0, 34, 52, 14, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#f7f8ff";
  roundedRect(-28, -22, 56, 62, 22);
  ctx.fill();
  ctx.strokeStyle = "#d8def5";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(-20, 0);
  ctx.quadraticCurveTo(0, 12, 20, 0);
  ctx.stroke();

  ctx.fillStyle = "#1e2528";
  ctx.beginPath();
  ctx.ellipse(-27, -40, 15, 39, -0.12, 0, Math.PI * 2);
  ctx.ellipse(27, -40, 15, 39, 0.12, 0, Math.PI * 2);
  ctx.ellipse(0, -53, 33, 34, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#fbe0be";
  ctx.beginPath();
  ctx.arc(0, -40, 28, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#1e2528";
  ctx.beginPath();
  ctx.ellipse(0, -66, 30, 19, 0, Math.PI, Math.PI * 2);
  ctx.fill();
  for (let i = -18; i <= 18; i += 6) {
    ctx.beginPath();
    ctx.moveTo(i, -68);
    ctx.quadraticCurveTo(i + 3, -55, i - 1, -43);
    ctx.strokeStyle = "#101719";
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  ctx.fillStyle = "#427352";
  ctx.beginPath();
  ctx.arc(-9, -42, 3.8, 0, Math.PI * 2);
  ctx.arc(10, -42, 3.8, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "#c76f70";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(1, -34, 9, 0.15, Math.PI - 0.15);
  ctx.stroke();

  ctx.strokeStyle = "#2a2020";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(-13, -28);
  ctx.quadraticCurveTo(0, -23, 13, -28);
  ctx.stroke();
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(-7, -23);
  ctx.quadraticCurveTo(0, -18, 7, -23);
  ctx.stroke();

  drawCheekFlower(-20, -36);
  drawBasket(dancing ? Math.sin(floatTime * 22) * 18 : 0, dancing ? -86 + Math.cos(floatTime * 18) * 12 : -82, now);

  if (cloverBoosted) {
    ctx.fillStyle = "#f7d75b";
    for (let i = 0; i < 8; i += 1) {
      const a = floatTime * 1.8 + i * Math.PI / 4;
      ctx.beginPath();
      ctx.arc(Math.cos(a) * 43, Math.sin(a) * 43 - 26, 4, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  ctx.restore();
}

function getPlayerScale(now) {
  return isCloverBoosted(now) ? 1.85 : 1;
}

function getBasketCatchY(now) {
  return player.y - 82 * getPlayerScale(now);
}

function jump() {
  if (!running || canFly() || player.jumpCount >= getMaxJumps()) return;
  player.vy = JUMP_VELOCITY * (isCloverBoosted(performance.now()) ? 1.08 : 1);
  player.grounded = false;
  player.jumpCount += 1;
  burst(player.x, player.y + 28, "#bff7d4");
}

function startBossaNova() {
  if (bgmContext) {
    bgmContext.resume?.();
    return;
  }
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return;
  bgmContext = new AudioContext();
  bgmStep = 0;
  scheduleBossaNova();
  bgmTimer = window.setInterval(scheduleBossaNova, 150);
}

function scheduleBossaNova() {
  if (!bgmContext) return;
  const now = bgmContext.currentTime;
  const stepDuration = 0.16;
  while (bgmStep * stepDuration < now + 1.4) {
    const t = bgmStep * stepDuration;
    const beat = bgmStep % 16;
    const bar = Math.floor(bgmStep / 16) % 4;
    const chords = [
      [261.63, 329.63, 392.0, 493.88, 659.25],
      [293.66, 349.23, 440.0, 523.25, 698.46],
      [246.94, 311.13, 392.0, 466.16, 622.25],
      [220.0, 277.18, 349.23, 440.0, 554.37],
    ];
    const melody = [
      659.25, 783.99, 739.99, 659.25,
      587.33, 659.25, 523.25, 493.88,
      622.25, 739.99, 698.46, 622.25,
      554.37, 659.25, 587.33, 523.25,
    ];
    const chord = chords[bar];
    if ([0, 3, 6, 10, 13].includes(beat)) {
      playPianoChord(chord, t, beat === 0 ? 0.19 : 0.13);
    }
    if ([0, 4, 7, 11].includes(beat)) {
      playTone(chord[0] / 2, t, 0.22, 0.055, "sine");
      playTone(chord[0], t + 0.018, 0.12, 0.022, "triangle");
    }
    if ([2, 5, 8, 12, 15].includes(beat)) {
      playPianoNote(melody[(bar * 4 + beat) % melody.length], t + 0.012, 0.16, 0.04);
    }
    if ([9, 14].includes(beat)) {
      playPianoNote(melody[(bar * 4 + beat + 3) % melody.length] * 1.25, t + 0.02, 0.1, 0.025);
    }
    if ([1, 3, 5, 7, 9, 11, 13, 15].includes(beat)) playNoise(t, 0.035, 0.018);
    if ([4, 12].includes(beat)) playNoise(t, 0.055, 0.026);
    bgmStep += 1;
  }
}

function playPianoChord(chord, startAt, gainValue) {
  const voicing = [0, 1, 2, 3, 4].map((index) => chord[index] * (index > 2 ? 1 : 2));
  voicing.forEach((frequency, index) => {
    playPianoNote(frequency, startAt + index * 0.008, 0.34 - index * 0.025, gainValue * (index < 3 ? 0.34 : 0.24));
  });
  playPianoNote(chord[0], startAt + 0.016, 0.28, gainValue * 0.22);
}

function playPianoNote(frequency, startAt, duration, gainValue) {
  const output = bgmContext.createGain();
  output.gain.setValueAtTime(0, startAt);
  output.gain.linearRampToValueAtTime(gainValue, startAt + 0.008);
  output.gain.exponentialRampToValueAtTime(0.001, startAt + duration);
  output.connect(bgmContext.destination);

  [
    { ratio: 1, gain: 1, type: "triangle" },
    { ratio: 2.01, gain: 0.32, type: "sine" },
    { ratio: 3.01, gain: 0.12, type: "sine" },
  ].forEach((partial) => {
    const oscillator = bgmContext.createOscillator();
    const partialGain = bgmContext.createGain();
    oscillator.type = partial.type;
    oscillator.frequency.setValueAtTime(frequency * partial.ratio, startAt);
    oscillator.frequency.exponentialRampToValueAtTime(frequency * partial.ratio * 0.998, startAt + duration);
    partialGain.gain.value = partial.gain;
    oscillator.connect(partialGain).connect(output);
    oscillator.start(startAt);
    oscillator.stop(startAt + duration + 0.04);
  });
}

function playTone(frequency, startAt, duration, gainValue, type = "sine") {
  const oscillator = bgmContext.createOscillator();
  const gain = bgmContext.createGain();
  oscillator.type = type;
  oscillator.frequency.value = frequency;
  gain.gain.setValueAtTime(0, startAt);
  gain.gain.linearRampToValueAtTime(gainValue, startAt + 0.012);
  gain.gain.exponentialRampToValueAtTime(0.001, startAt + duration);
  oscillator.connect(gain).connect(bgmContext.destination);
  oscillator.start(startAt);
  oscillator.stop(startAt + duration + 0.02);
}

function playNoise(startAt, duration, gainValue) {
  const buffer = bgmContext.createBuffer(1, bgmContext.sampleRate * duration, bgmContext.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < data.length; i += 1) data[i] = (Math.random() * 2 - 1) * (1 - i / data.length);
  const source = bgmContext.createBufferSource();
  const filter = bgmContext.createBiquadFilter();
  const gain = bgmContext.createGain();
  filter.type = "highpass";
  filter.frequency.value = 5200;
  gain.gain.value = gainValue;
  source.buffer = buffer;
  source.connect(filter).connect(gain).connect(bgmContext.destination);
  source.start(startAt);
}

function useMagnet() {
  const now = performance.now();
  if (isMagnetActive(now)) return;
  if (coins <= 0) {
    luckyStatusEl.textContent = "초록잎 30개마다 자석이 생겨요";
    return;
  }
  coins -= 1;
  localStorage.setItem("leafLuckyCoins", String(coins));
  magnetUntil = now + MAGNET_DURATION;
  burst(player.x, getBasketCatchY(now), "#7df2a0");
  updateHud(now);
}

function pauseForModal() {
  modalResumeOnClose = running;
  running = false;
}

function clearCloverIntroTimer() {
  if (!cloverIntroTimer) return;
  window.clearTimeout(cloverIntroTimer);
  cloverIntroTimer = null;
}

function clearTomatoIntroTimer() {
  if (!tomatoIntroTimer) return;
  window.clearTimeout(tomatoIntroTimer);
  tomatoIntroTimer = null;
}

function openCloverFortuneModal() {
  pauseForModal();
  clearCloverIntroTimer();
  clearTomatoIntroTimer();
  fortuneMode = "clover";
  pendingCloverBoost = false;
  pendingCloverBoostFortune = "";
  fortuneModal.classList.remove("hidden");
  fortuneCloseButton.textContent = "닫기";
  const fortuneBox = fortuneModal.querySelector(".fortune-box");
  fortuneBox.classList.remove("tomato-result", "tomato-intro", "tomato-picker", "clover-picker", "clover-fortune-result");
  fortuneBox.classList.add("clover-result", "clover-intro");
  fortuneLabelEl.textContent = "";
  fortuneTitleEl.textContent = "찾았다! 네잎클로버";
  fortuneTextEl.textContent = "";
  renderCloverDanceStage();
  cloverIntroTimer = window.setTimeout(showCloverCardPicker, 2400);
}

function openTomatoFortuneModal(fromLuckyTomato = false) {
  if (!canDrawFortune()) {
    luckyStatusEl.textContent = "토마토를 찾아요";
    return;
  }
  pauseForModal();
  clearCloverIntroTimer();
  clearTomatoIntroTimer();
  fortuneMode = "tomato";
  pendingCloverBoost = false;
  pendingCloverBoostFortune = "";
  fortuneModal.classList.remove("hidden");
  fortuneCloseButton.textContent = "닫기";
  const fortuneBox = fortuneModal.querySelector(".fortune-box");
  fortuneBox.classList.remove("clover-result", "clover-intro", "clover-picker", "clover-fortune-result", "tomato-picker");
  fortuneBox.classList.add("tomato-result", "tomato-intro");
  fortuneLabelEl.textContent = fromLuckyTomato ? "토마토 파티 발생" : "행운의 토마토 파티~!~!";
  fortuneTitleEl.textContent = "방토단이 우르르 춤춰요!";
  fortuneTextEl.textContent = fromLuckyTomato
    ? "777개 전에 만난 개큰 행운이에요~!~! 토마토 파티가 끝나면 카드 2장 중 1장을 골라요!"
    : "토마토 파티가 끝나면 카드 2장 중 1장을 골라요!";
  renderTomatoPartyStage();
  tomatoIntroTimer = window.setTimeout(showTomatoCardPicker, 2600);
}

function closeFortuneModal() {
  clearCloverIntroTimer();
  clearTomatoIntroTimer();
  const shouldStartCloverBoost = pendingCloverBoost;
  const boostFortune = pendingCloverBoostFortune;
  pendingCloverBoost = false;
  pendingCloverBoostFortune = "";
  fortuneModal.classList.add("hidden");
  fortuneModal.querySelector(".fortune-box").classList.remove("clover-result", "tomato-result", "clover-intro", "clover-picker", "clover-fortune-result", "tomato-intro", "tomato-picker");
  if (modalResumeOnClose) running = true;
  modalResumeOnClose = false;
  if (shouldStartCloverBoost) startCloverBoost(boostFortune);
}

function showCloverCardPicker() {
  cloverIntroTimer = null;
  const fortuneBox = fortuneModal.querySelector(".fortune-box");
  fortuneBox.classList.remove("clover-result", "tomato-result", "clover-intro", "clover-fortune-result");
  fortuneBox.classList.add("clover-picker");
  fortuneLabelEl.textContent = "소소한 네잎클로버 운세";
  fortuneCloseButton.textContent = "닫기";
  fortuneTitleEl.innerHTML = "찾았다! 네잎클로버🍀<br>오늘의 행운을 골라봐요!";
  fortuneTextEl.textContent = "카드 1장을 골라요. 네잎클로버가 오늘의 작은 행운을 봐줄게요.";
  renderFortuneCards(3, "clover");
}

function showTomatoCardPicker() {
  tomatoIntroTimer = null;
  selectedTomatoCards = pickRandomTomatoCards();
  const fortuneBox = fortuneModal.querySelector(".fortune-box");
  fortuneBox.classList.remove("tomato-result", "tomato-intro", "clover-result");
  fortuneBox.classList.add("tomato-picker");
  fortuneLabelEl.textContent = "행운의 토마토 뽑기~!~!";
  fortuneTitleEl.textContent = "토마토 카드 2장 중 1장을 골라요";
  fortuneTextEl.textContent = "멋쟁이 토마토가 멋진 운세를 알려줄게요.";
  fortuneCloseButton.textContent = "닫기";
  renderFortuneCards(2, "tomato");
}

function renderFortuneCards(count, mode) {
  fortuneCardsEl.style.setProperty("--card-count", String(count));
  fortuneCardsEl.innerHTML = "";
  for (let i = 0; i < count; i += 1) {
    const tomatoCharacter = selectedTomatoCards[i] || TOMATO_CHARACTERS[(TOMATO_CHARACTERS.indexOf(selectedTomatoCharacter) + i + TOMATO_CHARACTERS.length) % TOMATO_CHARACTERS.length];
    const button = document.createElement("button");
    button.type = "button";
    button.dataset.card = String(i);
    button.className = mode === "clover" ? "clover-card" : "tomato-card";
    button.innerHTML = mode === "clover"
      ? `<span class="card-face clover-face">🍀</span><span class="card-sound">먕먕~!!</span>`
      : `<span class="tomato-card-glow"></span><img class="card-face" src="${tomatoCharacter.src}" alt="${tomatoCharacter.name}"><span class="card-sound">${tomatoCharacter.name}</span><span class="tomato-card-caption">상큼뽀짝 운세</span>`;
    button.addEventListener("click", () => pickFortune(i));
    fortuneCardsEl.appendChild(button);
  }
}

function pickFortune(cardIndex) {
  const fortunes = fortuneMode === "clover" ? BASIC_FORTUNES : TOMATO_FORTUNES;
  const salt = fortuneMode === "clover" ? 17 : 41;
  const picked = (greenLeafCount * 3 + score + cardIndex * salt + new Date().getDate()) % fortunes.length;
  if (fortuneMode === "clover") {
    showCloverFortuneResult(cardIndex, fortunes[picked]);
    return;
  }
  selectedTomatoCharacter = selectedTomatoCards[cardIndex] || TOMATO_CHARACTERS[(TOMATO_CHARACTERS.indexOf(selectedTomatoCharacter) + cardIndex + TOMATO_CHARACTERS.length) % TOMATO_CHARACTERS.length];
  showTomatoFortuneResult(fortunes[picked]);
}

function pickTomatoCharacter() {
  const index = (greenLeafCount + score + new Date().getDate() + Math.floor(Math.random() * TOMATO_CHARACTERS.length)) % TOMATO_CHARACTERS.length;
  return TOMATO_CHARACTERS[index];
}

function pickRandomTomatoCards() {
  const shuffled = [...TOMATO_CHARACTERS];
  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, 2);
}

function showCloverFortuneResult(cardIndex, fortune) {
  cloverFortuneSeen = true;
  pendingCloverBoost = true;
  pendingCloverBoostFortune = fortune;
  const fortuneBox = fortuneModal.querySelector(".fortune-box");
  fortuneBox.classList.remove("clover-picker", "clover-intro", "tomato-result", "tomato-picker");
  fortuneBox.classList.add("clover-result", "clover-fortune-result");
  fortuneCloseButton.textContent = "운세 받고 닫기";
  fortuneLabelEl.textContent = "오늘의 네잎클로버 운세";
  fortuneTitleEl.textContent = `${cardIndex + 1}번 행운을 골랐어요`;
  fortuneCardsEl.style.setProperty("--card-count", "1");
  fortuneCardsEl.innerHTML = `
    <div class="clover-result-charm" aria-hidden="true">
      <div class="clover-sparkles"><i></i><i></i><i></i><i></i></div>
      <div class="dancing-clover">
        <span></span>
        <div class="clover-face-cute"><b class="clover-mouth">ᴗ</b></div>
        <div class="clover-leg left"></div>
        <div class="clover-leg right"></div>
      </div>
      <div class="clover-dance-bubble one">먕먕~!!</div>
    </div>
  `;
  fortuneTextEl.textContent = fortune;
}

function renderCloverDanceStage() {
  fortuneCardsEl.style.setProperty("--card-count", "1");
  fortuneCardsEl.innerHTML = `
    <div class="clover-dance-stage" aria-hidden="true">
      <div class="clover-party-rays"></div>
      <div class="clover-sparkles"><i></i><i></i><i></i><i></i></div>
      <div class="clover-dance-floor"></div>
      <div class="dancing-clover side left">
        <span></span>
        <div class="clover-face-cute"><b class="clover-mouth">ᴗ</b></div>
        <div class="clover-leg left"></div>
        <div class="clover-leg right"></div>
      </div>
      <div class="dancing-clover">
        <span></span>
        <div class="clover-face-cute"><b class="clover-mouth">ᴗ</b></div>
        <div class="clover-leg left"></div>
        <div class="clover-leg right"></div>
      </div>
      <div class="dancing-clover side right">
        <span></span>
        <div class="clover-face-cute"><b class="clover-mouth">ᴗ</b></div>
        <div class="clover-leg left"></div>
        <div class="clover-leg right"></div>
      </div>
      <div class="clover-dance-bubble one">먕먕~!!</div>
      <div class="clover-dance-bubble two">룰루</div>
    </div>
  `;
}

function renderTomatoPartyStage() {
  fortuneCardsEl.style.setProperty("--card-count", "1");
  fortuneCardsEl.innerHTML = `
    <div class="tomato-party-stage" aria-hidden="true">
      <div class="tomato-party-rays"></div>
      <div class="tomato-party-floor"></div>
      <div class="bangto-friend one"><img src="/assets/tomato-cute/bangto.svg" alt=""></div>
      <div class="bangto-friend two"><img src="/assets/tomato-cute/toring.svg" alt=""></div>
      <div class="bangto-friend three"><img src="/assets/tomato-cute/tosoon.svg" alt=""></div>
      <div class="bangto-friend four"><img src="/assets/tomato-cute/tomato.svg" alt=""></div>
      <div class="bangto-note a">♪</div>
      <div class="bangto-note b">♫</div>
      <div class="bangto-note c">♬</div>
      <div class="tomato-hype">토마토 파티 룰루</div>
    </div>
  `;
}

function showTomatoFortuneResult(fortune) {
  const fortuneBox = fortuneModal.querySelector(".fortune-box");
  fortuneBox.classList.remove("tomato-picker", "tomato-intro");
  fortuneBox.classList.add("tomato-result");
  pendingCloverBoost = false;
  fortuneCloseButton.textContent = "닫기";
  fortuneLabelEl.textContent = "개큰 행운 폭발 중";
  fortuneTitleEl.textContent = "행운의 토마토가 운세를 봐줘요~!~!";
  fortuneCardsEl.style.setProperty("--card-count", "1");
  fortuneCardsEl.innerHTML = `
    <div class="tomato-dance-stage" aria-hidden="true">
      <div class="tomato-burst"><i></i><i></i><i></i><i></i><i></i><i></i></div>
      <img class="dancing-tomato-photo" src="${selectedTomatoCharacter.src}" alt="">
      <div class="tomato-hype">${selectedTomatoCharacter.name}의 개큰 행운~!~!</div>
    </div>
  `;
  fortuneTextEl.textContent = buildDetailedTomatoFortune(fortune);
}

function buildDetailedTomatoFortune(fortune) {
  return `${selectedTomatoCharacter.name}가 오늘의 기운을 톡톡 살펴봤어요.
${fortune}
오늘은 너무 크게 욕심내기보다, 기분 좋아지는 선택을 하나만 해보면 좋아요.
맛있는 것, 귀여운 것, 잠깐의 산책처럼 작은 즐거움이 운을 부풀려줄 거예요.
그리고 누군가에게 다정하게 말하면 그 행운이 다시 두목님 쪽으로 돌아올 거예요~!`;
}

function drawBasket(x, y, now = performance.now()) {
  ctx.save();
  ctx.translate(x, y);
  if (isFortuneRaining(now)) {
    ctx.rotate(floatTime * 8);
    ctx.translate(0, -8 + Math.sin(floatTime * 10) * 4);
  }
  ctx.lineCap = "round";

  ctx.strokeStyle = "#9b6a32";
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.arc(0, 4, 40, Math.PI * 1.08, Math.PI * 1.92);
  ctx.stroke();

  ctx.fillStyle = "#d99b46";
  ctx.strokeStyle = "#83532a";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(-48, -2);
  ctx.lineTo(48, -2);
  ctx.lineTo(34, 28);
  ctx.quadraticCurveTo(0, 38, -34, 28);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.strokeStyle = "rgba(255,255,255,0.45)";
  ctx.lineWidth = 3;
  for (let i = -28; i <= 28; i += 14) {
    ctx.beginPath();
    ctx.moveTo(i - 6, 2);
    ctx.lineTo(i + 3, 27);
    ctx.stroke();
  }

  ctx.strokeStyle = "#8f5d2e";
  ctx.lineWidth = 4;
  for (let yLine = 9; yLine <= 23; yLine += 14) {
    ctx.beginPath();
    ctx.moveTo(-40, yLine);
    ctx.quadraticCurveTo(0, yLine + 7, 40, yLine);
    ctx.stroke();
  }

  ctx.restore();
}

function drawCheekFlower(x, y) {
  ctx.save();
  ctx.translate(x, y);
  ctx.fillStyle = "#f6f0d3";
  ctx.strokeStyle = "#d7c7ef";
  ctx.lineWidth = 1.4;
  for (let i = 0; i < 5; i += 1) {
    ctx.save();
    ctx.rotate(i * Math.PI * 0.4);
    ctx.beginPath();
    ctx.ellipse(0, -5, 3.2, 6, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }
  ctx.fillStyle = "#ffe175";
  ctx.beginPath();
  ctx.arc(0, 0, 2.4, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawGreenDance(now) {
  const life = Math.max(0, (greenDanceUntil - now) / GREEN_DANCE_DURATION);
  ctx.save();
  ctx.globalAlpha = Math.min(1, life * 2.2);
  drawPsychedelicLights();

  ctx.fillStyle = "rgba(226, 255, 214, 0.9)";
  roundedRect(56, 102, WORLD_WIDTH - 112, 116, 30);
  ctx.fill();
  ctx.fillStyle = "#18874d";
  ctx.font = "900 38px 'Trebuchet MS', sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("초록짱짱 럭키걸 🍀", WORLD_WIDTH / 2, 146);
  ctx.font = "900 28px 'Trebuchet MS', sans-serif";
  ctx.fillText("네잎클로버 휘날리기!", WORLD_WIDTH / 2, 184);

  ctx.fillStyle = "rgba(62, 210, 100, 0.16)";
  ctx.beginPath();
  ctx.ellipse(WORLD_WIDTH / 2, GROUND_Y - 62, 350 + Math.sin(floatTime * 14) * 24, 130, 0, 0, Math.PI * 2);
  ctx.fill();

  for (let i = 0; i < 26; i += 1) {
    const orbit = 110 + (i % 5) * 46;
    const angle = floatTime * (2.4 + (i % 4) * 0.28) + i * 0.7;
    const x = WORLD_WIDTH / 2 + Math.cos(angle) * orbit + Math.sin(floatTime * 8 + i) * 18;
    const y = GROUND_Y - 260 + Math.sin(angle * 1.2) * 190;
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle + Math.sin(floatTime * 12 + i) * 0.7);
    drawClover(0, 0, 18 + (i % 3) * 4);
    ctx.restore();
  }

  ctx.strokeStyle = "rgba(255, 245, 110, 0.86)";
  ctx.lineWidth = 8;
  ctx.lineCap = "round";
  for (let i = 0; i < 10; i += 1) {
    const x = 55 + i * 88;
    const y = 390 + Math.sin(floatTime * 13 + i) * 64;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.bezierCurveTo(x + 28, y - 92, x + 74, y + 72, x + 112, y - 22);
    ctx.stroke();
  }
  ctx.restore();
}

function drawPsychedelicLights() {
  ctx.save();
  const colors = [
    "rgba(255, 68, 86, 0.28)",
    "rgba(255, 223, 84, 0.26)",
    "rgba(78, 220, 255, 0.24)",
    "rgba(160, 99, 255, 0.22)",
  ];
  for (let i = 0; i < 8; i += 1) {
    const side = i % 2 === 0 ? -80 : WORLD_WIDTH + 80;
    const targetX = WORLD_WIDTH / 2 + Math.sin(floatTime * 5 + i) * 220;
    const targetY = GROUND_Y - 180 + Math.cos(floatTime * 7 + i) * 190;
    const beam = ctx.createLinearGradient(side, 70 + i * 38, targetX, targetY);
    beam.addColorStop(0, colors[i % colors.length]);
    beam.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = beam;
    ctx.beginPath();
    ctx.moveTo(side, 70 + i * 38);
    ctx.lineTo(targetX - 80, targetY + 160);
    ctx.lineTo(targetX + 80, targetY + 160);
    ctx.closePath();
    ctx.fill();
  }
  for (let i = 0; i < 16; i += 1) {
    ctx.fillStyle = colors[i % colors.length].replace("0.2", "0.55").replace("0.28", "0.55").replace("0.26", "0.55").replace("0.24", "0.55").replace("0.22", "0.55");
    ctx.beginPath();
    ctx.arc(
      ((i * 87 + floatTime * 240) % (WORLD_WIDTH + 140)) - 70,
      250 + Math.sin(floatTime * 9 + i) * 180,
      12 + Math.sin(floatTime * 13 + i) * 5,
      0,
      Math.PI * 2
    );
    ctx.fill();
  }
  ctx.restore();
}

function spawnGreenDanceSparkles(dt, now) {
  const count = Math.ceil(34 * dt);
  for (let i = 0; i < count; i += 1) {
    const angle = Math.random() * Math.PI * 2;
    const radius = 60 + Math.random() * 220;
    confetti.push({
      x: WORLD_WIDTH / 2 + Math.cos(angle + floatTime * 4) * radius,
      y: GROUND_Y - 230 + Math.sin(angle + floatTime * 5) * (70 + Math.random() * 160),
      vx: Math.cos(angle) * (120 + Math.random() * 230),
      vy: Math.sin(angle) * (120 + Math.random() * 180) - 150,
      life: 0.65 + Math.random() * 0.8,
      color: Math.random() < 0.55 ? "#42d66f" : "#f7d75b",
      size: 6 + Math.random() * 10,
    });
  }
  if (Math.floor(now / 90) % 2 === 0) {
    confetti.push({
      x: WORLD_WIDTH / 2 + Math.sin(floatTime * 18) * 260,
      y: GROUND_Y - 280 + Math.cos(floatTime * 15) * 150,
      vx: -120 + Math.random() * 240,
      vy: -230 - Math.random() * 120,
      life: 0.72,
      color: "#5ee088",
      size: 14,
    });
  }
}

function spawnFortuneSparkles(dt, now) {
  const count = Math.ceil(18 * dt);
  for (let i = 0; i < count; i += 1) {
    const angle = Math.random() * Math.PI * 2;
    const radius = 42 + Math.random() * 56;
    confetti.push({
      x: player.x + Math.cos(angle + floatTime * 8) * radius,
      y: getBasketCatchY(now) + Math.sin(angle + floatTime * 8) * radius,
      vx: Math.cos(angle) * (80 + Math.random() * 160),
      vy: -80 - Math.random() * 170,
      life: 0.7 + Math.random() * 0.6,
      color: Math.random() < 0.5 ? "#f7d75b" : "#5ee088",
      size: 5 + Math.random() * 7,
    });
  }
}

function drawCloud(x, y, s) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(s, s);
  ctx.beginPath();
  ctx.arc(0, 10, 30, 0, Math.PI * 2);
  ctx.arc(34, -4, 42, 0, Math.PI * 2);
  ctx.arc(78, 10, 31, 0, Math.PI * 2);
  ctx.arc(38, 22, 48, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawLeaf(x, y, r, fill, stroke) {
  ctx.save();
  ctx.translate(x, y);
  ctx.fillStyle = fill;
  ctx.strokeStyle = stroke;
  ctx.lineWidth = Math.max(2, r * 0.1);

  ctx.beginPath();
  ctx.moveTo(0, -r * 0.92);
  ctx.bezierCurveTo(r * 0.62, -r * 0.86, r * 0.93, -r * 0.32, r * 0.46, r * 0.18);
  ctx.bezierCurveTo(r * 0.18, r * 0.5, r * 0.03, r * 0.73, 0, r * 0.96);
  ctx.bezierCurveTo(-r * 0.03, r * 0.73, -r * 0.18, r * 0.5, -r * 0.46, r * 0.18);
  ctx.bezierCurveTo(-r * 0.93, -r * 0.32, -r * 0.62, -r * 0.86, 0, -r * 0.92);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.strokeStyle = "rgba(255,255,255,0.72)";
  ctx.lineWidth = Math.max(1.4, r * 0.07);
  ctx.beginPath();
  ctx.moveTo(0, -r * 0.56);
  ctx.quadraticCurveTo(r * 0.06, -r * 0.05, 0, r * 0.62);
  ctx.stroke();

  ctx.fillStyle = "rgba(255,255,255,0.58)";
  ctx.beginPath();
  ctx.ellipse(-r * 0.22, -r * 0.32, r * 0.16, r * 0.26, -0.72, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#f7d75b";
  ctx.beginPath();
  ctx.arc(r * 0.44, -r * 0.58, r * 0.12, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawTinyLeaf(x, y, s, color) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate((x + y) % 4);
  drawLeaf(0, 0, 13 * s, color, "rgba(55, 122, 68, 0.5)");
  ctx.restore();
}

function drawClover(x, y, r) {
  ctx.save();
  ctx.translate(x, y);
  ctx.fillStyle = "#2bb85e";
  ctx.strokeStyle = "#176d3c";
  ctx.lineWidth = 3;
  for (let i = 0; i < 4; i += 1) {
    ctx.save();
    ctx.rotate(i * Math.PI / 2);
    ctx.beginPath();
    ctx.ellipse(0, -r * 0.42, r * 0.45, r * 0.58, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }
  ctx.strokeStyle = "#176d3c";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(0, r * 0.18);
  ctx.quadraticCurveTo(r * 0.22, r * 0.58, r * 0.05, r * 0.9);
  ctx.stroke();
  ctx.restore();
}

function drawLuckyTomatoItem(x, y, r) {
  ctx.save();
  ctx.translate(x, y);
  const pulse = 1 + Math.sin(floatTime * 10) * 0.08;
  ctx.scale(pulse, pulse);

  ctx.fillStyle = "rgba(255, 230, 95, 0.42)";
  ctx.beginPath();
  ctx.arc(0, 0, r * 1.45, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#f24c3f";
  ctx.strokeStyle = "#9f2c29";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.ellipse(0, 8, r * 0.94, r * 0.82, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "#258849";
  ctx.strokeStyle = "#176d3c";
  ctx.lineWidth = 3;
  for (let i = 0; i < 5; i += 1) {
    ctx.save();
    ctx.rotate((i * Math.PI * 2) / 5);
    ctx.beginPath();
    ctx.ellipse(0, -r * 0.68, r * 0.18, r * 0.42, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }

  ctx.strokeStyle = "#251f21";
  ctx.lineWidth = 4;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(-r * 0.44, 2);
  ctx.lineTo(-r * 0.16, -r * 0.03);
  ctx.moveTo(r * 0.16, -r * 0.03);
  ctx.lineTo(r * 0.44, 2);
  ctx.stroke();

  ctx.fillStyle = "#fff3a8";
  ctx.beginPath();
  ctx.arc(-r * 0.42, r * 0.28, r * 0.12, 0, Math.PI * 2);
  ctx.arc(r * 0.42, r * 0.28, r * 0.12, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = "#fff17d";
  ctx.lineWidth = 5;
  for (let i = 0; i < 4; i += 1) {
    const angle = floatTime * 3 + i * Math.PI / 2;
    const sx = Math.cos(angle) * r * 1.45;
    const sy = Math.sin(angle) * r * 1.45;
    ctx.beginPath();
    ctx.moveTo(sx - 6, sy);
    ctx.lineTo(sx + 6, sy);
    ctx.moveTo(sx, sy - 6);
    ctx.lineTo(sx, sy + 6);
    ctx.stroke();
  }

  ctx.restore();
}

function drawConfetti(piece) {
  ctx.save();
  ctx.globalAlpha = Math.max(0, piece.life);
  ctx.fillStyle = piece.color;
  ctx.translate(piece.x, piece.y);
  ctx.rotate(piece.life * 8);
  ctx.fillRect(-piece.size / 2, -piece.size / 2, piece.size, piece.size);
  ctx.restore();
}

function roundedRect(x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function loop(now) {
  const dt = Math.min(0.033, (now - lastTime) / 1000 || 0);
  lastTime = now;
  if (running) update(dt, now);
  draw(now);
  requestAnimationFrame(loop);
}

startButton.addEventListener("click", () => {
  startBossaNova();
  startOverlay.classList.add("hidden");
  resetGame();
});
magnetButton.addEventListener("click", useMagnet);
fortuneButton.addEventListener("click", openTomatoFortuneModal);
fortuneCloseButton.addEventListener("click", closeFortuneModal);

window.addEventListener("resize", () => setAppHeight());
window.addEventListener("orientationchange", () => window.setTimeout(() => setAppHeight(true), 180));
window.visualViewport?.addEventListener("resize", () => setAppHeight());
window.addEventListener(
  "dblclick",
  (event) => {
    event.preventDefault();
  },
  { passive: false }
);
window.addEventListener(
  "touchend",
  (event) => {
    const now = performance.now();
    if (now - lastTouchEndAt < 360) {
      event.preventDefault();
    }
    lastTouchEndAt = now;
  },
  { passive: false }
);
window.addEventListener(
  "touchmove",
  (event) => {
    if (!event.target.closest(".fortune-box")) event.preventDefault();
  },
  { passive: false }
);
window.addEventListener(
  "wheel",
  (event) => {
    if (!event.target.closest(".fortune-box")) event.preventDefault();
  },
  { passive: false }
);
window.addEventListener("keydown", (event) => {
  keyState.add(event.code);
  if ((event.code === "Space" || event.code === "ArrowUp" || event.code === "KeyW") && !event.repeat) {
    event.preventDefault();
    jump();
  }
});
window.addEventListener("keyup", (event) => keyState.delete(event.code));

canvas.addEventListener("pointerdown", (event) => {
  event.preventDefault();
  trackPointer(event);
  canvas.setPointerCapture(event.pointerId);
});
canvas.addEventListener("pointermove", (event) => {
  event.preventDefault();
  if (!event.buttons) return;
  trackPointer(event);
});
canvas.addEventListener("pointerup", (event) => {
  event.preventDefault();
  const pointer = activePointers.get(event.pointerId);
  if (pointer && !pointer.moved && pointer.zone === 0) jump();
  activePointers.delete(event.pointerId);
});
canvas.addEventListener("pointercancel", (event) => {
  event.preventDefault();
  activePointers.delete(event.pointerId);
});
canvas.addEventListener("contextmenu", (event) => {
  event.preventDefault();
});

setAppHeight(true);
for (let i = 0; i < 9; i += 1) spawnLeaf();
requestAnimationFrame((now) => {
  lastTime = now;
  requestAnimationFrame(loop);
});
