import React from 'react';
import {Card, CardBody, CardTitle, CardSubtitle, CardText, Progress, CardLink} from 'reactstrap';
import {Moment} from 'moment';
import 'twix';
import {bgColor, barColor, hexToRgb} from '../../util/progressBarColor';
import {Link} from 'react-feather';


type PeriodProps = {
    now: Moment, start: Moment, end: Moment,
    name: string, color: string, format: string, zoom?: string
};
const Period = (props: PeriodProps) => {

    let {now, start, end, name, color, format, zoom} = props;
    let t = start.twix(end); // Twix duration representing the period

    // Determines what text to display regarding how long before/after the period was
    const parseStartEnd = () => {
        if (t.isPast()) return <span>Ended {end.fromNow()}</span>
        if (t.isCurrent()) return <span>Ending {end.fromNow()}, started {start.fromNow()}</span>
        if (t.isFuture()) return <span>Starting {start.fromNow()}</span>
    }

    return (
        <Card style={{backgroundColor: color, border: "none"}}>
            <CardBody>
                {zoom && <CardLink href={zoom} rel="noopener noreferrer" target="_blank"><Link/></CardLink>}
                <CardTitle>{name}</CardTitle>
                <CardSubtitle className="secondary">{t.simpleFormat(format)}</CardSubtitle>
                {/* em dash */}
                <CardText className="secondary">{parseStartEnd()} — {t.countInner('minutes')} minutes long</CardText>
                {t.isCurrent()
                    && <Progress
                        value={(now.valueOf() - start.valueOf()) / (end.valueOf() - start.valueOf()) * 100}
                        style={{backgroundColor: bgColor(color)}}
                        barStyle={{backgroundColor: barColor(color)}}
                      />
                }
            </CardBody>
        </Card>
        /*
        <div className="schedule-period">
            <span className="schedule-periodname">{props.name}</span>
            <span>{props.start} - {props.end}</span>
            {parseStartEnd()}
            {(now.isBetween(start, end))
                ? <Progress animated value={(now.valueOf() - start.valueOf()) / (end.valueOf() - start.valueOf()) * 100}/>
                : null}
        </div>
        */
    );
}

export default Period;
