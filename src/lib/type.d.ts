interface Player {
    name_id: string
    is_myself: boolean
    weapon_list: number[]
    dead_count: number
    byname: string
    special_id: number
    name: string
    grade: number
    grade_point: number
    boss_kill_counts: number[]
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
    players: Player[]
    boss_counts: number[]
    boss_kill_counts: number[]
    waves: Wave[]
    job_result: {
        is_clear: boolean
        is_boss_defeated?: boolean
        failure_wave?: number
    }
    play_time: number
    schedule: Schedule
}

interface Statistic {
    bossKillCounts: number[]
    bossCounts: number[]
    result: {
        playTime: number
        grade: number
        gradePoint: number
        jobResult: {
            isClear: boolean
            isBossDefeated?: boolean
            failureWave?: number
        }
    }[]
}

interface ParseResult {
    [key: string]: Statistic
}
