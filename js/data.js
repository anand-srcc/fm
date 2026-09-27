/**
 * Financial Management (FM) Subject Portal Data Store
 * Structured for Chapters, Subparts, and Dedicated Excel Financial Labs.
 * Fully expandable: Simply add new chapters (e.g., Chapter 4: Leverage, Chapter 5: Working Capital)
 * or new practical labs to the arrays below!
 */

const FM_PORTAL_CONFIG = {
  subjectName: "Financial Management (FM)",
  shortName: "FM Portal",
  subtitle: "Academic Theory & Applied MS Excel Financial Modeling Suite",
  version: "2.0 Universal Edition",
  stats: {
    chaptersCount: 3,
    labsCount: 11,
    totalFiles: 12,
    totalTopics: 385,
    practiceCases: "500+",
    excelFormulas: "25+"
  },
  chapters: [
  {
    "id": "ch1",
    "num": 1,
    "title": "Time Value of Money (TVM)",
    "file": "TVM_Interactive_Finance_Laboratory_COMPLETE_FIXED.html",
    "badge": "Foundations of Corporate Finance",
    "icon": "⏱️",
    "color": "from-emerald-500 to-teal-700",
    "accent": "#10B981",
    "desc": "Foundational cornerstone of financial analysis: compounding, discounting, single sums, annuities, perpetuities, loan amortization schedules, and real vs. nominal rates.",
    "formulas": [
      {
        "name": "Future Value (Single Sum)",
        "formula": "FV = PV \\times (1 + r)^n"
      },
      {
        "name": "Present Value (Single Sum)",
        "formula": "PV = \\frac{FV}{(1 + r)^n}"
      },
      {
        "name": "Ordinary Annuity FV",
        "formula": "FVA = PMT \\times \\left[\\frac{(1 + r)^n - 1}{r}\\right]"
      },
      {
        "name": "Ordinary Annuity PV",
        "formula": "PVA = PMT \\times \\left[\\frac{1 - (1 + r)^{-n}}{r}\\right]"
      },
      {
        "name": "Effective Annual Rate",
        "formula": "EAR = \\left(1 + \\frac{r_{nom}}{m}\\right)^m - 1"
      },
      {
        "name": "Perpetuity PV",
        "formula": "PV = \\frac{PMT}{r}"
      }
    ],
    "categories": [
      {
        "name": "Core Theory & Concepts",
        "subparts": [
          {
            "id": "learn",
            "title": "Learn TVM Foundations",
            "badge": "Core Theory",
            "desc": "Intuition, timeline principles, and the five TVM variables."
          },
          {
            "id": "singlesum",
            "title": "Single Sum FV & PV",
            "badge": "Lump Sum",
            "desc": "Single cash flow discounting and compounding dynamics."
          },
          {
            "id": "compounding",
            "title": "Compounding & EAR",
            "badge": "Rates",
            "desc": "Annual, semi-annual, quarterly, monthly and continuous compounding."
          },
          {
            "id": "realrate",
            "title": "Real vs Nominal Rates",
            "badge": "Fisher Effect",
            "desc": "Adjusting nominal returns for inflation using the Fisher equation."
          },
          {
            "id": "rule72",
            "title": "Rule of 72, 69 & 114",
            "badge": "Rules of Thumb",
            "desc": "Quick mental arithmetic for money doubling and tripling times."
          },
          {
            "id": "rateconverter",
            "title": "Interest Rate Converter",
            "badge": "Calculator",
            "desc": "Convert APR, APY, EAR, and nominal rates seamlessly."
          }
        ]
      },
      {
        "name": "Annuities & Cash Flow Streams",
        "subparts": [
          {
            "id": "annuity",
            "title": "Ordinary Annuity & Annuity Due",
            "badge": "Annuities",
            "desc": "Equal periodic cash flows with start-of-period vs end-of-period timing."
          },
          {
            "id": "deferred",
            "title": "Deferred Annuity",
            "badge": "Multi-Period",
            "desc": "Annuities commencing after a specified gestation or waiting period."
          },
          {
            "id": "perpetuity",
            "title": "Perpetuity & Growing Perpetuity",
            "badge": "Infinite Streams",
            "desc": "Indefinite regular cash flows and Gordon growth perpetuity."
          },
          {
            "id": "growing",
            "title": "Growing Annuity",
            "badge": "Constant Growth",
            "desc": "Annuity streams expanding at constant annual growth rate g."
          },
          {
            "id": "uneven",
            "title": "Uneven Cash Flows",
            "badge": "Irregular Streams",
            "desc": "Valuation of arbitrary, fluctuating cash flow streams."
          },
          {
            "id": "gradient",
            "title": "Arithmetic Gradient",
            "badge": "Engineering Econ",
            "desc": "Cash flows that increase or decrease by a fixed amount each period."
          }
        ]
      },
      {
        "name": "Practical Planning & Valuation",
        "subparts": [
          {
            "id": "sinkingfund",
            "title": "Sinking Fund Allocations",
            "badge": "Corporate Sinking",
            "desc": "Calculating periodic provision required to retire debt at maturity."
          },
          {
            "id": "goalplanner",
            "title": "Goal & SIP Planner",
            "badge": "Wealth Planning",
            "desc": "Systematic Investment Plan target corpus planner with growth curves."
          },
          {
            "id": "stepupsip",
            "title": "Step-Up SIP Calculator",
            "badge": "Dynamic SIP",
            "desc": "Annual percentage or fixed step-up in periodic savings."
          },
          {
            "id": "retirement",
            "title": "Retirement Planner",
            "badge": "Life-Cycle Planning",
            "desc": "Accumulation phase, corpus sizing, and post-retirement drawdown."
          },
          {
            "id": "loan",
            "title": "Loan / EMI Amortization Schedule",
            "badge": "Debt Servicing",
            "desc": "Equal Monthly Installment breakdown into principal & interest."
          },
          {
            "id": "loanadvanced",
            "title": "Advanced Loan Payoff & Prepayment",
            "badge": "Amortization+",
            "desc": "Prepayment analysis, tenure reduction, and interest savings."
          },
          {
            "id": "bond",
            "title": "Bond Valuation & Pricing",
            "badge": "Fixed Income",
            "desc": "Valuing coupon bonds, zeros, and yield-to-maturity (YTM)."
          },
          {
            "id": "bondanalytics",
            "title": "Bond Analytics & Duration",
            "badge": "Macaulay Duration",
            "desc": "Macaulay duration, modified duration, and price volatility."
          },
          {
            "id": "datedflows",
            "title": "XNPV & XIRR (Dated Flows)",
            "badge": "Excel Functions",
            "desc": "Evaluating cash flows occurring on irregular, exact calendar dates."
          },
          {
            "id": "leasebuy",
            "title": "Lease vs Buy Appraisal",
            "badge": "Corporate Decision",
            "desc": "NPV of leasing vs borrowing and buying capital assets."
          },
          {
            "id": "sensitivity",
            "title": "TVM Sensitivity Lab",
            "badge": "Scenario Lab",
            "desc": "Two-way data tables testing rate and tenure sensitivity."
          }
        ]
      },
      {
        "name": "Reference, Practice & Tools",
        "subparts": [
          {
            "id": "mastersolver",
            "title": "Master TVM Solver (5 Variables)",
            "badge": "All-in-One Solver",
            "desc": "Solve for N, I/Y, PV, PMT, or FV with real-time updates."
          },
          {
            "id": "factors",
            "title": "TVM Factor Tables",
            "badge": "Tables",
            "desc": "Interactive PVIF, PVIFA, FVIF, and FVIFA mathematical lookup tables."
          },
          {
            "id": "formulas",
            "title": "Formula Bank & Glossary",
            "badge": "Study Reference",
            "desc": "Exhaustive formula derivations, notation definitions, and terminology."
          },
          {
            "id": "excel",
            "title": "Excel Master Guide",
            "badge": "Excel Shortcuts",
            "desc": "Anatomy of PV, FV, PMT, NPER, RATE, EFFECT, and NOMINAL functions."
          },
          {
            "id": "compare",
            "title": "Which Tool? Decision Guide",
            "badge": "Decision Matrix",
            "desc": "Flowchart and decision tree for selecting the right TVM method."
          },
          {
            "id": "practice",
            "title": "Solved Practice Lab",
            "badge": "Self-Testing",
            "desc": "Interactive practice drills with immediate step-by-step feedback."
          },
          {
            "id": "questionbank",
            "title": "Question Bank & Quizzes",
            "badge": "Exam Prep",
            "desc": "Graded problem sets with complete analytical solutions."
          },
          {
            "id": "teacher",
            "title": "Teacher & Student Mode",
            "badge": "Pedagogy",
            "desc": "Lesson plans, lecture slides, and conceptual discussion notes."
          }
        ]
      }
    ]
  },
  {
    "id": "ch2",
    "num": 2,
    "title": "Capital Budgeting",
    "file": "Capital_Budgeting_Final_Universal_Teacher_Student_Complete.html",
    "badge": "Long-Term Capital Investment Appraisal",
    "icon": "🏢",
    "color": "from-blue-600 to-indigo-900",
    "accent": "#3B82F6",
    "desc": "The primary strategic corporate finance decision: appraisal of long-term projects using DCF (NPV, IRR, MIRR, PI) and Non-DCF (PBP, ARR) methods, cash flow estimation, risk analysis, Fisher crossover, and 500 solved project cases.",
    "formulas": [
      {
        "name": "Net Present Value",
        "formula": "NPV = \\sum_{t=1}^n \\frac{CF_t}{(1 + k)^t} - CF_0"
      },
      {
        "name": "Internal Rate of Return",
        "formula": "\\sum_{t=0}^n \\frac{CF_t}{(1 + IRR)^t} = 0"
      },
      {
        "name": "Profitability Index",
        "formula": "PI = \\frac{\\sum_{t=1}^n \\frac{CF_t}{(1 + k)^t}}{CF_0} = 1 + \\frac{NPV}{CF_0}"
      },
      {
        "name": "Modified IRR",
        "formula": "MIRR = \\left[\\frac{Terminal\\ Value}{PV\\ of\\ Outflows}\\right]^{\\frac{1}{n}} - 1"
      },
      {
        "name": "Accounting Rate of Return",
        "formula": "ARR = \\frac{Average\\ Annual\\ PAT}{Average\\ Investment} \\times 100"
      },
      {
        "name": "Equivalent Annual Annuity",
        "formula": "EAA = \\frac{NPV}{PVIFA_{k, n}}"
      }
    ],
    "categories": [
      {
        "name": "Foundations & Cash Flow Estimation",
        "subparts": [
          {
            "id": "master_index",
            "title": "Master Index & Universal Search",
            "badge": "Master Index",
            "desc": "Universal navigation portal and quick topic finder."
          },
          {
            "id": "intro",
            "title": "Capital Budgeting Introduction",
            "badge": "Concepts",
            "desc": "Significance, capital allocation, and strategic decision stages."
          },
          {
            "id": "basicsaz",
            "title": "Capital Budgeting A to Z",
            "badge": "Full Glossary",
            "desc": "Comprehensive foundational reference from basics to advanced."
          },
          {
            "id": "cashflow_masterclass",
            "title": "Cash Flow Estimation Masterclass",
            "badge": "Cash Flows",
            "desc": "Distinction between accounting profit and economic cash flow."
          },
          {
            "id": "incremental",
            "title": "Incremental Cash Flow Rules",
            "badge": "Key Principles",
            "desc": "Sunk costs, opportunity costs, externalities, and working capital recovery."
          },
          {
            "id": "depmethods",
            "title": "Depreciation Methods & Tax Shields",
            "badge": "Tax Shield",
            "desc": "Straight-line, WDV, MACRS, and tax depreciation shields."
          },
          {
            "id": "terminal",
            "title": "Terminal Value & Disposal Tax",
            "badge": "Salvage Value",
            "desc": "Net salvage value, capital gains tax, and recovery of working capital."
          }
        ]
      },
      {
        "name": "Evaluation Techniques (DCF & Non-DCF)",
        "subparts": [
          {
            "id": "techoverview",
            "title": "Evaluation Techniques Overview",
            "badge": "Methods Overview",
            "desc": "Comparative taxonomy of all appraisal methodologies."
          },
          {
            "id": "payback",
            "title": "Payback Period (PBP)",
            "badge": "Traditional",
            "desc": "Liquidity assessment, conventional payback calculation, and limitations."
          },
          {
            "id": "dpayback",
            "title": "Discounted Payback Period (DPBP)",
            "badge": "Time-Adjusted",
            "desc": "Overcoming the time value flaw of traditional payback."
          },
          {
            "id": "arr",
            "title": "Accounting Rate of Return (ARR)",
            "badge": "Accounting Ratio",
            "desc": "Average accounting profit over average/initial capital investment."
          },
          {
            "id": "npv",
            "title": "Net Present Value (NPV)",
            "badge": "Gold Standard",
            "desc": "Theoretical gold standard of wealth maximization."
          },
          {
            "id": "irr",
            "title": "Internal Rate of Return (IRR)",
            "badge": "Yield Metric",
            "desc": "Break-even discount rate, trial-and-error, and interpolation."
          },
          {
            "id": "mirr",
            "title": "Modified Internal Rate of Return (MIRR)",
            "badge": "Corrected Rate",
            "desc": "Reinvestment rate realism and eliminating multiple IRR anomalies."
          },
          {
            "id": "pi",
            "title": "Profitability Index (PI)",
            "badge": "Benefit-Cost",
            "desc": "Capital rationing metric: present value per rupee of investment."
          },
          {
            "id": "summarytable",
            "title": "Decision Criteria Master Summary",
            "badge": "Cheat Sheet",
            "desc": "Side-by-side comparison of acceptance criteria and assumptions."
          }
        ]
      },
      {
        "name": "Conflicts, Ranking & Project Selection",
        "subparts": [
          {
            "id": "conflict",
            "title": "NPV vs IRR Conflicts & Paradoxes",
            "badge": "Core Dilemma",
            "desc": "Size disparity, time disparity, and reinvestment rate assumptions."
          },
          {
            "id": "ranking",
            "title": "Project Ranking & Fisher Crossover",
            "badge": "Fisher Rate",
            "desc": "Calculating and graphing Fisher's rate of intersection."
          },
          {
            "id": "decision_playbook",
            "title": "Capital Budgeting Decision Playbook",
            "badge": "Playbook",
            "desc": "Step-by-step practitioner checklist for project approvals."
          },
          {
            "id": "unequal",
            "title": "Unequal Project Lives (EAA & Replacement Chain)",
            "badge": "Project Life",
            "desc": "Equivalent Annual Annuity (EAA) and Common Life approaches."
          },
          {
            "id": "rationing",
            "title": "Capital Rationing (Divisible & Indivisible)",
            "badge": "Resource Bounds",
            "desc": "PI ranking and integer programming for binding capital constraints."
          },
          {
            "id": "replacement",
            "title": "Asset Replacement Decisions",
            "badge": "Replacement",
            "desc": "Incremental cash flow analysis for replacing operational assets."
          }
        ]
      },
      {
        "name": "Risk, Scenarios & Advanced Topics",
        "subparts": [
          {
            "id": "advancedrisk",
            "title": "Advanced Risk Analysis Toolkit",
            "badge": "Risk Analysis",
            "desc": "Stand-alone risk, corporate risk, and market risk in capital projects."
          },
          {
            "id": "radr",
            "title": "Risk-Adjusted Discount Rate (RADR)",
            "badge": "Hurdle Rates",
            "desc": "Adjusting discount rates upwards for above-average risk projects."
          },
          {
            "id": "certainty",
            "title": "Certainty Equivalent (CE) Method",
            "badge": "Cash Adjustment",
            "desc": "Converting risky cash flows into risk-free equivalents ($alpha_t$)."
          },
          {
            "id": "sensitivity",
            "title": "Sensitivity Analysis & Tornado Charts",
            "badge": "What-If",
            "desc": "Isolating critical project variables and breakeven limits."
          },
          {
            "id": "scenario",
            "title": "Scenario Analysis (Best/Base/Worst)",
            "badge": "Scenarios",
            "desc": "Joint variation of macroeconomic and operational assumptions."
          },
          {
            "id": "dectree",
            "title": "Decision Tree Analysis",
            "badge": "Sequential Risk",
            "desc": "Multi-stage sequential capital investment decisions with rollback."
          },
          {
            "id": "realoptions",
            "title": "Real Options in Capital Budgeting",
            "badge": "Strategic Agility",
            "desc": "Option to expand, delay, abandon, or switch technologies."
          },
          {
            "id": "apv",
            "title": "Adjusted Present Value (APV)",
            "badge": "Financing Side-Effects",
            "desc": "Base-case NPV plus present value of financing side effects."
          }
        ]
      },
      {
        "name": "500 Case Studies, Tools & Exam Prep",
        "subparts": [
          {
            "id": "project50",
            "title": "500 Capital Budgeting Cases with Answers",
            "badge": "500 Cases",
            "desc": "Exhaustive library of solved projects across all industries."
          },
          {
            "id": "project_practice_planner",
            "title": "Project Practice Planner",
            "badge": "Planner",
            "desc": "Personalized study and drill scheduling tool."
          },
          {
            "id": "mastersolver",
            "title": "Master Capital Budgeting Solver",
            "badge": "Universal Solver",
            "desc": "Full cash flow matrix generator with NPV, IRR, MIRR, PI & PBP."
          },
          {
            "id": "calc100",
            "title": "100 Live Financial Calculators",
            "badge": "100 Tools",
            "desc": "Interactive specialty calculators covering all techniques."
          },
          {
            "id": "mcq100",
            "title": "100 Comprehensive MCQs",
            "badge": "MCQ Bank",
            "desc": "Curated questions with detailed explanatory justifications."
          },
          {
            "id": "viva_answers",
            "title": "Viva & Theory Interview Answers",
            "badge": "Interview Prep",
            "desc": "Conceptual answers for oral examinations and corporate interviews."
          },
          {
            "id": "cheatsheets",
            "title": "Quick Revision Cheat Sheets",
            "badge": "Fast Revision",
            "desc": "Condensed formula sheets and key takeaways."
          },
          {
            "id": "report_generator",
            "title": "Project Report Generator & Print Dossier",
            "badge": "Dossier",
            "desc": "Export professional PDF/Print investment recommendation reports."
          }
        ]
      }
    ]
  },
  {
    "id": "ch3",
    "num": 3,
    "title": "Cost of Capital (WACC)",
    "file": "Cost_of_Capital_Lab.html",
    "alt_file": "Cost_of_Capital_Lab-3.html",
    "badge": "Hurdle Rate & Capital Structure Costing",
    "icon": "⚖️",
    "color": "from-amber-500 to-orange-700",
    "accent": "#F59E0B",
    "desc": "Establishing the minimum acceptable hurdle rate: Cost of Debt (Kd), Cost of Preference Capital (Kp), Cost of Equity (Ke via DDM and CAPM), Retained Earnings (Kr), Book vs Market weights, and Marginal Cost of Capital (MCC).",
    "formulas": [
      {
        "name": "Weighted Average Cost of Capital",
        "formula": "WACC = w_d K_d (1 - T) + w_p K_p + w_e K_e"
      },
      {
        "name": "Cost of Debt (Redeemable)",
        "formula": "K_d \\approx \\frac{I(1 - T) + \\frac{RV - NP}{n}}{\\frac{RV + NP}{2}}"
      },
      {
        "name": "Cost of Preference Capital",
        "formula": "K_p = \\frac{D_p + \\frac{RV - NP}{n}}{\\frac{RV + NP}{2}}"
      },
      {
        "name": "Cost of Equity (Gordon Model)",
        "formula": "K_e = \\frac{D_1}{P_0} + g = \\frac{D_0(1 + g)}{P_0} + g"
      },
      {
        "name": "Cost of Equity (CAPM)",
        "formula": "K_e = R_f + \\beta (R_m - R_f)"
      },
      {
        "name": "Cost of Retained Earnings",
        "formula": "K_r = \\frac{D_1}{P_0} + g \\quad (No\\ Flotation)"
      }
    ],
    "categories": [
      {
        "name": "Cost of Capital Foundations & WACC",
        "subparts": [
          {
            "id": "dashboard",
            "title": "WACC Master Dashboard",
            "badge": "Dashboard",
            "desc": "Interactive multi-source capital weights and hurdle rate calculator."
          },
          {
            "id": "intro",
            "title": "Introduction to Cost of Capital",
            "badge": "Overview",
            "desc": "Role of cost of capital as discount rate, cut-off rate, and minimum required return."
          },
          {
            "id": "concept",
            "title": "Core Concept & Opportunity Cost",
            "badge": "Economic Theory",
            "desc": "Opportunity cost of capital, investor expectations, and business/financial risk."
          },
          {
            "id": "wacc",
            "title": "Weighted Average Cost of Capital (WACC)",
            "badge": "Core Formula",
            "desc": "Composite cost of financing: formulas, assumptions, and execution steps."
          },
          {
            "id": "weights",
            "title": "Book Value vs Market Value Weights",
            "badge": "Weighting Methods",
            "desc": "Target vs book vs market weights: which reflects true opportunity costs?"
          },
          {
            "id": "capital_structure",
            "title": "Capital Structure & Valuation Link",
            "badge": "Valuation Link",
            "desc": "How leverage impacts overall cost of capital and firm value (NI, NOI, MM)."
          }
        ]
      },
      {
        "name": "Specific Component Costs (Kd, Kp, Ke, Kr)",
        "subparts": [
          {
            "id": "cost_debt",
            "title": "Cost of Debt Capital (Kd)",
            "badge": "Debt (Kd)",
            "desc": "Pre-tax vs post-tax debt, coupon vs YTM, irredeemable vs redeemable debentures."
          },
          {
            "id": "cost_pref",
            "title": "Cost of Preference Shares (Kp)",
            "badge": "Preference (Kp)",
            "desc": "Cumulative, redeemable, convertible preference shares and dividend tax effects."
          },
          {
            "id": "cost_equity",
            "title": "Cost of Equity Capital (Ke)",
            "badge": "Equity (Ke)",
            "desc": "Why equity is the costliest capital: residual claimant status and risk premiums."
          },
          {
            "id": "cost_retained",
            "title": "Cost of Retained Earnings (Kr)",
            "badge": "Internal Equity",
            "desc": "Opportunity cost of internal funds, personal tax adjustments, and zero flotation."
          },
          {
            "id": "flotation",
            "title": "Flotation Costs Adjustment",
            "badge": "Issuance Costs",
            "desc": "Underwriting, brokerage, and legal fees: impact on net issue proceeds ($NP$)."
          }
        ]
      },
      {
        "name": "Equity Valuation Models & CAPM",
        "subparts": [
          {
            "id": "dividend_growth",
            "title": "Dividend Discount & Gordon Models",
            "badge": "DDM",
            "desc": "Zero growth, constant Gordon growth, and multistage dividend discount models."
          },
          {
            "id": "capm",
            "title": "Capital Asset Pricing Model (CAPM) & Beta",
            "badge": "CAPM",
            "desc": "Risk-free rate $R_f$, market risk premium $(R_m - R_f)$, and systematic risk $\\beta$."
          },
          {
            "id": "bond_yield_plus",
            "title": "Bond-Yield-Plus-Risk-Premium Method",
            "badge": "Heuristic",
            "desc": "Subjective equity risk premium added to the firm's long-term debt yield."
          }
        ]
      },
      {
        "name": "Marginal Cost of Capital & Break Points",
        "subparts": [
          {
            "id": "marginal",
            "title": "Marginal Cost of Capital (MCC)",
            "badge": "MCC Concept",
            "desc": "Cost of obtaining one additional unit of new capital."
          },
          {
            "id": "break_point",
            "title": "Financing Break Points & MCC Schedule",
            "badge": "Break Points",
            "desc": "Capital thresholds where component costs jump due to flotation or risk."
          },
          {
            "id": "mcc_lab",
            "title": "Live MCC & Investment Opportunity Lab",
            "badge": "IOS Intersection",
            "desc": "Determining the optimal capital budget where MCC intersects IOS."
          }
        ]
      },
      {
        "name": "Calculators, Practice & Exam Suite",
        "subparts": [
          {
            "id": "calc_kd",
            "title": "Cost of Debt (Kd) Live Calculator",
            "badge": "Kd Calculator",
            "desc": "Redeemable bond YTM and approximation solver with tax shield."
          },
          {
            "id": "calc_ke",
            "title": "Cost of Equity (Ke) Live Calculator",
            "badge": "Ke Calculator",
            "desc": "Interactive DDM and CAPM dual cost of equity engine."
          },
          {
            "id": "calc_wacc",
            "title": "WACC Multi-Component Calculator",
            "badge": "WACC Calculator",
            "desc": "Dynamic debt, preference, equity, and retained earnings weight matrix."
          },
          {
            "id": "calc_capm",
            "title": "CAPM & Beta Visualizer",
            "badge": "SML Graph",
            "desc": "Plot security market line (SML) and calculate required return."
          },
          {
            "id": "worked",
            "title": "Worked Numerical Examples",
            "badge": "Step-by-Step",
            "desc": "Classroom-tested exam illustrations with full step-by-step solutions."
          },
          {
            "id": "unsolved",
            "title": "Unsolved Practice Problems",
            "badge": "Homework",
            "desc": "Challenging practice questions with hint buttons and final answers."
          },
          {
            "id": "mcq",
            "title": "MCQ Question Bank",
            "badge": "Quiz",
            "desc": "Multiple-choice concept questions with instantaneous scoring."
          },
          {
            "id": "exam_gen",
            "title": "Dynamic Exam Paper Generator",
            "badge": "Exam Gen",
            "desc": "Create customized quiz papers and test sheets on demand."
          },
          {
            "id": "excel_guide",
            "title": "MS Excel WACC Implementation Guide",
            "badge": "Excel Labs",
            "desc": "Formulas `=RATE()`, `=YIELD()`, and spreadsheet model architecture."
          },
          {
            "id": "formula_bank",
            "title": "Comprehensive Formula Bank",
            "badge": "Formula Bank",
            "desc": "Complete equation repository for all cost of capital calculations."
          },
          {
            "id": "glossary",
            "title": "Financial Glossary of Terms",
            "badge": "Glossary",
            "desc": "Clear definitions of all capital structure and hurdle rate terms."
          }
        ]
      }
    ]
  }
],
  labs: [
  {
    "id": "cb_excel_master",
    "category": "Capital Budgeting Excel Suite",
    "title": "Capital Budgeting MS Excel Master Practitioner Suite",
    "file": "Capital_Budgeting_Excel_Lab-3.html",
    "badge": "Flagship Excel Lab",
    "icon": "🧪",
    "color": "from-emerald-600 to-teal-800",
    "accent": "#059669",
    "excel_formulas": [
      "=NPV(rate, val1, ...)",
      "=IRR(values, [guess])",
      "=MIRR(values, fin_rate, reinv_rate)",
      "=XNPV(rate, values, dates)",
      "=XIRR(values, dates)"
    ],
    "desc": "Complete hands-on Excel laboratory covering Wall Street financial modeling standards, the notorious t=0 timing trap in Excel's =NPV() function, dual project appraisal, Fisher crossover analysis, and sensitivity data tables.",
    "key_subparts": [
      {
        "id": "dashboard",
        "title": "Dual Project Appraisal & Crossover Dashboard"
      },
      {
        "id": "modeling_standards",
        "title": "Financial Modeling Standards & Cell Color Conventions"
      },
      {
        "id": "npv_func",
        "title": "Mastering =NPV() in MS Excel & The t=0 Trap"
      },
      {
        "id": "irr_func",
        "title": "Mastering =IRR() & Newton-Raphson Mechanics"
      },
      {
        "id": "mirr_func",
        "title": "Mastering =MIRR() & Reinvestment Rate Fix"
      },
      {
        "id": "xnpv_xirr",
        "title": "Mastering =XNPV() & =XIRR() for Irregular Dates"
      },
      {
        "id": "calc_data_table",
        "title": "Dynamic 2-Way Sensitivity Data Table"
      }
    ]
  },
  {
    "id": "npv_deep_dive",
    "category": "Capital Budgeting Excel Suite",
    "title": "Net Present Value (NPV) Interactive Deep-Dive Lab",
    "file": "npv_lab.html",
    "badge": "NPV Engine",
    "icon": "📊",
    "color": "from-blue-600 to-cyan-700",
    "accent": "#2563EB",
    "excel_formulas": [
      "=NPV(discount_rate, CF_1:CF_n) - Initial_Outflow",
      "=SUMPRODUCT(CFs, PVIFs)"
    ],
    "desc": "Dynamic discounted cash flow schedule simulator. Generates live NPV profiles, calculates exact present value discount factors, and tests discount rate sensitivity across custom project timelines.",
    "key_subparts": [
      {
        "id": "dashboard",
        "title": "NPV Dashboard — Enter Any Project, See Everything"
      },
      {
        "id": "formula",
        "title": "The NPV Formula Explained Term by Term"
      },
      {
        "id": "discount_rate",
        "title": "Discount Rate Selection & Hurdle Rate Rules"
      },
      {
        "id": "npv_profile",
        "title": "NPV Profile Curve Generator"
      },
      {
        "id": "sensitivity",
        "title": "Discount Rate & Cash Flow Sensitivity Matrix"
      }
    ]
  },
  {
    "id": "irr_deep_dive",
    "category": "Capital Budgeting Excel Suite",
    "title": "Internal Rate of Return (IRR) Deep-Dive Lab",
    "file": "irr_lab.html",
    "badge": "IRR Engine",
    "icon": "🎯",
    "color": "from-purple-600 to-indigo-800",
    "accent": "#7C3AED",
    "excel_formulas": [
      "=IRR(Cash_Flows, [Guess])",
      "Trial & Error Interpolation Formula"
    ],
    "desc": "Interactive simulation of the Newton-Raphson root-finding algorithm. Demonstrates normal vs non-normal cash flows, multiple IRR anomalies (Descartes' Rule of Signs), and structural NPV vs IRR project conflicts.",
    "key_subparts": [
      {
        "id": "dashboard",
        "title": "IRR Live Dashboard & NPV Profile Intercept"
      },
      {
        "id": "methods",
        "title": "Interpolation & Trial-and-Error Methods"
      },
      {
        "id": "multi_irr",
        "title": "Multiple IRRs in Non-Conventional Cash Flows"
      },
      {
        "id": "conflicts",
        "title": "NPV vs IRR Conflicts & Scale Disparities"
      }
    ]
  },
  {
    "id": "mirr_deep_dive",
    "category": "Capital Budgeting Excel Suite",
    "title": "Modified IRR (MIRR) Interactive Deep-Dive Lab",
    "file": "mirr_lab.html",
    "badge": "MIRR Engine",
    "icon": "🔄",
    "color": "from-pink-600 to-rose-800",
    "accent": "#DB2777",
    "excel_formulas": [
      "=MIRR(values, finance_rate, reinvest_rate)"
    ],
    "desc": "Eliminates the critical flaws of IRR. Models separate borrowing/financing rates for negative flows and realistic reinvestment rates (WACC) for positive flows, generating an unambiguous rate of return.",
    "key_subparts": [
      {
        "id": "dashboard",
        "title": "Modified IRR Live Dashboard"
      },
      {
        "id": "formula",
        "title": "Terminal Value & Financing Cost Derivation"
      },
      {
        "id": "calc",
        "title": "Calculating MIRR Step-by-Step"
      },
      {
        "id": "reinvest",
        "title": "The Reinvestment-Rate Critique of Standard IRR"
      }
    ]
  },
  {
    "id": "arr_deep_dive",
    "category": "Capital Budgeting Excel Suite",
    "title": "Accounting Rate of Return (ARR) Practical Lab",
    "file": "Accounting_Rate_of_Return_Lab.html",
    "badge": "ARR Engine",
    "icon": "📑",
    "color": "from-amber-600 to-yellow-800",
    "accent": "#D97706",
    "excel_formulas": [
      "=AVERAGE(Net_Profits)/AVERAGE(Book_Values)",
      "=SLN(Cost, Salvage, Life)"
    ],
    "desc": "Hands-on non-discounted accounting return lab. Generates multi-year asset balance depreciation schedules (SLM vs WDV), tracks annual PAT, and compares Initial Investment vs Average Investment methods.",
    "key_subparts": [
      {
        "id": "dashboard",
        "title": "ARR Live Dashboard & Asset Schedule"
      },
      {
        "id": "method",
        "title": "ARR Step-by-Step Calculation Engine"
      },
      {
        "id": "vs_cf",
        "title": "Accounting Profit vs Cash Flow Reconciliation"
      },
      {
        "id": "calc_main",
        "title": "ARR Calculator with Salvage & Working Capital"
      }
    ]
  },
  {
    "id": "wacc_master_lab",
    "category": "Cost of Capital Practical Suite",
    "title": "WACC Master Dashboard & Capital Structure Optimizer",
    "file": "Cost_of_Capital_Lab.html",
    "badge": "WACC Optimizer",
    "icon": "⚖️",
    "color": "from-sky-600 to-blue-800",
    "accent": "#0284C7",
    "excel_formulas": [
      "=SUMPRODUCT(weights, after_tax_costs)",
      "=Kd*(1-Tax_Rate)"
    ],
    "desc": "Interactive multi-source capital weighting engine. Adjust debt, preference, and equity weights dynamically to observe immediate changes in the firm's composite hurdle rate and firm valuation.",
    "key_subparts": [
      {
        "id": "dashboard",
        "title": "WACC Master Live Dashboard"
      },
      {
        "id": "weights",
        "title": "Book Value vs Market Value Weighting Simulator"
      },
      {
        "id": "calc_wacc",
        "title": "Multi-Component Weighted Average Calculator"
      },
      {
        "id": "mcc_lab",
        "title": "Marginal Cost of Capital & Break Points Lab"
      }
    ]
  },
  {
    "id": "kd_debt_lab",
    "category": "Cost of Capital Practical Suite",
    "title": "Cost of Debt (Kd) Comprehensive Excel Lab",
    "file": "Cost_of_Debt_Lab.html",
    "badge": "Debt & Tax Shield",
    "icon": "🏦",
    "color": "from-violet-600 to-purple-800",
    "accent": "#6D28D9",
    "excel_formulas": [
      "=RATE(nper, -coupon*(1-tax), issue_price, -redemption_value)",
      "=YIELD(...)"
    ],
    "desc": "Deep-dive into debt instruments: perpetual debentures, redeemable bonds, tax shields, flotation costs, and accurate Yield-to-Maturity (YTM) internal rate of return computations.",
    "key_subparts": [
      {
        "id": "dashboard",
        "title": "Quick Kd Live Calculator — Redeemable Debentures"
      },
      {
        "id": "tax_shield",
        "title": "Corporate Tax Shield Analysis"
      },
      {
        "id": "redd_approx",
        "title": "Approximation vs Exact IRR/YTM Comparison"
      },
      {
        "id": "flotation",
        "title": "Flotation Costs & Net Issue Price Adjustments"
      }
    ]
  },
  {
    "id": "ke_equity_lab",
    "category": "Cost of Capital Practical Suite",
    "title": "Cost of Equity (Ke) Practical Model Comparison Lab",
    "file": "Cost_of_Equity_Lab.html",
    "badge": "Ke: DDM vs CAPM",
    "icon": "📈",
    "color": "from-emerald-600 to-green-800",
    "accent": "#16A34A",
    "excel_formulas": [
      "=D1/P0 + g",
      "=RiskFree + Beta*(MarketReturn - RiskFree)"
    ],
    "desc": "Live side-by-side comparison of Dividend Discount Models (Zero growth, Gordon constant growth, two-stage growth) versus the Capital Asset Pricing Model (CAPM) and Security Market Line (SML).",
    "key_subparts": [
      {
        "id": "dashboard",
        "title": "DDM vs CAPM Live Comparison Dashboard"
      },
      {
        "id": "ddm_gordon",
        "title": "Gordon Constant Growth Model Lab"
      },
      {
        "id": "ddm_twostage",
        "title": "Two-Stage Supernormal Growth DDM"
      },
      {
        "id": "sml",
        "title": "Security Market Line (SML) & Beta Sensitivity"
      }
    ]
  },
  {
    "id": "kp_pref_lab",
    "category": "Cost of Capital Practical Suite",
    "title": "Cost of Preference Shares (Kp) Practical Lab",
    "file": "Cost_of_Preference_Share_Lab.html",
    "badge": "Preference Shares",
    "icon": "💎",
    "color": "from-teal-600 to-cyan-800",
    "accent": "#0D9488",
    "excel_formulas": [
      "=Div_Amount/Net_Proceeds",
      "=RATE(...)"
    ],
    "desc": "Valuation of fixed-income hybrid securities: issued at par, premium, or discount, redemption premiums, flotation cost impact, and approximation vs actuarial yield methods.",
    "key_subparts": [
      {
        "id": "dashboard",
        "title": "Cost of Preference Shares: All Cases at a Glance"
      },
      {
        "id": "irr_par",
        "title": "Irredeemable Preference Shares at Par / Premium / Discount"
      },
      {
        "id": "red_approx",
        "title": "Redeemable Preference Shares Approximation Engine"
      },
      {
        "id": "red_irr",
        "title": "Actuarial / IRR Yield Method for Redeemable Shares"
      }
    ]
  },
  {
    "id": "coc_lab3",
    "category": "Cost of Capital Practical Suite",
    "title": "Cost of Capital Comprehensive Lab 3",
    "file": "Cost_of_Capital_Lab-3.html",
    "badge": "Scenario Lab",
    "icon": "🧮",
    "color": "from-indigo-600 to-blue-800",
    "accent": "#4338CA",
    "excel_formulas": [
      "=WACC Formula Matrix",
      "=Investment Opportunity Schedule"
    ],
    "desc": "Alternative practitioner suite featuring dual scenario modeling, book value vs market value matrix, and investment opportunity schedule (IOS) comparison.",
    "key_subparts": [
      {
        "id": "dashboard",
        "title": "WACC Dashboard Calculator Suite"
      },
      {
        "id": "wacc_bv",
        "title": "Book Value Weights Matrix"
      },
      {
        "id": "wacc_mv",
        "title": "Market Value Weights Matrix"
      },
      {
        "id": "wacc_compare",
        "title": "BV vs MV Divergence Analysis"
      }
    ]
  },
  {
    "id": "tvm_interactive_lab",
    "category": "Time Value of Money Practical Suite",
    "title": "TVM Practical Simulator & Amortization Suite",
    "file": "TVM_Interactive_Finance_Laboratory_COMPLETE_FIXED.html",
    "badge": "TVM Practical Lab",
    "icon": "⏱️",
    "color": "from-amber-600 to-orange-800",
    "accent": "#EA580C",
    "excel_formulas": [
      "=PMT(rate, nper, pv)",
      "=PPMT(...)",
      "=IPMT(...)",
      "=CUMIPMT(...)"
    ],
    "desc": "Practical simulation lab for generating full loan EMI amortization schedules, step-up SIP wealth generation schedules, compounding frequency visualizer, and bond duration analytics.",
    "key_subparts": [
      {
        "id": "excel",
        "title": "Excel Master Guide & Function Anatomy"
      },
      {
        "id": "loan",
        "title": "Full Loan EMI Amortization Schedule"
      },
      {
        "id": "stepupsip",
        "title": "Step-Up SIP & Investment Timeline"
      },
      {
        "id": "compounding",
        "title": "Compounding Frequency & EAR Visualizer"
      }
    ]
  }
]
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = FM_PORTAL_CONFIG;
}
