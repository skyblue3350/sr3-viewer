import { gradeList } from '@/lib/splatoon/labels'
import { cdate } from 'cdate'
import { CartesianGrid, Line, LineChart, Tooltip, TooltipProps, XAxis, YAxis } from 'recharts'
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent'


interface Props {
    graphData: {}[],
}

const CustomTooltip = ({active, payload, label}: TooltipProps<ValueType, NameType>) => {
    if (active && payload && payload.length) {
        return <div className="custom-tooltip">
            <p className="label">{`${convertTime(label)}`}</p>
            <p className="intro">{`${payload[0].payload.grade} ${payload[0].payload.gradePoint}`}</p>
        </div>
    }
    return <></>
}

const convertRank = (value: any, index: number): string => {
    const i = (value / 1000 | 0) + 1
    return i < gradeList.length ? gradeList[i] : ''
}

const convertTime = (playTime: number) => {
    const base = cdate('2000-12-27 09:00')
    const p = base.add(playTime, 'seconds')
    return p.format('YYYY-MM-DD HH:mm')
}

export const GradePointChart = (props: Props) => {
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
                domain={['dataMin-1000', 'dataMax+100']}
                ticks={[1000, 2000, 3000, 4000, 5000, 6000, 7000, 8500]}
                textAnchor='end' />
        </LineChart>
    </>)
}
