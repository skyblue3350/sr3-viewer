import { bossList, gradeList } from '@/lib/splatoon/labels'
import React from 'react'
import { Statistic, Table } from 'semantic-ui-react'
import dynamic from 'next/dynamic'

const GradePointChart = dynamic(async () => await (await import('./gradePointChart')).GradePointChart, { ssr: false })


export interface Props {
    statistic: Statistic
}

export const StatisticViewer = (props: Props) => {
    if (!props.statistic) return <></>

    const totalJobCount = props.statistic.result.length
    const clearJobCount = props.statistic.result.filter(value => value.jobResult.isClear).length
    const clearJobPercentage = Math.round(clearJobCount/totalJobCount*100)
    const totalBoss = props.statistic.result.filter(value => 'isBossDefeated' in value.jobResult)
    const totalBossCount = totalBoss.length
    const clearBossCount = totalBoss.filter(value => value.jobResult.isBossDefeated).length
    const clearBossPercentage = Math.round(clearBossCount/totalBossCount*100)

    const graphData = props.statistic.result.map(value => {

        return {
            name: value.playTime,
            gradePoint: value.gradePoint,
            grade: gradeList[value.grade],
            value: (value.grade * 100) + value.gradePoint
        }
    })

    return (<>
        <GradePointChart graphData={graphData}/>
        <Statistic.Group>
            <Statistic label={'総バイト数'} value={totalJobCount} />
            <Statistic label={'バイトクリア数（クリア率）'} value={`${clearJobCount}(${clearJobPercentage}%)`} />
            <Statistic label={'ヨコヅナバイト数'} value={totalBossCount} />
            <Statistic label={'ヨコヅナクリア数（クリア率）'} value={`${clearBossCount}(${clearBossPercentage}%)`} />
        </Statistic.Group>
        <Table striped>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>種別</Table.HeaderCell>
                    <Table.HeaderCell>あなたの討伐数</Table.HeaderCell>
                    <Table.HeaderCell>あなたの討伐率</Table.HeaderCell>
                    <Table.HeaderCell>なかまの討伐数</Table.HeaderCell>
                    <Table.HeaderCell>なかまの討伐率</Table.HeaderCell>
                    <Table.HeaderCell>出現数</Table.HeaderCell>
                    <Table.HeaderCell>討伐率</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {bossList.map((key, index) => {
                    if (props.statistic.bossCounts[index] === 0) return
                    const {statistic} = props
                    const bossCount = statistic.bossCounts[index]
                    const bossKillCount = statistic.bossKillCounts[index]
                    const bossKillCountPercentage = Math.floor(bossKillCount/bossCount*100)
                    const bossKillCountByTeam = statistic.bossKillCountsByTeam[index]
                    const bossKillCountByTeamPercentage = Math.floor((bossKillCountByTeam-bossKillCount)/3/bossCount*100)

                    return (
                    <Table.Row key={key}>
                        <Table.Cell content={key} />
                        <Table.Cell content={bossKillCount} />
                        <Table.Cell
                            className={bossKillCountByTeamPercentage <= bossKillCountPercentage? 'text-green' : 'text-red'}
                            content={`${bossKillCountPercentage}%`} />
                        <Table.Cell content={bossKillCountByTeam-bossKillCount} />
                        <Table.Cell
                            className={bossKillCountByTeamPercentage <= bossKillCountPercentage? 'text-red' : 'text-green'}
                            content={`${bossKillCountByTeamPercentage}%`} />
                        <Table.Cell content={bossCount} />
                        <Table.Cell content={`${Math.floor(bossKillCountByTeam/bossCount*100)}%`} />
                    </Table.Row>)
                })}
            </Table.Body>
        </Table>
        
    </>)
}
