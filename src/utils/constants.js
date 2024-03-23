export const STATS_LABELED = {
    "PA": {
        label: "Plate Appearances"
    },
    "AB": {
        label: "At Bats"
    },
    "H": {
        label: "Hits"
    },
    "HR": {
        label: "Home Runs"
    },
    "BB": {
        label: "Walks"
    },
    "K": {
        label: "Strikeouts"
    },
    "HBP": {
        label: "Hit by Pitch"
    },
    "SF": {
        label: "Sacrifice Flies"
    },
    "TB": {
        label: "Total Bases"
    },
    "RBI": {
        label: "Runs Batted In"
    },
}
export const STATS = Object.keys(STATS_LABELED)

const round = (num) => Math.round(num * 1000) / 1000

export const DERIVED_STATS_LABELED = {
    // Batting Average (AVG): Calculated as H / AB, this stat represents the player's average number of hits per at-bat.
    'AVG': {
        label: 'Batting Average',
        calc: ({AGG_H, AGG_AB}) => round((AGG_H / AGG_AB))
    },
    // On-Base Percentage (OBP): Calculated as (H + BB + HBP) / (AB + BB + HBP + SF), this stat represents the player's ability to reach base safely.
    'OBP': {
        label: 'On-Base Percentage',
        calc: ({AGG_H, AGG_BB, AGG_HBP, AGG_AB, AGG_SF}) => round(((AGG_H + AGG_BB + AGG_HBP) / (AGG_AB + AGG_BB + AGG_HBP + AGG_SF)))
    },
    // Slugging Percentage (SLG): Calculated as TB / AB, this stat represents the player's ability to hit for extra bases.
    'SLG': {
        label: 'Slugging Percentage',
        calc: ({AGG_TB, AGG_AB}) => round((AGG_TB / AGG_AB))
    },
    // On-Base Plus Slugging (OPS): Calculated as OBP + SLG, this stat provides a combined measure of a player's ability to reach base and hit for power.
    'OPS': {
        label: 'On-Base Plus Slugging',
        calc: (player) => round(DERIVED_STATS_LABELED.OBP.calc(player) + DERIVED_STATS_LABELED.SLG.calc(player))
    },
    // Strikeout Rate (K%): Calculated as K / PA, this stat represents the percentage of plate appearances that result in a strikeout.
    'K%': {
        label: 'Strikeout Rate',
        calc: ({AGG_K, AGG_PA}) => round((AGG_K / AGG_PA))
    },
    // Walk Rate (BB%): Calculated as BB / PA, this stat represents the percentage of plate appearances that result in a walk.
    'BB%': {
        label: 'Walk Rate',
        calc: ({AGG_BB, AGG_PA}) => round((AGG_BB / AGG_PA))
    },
    // Isolated Power (ISO): Calculated as SLG - AVG, this stat represents a player's raw power.
    'ISO': {
        label: 'Isolated Power',
        calc: (player) => round(((player.AGG_TB / player.AGG_AB) - DERIVED_STATS_LABELED.AVG.calc(player)))
    },
}
export const DERIVED_STATS = Object.keys(DERIVED_STATS_LABELED)
