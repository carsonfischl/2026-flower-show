"use client";

import { useState } from "react";

/* ─────────────────────────── TYPES ─────────────────────────── */

interface ClassEntry { num: string; name: string; qty: string; }
interface SubSection { id: string; title: string; note?: string; classes: ClassEntry[]; }
interface Division   { id: string; title: string; color: string; note?: string; prereg?: boolean; sections: SubSection[]; }

/* ─────────────────────────── DATA ─────────────────────────── */

const schedule = [
  {
    day: "Saturday, June 13",
    events: [
      { time: "7:00 – 10:30 am", desc: "Placement of Entries by Exhibitors – Foyer, Hallway, Turtle Room and Minto Room" },
      { time: "11:00 am",        desc: "Judging Commences" },
      { time: "1:00 – 4:00 pm", desc: "Show Open to the Public · Youth Activity in Marianne's Youth Room" },
      { time: "1:15 pm",        desc: "Opening Ceremonies – Foyer · Host: Gay MacQuarrie, Show Chair" },
      { time: "3:30 pm",        desc: "Awards Presentation · Free Draw: 4 Tickets to an Atletico Ottawa 2026 Season Game" },
      { time: "4:00 pm",        desc: "Show Closes" },
      { time: "4:00 – 5:00 pm", desc: "Removal of Exhibits" },
    ],
  },
];

const divisions: Division[] = [
  {
    id: "I",
    title: "Division I – Horticulture",
    color: "#3a7d44",
    note: "Max 2 entries per class (different cultivars) in Sections A–D & F. Section E: 1 entry only. All specimens must be grown by the exhibitor. Special Award – highest aggregate points Sections A–C: $100 gift cert (Ritchie Feed & Seed). Best in Show – Horticulture: $50 planter (Canadian Tire Kanata).",
    sections: [
      {
        id: "I-A",
        title: "Section A – Annuals & Biennials",
        classes: [
          { num: "1",  name: "Cosmos, 1 cultivar",                                           qty: "3 stems" },
          { num: "2",  name: "Geranium – Annual (Pelargonium), any colour",                   qty: "1 stem" },
          { num: "3",  name: "Marigold (Tagetes), double, 1 cultivar",                        qty: "3 stems with foliage" },
          { num: "4",  name: "Marigold (Tagetes), single, 1 cultivar",                        qty: "3 stems with foliage" },
          { num: "5",  name: "Pansy, large-flowered, 1 cultivar, foliage attached",           qty: "3 stems" },
          { num: "6",  name: "Salvia, 1 cultivar",                                            qty: "3 stems" },
          { num: "7",  name: "Annual/Biennial, A.O.C. not listed above, named",               qty: "3 blooms" },
          { num: "8",  name: "Annual/Biennial, A.O.C. not listed above, named",               qty: "3 stems" },
          { num: "9",  name: "Annual/Biennial, A.O.C. not listed above, named",               qty: "3 spikes or sprays" },
          { num: "10", name: "Collection of floral annuals and/or biennials – min. 5 different cultivars, 1 stem/spike/spray each in one container, named on index card", qty: "5+ items" },
        ],
      },
      {
        id: "I-B",
        title: "Section B – Spring Bulbs & Tubers",
        classes: [
          { num: "11", name: "Allium, 1 cultivar",                                           qty: "3 stems" },
          { num: "12", name: "Asiatic Lily (Lilium auratum) – keep at least 1/3 of stem on plant when cutting", qty: "1 stem" },
          { num: "13", name: "Any other spring bulb or tuber not listed above",               qty: "1 stem" },
        ],
      },
      {
        id: "I-C",
        title: "Section C – Perennials",
        classes: [
          { num: "14", name: "Anemone, Japanese (Anemone hupehensis), any colour",            qty: "1 stem" },
          { num: "15", name: "Clematis, flowering vine, max 61 cm from top of container",    qty: "1 stem" },
          { num: "16", name: "Columbine (Aquilegia)",                                         qty: "1 stem" },
          { num: "17", name: "Coral Bells (Heuchera), 1 cultivar",                            qty: "3 stems" },
          { num: "18", name: "Coral Bells (Heuchera), 1 cultivar",                            qty: "3 leaves" },
          { num: "19", name: "Delphinium",                                                    qty: "1 spike" },
          { num: "20", name: "Hosta, small-leaved (39 – <193 sq.cm), 1 cultivar",            qty: "3 leaves" },
          { num: "21", name: "Hosta, large-leaved (413 – <774 sq.cm), solid colour, 1 cultivar", qty: "3 leaves" },
          { num: "22", name: "Hosta, large-leaved (413 – <774 sq.cm), variegated, 1 cultivar",   qty: "3 leaves" },
          { num: "23", name: "Hosta collection – min. 5 different cultivars in one container", qty: "5+" },
          { num: "24", name: "Iris, Bearded – white, cream, or yellow self-colour",           qty: "1 stalk" },
          { num: "25", name: "Iris, Bearded – pink or red self-colour",                       qty: "1 stalk" },
          { num: "26", name: "Iris, Bearded – orange or bronze self-colour",                  qty: "1 stalk" },
          { num: "27", name: "Iris, Bearded – lavender or light blue self-colour",            qty: "1 stalk" },
          { num: "28", name: "Iris, Bearded – purple or black self-colour",                   qty: "1 stalk" },
          { num: "29", name: "Iris, Bearded – bi-colour (standards and falls are contrasting colours)", qty: "1 stalk" },
          { num: "30", name: "Iris, Bearded – bi-tone (standards and falls differ in tone of same colour)", qty: "1 stalk" },
          { num: "31", name: "Iris, Siberian, 1 cultivar",                                    qty: "3 stalks" },
          { num: "32", name: "Iris, A.O.C. or colour not listed above",                       qty: "1 stalk" },
          { num: "33", name: "Lupin (Lupinus)",                                               qty: "1 stem" },
          { num: "34", name: "Poppy, Oriental (Papaver orientale)",                           qty: "1 stem" },
          { num: "35", name: "Peony (Paeonia), single – Japanese or Anemone, any colour (remove side buds and all but uppermost leaves)", qty: "1 bloom" },
          { num: "36", name: "Peony (Paeonia), semi-double, any colour",                      qty: "1 bloom" },
          { num: "37", name: "Peony (Paeonia), double, red",                                  qty: "1 bloom" },
          { num: "38", name: "Peony (Paeonia), double, white",                                qty: "1 bloom" },
          { num: "39", name: "Peony (Paeonia), double, pink",                                 qty: "1 bloom" },
          { num: "40", name: "Peony (Paeonia), Tree",                                         qty: "1 bloom" },
          { num: "41", name: "Peony (Paeonia), A.O.C. not listed above",                      qty: "1 bloom" },
          { num: "42", name: "Viola (small-flowered), 1 cultivar, foliage attached",          qty: "3 stems" },
          { num: "43", name: "Perennial, A.O.C. not listed above, named",                     qty: "1 stem, bloom or spray" },
          { num: "44", name: "Collection of floral perennials – min. 5 different cultivars, 1 stem/spike/spray each in one container, named on index card", qty: "5+ items" },
        ],
      },
      {
        id: "I-D",
        title: "Section D – Roses & Shrubs",
        note: "Exhibition bloom should be 1/2 to 3/4 open when viewed from the top. Please try to name your specimen. Special Awards: Best in Show – Rose ($50, Anne Harbord); Best in Show – Collection of Roses ($100 gift cert, Artistic Landscape Designs LTD).",
        classes: [
          { num: "45", name: "Rose (Rosa), Hybrid Tea, any cultivar, disbudded",              qty: "1 specimen bloom" },
          { num: "46", name: "Rose (Rosa), Grandiflora, any cultivar",                        qty: "1 spray" },
          { num: "47", name: "Rose (Rosa), Floribunda, any cultivar",                         qty: "1 spray" },
          { num: "48", name: "Rose (Rosa), Modern Shrub, any cultivar",                       qty: "1 spray" },
          { num: "49", name: "Rose (Rosa), Canadian (Explorer, Morden, Parkland, etc.)",      qty: "1 bloom or spray" },
          { num: "50", name: "Rose (Rosa), Miniature",                                        qty: "1 bloom or spray" },
          { num: "51", name: "Rose (Rosa), selected for fragrance",                           qty: "1 bloom" },
          { num: "52", name: "Rose (Rosa), floating in a clear bowl, no foliage",             qty: "1 bloom" },
          { num: "53", name: "Rose (Rosa), A.O.C. not listed above",                          qty: "1 bloom or spray" },
          { num: "54", name: "Collection of Roses – min. 5 different cultivars in one container", qty: "5+" },
          { num: "55", name: "Branch of a flowering shrub or tree, max 61 cm from top of container, named", qty: "1 branch" },
        ],
      },
      {
        id: "I-E",
        title: "Section E – Houseplants",
        note: "One entry per exhibitor only. Must have been in the exhibitor's care for at least 3 months. Max pot size: 25.4 cm (10 in) in any direction. No cache-pots. Pot should be clean; earth surface free of debris. Special Award – Best in Show: $50 planter (Canadian Tire Kanata).",
        classes: [
          { num: "56", name: "Indoor plant grown for bloom (in bloom), named",                qty: "1 pot" },
          { num: "57", name: "Indoor plant grown for foliage, named",                         qty: "1 pot" },
          { num: "58", name: "Any Cactus",                                                    qty: "1 pot" },
          { num: "59", name: "Any Succulent, other than a Cactus",                            qty: "1 specimen" },
        ],
      },
      {
        id: "I-F",
        title: "Section F – Edibles",
        note: "Fruit and vegetable specimens displayed on a white paper plate (supplied). Special Award – most aggregate points: $50 gift cert (Sunset Nursery, Pembroke).",
        classes: [
          { num: "60", name: "Leafy Greens – min. 3 different cultivars, 1 stem each in one container, named", qty: "3+" },
          { num: "61", name: "Micro Greens growing in a jar, 1 cultivar, named",               qty: "1 cultivar" },
          { num: "62", name: "Any other vegetable (incl. Rhubarb), 1 cultivar, representative sample on white plate, named", qty: "Refer to OJES" },
          { num: "63", name: "Any fruit, incl. berries, 1 cultivar, representative sample on white plate, named", qty: "Refer to OJES" },
          { num: "64", name: "Collection of edible herbs and/or flowers – min. 5 different cultivars in one container, named on index card", qty: "5+" },
        ],
      },
    ],
  },

  {
    id: "II",
    title: "Division II – Design",
    color: "#c0392b",
    prereg: true,
    note: "Theme: World Cup Comes to Canada! PRE-REGISTRATION required by May 22, 2026 – contact Linda Bartlett (lmbartlett62@gmail.com). Max 6 entries per class; classes with fewer than 3 registrants may be removed. Table space: 61 cm x 76 cm, black niche & tablecloth. Special Awards: Best in Show ($100 gift cert, Black Sheep Perennials); Judge's Choice ($50 gift cert, Sunset Nursery).",
    sections: [
      {
        id: "II-main",
        title: "Design Classes (65–74)",
        classes: [
          { num: "65",  name: "\"Rise to the Occasion\" – Tall design, max height 122 cm (48 in), staged on oval floor platform (99x71x23 cm, painted dark blue). Accessories permitted.", qty: "1 entry" },
          { num: "66",  name: "\"The Whistle\" – Miniature Design staged on a provided black cube (12.7x12.7x15.2 cm)", qty: "1 entry" },
          { num: "67",  name: "\"Offside\" – Decorative Parallel Design",                     qty: "1 entry" },
          { num: "68",  name: "\"Penalty Kick\" – Design showing motion",                     qty: "1 entry" },
          { num: "69",  name: "\"Frenzied Fans\" – Design of your choosing",                  qty: "1 entry" },
          { num: "70",  name: "\"World Cup\" – Design incorporating metal",                   qty: "1 entry" },
          { num: "71",  name: "\"Team Jersey\" – Design where red and white predominate",     qty: "1 entry" },
          { num: "72",  name: "\"The Crowd Wave\" – Pave Design",                            qty: "1 entry" },
          { num: "73",  name: "\"The Goalie Box\" – Modern Design",                          qty: "1 entry" },
          { num: "74a", name: "\"Referee\" – Duo Design, side one (6 entries total across 74a & 74b; each side judged separately)", qty: "1 entry" },
          { num: "74b", name: "\"Goalie\" – Duo Design, side two",                           qty: "1 entry" },
        ],
      },
    ],
  },

  {
    id: "III",
    title: "Division III – Special Exhibits",
    color: "#8e44ad",
    prereg: true,
    note: "Theme: Canadian Gardens. PRE-REGISTRATION required by May 22, 2026 – contact Linda Bartlett (lmbartlett62@gmail.com). Max 6 entries per class. Table space: 61 cm x 76 cm, black tablecloth, beige wall. Plants should have similar cultural requirements; include an index card with common/botanical names. Special Awards: Best in Show ($100 gift cert, Artistic Landscape Designs LTD); Judge's Choice ($100 gift cert, Black Sheep Perennials).",
    sections: [
      {
        id: "III-main",
        title: "Special Exhibit Classes (75–78)",
        classes: [
          { num: "75", name: "\"Burnt Lands Alvar\" – A Dish Garden",                        qty: "1 entry" },
          { num: "76", name: "\"Tulip Festival\" – A Spring Planter",                        qty: "1 entry" },
          { num: "77", name: "\"A Soccer Game\" – A Fairy Garden",                           qty: "1 entry" },
          { num: "78", name: "\"Experimental Farm Greenhouses\" – A Terrarium",              qty: "1 entry" },
        ],
      },
    ],
  },

  {
    id: "IV",
    title: "Division IV – Open Classes (Youth 12 & Under)",
    color: "#e67e22",
    note: "Open to any youth 12 or younger residing in District 2. Plant material must be grown by the exhibitor (except Class 83). Special Award – Best in Show: Lego Happy Plants ($25, donated by CF Solutions, Ottawa).",
    sections: [
      {
        id: "IV-main",
        title: "Youth Classes (79–83)",
        classes: [
          { num: "79", name: "Any annual or biennial flower, 1 cultivar, named",               qty: "2 stems, spikes or sprays" },
          { num: "80", name: "Any perennial, 1 cultivar, named",                               qty: "2 stems, spikes or sprays" },
          { num: "81", name: "Any fruit (incl. berries), 1 cultivar, on white plate, named",   qty: "3–5 specimens" },
          { num: "82", name: "Collection of edible herbs and/or flowers – min. 3 cultivars in one container, named on index card", qty: "3+" },
          { num: "83", name: "\"Let's Play!\" – Arrangement of flowers in a container or vase, max 30 cm in any direction. Material may be from any source.", qty: "1 entry" },
        ],
      },
    ],
  },

  {
    id: "V",
    title: "Division V – Open Classes (Adult Public)",
    color: "#2980b9",
    note: "Open to any member of the public or another OHA district – not professional florists. No monetary prizes. Hardcover horticulture/design books awarded for highest aggregate points per section (donated by Anne Harbord). Section D requires pre-registration by May 22.",
    sections: [
      {
        id: "V-A",
        title: "Section A – Horticulture",
        classes: [
          { num: "84", name: "Annual/Biennial, any cultivar",                                  qty: "1 stem, spray or stalk" },
          { num: "85", name: "Iris, any cultivar",                                             qty: "1 stalk with own foliage" },
          { num: "86", name: "Peony, any cultivar",                                            qty: "1 bloom" },
          { num: "87", name: "Rose, any cultivar",                                             qty: "1 bloom" },
          { num: "88", name: "Rose, any cultivar",                                             qty: "1 spray" },
          { num: "89", name: "Rose, grown for its fragrance",                                  qty: "1 stem" },
          { num: "90", name: "Rose, floating in a clear bowl, no foliage",                    qty: "1 open bloom" },
          { num: "91", name: "Perennial, any cultivar",                                        qty: "2 stems, spikes or sprays" },
          { num: "92", name: "Collection of herbs – min. 5 different cultivars, 1 stem each in one container", qty: "5+" },
        ],
      },
      {
        id: "V-B",
        title: "Section B – Houseplants",
        note: "Max pot size: 25.4 cm (10 in) in any direction. No cache-pots.",
        classes: [
          { num: "93", name: "House plant grown for foliage",                                  qty: "1 pot" },
          { num: "94", name: "A Cactus",                                                       qty: "1 pot" },
          { num: "95", name: "A Succulent, other than a Cactus",                              qty: "1 pot" },
          { num: "96", name: "An Orchid, any cultivar, any colour, in bloom",                 qty: "1 pot" },
          { num: "97", name: "An African Violet, one plant in bloom",                         qty: "1 pot" },
        ],
      },
      {
        id: "V-C",
        title: "Section C – Edibles",
        note: "Displayed on a white paper plate (provided).",
        classes: [
          { num: "98", name: "Onions, green, on a white plate",                               qty: "5 specimens" },
          { num: "99", name: "Strawberries, on a white plate",                                qty: "5 specimens" },
        ],
      },
      {
        id: "V-D",
        title: "Section D – Design (Soccer Theme)",
        note: "PRE-REGISTRATION required by May 22. Table space: 61 cm x 76 cm, white niche & fold-outs, black tablecloth. Winner of each class receives a hardcover floral design book; highest aggregate points wins a Lee Valley gift card ($30, donated by District 2).",
        classes: [
          { num: "100", name: "\"Starting Line-Up\" – A Decorative Parallel Design",          qty: "1 entry" },
          { num: "101", name: "\"Soccer Ball\" – A black and white design",                   qty: "1 entry" },
          { num: "102", name: "\"Red Card\" – A Small Design, max 25.4 cm (10 in) in any direction", qty: "1 entry" },
          { num: "103", name: "\"Team Bench\" – A design incorporating wood",                 qty: "1 entry" },
          { num: "104", name: "\"Playing Field\" – A design of your choosing",                qty: "1 entry" },
        ],
      },
    ],
  },
];

const prizes = [
  { cat: "Horticulture – 1st",            amt: "$5.00"  },
  { cat: "Horticulture – 2nd",            amt: "$3.00"  },
  { cat: "Horticulture – 3rd",            amt: "$2.00"  },
  { cat: "Design & Special – 1st",        amt: "$10.00" },
  { cat: "Design & Special – 2nd",        amt: "$7.00"  },
  { cat: "Design & Special – 3rd",        amt: "$5.00"  },
  { cat: "Judge's Choice – Horticulture", amt: "$10.00" },
  { cat: "Judge's Choice – Design",       amt: "$15.00" },
  { cat: "Judge's Choice – Special",      amt: "$15.00" },
];

const sponsors = [
  { name: "Atletico Ottawa", url: "https://www.cplsoccer.com/atleticoottawa" },
  { name: "Artistic Landscape Designs LTD", url: null },
  { name: "Black Sheep Perennials", url: "https://blacksheepperennials.com" },
  { name: "Canadian Tire Kanata", url: "https://www.canadiantire.ca" },
  { name: "CF Solutions, Ottawa", url: null },
  { name: "Anne Harbord / Garden Clubs of Ontario", url: "https://gardenclubsofontario.ca" },
  { name: "Councillor Cathy Curry, City of Ottawa", url: "https://ottawa.ca/en/city-hall/mayor-and-city-councillors/cathy-curry-councillor-ward-4-kanata-north" },
  { name: "Ritchie Feed & Seed Inc.", url: "https://www.ritchiefeed.com" },
  { name: "Sunset Nursery, Pembroke", url: "https://www.sunsetnursery.ca" },
];

/* ─────────────────────────── SUB-ACCORDION COMPONENT ─────────────────────────── */

function SubAccordion({
  section,
  color,
  open,
  onToggle,
}: {
  section: SubSection;
  color: string;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="sub-accordion">
      <button
        className={"sub-header" + (open ? " open" : "")}
        onClick={onToggle}
        aria-expanded={open}
        style={{ borderLeftColor: color }}
      >
        <span className="sub-title">{section.title}</span>
        <span className="sub-count">{section.classes.length} {section.classes.length === 1 ? "class" : "classes"}</span>
        <span className={"sub-chevron" + (open ? " open" : "")}>›</span>
      </button>

      {open && (
        <div className="sub-body">
          {section.note && <p className="sub-note">{section.note}</p>}
          <table className="classes-table">
            <thead>
              <tr>
                <th className="col-num">#</th>
                <th className="col-name">Class</th>
                <th className="col-qty">Quantity Required</th>
              </tr>
            </thead>
            <tbody>
              {section.classes.map((c) => (
                <tr key={c.num}>
                  <td className="col-num">
                    <span className="class-badge" style={{ background: color + "18", color }}>
                      {c.num}
                    </span>
                  </td>
                  <td className="col-name">{c.name}</td>
                  <td className="col-qty">{c.qty}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────── PAGE ─────────────────────────── */

export default function Home() {
  const [openDiv, setOpenDiv] = useState<string | null>(null);
  const [openSub, setOpenSub] = useState<string | null>(null);

  function toggleDiv(id: string) {
    if (openDiv === id) { setOpenDiv(null); setOpenSub(null); }
    else { setOpenDiv(id); setOpenSub(null); }
  }

  function toggleSub(id: string) {
    setOpenSub(openSub === id ? null : id);
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=Lato:wght@300;400;700&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --green-deep:  #1e4d2b;
          --green-mid:   #3a7d44;
          --green-light: #6aab74;
          --gold:        #c9a84c;
          --gold-light:  #e8d5a0;
          --cream:       #faf6ef;
          --dark:        #1a1a1a;
          --text:        #2c2c2c;
        }

        body { font-family: 'Lato', sans-serif; background: var(--cream); color: var(--text); overflow-x: hidden; }

        /* NAV */
        nav { position: fixed; top: 0; left: 0; right: 0; z-index: 100; background: rgba(30,77,43,0.92); backdrop-filter: blur(10px); border-bottom: 1px solid rgba(201,168,76,0.2); padding: 0.9rem 2rem; display: flex; align-items: center; justify-content: space-between; }
        .nav-logo { font-family: 'Playfair Display', serif; font-size: 1rem; font-weight: 700; color: var(--gold); }
        .nav-links { display: flex; gap: 1.8rem; list-style: none; }
        .nav-links a { font-size: 0.78rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(255,255,255,0.75); text-decoration: none; transition: color 0.2s; }
        .nav-links a:hover { color: var(--gold); }
        @media (max-width: 600px) { .nav-links { display: none; } }

        /* HERO */
        .hero { min-height: 100vh; background: var(--green-deep); display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 3rem 1.5rem; position: relative; overflow: hidden; }
        .hero::before { content: ''; position: absolute; inset: 0; background: radial-gradient(ellipse 70% 50% at 20% 30%, rgba(106,171,116,0.18) 0%, transparent 60%), radial-gradient(ellipse 50% 40% at 80% 70%, rgba(201,168,76,0.12) 0%, transparent 55%); pointer-events: none; }
        .hero-ring { position: absolute; border-radius: 50%; border: 1px solid rgba(201,168,76,0.15); pointer-events: none; animation: slowSpin 40s linear infinite; }
        .hero-ring:nth-child(1) { width: 600px; height: 600px; top: -150px; left: -150px; animation-direction: reverse; }
        .hero-ring:nth-child(2) { width: 800px; height: 800px; bottom: -200px; right: -200px; }
        .hero-ring:nth-child(3) { width: 400px; height: 400px; top: 50%; left: 50%; transform: translate(-50%,-50%); animation: floatCenter 40s ease-in-out infinite; }
        @keyframes slowSpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes floatCenter { 0%,100% { transform: translate(-50%,-50%) rotate(0deg) scale(1); } 50% { transform: translate(-50%,-50%) rotate(180deg) scale(1.03); } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
        .hero-badge { font-size: 0.7rem; font-weight: 700; letter-spacing: 0.25em; text-transform: uppercase; color: var(--gold); border: 1px solid rgba(201,168,76,0.4); padding: 0.35rem 1.2rem; border-radius: 2px; margin-bottom: 2rem; position: relative; z-index: 2; animation: fadeUp 0.8s ease both; }
        .hero-ordinal { font-family: 'Playfair Display', serif; font-size: clamp(1rem,3vw,1.4rem); color: var(--gold-light); font-style: italic; position: relative; z-index: 2; animation: fadeUp 0.9s 0.1s ease both; }
        .hero-title { font-family: 'Playfair Display', serif; font-size: clamp(2.8rem,8vw,6.5rem); font-weight: 900; line-height: 1; color: #fff; position: relative; z-index: 2; animation: fadeUp 1s 0.2s ease both; }
        .hero-title span { color: var(--gold); }
        .hero-subtitle { font-family: 'Playfair Display', serif; font-size: clamp(1rem,2.5vw,1.5rem); font-style: italic; color: var(--green-light); margin-top: 0.6rem; position: relative; z-index: 2; animation: fadeUp 1s 0.35s ease both; }
        .hero-theme { margin-top: 1.5rem; font-size: clamp(0.75rem,2vw,0.9rem); letter-spacing: 0.2em; text-transform: uppercase; color: var(--gold); position: relative; z-index: 2; animation: fadeUp 1s 0.45s ease both; }
        .hero-date-block { margin-top: 3rem; position: relative; z-index: 2; animation: fadeUp 1s 0.55s ease both; }
        .hero-date { font-family: 'Playfair Display', serif; font-size: clamp(1.8rem,5vw,3.2rem); font-weight: 700; color: #fff; }
        .hero-venue { font-size: 0.95rem; color: var(--green-light); margin-top: 0.4rem; }
        .hero-cta { margin-top: 2.5rem; display: inline-flex; gap: 1rem; flex-wrap: wrap; justify-content: center; position: relative; z-index: 2; animation: fadeUp 1s 0.7s ease both; }
        .btn { display: inline-block; padding: 0.8rem 2rem; font-size: 0.85rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; text-decoration: none; border-radius: 2px; cursor: pointer; transition: all 0.25s; }
        .btn-primary { background: var(--gold); color: var(--dark); border: 2px solid var(--gold); }
        .btn-primary:hover { background: var(--gold-light); transform: translateY(-2px); }
        .btn-outline { background: transparent; color: #fff; border: 2px solid rgba(255,255,255,0.5); }
        .btn-outline:hover { border-color: #fff; transform: translateY(-2px); }

        /* GENERIC */
        section { padding: 5rem 1.5rem; }
        .scroll-top { padding-top: 80px; }
        .container { max-width: 1100px; margin: 0 auto; }
        .section-label { font-size: 0.7rem; font-weight: 700; letter-spacing: 0.25em; text-transform: uppercase; color: var(--green-mid); margin-bottom: 0.6rem; }
        .section-title { font-family: 'Playfair Display', serif; font-size: clamp(1.8rem,4vw,2.8rem); font-weight: 700; color: var(--green-deep); line-height: 1.15; }
        .section-title-light { color: #fff; }

        /* ABOUT */
        .about-strip { background: #fff; border-top: 4px solid var(--green-mid); }
        .about-grid { display: grid; grid-template-columns: 1fr 1px 1fr 1px 1fr; gap: 0; margin-top: 3rem; }
        .about-sep { background: var(--gold-light); }
        .about-item { padding: 0 2.5rem; text-align: center; }
        .about-item:first-child { padding-left: 0; }
        .about-item:last-child { padding-right: 0; }
        .about-icon { font-size: 2.5rem; margin-bottom: 0.8rem; }
        .about-item h3 { font-family: 'Playfair Display', serif; font-size: 1.1rem; font-weight: 700; color: var(--green-deep); margin-bottom: 0.4rem; }
        .about-item p { font-size: 0.88rem; line-height: 1.6; color: #555; }
        @media (max-width: 700px) { .about-grid { grid-template-columns: 1fr; gap: 2rem; } .about-sep { display: none; } .about-item { padding: 0; } }

        /* SCHEDULE */
        .schedule-section { background: var(--green-deep); }
        .schedule-day { margin-top: 2.5rem; }
        .schedule-day-label { font-family: 'Playfair Display', serif; font-size: 1.2rem; font-weight: 700; font-style: italic; color: var(--gold); border-bottom: 1px solid rgba(201,168,76,0.3); padding-bottom: 0.5rem; margin-bottom: 1rem; }
        .schedule-row { display: grid; grid-template-columns: 160px 1fr; gap: 1rem; padding: 0.8rem 0; border-bottom: 1px solid rgba(255,255,255,0.07); align-items: start; }
        .schedule-time { font-size: 0.82rem; font-weight: 700; color: var(--gold-light); }
        .schedule-desc { font-size: 0.92rem; color: rgba(255,255,255,0.8); line-height: 1.5; }
        @media (max-width: 550px) { .schedule-row { grid-template-columns: 1fr; gap: 0.2rem; } }
        .reg-note { background: rgba(201,168,76,0.1); border: 1px solid rgba(201,168,76,0.4); border-radius: 4px; padding: 1rem 1.4rem; margin-top: 2rem; font-size: 0.88rem; color: rgba(255,255,255,0.85); line-height: 1.6; }
        .reg-note strong { color: var(--gold-light); }

        /* DIVISIONS – outer */
        .divisions-section { background: var(--cream); }
        .divisions-grid { margin-top: 3rem; display: flex; flex-direction: column; gap: 1.2rem; }
        .division-card { background: #fff; border-radius: 6px; border-left: 5px solid var(--green-mid); overflow: hidden; box-shadow: 0 2px 12px rgba(0,0,0,0.06); }
        .division-header { display: flex; align-items: center; justify-content: space-between; padding: 1.1rem 1.4rem; cursor: pointer; user-select: none; transition: background 0.2s; }
        .division-header:hover { background: rgba(0,0,0,0.02); }
        .division-header-left { display: flex; align-items: center; gap: 0.9rem; }
        .division-num { width: 2.2rem; height: 2.2rem; border-radius: 50%; color: #fff; display: flex; align-items: center; justify-content: center; font-family: 'Playfair Display', serif; font-size: 0.9rem; font-weight: 700; flex-shrink: 0; }
        .division-name { font-family: 'Playfair Display', serif; font-size: 1.05rem; font-weight: 700; color: var(--green-deep); }
        .division-meta { display: flex; align-items: center; gap: 0.7rem; }
        .prereg-badge { font-size: 0.65rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; background: #fde8e8; color: #c0392b; border: 1px solid #f5c6c6; border-radius: 3px; padding: 0.15rem 0.5rem; white-space: nowrap; }
        .division-chevron { font-size: 0.85rem; color: #aaa; transition: transform 0.3s ease; }
        .division-chevron.open { transform: rotate(180deg); }

        .division-inner { overflow: hidden; }
        .division-note { margin: 0 1.4rem; padding: 0.75rem 1rem; background: #f9f5ed; border-left: 3px solid var(--gold); border-radius: 0 3px 3px 0; font-size: 0.81rem; color: #7a6840; line-height: 1.55; }
        .division-sections { padding: 0.8rem 1rem 1rem; display: flex; flex-direction: column; gap: 0.5rem; }

        /* SUB-ACCORDION */
        .sub-accordion { border: 1px solid #e8e8e8; border-radius: 4px; overflow: hidden; }
        .sub-header { width: 100%; display: flex; align-items: center; gap: 0.75rem; padding: 0.7rem 1rem; background: #f8f8f8; border: none; border-left: 3px solid transparent; cursor: pointer; text-align: left; transition: background 0.15s; }
        .sub-header:hover { background: #f2f2f2; }
        .sub-header.open { background: #f0f7f1; }
        .sub-title { flex: 1; font-size: 0.88rem; font-weight: 700; color: var(--green-deep); }
        .sub-count { font-size: 0.72rem; font-weight: 600; color: #bbb; white-space: nowrap; }
        .sub-chevron { font-size: 1.1rem; color: #ccc; transition: transform 0.2s ease; display: inline-block; line-height: 1; }
        .sub-chevron.open { transform: rotate(90deg); color: #888; }

        .sub-body { border-top: 1px solid #eee; }
        .sub-note { margin: 0.7rem 0.9rem 0; padding: 0.55rem 0.8rem; background: #fffbf0; border-left: 3px solid var(--gold); font-size: 0.78rem; color: #8a7040; line-height: 1.5; border-radius: 0 3px 3px 0; }

        /* CLASS TABLE */
        .classes-table { width: 100%; border-collapse: collapse; font-size: 0.82rem; }
        .classes-table thead tr { background: #f5f5f5; }
        .classes-table th { padding: 0.4rem 0.75rem; text-align: left; font-size: 0.68rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #999; border-bottom: 1px solid #ebebeb; }
        .classes-table td { padding: 0.55rem 0.75rem; border-bottom: 1px solid #f2f2f2; vertical-align: top; color: #444; line-height: 1.45; }
        .classes-table tr:last-child td { border-bottom: none; }
        .classes-table tbody tr:hover td { background: #fafafa; }
        .col-num  { width: 56px; }
        .col-qty  { width: 160px; font-size: 0.78rem !important; color: #888 !important; }
        @media (max-width: 520px) { .col-qty, .classes-table th:last-child { display: none; } }
        .class-badge { display: inline-block; min-width: 2rem; padding: 0.12rem 0.35rem; border-radius: 3px; font-size: 0.73rem; font-weight: 700; text-align: center; }

        /* PRIZES */
        .prizes-section { background: var(--green-mid); }
        .prizes-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px,1fr)); gap: 1rem; margin-top: 3rem; }
        .prize-card { background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); border-radius: 4px; padding: 1.2rem 1.4rem; text-align: center; }
        .prize-amount { font-family: 'Playfair Display', serif; font-size: 2rem; font-weight: 900; color: var(--gold-light); }
        .prize-cat { font-size: 0.8rem; color: rgba(255,255,255,0.8); margin-top: 0.3rem; }

        /* ELIGIBILITY */
        .eligibility-section { background: #fff; }
        .elig-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px,1fr)); gap: 1.5rem; margin-top: 3rem; }
        .elig-card { border: 1.5px solid var(--gold-light); border-radius: 4px; padding: 1.5rem; }
        .elig-card h3 { font-family: 'Playfair Display', serif; font-size: 1rem; font-weight: 700; color: var(--green-deep); margin-bottom: 0.5rem; }
        .elig-card p { font-size: 0.87rem; line-height: 1.6; color: #555; }

        /* CONTACT */
        .contact-section { background: var(--green-deep); }
        .contact-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px,1fr)); gap: 1.5rem; margin-top: 3rem; }
        .contact-card { background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.12); border-radius: 4px; padding: 1.4rem; }
        .contact-role { font-size: 0.7rem; letter-spacing: 0.2em; text-transform: uppercase; color: var(--gold); margin-bottom: 0.4rem; }
        .contact-name { font-family: 'Playfair Display', serif; font-size: 1.05rem; color: #fff; margin-bottom: 0.3rem; }
        .contact-detail { font-size: 0.82rem; color: var(--green-light); line-height: 1.6; }

        /* SPONSORS */
        .sponsors-section { background: var(--cream); text-align: center; }
        .sponsors-list { display: flex; flex-wrap: wrap; gap: 0.7rem; justify-content: center; margin-top: 2.5rem; }
        .sponsor-pill { background: #fff; border: 1.5px solid var(--green-light); border-radius: 100px; padding: 0.4rem 1rem; font-size: 0.82rem; color: var(--green-deep); font-weight: 600; }

        /* FOOTER */
        footer { background: var(--dark); text-align: center; padding: 2rem 1.5rem; }
        footer p { font-size: 0.78rem; color: rgba(255,255,255,0.4); line-height: 1.8; }
        footer a { color: var(--gold); text-decoration: none; }
        footer a:hover { text-decoration: underline; }
      `}</style>

      {/* NAV */}
      <nav>
        <span className="nav-logo">🌸 OVG Flower Show 2026</span>
        <ul className="nav-links">
          <li><a href="#schedule">Schedule</a></li>
          <li><a href="#divisions">Classes</a></li>
          <li><a href="#prizes">Prizes</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>

      {/* HERO */}
      <div className="hero scroll-top" id="top">
        <div className="hero-ring" />
        <div className="hero-ring" />
        <div className="hero-ring" />
        <div className="hero-badge">Ottawa Valley Gardeners · District 2 · OHA</div>
        <div className="hero-ordinal">32nd Annual</div>
        <h1 className="hero-title">Flower &amp;<br /><span>Edibles</span><br />Show</h1>
        <p className="hero-subtitle">World Cup Comes to Canada!</p>
        <p className="hero-theme">⚽ &nbsp; 🌷 &nbsp; Eastern Ontario&apos;s Largest Flower Show &nbsp; 🌷 &nbsp; ⚽</p>
        <div className="hero-date-block">
          <div className="hero-date">June 13, 2026</div>
          <div className="hero-venue">Richcraft Recreation Complex – Kanata<br />4101 Innovation Drive, Kanata, ON</div>
        </div>
        <div className="hero-cta">
          <a href="https://2026-flower-show.vercel.app/2026_show_schedule.pdf" className="btn btn-primary">View Schedule</a>
          <a href="#divisions" className="btn btn-outline">Browse Classes</a>
        </div>
      </div>

      {/* ABOUT */}
      <section className="about-strip">
        <div className="container">
          <div className="section-label">About the Show</div>
          <div className="section-title">A Celebration of Gardeners &amp; Growing</div>
          <div className="about-grid">
            <div className="about-item">
              <div className="about-icon">🌿</div>
              <h3>Open to All</h3>
              <p>OHA District 2 members compete in horticulture &amp; design. Members of the public enter the Open Classes—no professional florists.</p>
            </div>
            <div className="about-sep" />
            <div className="about-item">
              <div className="about-icon">🏅</div>
              <h3>Prizes</h3>
              <p>Ribbons for 1st, 2nd, 3rd &amp; Honourable Mention in every class. Prize money from $2 up to $15, plus special sponsor awards.</p>
            </div>
            <div className="about-sep" />
            <div className="about-item">
              <div className="about-icon">⚽</div>
              <h3>World Cup Theme</h3>
              <p>This year&apos;s design theme celebrates the 2026 FIFA World Cup in Canada. Design classes are named after soccer moments.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SCHEDULE */}
      <section className="schedule-section" id="schedule">
        <div className="container">
          <div className="section-label" style={{ color: "var(--gold)" }}>June 13, 2026</div>
          <div className="section-title section-title-light">Schedule of Events</div>
          {schedule.map((day) => (
            <div className="schedule-day" key={day.day}>
              <div className="schedule-day-label">{day.day}</div>
              {day.events.map((e, i) => (
                <div className="schedule-row" key={i}>
                  <div className="schedule-time">{e.time}</div>
                  <div className="schedule-desc">{e.desc}</div>
                </div>
              ))}
            </div>
          ))}
          <div className="reg-note">
            <strong>Pre-registration required</strong> for Division II (Design), Division III (Special Exhibits), and Division V Section D (Adult Design).
            Contact registrar Linda Bartlett at{" "}
            <a href="mailto:lmbartlett62@gmail.com" style={{ color: "var(--gold-light)" }}>lmbartlett62@gmail.com</a>{" "}
            <strong>by May 22, 2026.</strong>
          </div>
        </div>
      </section>

      {/* DIVISIONS */}
      <section className="divisions-section" id="divisions">
        <div className="container">
          <div className="section-label">Show Classes</div>
          <div className="section-title">Divisions &amp; Sections</div>
          <div className="divisions-grid">
            {divisions.map((div) => (
              <div
                className="division-card"
                key={div.id}
                style={{ borderLeftColor: div.color }}
              >
                {/* outer header */}
                <div
                  className="division-header"
                  onClick={() => toggleDiv(div.id)}
                  role="button"
                  aria-expanded={openDiv === div.id}
                >
                  <div className="division-header-left">
                    <div className="division-num" style={{ background: div.color }}>{div.id}</div>
                    <div className="division-name">{div.title}</div>
                  </div>
                  <div className="division-meta">
                    {div.prereg && <span className="prereg-badge">Pre-reg required</span>}
                    <span className={"division-chevron" + (openDiv === div.id ? " open" : "")}>▼</span>
                  </div>
                </div>

                {/* outer body */}
                {openDiv === div.id && (
                  <div className="division-inner">
                    {div.note && <p className="division-note">{div.note}</p>}
                    <div className="division-sections">
                      {div.sections.map((sec) => (
                        <SubAccordion
                          key={sec.id}
                          section={sec}
                          color={div.color}
                          open={openSub === sec.id}
                          onToggle={() => toggleSub(sec.id)}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRIZES */}
      <section className="prizes-section" id="prizes">
        <div className="container">
          <div className="section-label" style={{ color: "var(--gold-light)", opacity: 0.8 }}>Awards</div>
          <div className="section-title section-title-light">Prize Money</div>
          <div className="prizes-grid">
            {prizes.map((p) => (
              <div className="prize-card" key={p.cat}>
                <div className="prize-amount">{p.amt}</div>
                <div className="prize-cat">{p.cat}</div>
              </div>
            ))}
          </div>
          <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.82rem", marginTop: "1.5rem" }}>
            Best in Show winners also receive a rosette &amp; special sponsor award. Points: 1st = 5 pts · 2nd = 3 pts · 3rd = 2 pts · HM = 1 pt · Best in Show = 10 pts.
          </p>
        </div>
      </section>

      {/* ELIGIBILITY */}
      <section className="eligibility-section" id="eligibility">
        <div className="container">
          <div className="section-label">Who Can Enter?</div>
          <div className="section-title">Eligibility</div>
          <div className="elig-grid">
            <div className="elig-card">
              <h3>🌺 Divisions I–III</h3>
              <p>Any adult who is a member in good standing with a District 2 Society of the Ontario Horticultural Association (OHA).</p>
            </div>
            <div className="elig-card">
              <h3>👦 Division IV – Youth</h3>
              <p>Youth 12 years of age or younger who currently reside within the boundaries of District 2.</p>
            </div>
            <div className="elig-card">
              <h3>🌻 Division V – Public Adult</h3>
              <p>Any member of the public or another OHA district, provided they are not a professional florist.</p>
            </div>
          </div>
          <p style={{ marginTop: "1.5rem", fontSize: "0.85rem", color: "#666" }}>
            All exhibitors must grow, or design with, plant material for pleasure. All work must be that of the exhibitor.
          </p>
        </div>
      </section>

      {/* CONTACT */}
      <section className="contact-section" id="contact">
        <div className="container">
          <div className="section-label" style={{ color: "var(--gold)" }}>Get in Touch</div>
          <div className="section-title section-title-light">Show Committee</div>
          <div className="contact-grid">
            <div className="contact-card">
              <div className="contact-role">Show Chair</div>
              <div className="contact-name">Gay MacQuarrie</div>
              <div className="contact-detail">
                <a href="mailto:gardens.gay@outlook.com" style={{ color: "var(--green-light)" }}>gardens.gay@outlook.com</a><br />613-266-4887
              </div>
            </div>
            <div className="contact-card">
              <div className="contact-role">Registrar – Design &amp; Special Exhibits</div>
              <div className="contact-name">Linda Bartlett</div>
              <div className="contact-detail">
                <a href="mailto:lmbartlett62@gmail.com" style={{ color: "var(--green-light)" }}>lmbartlett62@gmail.com</a><br />613-285-1117
              </div>
            </div>
            <div className="contact-card">
              <div className="contact-role">Convenor – Design</div>
              <div className="contact-name">Anne Harbord</div>
              <div className="contact-detail">613-850-8022<br />OJES books: <a href="mailto:leisurelodge316@gmail.com" style={{ color: "var(--green-light)" }}>leisurelodge316@gmail.com</a></div>
            </div>
            <div className="contact-card">
              <div className="contact-role">Clerks Coordinator</div>
              <div className="contact-name">Cindy Zorgel</div>
              <div className="contact-detail">
                <a href="mailto:zorgel@rogers.com" style={{ color: "var(--green-light)" }}>zorgel@rogers.com</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SPONSORS */}
      <section className="sponsors-section">
        <div className="container">
          <div className="section-label">Thank You</div>
          <div className="section-title">Our Sponsors</div>
          <div className="sponsors-list">
            {sponsors.map((s) => (
              <div className="sponsor-pill" key={s.name}>
                {s.url ? (
                  <a href={s.url} target="_blank" rel="noopener noreferrer" style={{ color: "var(--green-deep)", textDecoration: "none" }}>
                    {s.name}
                  </a>
                ) : (
                  s.name
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <p>
          <strong style={{ color: "rgba(255,255,255,0.7)" }}>32nd Annual Flower &amp; Edibles Show</strong><br />
          Ottawa Valley Gardeners · District 2 · Ontario Horticultural Association<br />
          Richcraft Recreation Complex · 4101 Innovation Drive, Kanata · June 13, 2026<br /><br />
          <a href="https://gardenontario.org">gardenontario.org</a>
          {" · "}
          Judged in accordance with OHA &amp; Garden Clubs of Ontario guidelines (OJES 2019)
        </p>
      </footer>
    </>
  );
}