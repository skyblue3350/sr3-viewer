interface Player {
    name_id: string
    is_myself: boolean
    weapon_list: number[3]
    dead_count: number
    byname: string
    special_id: number
    name: string
    grade: number
    grade_point: number
}

interface Wave {
    golden_ikura_pop_num: number
    id: number
    water_level: number
    golden_ikura_num: number
    quota_num: number
    event_type: number
}

interface Schedule {
    rule: 'REGULAR'
    weapon_list: number[]
    stage_id: number
    start_time: number
    end_time: number
    mode: 'REGULAR'
}

interface JobResult {
    id: string
    scale: []
    ikura_num: number
    players: Player[4]
    boss_counts: number[15]
    boss_kill_counts: number[15]
    waves: Wave[]
    job_result: {
        is_clear: boolean
        failure_wave?: number
    }
    play_time: number
    schedule: Schedule
}

interface ParseResult {
    [key: string]: {
        bossKillCounts: number[15]
        bossCounts: number[15]
        result: [{
            playTime: number
            grade: number
            grade_point: number
        }]

    }
}
