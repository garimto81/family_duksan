import React, { useState } from 'react';
import { Calendar, MapPin, CheckCircle, Clock, CheckSquare, Sun, Coffee, Utensils, Car, Navigation, Star, Map as MapIcon, ExternalLink, ArrowDown, Info } from 'lucide-react';

const DeoksanTripOnePage = () => {
  const [checkedItems, setCheckedItems] = useState({});
  // 기본 지도는 '덕산온천지구' 중심
  const [mapLocation, setMapLocation] = useState({
    name: "스플라스 리솜 (덕산온천)",
    query: "스플라스 리솜"
  });

  const toggleCheck = (id) => {
    setCheckedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const updateMap = (name, query) => {
    setMapLocation({ name, query });
    // 스크롤을 지도 위치로 부드럽게 이동
    const mapElement = document.getElementById('google-map-section');
    if (mapElement) {
      mapElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  // 구글 지도 길찾기 URL 생성 함수
  const getDirectionUrl = (origin, destination, waypoints = []) => {
    const baseUrl = "https://www.google.com/maps/dir/";
    const waypointStr = waypoints.length > 0 ? waypoints.join('/') + '/' : '';
    return `${baseUrl}${encodeURIComponent(origin)}/${waypointStr}${encodeURIComponent(destination)}`;
  };

  // 장소 데이터
  const spots = [
    { id: 'resom', name: '스플라스 리솜', query: '스플라스 리솜', type: 'activity', desc: '워터파크 & 온천' },
    { id: 'charcoal', name: '덕산참숯랜드', query: '충남 예산군 덕산면 덕산온천로 403', type: 'meal', desc: '찜질 & 3초 삼겹살' },
    { id: 'forest', name: '용현자연휴양림', query: '용현자연휴양림', type: 'accommodation', desc: '숙소 (휴양림)' },
    { id: 'sudeoksa', name: '수덕사', query: '예산 수덕사', type: 'activity', desc: '산책 & 관람' },
    { id: 'bridge', name: '예당호 출렁다리', query: '예당호 출렁다리', type: 'activity', desc: '관광 명소' },
    { id: 'galbi', name: '고덕갈비 (예시)', query: '예산 고덕갈비', type: 'meal', desc: '예산 소갈비 맛집' },
  ];

  const schedule = {
    day1: {
      date: '1월 1일 (수)',
      theme: '참숯 힐링과 숲속의 밤',
      // route: 전체 경로 정보
      route: {
        origin: "덕산참숯랜드",
        destination: "용현자연휴양림",
        waypoints: [],
        time: "약 20분",
        dist: "12km",
        color: "#EF4444" // Red for Day 1
      },
      events: [
        { time: '14:00', title: '덕산 읍내 도착', desc: '하나로마트 장보기 (필요시)', type: 'car' },
        {
          type: 'move',
          time: '10분',
          desc: '차량 이동'
        },
        { time: '14:30', title: '덕산참숯랜드', desc: '뜨끈한 참숯가마 찜질 & 휴식', type: 'activity', highlight: true, spotId: 'charcoal' },
        { time: '18:00', title: '저녁: 3초 삼겹살', desc: '참숯랜드 내 식당 이용', type: 'meal', highlight: true, spotId: 'charcoal' },
        {
          type: 'move',
          time: '약 20분 (12km)',
          desc: '숙소로 이동 (밤길 운전 조심)',
          isMainRoute: true
        },
        { time: '20:00', title: '용현자연휴양림', desc: '체크인 및 휴식', type: 'checkin', status: 'confirmed', spotId: 'forest' }
      ]
    },
    day2: {
      date: '1월 2일 (목)',
      theme: '짜릿한 워터파크와 온천',
      route: {
        origin: "스플라스 리솜",
        destination: "용현자연휴양림",
        waypoints: [],
        time: "약 25분",
        dist: "15km",
        color: "#3B82F6" // Blue for Day 2
      },
      events: [
        { time: '10:00', title: '숙소 출발', desc: '아침 식사 후 이동', type: 'car' },
        {
          type: 'move',
          time: '약 25분 (15km)',
          desc: '덕산 온천 지구로 이동',
          isMainRoute: false
        },
        { time: '10:30', title: '스플라스 리솜', desc: '오픈런! 온천수 워터파크', type: 'activity', highlight: true, spotId: 'resom' },
        { time: '15:00', title: '늦은 점심', desc: '리솜 내부 또는 인근', type: 'meal' },
        {
          type: 'move',
          time: '약 25분 (15km)',
          desc: '용현자연휴양림으로 이동',
          isMainRoute: true
        },
        { time: '18:00', title: '용현자연휴양림', desc: '체크인 (대기 1순위)', type: 'checkin', status: 'waiting', spotId: 'forest' },
        { time: '19:00', title: '저녁: 예산 소갈비', desc: '고덕갈비 등 인근 맛집', type: 'meal', spotId: 'galbi' }
      ]
    },
    day3: {
      date: '1월 3일 (금)',
      theme: '예산 명소 탐방',
      route: {
        origin: "용현자연휴양림",
        destination: "예당호 출렁다리",
        waypoints: ["수덕사"],
        time: "총 이동 약 40분",
        dist: "25km",
        color: "#10B981" // Green for Day 3
      },
      events: [
        { time: '11:00', title: '체크아웃', desc: '퇴실 완료', type: 'checkout' },
        {
          type: 'move',
          time: '약 15분',
          desc: '수덕사로 이동'
        },
        { time: '11:30', title: '수덕사', desc: '고즈넉한 산책', type: 'activity', spotId: 'sudeoksa' },
        { time: '13:00', title: '점심: 산채정식', desc: '수덕사 앞 식당가', type: 'meal' },
        {
          type: 'move',
          time: '약 25분',
          desc: '예당호로 이동',
          isMainRoute: true
        },
        { time: '14:30', title: '예당호 출렁다리', desc: '모노레일 & 산책', type: 'activity', spotId: 'bridge' },
        { time: '16:00', title: '귀가', desc: '여행 종료', type: 'car' }
      ]
    }
  };

  const checklistData = [
    { id: 1, text: '수영복, 모자 (워터파크 필수)', category: '필수' },
    { id: 2, text: '개인 세면도구 (휴양림)', category: '필수' },
    { id: 3, text: '신분증 (휴양림 확인)', category: '필수' },
    { id: 4, text: '따뜻한 겉옷', category: '의류' },
    { id: 5, text: '방수팩/아쿠아슈즈', category: '장비' },
    { id: 6, text: '라면/햇반 (아침용)', category: '음식' },
  ];

  return (
    <div className="max-w-4xl mx-auto bg-gray-50 min-h-screen font-sans text-gray-800">
      {/* 1. Header Section */}
      <div className="bg-gradient-to-r from-teal-700 to-emerald-600 text-white p-8 rounded-b-3xl shadow-xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end">
          <div>
            <div className="flex items-center space-x-2 text-teal-100 mb-2 text-sm font-medium">
              <span className="bg-white/20 px-2 py-1 rounded">2박 3일</span>
              <span>2025.01.01 - 01.03</span>
            </div>
            <h1 className="text-4xl font-extrabold mb-2 tracking-tight">덕산 힐링 여행 계획</h1>
            <p className="flex items-center text-teal-50 opacity-90">
              <MapPin className="w-4 h-4 mr-1" /> 충남 예산군 덕산면 & 서산 용현계곡
            </p>
          </div>
          <div className="mt-6 md:mt-0 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 text-center min-w-[120px]">
            <div className="text-xs text-teal-100 uppercase tracking-wider mb-1">D-Day</div>
            <div className="text-3xl font-bold">2</div>
            <div className="text-xs text-teal-200 mt-1">Ready to go!</div>
          </div>
        </div>
      </div>

      <div className="p-4 md:p-8 space-y-8">

        {/* NEW: Visual Route Map Section (Graphic) */}
        <section className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-5 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-bold text-lg text-gray-800 flex items-center">
              <MapIcon className="w-5 h-5 mr-2 text-indigo-600" />
              여행 동선 시각화
            </h2>
            <div className="flex space-x-2 text-xs font-semibold">
              <span className="flex items-center"><span className="w-3 h-3 rounded-full bg-red-400 mr-1"></span>1일차</span>
              <span className="flex items-center"><span className="w-3 h-3 rounded-full bg-blue-400 mr-1"></span>2일차</span>
              <span className="flex items-center"><span className="w-3 h-3 rounded-full bg-green-400 mr-1"></span>3일차</span>
            </div>
          </div>

          <div className="relative w-full h-[400px] bg-[#F3F4F6] overflow-hidden">
             {/* Schematic Map SVG */}
             <svg className="w-full h-full" viewBox="0 0 600 400" preserveAspectRatio="xMidYMid meet">
                {/* Background Decor */}
                <path d="M-50,350 Q300,450 650,300" stroke="#E5E7EB" strokeWidth="40" fill="none" />

                {/* Define Locations (Relative Coordinates)
                    Yonghyeon (North): 300, 50
                    Deoksan/Charcoal (Mid-Left): 200, 200
                    Sudeoksa (Bottom-Left): 120, 300
                    Yedangho (Bottom-Right): 480, 320
                */}

                {/* --- Routes (Dashed Lines) --- */}

                {/* Day 1: Charcoal -> Yonghyeon */}
                <path d="M220,200 Q250,150 300,70" stroke="#EF4444" strokeWidth="3" strokeDasharray="6,4" fill="none" className="animate-pulse-slow">
                  <animate attributeName="stroke-dashoffset" from="20" to="0" dur="2s" repeatCount="indefinite" />
                </path>
                <rect x="230" y="110" width="60" height="20" rx="4" fill="white" stroke="#EF4444" strokeWidth="1" />
                <text x="260" y="123" textAnchor="middle" fontSize="10" fill="#EF4444" fontWeight="bold">12km / 20분</text>

                {/* Day 2: Yonghyeon -> Resom (Similar path to Charcoal but visualizing movement) */}
                <path d="M300,70 Q320,150 220,200" stroke="#3B82F6" strokeWidth="3" strokeDasharray="6,4" fill="none" opacity="0.6" />
                <rect x="290" y="150" width="60" height="20" rx="4" fill="white" stroke="#3B82F6" strokeWidth="1" />
                <text x="320" y="163" textAnchor="middle" fontSize="10" fill="#3B82F6" fontWeight="bold">15km / 25분</text>

                {/* Day 3: Yonghyeon -> Sudeoksa -> Yedangho */}
                {/* 3-1: Yonghyeon -> Sudeoksa */}
                <path d="M300,70 Q150,120 120,300" stroke="#10B981" strokeWidth="3" strokeDasharray="6,4" fill="none" />

                {/* 3-2: Sudeoksa -> Yedangho */}
                <path d="M120,300 Q300,350 480,320" stroke="#10B981" strokeWidth="3" strokeDasharray="6,4" fill="none" />
                <rect x="280" y="320" width="60" height="20" rx="4" fill="white" stroke="#10B981" strokeWidth="1" />
                <text x="310" y="333" textAnchor="middle" fontSize="10" fill="#10B981" fontWeight="bold">25분</text>


                {/* --- Location Markers --- */}

                {/* Yonghyeon Forest (Top Center) */}
                <g transform="translate(300, 70)">
                   <circle r="8" fill="#059669" stroke="white" strokeWidth="2" />
                   <text x="0" y="-15" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#065F46">용현자연휴양림</text>
                   <text x="0" y="20" textAnchor="middle" fontSize="10" fill="#4B5563">숙소</text>
                </g>

                {/* Deoksan Area (Resom & Charcoal) (Mid Left) */}
                <g transform="translate(220, 200)">
                   <circle r="8" fill="#2563EB" stroke="white" strokeWidth="2" />
                   <text x="-15" y="5" textAnchor="end" fontSize="14" fontWeight="bold" fill="#1E40AF">덕산온천/참숯랜드</text>
                   <text x="-15" y="20" textAnchor="end" fontSize="10" fill="#4B5563">워터파크/식사</text>
                </g>

                {/* Sudeoksa (Bottom Left) */}
                <g transform="translate(120, 300)">
                   <circle r="6" fill="#7C3AED" stroke="white" strokeWidth="2" />
                   <text x="0" y="20" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#5B21B6">수덕사</text>
                </g>

                {/* Yedangho (Bottom Right) */}
                <g transform="translate(480, 320)">
                   <circle r="6" fill="#F59E0B" stroke="white" strokeWidth="2" />
                   <text x="0" y="20" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#92400E">예당호 출렁다리</text>
                </g>
             </svg>
             <div className="absolute top-4 left-4 bg-white/80 p-2 rounded text-xs text-gray-500">
               * 실제 지형을 단순화한 시각화 지도입니다.
             </div>
          </div>
        </section>

        {/* 2. Google Map Section (Real Iframe) */}
        <section id="google-map-section" className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-5 border-b border-gray-100 flex flex-col md:flex-row justify-between items-center bg-gray-50 gap-4">
            <div className="flex items-center w-full md:w-auto">
              <div className="bg-blue-100 p-2 rounded-full mr-3 shrink-0">
                <Navigation className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h2 className="font-bold text-lg text-gray-800">구글 지도 상세 보기</h2>
                <p className="text-sm text-blue-600 font-medium truncate max-w-[200px] md:max-w-none">
                  현재 위치: {mapLocation.name}
                </p>
              </div>
            </div>

            {/* Day Route Buttons */}
            <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
               {['day1', 'day2', 'day3'].map((dayKey, idx) => {
                 const day = schedule[dayKey];
                 const url = getDirectionUrl(day.route.origin, day.route.destination, day.route.waypoints);
                 return (
                   <a
                    key={dayKey}
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs font-bold text-gray-600 hover:bg-teal-50 hover:text-teal-700 hover:border-teal-200 transition-colors whitespace-nowrap shadow-sm"
                   >
                     <MapIcon size={12} className="mr-1.5" />
                     {idx + 1}일차 실제 경로
                   </a>
                 )
               })}
            </div>
          </div>

          {/* Map Container */}
          <div className="relative w-full h-64 bg-gray-200">
            <iframe
              title="Google Map"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              src={`https://maps.google.com/maps?q=${encodeURIComponent(mapLocation.query)}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
            ></iframe>
          </div>

          {/* Location Buttons */}
          <div className="p-4 bg-white grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
            {spots.map((spot) => (
              <button
                key={spot.id}
                onClick={() => updateMap(spot.name, spot.query)}
                className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all duration-200 ${
                  mapLocation.name === spot.name
                    ? 'bg-blue-50 border-blue-500 text-blue-700 shadow-sm'
                    : 'bg-white border-gray-100 hover:bg-gray-50 text-gray-600'
                }`}
              >
                {spot.type === 'activity' && <Sun size={20} className="mb-2 opacity-70" />}
                {spot.type === 'meal' && <Utensils size={20} className="mb-2 opacity-70" />}
                {spot.type === 'accommodation' && <Star size={20} className="mb-2 opacity-70" />}
                <span className="text-xs font-bold text-center break-keep">{spot.name}</span>
              </button>
            ))}
          </div>
        </section>

        {/* 3. Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column: Timeline (2/3 width) */}
          <div className="lg:col-span-2 space-y-8">
            <div className="flex items-center mb-2">
              <Clock className="w-6 h-6 text-teal-600 mr-2" />
              <h2 className="text-xl font-bold text-gray-800">상세 일정 및 동선</h2>
            </div>

            {Object.values(schedule).map((day, index) => (
              <div key={index} className="relative pl-8 border-l-2 border-gray-200 space-y-6 pb-2 last:pb-0">
                <div className={`absolute -left-2.5 top-0 w-5 h-5 rounded-full border-4 border-white shadow-sm`} style={{ backgroundColor: day.route.color }}></div>

                {/* Day Header */}
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 mb-4">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold tracking-wide text-sm" style={{ color: day.route.color }}>DAY {index + 1}</span>
                    <span className="text-gray-400 text-xs">{day.date}</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">{day.theme}</h3>
                  <div className="mt-2 pt-2 border-t border-gray-50 flex items-center text-xs text-gray-500 bg-gray-50/50 p-2 rounded-lg">
                    <Car size={12} className="mr-1.5" />
                    <span className="font-semibold mr-2">주요 동선:</span>
                    {day.route.origin} → {day.route.destination}
                    <span className="mx-2 text-gray-300">|</span>
                    {day.route.time} 소요
                  </div>
                </div>

                {/* Events & Routes */}
                <div className="space-y-0">
                  {day.events.map((event, idx) => {
                    // Render Move/Route Segment
                    if (event.type === 'move') {
                      return (
                        <div key={idx} className="flex items-center py-4 pl-4 relative">
                          <div className="absolute left-[-39px] top-1/2 -translate-y-1/2 w-4 h-4 flex items-center justify-center bg-gray-100 rounded-full border border-gray-300 z-10">
                            <ArrowDown size={10} className="text-gray-500" />
                          </div>
                          <div className={`flex items-center px-3 py-1.5 rounded-full text-xs font-medium border ${
                            event.isMainRoute
                              ? 'bg-blue-50 text-blue-700 border-blue-100'
                              : 'bg-gray-50 text-gray-500 border-gray-100'
                          }`}>
                            <Car size={12} className="mr-1.5" />
                            {event.desc} <span className="mx-1.5 opacity-30">|</span> {event.time}
                          </div>
                        </div>
                      );
                    }

                    // Render Standard Event
                    return (
                      <div
                        key={idx}
                        className={`group flex items-start p-4 rounded-xl transition-all hover:shadow-md mb-3 ${
                          event.highlight ? 'bg-gradient-to-r from-teal-50 to-white border border-teal-100' : 'bg-white border border-gray-100'
                        }`}
                      >
                        <div className="mr-4 min-w-[60px] text-sm font-bold text-gray-500 pt-1">{event.time}</div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className={`font-bold text-base ${event.highlight ? 'text-teal-800' : 'text-gray-800'}`}>
                              {event.title}
                            </h4>
                            <div className="flex space-x-1">
                               {event.spotId && (
                                 <button
                                   onClick={() => {
                                     const spot = spots.find(s => s.id === event.spotId);
                                     if(spot) updateMap(spot.name, spot.query);
                                   }}
                                   className="text-xs flex items-center bg-gray-100 hover:bg-blue-100 text-gray-500 hover:text-blue-600 px-2 py-1 rounded transition-colors"
                                 >
                                   <MapIcon size={12} className="mr-1"/> 지도보기
                                 </button>
                               )}
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{event.desc}</p>

                          {/* Status Badges */}
                          <div className="mt-2 flex gap-2">
                             {event.status === 'confirmed' && (
                              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                                <CheckCircle size={10} className="mr-1" /> 예약확정
                              </span>
                            )}
                            {event.status === 'waiting' && (
                              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-orange-100 text-orange-800">
                                <Clock size={10} className="mr-1" /> 대기 1순위
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Accommodation & Checklist (1/3 width) */}
          <div className="space-y-8">

            {/* Accommodation Card */}
            <section>
              <div className="flex items-center mb-4">
                <Star className="w-6 h-6 text-yellow-500 mr-2" />
                <h2 className="text-xl font-bold text-gray-800">숙소 정보</h2>
              </div>
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="bg-green-50 p-4 border-b border-green-100">
                  <h3 className="font-bold text-green-900">용현 자연 휴양림</h3>
                  <p className="text-xs text-green-700 mt-1">충남 서산시 운산면 마애삼존불길 339</p>
                </div>
                <div className="p-4 space-y-3">
                  <div className="flex justify-between items-center text-sm p-2 bg-gray-50 rounded-lg">
                    <span className="text-gray-500">체크인</span>
                    <span className="font-bold text-gray-800">15:00 - 22:00</span>
                  </div>
                  <div className="flex justify-between items-center text-sm p-2 bg-gray-50 rounded-lg">
                    <span className="text-gray-500">체크아웃</span>
                    <span className="font-bold text-gray-800">11:00</span>
                  </div>
                  <div className="pt-2">
                     <div className="flex items-center text-sm mb-2">
                        <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                        <span className="text-gray-600 flex-1">1/1 (수)</span>
                        <span className="text-green-600 font-bold text-xs">결제완료</span>
                     </div>
                     <div className="flex items-center text-sm">
                        <div className="w-2 h-2 rounded-full bg-orange-500 mr-2"></div>
                        <span className="text-gray-600 flex-1">1/2 (목)</span>
                        <span className="text-orange-500 font-bold text-xs">대기중</span>
                     </div>
                  </div>
                </div>
                <div className="px-4 pb-4">
                  <button
                    onClick={() => updateMap('용현자연휴양림', '용현자연휴양림')}
                    className="w-full py-2 bg-green-600 text-white rounded-xl text-sm font-medium hover:bg-green-700 transition-colors flex items-center justify-center"
                  >
                    <MapIcon size={14} className="mr-2" /> 지도에서 위치 확인
                  </button>
                </div>
              </div>
            </section>

            {/* Checklist Card */}
            <section>
              <div className="flex items-center mb-4">
                <CheckSquare className="w-6 h-6 text-indigo-600 mr-2" />
                <h2 className="text-xl font-bold text-gray-800">준비물 체크</h2>
              </div>
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
                <div className="space-y-2">
                  {checklistData.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => toggleCheck(item.id)}
                      className={`flex items-center p-3 rounded-lg cursor-pointer transition-all ${
                        checkedItems[item.id] ? 'bg-gray-50 opacity-60' : 'hover:bg-indigo-50'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded border flex items-center justify-center mr-3 transition-colors ${
                        checkedItems[item.id] ? 'bg-indigo-500 border-indigo-500' : 'border-gray-300 bg-white'
                      }`}>
                        {checkedItems[item.id] && <CheckSquare size={12} className="text-white" />}
                      </div>
                      <div className="flex-1">
                        <div className={`text-sm ${checkedItems[item.id] ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                          {item.text}
                        </div>
                      </div>
                      <span className="text-[10px] px-1.5 py-0.5 bg-gray-100 text-gray-500 rounded">
                        {item.category}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

             {/* Quick Tips */}
             <div className="bg-blue-50 rounded-2xl p-5 border border-blue-100">
                <h3 className="font-bold text-blue-800 text-sm mb-2">여행 꿀팁</h3>
                <ul className="text-xs text-blue-700 space-y-1.5 list-disc list-inside">
                   <li><strong>워터파크:</strong> 모자 필수! 야외 노천탕 이동 시 추우니 비치타월을 챙기면 좋아요.</li>
                   <li><strong>참숯랜드:</strong> 고온의 숯가마라 양말을 신으면 발이 덜 뜨거워요.</li>
                   <li><strong>숙소 대기:</strong> 출발 전까지 예약 상태를 수시로 확인하세요.</li>
                </ul>
             </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default DeoksanTripOnePage;
