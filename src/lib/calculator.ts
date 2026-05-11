export interface CalculatorInput {
  trees: number
  years: number
  scenario: 'conservative' | 'moderate' | 'optimistic'
}

export interface CalculatorOutput {
  totalInvestment: number
  annualPayout: number
  cumulativeReturn: number
  roi: number
  co2Offset: number
}

const TREE_PRICE = 19.50 // USD per tree
// Yield per tree per year (USD) based on HASS Fund projections
// Revenue per tree = total revenue / 100,000 trees per 1,000 acres
const YIELD_PER_TREE = {
  conservative: { year1to3: 0, year4: 3.5, year5: 10, year6plus: 18 },
  moderate: { year1to3: 0, year4: 6.2, year5: 17.2, year6plus: 31.2 },
  optimistic: { year1to3: 0, year4: 9, year5: 24, year6plus: 42 },
}
const CO2_PER_TREE_PER_YEAR = 0.022 // tons

export function calculateReturns(input: CalculatorInput): CalculatorOutput {
  const { trees, years, scenario } = input
  const yields = YIELD_PER_TREE[scenario]
  const totalInvestment = Math.round(trees * TREE_PRICE)

  let cumulativeReturn = 0
  let lastAnnualPayout = 0

  for (let y = 1; y <= years; y++) {
    let perTree: number
    if (y <= 3) perTree = yields.year1to3
    else if (y === 4) perTree = yields.year4
    else if (y === 5) perTree = yields.year5
    else perTree = yields.year6plus

    lastAnnualPayout = Math.round(trees * perTree)
    cumulativeReturn += lastAnnualPayout
  }

  const roi = totalInvestment > 0 ? ((cumulativeReturn - totalInvestment) / totalInvestment) * 100 : 0
  const co2Offset = trees * CO2_PER_TREE_PER_YEAR * years

  return {
    totalInvestment,
    annualPayout: lastAnnualPayout,
    cumulativeReturn,
    roi: Math.round(roi * 10) / 10,
    co2Offset: Math.round(co2Offset * 10) / 10,
  }
}
