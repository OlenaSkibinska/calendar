import {DateTime} from 'luxon'
import {splitEvery} from 'ramda';
import React from 'react';
import {Component} from 'react';
import {months, weekDays} from '../../utils/index';

import '../../../styles/Calendar.less'
import '../../../styles/Date.less'
import '../../../styles/Choice-btn.less'

let CURRENT_DATE = new Date();
let CURRENT_MONTH = CURRENT_DATE.getMonth();
let CURRENT_YEAR = CURRENT_DATE.getFullYear();


class CalendarComponent extends Component {
    constructor() {
        super();
        let calendarModel = this.generateCalendarModel(CURRENT_DATE);
        this.state = {
            currentDate: CURRENT_DATE,
            month: months[CURRENT_MONTH],
            year: CURRENT_YEAR,
            calendarModel,
        };

    }

    generateCalendarModel(day) {
        const DAYS_AT_THE_WEEK = 7;
        const date = DateTime.fromJSDate(day);
        const numberOfDays = date.daysInMonth;
        let weekday = date.set({day: 1}).weekday - 1;

        return splitEvery(DAYS_AT_THE_WEEK)
        ([
            ...Array(weekday).fill(),
            ...Array(numberOfDays).fill().map((el, i) => i + 1),
        ])
    }

    mapCalendarModel() {
        return this.state.calendarModel
            .map(row => <div className="Date__week">{
                row.map(day => <span className="Date__day Date__day_num">{day || ""}</span>)
            }</div>)
    }

    handlePrevious() {
        CURRENT_DATE = new Date(this.state.currentDate.setMonth(CURRENT_MONTH - 1));
        CURRENT_MONTH = CURRENT_DATE.getMonth();
        CURRENT_YEAR = CURRENT_DATE.getFullYear();
        const calendarModel = this.generateCalendarModel(CURRENT_DATE);
        this.setState({
            currentDate:CURRENT_DATE,
            month:months[CURRENT_MONTH],
            year:CURRENT_YEAR,
            calendarModel
        });
    }

    handleNext() {
        CURRENT_DATE = new Date(this.state.currentDate.setMonth(CURRENT_MONTH + 1));
        CURRENT_MONTH = CURRENT_DATE.getMonth();
        CURRENT_YEAR = CURRENT_DATE.getFullYear();
        const calendarModel = this.generateCalendarModel(CURRENT_DATE);

        this.setState({
            currentDate:CURRENT_DATE,
            month:months[CURRENT_MONTH],
            year:CURRENT_YEAR,
            calendarModel
        });
    }

    render() {
        return (
            <div className='Calendar'>
                <div className='Calendar__header'>
                    <button className='Choice-btn' onClick={() => this.handlePrevious()}>Previous</button>
                    <p className='Date__month'>{this.state.month} {this.state.year}</p>
                    <button className='Choice-btn' onClick={() => this.handleNext()}>Next</button>
                </div>
                <div className='Date__week'>{weekDays.map(day => <span className="Date__day Date__day_name">{day}</span>)}</div>
                {this.mapCalendarModel()}
            </div>
        )
    }

}

export default CalendarComponent;