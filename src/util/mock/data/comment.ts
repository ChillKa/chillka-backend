const comments = [
  {
    userName: '',
    profilePicture: '',
    date: '2024-07-10',
    content:
      '這是一場很棒的夏日山野探險，讓我們享受大自然的美好，清新的空氣和美麗的風景令人難忘！',
    activityName: '夏日山野趣',
  },
  {
    userName: '',
    profilePicture: '',
    date: '2024-08-05',
    content:
      '參加這次探索東部山林的旅程，發現了許多隱藏的美景和令人驚嘆的自然奇觀，絕對是一次難忘的經歷！',
    activityName: '探索東部山林',
  },
  {
    userName: '',
    profilePicture: '',
    date: '2024-09-15',
    content:
      '參加這次山岳探險之旅，挑戰了許多崎嶇的山徑，但也收穫了壯麗的高山美景和無比的成就感！',
    activityName: '山岳探險之旅',
  },
  {
    userName: '',
    profilePicture: '',
    date: '2024-07-20',
    content:
      '今天的夏日野餐聚會非常愉快！天氣很好，大家在陽光下享受美食和歡笑，是個放鬆身心的好時光。',
    activityName: '夏日野餐聚會',
  },
  {
    userName: '',
    profilePicture: '',
    date: '2024-08-05',
    content:
      '城市觀光導覽讓我重新發現了這座城市的美麗和歷史！導覽解說詳細生動，讓我對這座城市更加瞭解。',
    activityName: '城市觀光導覽',
  },
  {
    userName: '',
    profilePicture: '',
    date: '2024-09-10',
    content:
      '參加網路社群聚會，結識了許多志同道合的朋友！交流內容豐富，收穫滿滿的一天。',
    activityName: '網路社群聚會',
  },
  {
    userName: '',
    profilePicture: '',
    date: '2024-07-15',
    content:
      '參加了山野攝影工作坊，非常享受在自然中捕捉美景的過程，學到了許多攝影技巧。',
    activityName: '山野攝影工作坊',
  },
  {
    userName: '',
    profilePicture: '',
    date: '2024-08-02',
    content:
      '參加了手作市集展覽，看到了很多精美的手工藝品，與手作藝術家交流，是一次很有意義的體驗。',
    activityName: '手作市集展覽',
  },
  {
    userName: '',
    profilePicture: '',
    date: '2024-08-20',
    content:
      '參加了水彩畫工作坊，學習了水彩畫的基本技巧和色彩運用，老師很有耐心，讓我收穫良多。',
    activityName: '水彩畫工作坊',
  },
  {
    userName: '',
    profilePicture: '',
    date: '2024-07-10',
    content:
      '今天的夏日晨跑活動非常愉快！清晨的陽光讓人精神煥發，和大家一起運動，感受到了夏日的清新和活力。',
    activityName: '夏日晨跑活動',
  },
  {
    userName: '',
    profilePicture: '',
    date: '2024-08-05',
    content:
      '參加山林瑜珈體驗真是一次放鬆身心的體驗！在大自然中練習瑜珈，聽著鳥鳴與樹葉沙沙聲，感受到身心得到了很好的療癒。',
    activityName: '山林瑜珈體驗',
  },
  {
    userName: '',
    profilePicture: '',
    date: '2024-08-20',
    content:
      '參加海灘排球比賽非常刺激！沙灘上奔跑、拼搏，與隊友們一起享受比賽的樂趣，讓我們度過了一個充滿活力的夏日下午。',
    activityName: '海灘排球比賽',
  },
  {
    userName: '',
    profilePicture: '',
    date: '2024-06-30',
    content:
      '參加了冥想與放鬆工作坊，感覺非常舒心放鬆，學會了一些有效的冥想技巧，對身心健康有很大的幫助。',
    activityName: '冥想與放鬆工作坊',
  },
  {
    userName: '',
    profilePicture: '',
    date: '2024-07-05',
    content:
      '參加了有氧健身課程，非常激勵人心！教練非常專業，課程內容豐富多樣，有效提升了我的身體素質和耐力。',
    activityName: '有氧健身課程',
  },
  {
    userName: '',
    profilePicture: '',
    date: '2024-07-10',
    content:
      '參加了健康飲食講座，收穫良多！講師深入淺出地介紹了健康飲食的重要性和實踐方法，對我的飲食習慣有啟發。',
    activityName: '健康飲食講座',
  },
  {
    userName: '',
    profilePicture: '',
    date: '2024-07-10T14:00:00Z',
    content:
      '非常精彩的智能家居科技展示！展示了許多創新的家居科技產品，特別是那些能夠自動化控制家居環境的產品讓人印象深刻。',
    activityName: '智能家居科技展示',
  },
  {
    userName: '',
    profilePicture: '',
    date: '2024-08-05T15:30:00Z',
    content:
      '參加虛擬實境體驗日真是太刺激了！能夠身臨其境地體驗各種虛擬世界，特效和遊戲性都非常出色，帶來了全新的遊戲體驗。',
    activityName: '虛擬實境體驗日',
  },
  {
    userName: '',
    profilePicture: '',
    date: '2024-09-15T10:00:00Z',
    content:
      '參加未來科技論壇讓我對科技的發展有了更深入的了解。各位講者分享了許多關於未來科技趨勢和創新應用的見解，非常啟發人心。',
    activityName: '未來科技論壇',
  },
  {
    userName: '',
    profilePicture: '',
    date: '2024-07-12T14:00:00Z',
    content:
      '這次古董文物展充滿了歷史的厚重感，展出的文物品類繁多，讓人深切感受到古代文化的魅力。',
    activityName: '古董文物展',
  },
  {
    userName: '',
    profilePicture: '',
    date: '2024-08-05T19:30:00Z',
    content:
      '當代藝術表演充滿了創意和現代感，藝術家的表演引人入勝，讓人深思藝術與生活的關係。',
    activityName: '當代藝術表演',
  },
  {
    userName: '',
    profilePicture: '',
    date: '2024-09-15T10:00:00Z',
    content:
      '參加戲劇工作坊是一次豐富的學習經驗，工作坊內容豐富多彩，參與者可以在輕鬆的氛圍中學習表演技巧。',
    activityName: '戲劇工作坊',
  },
];

export default comments;
