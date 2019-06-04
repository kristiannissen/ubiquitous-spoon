/**
 * @file src/components/calendar.js
 */
import React from 'react'

import {CalendarContext} from '../context'

class Calendar extends React.Component {
    render () {
        let props = this.props
        let calendar = this.context
        return <div>Hello Kitty</div>
    }
}

Calendar.contextType = CalendarContext

export default Calendar;
