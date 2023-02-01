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
                    <Table.HeaderCell>撃破数</Table.HeaderCell>
                    <Table.HeaderCell>出現数</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {bossList.map((key, index) => {
                    if (props.statistic.bossCounts[index] === 0) return
                    return (
                    <Table.Row key={key}>
                        <Table.Cell>{key}</Table.Cell>
                        <Table.Cell>{props.statistic.bossKillCounts[index]}</Table.Cell>
                        <Table.Cell>{props.statistic.bossCounts[index]}</Table.Cell>
                    </Table.Row>)
                })}
            </Table.Body>
        </Table>
        
    </>)
}
