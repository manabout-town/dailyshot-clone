-- 브랜드
insert into brands (name, name_ko) values
  ('Good Smile Company', '굿스마일'),
  ('Bandai', '반다이'),
  ('Kotobukiya', '코토부키야'),
  ('Max Factory', '맥스팩토리'),
  ('Alter', '알터');

-- 카테고리
insert into categories (name, slug, priority) values
  ('애니메이션', 'anime', 1),
  ('게임', 'game', 2),
  ('스포츠', 'sports', 3),
  ('영화', 'movie', 4);

-- 시리즈
insert into series (name, name_ko, brand_id) values
  ('One Piece', '원피스', (select id from brands where name = 'Bandai')),
  ('Demon Slayer', '귀멸의 칼날', (select id from brands where name = 'Good Smile Company')),
  ('Hololive', '홀로라이브', (select id from brands where name = 'Good Smile Company')),
  ('Final Fantasy', '파이널판타지', (select id from brands where name = 'Kotobukiya'));

-- 상품 20개 (description 포함)
insert into products (name, name_ko, description, price, original_price, brand_id, series_id, category_id, stock, scale, is_active, is_featured, release_date) values
  ('Monkey D. Luffy', '몽키 D. 루피',
   '원피스의 주인공 몽키 D. 루피를 1/8 스케일로 정교하게 재현한 피규어입니다. 상징적인 밀짚모자와 빨간 셔츠, 청바지 의상을 세밀하게 표현하였으며, 고무고무 열매 능력을 연상시키는 역동적인 포즈가 특징입니다. PVC 소재로 제작되어 내구성이 뛰어나며, 전용 디스플레이 베이스가 포함되어 있습니다. 반다이의 최신 도장 기술이 적용되어 원작 애니메이션의 생동감을 완벽하게 구현하였습니다.',
   89000, null,
   (select id from brands where name = 'Bandai'),
   (select id from series where name = 'One Piece'),
   (select id from categories where slug = 'anime'),
   10, '1/8', true, true, '2024-03-15'),

  ('Roronoa Zoro', '롤로노아 조로',
   '삼도류의 달인 롤로노아 조로를 1/8 스케일로 재현한 한정판 피규어입니다. 세 자루의 검을 동시에 휘두르는 포즈로, 조로 특유의 강렬한 전투 기세를 표현하였습니다. 녹색 머리카락과 하오리의 섬세한 도장이 인상적이며, 검신에는 반사 효과 코팅이 적용되었습니다. 전용 이펙트 파츠와 교체용 표정 파츠가 포함된 고급 사양입니다.',
   95000, 110000,
   (select id from brands where name = 'Bandai'),
   (select id from series where name = 'One Piece'),
   (select id from categories where slug = 'anime'),
   5, '1/8', true, true, '2024-05-20'),

  ('Tanjiro Kamado', '카마도 탄지로',
   '귀멸의 칼날 주인공 카마도 탄지로를 1/7 스케일로 정밀하게 재현한 피규어입니다. 수지 호흡 기술을 사용하는 동작 포즈와 함께, 특징적인 이마의 상처와 격자무늬 하오리가 세밀하게 재현되었습니다. 일본도의 투명한 칼날 이펙트 파츠가 포함되어 있어 전투 장면을 생동감 있게 연출할 수 있습니다. ABS+PVC 복합 소재로 제작하여 섬세한 디테일과 내구성을 동시에 달성하였습니다.',
   79000, null,
   (select id from brands where name = 'Good Smile Company'),
   (select id from series where name = 'Demon Slayer'),
   (select id from categories where slug = 'anime'),
   8, '1/7', true, true, '2024-02-10'),

  ('Nezuko Kamado', '카마도 네즈코',
   '귀멸의 칼날 히로인 카마도 네즈코를 1/7 스케일로 재현한 피규어입니다. 죽세공 재갈과 핑크빛 기모노, 특유의 발톱과 뿔이 세밀하게 조형되어 있습니다. 악마화된 네즈코의 눈동자는 특수 글로우 도료를 사용하여 빛에 따라 다르게 보이는 효과를 구현하였습니다. 탄지로 피규어와 나란히 전시하면 시너지가 극대화되는 구성입니다.',
   75000, 85000,
   (select id from brands where name = 'Good Smile Company'),
   (select id from series where name = 'Demon Slayer'),
   (select id from categories where slug = 'anime'),
   3, '1/7', true, false, '2024-02-10'),

  ('Hatsune Miku', '하츠네 미쿠',
   '세계적인 버추얼 아이돌 하츠네 미쿠를 넨도로이드 사이즈로 재현한 피규어입니다. 트레이드마크인 청록색 트윈테일과 무대 의상이 넨도로이드 특유의 귀여운 SD 비율로 완성되었습니다. 다양한 표정 파츠(웃음, 노래, 윙크)와 마이크 소품이 포함되어 있어 폭넓은 디스플레이 연출이 가능합니다. 굿스마일컴퍼니의 넨도로이드 시리즈 중 역대 최다 판매를 기록한 인기 아이템입니다.',
   135000, null,
   (select id from brands where name = 'Good Smile Company'),
   null,
   (select id from categories where slug = 'anime'),
   12, 'Nendoroid', true, true, '2023-12-01'),

  ('Cloud Strife', '클라우드 스트라이프',
   '파이널 판타지 VII의 주인공 클라우드 스트라이프를 1/6 스케일의 대형 피규어로 재현하였습니다. 게임 리마스터 버전의 그래픽을 기반으로 제작되어, 블론드 스파이키 헤어와 버스터 소드의 압도적인 존재감이 특징입니다. 소드의 칼날 부분은 금속 도료로 마감하여 실제 금속 재질감을 구현하였으며, 미드가르 슬럼가를 형상화한 전용 디오라마 베이스가 포함되어 있습니다.',
   185000, 210000,
   (select id from brands where name = 'Kotobukiya'),
   (select id from series where name = 'Final Fantasy'),
   (select id from categories where slug = 'game'),
   4, '1/6', true, true, '2024-06-01'),

  ('Tifa Lockhart', '티파 록하트',
   '파이널 판타지 VII 리메이크의 티파 록하트를 1/6 스케일로 세밀하게 재현한 피규어입니다. 콤팩트하고 탄탄한 체형과 검은 탱크톱, 미니스커트의 조합이 원작 디자인을 충실히 따르고 있습니다. 격투술 특유의 준비 자세를 취하고 있으며, 손의 글러브와 발의 웨스턴 부츠 디테일이 돋보입니다. 코토부키야의 비시주조 라인업 중 완성도가 높은 제품입니다.',
   175000, null,
   (select id from brands where name = 'Kotobukiya'),
   (select id from series where name = 'Final Fantasy'),
   (select id from categories where slug = 'game'),
   6, '1/6', true, false, '2024-07-15'),

  ('Aerith Gainsborough', '에어리스 게인즈버러',
   '파이널 판타지 VII의 고대종 에어리스 게인즈버러를 1/7 스케일로 우아하게 표현한 피규어입니다. 꽃을 배경으로 한 평화로운 포즈와 분홍 드레스, 핑크 재킷의 섬세한 레이어링이 인상적입니다. 기도하듯 모은 손과 바람에 흩날리는 머리카락의 표현에 알터 특유의 조형력이 집약되어 있습니다. 전용 꽃밭 디오라마 베이스와 함께 전시하면 라스트 오더의 명장면을 재현할 수 있습니다.',
   165000, 190000,
   (select id from brands where name = 'Alter'),
   (select id from series where name = 'Final Fantasy'),
   (select id from categories where slug = 'game'),
   2, '1/7', true, true, '2024-04-20'),

  ('Son Goku', '손오공',
   '드래곤볼 슈퍼의 주인공 손오공 초사이어인 블루 변신 형태를 S.H.Figuarts로 재현한 액션 피규어입니다. 30개 이상의 가동 부위를 갖춰 극한의 관절 가동성을 자랑하며, 에너지파 이펙트 파츠와 6종의 교체용 손 파츠가 포함되어 있습니다. 청색 오라 이펙트 파츠를 장착하면 전투 신을 역동적으로 연출할 수 있습니다. 반다이 스피릿의 전문 도장 기술로 파란 머리카락의 그라데이션을 완벽하게 구현하였습니다.',
   99000, null,
   (select id from brands where name = 'Bandai'),
   null,
   (select id from categories where slug = 'anime'),
   15, 'S.H.Figuarts', true, false, '2024-01-10'),

  ('Vegeta', '베지터',
   '드래곤볼 슈퍼의 사이어인의 왕자 베지터 초사이어인 블루 형태를 S.H.Figuarts로 재현한 피규어입니다. 특유의 직립 머리카락과 오만한 표정이 베지터의 캐릭터성을 완벽히 담아냈습니다. 베지터 특유의 포즈인 양팔 교차 방어 자세와 파이널 플래시 준비 자세를 모두 연출할 수 있는 다양한 파츠가 동봉되어 있습니다. 손오공 피규어와 함께 배치하면 라이벌 구도를 연출하기에 최적입니다.',
   99000, 115000,
   (select id from brands where name = 'Bandai'),
   null,
   (select id from categories where slug = 'anime'),
   7, 'S.H.Figuarts', true, false, '2024-01-10'),

  ('Link', '링크',
   '젤다의 전설 브레스 오브 더 와일드의 주인공 링크를 1/7 스케일로 정밀 재현한 피규어입니다. 챔피언의 튜닉과 마스터 소드, 하이리아 방패의 조합이 원작의 분위기를 완벽히 재현합니다. 하이랄 대지를 형상화한 디오라마 베이스 위에 링크가 서 있는 구성으로, 오픈월드 모험의 분위기가 물씬 풍깁니다. 굿스마일컴퍼니의 FREEing 라인업의 최고 완성도 중 하나로 평가받는 아이템입니다.',
   145000, null,
   (select id from brands where name = 'Good Smile Company'),
   null,
   (select id from categories where slug = 'game'),
   9, '1/7', true, true, '2024-08-01'),

  ('Samus Aran', '사무스 아란',
   '메트로이드 시리즈의 전설적인 현상금 사냥꾼 사무스 아란을 1/8 스케일로 재현한 피규어입니다. 상징적인 바리어 수트의 오렌지와 노란색 배색이 특수 메탈릭 도료로 완성되어 압도적인 존재감을 발산합니다. 아이 캐논을 겨냥한 전투 자세로 제작되어 역동성이 넘치며, 팔목의 모프 볼 변환 파츠도 충실히 재현되었습니다. 굿스마일컴퍼니의 가장 공들인 게임 피규어 중 하나입니다.',
   155000, 175000,
   (select id from brands where name = 'Good Smile Company'),
   null,
   (select id from categories where slug = 'game'),
   3, '1/8', true, false, '2023-11-15'),

  ('Iron Man', '아이언맨',
   '마블 어벤져스의 천재 억만장자 아이언맨 마크 50 아이언 스파이더 슈트를 S.H.Figuarts로 재현하였습니다. 리얼리스틱한 슈트 디테일과 30여 개의 가동 부위를 통해 영화 속 다양한 포즈를 완벽 구현할 수 있습니다. 가슴의 아크 리액터와 손바닥, 부츠의 리펄서 이펙트 파츠가 포함되어 있으며, LED 조명 효과를 위한 전지함이 내장되어 있습니다. 마블 스튜디오 공식 라이선스 제품입니다.',
   125000, null,
   (select id from brands where name = 'Bandai'),
   null,
   (select id from categories where slug = 'movie'),
   11, 'S.H.Figuarts', true, true, '2024-03-01'),

  ('Spider-Man', '스파이더맨',
   '마블 스파이더맨 노 웨이 홈의 피터 파커 스파이더맨을 S.H.Figuarts로 재현한 피규어입니다. 어메이징 판타지 슈트의 세밀한 망사 패턴 조각과 눈 부분의 화이트 쉘 적용이 돋보입니다. 웹 슈팅 이펙트 파츠 4종과 고탄성 피아노선 재질의 스파이더 웹 파츠가 포함되어, 건물 사이를 날아다니는 역동적인 포즈 연출이 가능합니다. 반다이 S.H.Figuarts 마블 라인업의 베스트셀러입니다.',
   115000, 130000,
   (select id from brands where name = 'Bandai'),
   null,
   (select id from categories where slug = 'movie'),
   8, 'S.H.Figuarts', true, false, '2024-02-20'),

  ('Batman', '배트맨',
   'DC 코믹스의 다크 나이트 배트맨을 1/6 대형 스케일로 완성한 코토부키야 ARTFX 시리즈 피규어입니다. 근육질 체형과 케이프의 넓은 실루엣이 배트맨의 위압감을 충실히 재현합니다. 고담시의 옥상을 형상화한 디오라마 베이스 위에 서 있는 구성으로, 야간 경계 중인 배트맨의 분위기가 물씬 납니다. 배트 로고 흉갑의 반사 코팅과 유틸리티 벨트의 디테일이 특히 뛰어납니다.',
   135000, null,
   (select id from brands where name = 'Kotobukiya'),
   null,
   (select id from categories where slug = 'movie'),
   5, '1/6', true, false, '2024-04-01'),

  ('Makima', '마키마',
   '체인소맨의 핵심 인물 마키마를 1/7 스케일로 재현한 피규어입니다. 공안 소속 데빌 헌터의 깔끔한 정장 차림과 불가사의한 미소가 인상적으로 조형되어 있습니다. 황금빛과 붉은빛이 감도는 링 모양 동공을 특수 수지로 제작하여 마키마 특유의 신비로운 분위기를 극대화하였습니다. 무릎을 꿇은 사람을 내려다보는 포즈로 지배자적인 캐릭터성을 완벽히 포착하였습니다.',
   145000, 165000,
   (select id from brands where name = 'Good Smile Company'),
   null,
   (select id from categories where slug = 'anime'),
   4, '1/7', true, true, '2024-09-10'),

  ('Denji', '덴지',
   '체인소맨의 주인공 덴지를 Figma 관절 피규어로 재현하였습니다. 머리와 팔에서 체인소가 뻗어 나오는 체인소 악마 변신 형태와 평상복 형태 두 가지 버전을 동봉하였습니다. 맥스팩토리의 Figma 시스템을 통해 고가동 관절을 갖추고 있어 원작의 격렬한 전투 장면을 자유롭게 연출할 수 있습니다. 혈흔 이펙트 스티커와 포치타 미니 피규어가 보너스로 포함되어 있습니다.',
   95000, null,
   (select id from brands where name = 'Max Factory'),
   null,
   (select id from categories where slug = 'anime'),
   6, 'Figma', true, false, '2024-10-01'),

  ('Lara Croft', '라라 크로프트',
   '툼레이더 리부트 시리즈의 라라 크로프트를 1/6 대형 스케일로 완성한 코토부키야 ARTFX 피규어입니다. 정글 탐험 의상과 활, 화살통이 세밀하게 재현되었으며, 진흙과 상처 효과 데칼이 포함되어 서바이벌 분위기를 강화할 수 있습니다. 빙벽을 기어오르는 역동적인 포즈의 전용 디오라마 베이스가 인상적이며, 라라의 결연한 표정이 시리즈의 성장 스토리를 고스란히 담고 있습니다.',
   195000, 220000,
   (select id from brands where name = 'Kotobukiya'),
   null,
   (select id from categories where slug = 'game'),
   2, '1/6', true, false, '2024-05-15'),

  ('Asuka Langley', '아스카 랑레이',
   '신세기 에반게리온의 파일럿 아스카 랑레이 소류를 1/7 스케일로 재현한 알터의 최고작 중 하나입니다. 빨간색 플러그 슈트의 광택 표현과 금발 트윈테일의 섬세한 조형이 돋보입니다. EVA-02를 배경으로 한 디오라마 베이스 위에 자신만만하게 서 있는 포즈가 아스카의 강렬한 개성을 완벽히 표현합니다. 알터 특유의 고품질 도장으로 원작 애니메이션의 색감을 충실히 재현하였습니다.',
   155000, null,
   (select id from brands where name = 'Alter'),
   null,
   (select id from categories where slug = 'anime'),
   7, '1/7', true, false, '2023-10-20'),

  ('Rei Ayanami', '레이 아야나미',
   '신세기 에반게리온의 미스터리한 파일럿 레이 아야나미를 1/7 스케일로 재현한 알터 피규어입니다. 흰색 플러그 슈트와 파란 단발 머리, 붉은 눈동자의 특수 도료 표현이 레이의 독특한 존재감을 완성합니다. 조용히 시선을 돌리는 내성적인 포즈가 레이 특유의 분위기를 잘 살리고 있으며, 아스카 피규어와 나란히 전시할 때 강렬한 대비 효과를 연출합니다. 알터의 EVA 시리즈 완성도를 대표하는 제품입니다.',
   149000, 169000,
   (select id from brands where name = 'Alter'),
   null,
   (select id from categories where slug = 'anime'),
   5, '1/7', true, false, '2023-10-20');

-- 상품 이미지 (상품당 3~4장)
insert into product_images (product_id, url, position) values
  -- 루피
  ((select id from products where name = 'Monkey D. Luffy'), 'https://picsum.photos/seed/luffy-1/600/600', 0),
  ((select id from products where name = 'Monkey D. Luffy'), 'https://picsum.photos/seed/luffy-2/600/600', 1),
  ((select id from products where name = 'Monkey D. Luffy'), 'https://picsum.photos/seed/luffy-3/600/600', 2),
  ((select id from products where name = 'Monkey D. Luffy'), 'https://picsum.photos/seed/luffy-4/600/600', 3),
  -- 조로
  ((select id from products where name = 'Roronoa Zoro'), 'https://picsum.photos/seed/zoro-1/600/600', 0),
  ((select id from products where name = 'Roronoa Zoro'), 'https://picsum.photos/seed/zoro-2/600/600', 1),
  ((select id from products where name = 'Roronoa Zoro'), 'https://picsum.photos/seed/zoro-3/600/600', 2),
  ((select id from products where name = 'Roronoa Zoro'), 'https://picsum.photos/seed/zoro-4/600/600', 3),
  -- 탄지로
  ((select id from products where name = 'Tanjiro Kamado'), 'https://picsum.photos/seed/tanjiro-1/600/600', 0),
  ((select id from products where name = 'Tanjiro Kamado'), 'https://picsum.photos/seed/tanjiro-2/600/600', 1),
  ((select id from products where name = 'Tanjiro Kamado'), 'https://picsum.photos/seed/tanjiro-3/600/600', 2),
  -- 네즈코
  ((select id from products where name = 'Nezuko Kamado'), 'https://picsum.photos/seed/nezuko-1/600/600', 0),
  ((select id from products where name = 'Nezuko Kamado'), 'https://picsum.photos/seed/nezuko-2/600/600', 1),
  ((select id from products where name = 'Nezuko Kamado'), 'https://picsum.photos/seed/nezuko-3/600/600', 2),
  -- 미쿠
  ((select id from products where name = 'Hatsune Miku'), 'https://picsum.photos/seed/miku-1/600/600', 0),
  ((select id from products where name = 'Hatsune Miku'), 'https://picsum.photos/seed/miku-2/600/600', 1),
  ((select id from products where name = 'Hatsune Miku'), 'https://picsum.photos/seed/miku-3/600/600', 2),
  ((select id from products where name = 'Hatsune Miku'), 'https://picsum.photos/seed/miku-4/600/600', 3),
  -- 클라우드
  ((select id from products where name = 'Cloud Strife'), 'https://picsum.photos/seed/cloud-1/600/600', 0),
  ((select id from products where name = 'Cloud Strife'), 'https://picsum.photos/seed/cloud-2/600/600', 1),
  ((select id from products where name = 'Cloud Strife'), 'https://picsum.photos/seed/cloud-3/600/600', 2),
  ((select id from products where name = 'Cloud Strife'), 'https://picsum.photos/seed/cloud-4/600/600', 3),
  -- 티파
  ((select id from products where name = 'Tifa Lockhart'), 'https://picsum.photos/seed/tifa-1/600/600', 0),
  ((select id from products where name = 'Tifa Lockhart'), 'https://picsum.photos/seed/tifa-2/600/600', 1),
  ((select id from products where name = 'Tifa Lockhart'), 'https://picsum.photos/seed/tifa-3/600/600', 2),
  -- 에어리스
  ((select id from products where name = 'Aerith Gainsborough'), 'https://picsum.photos/seed/aerith-1/600/600', 0),
  ((select id from products where name = 'Aerith Gainsborough'), 'https://picsum.photos/seed/aerith-2/600/600', 1),
  ((select id from products where name = 'Aerith Gainsborough'), 'https://picsum.photos/seed/aerith-3/600/600', 2),
  -- 손오공
  ((select id from products where name = 'Son Goku'), 'https://picsum.photos/seed/goku-1/600/600', 0),
  ((select id from products where name = 'Son Goku'), 'https://picsum.photos/seed/goku-2/600/600', 1),
  ((select id from products where name = 'Son Goku'), 'https://picsum.photos/seed/goku-3/600/600', 2),
  ((select id from products where name = 'Son Goku'), 'https://picsum.photos/seed/goku-4/600/600', 3),
  -- 베지터
  ((select id from products where name = 'Vegeta'), 'https://picsum.photos/seed/vegeta-1/600/600', 0),
  ((select id from products where name = 'Vegeta'), 'https://picsum.photos/seed/vegeta-2/600/600', 1),
  ((select id from products where name = 'Vegeta'), 'https://picsum.photos/seed/vegeta-3/600/600', 2),
  -- 링크
  ((select id from products where name = 'Link'), 'https://picsum.photos/seed/link-1/600/600', 0),
  ((select id from products where name = 'Link'), 'https://picsum.photos/seed/link-2/600/600', 1),
  ((select id from products where name = 'Link'), 'https://picsum.photos/seed/link-3/600/600', 2),
  ((select id from products where name = 'Link'), 'https://picsum.photos/seed/link-4/600/600', 3),
  -- 사무스
  ((select id from products where name = 'Samus Aran'), 'https://picsum.photos/seed/samus-1/600/600', 0),
  ((select id from products where name = 'Samus Aran'), 'https://picsum.photos/seed/samus-2/600/600', 1),
  ((select id from products where name = 'Samus Aran'), 'https://picsum.photos/seed/samus-3/600/600', 2),
  -- 아이언맨
  ((select id from products where name = 'Iron Man'), 'https://picsum.photos/seed/ironman-1/600/600', 0),
  ((select id from products where name = 'Iron Man'), 'https://picsum.photos/seed/ironman-2/600/600', 1),
  ((select id from products where name = 'Iron Man'), 'https://picsum.photos/seed/ironman-3/600/600', 2),
  ((select id from products where name = 'Iron Man'), 'https://picsum.photos/seed/ironman-4/600/600', 3),
  -- 스파이더맨
  ((select id from products where name = 'Spider-Man'), 'https://picsum.photos/seed/spiderman-1/600/600', 0),
  ((select id from products where name = 'Spider-Man'), 'https://picsum.photos/seed/spiderman-2/600/600', 1),
  ((select id from products where name = 'Spider-Man'), 'https://picsum.photos/seed/spiderman-3/600/600', 2),
  -- 배트맨
  ((select id from products where name = 'Batman'), 'https://picsum.photos/seed/batman-1/600/600', 0),
  ((select id from products where name = 'Batman'), 'https://picsum.photos/seed/batman-2/600/600', 1),
  ((select id from products where name = 'Batman'), 'https://picsum.photos/seed/batman-3/600/600', 2),
  -- 마키마
  ((select id from products where name = 'Makima'), 'https://picsum.photos/seed/makima-1/600/600', 0),
  ((select id from products where name = 'Makima'), 'https://picsum.photos/seed/makima-2/600/600', 1),
  ((select id from products where name = 'Makima'), 'https://picsum.photos/seed/makima-3/600/600', 2),
  ((select id from products where name = 'Makima'), 'https://picsum.photos/seed/makima-4/600/600', 3),
  -- 덴지
  ((select id from products where name = 'Denji'), 'https://picsum.photos/seed/denji-1/600/600', 0),
  ((select id from products where name = 'Denji'), 'https://picsum.photos/seed/denji-2/600/600', 1),
  ((select id from products where name = 'Denji'), 'https://picsum.photos/seed/denji-3/600/600', 2),
  -- 라라
  ((select id from products where name = 'Lara Croft'), 'https://picsum.photos/seed/lara-1/600/600', 0),
  ((select id from products where name = 'Lara Croft'), 'https://picsum.photos/seed/lara-2/600/600', 1),
  ((select id from products where name = 'Lara Croft'), 'https://picsum.photos/seed/lara-3/600/600', 2),
  ((select id from products where name = 'Lara Croft'), 'https://picsum.photos/seed/lara-4/600/600', 3),
  -- 아스카
  ((select id from products where name = 'Asuka Langley'), 'https://picsum.photos/seed/asuka-1/600/600', 0),
  ((select id from products where name = 'Asuka Langley'), 'https://picsum.photos/seed/asuka-2/600/600', 1),
  ((select id from products where name = 'Asuka Langley'), 'https://picsum.photos/seed/asuka-3/600/600', 2),
  -- 레이
  ((select id from products where name = 'Rei Ayanami'), 'https://picsum.photos/seed/rei-1/600/600', 0),
  ((select id from products where name = 'Rei Ayanami'), 'https://picsum.photos/seed/rei-2/600/600', 1),
  ((select id from products where name = 'Rei Ayanami'), 'https://picsum.photos/seed/rei-3/600/600', 2);
