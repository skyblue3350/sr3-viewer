import { gradeList } from '@/lib/splatoon/labels'
import { timeToCdate } from '@/lib/utils'
import { cdate } from 'cdate'
import { CartesianGrid, Line, LineChart, Tooltip, TooltipProps, XAxis, YAxis } from 'recharts'
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent'


interface Props {
    graphData: {value: number}[],
}

const extraLabel: {[key: number]: string} = {
    1000: '200バッジ',
    1200: '銅バッジ',
    1400: '銀バッジ',
    1665: '危険度MAX目安',
    1799: 'カンスト',
}

const CustomTooltip = ({active, payload, label}: TooltipProps<ValueType, NameType>) => {
    if (active && payload && payload.length) {
        return <div className="custom-tooltip">
            <p className="label">{`${convertTime(label)}`}</p>
            <p className="intro">{`${payload[0].payload.grade} ${payload[0].payload.gradePoint} ${payload[0].value}`}</p>
        </div>
    }
    return <></>
}

const convertRank = (value: number, index: number): string => {
    if (extraLabel[value]) return extraLabel[value]
    const i = (value / 100 | 0)
    return i < gradeList.length ? gradeList[i] : ''
}

const convertTime = (playTime: number) => {
    return timeToCdate(playTime).format('YYYY-MM-DD HH:mm')
}

export const GradePointChart = (props: Props) => {
    const min = Math.min(...props.graphData.map(v => v.value)) - 100
    const max = Math.max(...props.graphData.map(v => v.value))
    const ticks = gradeList.map((v, i) => i * 100).concat(Object.keys(extraLabel).map(Number)).filter(v => v <= max+300).filter(v => v >= min)
    return (
    <>
        <LineChart width={1000} height={500} data={props.graphData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <Tooltip content={<CustomTooltip />} cursor={{fill: 'transparent'}} />
            <CartesianGrid stroke='#ccc' strokeDasharray='5 5' />
            <Line type='monotone' dataKey='value' stroke='#8884d8' />
            <XAxis
                height={100}
                dataKey='name'
                angle={40}
                textAnchor='start'
                tickFormatter={convertTime} />
            <YAxis
                width={100}
                tickFormatter={convertRank}
                domain={['auto', 'auto']}
                ticks={ticks}
                textAnchor='end' />
        </LineChart>
    </>)
}
