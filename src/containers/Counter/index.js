import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from '../../store/counter/slices'

export function Counter() {
    const count = useSelector((state) => state.counter.value)
    const dispatch = useDispatch()

    return (
        <div className="page">
            <h1 className="title">Counter</h1>
            <div>
                <button
                    className="button btn-secondary"
                    aria-label="Decrement value"
                    onClick={() => dispatch(decrement())}
                >
                    Decrement
                </button>
                <span className="field inline">{count}</span>
                <button
                    className="button"
                    aria-label="increment"
                    onClick={() => dispatch(increment())}
                >
                    Increment
                </button>
            </div>
        </div>
    )
}
