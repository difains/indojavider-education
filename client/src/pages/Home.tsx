import { useMemo, useState, useEffect } from "react";
import {
  ArrowDown,
  ArrowRight,
  BookOpen,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleAlert,
  Compass,
  Crosshair,
  ExternalLink,
  Feather,
  FileText,
  Flame,
  Globe,
  HelpCircle,
  Layers3,
  Lightbulb,
  LockKeyhole,
  Maximize2,
  Menu,
  Mic2,
  Minimize2,
  Music,
  PenLine,
  Play,
  RotateCcw,
  Route,
  Scale,
  ScrollText,
  Shield,
  ShieldAlert,
  Sparkles,
  Target,
  Volume2,
  X,
  Zap,
} from "lucide-react";

type WeekId = 1 | 2 | 3 | 4;

type Week = {
  id: WeekId;
  eyebrow: string;
  title: string;
  subtitle: string;
  thesis: string;
  color: string;
  icon: typeof Mic2;
  pageCount: number;
};

const weeks: Week[] = [
  {
    id: 1,
    eyebrow: "WEEK 01 · IDENTITY",
    title: "진짜 주인공은 네가 아니야",
    subtitle: "무대 위의 가수가 아니라, 하나님과 회중을 잇는 다리(Bridge)",
    thesis: "예배의 유일한 주인공은 오직 예수 그리스도 한 분뿐입니다.",
    color: "amber",
    icon: Mic2,
    pageCount: 10,
  },
  {
    id: 2,
    eyebrow: "WEEK 02 · DISCERNMENT",
    title: "네 감정에 속지 마",
    subtitle: "참된 위로는 어디서 오는가? 찬양 가사 속 신학적 분별과 목회적 대안",
    thesis: "위로 자체가 문제가 아니라, 그 위로가 어디에 뿌리내리고 있는지가 중요합니다.",
    color: "blue",
    icon: Crosshair,
    pageCount: 12,
  },
  {
    id: 3,
    eyebrow: "WEEK 03 · LITURGY",
    title: "예배의 서사를 써라",
    subtitle: "단순한 플레이리스트를 넘어, 영혼을 인도하는 구속사적 콘티 기획",
    thesis: "곡의 무작위 나열이 아니라 창조-타락-구속-완성으로 이어지는 거룩한 설계도입니다.",
    color: "gold",
    icon: Route,
    pageCount: 8,
  },
  {
    id: 4,
    eyebrow: "WEEK 04 · STEWARDSHIP",
    title: "마이크 뒤의 칼날",
    subtitle: "말씀을 살리고 공동체를 세우는 언어의 청지기 직분과 리허설 전 디보션",
    thesis: "마이크는 당신의 영적 이력서가 아니라, 오직 말씀을 운반하는 통로입니다.",
    color: "red",
    icon: ShieldAlert,
    pageCount: 10,
  },
];

const BASE_URL = import.meta.env.BASE_URL;

function SectionLabel({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <div className={`section-label ${light ? "section-label-light" : ""}`}>
      <span className="label-line" />
      {children}
    </div>
  );
}

function SlideGallery({ weekId, totalPages }: { weekId: WeekId; totalPages: number }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [isZoomed, setIsZoomed] = useState(false);

  const slideSrc = `${BASE_URL}slides/week${weekId}_page_${String(currentPage).padStart(2, "0")}.png`;

  return (
    <section className="source-pdf">
      <div className="source-pdf-heading">
        <div>
          <SectionLabel>ORIGINAL SLIDES / WEEK 0{weekId}</SectionLabel>
          <h3>교육 원문 슬라이드 전체 보기 ({totalPages}장)</h3>
          <p>
            {weekId}주차 강의 슬라이드 원본 고화질 자료입니다. 웹 브라우저에서 바로 한 장씩 넘겨보거나 확대하여 학습할 수 있습니다.
          </p>
        </div>
        <div className="slide-actions">
          <button className="slide-btn" onClick={() => setIsZoomed(!isZoomed)}>
            {isZoomed ? <Minimize2 size={16} /> : <Maximize2 size={16} />} {isZoomed ? "축소" : "슬라이드 크게 보기"}
          </button>
        </div>
      </div>

      <div className={`slide-viewer ${isZoomed ? "zoomed" : ""}`}>
        <div className="slide-image-wrapper">
          <img src={slideSrc} alt={`${weekId}주차 ${currentPage}페이지 슬라이드`} className="slide-image" />
        </div>

        <div className="slide-controls">
          <button
            className="slide-nav-btn"
            disabled={currentPage <= 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            aria-label="이전 슬라이드"
          >
            <ChevronLeft size={20} />
          </button>
          <div className="slide-pagination">
            <span>
              <strong>{currentPage}</strong> / {totalPages}
            </span>
          </div>
          <button
            className="slide-nav-btn"
            disabled={currentPage >= totalPages}
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            aria-label="다음 슬라이드"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        <div className="slide-thumbnails">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
            <button
              key={num}
              className={`thumb-btn ${currentPage === num ? "active" : ""}`}
              onClick={() => setCurrentPage(num)}
            >
              {num}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function BlueprintCard({
  icon: Icon,
  label,
  title,
  body,
  tag,
}: {
  icon: typeof Route;
  label: string;
  title: string;
  body: string;
  tag?: string;
}) {
  return (
    <article className="blueprint-card">
      <div className="card-crosshair" />
      <div className="card-top-row">
        <div className="card-icon">
          <Icon size={18} />
        </div>
        {tag && <span className="card-tag">{tag}</span>}
      </div>
      <div className="card-label">{label}</div>
      <h3>{title}</h3>
      <p>{body}</p>
    </article>
  );
}

/* =========================================================================
   WEEK 1: 정체성 (Identity) - 진짜 주인공은 네가 아니야
   ========================================================================= */
function WeekOne() {
  const [activeTab, setActiveTab] = useState<"idol" | "bridge">("bridge");

  return (
    <>
      <section className="section-block identity-hero">
        <div className="section-intro">
          <SectionLabel>THE ESSENCE OF SIN & GLORY</SectionLabel>
          <h2>
            우리가 박수받기를
            <br />
            <em>갈망하는 이유</em>
          </h2>
          <p>
            기독교 세계관의 첫 단추는 <strong>'창조와 타락'</strong>입니다. 우리는 하나님의 영광을 위해 창조되었으나,
            죄의 본질은 내가 하나님의 자리에 올라가 그 영광을 가로채려는 데 있습니다.
          </p>
          <div className="quote-box">
            <span className="quote-badge">스포트라이트의 착각</span>
            <p>
              “와, 내 목소리 진짜 좋다. 기타 치는 내 모습 완전 멋있겠지? 오늘 스포트라이트는 내 차지야…”
              <br />
              <strong>착각하지 마라. 무대 위 스포트라이트를 받는 사람은 주인공이 아니다.</strong>
            </p>
          </div>
        </div>
        <div className="self-check-visual">
          <div className="circle circle-outer" />
          <div className="circle circle-inner" />
          <div className="visual-center">
            <div className="cross-mark">†</div>
            <span>SOLI DEO</span>
            <small>GLORIA</small>
          </div>
          <div className="orbit orbit-1">타락: 자기 영광 가로채기</div>
          <div className="orbit orbit-2">창조: 오직 하나님의 영광</div>
        </div>
      </section>

      {/* 존 칼빈 우상 공장 메커니즘 */}
      <section className="section-block warm-section">
        <div className="section-heading">
          <div>
            <SectionLabel>JOHN CALVIN / INSTITUTES</SectionLabel>
            <h2>
              우상을 만들어내는
              <br />
              <em>우리의 마음</em>
            </h2>
          </div>
        </div>
        <div className="calvin-quote-banner">
          <div className="calvin-icon">
            <Feather size={28} />
          </div>
          <blockquote>
            “인간의 마음은 우상을 만들어내는 끝없는 공장이다.”
            <cite>— 존 칼빈, 『기독교 강요』</cite>
          </blockquote>
        </div>
        <div className="idol-flow-diagram">
          <div className="flow-step">
            <span className="step-tag">ROOT</span>
            <h4>타락한 인간의 마음</h4>
            <p>인정받고 높임받고자 하는 자기중심적 욕망</p>
          </div>
          <div className="flow-arrow">
            <ArrowRight size={22} />
          </div>
          <div className="flow-step warning">
            <span className="step-tag">TOOL</span>
            <h4>마이크 / 찬양 인도</h4>
            <p>내 목소리와 실력으로 회중을 감동시키려는 시도</p>
          </div>
          <div className="flow-arrow">
            <ArrowRight size={22} />
          </div>
          <div className="flow-step danger">
            <span className="step-tag">RESULT</span>
            <h4>자기 자신을 향한 우상숭배</h4>
            <p>하나님이 아닌 '무대 위의 나'를 숭배하는 영적 탈선</p>
          </div>
        </div>
      </section>

      {/* 퍼포머 vs 다리 대조 매트릭스 */}
      <section className="section-block">
        <div className="section-heading">
          <div>
            <SectionLabel>THE BRIDGE PRINCIPLE</SectionLabel>
            <h2>
              당신은 무대 위의 가수가 아니라
              <br />
              <em>'다리(Bridge)'입니다.</em>
            </h2>
          </div>
          <div className="heading-note">
            01 / 03
            <br />
            <span>IDENTITY MATRIX</span>
          </div>
        </div>
        <div className="comparison-table-wrapper">
          <table className="comparison-table">
            <thead>
              <tr>
                <th>구분 기준</th>
                <th className="bad-col">무대 위의 가수 (Performer)</th>
                <th className="good-col">예배의 청지기 (Bridge)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <strong>정체성 (Identity)</strong>
                </td>
                <td className="bad-col">대중의 박수와 환호를 갈망하는 퍼포머</td>
                <td className="good-col">
                  <strong>회중과 하나님을 연결하는 통로이자 청지기</strong>
                </td>
              </tr>
              <tr>
                <td>
                  <strong>시선 (Focus)</strong>
                </td>
                <td className="bad-col">나 자신과 나의 가창력, 기타 연주 실력</td>
                <td className="good-col">
                  <strong>회중의 시선을 오직 예수 그리스도께 고정</strong>
                </td>
              </tr>
              <tr>
                <td>
                  <strong>롤모델 (Role Model)</strong>
                </td>
                <td className="bad-col">오디션 프로그램의 화려한 스타</td>
                <td className="good-col">
                  <strong>세례요한</strong> (“그는 흥하여야 하겠고 나는 쇠하여야 하리라”)
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 다리 붕괴 경고 다이어그램 */}
      <section className="section-block bridge-collapse">
        <div className="section-intro">
          <SectionLabel>WHEN THE BRIDGE SHINES</SectionLabel>
          <h2>
            다리가 스스로 빛나려 할 때,
            <br />
            <em>하나님을 향한 길은 무너집니다.</em>
          </h2>
          <p>
            다리 위를 건너가는 분은 오직 예수 그리스도여야 합니다. 인도자가 자신을 드러내고 목적지가 되려 하는 순간,
            회중을 그리스도께 잇는 다리는 무너져 내립니다.
          </p>
        </div>
        <div className="bridge-diagram">
          <div className="bridge-point people">
            <span>회중</span>
            <small>예배자</small>
          </div>
          <div className="bridge-structure broken">
            <div className="broken-banner">
              <ShieldAlert size={18} />
              <span>인도자가 주인공이 되면 다리는 붕괴합니다</span>
            </div>
            <div className="beam-line" />
          </div>
          <div className="bridge-point destination">
            <span className="cross-icon">†</span>
            <span>그리스도</span>
            <small>유일한 목적지</small>
          </div>
        </div>
      </section>

      {/* 개혁주의 찬양 인도자의 영원한 좌우명 & 공식 */}
      <section className="section-block identity-formula">
        <div className="formula-quote">
          <SectionLabel>JOHN 03 : 30</SectionLabel>
          <blockquote>
            “그는 흥하여야 하겠고
            <br />
            나는 쇠하여야 하리라.”
          </blockquote>
          <p>개혁주의 찬양 인도자의 영원한 좌우명, 세례요한의 고백입니다.</p>
        </div>
        <div className="formula-board">
          <div className="formula-side">
            <span className="formula-label">나 (인도자)</span>
            <b className="formula-down">↓ 쇠함</b>
            <small>철저히 작아지고 무대 뒤로 사라짐</small>
          </div>
          <div className="formula-arrow">
            <ArrowRight size={28} />
          </div>
          <div className="formula-side large">
            <span className="formula-label">예수 그리스도</span>
            <b className="formula-up">↑ 흥함</b>
            <small>
              “그리스도의 말씀이 너희 속에 풍성히 거하여”
              <br />
              (골로새서 3장 16절)
            </small>
          </div>
        </div>
        <p className="formula-note">
          내 안의 우상 공장을 멈추는 유일한 방법은 <strong>‘나의 쇠함’</strong>입니다. 내가 철저히 작아지고 사라질 때,
          그 빈 공간에 비로소 그리스도의 말씀이 온전히 채워집니다.
        </p>
      </section>

      {/* 실천 과제 */}
      <section className="assignment-panel">
        <div>
          <SectionLabel light>PRACTICAL COMMITMENT ASSIGNMENT</SectionLabel>
          <h2>
            오직 주님만
            <br />
            <em>드러나게 하소서</em>
          </h2>
          <p>
            ‘나의 영광 꺾기 인도자 헌신 선언문’을 A4 1페이지 내외로 작성하여 다음 주 모임 전까지 제출합니다.
          </p>
        </div>
        <ol>
          <li>
            <span>01</span>
            <strong>자기반성 고백</strong>: 최근 찬양 인도 및 싱어 활동 중 ‘나 자신’이 너무 드러났던 순간이나 인정 욕구 성찰
          </li>
          <li>
            <span>02</span>
            <strong>쇠함의 영역 점검</strong>: 요한복음 3장 30절에 비추어, 내가 무대 위아래에서 구체적으로 더 작아져야 할 영역
          </li>
          <li>
            <span>03</span>
            <strong>목회적 헌신 다짐</strong>: 오직 예수님만 예배의 주인공이 되시도록 돕는 ‘다리(Bridge)’가 되겠다는 구체적 결단
          </li>
        </ol>
        <div className="assignment-ending">
          내가 아니라 그리스도가 드러날 때,
          <br />
          비로소 진짜 예배가 시작됩니다.
        </div>
      </section>

      <SlideGallery weekId={1} totalPages={10} />
    </>
  );
}

/* =========================================================================
   WEEK 2: 분별 (Discernment) - 네 감정에 속지 마: 참된 위로는 어디서 오는가?
   ========================================================================= */
function WeekTwo() {
  const [activeCritique, setActiveCritique] = useState(1);
  const [selectedWord, setSelectedWord] = useState<string | null>(null);

  const critiqueDetails = [
    {
      id: 1,
      title: "시선의 방향: 수직적 경배 vs 수평적 위로",
      badge: "대상 분별",
      desc: "찬양의 유일한 대상이신 삼위일체 하나님을 향한 수직적 경배가 상실되고, 사람과 감정 사이의 수평적 위로로 시선이 머무는 현상입니다.",
      scripture: "요한복음 4:23~24",
      point: "찬양을 부를 때 우리의 시선이 하나님을 향하는가, 아니면 내 곁의 사람이나 나의 상처에 머무는가?",
    },
    {
      id: 2,
      title: "복음의 뼈대: 십자가 구속과 회개의 부재",
      badge: "복음 소거",
      desc: "청소년들의 위로받고 싶은 심리를 자극해 일시적인 카타르시스를 제공하지만, 기독교 복음의 핵심인 죄에 대한 회개와 십자가 보혈이 소거된 경우입니다.",
      scripture: "갈라디아서 1:10",
      point: "위로는 주되 복음의 본질(죄, 회개, 십자가, 구속)이 빠져 있다면 영혼을 살리는 참된 생명이 될 수 없습니다.",
    },
    {
      id: 3,
      title: "복음의 고유성: 일반 힐링송과의 구별성 보존",
      badge: "세속화 주의",
      desc: "찬양 가사에서 ‘하나님’이라는 단어를 지웠을 때 일반 대중가요 힐링송과 구별되지 않는다면, 복음의 독특성이 희석된 것입니다.",
      scripture: "골로새서 3:16",
      point: "교회 밖의 힐링송과 구별되는 찬양만의 고유한 진리와 구속의 능력을 잃지 않도록 분별의 필터가 필요합니다.",
    },
  ];

  return (
    <>
      <section className="section-block">
        <div className="section-heading">
          <div>
            <SectionLabel>THE DISCERNMENT BLADE</SectionLabel>
            <h2>
              현대 CCM의 함정은
              <br />
              <em>부드러운 위로의 가면</em>을 쓰고 찾아옵니다.
            </h2>
          </div>
          <div className="heading-note">
            02 / 03
            <br />
            <span>DISCERNMENT</span>
          </div>
        </div>
        <div className="discernment-radar-box">
          <div className="radar-header">
            <div className="radar-tag">분석 타겟</div>
            <p>몽환적인 멜로디 + 나를 무조건적으로 위로해 주는 가사</p>
          </div>
          <div className="radar-body">
            <div className="radar-badge danger">
              <CircleAlert size={16} /> 감성적 카타르시스 감지 · 신학적 깊이 확인 필요
            </div>
            <p>
              요즘 유행하는 찬양, 과연 모두 성경적일까요? 감성에 취해 찬양의 대상이신 하나님을 잃어버리고 있는 것은 아닌지,
              <strong>요한복음 4장 23~24절</strong>과 <strong>갈라디아서 1장 10절</strong>의 기준으로 질문을 던져야 합니다.
            </p>
          </div>
        </div>
      </section>

      {/* RPW (예배의 규범적 원리) 다이어그램 */}
      <section className="section-block warm-section">
        <div className="section-heading">
          <div>
            <SectionLabel>REGULATIVE PRINCIPLE OF WORSHIP</SectionLabel>
            <h2>
              예배의 규범적 원리(RPW)와
              <br />
              <em>찬양 가사의 분별 기준</em>
            </h2>
          </div>
        </div>
        <div className="rpw-grid">
          <div className="rpw-card safe">
            <div className="rpw-badge">RPW 안전 구역</div>
            <h4>예배의 요소 & 순서</h4>
            <p>설교, 기도, 찬송, 성찬 등 공예배의 요소와 순서는 <strong>오직 성경이 명령한 대로만</strong> 구성해야 합니다.</p>
            <div className="rpw-example">
              <Flame size={18} />
              <span>
                <strong>레위기 10장 '다른 불' 경고</strong>: 하나님이 명하지 않은 방식으로 제사드린 나답과 아비후의 사례 (자의적 예배 Will-worship 경고)
              </span>
            </div>
          </div>
          <div className="rpw-card special">
            <div className="rpw-badge special-badge">별도 성경적 기준</div>
            <h4>개별 찬양 가사의 분별</h4>
            <p>
              개별 찬양 가사의 신학적 풍성함은 RPW 요소 규정이 아닌, <strong>골로새서 3장 16절</strong>의 기준으로 분별합니다.
            </p>
            <div className="rpw-example scripture-ex">
              <BookOpen size={18} />
              <span>
                <strong>골로새서 3:16</strong>: “그리스도의 말씀이 너희 속에 풍성히 거하여 모든 지혜로 피차 가르치며 권면하고…”
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 참된 위로는 어디서 오는가? (위로의 뿌리 비교 매트릭스) */}
      <section className="section-block">
        <div className="section-heading">
          <div>
            <SectionLabel>ROOTS OF TRUE COMFORT</SectionLabel>
            <h2>
              참된 위로는 어디서 오는가?
              <br />
              <em>위로의 뿌리를 점검하십시오.</em>
            </h2>
          </div>
        </div>
        <div className="comfort-core-message">
          <Sparkles size={20} />
          <p>
            <strong>“위로 자체가 문제가 아니라, 그 위로가 어디에 뿌리내리고 있는지가 중요합니다.”</strong>
            <br />
            십자가에 근거한 위로는 진짜이고 영속적이지만, 인간의 감정 자체에서 나온 위로는 일시적인 감정 소모에 불과합니다.
          </p>
        </div>
        <div className="comfort-table-wrapper">
          <table className="comfort-table">
            <thead>
              <tr>
                <th>비교 기준</th>
                <th className="cross-col">위로의 근거가 '십자가'일 때 (Theocentrism)</th>
                <th className="emotion-col">위로의 근거가 '인간의 감정 자체'일 때 (Emotionalism)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>위로의 근원</strong></td>
                <td className="cross-col">십자가 보혈과 하나님의 말씀</td>
                <td className="emotion-col">인간의 심리적 카타르시스와 공감</td>
              </tr>
              <tr>
                <td><strong>가사의 초점</strong></td>
                <td className="cross-col">하나님의 거룩하심과 죄에 대한 회개, 구속의 은혜</td>
                <td className="emotion-col">“힘들지? 내가 위로해 줄게” (자아연민과 감정 해소)</td>
              </tr>
              <tr>
                <td><strong>예배의 방향</strong></td>
                <td className="cross-col"><strong>수직적 (인간 → 하나님)</strong></td>
                <td className="emotion-col"><strong>수평적 (인간 → 인간)</strong></td>
              </tr>
              <tr>
                <td><strong>궁극적 결과</strong></td>
                <td className="cross-col">영적 구속과 참된 생명, 지속적 평안</td>
                <td className="emotion-col">일시적인 감정 소모 후 찾아오는 영적 공허</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 위로 중심 CCM 가사 신학적 해부기 (Lyric Inspector) */}
      <section className="section-block warm-section">
        <div className="section-heading">
          <div>
            <SectionLabel>CASE STUDY / LYRIC INSPECTOR</SectionLabel>
            <h2>
              사례 연구: 위로 중심 CCM 가사 분석
              <br />
              <em>개혁주의 관점에서 가사를 살피다</em>
            </h2>
          </div>
        </div>
        <div className="lyric-inspector-layout">
          <div className="lyric-sheet">
            <div className="sheet-header">
              <span className="sheet-tag">LYRIC SHEET</span>
              <h4>위로 중심 CCM 가사 사례</h4>
            </div>
            <div className="sheet-body">
              <p>“그대 폭풍 속을 걷고 있을 때</p>
              <p>비바람을 마주해야 할 때</p>
              <p>불빛조차 보이지 않아도</p>
              <p className="highlight-lyric">그대 혼자 걷지 않을 거예요”</p>
              <div className="sheet-missing-words">
                <span className="missing-title">가사 내 부재 요소 진단:</span>
                <div className="word-chips">
                  <span className="chip missing">[하나님 부재]</span>
                  <span className="chip missing">[예수 그리스도 부재]</span>
                  <span className="chip missing">[십자가 부재]</span>
                  <span className="chip missing">[보혈 부재]</span>
                  <span className="chip missing">[회개 부재]</span>
                </div>
              </div>
            </div>
          </div>

          <div className="critique-tabs">
            <div className="tab-buttons">
              {critiqueDetails.map((item) => (
                <button
                  key={item.id}
                  className={`tab-btn ${activeCritique === item.id ? "active" : ""}`}
                  onClick={() => setActiveCritique(item.id)}
                >
                  <span className="tab-no">0{item.id}</span>
                  <span>{item.badge}</span>
                </button>
              ))}
            </div>
            <div className="tab-content-panel">
              <div className="panel-badge">{critiqueDetails[activeCritique - 1].badge}</div>
              <h4>{critiqueDetails[activeCritique - 1].title}</h4>
              <p className="panel-desc">{critiqueDetails[activeCritique - 1].desc}</p>
              <div className="panel-point">
                <Lightbulb size={17} />
                <span>{critiqueDetails[activeCritique - 1].point}</span>
              </div>
              <div className="panel-scripture">
                <BookOpen size={16} /> 관련 말씀: {critiqueDetails[activeCritique - 1].scripture}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 시편 121편 말씀 클로저 */}
      <section className="scripture-closure">
        <SectionLabel light>THE SOURCE OF TRUE COMFORT</SectionLabel>
        <p className="closure-lead">
          참된 위로의 유일한 근원은
          <br />
          오직 <strong>하나님의 말씀</strong>입니다.
        </p>
        <blockquote>
          “내가 산을 향하여 눈을 들리라 나의 도움이 어디서 올까
          <br />
          나의 도움은 천지를 지으신 여호와에게서로다”
        </blockquote>
        <small>시편 121편 1–2절 · 개역개정</small>
        <p>
          흔들리는 감정이나 사람이 만들어낸 발라드가 아니라, 영원불변하신 창조주 하나님 중심(Theocentrism)으로 돌아갈 때
          비로소 성도들에게 진정한 위로와 평안이 흘러갑니다.
        </p>
      </section>

      {/* 2주차 실천 과제 */}
      <section className="section-block">
        <div className="section-heading">
          <div>
            <SectionLabel>PRACTICE / TARGET – DIAGNOSTIC – PRESCRIPTION</SectionLabel>
            <h2>
              실전 과제: 당신의
              <br />
              <em>분별력과 목회적 대안을 제시하십시오.</em>
            </h2>
          </div>
          <div className="heading-note">
            A4 1 PAGE
            <br />
            <span>BEFORE NEXT WEEK</span>
          </div>
        </div>
        <div className="practice-grid">
          <article>
            <span className="practice-no">01 / TARGET</span>
            <h3>곡 선정 및 가사 추출</h3>
            <p>인본주의적 위로에 치중된 CCM 1곡을 선정하고 가사 전체를 살펴봅니다.</p>
          </article>
          <article>
            <span className="practice-no">02 / DIAGNOSTIC</span>
            <h3>신학적 근거 진단</h3>
            <p>
              이 곡의 위로가 어떤 근거 위에 서 있는지 점검하고, 복음의 요소(회개, 십자가, 구속) 중 어떤 부분이 보완되어야 할지 분석합니다.
            </p>
          </article>
          <article>
            <span className="practice-no">03 / PRESCRIPTION</span>
            <h3>목회적 말씀 대안 제시</h3>
            <p>
              이 곡을 예배에서 부를 때, 인도자가 성경 말씀(시편 121편 등)으로 어떻게 신학적 균형을 보완할 것인지 목회적 멘트와 연결 계획을 수립합니다.
            </p>
          </article>
        </div>
        <div className="practice-note">
          다음 주차 모임 전까지 제출 완료. <b>우리가 부르는 가사는 곧 우리의 고백이자 교리입니다.</b>
        </div>
      </section>

      <SlideGallery weekId={2} totalPages={12} />
    </>
  );
}

/* =========================================================================
   WEEK 3: 예배 서사 (Liturgy) - 예배의 서사를 써라
   ========================================================================= */
function WeekThree() {
  const [activeStage, setActiveStage] = useState(0);
  const [songForm, setSongForm] = useState<"verse" | "chorus" | "bridge">("verse");

  const weekThreeStages = [
    {
      step: "01",
      title: "부름과 임재",
      en: "Call & Presence",
      scripture: "이사야 6:1–3",
      body: "“거룩하다 거룩하다 거룩하다 만군의 여호와여 그의 영광이 온 땅에 충만하도다.” 첫 곡은 하나님의 절대 주권과 거룩하심을 웅장하게 선포하여 회중을 하나님 앞에 세웁니다.",
      mood: "거룩함 · 웅장함 · 경외감",
    },
    {
      step: "02",
      title: "참회와 고백",
      en: "Repentance & Confession",
      scripture: "이사야 6:5",
      body: "“화로다 나여 망하게 되었도다 나는 입술이 부정한 사람이요.” 하나님의 거룩하심 앞에 선 인간의 비참함과 연약함을 깨닫고 죄를 자백하는 회개의 찬양을 드립니다.",
      mood: "낮아짐 · 회개 · 정직한 고백",
    },
    {
      step: "03",
      title: "구속과 선포",
      en: "Redemption & Proclamation",
      scripture: "이사야 6:6–7",
      body: "“이것이 네 입술에 닿았으니 네 악이 제하여졌고 네 죄가 사하여졌느니라.” 그리스도의 십자가 보혈과 사죄의 은혜가 터져 나오는 예배의 중심 구속 찬양을 배치합니다.",
      mood: "구원의 감격 · 십자가 은혜 · 찬송",
    },
    {
      step: "04",
      title: "헌신과 결단",
      en: "Dedication & Resolution",
      scripture: "이사야 6:8",
      body: "“내가 누구를 보내며 누가 우리를 위하여 갈꼬… 내가 여기 있나이다 나를 보내소서.” 구원의 은혜에 감격하여 삶의 현장에서 예배자로 살겠다는 결단의 찬송으로 파송합니다.",
      mood: "결단 · 순종 · 파송",
    },
  ];

  return (
    <>
      <section className="section-block story-hero">
        <div className="story-copy">
          <SectionLabel>THE LITURGICAL FLOW</SectionLabel>
          <h2>
            단순한 플레이리스트를 넘어,
            <br />
            <em>예배의 서사를 써라.</em>
          </h2>
          <p>
            기독교 세계관의 거대한 그림은 <strong>'창조 - 타락 - 구속 - 완성'</strong>으로 이어집니다.
            주일 찬양 콘티는 감정의 기복에 따른 무작위 나열이 아니라, 이 거룩한 구속사의 여정을 성도들과 함께 걷는 영적 설계도입니다.
          </p>
          <div className="creation-stack">
            <div className="stack-card">
              <span>04</span>
              <strong>완성</strong>
              <small>Consummation</small>
            </div>
            <div className="stack-card">
              <span>03</span>
              <strong>구속</strong>
              <small>Redemption</small>
            </div>
            <div className="stack-card">
              <span>02</span>
              <strong>타락</strong>
              <small>Fall</small>
            </div>
            <div className="stack-card">
              <span>01</span>
              <strong>창조</strong>
              <small>Creation</small>
            </div>
          </div>
        </div>
      </section>

      {/* 플레이리스트 vs 구속사적 콘티 비교 */}
      <section className="section-block">
        <div className="section-heading">
          <div>
            <SectionLabel>PLAYLIST VS LITURGY</SectionLabel>
            <h2>
              당신의 찬양은 '콘티'입니까,
              <br />
              <em>아니면 '플레이리스트'입니까?</em>
            </h2>
          </div>
        </div>
        <div className="comparison-table-wrapper">
          <table className="comparison-table">
            <thead>
              <tr>
                <th>구분</th>
                <th className="bad-col">멜론 플레이리스트 (무작위 나열)</th>
                <th className="good-col">구속사적 예배 콘티 (서사적 기획)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>선곡 기준</strong></td>
                <td className="bad-col">개인이 좋아하는 곡, 요즘 유행하는 파편적 선곡</td>
                <td className="good-col"><strong>성경적 서사와 신학적 흐름에 맞춘 목적 있는 선곡</strong></td>
              </tr>
              <tr>
                <td><strong>흐름과 템포</strong></td>
                <td className="bad-col">곡마다 감정선이 끊기고 템포가 급변함 (단절)</td>
                <td className="good-col"><strong>4단계의 영적 기승전결이 매끄럽게 연결됨 (흐름 보호)</strong></td>
              </tr>
              <tr>
                <td><strong>인도자의 역할</strong></td>
                <td className="bad-col">분위기를 띄우는 음악 감독 / 레크리에이션 MC</td>
                <td className="good-col"><strong>회중의 영혼을 하나님께 인도하는 영적 목회자</strong></td>
              </tr>
              <tr>
                <td><strong>예배의 열매</strong></td>
                <td className="bad-col">일시적인 감정적 흥분과 소모</td>
                <td className="good-col"><strong>삶의 결단과 헌신으로 이어지는 깊은 은혜의 경험</strong></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 이사야 6장 4단계 타임라인 */}
      <section className="section-block warm-section">
        <div className="section-heading">
          <div>
            <SectionLabel>ISAIAH 06 / FOUR MOVEMENTS</SectionLabel>
            <h2>
              이사야 6장에 기초한
              <br />
              <em>4단계 예배 서사 여정</em>
            </h2>
          </div>
          <div className="heading-note">
            04 / 04
            <br />
            <span>LITURGICAL FLOW</span>
          </div>
        </div>

        <div className="stage-track">
          <div className="track-line">
            <div className="track-progress" style={{ width: `${(activeStage / 3) * 100}%` }} />
          </div>
          {weekThreeStages.map((stage, index) => (
            <button
              key={stage.step}
              className={`stage-node ${activeStage === index ? "active" : ""}`}
              onClick={() => setActiveStage(index)}
            >
              <span>{stage.step}</span>
              <strong>{stage.title}</strong>
              <small>{stage.en}</small>
            </button>
          ))}
        </div>

        <div className="stage-detail">
          <div className="stage-detail-no">0{activeStage + 1}</div>
          <div className="stage-detail-content">
            <div className="stage-meta-row">
              <SectionLabel>{weekThreeStages[activeStage].en}</SectionLabel>
              <span className="mood-badge">{weekThreeStages[activeStage].mood}</span>
            </div>
            <h3>{weekThreeStages[activeStage].title}</h3>
            <p>{weekThreeStages[activeStage].body}</p>
            <div className="scripture-chip">
              <BookOpen size={16} /> 본문 근거: {weekThreeStages[activeStage].scripture}
            </div>
          </div>
        </div>
      </section>

      {/* 곡의 해부학: 송폼(Song Form) */}
      <section className="section-block">
        <div className="section-heading">
          <div>
            <SectionLabel>SONG FORM & SPIRITUAL DYNAMICS</SectionLabel>
            <h2>
              곡의 해부학: 송폼과
              <br />
              <em>영적 다이내믹스 조율</em>
            </h2>
          </div>
        </div>
        <div className="song-form-box">
          <div className="song-wave-selector">
            <button
              className={`wave-btn ${songForm === "verse" ? "active" : ""}`}
              onClick={() => setSongForm("verse")}
            >
              <span>VERSE (도입부)</span>
              <small>이야기의 시작 · 잔잔한 악기 편성</small>
            </button>
            <button
              className={`wave-btn ${songForm === "chorus" ? "active" : ""}`}
              onClick={() => setSongForm("chorus")}
            >
              <span>CHORUS (후렴구)</span>
              <small>메시지의 핵심 · 회중의 일치된 고백</small>
            </button>
            <button
              className={`wave-btn ${songForm === "bridge" ? "active" : ""}`}
              onClick={() => setSongForm("bridge")}
            >
              <span>BRIDGE (브릿지)</span>
              <small>영적 고조의 정점 · 폭발적인 은혜</small>
            </button>
          </div>
          <div className="song-form-explanation">
            <Volume2 size={20} />
            <p>
              {songForm === "verse" &&
                "Verse에서는 절제된 보컬과 잔잔한 악기로 회중의 귀와 마음을 하나님의 말씀에 집중하도록 안내합니다."}
              {songForm === "chorus" &&
                "Chorus에서는 곡의 핵심 신학적 고백이 선포되며, 리듬 악기가 더해져 온 회중이 한목소리로 노래하게 합니다."}
              {songForm === "bridge" &&
                "Bridge는 영적·감정적 고조의 정점으로, 풀 밴드 사운드와 함께 결단으로 나아가는 은혜가 극대화되는 순간입니다."}
            </p>
          </div>
        </div>
      </section>

      {/* 전환의 다리 놓기 (Building the Transition Bridge) 3대 실무 테크닉 */}
      <section className="section-block warm-section">
        <div className="section-heading">
          <div>
            <SectionLabel>BUILDING THE TRANSITION BRIDGE</SectionLabel>
            <h2>
              음악적 전환의 다리 놓기:
              <br />
              <em>은혜의 흐름을 보호하십시오.</em>
            </h2>
          </div>
        </div>
        <p className="transition-lead">
          브릿지에서 최고조에 달한 영적 감정선을 갑자기 끊고 긴 침묵으로 넘어가면 회중의 은혜는 단절됩니다.
          가장 훌륭한 음악적 연결(Transition)은 성도들이 <strong>'하나님의 임재'에서 '헌신'으로</strong> 나아가는 흐름이 끊기지 않게 돕는 실무적 배려입니다.
        </p>
        <div className="transition-grid">
          <BlueprintCard
            icon={Route}
            label="TECHNIQUE 01"
            title="키 변조와 허밍 (Key Mod & Humming)"
            body="인도자의 부드러운 허밍이나 10초 내외의 짧은 기도 멘트를 통해 새로운 Key와 다음 곡 인트로로 자연스럽게 착륙합니다."
            tag="조옮김 연결"
          />
          <BlueprintCard
            icon={Layers3}
            label="TECHNIQUE 02"
            title="신디사이저 패드 (Pad Sound)"
            body="은은하고 지속적인 패드 사운드를 곡 사이에 유지하여 차가운 정적을 방지하고 음악적·영적 서사의 긴장감을 지탱합니다."
            tag="공간 채움"
          />
          <BlueprintCard
            icon={Compass}
            label="TECHNIQUE 03"
            title="드럼 킥 펄스 (Kick Pulse)"
            body="심장 박동 같은 일정한 4분음표 드럼 킥 펄스로 회중이 템포와 리듬의 흐름을 잃지 않고 다음 곡의 몰입을 준비하게 합니다."
            tag="리듬 유지"
          />
        </div>
      </section>

      {/* 3주차 실천 과제 */}
      <section className="assignment-panel liturgy-assignment">
        <div>
          <SectionLabel light>PRACTICAL LITURGY ASSIGNMENT</SectionLabel>
          <h2>
            당신만의 거룩한
            <br />
            <em>설계도를 완성하십시오.</em>
          </h2>
          <p>
            이사야 6장의 구속사적 4단계 흐름을 실제 고등부 예배에 적용하여 주일 찬양 콘티 4곡을 기획합니다.
          </p>
        </div>
        <ol>
          <li>
            <span>01</span>
            <strong>콘티 시트 1장</strong>: 4단계(부름-참회-구속-헌신)에 따른 선곡표 (곡명, 작사/작곡가, 원곡 Key, 목표 BPM 명시)
          </li>
          <li>
            <span>02</span>
            <strong>송폼 및 전환 가이드 1장</strong>: 곡별 송폼(V-C-B) 구성 및 곡 사이 전환 테크닉(키 변조, 패드, 멘트 연결 방법) 상세 기술
          </li>
        </ol>
        <div className="assignment-ending">
          인도자는 단순한 음악 감독이 아니라,
          <br />
          회중의 영혼을 하나님께로 인도하는 영적 목회자입니다.
        </div>
      </section>

      <SlideGallery weekId={3} totalPages={8} />
    </>
  );
}

/* =========================================================================
   WEEK 4: 언어의 청지기 (Stewardship) - 마이크 뒤의 칼날
   ========================================================================= */
function WeekFour() {
  const [openRule, setOpenRule] = useState<number | null>(0);
  const [devotionSteps, setDevotionSteps] = useState([true, false, false, false]);
  const [mentorText, setMentorText] = useState("");
  const [checks, setChecks] = useState({
    timeUnder1Min: false,
    noGossip: false,
    hasScripture: false,
    isBridge: false,
    simulationDone: false,
  });

  const weekFourRules = [
    {
      id: 1,
      title: "타인 비방 및 정죄 금지",
      short: "말로 공동체의 건강한 성장을 훼손하는 독",
      hazard: "“저 사람은 항상 저래, 기본이 안 되어 있어.” (예배 지각생이나 준비 부족한 팀원을 마이크로 은근히 저격·비난하여 불신과 분열을 조장)",
      alternative: "공동체의 유익과 상대방의 성장을 위해 사랑의 마음으로, 리허설 후 조용히 1:1로 건네는 권면과 격려의 피드백",
      icon: X,
    },
    {
      id: 2,
      title: "감정적 선동 금지",
      short: "인위적 연출은 성령의 역사가 아닙니다.",
      hazard: "억지로 눈물을 유도하는 신파조 멘트, 분위기를 띄우기 위해 인위적으로 목소리를 떠는 행위, '주여 삼창!'을 감정 고조의 도구로 악용하는 심리 조작",
      alternative: "담백하고 진실된 성경 말씀 선포. 성령의 역사는 인도자의 연기력이 아니라 살아있는 말씀의 자체 능력에서 비롯됩니다.",
      icon: Zap,
    },
    {
      id: 3,
      title: "자기 자랑 및 사사로운 간증 금지",
      short: "마이크는 당신의 영적 이력서가 아닙니다.",
      hazard: "자신의 영적 스펙과 성취를 은근히 과시하는 발언, 공적 예배의 거룩성에 부적합한 지나치게 사사롭고 긴 개인 수다",
      alternative: "인도자는 자신을 감추고 오직 십자가 복음과 말씀만 드러내는 투명한 ‘통로(Channel)’의 직분을 지킵니다.",
      icon: LockKeyhole,
    },
  ];

  const toggleCheck = (key: keyof typeof checks) => {
    setChecks((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <>
      <section className="dark-week-hero">
        <div className="dark-hero-copy">
          <SectionLabel light>THE EDGE BEHIND THE MIC</SectionLabel>
          <h2>
            마이크 뒤의
            <br />
            <em>칼날</em>
          </h2>
          <p>
            무대 위 인도자의 입술은 예배를 살리는 <strong>은혜의 통로</strong>가 될 수도 있고,
            사소한 정죄와 교만으로 공동체를 무너뜨리는 <strong>사람을 치는 칼날</strong>이 될 수도 있습니다.
          </p>
          <div className="dark-hero-meta">
            <span>WEEK 04</span>
            <span>LANGUAGE STEWARDSHIP</span>
          </div>
        </div>
      </section>

      {/* 에스라의 원리와 언어의 청지기 직분 */}
      <section className="section-block language-steward">
        <div className="section-heading">
          <div>
            <SectionLabel>LANGUAGE STEWARDSHIP & EZRA'S PRINCIPLE</SectionLabel>
            <h2>
              우리는 가수가 아니라
              <br />
              <em>'언어의 청지기'입니다.</em>
            </h2>
          </div>
        </div>
        <div className="scripture-cards">
          <article className="scripture-card">
            <BookOpen size={18} />
            <strong>잠언 10장 19절</strong>
            <p>“말이 많으면 허물을 면하기 어려우나 그 입술을 제어하는 자는 지혜가 있느니라.”</p>
          </article>
          <article className="scripture-card">
            <BookOpen size={18} />
            <strong>에베소서 4장 29절</strong>
            <p>“무릇 더러운 말은 너희 입 밖에도 내지 말고 오직 덕을 세우는 데 소용되는 대로 선한 말을 하여 듣는 자들에게 은혜를 끼치게 하라.”</p>
          </article>
          <article className="scripture-card ezra-card">
            <BookOpen size={18} />
            <strong>에스라의 원리 (느헤미야 8:5~8)</strong>
            <p>“하나님의 율법책을 낭독하고 그 뜻을 해석하여 백성에게 그 낭독하는 것을 다 깨닫게 하니…”</p>
          </article>
        </div>

        <div className="language-contrast-grid">
          <div className="contrast-card bad">
            <span className="contrast-tag bad-tag">인간 중심의 감성 팔이 (위험)</span>
            <ul>
              <li>“제가 이번 주에 이런저런 일이 있었는데요~” 개인 사생활 나눔</li>
              <li>회중의 시선을 인도자 개인에게 집중시키는 긴 수다</li>
              <li>공적 예배의 엄숙함을 깨뜨리는 가벼운 잡담</li>
            </ul>
          </div>
          <div className="contrast-divider">
            <ArrowRight size={24} />
          </div>
          <div className="contrast-card good">
            <span className="contrast-tag good-tag">말씀 중심의 선포 (안전 & 거룩)</span>
            <ul>
              <li>개역개정 성경 구절의 짧고 명확한 선포 (에스라의 원리)</li>
              <li>회중의 시선을 ‘삼위일체 하나님’께 고정하는 찬양 초청</li>
              <li>다음 곡의 신학적 의미로 부드럽게 이어주는 브릿지 멘트</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 3대 금기 아코디언 */}
      <section className="section-block">
        <div className="section-heading">
          <div>
            <SectionLabel>THREE STRICT PROHIBITIONS</SectionLabel>
            <h2>
              인도자 멘트 시 절대 범해서는 안 되는
              <br />
              <em>3대 금기와 대안</em>
            </h2>
          </div>
          <div className="heading-note">
            01 / 03
            <br />
            <span>WARNING & ALTERNATIVES</span>
          </div>
        </div>
        <p className="prohibition-note">
          ※ 주의: 3주차에서 배운 음악적 전환 테크닉은 회중의 집중을 돕는 도구일 뿐, 그 자체가 은혜를 만들어내지 않습니다.
          멘트에서 다음 3가지를 범하는 것은 단순한 실수가 아니라 <strong>영적 월권</strong>입니다.
        </p>

        <div className="rules-list">
          {weekFourRules.map((rule, index) => {
            const Icon = rule.icon;
            const isOpen = openRule === index;
            return (
              <article key={rule.title} className={`rule-card ${isOpen ? "open" : ""}`}>
                <button
                  onClick={() => setOpenRule(isOpen ? null : index)}
                  className="rule-head"
                  aria-expanded={isOpen}
                >
                  <span className="rule-number">0{index + 1}</span>
                  <span className="rule-title-copy">
                    <strong>{rule.title}</strong>
                    <small>{rule.short}</small>
                  </span>
                  <Icon size={20} className="rule-icon" />
                </button>
                {isOpen && (
                  <div className="rule-body">
                    <div className="hazard">
                      <span className="badge danger-badge">금지된 행동 (HAZARD)</span>
                      <p>{rule.hazard}</p>
                    </div>
                    <div className="alternative">
                      <span className="badge good-badge">올바른 대안 (ALTERNATIVE)</span>
                      <p>{rule.alternative}</p>
                    </div>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </section>

      {/* 리허설 전 필수 10분 디보션 */}
      <section className="section-block devotion-section">
        <div className="section-intro">
          <SectionLabel>BEFORE THE REHEARSAL</SectionLabel>
          <h2>
            악보보다 먼저,
            <br />
            <em>10분 디보션(Devotion) 필수</em>
          </h2>
          <p>
            개혁주의 찬양팀의 본질은 <strong>모임 → 디보션(10분) → 영적 연합 → 합주</strong>입니다.
            악보부터 맞추지 마십시오. 오늘 콘티에 담긴 구속사의 서사와 신학적 메시지를 팀원들과 먼저 나누고,
            하나 된 영적 고백 위에서 연주를 시작해야 합니다.
          </p>
        </div>

        <div className="devotion-comparison">
          <div className="devotion-path bad-path">
            <span className="path-tag">잘못된 관행</span>
            <div className="steps-row">
              <div className="step-box">모임 (Gather)</div>
              <span>→</span>
              <div className="step-box">악보 펴기 (Sheet)</div>
              <span>→</span>
              <div className="step-box">기계적 합주 (Play)</div>
            </div>
            <small>영적 고백 없이 연주되는 음악은 울리는 꽹과리에 불과합니다.</small>
          </div>

          <div className="devotion-path good-path">
            <span className="path-tag good">개혁주의 찬양팀의 본질</span>
            <div className="steps-row">
              <div className="step-box active">모임 (Gather)</div>
              <span>→</span>
              <div className="step-box active highlight">디보션 (10 min 콘티 나눔)</div>
              <span>→</span>
              <div className="step-box active">영적 연합 (Unity)</div>
              <span>→</span>
              <div className="step-box active">은혜로운 합주 (Rehearsal)</div>
            </div>
            <small>메시지에 대한 동의와 한마음 기도가 합주보다 우선합니다.</small>
          </div>
        </div>
      </section>

      {/* 1분 멘트 실전 자가 진단 및 파송 미션 */}
      <section className="final-mission">
        <div className="mission-icon">
          <PenLine size={28} />
        </div>
        <SectionLabel light>FINAL MISSION / SOLI DEO GLORIA</SectionLabel>
        <h2>
          고등부 예배를 살릴
          <br />
          <em>하나님의 청지기로 파송됩니다.</em>
        </h2>
        <p className="mission-lead">
          4주 과정을 마친 여러분이 바로 다음 세대 고등부 예배를 거룩하게 지킬 말씀의 청지기입니다.
        </p>

        <div className="mission-checklist">
          <label className={`check-item ${checks.timeUnder1Min ? "checked" : ""}`}>
            <input type="checkbox" checked={checks.timeUnder1Min} onChange={() => toggleCheck("timeUnder1Min")} />
            <span>01. 1분 이내 분량의 간결하고 절제된 멘트 원고 작성 (A4 1/2페이지 내외)</span>
          </label>
          <label className={`check-item ${checks.noGossip ? "checked" : ""}`}>
            <input type="checkbox" checked={checks.noGossip} onChange={() => toggleCheck("noGossip")} />
            <span>02. 사생활 나눔과 감성적 수다 전면 배제, 하나님께 시선을 돌리는 언어 사용</span>
          </label>
          <label className={`check-item ${checks.hasScripture ? "checked" : ""}`}>
            <input type="checkbox" checked={checks.hasScripture} onChange={() => toggleCheck("hasScripture")} />
            <span>03. 개역개정 성경 본문(이사야 6장 또는 로마서 3장 등)의 명확하고 담백한 선포</span>
          </label>
          <label className={`check-item ${checks.isBridge ? "checked" : ""}`}>
            <input type="checkbox" checked={checks.isBridge} onChange={() => toggleCheck("isBridge")} />
            <span>04. 특정 곡(예: 구속의 찬양)으로 매끄럽게 넘어가는 신학적 브릿지 역할 수행</span>
          </label>
          <label className={`check-item ${checks.simulationDone ? "checked" : ""}`}>
            <input type="checkbox" checked={checks.simulationDone} onChange={() => toggleCheck("simulationDone")} />
            <span>05. 다음 주 모임에서 팀원들과 교역자 앞에서 실전 멘트 시뮬레이션 진행</span>
          </label>
        </div>

        <div className="soli">
          Soli Deo Gloria
          <small>모든 영광을 오직 하나님께</small>
        </div>
      </section>

      <SlideGallery weekId={4} totalPages={10} />
    </>
  );
}

/* =========================================================================
   MAIN APP SHELL & TOPBAR
   ========================================================================= */
export default function Home() {
  const [activeWeek, setActiveWeek] = useState<WeekId>(1);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const active = useMemo(
    () => weeks.find((week) => week.id === activeWeek) ?? weeks[0],
    [activeWeek]
  );
  const ActiveIcon = active.icon;

  const handleWeekChange = (id: WeekId) => {
    setActiveWeek(id);
    setIsDrawerOpen(false);
    document.getElementById("curriculum")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToCurriculum = () => {
    document.getElementById("curriculum")?.scrollIntoView({ behavior: "smooth" });
  };

  // Close drawer on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsDrawerOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className={`site-shell week-${activeWeek}`}>
      {/* 모바일 슬라이드아웃 드로어 */}
      <div className={`drawer-overlay ${isDrawerOpen ? "open" : ""}`} onClick={() => setIsDrawerOpen(false)}>
        <aside className="mobile-drawer" onClick={(e) => e.stopPropagation()}>
          <div className="drawer-header">
            <div className="drawer-brand">
              <span className="brand-badge">I / J</span>
              <div>
                <strong>INDOJAVIDER</strong>
                <small>인도자 교육 아카이브</small>
              </div>
            </div>
            <button className="drawer-close-btn" onClick={() => setIsDrawerOpen(false)} aria-label="메뉴 닫기">
              <X size={22} />
            </button>
          </div>

          <div className="drawer-nav">
            <span className="drawer-section-title">4주 교육 커리큘럼</span>
            {weeks.map((w) => {
              const Icon = w.icon;
              const isCurrent = activeWeek === w.id;
              return (
                <button
                  key={w.id}
                  className={`drawer-item ${isCurrent ? "active" : ""}`}
                  onClick={() => handleWeekChange(w.id)}
                >
                  <span className="drawer-no">0{w.id}</span>
                  <div className="drawer-copy">
                    <small>{w.eyebrow.split("·")[1]}</small>
                    <strong>{w.title}</strong>
                  </div>
                  <Icon size={18} />
                </button>
              );
            })}
          </div>

          <div className="drawer-footer">
            <p>고등부 찬양 인도자 양성 교육</p>
            <small>Soli Deo Gloria</small>
          </div>
        </aside>
      </div>

      {/* 헤더 상단바 */}
      <header className="topbar">
        <button className="brand" onClick={() => handleWeekChange(1)} aria-label="홈으로">
          <span className="brand-logo-mark">†</span>
          <span>
            <strong>INDOJAVIDER</strong>
            <small>인도자 교육 아카이브</small>
          </span>
        </button>
        <div className="topbar-meta">
          <span>HIGH SCHOOL WORSHIP LEADER TRAINING</span>
          <span className="meta-divider">/</span>
          <span>4-WEEK CURRICULUM ARCHIVE</span>
        </div>
        <button
          className="mobile-menu"
          onClick={() => setIsDrawerOpen(true)}
          aria-label="모바일 목차 열기"
          aria-expanded={isDrawerOpen}
        >
          <Menu size={22} />
        </button>
      </header>

      {/* 메인 레이아웃 */}
      <main className="layout">
        <aside className="desktop-sidebar">
          <nav className="week-nav" aria-label="주차별 교육 목차">
            <div className="nav-kicker">THE WORSHIP LEADER ARCHIVE</div>
            <div className="nav-title">
              인도자
              <br />
              <em>교육</em>
            </div>
            <div className="nav-rule" />
            <div className="nav-caption">4주간의 거룩한 여정</div>
            <div className="week-links">
              {weeks.map((week) => {
                const Icon = week.icon;
                const isCurrent = activeWeek === week.id;
                return (
                  <button
                    key={week.id}
                    className={`week-link ${isCurrent ? "active" : ""}`}
                    onClick={() => handleWeekChange(week.id)}
                  >
                    <span className="week-no">0{week.id}</span>
                    <span className="week-link-copy">
                      <small>{week.eyebrow.split("·")[1]}</small>
                      <strong>{week.title}</strong>
                    </span>
                    <Icon size={16} />
                  </button>
                );
              })}
            </div>
            <div className="nav-footer">
              <span className="footer-mark">I / J</span>
              <span>
                성경적 찬양 인도자
                <br />
                양성 교육 아카이브
              </span>
            </div>
          </nav>
        </aside>

        <div className="content">
          {/* 히어로 섹션 */}
          <section className={`hero hero-${activeWeek}`}>
            <div className="hero-copy">
              <div className="hero-kicker">
                <span className="hero-index">0{active.id}</span>
                <span>{active.eyebrow}</span>
              </div>
              <h1>{active.title}</h1>
              <p className="hero-subtitle">{active.subtitle}</p>
              <div className="hero-thesis">
                <span className="thesis-mark">“</span>
                <p>{active.thesis}</p>
              </div>
              <button className="hero-cta" onClick={scrollToCurriculum}>
                {active.id}주차 교육 과정 펼쳐보기 <ArrowDown size={17} />
              </button>
            </div>
            <div className="hero-blueprint-badge">
              <div className="badge-grid" />
              <div className="badge-corner tl" />
              <div className="badge-corner tr" />
              <div className="badge-corner bl" />
              <div className="badge-corner br" />
              <div className="badge-content">
                <span className="badge-no">MODULE 0{active.id}</span>
                <strong>{active.eyebrow.split("·")[1]}</strong>
                <small>TOTAL {active.pageCount} SLIDES</small>
              </div>
            </div>
          </section>

          {/* 통합 주차 탭 네비게이션 (데스크톱 & 모바일) */}
          <nav className="week-tab-bar" role="tablist" aria-label="주차 선택">
            {weeks.map((week) => {
              const Icon = week.icon;
              const isCurrent = activeWeek === week.id;
              return (
                <button
                  key={week.id}
                  role="tab"
                  aria-selected={isCurrent}
                  className={`week-tab-btn ${isCurrent ? "active" : ""}`}
                  onClick={() => handleWeekChange(week.id)}
                >
                  <span className="tab-number">0{week.id}</span>
                  <div className="tab-text-group">
                    <strong className="tab-title">0{week.id}주차</strong>
                    <span className="tab-keyword">{week.eyebrow.split("·")[1]?.trim()}</span>
                  </div>
                  <Icon size={16} className="tab-icon" />
                </button>
              );
            })}
          </nav>

          {/* 주차별 커리큘럼 본문 */}
          <div id="curriculum" className="curriculum">
            <div className="curriculum-header-bar">
              <div className="mobile-current">
                <ActiveIcon size={16} />
                <span>
                  0{active.id}주차 · <strong>{active.title}</strong>
                </span>
              </div>
              <span className="slide-count-tag">총 {active.pageCount}개 슬라이드 완비</span>
            </div>

            {activeWeek === 1 && <WeekOne />}
            {activeWeek === 2 && <WeekTwo />}
            {activeWeek === 3 && <WeekThree />}
            {activeWeek === 4 && <WeekFour />}
          </div>
        </div>
      </main>

      {/* 사이트 푸터 */}
      <footer className="site-footer">
        <div className="footer-left">
          <strong>INDOJAVIDER</strong>
          <span> / 고등부 찬양 인도자 양성 교육 아카이브</span>
        </div>
        <div className="footer-right">
          <span>모든 영광을 하나님께</span>
          <b>·</b>
          <strong>SOLI DEO GLORIA</strong>
        </div>
      </footer>
    </div>
  );
}
