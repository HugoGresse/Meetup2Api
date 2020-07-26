import React from 'react'
import Grid from '@material-ui/core/Grid'
import { useStateValue } from '../../../state/state'
import Event from './Event'
import { selectUpcomingEvents } from '../../../state/selectors'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { Link as RouterLink } from 'react-router-dom'
import { RoutingMap } from '../../../UseRoutingMap'

const UpcomingEvents = ({ token }) => {
    const [
        {
            selectedOrganization: { id, icals, events, eventsLoading },
        },
    ] = useStateValue()

    const upcomingEvents = selectUpcomingEvents(events)
    const routing = RoutingMap(id).orgs.org.passedEvents
    const passedUrl = token ? `${routing.url}?token=${token}` : routing.url

    return (
        <Grid container spacing={4}>
            {id && (
                <Grid item xs={12} style={{ textAlign: 'right' }}>
                    <Button
                        to={passedUrl}
                        component={RouterLink}
                        variant="outlined"
                        color="primary">
                        See {routing.name}
                    </Button>
                </Grid>
            )}
            {upcomingEvents.map(event => (
                <Event
                    key={event.id}
                    ical={icals.filter(ical => event.icalId === ical.id)[0]}
                    event={event}
                />
            ))}
            {upcomingEvents.length === 0 && (
                <Grid item>
                    {eventsLoading && (
                        <Typography>Events loading...</Typography>
                    )}
                    {!eventsLoading && (
                        <Typography>No upcoming events</Typography>
                    )}
                </Grid>
            )}
        </Grid>
    )
}

export default UpcomingEvents
