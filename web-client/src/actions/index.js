import fetch from 'isomorphic-fetch'
import { REST_API_URL } from '../constants'

export const REQUEST_LOGS = 'REQUEST_LOGS'
export const RECEIVE_LOGS = 'RECEIVE_LOGS'

export const START_TIMER = 'START_TIMER'
export const PAUSE_TIMER = 'PAUSE_TIMER'
export const STOP_TIMER = 'STOP_TIMER'

export function startTimer () {
  return {
    type: START_TIMER
  }
}

export function pauseTimer () {
  return {
    type: PAUSE_TIMER
  }
}

export function stopTimer () {
  return {
    type: STOP_TIMER
  }
}

export function addLog (log) {
  return (dispatch, getState) => {
    let options = {
      method: 'POST',
      body: JSON.stringify(log),
      headers: {
        'Content-Type': 'application/json'
      }
    }

    return fetch(`${REST_API_URL}/logs`, options)
      .then(() => dispatch(fetchLogs()))
  }
}

export function fetchLogs (filter = '', page = 1) {
  return (dispatch, getState) => {
    dispatch(requestLogs(filter, page))

    return fetch(`${REST_API_URL}/logs?filter=${filter}&page=${page}`)
      .then(req => req.json())
      .then(json => dispatch(receiveLogs(filter, page, json)))
  }
}

function requestLogs (filter, page) {
  return {
    type: REQUEST_LOGS,
    filter,
    page
  }
}

function receiveLogs (filter, page, json) {
  return {
    type: RECEIVE_LOGS,
    filter,
    page,
    data: json.data,
    totalPages: json.totalPages
  }
}
