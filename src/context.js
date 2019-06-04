/**
 * @file src/context.js
 */
import React from 'react'

export const calendar = {
    startDate: "today",
    endDate: "tomorrow"
}

export const CalendarContext = React.createContext(
    calendar
);
