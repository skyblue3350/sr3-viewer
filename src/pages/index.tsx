import Head from 'next/head'
import React, { useRef, useState } from 'react'
import { Container, Dropdown, Header, Ref, Tab } from 'semantic-ui-react'
import { stageList } from '@/lib/splatoon/labels'
import { StatisticViewer } from '@/components/statistic'
import { ScreenShot } from '@/components/screenshot'
import { sumArray, timeToCdate } from '@/lib/utils'


export default function Home() {
  const [parseResult, setParseResult] = useState<ParseResult>({})
  const [schedule, setSchedule] = useState<string>('')
  const nodeRef = useRef<HTMLDivElement>(null)

  const hoge = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files

    if (!files) return

    Array.from(files).map(file => {
      if (file.type !== 'application/json') {
        return
      }

      const reader = new FileReader()
      reader.onload = () => {
        if (typeof reader.result !== 'string') return

        const data: JobResult[] = JSON.parse(reader.result)

        const s: ParseResult = data.reduce((previous, current) => {
          const stage = stageList[current.schedule.stage_id]
          const dateFormat = 'YYYY年MM月DD日HH:mm'
          const start = timeToCdate(current.schedule.start_time)
          const end = timeToCdate(current.schedule.end_time)
          const key = `${stage} (${start.format(dateFormat)}-${end.format(dateFormat)})`

          const tmp = previous[key]
          tmp.result.push({
            playTime: current.play_time,
            grade: current.players[0].grade,
            gradePoint: current.players[0].grade_point,
            jobResult: {
              isClear: current.job_result.is_clear,
              ...current.job_result.is_boss_defeated !== undefined ? {isBossDefeated: current.job_result.is_boss_defeated}: {},
              ...current.job_result.failure_wave !== undefined ? {failureWave: current.job_result.failure_wave}: {},
            },
          })
          tmp.bossCounts = tmp.bossCounts.map((v: number, index: number) => {
            return v + current.boss_counts[index]
          })
          tmp.bossKillCounts = tmp.bossKillCounts.map((v: number, index: number) => {
            return v + current.players[0].boss_kill_counts[index]
          })
          tmp.bossKillCountsByTeam = sumArray(tmp.bossKillCountsByTeam, current.boss_kill_counts)
          previous[key] = tmp
          
          return previous
        }, new Proxy({}, {
          get(target: ParseResult, name: string) {
            return name in target ? target[name] : {
              bossKillCounts: Array(15).fill(0),
              bossKillCountsByTeam: Array(15).fill(0),
              bossCounts: Array(15).fill(0),
              result: [],
            }
          }
        }))
        setParseResult(s)
      }
      reader.readAsText(file)
    })
  }

  const bossCounts = Object.keys(parseResult).reduce((previous, key) => {
    const result = parseResult[key]
    previous.bossCounts = sumArray(result.bossCounts, previous.bossCounts)
    previous.bossKillCounts = sumArray(result.bossKillCounts, previous.bossKillCounts)
    previous.bossKillCountsByTeam = sumArray(result.bossKillCountsByTeam, previous.bossKillCountsByTeam)
    return previous
  }, {
    bossKillCounts: Array(15).fill(0),
    bossKillCountsByTeam: Array(15).fill(0),
    bossCounts: Array(15).fill(0),
  })
  
  return (
    <>
      <Head>
        <title>SR3 Viewer</title>
        <meta name="description" content="Splatoon3 のサーモンランのデータ可視化サイト" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Container>
          <Header as='h1' dividing>データ読み込み</Header>
          Salmonia3+ の「マイページ」 -&gt; 「バックアップ」から出力した json ファイルを選択してください。<br />
          <input type='file' onChange={hoge}/>
          <Header as='h1' dividing>リザルト</Header>
          <ScreenShot targetRef={nodeRef} content={'スクリーンショットを保存'} filename='sr3-result.png'/>
          {/* TODO: FIX v3 移行時に対応 */}
          <Ref innerRef={nodeRef}>
            <Tab
              menu={{
                secondary: true,
                pointing: true,
              }}
              panes={[
                {
                  menuItem: '累計',
                  render: () => {
                    return <StatisticViewer statistic={{
                      ...bossCounts,
                      result: Object.keys(parseResult).reduce((previous, key) => {
                        // @ts-ignore
                        return previous.concat(parseResult[key].result)
                      }, []),
                    }} />
                  }
                },
                {
                  menuItem: 'スケジュール',
                  render: () => {
                    return <>
                      <Dropdown placeholder='バイトスケジュール' fluid selection search options={Object.keys(parseResult).reverse().map(s => {
                        return {
                          text: s,
                          value: s,
                          key: s,
                        }
                      })} onChange={(event, data) => setSchedule(data.value!.toString())} />
                      <StatisticViewer statistic={parseResult[schedule]} />
                    </>
                  }
                },
              ]} />
            </Ref>
        </Container>
      </main>
    </>
  )
}
