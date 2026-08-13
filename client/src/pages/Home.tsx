import { useMemo, useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  BookOpen,
  Check,
  ChevronDown,
  CircleAlert,
  Crosshair,
  Feather,
  Flag,
  Gauge,
  Layers3,
  LockKeyhole,
  Menu,
  Mic2,
  PenLine,
  Play,
  Route,
  Scale,
  ScrollText,
  ShieldAlert,
  Sparkles,
  Target,
  X,
  Zap,
} from "lucide-react";

/**
 * Design philosophy: 신학적 청사진.
 * This page uses ivory paper, ink navy, bridge amber, and restrained crimson.
 * Content is organized as a left curriculum rail on desktop and a compact tab rail on mobile.
 */

type WeekId = 1 | 2 | 3 | 4;

type Week = {
  id: WeekId;
  eyebrow: string;
  title: string;
  subtitle: string;
  thesis: string;
  color: string;
  icon: typeof Mic2;
};

const weeks: Week[] = [
  {
    id: 1,
    eyebrow: "WEEK 01 · IDENTITY",
    title: "진짜 주인공은 네가 아니야",
    subtitle: "무대 위의 가수가 아니라, 하나님과 회중을 잇는 다리",
    thesis: "예배의 유일한 주인공은 오직 예수 그리스도 한 분뿐입니다.",
    color: "amber",
    icon: Mic2,
  },
  {
    id: 2,
    eyebrow: "WEEK 02 · DISCERNMENT",
    title: "네 감정에 속지 마",
    subtitle: "부드러운 위로의 가면 뒤에 있는 가사를 분별하는 법",
    thesis: "감동적인가보다 먼저, 이 찬양이 누구를 향하고 무엇을 선포하는지 묻습니다.",
    color: "blue",
    icon: Crosshair,
  },
  {
    id: 3,
    eyebrow: "WEEK 03 · LITURGY",
    title: "예배의 서사를 써라",
    subtitle: "플레이리스트를 넘어, 영혼을 인도하는 구속사적 콘티",
    thesis: "단순한 곡의 나열이 아니라 창조에서 완성까지 이어지는 거룩한 설계도입니다.",
    color: "gold",
    icon: Route,
  },
  {
    id: 4,
    eyebrow: "WEEK 04 · STEWARDSHIP",
    title: "마이크 뒤의 칼날",
    subtitle: "말씀을 살리고 공동체를 세우는 언어의 청지기",
    thesis: "마이크는 당신의 영적 이력서가 아니라, 말씀을 운반하는 통로입니다.",
    color: "red",
    icon: ShieldAlert,
  },
];

const weekOneCards = [
  { label: "정체성", title: "청지기 / Bridge", body: "인도자는 자신의 존재감을 키우는 사람이 아니라 회중과 하나님 사이를 잇는 다리입니다.", icon: Route },
  { label: "목적", title: "회중과 하나님을 연결", body: "사람의 시선을 자신에게 붙들어 두지 않고, 오직 예수 그리스도께로 돌려보냅니다.", icon: Target },
  { label: "롤모델", title: "세례요한", body: "그는 흥하여야 하겠고 나는 쇠하여야 하리라. 인도자의 사역은 이 방향을 닮아야 합니다.", icon: Feather },
];

const weekTwoCritiques = [
  { number: "01", title: "대상 상실의 오류", body: "찬양의 타깃이 삼위일체 하나님에서 사람·감정·관계로 옮겨가는 순간, 수직적 경배는 수평적 위로로 전도됩니다.", icon: Target },
  { number: "02", title: "자기중심적 감성주의", body: "일시적 카타르시스는 제공하지만 죄에 대한 회개와 십자가의 구속이 소거되면 복음의 본질이 사라집니다.", icon: CircleAlert },
  { number: "03", title: "세속화의 위험", body: "‘하나님’이라는 단어를 지웠을 때 일반 대중가요와 구별되지 않는다면, 그 노래는 이미 세속화된 것입니다.", icon: Scale },
];

const weekThreeStages = [
  { step: "01", title: "부름과 임재", en: "Call & Presence", scripture: "이사야 6:1–3", body: "거룩하다 거룩하다 거룩하다. 거룩하신 주권자 앞에 회중을 세웁니다." },
  { step: "02", title: "참회와 고백", en: "Repentance & Confession", scripture: "이사야 6:5", body: "화로다 나여 망하게 되었도다. 거룩함 앞에서 인간의 연약함을 고백합니다." },
  { step: "03", title: "구속과 선포", en: "Redemption & Proclamation", scripture: "이사야 6:6–7", body: "네 악이 제하여졌고 네 죄가 사하여졌느니라. 십자가의 보혈과 은혜를 선포합니다." },
  { step: "04", title: "헌신과 결단", en: "Dedication & Resolution", scripture: "이사야 6:8", body: "내가 여기 있나이다 나를 보내소서. 구원의 감격이 삶의 결단으로 이어지게 합니다." },
];

const weekFourRules = [
  { title: "타인 비방 및 정죄", short: "말로 공동체를 깨뜨리지 마십시오.", bad: "예배 지각생이나 준비가 부족한 팀원을 마이크로 은근히 저격", good: "리허설 후 따로 불러 조용히 사랑으로 권면", icon: X },
  { title: "감정적 선동", short: "인위적 연출은 성령의 역사가 아닙니다.", bad: "억지로 눈물을 짜내는 멘트와 분위기를 위한 심리 조작", good: "담백하고 진실된 말씀을 선포하며 성령의 의지에 맡김", icon: Zap },
  { title: "자기 자랑", short: "마이크는 당신의 영적 이력서가 아닙니다.", bad: "자신의 영적 스펙과 성취를 과시하는 사사로운 간증", good: "자신은 감추고 오직 그리스도와 말씀만 드러내는 통로", icon: LockKeyhole },
];

function SectionLabel({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return <div className={`section-label ${light ? "section-label-light" : ""}`}><span className="label-line" />{children}</div>;
}

function WeekNav({ active, onChange }: { active: WeekId; onChange: (id: WeekId) => void }) {
  return (
    <nav className="week-nav" aria-label="주차별 교육 목차">
      <div className="nav-kicker">THE WORSHIP LEADER ARCHIVE</div>
      <div className="nav-title">인도자<br /><em>교육</em></div>
      <div className="nav-rule" />
      <div className="nav-caption">4주간의 교육 여정</div>
      <div className="week-links">
        {weeks.map((week) => {
          const Icon = week.icon;
          return <button key={week.id} className={`week-link ${active === week.id ? "active" : ""}`} onClick={() => onChange(week.id)}><span className="week-no">0{week.id}</span><span className="week-link-copy"><small>{week.eyebrow.split("·")[1]}</small><strong>{week.title}</strong></span><Icon size={16} /></button>;
        })}
      </div>
      <div className="nav-footer"><span className="footer-mark">I / J</span><span>성경적 찬양 인도자<br />양성 교육</span></div>
    </nav>
  );
}

function MobileWeekNav({ active, onChange }: { active: WeekId; onChange: (id: WeekId) => void }) {
  return <div className="mobile-week-nav" role="tablist" aria-label="주차 선택">{weeks.map((week) => <button key={week.id} role="tab" aria-selected={active === week.id} className={active === week.id ? "active" : ""} onClick={() => onChange(week.id)}><span>0{week.id}</span><strong>주차</strong></button>)}</div>;
}

function BlueprintCard({ icon: Icon, label, title, body }: { icon: typeof Route; label: string; title: string; body: string }) {
  return <article className="blueprint-card"><div className="card-crosshair" /><div className="card-icon"><Icon size={18} /></div><div className="card-label">{label}</div><h3>{title}</h3><p>{body}</p></article>;
}

function WeekOne() {
  return <>
    <section className="section-block identity-grid"><div className="section-intro"><SectionLabel>THE CENTER OF WORSHIP</SectionLabel><h2>우리가 박수받기를<br /><em>갈망하는 이유</em></h2><p>창조된 인간은 하나님의 영광을 찬송하도록 지음받았지만, 타락한 마음은 스스로 왕이 되어 영광을 차지하려 합니다.</p><div className="quote-line">“진짜 주인공은 네가 아니야.”</div></div><div className="self-check-visual"><div className="circle circle-outer" /><div className="circle circle-inner" /><div className="visual-center"><div className="cross-mark">†</div><span>GLORY</span><small>TO GOD</small></div><div className="orbit orbit-1">자기 영광</div><div className="orbit orbit-2">하나님의 영광</div></div></section>
    <section className="section-block"><div className="section-heading"><div><SectionLabel>THE BRIDGE PRINCIPLE</SectionLabel><h2>당신은 무대 위의 가수가 아니라<br /><em>다리(Bridge)입니다.</em></h2></div><div className="heading-note">01 / 03<br /><span>IDENTITY</span></div></div><div className="card-grid three">{weekOneCards.map((card) => <BlueprintCard key={card.title} {...card} />)}</div></section>
    <section className="paper-callout"><div className="callout-seal"><img src="/manus-storage/indojavider-mark_c776921d.png" alt="인도자 교육 심볼" /></div><div><SectionLabel>THE FIRST QUESTION</SectionLabel><h2>오늘 당신의 시선은<br /><span>어디에 고정되어 있습니까?</span></h2><p>인도자의 시선이 예수 그리스도께 고정될 때, 회중의 시선도 함께 방향을 찾습니다.</p></div><ArrowRight className="callout-arrow" /></section>
  </>;
}

function WeekTwo() {
  const [revealed, setRevealed] = useState(0);
  return <>
    <section className="section-block"><div className="section-heading"><div><SectionLabel>THE DISCERNMENT BLADE</SectionLabel><h2>현대 CCM의 함정은<br /><em>부드러운 위로의 가면</em>을 쓰고 찾아옵니다.</h2></div><div className="heading-note">02 / 03<br /><span>DISCERNMENT</span></div></div><div className="discernment-layout"><div className="radar-panel"><div className="radar-grid" /><div className="radar-ring ring-a" /><div className="radar-ring ring-b" /><div className="radar-sweep" /><div className="radar-point point-a" /><div className="radar-point point-b" /><div className="radar-label label-top">감정</div><div className="radar-label label-right">진리</div><div className="radar-label label-bottom">복음</div><div className="radar-label label-left">대상</div><div className="radar-core">DISCERN</div></div><div className="discernment-copy"><p className="lead-copy">몽환적 멜로디와 ‘나를 위로해 주는 가사’에 마음이 움직일 수 있습니다. 그러나 먼저 두 가지를 물어야 합니다.</p><div className="question-stack"><button className={revealed === 1 ? "selected" : ""} onClick={() => setRevealed(1)}><span>Q1</span><strong>이 찬양은 누구를 향하고 있는가?</strong><ChevronDown size={16} /></button><button className={revealed === 2 ? "selected" : ""} onClick={() => setRevealed(2)}><span>Q2</span><strong>무엇을 선포하고 있는가?</strong><ChevronDown size={16} /></button></div>{revealed > 0 && <div className="answer-box"><Sparkles size={16} /><p>{revealed === 1 ? "요한복음 4장 23~24절처럼 영과 진리로 예배하는지, 사람과 감정이 중심이 되지는 않는지 확인합니다." : "갈라디아서 1장 10절처럼 사람을 기쁘게 하는지, 십자가와 회개의 복음을 분명히 담고 있는지 확인합니다."}</p></div>}</div></div></section>
    <section className="section-block warm-section"><div className="section-intro narrow"><SectionLabel>CASE STUDY / 202X</SectionLabel><h2>진리가 거세된<br /><em>빈껍데기 고백</em></h2><p>가사에서 하나님, 예수 그리스도, 십자가, 보혈이 사라진 자리에 모호한 인간적 위로만 남는다면, 그것은 교리가 아니라 단순한 노래에 불과합니다.</p></div><div className="critique-list">{weekTwoCritiques.map((item, index) => { const Icon = item.icon; return <button key={item.number} className={`critique-row ${revealed === index + 3 ? "selected" : ""}`} onClick={() => setRevealed(index + 3)}><span className="critique-no">{item.number}</span><span className="critique-icon"><Icon size={18} /></span><span className="critique-content"><strong>{item.title}</strong><small>{item.body}</small></span><ArrowRight size={18} /></button>; })}</div></section>
  </>;
}

function WeekThree() {
  const [activeStage, setActiveStage] = useState(0);
  const [songForm, setSongForm] = useState("verse");
  return <>
    <section className="section-block story-hero"><div className="story-copy"><SectionLabel>THE LITURGICAL FLOW</SectionLabel><h2>플레이리스트를 넘어,<br /><em>예배의 서사를 써라.</em></h2><p>기독교 세계관의 거대한 그림인 창조–타락–구속–완성. 주일 예배는 이 구속사의 거대한 흐름을 품어내야 합니다.</p><div className="creation-stack"><div>CONSUMMATION <small>완성</small></div><div>REDEMPTION <small>구속</small></div><div>FALL <small>타락</small></div><div>CREATION <small>창조</small></div></div></div><div className="story-image"><img src="/manus-storage/indojavider-bridge_277cf540.jpg" alt="예배의 서사를 잇는 빛의 다리" /><div className="image-caption">A LITURGICAL FLOW / 04 MOVEMENTS</div></div></section>
    <section className="section-block"><div className="section-heading"><div><SectionLabel>ISAIAH 06 / FOUR MOVEMENTS</SectionLabel><h2>이사야 6장에 기초한<br /><em>4단계 예배 서사 여정</em></h2></div><div className="heading-note">04 / 04<br /><span>LITURGICAL FLOW</span></div></div><div className="stage-track"><div className="track-line"><div className="track-progress" style={{ width: `${(activeStage / 3) * 100}%` }} /></div>{weekThreeStages.map((stage, index) => <button key={stage.step} className={`stage-node ${activeStage === index ? "active" : ""}`} onClick={() => setActiveStage(index)}><span>{stage.step}</span><strong>{stage.title}</strong><small>{stage.en}</small></button>)}</div><div className="stage-detail"><div className="stage-detail-no">0{activeStage + 1}</div><div><SectionLabel>{weekThreeStages[activeStage].en}</SectionLabel><h3>{weekThreeStages[activeStage].title}</h3><p>{weekThreeStages[activeStage].body}</p><div className="scripture-chip"><BookOpen size={15} /> {weekThreeStages[activeStage].scripture}</div></div></div></section>
    <section className="section-block warm-section"><div className="section-heading"><div><SectionLabel>SONG FORM / DYNAMIC</SectionLabel><h2>곡의 해부학: 송폼과<br /><em>영적 다이내믹스</em></h2></div></div><div className="song-form"><div className="song-wave"><div className={`wave-part ${songForm === "verse" ? "active" : ""}`} onClick={() => setSongForm("verse")}><span>VERSE</span><small>이야기의 시작<br />잔잔한 악기</small></div><div className={`wave-part ${songForm === "chorus" ? "active" : ""}`} onClick={() => setSongForm("chorus")}><span>CHORUS</span><small>메시지의 핵심<br />함께 고백</small></div><div className={`wave-part ${songForm === "bridge" ? "active" : ""}`} onClick={() => setSongForm("bridge")}><span>BRIDGE</span><small>영적·감정적 고조<br />은혜의 정점</small></div></div><div className="song-help"><Gauge size={17} /><span>{songForm === "verse" ? "도입부에서는 이야기를 시작하고 회중의 귀를 집중시킵니다." : songForm === "chorus" ? "후렴구에서는 메시지의 핵심을 리듬과 함께 회중이 고백하게 합니다." : "브릿지에서는 최고조에 달한 은혜가 결단으로 이어지도록 전환을 보호합니다."}</span></div></div></section>
  </>;
}

function WeekFour() {
  const [openRule, setOpenRule] = useState(0);
  const [devotion, setDevotion] = useState([false, false, false]);
  const toggleDevotion = (i: number) => setDevotion((current) => current.map((item, index) => index === i ? !item : item));
  return <>
    <section className="dark-week-hero"><div className="dark-hero-copy"><SectionLabel light>THE EDGE BEHIND THE MIC</SectionLabel><h2>마이크 뒤의<br /><em>칼날</em></h2><p>말 한마디로 예배를 살리기도, 사소한 정죄로 공동체를 박살낼 수도 있습니다.</p><div className="dark-hero-meta"><span>WEEK 04</span><span>LANGUAGE STEWARDSHIP</span></div></div><div className="mic-visual"><img src="/manus-storage/indojavider-microphone_04b3f2f8.jpg" alt="빛을 받는 마이크와 말씀의 상징" /></div></section>
    <section className="section-block"><div className="section-heading"><div><SectionLabel>THREE PROHIBITIONS</SectionLabel><h2>인도자 멘트 시 절대 범해서는 안 되는<br /><em>3대 금기</em></h2></div><div className="heading-note">01 / 03<br /><span>WARNING</span></div></div><div className="rules-list">{weekFourRules.map((rule, index) => { const Icon = rule.icon; return <article key={rule.title} className={`rule-card ${openRule === index ? "open" : ""}`}><button onClick={() => setOpenRule(openRule === index ? -1 : index)} className="rule-head"><span className="rule-number">0{index + 1}</span><span><strong>{rule.title}</strong><small>{rule.short}</small></span><Icon size={20} /></button>{openRule === index && <div className="rule-body"><div className="hazard"><span>HAZARD</span><p>{rule.bad}</p></div><ArrowRight size={18} /><div className="alternative"><span>ALTERNATIVE</span><p>{rule.good}</p></div></div>}</article>; })}</div></section>
    <section className="section-block devotion-section"><div className="section-intro"><SectionLabel>BEFORE THE REHEARSAL</SectionLabel><h2>악보보다 먼저,<br /><em>디보션(Devotion)</em></h2><p>개혁주의 찬양팀의 본질은 모임→디보션→영적 연합→합주입니다. 콘티의 신학적 메시지를 먼저 나누고, 하나 된 영적 고백 위에서 연주를 시작합니다.</p></div><div className="devotion-flow">{["모임 / Gather", "디보션 / 10 min", "영적 연합 / Unity", "합주 / Rehearsal"].map((label, index) => <button key={label} className={`devotion-step ${devotion[index] ? "done" : ""}`} onClick={() => toggleDevotion(index)}><span>{devotion[index] ? <Check size={18} /> : `0${index + 1}`}</span><strong>{label}</strong>{index < 3 && <ArrowRight size={16} />}</button>)}</div></section>
    <section className="final-mission"><div className="mission-icon"><PenLine size={26} /></div><SectionLabel light>FINAL MISSION / SOLI DEO GLORIA</SectionLabel><h2>고등부 예배를 살릴<br /><em>청지기</em>로 파송됩니다.</h2><div className="mission-grid"><label><input type="checkbox" /> 1분 이내 분량의 멘트 원고 작성</label><label><input type="checkbox" /> 사생활·감성적 수다 전면 배제</label><label><input type="checkbox" /> 특정 곡으로 넘어가는 브릿지 역할</label><label><input type="checkbox" /> 개역개정 성경 본문 명확히 선포</label><label><input type="checkbox" /> 다음 주 팀원들 앞 실전 시뮬레이션</label></div><div className="soli">Soli Deo Gloria <small>모든 영광을 하나님께</small></div></section>
  </>;
}

export default function Home() {
  const [activeWeek, setActiveWeek] = useState<WeekId>(1);
  const active = useMemo(() => weeks.find((week) => week.id === activeWeek) ?? weeks[0], [activeWeek]);
  const ActiveIcon = active.icon;
  const scrollToCurriculum = () => document.getElementById("curriculum")?.scrollIntoView({ behavior: "smooth" });
  return <div className={`site-shell week-${activeWeek}`}>
    <header className="topbar"><button className="brand" onClick={() => setActiveWeek(1)} aria-label="홈으로"><img src="/manus-storage/indojavider-mark_c776921d.png" alt="인도자 교육 심볼" /><span><strong>INDOJAVIDER</strong><small>인도자 교육 아카이브</small></span></button><div className="topbar-meta"><span>HIGH SCHOOL WORSHIP LEADER TRAINING</span><span>2026 / 04 WEEKS</span></div><button className="mobile-menu" aria-label="메뉴"><Menu size={20} /></button></header>
    <main className="layout"><aside><WeekNav active={activeWeek} onChange={setActiveWeek} /></aside><div className="content"><section className={`hero hero-${activeWeek}`}><div className="hero-copy"><div className="hero-kicker"><span className="hero-index">0{active.id}</span><span>{active.eyebrow}</span></div><h1>{active.title}</h1><p className="hero-subtitle">{active.subtitle}</p><div className="hero-thesis"><span className="thesis-mark">“</span><p>{active.thesis}</p></div><button className="hero-cta" onClick={scrollToCurriculum}>이번 주 교육 펼쳐보기 <ArrowDown size={17} /></button></div><div className="hero-art">{activeWeek === 4 ? <img src="/manus-storage/indojavider-microphone_04b3f2f8.jpg" alt="마이크와 말씀의 상징" /> : <img src="/manus-storage/indojavider-hero_3f147089.jpg" alt="예배 공간과 건축 도면" />}<div className="hero-coordinate">37° 33' 48.2" N<br />126° 58' 40.0" E</div></div></section><MobileWeekNav active={activeWeek} onChange={setActiveWeek} /><div id="curriculum" className="curriculum"><div className="mobile-current"><ActiveIcon size={15} /> {active.eyebrow}</div>{activeWeek === 1 && <WeekOne />}{activeWeek === 2 && <WeekTwo />}{activeWeek === 3 && <WeekThree />}{activeWeek === 4 && <WeekFour />}</div></div></main>
    <footer className="site-footer"><div><strong>INDOJAVIDER</strong><span> / 인도자 교육 아카이브</span></div><div>모든 영광을 하나님께 <b>·</b> SOLI DEO GLORIA</div></footer>
  </div>;
}
