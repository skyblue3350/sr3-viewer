import Head from 'next/head'
import React, { useState } from 'react'
import { cdate } from 'cdate'
import { Container, Dropdown, Header, Table } from 'semantic-ui-react'
import { bossList, stageList } from '@/lib/splatoon/labels'



export default function Home() {
  const [parseResult, setParseResult] = useState<ParseResult>({})

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
          const base = cdate('2000-12-27 09:00')
          const dateFormat = 'YYYY年MM月DD日hh:mm'
          const start = base.add(current.schedule.start_time, 'seconds')
          const end = base.add(current.schedule.end_time, 'seconds')
          const key = `${stage} (${start.format(dateFormat)}-${end.format(dateFormat)})`

          const tmp = previous[key]
          tmp.result.push({
            playTime: current.play_time,
            grade: current.players[0].grade,
            grade_point: current.players[0].grade_point,
          })
          tmp.bossCounts = tmp.bossCounts.map((v: number, index: number) => {
            return v + current.boss_counts[index]
          })
          tmp.bossKillCounts = tmp.bossKillCounts.map((v: number, index: number) => {
            return v + current.players[0].boss_kill_counts[index]
          })
          previous[key] = tmp
          
          return previous
        }, new Proxy({}, {
          get(target: ParseResult, name: string) {
            return name in target ? target[name] : {
              bossKillCounts: Array(15).fill(0),
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
    console.log(result, previous)
    previous.bossCounts = result.bossCounts.map((v: number, index: number) => {
      return v + previous.bossCounts[index]
    })
    previous.bossKillCounts = result.bossKillCounts.map((v: number, index: number) => {
      return v + previous.bossKillCounts[index]
    })
    return previous
  }, {
    bossKillCounts: Array(15).fill(0),
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
          <input type='file' onChange={hoge}/>
          <Header as='h1' dividing>リザルト</Header>
          <Dropdown placeholder='バイトスケジュール' fluid selection search options={Object.keys(parseResult).map(s => {
            return {
              text: s,
              value: s,
              key: s,
            }
          })} />
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
                if (bossCounts.bossCounts[index] === 0) return
                return (
                <Table.Row>
                  <Table.Cell>{key}</Table.Cell>
                  <Table.Cell>{bossCounts.bossKillCounts[index]}</Table.Cell>
                  <Table.Cell>{bossCounts.bossCounts[index]}</Table.Cell>
                </Table.Row>)
              })}
            </Table.Body>
          </Table>
        </Container>
      </main>
    </>
  )
}
