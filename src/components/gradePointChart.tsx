import { cdate } from 'cdate'
import { CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts'


interface Props {
    graphData: any,
}

const CustomTooltip = ({active, payload, label}) => {
    if (active && payload && payload.length) {
        console.log(payload)
        return <div className="custom-tooltip">
            <p className="label">{`${convertTime(label)}`}</p>
            <p className="intro">{`${payload[0].payload.grade} ${payload[0].value}`}</p>
        </div>
    }
    return <></>
}

const convertRank = (value: number) => {
    return value % 100
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
            <Line type='monotone' dataKey='gradePoint' stroke='#8884d8' />
            <XAxis
                dataKey='name'
                angle={40}
                textAnchor='end'
                tickFormatter={convertTime} />
            <YAxis tickFormatter={convertRank} />
        </LineChart>
    </>)
}
