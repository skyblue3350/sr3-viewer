import html2canvas from 'html2canvas'
import { Button } from 'semantic-ui-react'

interface Props {
    targetRef: React.RefObject<HTMLDivElement>
    content?: string
    filename: string
}

export const ScreenShot = (props: Props) => {
    const margin = 100

    return (<>
    <Button primary {...props} onClick={() => {
        if (!props.targetRef) return
        if (!props.targetRef.current) return

        html2canvas(props.targetRef.current, {
            x: -(margin / 2),
            y: -(margin / 2),
            width: props.targetRef.current.clientWidth + margin,
            height: props.targetRef.current.clientHeight + margin,
        }).then(canvas => {
            const link = document.createElement('a')
            link.href = canvas.toDataURL()
            link.download = props.filename
            document.body.append(link)
            link.click()
            document.body.removeChild(link)
        })
    }}></Button></>)
}
